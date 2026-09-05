import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { DaemonHealth, Account } from '../types';
import { fetchHealth, fetchAccount, switchAccount as apiSwitchAccount, subscribeToEvents } from '../api/client';

interface DaemonContextValue {
  health: DaemonHealth | null;
  isOnline: boolean;
  isLoading: boolean;
  currentAccount: Account | null;
  availableAccounts: Account[];
  switchAccount: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const DaemonContext = createContext<DaemonContextValue | null>(null);

export const DaemonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [health, setHealth] = useState<DaemonHealth | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentAccount, setCurrentAccount] = useState<Account | null>(null);
  const [availableAccounts, setAvailableAccounts] = useState<Account[]>([]);

  const checkDaemon = useCallback(async () => {
    try {
      const h = await fetchHealth();
      setHealth(h);
      setIsOnline(true);
      const acc = await fetchAccount();
      setCurrentAccount(acc.currentAccount);
      setAvailableAccounts(acc.availableAccounts);
    } catch {
      setIsOnline(false);
      setHealth(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkDaemon();
    const timer = setInterval(checkDaemon, 5000);
    const unsubscribe = subscribeToEvents(() => {
      checkDaemon();
    });
    return () => {
      clearInterval(timer);
      unsubscribe();
    };
  }, [checkDaemon]);

  const switchAccount = async (id: string) => {
    const res = await apiSwitchAccount(id);
    setCurrentAccount(res.currentAccount);
    await checkDaemon();
  };

  return (
    <DaemonContext.Provider
      value={{
        health,
        isOnline,
        isLoading,
        currentAccount,
        availableAccounts,
        switchAccount,
        refresh: checkDaemon,
      }}
    >
      {children}
    </DaemonContext.Provider>
  );
};

export function useDaemon() {
  const ctx = useContext(DaemonContext);
  if (!ctx) throw new Error('useDaemon must be used within DaemonProvider');
  return ctx;
}
