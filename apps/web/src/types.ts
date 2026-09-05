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

export interface Project {
  id: string;
  name: string;
  description: string;
  ownerAccountId: string;
  designerId?: string;
  gatePassed: boolean;
  shipped: boolean;
  status: 'draft' | 'in_progress' | 'ready_to_ship' | 'shipped';
  createdAt: string;
  updatedAt: string;
}
