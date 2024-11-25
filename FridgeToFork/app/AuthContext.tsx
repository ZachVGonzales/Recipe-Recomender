// AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean
  applogin: () => void;
  applogout: () => void;
  setLoading: (arg0: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false); // Initial loading state

  const applogin = () => setIsAuthenticated(true);
  const applogout = () => setIsAuthenticated(false);

  // Memoize the context value to avoid unnecessary re-renders
  const value = useMemo(
    () => ({
      isAuthenticated,
      loading,
      applogin,
      applogout,
      setLoading,
    }),
    [isAuthenticated, loading] // Dependencies that determine when the memoized value should change
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};