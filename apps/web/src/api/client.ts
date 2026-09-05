import type { Account, Project, Designer, Skill, DaemonHealth, SceneTemplate, TaskGraphNode, Run, ToolSurface } from '../types';

const DAEMON_URL = import.meta.env.VITE_DAEMON_URL || 'http://127.0.0.1:7420';

export async function fetchHealth(): Promise<DaemonHealth> {
  const res = await fetch(`${DAEMON_URL}/health`);
  if (!res.ok) throw new Error(`Health check failed: ${res.statusText}`);
  return res.json();
}

export async function fetchAccount(): Promise<{ currentAccount: Account; availableAccounts: Account[] }> {
  const res = await fetch(`${DAEMON_URL}/api/account`);
  if (!res.ok) throw new Error(`Failed to fetch account: ${res.statusText}`);
  return res.json();
}

export async function switchAccount(accountId: string): Promise<{ currentAccount: Account }> {
  const res = await fetch(`${DAEMON_URL}/api/account`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accountId }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Failed to switch account`);
  }
  return res.json();
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${DAEMON_URL}/api/projects`);
  if (!res.ok) throw new Error(`Failed to fetch projects`);
  return res.json();
}

export async function createProject(data: { name: string; description?: string; designerId?: string; templateId?: string; skillIds?: string[] }): Promise<Project> {
  const res = await fetch(`${DAEMON_URL}/api/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || 'Failed to create project');
  }
  return json;
}

export async function fetchProject(projectId: string): Promise<Project> {
  const res = await fetch(`${DAEMON_URL}/api/projects/${projectId}`);
  if (!res.ok) throw new Error(`Failed to fetch project ${projectId}`);
  return res.json();
}

export async function fetchTemplates(): Promise<SceneTemplate[]> {
  const res = await fetch(`${DAEMON_URL}/api/templates`);
  if (!res.ok) throw new Error(`Failed to fetch scene templates`);
  return res.json();
}

export async function activateTaskGraphNode(projectId: string, nodeId: string): Promise<{ project: Project; activeNode: TaskGraphNode }> {
  const res = await fetch(`${DAEMON_URL}/api/projects/${projectId}/taskgraph/activate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nodeId }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to activate task node');
  return json;
}

export async function startTaskNode(projectId: string, nodeId: string, skillIds?: string[]): Promise<{ message: string; node: TaskGraphNode; project: Project }> {
  const res = await fetch(`${DAEMON_URL}/api/projects/${projectId}/taskgraph/nodes/${nodeId}/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nodeId, skillIds }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to start task node');
  return json;
}

export async function completeTaskNode(projectId: string, nodeId: string, outputSummary?: string): Promise<{ message: string; node: TaskGraphNode; project: Project }> {
  const res = await fetch(`${DAEMON_URL}/api/projects/${projectId}/taskgraph/nodes/${nodeId}/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ outputSummary }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to complete task node');
  return json;
}

// M2 Run APIs
export async function createRun(projectId: string, data: { nodeId?: string; designerId?: string; inputPrompt?: string; skillIds?: string[] }): Promise<Run> {
  const res = await fetch(`${DAEMON_URL}/api/projects/${projectId}/runs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to start run');
  return json;
}

export async function fetchProjectRuns(projectId: string): Promise<Run[]> {
  const res = await fetch(`${DAEMON_URL}/api/projects/${projectId}/runs`);
  if (!res.ok) throw new Error(`Failed to fetch runs for project ${projectId}`);
  return res.json();
}

export async function fetchRun(runId: string): Promise<Run> {
  const res = await fetch(`${DAEMON_URL}/api/runs/${runId}`);
  if (!res.ok) throw new Error(`Failed to fetch run ${runId}`);
  return res.json();
}

export async function cancelRun(runId: string): Promise<{ message: string; run: Run }> {
  const res = await fetch(`${DAEMON_URL}/api/runs/${runId}/cancel`, {
    method: 'POST',
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to cancel run');
  return json;
}

export async function gateProject(projectId: string): Promise<{ message: string; project: Project }> {
  const res = await fetch(`${DAEMON_URL}/api/projects/${projectId}/gate`, {
    method: 'POST',
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || 'Gate check failed');
  }
  return json;
}

export async function shipProject(projectId: string): Promise<{ message: string; project: Project }> {
  const res = await fetch(`${DAEMON_URL}/api/projects/${projectId}/ship`, {
    method: 'POST',
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || 'Ship failed');
  }
  return json;
}

export async function fetchDesigners(): Promise<Designer[]> {
  const res = await fetch(`${DAEMON_URL}/api/designers`);
  if (!res.ok) throw new Error(`Failed to fetch designers`);
  return res.json();
}

export async function bindDesignerSkills(designerId: string, skillIds: string[]): Promise<Designer> {
  const res = await fetch(`${DAEMON_URL}/api/designers/${designerId}/skills`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ skillIds }),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || 'Failed to update designer skills');
  }
  return json;
}

export async function fetchSkills(): Promise<Skill[]> {
  const res = await fetch(`${DAEMON_URL}/api/skills`);
  if (!res.ok) throw new Error(`Failed to fetch skills`);
  return res.json();
}

export async function fetchDesignerToolSurface(designerId: string): Promise<ToolSurface> {
  const res = await fetch(`${DAEMON_URL}/api/designers/${designerId}/tool-surface`);
  if (!res.ok) throw new Error(`Failed to fetch tool surface for designer ${designerId}`);
  return res.json();
}

export function subscribeToEvents(onEvent: (event: any) => void): () => void {
  try {
    const eventSource = new EventSource(`${DAEMON_URL}/events`);
    eventSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        onEvent(data);
      } catch {
        // ignore parse error
      }
    };
    return () => eventSource.close();
  } catch {
    return () => {};
  }
}
