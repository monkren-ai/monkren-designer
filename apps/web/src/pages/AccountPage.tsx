import React, { useState } from 'react';
import { Button } from 'aios-ui-kit/button';
import { Badge } from 'aios-ui-kit/badge';
import { 
  ShieldCheck, 
  Check, 
  AlertTriangle
} from 'lucide-react';
import { useDaemon } from '../context/DaemonContext';

export const AccountPage: React.FC = () => {
  const { currentAccount, availableAccounts, switchAccount } = useDaemon();
  const [switching, setSwitching] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSwitch = async (id: string) => {
    try {
      setSwitching(true);
      await switchAccount(id);
      setSuccess(`Session switched to ${id}`);
      setTimeout(() => setSuccess(null), 3000);
    } catch {
      // ignore
    } finally {
      setSwitching(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <ShieldCheck className="w-6 h-6 text-rose-500" />
          Account & Privilege Management
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Owner privilege governance. Gate checks and Ship operations require session match.
        </p>
      </div>

      {success && (
        <div className="p-3 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          {success}
        </div>
      )}

      {/* Active Session Info */}
      <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-950 space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            Current Authenticated Session
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {currentAccount ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <span className="text-xs text-neutral-500 block">Name:</span>
              <span className="text-white font-medium text-sm">{currentAccount.name}</span>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-neutral-500 block">Account ID:</span>
              <span className="text-rose-400 font-mono text-sm">{currentAccount.id}</span>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-neutral-500 block">Role Privilege:</span>
              <Badge variant="primary" size="sm" className="font-mono uppercase text-xs">
                {currentAccount.role}
              </Badge>
            </div>
          </div>
        ) : (
          <div className="text-neutral-500 text-sm">No session active. Connect to Daemon.</div>
        )}
      </div>

      {/* Switch Session (To test gate/ship permission invariants) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
            Available Test Accounts (Switch Session)
          </h3>
          <span className="text-xs text-neutral-500 font-mono">
            Test "Session match required for Gate/Ship"
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {availableAccounts.map((acc) => {
            const isCurrent = currentAccount?.id === acc.id;
            return (
              <div
                key={acc.id}
                className={`p-5 rounded-xl border transition-all flex flex-col justify-between gap-4 ${
                  isCurrent
                    ? 'border-emerald-500/60 bg-emerald-950/20'
                    : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{acc.name}</span>
                    <Badge variant={acc.role === 'owner' ? 'primary' : 'outline'} size="sm" className="font-mono uppercase text-[10px]">
                      {acc.role}
                    </Badge>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono">{acc.email}</div>
                  <div className="text-[11px] text-neutral-500 font-mono">ID: {acc.id}</div>
                </div>

                <div className="pt-3 border-t border-neutral-900 flex items-center justify-between">
                  {isCurrent ? (
                    <span className="text-emerald-400 text-xs font-mono font-medium flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      Active Session
                    </span>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={switching}
                      className="text-xs font-mono"
                      onClick={() => handleSwitch(acc.id)}
                    >
                      Switch to this Account
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Invariant Rule Explanation */}
      <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 text-xs space-y-2">
        <div className="flex items-center gap-2 text-rose-400 font-semibold">
          <AlertTriangle className="w-4 h-4" />
          Governance Invariants
        </div>
        <p className="text-neutral-400 leading-relaxed">
          - <strong>Owner = project Account privilege:</strong> A project has <code className="text-neutral-300">ownerAccountId</code>.
          <br />
          - <strong>Gate/Ship require session match:</strong> If you switch to another account (e.g. Collaborator User), the Daemon will strictly reject attempts to Gate or Ship projects owned by <code className="text-neutral-300">acc_owner_01</code>.
          <br />
          - <strong>Designer ≠ Owner:</strong> Designers are specialized agents, not accounts with project ownership privilege.
        </p>
      </div>
    </div>
  );
};
