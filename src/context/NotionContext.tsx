import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

interface NotionContextType {
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
}

const NotionContext = createContext<NotionContextType | undefined>(undefined);

export const NotionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnectedState] = useState<boolean>(() => {
    // Initialize from localStorage
    const stored = localStorage.getItem('notionConnected');
    return stored === 'true';
  });

  const setIsConnected = useCallback((connected: boolean) => {
    setIsConnectedState(connected);
    localStorage.setItem('notionConnected', connected.toString());
  }, []);

  useEffect(() => {
    // Note: Backend status checking has been removed since this is now a frontend-only app
    // Connection status is managed entirely through localStorage
    console.log('Notion connection status loaded from localStorage:', isConnected);
  }, [setIsConnected]);

  return (
    <NotionContext.Provider value={{ isConnected, setIsConnected }}>
      {children}
    </NotionContext.Provider>
  );
};

export const useNotion = () => {
  const context = useContext(NotionContext);
  if (context === undefined) {
    throw new Error('useNotion must be used within a NotionProvider');
  }
  return context;
};

