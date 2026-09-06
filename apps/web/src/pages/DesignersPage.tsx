import React, { useEffect, useState } from 'react';
import { Badge } from 'aios-ui-kit/badge';
import { 
  Users, 
  Sparkles, 
  Check,
  Wrench,
  ShieldAlert
} from 'lucide-react';
import type { Designer, Skill, ToolSurface } from '../types';
import { fetchDesigners, fetchSkills, bindDesignerSkills, fetchDesignerToolSurface } from '../api/client';
import { useDaemon } from '../context/DaemonContext';

export const DesignersPage: React.FC = () => {
  const { isOnline } = useDaemon();
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDesigner, setSelectedDesigner] = useState<Designer | null>(null);
  const [toolSurface, setToolSurface] = useState<ToolSurface | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [d, s] = await Promise.all([fetchDesigners(), fetchSkills()]);
      setDesigners(d);
      setSkills(s);
      if (d.length > 0 && !selectedDesigner) {
        setSelectedDesigner(d[0]);
      } else if (selectedDesigner) {
        const found = d.find(item => item.id === selectedDesigner.id);
        if (found) setSelectedDesigner(found);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOnline) loadData();
  }, [isOnline]);

  useEffect(() => {
    if (selectedDesigner) {
      fetchDesignerToolSurface(selectedDesigner.id)
        .then(setToolSurface)
        .catch(() => setToolSurface(null));
    } else {
      setToolSurface(null);
    }
  }, [selectedDesigner]);

  const toggleSkill = async (skillId: string) => {
    if (!selectedDesigner) return;
    const currentSkills = selectedDesigner.assignedSkillIds || [];
    const newSkills = currentSkills.includes(skillId)
      ? currentSkills.filter(id => id !== skillId)
      : [...currentSkills, skillId];

    try {
      setSaving(true);
      const updated = await bindDesignerSkills(selectedDesigner.id, newSkills);
      setSelectedDesigner(updated);
      setDesigners(prev => prev.map(d => d.id === updated.id ? updated : d));
      // Refresh tool surface preview
      const surface = await fetchDesignerToolSurface(updated.id);
      setToolSurface(surface);
      setSuccessMessage(`Skills updated for ${updated.name}`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Users className="w-6 h-6 text-rose-500" />
          Designers & Agent Roster
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Specialized design agents executing tasks. <span className="text-neutral-200 font-medium">Invariant: Skills bind ONLY to Designers</span> (not projects or owners).
        </p>
      </div>

      {successMessage && (
        <div className="p-3 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          {successMessage}
        </div>
      )}

      {loading ? (
        <div className="p-12 text-center text-neutral-500 font-mono text-sm">
          Loading designers...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Designers List */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider font-mono">
              Autonomous Designers
            </h3>
            {designers.map((d) => {
              const isSelected = selectedDesigner?.id === d.id;
              return (
                <div
                  key={d.id}
                  onClick={() => setSelectedDesigner(d)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-rose-500 bg-neutral-900/90 shadow-sm'
                      : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-white text-sm flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                        {d.name}
                      </div>
                      <div className="text-xs text-neutral-400 mt-0.5">{d.title}</div>
                    </div>
                    <Badge variant={d.status === 'idle' ? 'default' : 'outline'} size="sm" className="text-[10px] font-mono">
                      {d.status}
                    </Badge>
                  </div>

                  <div className="mt-3 pt-3 border-t border-neutral-900 flex items-center justify-between text-xs text-neutral-500 font-mono">
                    <span>Assigned Skills:</span>
                    <span className="text-neutral-300 font-bold">{d.assignedSkillIds.length}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Skill Binding Panel for Selected Designer */}
          <div className="lg:col-span-2 border border-neutral-800 bg-neutral-950 rounded-xl p-6 space-y-6">
            {selectedDesigner ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
                  <div>
                    <div className="text-xs font-mono text-rose-500 uppercase tracking-wider">
                      BIND SKILLS TO DESIGNER
                    </div>
                    <h3 className="text-lg font-bold text-white mt-0.5">
                      {selectedDesigner.name}
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Toggle skills below to equip or remove capabilities for this agent.
                    </p>
                  </div>

                  <Badge variant="outline" size="sm" className="font-mono text-xs self-start">
                    ID: {selectedDesigner.id}
                  </Badge>
                </div>

                {/* M3: Dynamic Tool Surface Preview */}
                <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-3 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-rose-500" />
                      M3 Tool Surface Preview
                    </span>
                    <span className="text-[10px] text-neutral-500">
                      (Skill-Declared ∩ Harness-Implemented)
                    </span>
                  </div>

                  {toolSurface ? (
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="text-neutral-400 text-[11px]">Permitted Run Tools:</span>
                        {toolSurface.allowedTools.length > 0 ? (
                          toolSurface.allowedTools.map((tool) => (
                            <Badge key={tool} variant="primary" size="sm" className="bg-emerald-950/80 border-emerald-500/40 text-emerald-300 font-mono text-[10px]">
                              {tool}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-rose-400 text-[11px] font-semibold flex items-center gap-1">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            [EMPTY SURFACE: Agent has no allowed tools]
                          </span>
                        )}
                      </div>

                      <div className="text-[10px] text-neutral-500 flex flex-col sm:flex-row gap-1 sm:gap-4 pt-1 border-t border-neutral-800/60">
                        <span>Declared: {toolSurface.skillDeclaredTools.length} tools</span>
                        <span>Implemented: {toolSurface.harnessImplementedTools.join(', ')}</span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-neutral-500 text-xs">Computing tool surface...</span>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-mono text-neutral-400">
                    AVAILABLE SKILLS REPOSITORY ({skills.length}):
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {skills.map((skill) => {
                      const isEquipped = selectedDesigner.assignedSkillIds.includes(skill.id);
                      return (
                        <div
                          key={skill.id}
                          onClick={() => !saving && toggleSkill(skill.id)}
                          className={`p-3 rounded-lg border cursor-pointer transition-all flex flex-col justify-between gap-2 ${
                            isEquipped
                              ? 'border-emerald-500/50 bg-emerald-950/20 text-neutral-200'
                              : 'border-neutral-800/80 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-xs text-white">
                                {skill.name}
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 uppercase">
                                {skill.category}
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-400 line-clamp-2">
                              {skill.description}
                            </p>

                            {/* M3: Allowed tools list */}
                            {skill.toolsAllowed && skill.toolsAllowed.length > 0 && (
                              <div className="flex flex-wrap items-center gap-1 pt-1">
                                <span className="text-[10px] text-neutral-500 font-mono">Tools:</span>
                                {skill.toolsAllowed.map(tool => (
                                  <span key={tool} className="text-[9px] font-mono px-1 py-0.2 rounded bg-neutral-800/80 text-rose-300">
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[11px] font-mono">
                            <span className="text-neutral-500">{skill.id}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 ${
                              isEquipped
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-neutral-800 text-neutral-500'
                            }`}>
                              {isEquipped ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  EQUIPPED
                                </>
                              ) : (
                                'UNBOUND'
                              )}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center p-12 text-neutral-500">
                Select a designer to manage bound skills
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
