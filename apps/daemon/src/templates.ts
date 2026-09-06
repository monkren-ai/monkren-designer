import type { SceneTemplate } from './types.js';

export const SCENE_TEMPLATES: SceneTemplate[] = [
  {
    id: 'tpl_ui_telemetry_console',
    name: 'Industrial Telemetry Console',
    category: 'ui',
    description: 'High-density telemetry terminal with dot-matrix loaders, status banners, and mono tables.',
    archetype: 'console',
    tags: ['monochrome', 'dense', 'telemetry', 'realtime'],
    initialGraph: {
      nodes: [
        {
          id: 'node-1-research',
          title: 'Telemetry Density Archetype Research',
          stage: '01-research',
          mode: 'inspect',
          description: 'Establish sensory thresholds, grid density ratios, and dotmatrix font baseline.',
          dependencies: [],
          outputSummary: 'Tokens resolved: 14px mono grid, zero-gradient borders, pure OLED black.',
        },
        {
          id: 'node-2-wireframe',
          title: '3-Pane Command Frame Layout',
          stage: '02-create',
          mode: 'design',
          description: 'Synthesize wireframe hierarchy for stream ingestion, log buffer, and status header.',
          dependencies: ['node-1-research'],
          outputSummary: 'Wireframe variant 2 approved with collapsible telemetry sidebars.',
        },
        {
          id: 'node-3-code',
          title: 'Interactive React 19 + aios-ui-kit Spec',
          stage: '03-execute',
          mode: 'code',
          description: 'Bind aios-ui-kit Button, Badge, and dotmatrix canvas components.',
          dependencies: ['node-2-wireframe'],
        },
        {
          id: 'node-4-review',
          title: '5-Dim Taste & Slop Audit',
          stage: '04-review',
          mode: 'review',
          description: 'Verify zero-blur invariant, font-weight clarity, and keyboard accessibility.',
          dependencies: ['node-3-code'],
        },
        {
          id: 'node-5-improve',
          title: 'Gate Metric Polish & Packaging',
          stage: '05-improve',
          mode: 'inspect',
          description: 'Final surgical polish pass on state badges and latency indicators before gate check.',
          dependencies: ['node-4-review'],
        },
      ],
      edges: [
        { from: 'node-1-research', to: 'node-2-wireframe' },
        { from: 'node-2-wireframe', to: 'node-3-code' },
        { from: 'node-3-code', to: 'node-4-review' },
        { from: 'node-4-review', to: 'node-5-improve' },
      ],
    },
  },
  {
    id: 'tpl_ui_agent_canvas',
    name: 'Autonomous Agent Workspace',
    category: 'ui',
    description: 'Multi-agent orchestration canvas with live reasoning graphs and human-in-the-loop checkpoints.',
    archetype: 'agent-canvas',
    tags: ['agents', 'canvas', 'graph', 'reasoning'],
    initialGraph: {
      nodes: [
        {
          id: 'node-1-canvas-bounds',
          title: 'Spatial Canvas Navigation Spec',
          stage: '01-research',
          mode: 'inspect',
          description: 'Formulate infinite canvas pan/zoom constraints and grid alignment rules.',
          dependencies: [],
          outputSummary: 'Spatial grid calibrated to 16px increments with hardware acceleration.',
        },
        {
          id: 'node-2-node-cards',
          title: 'Node Card Topology & Connectors',
          stage: '02-create',
          mode: 'design',
          description: 'Design step-node cards, connection splines, and agent presence avatars.',
          dependencies: ['node-1-canvas-bounds'],
        },
        {
          id: 'node-3-exec-engine',
          title: 'Graph Execution Inspector',
          stage: '03-execute',
          mode: 'code',
          description: 'Code the interactive execution visualizer using MotionProvider spring physics.',
          dependencies: ['node-2-node-cards'],
        },
        {
          id: 'node-4-taste-council',
          title: 'Design Decision Council Review',
          stage: '04-review',
          mode: 'review',
          description: 'Run first-principles council assessment on cognitive load and action ambiguity.',
          dependencies: ['node-3-exec-engine'],
        },
      ],
      edges: [
        { from: 'node-1-canvas-bounds', to: 'node-2-node-cards' },
        { from: 'node-2-node-cards', to: 'node-3-exec-engine' },
        { from: 'node-3-exec-engine', to: 'node-4-taste-council' },
      ],
    },
  },
  {
    id: 'tpl_product_gate_ship_pipeline',
    name: 'Enterprise Quality Gate & Release Portal',
    category: 'product',
    description: 'Product lifecycle pipeline with rigid owner privilege gates, sign-off verification, and release packaging.',
    archetype: 'dashboard',
    tags: ['governance', 'gate', 'ship', 'rbac'],
    initialGraph: {
      nodes: [
        {
          id: 'node-1-policy',
          title: 'Privilege & Invariant Specification',
          stage: '01-research',
          mode: 'inspect',
          description: 'Lock in ownerAccountId session verification and skill-designer binding policies.',
          dependencies: [],
          outputSummary: 'Rule matrix frozen: Owner session match for Gate/Ship; no skillIds on project/task start.',
        },
        {
          id: 'node-2-gate-ui',
          title: 'Gate Review & Checklist Interface',
          stage: '02-create',
          mode: 'design',
          description: 'Create unambiguous visual states for pending, passed, and blocked gate conditions.',
          dependencies: ['node-1-policy'],
        },
        {
          id: 'node-3-review-pass',
          title: 'Pre-Ship Comprehensive Verification',
          stage: '04-review',
          mode: 'review',
          description: 'Full pass on security boundary, role enforcement, and audit trail fidelity.',
          dependencies: ['node-2-gate-ui'],
        },
        {
          id: 'node-4-ship-action',
          title: 'Release Deployment Action View',
          stage: '05-improve',
          mode: 'inspect',
          description: 'Synthesize ship execution confirmation modal with changelog and bundle digest.',
          dependencies: ['node-3-review-pass'],
        },
      ],
      edges: [
        { from: 'node-1-policy', to: 'node-2-gate-ui' },
        { from: 'node-2-gate-ui', to: 'node-3-review-pass' },
        { from: 'node-3-review-pass', to: 'node-4-ship-action' },
      ],
    },
  },
  {
    id: 'tpl_product_mobile_companion',
    name: 'Mobile Handheld Companion',
    category: 'product',
    description: 'Compact touch-first inspector for approving gate passes and monitoring autonomous designer streams.',
    archetype: 'mobile',
    tags: ['mobile', 'touch', 'approvals', 'compact'],
    initialGraph: {
      nodes: [
        {
          id: 'node-1-touch-ergonomics',
          title: 'Touch Hit Area & Ergonomics Audit',
          stage: '01-research',
          mode: 'inspect',
          description: 'Define 44px min tap targets, bottom sheet gestures, and thumb-friendly controls.',
          dependencies: [],
        },
        {
          id: 'node-2-mobile-frame',
          title: 'Mobile Shell & Navigation Bar',
          stage: '02-create',
          mode: 'design',
          description: 'Synthesize mobile chrome with quick approval pills and badge indicators.',
          dependencies: ['node-1-touch-ergonomics'],
        },
        {
          id: 'node-3-mobile-review',
          title: 'Small-Viewport Slop & Rhythm Pass',
          stage: '04-review',
          mode: 'review',
          description: 'Ensure layout rhythm holds on small viewports without horizontal scrolling.',
          dependencies: ['node-2-mobile-frame'],
        },
      ],
      edges: [
        { from: 'node-1-touch-ergonomics', to: 'node-2-mobile-frame' },
        { from: 'node-2-mobile-frame', to: 'node-3-mobile-review' },
      ],
    },
  },
];

export function createGraphFromTemplate(templateId: string, projectName: string) {
  const template = SCENE_TEMPLATES.find((t) => t.id === templateId) || SCENE_TEMPLATES[0];
  return {
    id: `graph_${Date.now()}`,
    name: `${projectName} TaskGraph`,
    sceneId: template.id,
    nodes: template.initialGraph.nodes.map((n, idx) => ({
      ...n,
      status: idx === 0 ? ('completed' as const) : idx === 1 ? ('in_progress' as const) : ('pending' as const),
    })),
    edges: [...template.initialGraph.edges],
    activeNodeId: template.initialGraph.nodes[1]?.id || template.initialGraph.nodes[0]?.id,
  };
}
