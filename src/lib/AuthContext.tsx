"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getStoredUser, clearAuth, persistAuth } from "./api";

interface User {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  persistAuth: (token: string, user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = getStoredUser();
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error("Failed to load stored user", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (token: string, userData: User) => {
    persistAuth(token, userData);
    setUser(userData);
  };

  const handlePersistAuth = (token: string, userData: User) => {
    persistAuth(token, userData);
    setUser(userData);
  };

  const logout = () => {
    clearAuth();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, persistAuth: handlePersistAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Return a fallback rather than throwing to prevent crashes during HMR/prerendering
    return {
      user: null,
      isLoading: false,
      login: () => {},
      logout: () => {},
      persistAuth: () => {},
    };
  }
  return context;
}

