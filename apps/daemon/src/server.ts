import http from 'node:http';
import { WebSocketServer, WebSocket } from 'ws';
import { DataStore } from './store.js';
import type { CreateProjectInput } from './types.js';

export function createDaemonServer(store: DataStore = new DataStore()) {
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

          const newProj = {
            id: `proj_${Date.now()}`,
            name: body.name,
            description: body.description || '',
            ownerAccountId: currentAccount.id, // Owner = project Account privilege
            designerId: body.designerId || (store.designers[0]?.id ?? undefined),
            gatePassed: false,
            shipped: false,
            status: 'draft' as const,
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
