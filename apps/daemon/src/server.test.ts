import test from 'node:test';
import assert from 'node:assert';
import http from 'node:http';
import { createDaemonServer } from './server.js';
import { DataStore } from './store.js';
import { resolveJailedPath, toolRepoReadFile, ToolExecutionError } from './harness.js';

test('Daemon server API and rules', async (t) => {
  const store = new DataStore();
  const { server } = createDaemonServer(store);

  await new Promise<void>((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve());
  });

  const address = server.address() as { address: string; port: number };
  const baseUrl = `http://${address.address}:${address.port}`;

  const request = async (
    path: string,
    options: http.RequestOptions = {},
    body?: any
  ): Promise<{ status: number; data: any }> => {
    return new Promise((resolve, reject) => {
      const req = http.request(`${baseUrl}${path}`, options, (res) => {
        let raw = '';
        res.on('data', (chunk) => (raw += chunk));
        res.on('end', () => {
          try {
            resolve({
              status: res.statusCode || 200,
              data: raw ? JSON.parse(raw) : null,
            });
          } catch (e) {
            resolve({ status: res.statusCode || 200, data: raw });
          }
        });
      });
      req.on('error', reject);
      if (body) {
        req.setHeader('Content-Type', 'application/json');
        req.write(JSON.stringify(body));
      }
      req.end();
    });
  };

  await t.test('GET /health returns 200 and daemon status', async () => {
    const res = await request('/health');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.status, 'ok');
    assert.strictEqual(res.data.product, 'AIOS Designer Daemon');
  });

  await t.test('GET /api/account returns current session account', async () => {
    const res = await request('/api/account');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.currentAccount.id, 'acc_owner_01');
    assert.strictEqual(res.data.currentAccount.role, 'owner');
  });

  await t.test('Projects create must REJECT skillIds', async () => {
    const res = await request('/api/projects', { method: 'POST' }, {
      name: 'Illegal Project with Skills',
      skillIds: ['skill-01-research'],
    });
    assert.strictEqual(res.status, 400);
    assert.match(res.data.error, /skillIds/);
  });

  await t.test('Projects create succeeds without skillIds', async () => {
    const res = await request('/api/projects', { method: 'POST' }, {
      name: 'Valid Project',
      description: 'Test Project',
    });
    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.data.name, 'Valid Project');
    assert.strictEqual(res.data.ownerAccountId, 'acc_owner_01');
    assert.strictEqual(res.data.gatePassed, false);
    assert.strictEqual(res.data.shipped, false);
  });

  await t.test('Gate and Ship require session match', async () => {
    // Switch session to another account
    store.setCurrentAccount('acc_member_02');

    // Try to gate a project owned by acc_owner_01
    const resGate = await request('/api/projects/proj_sample_01/gate', { method: 'POST' });
    assert.strictEqual(resGate.status, 403);
    assert.match(resGate.data.error, /session match/);

    // Switch back to owner
    store.setCurrentAccount('acc_owner_01');
    const resGateSuccess = await request('/api/projects/proj_sample_01/gate', { method: 'POST' });
    assert.strictEqual(resGateSuccess.status, 200);
    assert.strictEqual(resGateSuccess.data.project.gatePassed, true);

    // Ship the project
    const resShip = await request('/api/projects/proj_sample_01/ship', { method: 'POST' });
    assert.strictEqual(resShip.status, 200);
    assert.strictEqual(resShip.data.project.shipped, true);
  });

  await t.test('Skills bind only to Designers', async () => {
    const res = await request('/api/designers/des_monkren_core/skills', { method: 'PUT' }, {
      skillIds: ['skill-01-research', 'skill-02-create'],
    });
    assert.strictEqual(res.status, 200);
    assert.deepStrictEqual(res.data.assignedSkillIds, ['skill-01-research', 'skill-02-create']);
  });

  await t.test('GET /api/templates returns UI and Product scene templates (M1)', async () => {
    const res = await request('/api/templates');
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.data));
    assert.ok(res.data.length >= 4);
    const telemetry = res.data.find((t: any) => t.id === 'tpl_ui_telemetry_console');
    assert.ok(telemetry);
    assert.strictEqual(telemetry.category, 'ui');
    assert.strictEqual(telemetry.archetype, 'console');
  });

  await t.test('TaskGraph node start rejects skillIds (M1 invariant)', async () => {
    const res = await request('/api/projects/proj_sample_01/taskgraph/nodes/node-3-code/start', { method: 'POST' }, {
      nodeId: 'node-3-code',
      skillIds: ['skill-03-execute'],
    });
    assert.strictEqual(res.status, 400);
    assert.match(res.data.error, /skillIds/);
  });

  await t.test('TaskGraph node activation switches active node and returns target mode (M1)', async () => {
    const res = await request('/api/projects/proj_sample_01/taskgraph/activate', { method: 'POST' }, {
      nodeId: 'node-3-code',
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.activeNode.id, 'node-3-code');
    assert.strictEqual(res.data.activeNode.mode, 'code');
  });

  // M2: Agent Harness & Run Lifecycle Tests
  await t.test('POST /api/projects/:id/runs starts a Run and auto-binds executor (M2)', async () => {
    const res = await request('/api/projects/proj_sample_01/runs', { method: 'POST' }, {
      inputPrompt: 'Synthesize verified telemetry console spec',
    });
    assert.strictEqual(res.status, 201);
    assert.ok(res.data.status === 'queued' || res.data.status === 'running');
    assert.strictEqual(res.data.executorDesignerId, 'des_monkren_core');
    assert.strictEqual(res.data.projectId, 'proj_sample_01');

    // Query Run status via GET /api/runs/:id
    const runId = res.data.id;
    const runRes = await request(`/api/runs/${runId}`);
    assert.strictEqual(runRes.status, 200);
    assert.strictEqual(runRes.data.id, runId);
  });

  await t.test('POST /api/projects/:id/runs REJECTS skillIds (M2 invariant)', async () => {
    const res = await request('/api/projects/proj_sample_01/runs', { method: 'POST' }, {
      inputPrompt: 'Illegal run with skills',
      skillIds: ['skill-01-research'],
    });
    assert.strictEqual(res.status, 400);
    assert.match(res.data.error, /skillIds/);
  });

  await t.test('POST /api/runs/:id/cancel cancels an active Run (M2)', async () => {
    // Start a new run
    const createRes = await request('/api/projects/proj_sample_01/runs', { method: 'POST' }, {
      inputPrompt: 'Run to be cancelled',
    });
    assert.strictEqual(createRes.status, 201);
    const runId = createRes.data.id;

    // Immediately cancel
    const cancelRes = await request(`/api/runs/${runId}/cancel`, { method: 'POST' });
    assert.strictEqual(cancelRes.status, 200);
    assert.strictEqual(cancelRes.data.run.status, 'cancelled');
  });

  await t.test('Starting a TaskGraph node auto-spawns a Run bound to executor (M2)', async () => {
    const res = await request('/api/projects/proj_sample_01/taskgraph/nodes/node-2-wireframe/start', { method: 'POST' }, {
      nodeId: 'node-2-wireframe',
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.node.status, 'in_progress');
    assert.ok(res.data.run);
    assert.strictEqual(res.data.run.executorDesignerId, 'des_monkren_core');
  });

  await t.test('Harness Path Jail strictly prevents path traversal outside project root (M2)', async () => {
    const mockRoot = '/workspace/apps/daemon';

    // Safe path inside root
    const safePath = resolveJailedPath(mockRoot, 'package.json');
    assert.strictEqual(safePath, '/workspace/apps/daemon/package.json');

    // Forbidden paths trying to break out of jail
    assert.throws(() => {
      resolveJailedPath(mockRoot, '../../../../etc/passwd');
    }, ToolExecutionError);

    assert.throws(() => {
      resolveJailedPath(mockRoot, '../web/package.json');
    }, ToolExecutionError);

    assert.throws(() => {
      resolveJailedPath(mockRoot, '/etc/shadow');
    }, ToolExecutionError);

    // Reading safe file succeeds
    const content = await toolRepoReadFile(mockRoot, 'package.json');
    assert.match(content, /@aios-designer\/daemon/);
  });

  server.close();
});
