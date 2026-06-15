import { createBrowserRouter } from "react-router";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminDashboard } from "./pages/AdminDashboard";
import { ElderHome } from "./pages/ElderHome";
import { FamilyDashboard } from "./pages/FamilyDashboard";
import { HealthPage } from "./pages/HealthPage";
import { LoginPage } from "./pages/LoginPage";
import { MessagesPage } from "./pages/MessagesPage";
import { Presentation } from "./pages/Presentation";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Presentation,
  },
  {
    path: "/elder",
    element: (
      <ProtectedRoute role="elder">
        <ElderHome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/family",
    element: (
      <ProtectedRoute role="family">
        <FamilyDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login/:role",
    Component: LoginPage,
  },
  {
    path: "/presentation",
    Component: Presentation,
  },
  {
    path: "/health",
    element: (
      <ProtectedRoute role="elder">
        <HealthPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/messages",
    element: (
      <ProtectedRoute role="elder">
        <MessagesPage />
      </ProtectedRoute>
    ),
  },
]);
