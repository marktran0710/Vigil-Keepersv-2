import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type UserRole = "admin" | "elder" | "family";

type AuthContextValue = {
  role: UserRole | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticatedAs: (role: UserRole) => boolean;
};

const STORAGE_KEY = "carebridge.activeRole";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function isUserRole(value: string | null): value is UserRole {
  return value === "admin" || value === "elder" || value === "family";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const storedRole = window.localStorage.getItem(STORAGE_KEY);
    if (isUserRole(storedRole)) {
      setRole(storedRole);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      role,
      login: (nextRole) => {
        window.localStorage.setItem(STORAGE_KEY, nextRole);
        setRole(nextRole);
      },
      logout: () => {
        window.localStorage.removeItem(STORAGE_KEY);
        setRole(null);
      },
      isAuthenticatedAs: (requiredRole) => role === requiredRole,
    }),
    [role],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
