import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from 'aios-ui-kit/button';
import { Badge } from 'aios-ui-kit/badge';
import { 
  ArrowLeft, 
  Layers, 
  Terminal, 
  Cpu, 
  Boxes, 
  RotateCcw, 
  Sliders, 
  Code2,
  Sparkles,
  Eye,
  PanelLeftClose,
  PanelRightClose
} from 'lucide-react';
import { DaemonPill } from '../components/DaemonPill';

export const WorkbenchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sceneParam = searchParams.get('scene') || 'console';
  const briefParam = searchParams.get('brief') || 'AIOS Telemetry Workspace & Verification Canvas';
  const projectId = searchParams.get('projectId');

  const [activeTab, setActiveTab] = useState<'canvas' | 'code' | 'inspection'>('canvas');
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);

  // Mock interactive canvas state
  const [refreshCount, setRefreshCount] = useState(0);

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
            Back
          </Button>

          <div className="h-4 w-px bg-neutral-800" />

          <div className="flex items-center gap-2">
            <span className="font-bold text-xs tracking-tight text-white flex items-center gap-1.5 font-mono">
              <Layers className="w-4 h-4 text-rose-500" />
              HOST SHELL:
            </span>
            <span className="text-xs text-neutral-300 font-mono truncate max-w-[200px] sm:max-w-[320px]">
              {projectId ? `Project: ${projectId}` : briefParam}
            </span>
          </div>

          <Badge variant="outline" size="sm" className="hidden md:inline-flex text-[10px] font-mono">
            {sceneParam.toUpperCase()}
          </Badge>
        </div>

        {/* Viewport & View Mode Selectors */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center bg-neutral-900 border border-neutral-800 rounded p-0.5 text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveTab('canvas')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeTab === 'canvas' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5 inline mr-1" />
              Canvas
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('code')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeTab === 'code' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 inline mr-1" />
              Source Spec
            </button>
          </div>

          <div className="h-4 w-px bg-neutral-800 hidden sm:block" />

          <DaemonPill />
        </div>
      </header>

      {/* Main Host Shell Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Drawer / Layer Tree */}
        {showLeftPanel && (
          <aside className="w-64 border-r border-neutral-800 bg-neutral-950/90 flex flex-col z-10 shrink-0">
            <div className="p-3 border-b border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
                Canvas Layers
              </span>
              <button
                type="button"
                onClick={() => setShowLeftPanel(false)}
                className="text-neutral-500 hover:text-white text-xs"
              >
                <PanelLeftClose className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs font-mono">
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-between text-neutral-200">
                <span className="flex items-center gap-1.5">
                  <Boxes className="w-3.5 h-3.5 text-rose-400" />
                  Root Workspace Frame
                </span>
                <span className="text-[10px] text-neutral-500">100%</span>
              </div>

              <div className="pl-4 space-y-1.5">
                <div className="p-1.5 rounded hover:bg-neutral-900/60 text-neutral-400 flex items-center gap-1.5">
                  <span className="text-neutral-600">├─</span>
                  <Terminal className="w-3 h-3 text-neutral-500" />
                  Header Telemetry Bar
                </div>
                <div className="p-1.5 rounded hover:bg-neutral-900/60 text-neutral-400 flex items-center gap-1.5">
                  <span className="text-neutral-600">├─</span>
                  <Sliders className="w-3 h-3 text-neutral-500" />
                  DotMatrix Metric Panel
                </div>
                <div className="p-1.5 rounded hover:bg-neutral-900/60 text-neutral-400 flex items-center gap-1.5">
                  <span className="text-neutral-600">└─</span>
                  <Cpu className="w-3 h-3 text-neutral-500" />
                  Agent Execution Log
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-900">
                <span className="text-[11px] text-neutral-500 block mb-2 uppercase tracking-wide">
                  Design Tokens
                </span>
                <div className="space-y-1 text-[11px] text-neutral-400">
                  <div className="flex justify-between">
                    <span>--surface</span>
                    <span className="text-neutral-500 font-mono">#0f0f10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>--border-visible</span>
                    <span className="text-neutral-500 font-mono">#262626</span>
                  </div>
                  <div className="flex justify-between">
                    <span>--accent</span>
                    <span className="text-rose-500 font-mono">#e63946</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Center Canvas Viewport */}
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
                Layers
              </Button>
            )}
            <div className="flex items-center gap-1 bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs font-mono text-neutral-400 shadow">
              <span>Zoom:</span>
              <span className="text-white font-semibold">100%</span>
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

          {/* Canvas Host Container */}
          <div className="w-full max-w-4xl bg-black border border-neutral-800 rounded-lg shadow-2xl overflow-hidden flex flex-col my-auto transition-all animate-fade-in">
            {/* Window title bar */}
            <div className="h-8 bg-neutral-950 border-b border-neutral-800 px-3 flex items-center justify-between text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                </div>
                <span className="text-neutral-500 pl-2">aios-workbench-host-shell</span>
              </div>
              <span className="text-neutral-600 text-[10px]">aios-ui-kit v3.0.0</span>
            </div>

            {/* Embedded Screen Mock */}
            <div className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
                <div>
                  <div className="text-xs font-mono text-rose-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    AIOS DESIGN CANVAS M0
                  </div>
                  <h2 className="text-lg font-bold text-white mt-1">
                    System Kernel Console Specification
                  </h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {briefParam}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm" className="text-xs font-mono">
                    Inspect AST
                  </Button>
                  <Button variant="primary" size="sm" className="text-xs font-mono bg-rose-600">
                    Export React 19 Spec
                  </Button>
                </div>
              </div>

              {/* Grid of UI Kit components inside canvas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded border border-neutral-800 bg-neutral-950/70 space-y-2">
                  <div className="text-[11px] font-mono text-neutral-500 uppercase">
                    Telemetry Ingestion
                  </div>
                  <div className="text-2xl font-mono font-bold text-white tracking-tight">
                    99.98%
                  </div>
                  <div className="text-[11px] text-emerald-400 font-mono">
                    ● Stable continuous sampling
                  </div>
                </div>

                <div className="p-4 rounded border border-neutral-800 bg-neutral-950/70 space-y-2">
                  <div className="text-[11px] font-mono text-neutral-500 uppercase">
                    Agent Heartbeat
                  </div>
                  <div className="text-2xl font-mono font-bold text-white tracking-tight">
                    12ms
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono">
                    Local daemon loopback
                  </div>
                </div>

                <div className="p-4 rounded border border-neutral-800 bg-neutral-950/70 space-y-2">
                  <div className="text-[11px] font-mono text-neutral-500 uppercase">
                    Quality Gate Invariant
                  </div>
                  <div className="text-2xl font-mono font-bold text-rose-500 tracking-tight">
                    ENFORCED
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono">
                    Owner session check strict
                  </div>
                </div>
              </div>

              {/* Industrial Interactive Simulation */}
              <div className="p-4 rounded border border-neutral-800 bg-neutral-950 font-mono text-xs space-y-2">
                <div className="text-neutral-500 text-[11px] flex justify-between">
                  <span>TERMINAL LOG BUFFER</span>
                  <span>ID: stream_host_mock_{refreshCount}</span>
                </div>
                <div className="text-neutral-300 space-y-1">
                  <div><span className="text-rose-500">&gt;</span> Initializing AIOS Designer Host Shell canvas adapter...</div>
                  <div><span className="text-neutral-500">&gt;</span> Binding aios-ui-kit industrial monochrome token system</div>
                  <div><span className="text-emerald-400">&gt;</span> Gate/Ship invariant active: ownerAccountId verified</div>
                  <div><span className="text-neutral-400">&gt;</span> Ready for full canvas writeback expansion in future iterations.</div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right Drawer / Inspector */}
        {showRightPanel && (
          <aside className="w-72 border-l border-neutral-800 bg-neutral-950/90 flex flex-col z-10 shrink-0">
            <div className="p-3 border-b border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
                Inspector
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
                <label className="text-neutral-500 text-[11px] block">PROPERTIES</label>
                <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800 space-y-2 text-neutral-300">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Component:</span>
                    <span>WorkbenchHost</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Framework:</span>
                    <span>React 19 + Tailwind v4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">UI Kit:</span>
                    <span>aios-ui-kit 3.0.0</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-500 text-[11px] block">CANVAS SCOPE</label>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Per product design requirements: Full canvas capability is long-term; this MVP delivers the immersive workbench host shell.
                </p>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
