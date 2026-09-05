import test from 'node:test';
import assert from 'node:assert';
import http from 'node:http';
import { createDaemonServer } from './server.js';
import { DataStore } from './store.js';

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

  server.close();
});
