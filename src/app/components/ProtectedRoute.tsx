import React from "react";
import { Navigate, useLocation } from "react-router";
import { UserRole, useAuth } from "../context/AuthContext";

type ProtectedRouteProps = {
  role: UserRole;
  children: React.ReactNode;
};

export function ProtectedRoute({ role, children }: ProtectedRouteProps) {
  const { isAuthenticatedAs } = useAuth();
  const location = useLocation();

  if (!isAuthenticatedAs(role)) {
    return (
      <Navigate
        to={`/login/${role}`}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <>{children}</>;
}
