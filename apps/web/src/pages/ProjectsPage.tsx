import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'aios-ui-kit/button';
import { Badge } from 'aios-ui-kit/badge';
import { 
  FolderGit2, 
  Plus, 
  ShieldCheck, 
  Send, 
  AlertCircle,
  Clock,
  Layers,
  Sparkles,
  UserCheck
} from 'lucide-react';
import type { Project, Designer } from '../types';
import { fetchProjects, createProject, gateProject, shipProject, fetchDesigners } from '../api/client';
import { useDaemon } from '../context/DaemonContext';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentAccount, isOnline } = useDaemon();
  const [projects, setProjects] = useState<Project[]>([]);
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [loading, setLoading] = useState(true);

  // New Project Form Modal / Drawer State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [designerId, setDesignerId] = useState('');
  // Field to test invariant: projects create must reject skillIds
  const [testIllegalSkillIds, setTestIllegalSkillIds] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [p, d] = await Promise.all([fetchProjects(), fetchDesigners()]);
      setProjects(p);
      setDesigners(d);
      if (d.length > 0 && !designerId) {
        setDesignerId(d[0].id);
      }
    } catch (err: any) {
      setActionError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOnline) {
      loadData();
    }
  }, [isOnline]);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);
    setActionSuccess(null);

    try {
      const payload: any = {
        name,
        description,
        designerId: designerId || undefined,
      };

      if (testIllegalSkillIds) {
        payload.skillIds = ['skill-01-research']; // Should be rejected by daemon
      }

      const created = await createProject(payload);
      setActionSuccess(`Project "${created.name}" created successfully!`);
      setName('');
      setDescription('');
      setTestIllegalSkillIds(false);
      setShowCreateModal(false);
      await loadData();
    } catch (err: any) {
      setActionError(err.message);
    }
  };

  const handleGate = async (projId: string) => {
    setActionError(null);
    setActionSuccess(null);
    try {
      const res = await gateProject(projId);
      setActionSuccess(res.message);
      await loadData();
    } catch (err: any) {
      setActionError(err.message);
    }
  };

  const handleShip = async (projId: string) => {
    setActionError(null);
    setActionSuccess(null);
    try {
      const res = await shipProject(projId);
      setActionSuccess(res.message);
      await loadData();
    } catch (err: any) {
      setActionError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <FolderGit2 className="w-6 h-6 text-rose-500" />
            Projects Registry
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Account-owned design specifications, autonomous designer assignments, and gate/ship governance.
          </p>
        </div>

        <Button
          variant="primary"
          className="gap-2 bg-rose-600 hover:bg-rose-500 text-white self-start sm:self-auto"
          onClick={() => {
            setShowCreateModal(true);
            setActionError(null);
            setActionSuccess(null);
          }}
        >
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      {/* Notification Banners */}
      {actionError && (
        <div className="p-4 rounded-lg bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs sm:text-sm flex items-start gap-3 animate-fade-in">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold block">Operation Rejected</span>
            <span>{actionError}</span>
          </div>
        </div>
      )}

      {actionSuccess && (
        <div className="p-4 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm flex items-start gap-3 animate-fade-in">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold block">Success</span>
            <span>{actionSuccess}</span>
          </div>
        </div>
      )}

      {/* Modal / Dialog for creating project */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-rose-500" />
                Initialize New Design Project
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-neutral-500 hover:text-white text-sm font-mono"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Project Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. AIOS Terminal v2"
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-rose-500 focus:outline-none rounded px-3 py-2 text-sm text-neutral-200"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Design goals, target audience, token constraints..."
                  rows={2}
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-rose-500 focus:outline-none rounded px-3 py-2 text-sm text-neutral-200"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Assign Designer Agent
                </label>
                <select
                  value={designerId}
                  onChange={(e) => setDesignerId(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-rose-500 focus:outline-none rounded px-3 py-2 text-sm text-neutral-200 font-mono"
                >
                  {designers.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.title})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Designers execute work and hold assigned skills. Designer ≠ Owner.
                </p>
              </div>

              {/* Invariant test toggle */}
              <div className="p-3 rounded bg-neutral-900/60 border border-neutral-800/80 space-y-1.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={testIllegalSkillIds}
                    onChange={(e) => setTestIllegalSkillIds(e.target.checked)}
                    className="accent-rose-500 rounded"
                  />
                  <span className="text-xs text-rose-300 font-medium">
                    Test Invariant: Try passing illegal <code>skillIds</code> in payload
                  </span>
                </label>
                <p className="text-[11px] text-neutral-400 pl-5">
                  Specification rule: "Skills bind only to Designers; create/start must NOT accept skillIds".
                  Daemon will reject this request if checked.
                </p>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-neutral-800">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Create Project
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects List */}
      {loading ? (
        <div className="p-12 text-center text-neutral-500 font-mono text-sm">
          Loading projects from Daemon...
        </div>
      ) : projects.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-neutral-800 rounded-xl space-y-3">
          <FolderGit2 className="w-10 h-10 text-neutral-600 mx-auto" />
          <p className="text-sm text-neutral-400">No design projects registered yet.</p>
          <Button variant="secondary" size="sm" onClick={() => setShowCreateModal(true)}>
            Create First Project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((proj) => {
            const designer = designers.find((d) => d.id === proj.designerId);
            const isOwnerSession = currentAccount && currentAccount.id === proj.ownerAccountId;

            return (
              <div
                key={proj.id}
                className="border border-neutral-800/80 hover:border-neutral-700 bg-neutral-950 rounded-xl p-5 space-y-4 flex flex-col justify-between transition-colors shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-white text-base tracking-tight">
                        {proj.name}
                      </h3>
                      <p className="text-xs text-neutral-400 line-clamp-2 mt-1">
                        {proj.description || 'No description provided.'}
                      </p>
                    </div>

                    <Badge
                      variant={proj.shipped ? 'primary' : proj.gatePassed ? 'default' : 'outline'}
                      size="sm"
                      className="font-mono text-[10px] uppercase shrink-0"
                    >
                      {proj.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1 border-t border-neutral-900">
                    <div className="space-y-1">
                      <span className="text-neutral-500 text-[11px] block">OWNER PRIVILEGE:</span>
                      <div className="flex items-center gap-1.5 text-neutral-300">
                        <UserCheck className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="truncate">{proj.ownerAccountId}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-neutral-500 text-[11px] block">DESIGNER AGENT:</span>
                      <div className="flex items-center gap-1.5 text-neutral-300">
                        <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                        <span className="truncate">{designer?.name || proj.designerId || 'None'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>Created: {new Date(proj.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="pt-3 border-t border-neutral-900 flex flex-wrap items-center justify-between gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="gap-1.5 text-xs font-mono"
                    onClick={() => navigate(`/workbench?projectId=${proj.id}`)}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    Open Host Shell
                  </Button>

                  <div className="flex items-center gap-2">
                    {/* Gate Check button */}
                    {!proj.gatePassed && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="gap-1.5 text-xs border-amber-600/30 text-amber-400 hover:border-amber-500"
                        title={
                          isOwnerSession
                            ? 'Run quality gate check'
                            : 'Gate check requires matching session owner'
                        }
                        onClick={() => handleGate(proj.id)}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Run Gate
                      </Button>
                    )}

                    {/* Ship Button */}
                    {!proj.shipped && (
                      <Button
                        variant="primary"
                        size="sm"
                        className={`gap-1.5 text-xs ${
                          proj.gatePassed
                            ? 'bg-rose-600 hover:bg-rose-500 text-white'
                            : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                        }`}
                        title={
                          !proj.gatePassed
                            ? 'Must pass gate before shipping'
                            : isOwnerSession
                            ? 'Ship design release'
                            : 'Ship requires matching session owner'
                        }
                        onClick={() => handleShip(proj.id)}
                      >
                        <Send className="w-3.5 h-3.5" />
                        Ship
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
