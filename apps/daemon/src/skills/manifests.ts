export interface SkillManifest {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  toolsAllowed: string[]; // List of tool names this skill permits
}

/**
 * Seed skill packages for M3.
 * Represents modular skill capabilities and the tool names they permit.
 */
export const SEED_SKILLS: SkillManifest[] = [
  {
    id: 'skill-01-research',
    name: 'Design Research & Taste Lab',
    description: 'Explore visual taste archetypes and product design directions with repository reading and inspiration analysis',
    category: 'research',
    version: '6.3.0',
    toolsAllowed: ['repo.read_file', 'submit_result'],
  },
  {
    id: 'skill-02-create',
    name: 'Wireframe & Variation Generator',
    description: 'Synthesize low-fidelity wireframes and high-fidelity variations',
    category: 'create',
    version: '6.3.0',
    toolsAllowed: ['repo.read_file', 'submit_result'],
  },
  {
    id: 'skill-03-execute',
    name: 'Interactive Prototyping',
    description: 'Generate production-ready code prototypes with aios-ui-kit',
    category: 'execute',
    version: '6.3.0',
    toolsAllowed: ['repo.read_file', 'submit_result'],
  },
  {
    id: 'skill-04-review',
    name: '5-Dim Taste & Slop Reviewer',
    description: 'Review aesthetics, visual hierarchy, rhythm, and ai-slop check (read-only analysis)',
    category: 'review',
    version: '6.3.0',
    toolsAllowed: ['repo.read_file', 'submit_result'],
  },
  {
    id: 'skill-05-improve',
    name: 'Surgical Design Fixer',
    description: 'Fix design issues based on review metrics without regression',
    category: 'improve',
    version: '6.3.0',
    toolsAllowed: ['repo.read_file', 'submit_result'],
  },
  {
    id: 'skill-advisor-council',
    name: 'Design Decision Council',
    description: 'First principles cross-stage critical design evaluator (read-only advisory)',
    category: 'advisor',
    version: '6.3.0',
    toolsAllowed: ['repo.read_file', 'submit_result'],
  },
  // Specialized seed skills requested in M3
  {
    id: 'skill-read-repo',
    name: 'Research & Repo Reader',
    description: 'Read-only skill permitted to inspect repository files and synthesize research insights',
    category: 'research',
    version: '1.0.0',
    toolsAllowed: ['repo.read_file'],
  },
  {
    id: 'skill-submit-only',
    name: 'Submit Only Reporter',
    description: 'Strict output submission capability without file read or system tools',
    category: 'execute',
    version: '1.0.0',
    toolsAllowed: ['submit_result'],
  },
  {
    id: 'skill-shell-eval-unimplemented',
    name: 'Experimental Code Runner (Unimplemented)',
    description: 'Experimental skill requesting harness-unimplemented tools like shell.exec to test tool surface intersection',
    category: 'execute',
    version: '0.1.0',
    toolsAllowed: ['shell.exec', 'submit_result'],
  },
];
