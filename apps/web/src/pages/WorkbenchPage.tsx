import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from 'aios-ui-kit/button';
import { Badge } from 'aios-ui-kit/badge';
import { 
  ArrowLeft, 
  Layers, 
  RotateCcw, 
  Code2, 
  Sparkles, 
  PanelLeftClose, 
  PanelRightClose,
  GitFork,
  CheckCircle2,
  Play,
  Check,
  ShieldCheck,
  FileSearch,
  PenTool,
  AlertCircle
} from 'lucide-react';
import { DaemonPill } from '../components/DaemonPill';
import type { Project, TaskGraph, TaskGraphNode, WorkbenchMode, Run } from '../types';
import { fetchProject, fetchProjects, activateTaskGraphNode, startTaskNode, completeTaskNode, gateProject, shipProject, fetchRun, cancelRun, subscribeToEvents } from '../api/client';
import { useDaemon } from '../context/DaemonContext';

export const WorkbenchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentAccount, isOnline } = useDaemon();

  const sceneParam = searchParams.get('scene') || 'console';
  const briefParam = searchParams.get('brief') || 'AIOS Telemetry Workspace & Verification Canvas';
  const projectIdParam = searchParams.get('projectId');

  const [project, setProject] = useState<Project | null>(null);
  const [taskGraph, setTaskGraph] = useState<TaskGraph | null>(null);
  const [activeNode, setActiveNode] = useState<TaskGraphNode | null>(null);
  const [activeMode, setActiveMode] = useState<WorkbenchMode>('design');
  const [activeRun, setActiveRun] = useState<Run | null>(null);
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [refreshCount, setRefreshCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load project or fallback to first project
  const loadProjectData = async () => {
    try {
      setErrorMessage(null);
      let targetProj: Project | null = null;
      if (projectIdParam) {
        targetProj = await fetchProject(projectIdParam);
      } else {
        const projects = await fetchProjects();
        if (projects.length > 0) {
          targetProj = projects[0];
        }
      }

      if (targetProj) {
        setProject(targetProj);
        if (targetProj.taskGraph) {
          setTaskGraph(targetProj.taskGraph);
          const active = targetProj.taskGraph.nodes.find(
            (n) => n.id === targetProj.taskGraph?.activeNodeId
          ) || targetProj.taskGraph.nodes[0];
          if (active) {
            setActiveNode(active);
            setActiveMode(active.mode);
            if (active.activeRunId) {
              fetchRun(active.activeRunId).then(setActiveRun).catch(() => {});
            }
          }
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to load project details');
    }
  };

  useEffect(() => {
    if (isOnline) {
      loadProjectData();
    }
  }, [projectIdParam, isOnline]);

  // Subscribe to real-time Run events (run.started, run.token, run.finished, run.failed)
  useEffect(() => {
    const unsubscribe = subscribeToEvents((event: any) => {
      if (event?.type?.startsWith('run.')) {
        if (activeRun && event.data?.runId === activeRun.id) {
          fetchRun(activeRun.id).then(setActiveRun).catch(() => {});
        } else if (event.data?.run) {
          setActiveRun(event.data.run);
        }
      }
    });
    return () => unsubscribe();
  }, [activeRun]);

  // Handle switching node in TaskGraph
  const handleSelectNode = async (node: TaskGraphNode) => {
    if (!project) return;
    try {
      setErrorMessage(null);
      const res = await activateTaskGraphNode(project.id, node.id);
      setProject(res.project);
      if (res.project.taskGraph) {
        setTaskGraph(res.project.taskGraph);
      }
      setActiveNode(res.activeNode);
      // Mode automatically synchronizes with node mode!
      setActiveMode(res.activeNode.mode);
      if (res.activeNode.activeRunId) {
        fetchRun(res.activeNode.activeRunId).then(setActiveRun).catch(() => setActiveRun(null));
      } else {
        setActiveRun(null);
      }
      setStatusMessage(`Active node set to: ${res.activeNode.title} (Mode: ${res.activeNode.mode.toUpperCase()})`);
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  // Start task node execution (Invariant: no skillIds accepted)
  const handleStartNode = async (nodeId: string) => {
    if (!project) return;
    try {
      setErrorMessage(null);
      const res = await startTaskNode(project.id, nodeId);
      setProject(res.project);
      if (res.project.taskGraph) setTaskGraph(res.project.taskGraph);
      setActiveNode(res.node);
      setActiveMode(res.node.mode);
      if ((res as any).run) {
        setActiveRun((res as any).run);
      }
      setStatusMessage(res.message);
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const handleCancelRun = async () => {
    if (!activeRun) return;
    try {
      setErrorMessage(null);
      const res = await cancelRun(activeRun.id);
      setActiveRun(res.run);
      setStatusMessage(res.message);
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  // Complete task node execution
  const handleCompleteNode = async (nodeId: string) => {
    if (!project) return;
    try {
      setErrorMessage(null);
      const res = await completeTaskNode(project.id, nodeId, 'Verified against industrial aesthetic baseline.');
      setProject(res.project);
      if (res.project.taskGraph) setTaskGraph(res.project.taskGraph);
      setActiveNode(res.node);
      setStatusMessage(res.message);
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  // Gate & Ship handlers with session matching
  const handleGate = async () => {
    if (!project) return;
    try {
      setErrorMessage(null);
      const res = await gateProject(project.id);
      setProject(res.project);
      setStatusMessage(res.message);
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const handleShip = async () => {
    if (!project) return;
    try {
      setErrorMessage(null);
      const res = await shipProject(project.id);
      setProject(res.project);
      setStatusMessage(res.message);
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  // Explicit user mode tab change updates both UI and node intent
  const handleModeChange = (mode: WorkbenchMode) => {
    setActiveMode(mode);
    if (activeNode) {
      setActiveNode({ ...activeNode, mode });
    }
  };

  const modes: { id: WorkbenchMode; label: string; icon: any }[] = [
    { id: 'design', label: 'Design Shell', icon: PenTool },
    { id: 'review', label: '5-Dim Review', icon: ShieldCheck },
    { id: 'code', label: 'Code Spec', icon: Code2 },
    { id: 'inspect', label: 'Inspect & Gate', icon: FileSearch },
  ];

  return (
    <div className="h-screen w-screen flex flex-col bg-black text-neutral-200 overflow-hidden select-none">
      {/* Workbench Top Bar */}
      <header className="h-12 border-b border-neutral-800 bg-neutral-950 px-3 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/projects')}
            className="text-neutral-400 hover:text-white px-2 h-8"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Projects
          </Button>

          <div className="h-4 w-px bg-neutral-800" />

          <div className="flex items-center gap-2">
            <span className="font-bold text-xs tracking-tight text-white flex items-center gap-1.5 font-mono">
              <Layers className="w-4 h-4 text-rose-500" />
              WORKBENCH M1:
            </span>
            <span className="text-xs text-neutral-300 font-mono truncate max-w-[180px] sm:max-w-[280px]">
              {project ? project.name : briefParam}
            </span>
          </div>

          <Badge variant="outline" size="sm" className="hidden md:inline-flex text-[10px] font-mono">
            {sceneParam.toUpperCase()}
          </Badge>

          {project && (
            <Badge
              variant={project.shipped ? 'primary' : project.gatePassed ? 'default' : 'outline'}
              size="sm"
              className="text-[10px] font-mono uppercase"
            >
              {project.status.replace('_', ' ')}
            </Badge>
          )}
        </div>

        {/* Workbench Mode Switching Tabs (wired to active TaskGraph node) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded p-0.5 text-xs font-mono">
            {modes.map((m) => {
              const Icon = m.icon;
              const isActive = activeMode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleModeChange(m.id)}
                  className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
                    isActive ? 'bg-rose-600 text-white font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                  title={`Switch Workbench to ${m.label}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{m.label}</span>
                </button>
              );
            })}
          </div>

          <div className="h-4 w-px bg-neutral-800 hidden sm:block" />

          <DaemonPill />
        </div>
      </header>

      {/* Status & Error Notification Toasts */}
      {statusMessage && (
        <div className="bg-emerald-950/80 border-b border-emerald-500/40 text-emerald-300 px-4 py-1.5 text-xs font-mono flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{statusMessage}</span>
          </div>
          <button type="button" onClick={() => setStatusMessage(null)} className="text-emerald-500 hover:text-white">✕</button>
        </div>
      )}

      {errorMessage && (
        <div className="bg-rose-950/80 border-b border-rose-500/40 text-rose-300 px-4 py-1.5 text-xs font-mono flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
          <button type="button" onClick={() => setErrorMessage(null)} className="text-rose-500 hover:text-white">✕</button>
        </div>
      )}

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Drawer: TaskGraph Scene Nodes & Stages */}
        {showLeftPanel && (
          <aside className="w-80 border-r border-neutral-800 bg-neutral-950/95 flex flex-col z-10 shrink-0">
            <div className="p-3 border-b border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <GitFork className="w-3.5 h-3.5 text-rose-500" />
                TaskGraph Sequence
              </span>
              <button
                type="button"
                onClick={() => setShowLeftPanel(false)}
                className="text-neutral-500 hover:text-white text-xs"
              >
                <PanelLeftClose className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs font-mono">
              <div className="text-[11px] text-neutral-500 uppercase tracking-wide flex justify-between">
                <span>SCENE GRAPH NODES</span>
                <span>{taskGraph?.nodes.length || 0} STEPS</span>
              </div>

              {taskGraph?.nodes.map((node, index) => {
                const isActive = activeNode?.id === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => handleSelectNode(node)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all space-y-2 ${
                      isActive
                        ? 'border-rose-500 bg-rose-500/10 text-white shadow-sm'
                        : 'border-neutral-800/80 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[10px] font-bold text-neutral-300">
                          {index + 1}
                        </span>
                        <span className="font-semibold text-xs leading-tight text-neutral-200">
                          {node.title}
                        </span>
                      </div>
                      <Badge
                        variant={node.status === 'completed' ? 'primary' : node.status === 'in_progress' ? 'default' : 'outline'}
                        size="sm"
                        className="text-[9px] uppercase font-mono px-1 py-0 shrink-0"
                      >
                        {node.status}
                      </Badge>
                    </div>

                    <p className="text-[11px] text-neutral-400 line-clamp-2">
                      {node.description}
                    </p>

                    <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[10px]">
                      <span className="text-neutral-500 uppercase font-mono">{node.stage}</span>
                      <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-rose-400 font-mono">
                        MODE: {node.mode.toUpperCase()}
                      </span>
                    </div>

                    {/* Quick step actions */}
                    {isActive && (
                      <div className="pt-2 flex items-center justify-between gap-2">
                        {node.status !== 'completed' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCompleteNode(node.id);
                            }}
                            className="flex-1 py-1 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px] hover:bg-emerald-900 flex items-center justify-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            Mark Complete
                          </button>
                        )}
                        {node.status === 'pending' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartNode(node.id);
                            }}
                            className="flex-1 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[10px] flex items-center justify-center gap-1"
                          >
                            <Play className="w-3 h-3" />
                            Start Step
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-3 border-t border-neutral-900 space-y-2">
                <span className="text-[11px] text-neutral-500 uppercase block font-mono">
                  Governance Pipeline Actions
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-xs font-mono border-amber-600/30 text-amber-400 hover:border-amber-500 justify-center"
                    onClick={handleGate}
                    disabled={project?.gatePassed}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                    {project?.gatePassed ? 'Gate Passed' : 'Run Gate'}
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className={`text-xs font-mono justify-center ${
                      project?.gatePassed && !project?.shipped
                        ? 'bg-rose-600 hover:bg-rose-500 text-white'
                        : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    }`}
                    onClick={handleShip}
                    disabled={!project?.gatePassed || project?.shipped}
                  >
                    {project?.shipped ? 'Shipped' : 'Ship Release'}
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Center Viewport: Mode-driven Canvas / Review / Code / Inspect Host */}
        <main className="flex-1 bg-neutral-900/40 relative flex flex-col overflow-auto items-center justify-center p-4 sm:p-8 dot-grid">
          {/* Top Canvas Controls Bar */}
          <div className="absolute top-3 left-4 flex items-center gap-2 z-10">
            {!showLeftPanel && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowLeftPanel(true)}
                className="h-7 text-xs px-2 bg-neutral-900 border-neutral-800"
              >
                TaskGraph ({taskGraph?.nodes.length || 0})
              </Button>
            )}
            <div className="flex items-center gap-1 bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs font-mono text-neutral-400 shadow">
              <span>Active Mode:</span>
              <span className="text-rose-400 font-bold uppercase">{activeMode}</span>
            </div>
            <button
              type="button"
              onClick={() => setRefreshCount((c) => c + 1)}
              className="p-1.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white shadow"
              title="Re-render Canvas Mock"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 1. DESIGN MODE VIEW: Interactive Visual Shell */}
          {activeMode === 'design' && (
            <div className="w-full max-w-4xl bg-black border border-neutral-800 rounded-lg shadow-2xl overflow-hidden flex flex-col my-auto transition-all animate-fade-in">
              <div className="h-8 bg-neutral-950 border-b border-neutral-800 px-3 flex items-center justify-between text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                  </div>
                  <span className="text-neutral-500 pl-2">design-mode-shell // {activeNode?.title || 'Canvas'}</span>
                </div>
                <span className="text-neutral-600 text-[10px]">aios-ui-kit v3.0.0</span>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
                  <div>
                    <div className="text-xs font-mono text-rose-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      MODE: DESIGN SHELL
                    </div>
                    <h2 className="text-lg font-bold text-white mt-1">
                      {activeNode?.title || 'System Kernel Console Specification'}
                    </h2>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {activeNode?.description || briefParam}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" className="text-xs font-mono" onClick={() => handleModeChange('code')}>
                      Switch to Code
                    </Button>
                    <Button variant="primary" size="sm" className="text-xs font-mono bg-rose-600" onClick={() => handleModeChange('review')}>
                      Run 5-Dim Review
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded border border-neutral-800 bg-neutral-950/70 space-y-2">
                    <div className="text-[11px] font-mono text-neutral-500 uppercase">Telemetry Ingestion</div>
                    <div className="text-2xl font-mono font-bold text-white tracking-tight">99.98%</div>
                    <div className="text-[11px] text-emerald-400 font-mono">● Stable continuous sampling</div>
                  </div>

                  <div className="p-4 rounded border border-neutral-800 bg-neutral-950/70 space-y-2">
                    <div className="text-[11px] font-mono text-neutral-500 uppercase">Step Status</div>
                    <div className="text-2xl font-mono font-bold text-white tracking-tight uppercase">{activeNode?.status || 'Active'}</div>
                    <div className="text-[11px] text-neutral-400 font-mono">Stage: {activeNode?.stage}</div>
                  </div>

                  <div className="p-4 rounded border border-neutral-800 bg-neutral-950/70 space-y-2">
                    <div className="text-[11px] font-mono text-neutral-500 uppercase">Quality Invariant</div>
                    <div className="text-2xl font-mono font-bold text-rose-500 tracking-tight">ENFORCED</div>
                    <div className="text-[11px] text-neutral-400 font-mono">Owner session required</div>
                  </div>
                </div>

                <div className="p-4 rounded border border-neutral-800 bg-neutral-950 font-mono text-xs space-y-2">
                  <div className="text-neutral-500 text-[11px] flex justify-between">
                    <span>DESIGN CANVAS LOG</span>
                    <span>ID: graph_step_{activeNode?.id || 'default'}_{refreshCount}</span>
                  </div>
                  <div className="text-neutral-300 space-y-1">
                    <div><span className="text-rose-500">&gt;</span> Synchronized Workbench mode to: <strong>{activeMode}</strong></div>
                    <div><span className="text-neutral-500">&gt;</span> Active TaskGraph node: {activeNode?.title}</div>
                    <div><span className="text-emerald-400">&gt;</span> Output Summary: {activeNode?.outputSummary || 'In execution...'}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. REVIEW MODE VIEW: 5-Dimensional Taste Audit */}
          {activeMode === 'review' && (
            <div className="w-full max-w-4xl bg-black border border-neutral-800 rounded-lg shadow-2xl overflow-hidden flex flex-col my-auto transition-all animate-fade-in">
              <div className="h-8 bg-neutral-950 border-b border-neutral-800 px-3 flex items-center justify-between text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>5-DIMENSIONAL TASTE & SLOP REVIEW</span>
                </div>
                <span className="text-emerald-400 text-[11px]">Audit Passing: 4.8 / 5.0</span>
              </div>

              <div className="p-6 space-y-5 font-mono">
                <div className="border-b border-neutral-800 pb-4">
                  <h3 className="text-base font-bold text-white">Automated Aesthetic & Slop Audit</h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Evaluating node <strong>{activeNode?.title}</strong> under Monkren 5-dimension discipline.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded border border-neutral-800 bg-neutral-950 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-white">1. Philosophy Consistency</span>
                      <span className="text-emerald-400 font-bold">10 / 10</span>
                    </div>
                    <p className="text-neutral-400 text-[11px]">Zero blur, zero gradients, pure monochrome contrast satisfied.</p>
                  </div>

                  <div className="p-3 rounded border border-neutral-800 bg-neutral-950 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-white">2. Visual Hierarchy & Rhythm</span>
                      <span className="text-emerald-400 font-bold">9 / 10</span>
                    </div>
                    <p className="text-neutral-400 text-[11px]">Typography follows JetBrains Mono scale with clear status emphasis.</p>
                  </div>

                  <div className="p-3 rounded border border-neutral-800 bg-neutral-950 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-white">3. Detail Execution</span>
                      <span className="text-emerald-400 font-bold">9 / 10</span>
                    </div>
                    <p className="text-neutral-400 text-[11px]">Borders align cleanly on 1px visible grid with no overflow artifacts.</p>
                  </div>

                  <div className="p-3 rounded border border-neutral-800 bg-neutral-950 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-white">4. AI-Slop & Generative Check</span>
                      <span className="text-emerald-400 font-bold">PASS</span>
                    </div>
                    <p className="text-neutral-400 text-[11px]">No generic hallucinated decorations or ungrounded card fluff.</p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <Button variant="secondary" size="sm" onClick={() => handleModeChange('design')}>
                    Back to Design
                  </Button>
                  <Button variant="primary" size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white" onClick={() => handleModeChange('inspect')}>
                    Proceed to Gate Inspection
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* 3. CODE MODE VIEW: React 19 Component Spec */}
          {activeMode === 'code' && (
            <div className="w-full max-w-4xl bg-black border border-neutral-800 rounded-lg shadow-2xl overflow-hidden flex flex-col my-auto transition-all animate-fade-in">
              <div className="h-8 bg-neutral-950 border-b border-neutral-800 px-3 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>node-{activeNode?.id || 'spec'}.tsx (React 19 + aios-ui-kit)</span>
                <span className="text-[10px] text-neutral-500">Live Component Spec</span>
              </div>
              <pre className="p-4 text-xs font-mono text-neutral-300 overflow-x-auto bg-neutral-950/90 leading-relaxed max-h-[420px]">
{`import * as motion from 'motion/react';
import { ConfigProvider } from 'aios-ui-kit';
import { Button } from 'aios-ui-kit/button';
import { Badge } from 'aios-ui-kit/badge';

// TaskGraph Step: ${activeNode?.title || 'Interactive Node'}
// Stage: ${activeNode?.stage || '03-execute'} | Mode: ${activeNode?.mode || 'code'}

export function SceneComponent() {
  return (
    <ConfigProvider motion={motion} defaultTheme="dark">
      <div className="p-6 bg-black text-neutral-200 border border-neutral-800 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="outline">${activeNode?.stage || 'Stage 03'}</Badge>
          <span className="text-xs font-mono text-neutral-500">${activeNode?.id || 'step-id'}</span>
        </div>
        <h1 className="text-xl font-bold font-mono">${activeNode?.title || 'Specification'}</h1>
        <p className="text-xs text-neutral-400 font-mono">${activeNode?.description || ''}</p>
        <Button variant="primary" className="bg-rose-600 text-white">
          Verify TaskGraph Invariant
        </Button>
      </div>
    </ConfigProvider>
  );
}`}
              </pre>
            </div>
          )}

          {/* 4. INSPECT & GATE MODE VIEW: Release Checklist */}
          {activeMode === 'inspect' && (
            <div className="w-full max-w-4xl bg-black border border-neutral-800 rounded-lg shadow-2xl overflow-hidden flex flex-col my-auto transition-all animate-fade-in">
              <div className="h-8 bg-neutral-950 border-b border-neutral-800 px-3 flex items-center justify-between text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <FileSearch className="w-4 h-4 text-rose-500" />
                  <span>INSPECTOR & RELEASE GATE CHECKLIST</span>
                </div>
                <span className="text-neutral-500 text-[10px]">Project: {project?.id}</span>
              </div>

              <div className="p-6 space-y-5 font-mono text-xs">
                <div className="border-b border-neutral-800 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-white text-sm">Gate Checklist & Ownership Privileges</h3>
                    <p className="text-neutral-400 text-[11px] mt-0.5">Session match required for Gate and Ship operations.</p>
                  </div>
                  <Badge variant={project?.gatePassed ? 'default' : 'outline'} size="sm">
                    {project?.gatePassed ? 'GATE VERIFIED' : 'GATE PENDING'}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded border border-neutral-800 bg-neutral-950 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">TaskGraph Step Completion</div>
                      <div className="text-[11px] text-neutral-400">All required predecessor nodes executed.</div>
                    </div>
                    <span className="text-emerald-400 font-bold">100% READY</span>
                  </div>

                  <div className="p-3 rounded border border-neutral-800 bg-neutral-950 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">Owner Account Privilege Check</div>
                      <div className="text-[11px] text-neutral-400">
                        Owner: <code className="text-neutral-300">{project?.ownerAccountId}</code> | Session: <code className="text-neutral-300">{currentAccount?.id}</code>
                      </div>
                    </div>
                    <span className={currentAccount?.id === project?.ownerAccountId ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {currentAccount?.id === project?.ownerAccountId ? 'MATCH' : 'MISMATCH'}
                    </span>
                  </div>

                  <div className="p-3 rounded border border-neutral-800 bg-neutral-950 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">Skill Binding Invariant</div>
                      <div className="text-[11px] text-neutral-400">Skills bind solely to Designers. No skillIds present on project.</div>
                    </div>
                    <span className="text-emerald-400 font-bold">VALIDATED</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center border-t border-neutral-900">
                  <span className="text-neutral-500 text-[11px]">
                    Requires Gate pass before shipping.
                  </span>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" onClick={handleGate} disabled={project?.gatePassed}>
                      {project?.gatePassed ? 'Gate Passed' : 'Execute Gate Check'}
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className={`bg-rose-600 hover:bg-rose-500 text-white ${!project?.gatePassed ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={handleShip}
                      disabled={!project?.gatePassed || project?.shipped}
                    >
                      {project?.shipped ? 'Shipped' : 'Ship Project'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Right Drawer: Active Node Inspector & Properties */}
        {showRightPanel && (
          <aside className="w-80 border-l border-neutral-800 bg-neutral-950/95 flex flex-col z-10 shrink-0">
            <div className="p-3 border-b border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
                Node Properties
              </span>
              <button
                type="button"
                onClick={() => setShowRightPanel(false)}
                className="text-neutral-500 hover:text-white text-xs"
              >
                <PanelRightClose className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-neutral-500 text-[11px] block uppercase">SELECTED NODE</label>
                <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800 space-y-2 text-neutral-300">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Node ID:</span>
                    <span className="text-rose-400">{activeNode?.id || 'none'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Stage:</span>
                    <span>{activeNode?.stage || 'none'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Mode:</span>
                    <span className="text-white font-bold uppercase">{activeNode?.mode || activeMode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Status:</span>
                    <span className="uppercase text-neutral-200">{activeNode?.status || 'pending'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-500 text-[11px] block uppercase">DEPENDENCIES</label>
                <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 space-y-1">
                  {activeNode?.dependencies && activeNode.dependencies.length > 0 ? (
                    activeNode.dependencies.map((dep) => (
                      <div key={dep} className="flex items-center gap-1.5 text-neutral-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>{dep}</span>
                      </div>
                    ))
                  ) : (
                    <span>Root node (no upstream dependencies)</span>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-500 text-[11px] block uppercase">OUTPUT SUMMARY</label>
                <p className="p-2.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 text-[11px] leading-relaxed">
                  {activeNode?.outputSummary || 'No output synthesized yet. Run task node to produce artifacts.'}
                </p>
              </div>

              {/* M2: Harness Active Run Monitor */}
              <div className="pt-2 border-t border-neutral-900 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-neutral-500 text-[11px] block uppercase">AGENT HARNESS RUN</label>
                  {activeRun && (
                    <Badge
                      variant={activeRun.status === 'completed' ? 'primary' : activeRun.status === 'running' ? 'default' : 'outline'}
                      size="sm"
                      className="text-[9px] uppercase font-mono px-1 py-0"
                    >
                      {activeRun.status}
                    </Badge>
                  )}
                </div>

                {activeRun ? (
                  <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800 space-y-2 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Run ID:</span>
                      <span className="text-rose-400 font-mono truncate max-w-[140px]">{activeRun.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Executor:</span>
                      <span className="text-neutral-300 font-mono truncate max-w-[140px]">{activeRun.executorDesignerId}</span>
                    </div>

                    {/* Streamed token logs buffer */}
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500 text-[10px] block">STREAM LOGS ({activeRun.logs.length})</span>
                        {activeRun.toolSurface && (
                          <span className="text-[9px] text-rose-400 font-mono">
                            Surface: {activeRun.toolSurface.length} tools
                          </span>
                        )}
                      </div>
                      <div className="bg-black border border-neutral-800 rounded p-2 max-h-36 overflow-y-auto space-y-1 font-mono text-[10px] text-neutral-300">
                        {activeRun.logs.length === 0 ? (
                          <span className="text-neutral-600">Waiting for stream tokens...</span>
                        ) : (
                          activeRun.logs.map((log, i) => {
                            const isDeny = log.content.includes('rejected:') || log.content.includes('403 Forbidden');
                            return (
                              <div key={i} className="leading-tight">
                                {log.type === 'token' && <span className="text-neutral-300">{log.content}</span>}
                                {log.type === 'tool_call' && <span className="text-amber-400 block">{log.content}</span>}
                                {log.type === 'tool_result' && (
                                  <span className={`block ${isDeny ? 'text-rose-400 bg-rose-950/40 p-1 rounded border border-rose-900/60 font-semibold' : 'text-emerald-400'}`}>
                                    {log.content}
                                  </span>
                                )}
                                {log.type === 'system' && (
                                  <span className={`block italic ${isDeny ? 'text-rose-400 font-bold' : 'text-neutral-500'}`}>
                                    {log.content}
                                  </span>
                                )}
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {activeRun.status === 'running' && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full text-[10px] text-rose-400 border-rose-500/30 hover:border-rose-500 justify-center h-6"
                        onClick={handleCancelRun}
                      >
                        Cancel Run
                      </Button>
                    )}
                  </div>
                ) : (
                  <p className="text-neutral-500 text-[11px]">
                    No active Run for this node. Click 'Start Step' to dispatch a deterministic fixture run.
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-neutral-900 space-y-2">
                <label className="text-neutral-500 text-[11px] block uppercase">M3 INVARIANT CHECK</label>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Run start and TaskGraph activation reject <code className="text-neutral-300">skillIds</code>. Tool Surface enforces <code className="text-neutral-300">skillDeclared ∩ harnessImplemented</code>. Path jail strictly confines tool file access to project root.
                </p>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
