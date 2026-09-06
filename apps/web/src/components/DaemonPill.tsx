import React from 'react';
import { useDaemon } from '../context/DaemonContext';

export const DaemonPill: React.FC = () => {
  const { isOnline, health, isLoading } = useDaemon();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-neutral-900 border border-neutral-800 text-neutral-400">
        <span className="w-2 h-2 rounded-full bg-neutral-500 animate-pulse" />
        Connecting...
      </div>
    );
  }

  if (isOnline && health) {
    return (
      <div
        className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 shadow-sm"
        title={`Connected to 127.0.0.1:7420 | uptime: ${Math.round(health.uptime)}s | SSE: ${health.features.sse ? 'on' : 'off'}`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="font-semibold">DAEMON ONLINE</span>
        <span className="text-emerald-500/60 hidden sm:inline">127.0.0.1:7420</span>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-rose-950/60 border border-rose-500/40 text-rose-400 shadow-sm"
      title="Daemon offline. Start with `pnpm dev:daemon`"
    >
      <span className="w-2 h-2 rounded-full bg-rose-500" />
      <span className="font-semibold">DAEMON OFFLINE</span>
    </div>
  );
};
