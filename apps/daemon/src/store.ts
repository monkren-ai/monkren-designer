import type { Account, Skill, Designer, Project } from './types.js';

export class DataStore {
  public accounts: Account[] = [
    {
      id: 'acc_owner_01',
      name: 'Lead Designer & Architect',
      email: 'owner@aios-designer.local',
      role: 'owner',
    },
    {
      id: 'acc_member_02',
      name: 'Collaborator User',
      email: 'member@aios-designer.local',
      role: 'member',
    },
  ];

  // Default active session account
  public currentAccountId: string = 'acc_owner_01';

  public skills: Skill[] = [
    {
      id: 'skill-01-research',
      name: 'Design Research & Taste Lab',
      description: 'Explore visual taste archetypes and product design directions',
      category: 'research',
      version: '6.2.0',
    },
    {
      id: 'skill-02-create',
      name: 'Wireframe & Variation Generator',
      description: 'Synthesize low-fidelity wireframes and high-fidelity variations',
      category: 'create',
      version: '6.2.0',
    },
    {
      id: 'skill-03-execute',
      name: 'Interactive Prototyping',
      description: 'Generate production-ready code prototypes with aios-ui-kit',
      category: 'execute',
      version: '6.2.0',
    },
    {
      id: 'skill-04-review',
      name: '5-Dim Taste & Slop Reviewer',
      description: 'Review aesthetics, visual hierarchy, rhythm, and ai-slop check',
      category: 'review',
      version: '6.2.0',
    },
    {
      id: 'skill-05-improve',
      name: 'Surgical Design Fixer',
      description: 'Fix design issues based on review metrics without regression',
      category: 'improve',
      version: '6.2.0',
    },
    {
      id: 'skill-advisor-council',
      name: 'Design Decision Council',
      description: 'First principles cross-stage critical design evaluator',
      category: 'advisor',
      version: '6.2.0',
    },
  ];

  public designers: Designer[] = [
    {
      id: 'des_monkren_core',
      name: 'Monkren Agent',
      title: 'Autonomous Design Specialist',
      avatar: '/avatars/monkren.png',
      status: 'idle',
      assignedSkillIds: [
        'skill-01-research',
        'skill-02-create',
        'skill-03-execute',
        'skill-04-review',
        'skill-05-improve',
      ],
    },
    {
      id: 'des_council_advisor',
      name: 'Council Advisor',
      title: 'First-Principles Critical Reviewer',
      avatar: '/avatars/council.png',
      status: 'idle',
      assignedSkillIds: ['skill-advisor-council'],
    },
  ];

  public projects: Project[] = [
    {
      id: 'proj_sample_01',
      name: 'AIOS Studio Shell',
      description: 'Next generation monochrome workspace for AI operating systems',
      ownerAccountId: 'acc_owner_01',
      designerId: 'des_monkren_core',
      gatePassed: true,
      shipped: false,
      status: 'ready_to_ship',
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'proj_sample_02',
      name: 'Cloud Observability Dashboard',
      description: 'High-density metrics and dotmatrix telemetry widgets',
      ownerAccountId: 'acc_owner_01',
      designerId: 'des_monkren_core',
      gatePassed: false,
      shipped: false,
      status: 'in_progress',
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  getCurrentAccount(): Account {
    return this.accounts.find(a => a.id === this.currentAccountId) || this.accounts[0];
  }

  setCurrentAccount(accountId: string): Account | null {
    const acc = this.accounts.find(a => a.id === accountId);
    if (!acc) return null;
    this.currentAccountId = acc.id;
    return acc;
  }
}
