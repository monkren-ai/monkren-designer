export interface DaemonHealth {
  status: 'ok' | 'error';
  product: string;
  version: string;
  uptime: number;
  timestamp: string;
  features: {
    sse: boolean;
    ws: boolean;
  };
}

export interface Account {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'member' | 'guest';
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
}

export interface Designer {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  status: 'idle' | 'busy' | 'offline';
  assignedSkillIds: string[];
}

export type WorkbenchMode = 'design' | 'review' | 'code' | 'inspect';

export type TaskNodeStatus = 'pending' | 'in_progress' | 'completed' | 'failed' | 'skipped';

export interface TaskGraphNode {
  id: string;
  title: string;
  stage: '01-research' | '02-create' | '03-execute' | '04-review' | '05-improve';
  mode: WorkbenchMode;
  status: TaskNodeStatus;
  description: string;
  outputSummary?: string;
  dependencies: string[];
  designerId?: string;
}

export interface TaskGraphEdge {
  from: string;
  to: string;
}

export interface TaskGraph {
  id: string;
  name: string;
  sceneId: string;
  nodes: TaskGraphNode[];
  edges: TaskGraphEdge[];
  activeNodeId?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  ownerAccountId: string;
  designerId?: string;
  gatePassed: boolean;
  shipped: boolean;
  status: 'draft' | 'in_progress' | 'ready_to_ship' | 'shipped';
  taskGraph?: TaskGraph;
  createdAt: string;
  updatedAt: string;
}

export interface SceneTemplate {
  id: string;
  name: string;
  category: 'ui' | 'product';
  description: string;
  archetype: 'console' | 'dashboard' | 'mobile' | 'agent-canvas';
  tags: string[];
  initialGraph: {
    nodes: Omit<TaskGraphNode, 'status'>[];
    edges: TaskGraphEdge[];
  };
}
