import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'aios-ui-kit/button';
import { Badge } from 'aios-ui-kit/badge';
import { 
  Sparkles, 
  Layers, 
  ArrowRight, 
  Compass, 
  Boxes, 
  Sliders, 
  CheckCircle2,
  Terminal,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { useDaemon } from '../context/DaemonContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isOnline, health } = useDaemon();
  const [brief, setBrief] = useState(
    'Synthesize an AI-native telemetry console with monochrome dot-matrix metrics and autonomous design governance.'
  );
  const [sceneType, setSceneType] = useState<'console' | 'dashboard' | 'mobile' | 'agent-canvas'>('console');
  const [generating, setGenerating] = useState(false);

  const handleStartBrief = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      navigate(`/workbench?scene=${sceneType}&brief=${encodeURIComponent(brief)}`);
    }, 600);
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Hero Section */}
      <div className="relative border border-neutral-800 bg-neutral-950/60 rounded-xl p-8 sm:p-10 overflow-hidden dot-grid-subtle">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/5 blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            AIOS DESIGNER FOUNDATION MVP
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Autonomous Design Studio for <span className="text-rose-500">AI Operating Systems</span>.
          </h1>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl">
            A high-efficiency web shell powered by a local Node daemon. Combining first-principles
            design verification, rigid role separation (Account Owner vs Designer Agents), and 
            industrial monochrome ergonomics with <code className="text-neutral-200 bg-neutral-800/80 px-1 py-0.5 rounded text-xs">aios-ui-kit</code>.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Button
              variant="primary"
              size="lg"
              className="gap-2 bg-rose-600 hover:bg-rose-500 text-white"
              onClick={() => navigate('/projects')}
            >
              Explore Projects
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="gap-2"
              onClick={() => navigate('/workbench')}
            >
              <Layers className="w-4 h-4" />
              Launch Workbench Host
            </Button>
          </div>
        </div>
      </div>

      {/* Brief & Scene Setup Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Brief Generator */}
        <div className="lg:col-span-2 border border-neutral-800 bg-neutral-950 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-rose-500" />
              <div>
                <h3 className="font-semibold text-white text-sm">Brief & Scene Synthesizer</h3>
                <p className="text-xs text-neutral-400">Specify design intention or select an archetypal scene</p>
              </div>
            </div>
            <Badge variant="outline" size="sm" className="font-mono text-[11px]">
              Stage 01 • Research
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-2">
                Design Intent / Brief Statement
              </label>
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                rows={3}
                className="w-full bg-neutral-900/90 border border-neutral-800 focus:border-rose-500 focus:outline-none rounded-lg p-3 text-sm text-neutral-200 placeholder-neutral-500 font-mono transition-colors"
                placeholder="Describe what you want the Designer agent to synthesize..."
              />
            </div>

            {/* Scene Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-neutral-300">
                Target Scene Archetype
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'console', label: 'Console / Terminal', icon: Terminal },
                  { id: 'dashboard', label: 'Telemetry Grid', icon: Boxes },
                  { id: 'mobile', label: 'Handheld Frame', icon: Sliders },
                  { id: 'agent-canvas', label: 'Agent Workspace', icon: Cpu },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = sceneType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSceneType(item.id as any)}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-medium transition-all ${
                        active
                          ? 'border-rose-500 bg-rose-500/10 text-white'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1.5 ${active ? 'text-rose-400' : 'text-neutral-500'}`} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-neutral-500 font-mono">
                Wires into TaskGraph & mode switching
              </span>
              <Button
                variant="primary"
                className="gap-2 bg-rose-600 hover:bg-rose-500 text-white"
                onClick={handleStartBrief}
                disabled={generating || !brief.trim()}
              >
                {generating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Launching Shell...
                  </>
                ) : (
                  <>
                    <Layers className="w-3.5 h-3.5" />
                    Synthesize in Workbench
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* System Architecture & Decisions Card */}
        <div className="border border-neutral-800 bg-neutral-950 rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-2 border-b border-neutral-800/80 pb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h3 className="font-semibold text-white text-sm">Product Architecture Invariants</h3>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="p-2.5 rounded bg-neutral-900/60 border border-neutral-800/60 space-y-1">
              <div className="text-neutral-200 font-medium">1. Account Privilege (Owner)</div>
              <div className="text-neutral-400 text-[11px] leading-relaxed">
                Project owner is assigned to Account (<code className="text-neutral-300">ownerAccountId</code>). Gate check and Ship actions strictly require session match.
              </div>
            </div>

            <div className="p-2.5 rounded bg-neutral-900/60 border border-neutral-800/60 space-y-1">
              <div className="text-neutral-200 font-medium">2. Designer ≠ Owner</div>
              <div className="text-neutral-400 text-[11px] leading-relaxed">
                Designers are autonomous agents executing work. They do not hold project ownership or unilateral release rights.
              </div>
            </div>

            <div className="p-2.5 rounded bg-neutral-900/60 border border-neutral-800/60 space-y-1">
              <div className="text-neutral-200 font-medium">3. Skill Binding Invariant</div>
              <div className="text-neutral-400 text-[11px] leading-relaxed">
                Skills bind only to Designers. Creating projects with <code className="text-neutral-300">skillIds</code> is strictly rejected by the Daemon.
              </div>
            </div>

            <div className="p-2.5 rounded bg-neutral-900/60 border border-neutral-800/60 space-y-1">
              <div className="text-neutral-200 font-medium">4. Daemon Health Status</div>
              <div className="text-neutral-400 text-[11px] leading-relaxed font-mono">
                {isOnline && health ? (
                  <span className="text-emerald-400">
                    Online (v{health.version}, uptime {Math.round(health.uptime)}s)
                  </span>
                ) : (
                  <span className="text-rose-400">Offline (Run pnpm dev:daemon)</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
