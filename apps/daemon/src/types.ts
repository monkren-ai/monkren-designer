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

export interface CreateProjectInput {
  name: string;
  description?: string;
  designerId?: string;
  templateId?: string;
  skillIds?: string[]; // Note: creating projects with skillIds must be rejected!
}

export interface GateShipInput {
  action: 'gate' | 'ship';
}

// M1: TaskGraph & Mode Switching Types
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
  dependencies: string[]; // Node IDs that must complete first
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

export interface StartTaskNodeInput {
  nodeId: string;
  skillIds?: string[]; // Note: Starting a task node with skillIds must ALSO be rejected!
}
