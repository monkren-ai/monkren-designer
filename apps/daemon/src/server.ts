import http from 'node:http';
import { WebSocketServer, WebSocket } from 'ws';
import { DataStore } from './store.js';
import { createGraphFromTemplate } from './templates.js';
import { AgentHarness } from './harness.js';
import type { CreateProjectInput, StartTaskNodeInput, CreateRunInput, Run } from './types.js';

export function createDaemonServer(
  store: DataStore = new DataStore(),
  harness: AgentHarness = new AgentHarness()
) {
  const sseClients = new Set<http.ServerResponse>();

  function broadcastEvent(eventType: string, data: any) {
    const payload = JSON.stringify({ type: eventType, data, timestamp: new Date().toISOString() });
    // Broadcast to SSE clients
    for (const res of sseClients) {
      try {
        res.write(`event: ${eventType}\ndata: ${payload}\n\n`);
      } catch {
        sseClients.delete(res);
      }
    }

    // Broadcast to WS clients
    const wsPayload = JSON.stringify({ event: eventType, data, timestamp: new Date().toISOString() });
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(wsPayload);
      }
    });
  }

  const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Account-Id');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    const pathname = url.pathname;
    const method = req.method;

    // Helper to send JSON
    const sendJson = (statusCode: number, data: any) => {
      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    };

    // Helper to parse JSON body
    const parseBody = async (): Promise<any> => {
      return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });
        req.on('end', () => {
          try {
            resolve(body ? JSON.parse(body) : {});
          } catch (err) {
            reject(err);
          }
        });
        req.on('error', reject);
      });
    };

    // 1. GET /health
    if (method === 'GET' && pathname === '/health') {
      sendJson(200, {
        status: 'ok',
        product: 'AIOS Designer Daemon',
        version: '0.1.0',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        features: {
          sse: true,
          ws: true,
        },
      });
      return;
    }

    // 2. GET /events (SSE stub)
    if (method === 'GET' && pathname === '/events') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      });
      res.write(': connected\n\n');
      sseClients.add(res);

      req.on('close', () => {
        sseClients.delete(res);
      });
      return;
    }

    // 3. REST endpoints for Account
    if (pathname === '/api/account') {
      if (method === 'GET') {
        const account = store.getCurrentAccount();
        sendJson(200, { currentAccount: account, availableAccounts: store.accounts });
        return;
      }
      if (method === 'POST') {
        // Switch account / session
        parseBody().then(body => {
          if (!body.accountId) {
            sendJson(400, { error: 'accountId is required' });
            return;
          }
          const switched = store.setCurrentAccount(body.accountId);
          if (!switched) {
            sendJson(404, { error: 'Account not found' });
            return;
          }
          broadcastEvent('account_changed', switched);
          sendJson(200, { currentAccount: switched });
        }).catch(err => sendJson(400, { error: 'Invalid JSON body' }));
        return;
      }
    }

    // 4. REST endpoints for Skills
    if (pathname === '/api/skills') {
      if (method === 'GET') {
        sendJson(200, store.skills);
        return;
      }
      if (method === 'POST') {
        parseBody().then(body => {
          const newSkill = {
            id: `skill_${Date.now()}`,
            name: body.name || 'Untitled Skill',
            description: body.description || '',
            category: body.category || 'custom',
            version: '1.0.0',
          };
          store.skills.push(newSkill);
          broadcastEvent('skill_created', newSkill);
          sendJson(201, newSkill);
        }).catch(() => sendJson(400, { error: 'Invalid JSON body' }));
        return;
      }
    }

    // 5. REST endpoints for Designers
    if (pathname === '/api/designers') {
      if (method === 'GET') {
        sendJson(200, store.designers);
        return;
      }
      if (method === 'POST') {
        parseBody().then(body => {
          const newDesigner = {
            id: `des_${Date.now()}`,
            name: body.name || 'New Designer',
            title: body.title || 'Agent',
            status: 'idle' as const,
            assignedSkillIds: Array.isArray(body.assignedSkillIds) ? body.assignedSkillIds : [],
          };
          store.designers.push(newDesigner);
          broadcastEvent('designer_created', newDesigner);
          sendJson(201, newDesigner);
        }).catch(() => sendJson(400, { error: 'Invalid JSON body' }));
        return;
      }
    }

    // Binding skills to Designer
    if (pathname.startsWith('/api/designers/') && pathname.endsWith('/skills') && method === 'PUT') {
      const parts = pathname.split('/');
      const designerId = parts[3];
      const designer = store.designers.find(d => d.id === designerId);
      if (!designer) {
        sendJson(404, { error: 'Designer not found' });
        return;
      }
      parseBody().then(body => {
        if (!Array.isArray(body.skillIds)) {
          sendJson(400, { error: 'skillIds must be an array of skill IDs' });
          return;
        }
        designer.assignedSkillIds = body.skillIds;
        broadcastEvent('designer_updated', designer);
        sendJson(200, designer);
      }).catch(() => sendJson(400, { error: 'Invalid JSON body' }));
      return;
    }

    // 6. REST endpoints for Projects
    if (pathname === '/api/projects') {
      if (method === 'GET') {
        sendJson(200, store.projects);
        return;
      }

      if (method === 'POST') {
        parseBody().then((body: CreateProjectInput) => {
          // SPEC RULE: "Skills bind only to Designers; create/start must NOT accept skillIds"
          if (body.skillIds !== undefined && body.skillIds !== null) {
            sendJson(400, {
              error: 'Invalid project configuration: "skillIds" cannot be attached to a project. Skills bind only to Designers.',
            });
            return;
          }

          if (!body.name) {
            sendJson(400, { error: 'Project name is required' });
            return;
          }

          const currentAccount = store.getCurrentAccount();
          const templateId = body.templateId || 'tpl_ui_telemetry_console';
          const taskGraph = createGraphFromTemplate(templateId, body.name);

          const newProj = {
            id: `proj_${Date.now()}`,
            name: body.name,
            description: body.description || '',
            ownerAccountId: currentAccount.id, // Owner = project Account privilege
            designerId: body.designerId || (store.designers[0]?.id ?? undefined),
            gatePassed: false,
            shipped: false,
            status: 'draft' as const,
            taskGraph,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          store.projects.push(newProj);
          broadcastEvent('project_created', newProj);
          sendJson(201, newProj);
        }).catch(() => sendJson(400, { error: 'Invalid JSON body' }));
        return;
      }
    }

    // Project Detail & Gate/Ship actions
    const projectMatch = pathname.match(/^\/api\/projects\/([^/]+)$/);
    if (projectMatch && method === 'GET') {
      const projId = projectMatch[1];
      const proj = store.projects.find(p => p.id === projId);
      if (!proj) {
        sendJson(404, { error: 'Project not found' });
        return;
      }
      sendJson(200, proj);
      return;
    }

    // Project Gate & Ship actions
    // SPEC RULE: "Gate/Ship require session match (ownerAccountId must match current session); Designer != Owner"
    const actionMatch = pathname.match(/^\/api\/projects\/([^/]+)\/(gate|ship)$/);
    if (actionMatch && method === 'POST') {
      const projId = actionMatch[1];
      const action = actionMatch[2];
      const proj = store.projects.find(p => p.id === projId);
      if (!proj) {
        sendJson(404, { error: 'Project not found' });
        return;
      }

      const currentAccount = store.getCurrentAccount();
      // Verify session match
      if (proj.ownerAccountId !== currentAccount.id) {
        sendJson(403, {
          error: `Forbidden: Gate/Ship operations require session match. Current session is "${currentAccount.id}", but project owner is "${proj.ownerAccountId}".`,
        });
        return;
      }

      if (action === 'gate') {
        proj.gatePassed = true;
        proj.status = 'ready_to_ship';
        proj.updatedAt = new Date().toISOString();
        broadcastEvent('project_updated', proj);
        sendJson(200, { message: 'Gate passed successfully', project: proj });
        return;
      }

      if (action === 'ship') {
        if (!proj.gatePassed) {
          sendJson(400, {
            error: 'Project cannot be shipped before passing quality gate.',
          });
          return;
        }
        proj.shipped = true;
        proj.status = 'shipped';
        proj.updatedAt = new Date().toISOString();
        broadcastEvent('project_shipped', proj);
        sendJson(200, { message: 'Project shipped successfully', project: proj });
        return;
      }
    }

    // 7. REST endpoints for Scene Templates (M1)
    if (pathname === '/api/templates' && method === 'GET') {
      sendJson(200, store.templates);
      return;
    }

    // 8. REST endpoints for TaskGraph node activation and mode switching (M1)
    const taskGraphMatch = pathname.match(/^\/api\/projects\/([^/]+)\/taskgraph\/activate$/);
    if (taskGraphMatch && method === 'POST') {
      const projId = taskGraphMatch[1];
      const proj = store.projects.find(p => p.id === projId);
      if (!proj) {
        sendJson(404, { error: 'Project not found' });
        return;
      }
      parseBody().then(body => {
        const { nodeId } = body;
        if (!nodeId) {
          sendJson(400, { error: 'nodeId is required' });
          return;
        }
        if (!proj.taskGraph) {
          sendJson(400, { error: 'Project has no active TaskGraph' });
          return;
        }
        const targetNode = proj.taskGraph.nodes.find(n => n.id === nodeId);
        if (!targetNode) {
          sendJson(404, { error: `Node ${nodeId} not found in project TaskGraph` });
          return;
        }
        proj.taskGraph.activeNodeId = nodeId;
        proj.updatedAt = new Date().toISOString();
        broadcastEvent('taskgraph_node_activated', { projectId: proj.id, activeNodeId: nodeId, mode: targetNode.mode });
        sendJson(200, { project: proj, activeNode: targetNode });
      }).catch(() => sendJson(400, { error: 'Invalid JSON body' }));
      return;
    }

    // Task node start / execute endpoint (M1 thin slice)
    // Invariant: start must NOT accept skillIds; skills bind only to designers!
    const taskStartMatch = pathname.match(/^\/api\/projects\/([^/]+)\/taskgraph\/nodes\/([^/]+)\/start$/);
    if (taskStartMatch && method === 'POST') {
      const projId = taskStartMatch[1];
      const nodeId = taskStartMatch[2];
      const proj = store.projects.find(p => p.id === projId);
      if (!proj) {
        sendJson(404, { error: 'Project not found' });
        return;
      }
      parseBody().then((body: StartTaskNodeInput) => {
        // INVARIANT CHECK: task start must NOT accept skillIds!
        if (body.skillIds !== undefined && body.skillIds !== null) {
          sendJson(400, {
            error: 'Invalid task start configuration: "skillIds" cannot be passed to a task. Skills bind only to Designers.',
          });
          return;
        }

        if (!proj.taskGraph) {
          sendJson(400, { error: 'Project has no active TaskGraph' });
          return;
        }

        const node = proj.taskGraph.nodes.find(n => n.id === nodeId);
        if (!node) {
          sendJson(404, { error: `Node ${nodeId} not found` });
          return;
        }

        node.status = 'in_progress';
        proj.taskGraph.activeNodeId = node.id;

        // Auto-spawn a Run bound to executorDesignerId (node designer or project designer)
        const executorDesignerId = node.designerId || proj.designerId || store.designers[0]?.id || 'des_monkren_core';
        const runId = `run_${Date.now()}`;
        const newRun: Run = {
          id: runId,
          projectId: proj.id,
          nodeId: node.id,
          executorDesignerId,
          status: 'queued',
          inputPrompt: `Execute step ${node.title} for stage ${node.stage}`,
          logs: [],
          createdAt: new Date().toISOString(),
        };
        store.runs.push(newRun);
        node.activeRunId = runId;
        proj.updatedAt = new Date().toISOString();

        broadcastEvent('taskgraph_node_started', { projectId: proj.id, node, run: newRun });

        // Kick off Harness async execution
        harness.executeRun(newRun, proj, (evt, payload) => {
          broadcastEvent(evt, payload);
          if (evt === 'run.finished' && payload.result) {
            node.status = 'completed';
            node.outputSummary = payload.result.summary;
            proj.updatedAt = new Date().toISOString();
            broadcastEvent('taskgraph_node_completed', { projectId: proj.id, node });
          } else if (evt === 'run.failed') {
            node.status = 'failed';
            proj.updatedAt = new Date().toISOString();
            broadcastEvent('taskgraph_node_failed', { projectId: proj.id, node, error: payload.error });
          }
        }).catch(() => {});

        sendJson(200, { message: `Task node ${node.title} started`, node, run: newRun, project: proj });
      }).catch(() => sendJson(400, { error: 'Invalid JSON body' }));
      return;
    }

    // Task node complete endpoint (M1 thin slice)
    const taskCompleteMatch = pathname.match(/^\/api\/projects\/([^/]+)\/taskgraph\/nodes\/([^/]+)\/complete$/);
    if (taskCompleteMatch && method === 'POST') {
      const projId = taskCompleteMatch[1];
      const nodeId = taskCompleteMatch[2];
      const proj = store.projects.find(p => p.id === projId);
      if (!proj) {
        sendJson(404, { error: 'Project not found' });
        return;
      }
      parseBody().then(body => {
        if (!proj.taskGraph) {
          sendJson(400, { error: 'Project has no active TaskGraph' });
          return;
        }

        const node = proj.taskGraph.nodes.find(n => n.id === nodeId);
        if (!node) {
          sendJson(404, { error: `Node ${nodeId} not found` });
          return;
        }

        node.status = 'completed';
        if (body.outputSummary) {
          node.outputSummary = body.outputSummary;
        }
        proj.updatedAt = new Date().toISOString();

        broadcastEvent('taskgraph_node_completed', { projectId: proj.id, node });
        sendJson(200, { message: `Task node ${node.title} completed`, node, project: proj });
      }).catch(() => sendJson(400, { error: 'Invalid JSON body' }));
      return;
    }

    // 9. REST endpoints for Agent Harness Runs (M2)
    // POST /api/projects/:id/runs (start run)
    const projectRunsMatch = pathname.match(/^\/api\/projects\/([^/]+)\/runs$/);
    if (projectRunsMatch) {
      const projId = projectRunsMatch[1];
      const proj = store.projects.find(p => p.id === projId);
      if (!proj) {
        sendJson(404, { error: 'Project not found' });
        return;
      }

      if (method === 'GET') {
        const projectRuns = store.runs.filter(r => r.projectId === projId);
        sendJson(200, projectRuns);
        return;
      }

      if (method === 'POST') {
        parseBody().then((body: CreateRunInput) => {
          // INVARIANT CHECK: Starting a Run must NOT accept skillIds!
          if (body.skillIds !== undefined && body.skillIds !== null) {
            sendJson(400, {
              error: 'Invalid run configuration: "skillIds" cannot be attached to a run. Skills bind only to Designers.',
            });
            return;
          }

          const executorDesignerId = body.designerId || proj.designerId || store.designers[0]?.id || 'des_monkren_core';
          const designer = store.designers.find(d => d.id === executorDesignerId);
          if (!designer) {
            sendJson(404, { error: `Executor designer '${executorDesignerId}' not found` });
            return;
          }

          const runId = `run_${Date.now()}`;
          const newRun: Run = {
            id: runId,
            projectId: proj.id,
            nodeId: body.nodeId,
            executorDesignerId,
            status: 'queued',
            inputPrompt: body.inputPrompt || `Synthesize design artifacts for ${proj.name}`,
            logs: [],
            createdAt: new Date().toISOString(),
          };

          store.runs.push(newRun);

          // If linked to a node, update node activeRunId
          if (body.nodeId && proj.taskGraph) {
            const node = proj.taskGraph.nodes.find(n => n.id === body.nodeId);
            if (node) {
              node.activeRunId = runId;
              node.status = 'in_progress';
              proj.taskGraph.activeNodeId = node.id;
              proj.updatedAt = new Date().toISOString();
            }
          }

          broadcastEvent('run.started', { runId, run: newRun, timestamp: newRun.createdAt });

          // Execute run asynchronously with Harness
          harness.executeRun(newRun, proj, (evt, payload) => {
            broadcastEvent(evt, payload);
            if (evt === 'run.finished' && payload.result && body.nodeId && proj.taskGraph) {
              const node = proj.taskGraph.nodes.find(n => n.id === body.nodeId);
              if (node) {
                node.status = 'completed';
                node.outputSummary = payload.result.summary;
                proj.updatedAt = new Date().toISOString();
                broadcastEvent('taskgraph_node_completed', { projectId: proj.id, node });
              }
            }
          }).catch(() => {});

          sendJson(201, newRun);
        }).catch(() => sendJson(400, { error: 'Invalid JSON body' }));
        return;
      }
    }

    // GET /api/runs/:id
    const singleRunMatch = pathname.match(/^\/api\/runs\/([^/]+)$/);
    if (singleRunMatch && method === 'GET') {
      const runId = singleRunMatch[1];
      const run = store.runs.find(r => r.id === runId);
      if (!run) {
        sendJson(404, { error: 'Run not found' });
        return;
      }
      sendJson(200, run);
      return;
    }

    // POST /api/runs/:id/cancel
    const cancelRunMatch = pathname.match(/^\/api\/runs\/([^/]+)\/cancel$/);
    if (cancelRunMatch && method === 'POST') {
      const runId = cancelRunMatch[1];
      const run = store.runs.find(r => r.id === runId);
      if (!run) {
        sendJson(404, { error: 'Run not found' });
        return;
      }

      const cancelled = harness.cancelRun(runId);
      if (!cancelled && run.status !== 'running' && run.status !== 'queued') {
        sendJson(400, { error: `Run ${runId} is not running (current status: ${run.status})` });
        return;
      }

      run.status = 'cancelled';
      run.finishedAt = new Date().toISOString();
      broadcastEvent('run.failed', { runId, run, error: 'Cancelled by user', cancelled: true });
      sendJson(200, { message: 'Run cancelled successfully', run });
      return;
    }

    // Not found fallback
    sendJson(404, { error: 'Route not found' });
  });

  // Setup WebSocket Server stub
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WebSocket) => {
    ws.send(JSON.stringify({ type: 'connected', message: 'AIOS Designer WS stream ready' }));

    ws.on('message', (message: string) => {
      try {
        const parsed = JSON.parse(message.toString());
        if (parsed.type === 'ping') {
          ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
        }
      } catch {
        // ignore invalid payload
      }
    });
  });

  return { server, wss, store, broadcastEvent };
}
