import React, { useEffect, useState } from 'react';
import { Badge } from 'aios-ui-kit/badge';
import { 
  Cpu, 
  Search
} from 'lucide-react';
import type { Skill } from '../types';
import { fetchSkills } from '../api/client';
import { useDaemon } from '../context/DaemonContext';

export const SkillsPage: React.FC = () => {
  const { isOnline } = useDaemon();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    if (isOnline) {
      fetchSkills()
        .then(setSkills)
        .finally(() => setLoading(false));
    }
  }, [isOnline]);

  const categories = ['all', 'research', 'create', 'execute', 'review', 'improve', 'advisor'];

  const filteredSkills = skills.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                          s.description.toLowerCase().includes(search.toLowerCase()) ||
                          s.id.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || s.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Cpu className="w-6 h-6 text-rose-500" />
          Modular Skills Catalog
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Atomic capability units for design stages (Research, Create, Execute, Review, Improve, Advisor).
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategoryFilter(c)}
              className={`px-2.5 py-1 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                categoryFilter === c
                  ? 'bg-rose-600 text-white font-bold'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search skills..."
            className="w-full bg-neutral-900 border border-neutral-800 rounded pl-8 pr-3 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-rose-500 font-mono"
          />
        </div>
      </div>

      {/* Skills Grid */}
      {loading ? (
        <div className="p-12 text-center text-neutral-500 font-mono text-sm">
          Loading skills from Daemon...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-4 rounded-xl border border-neutral-800 bg-neutral-950 hover:border-neutral-700 transition-colors flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-white text-sm tracking-tight">
                    {skill.name}
                  </span>
                  <Badge variant="outline" size="sm" className="font-mono text-[10px] uppercase shrink-0">
                    {skill.category}
                  </Badge>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-900 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>{skill.id}</span>
                <span className="text-neutral-400">v{skill.version}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
