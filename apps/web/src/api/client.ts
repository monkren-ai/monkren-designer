import type { Account, Project, Designer, Skill, DaemonHealth } from '../types';

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

export async function createProject(data: { name: string; description?: string; designerId?: string; skillIds?: string[] }): Promise<Project> {
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
