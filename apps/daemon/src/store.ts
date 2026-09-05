import type { Account, Skill, Designer, Project, SceneTemplate, Run } from './types.js';
import { SCENE_TEMPLATES, createGraphFromTemplate } from './templates.js';
import { SEED_SKILLS } from './skills/manifests.js';

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

  public skills: Skill[] = SEED_SKILLS.map(s => ({ ...s }));

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
    {
      id: 'des_research_only',
      name: 'Research Analyst',
      title: 'Repository Inspection Specialist',
      avatar: '/avatars/research.png',
      status: 'idle',
      assignedSkillIds: ['skill-read-repo'],
    },
    {
      id: 'des_submit_only',
      name: 'Submitter Agent',
      title: 'Submission Only Reporter',
      avatar: '/avatars/submit.png',
      status: 'idle',
      assignedSkillIds: ['skill-submit-only'],
    },
    {
      id: 'des_unskilled',
      name: 'Unskilled Agent',
      title: 'Agent Without Assigned Skills',
      avatar: '/avatars/unskilled.png',
      status: 'idle',
      assignedSkillIds: [],
    },
  ];

  public templates: SceneTemplate[] = SCENE_TEMPLATES;
  public runs: Run[] = [];

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
      taskGraph: createGraphFromTemplate('tpl_ui_telemetry_console', 'AIOS Studio Shell'),
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
      taskGraph: createGraphFromTemplate('tpl_ui_agent_canvas', 'Cloud Observability Dashboard'),
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
