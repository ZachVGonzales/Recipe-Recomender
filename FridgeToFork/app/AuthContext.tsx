// AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  applogin: () => void;
  applogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Initial loading state


  const applogin = () => setIsAuthenticated(true);
  const applogout = () => setIsAuthenticated(false);
  const setLoadingFalse = () => setLoading(false)

  return (
    <AuthContext.Provider value={{ isAuthenticated, applogin, applogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};