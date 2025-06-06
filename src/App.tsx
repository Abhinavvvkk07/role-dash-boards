import { ThemeProvider } from './components/ui/theme-provider';
import { Login } from './components/auth/Login';
import { Layout } from './components/layout/Layout';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { UserManagement } from './pages/UserManagement';
import { SystemLogs } from './pages/SystemLogs';
import { SecuritySettings } from './pages/SecuritySettings';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { TasksPage } from './pages/TasksPage';
import { TeamOverview } from './pages/TeamOverview';
import { ProjectTracker } from './pages/ProjectTracker';
import { Reports } from './pages/Reports';
import { TeamChat } from './pages/admin/TeamChat';
import { createBrowserRouter, RouterProvider, Navigate, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { managementRoutes } from "./routes/management.routes";
import { employeeRoutes } from "./routes/employee.routes";

function ErrorBoundary() {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-4">Sorry, we couldn't find the page you're looking for.</p>
          <button 
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Go Back
          </button>
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong</h1>
      <p className="text-muted-foreground mb-4">Please try again later.</p>
      <button 
        onClick={() => window.history.back()}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Go Back
      </button>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const userRole = localStorage.getItem('userRole');
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (userRole !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

function DashboardRouter() {
  const userRole = localStorage.getItem('userRole');
  switch (userRole) {
    case 'admin':
      return <AdminDashboard />;
    case 'employee':
      return <Navigate to="/employee" replace />;
    case 'management':
      return <Navigate to="/management" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "dashboard",
        element: <ProtectedRoute><DashboardRouter /></ProtectedRoute>
      },
      {
        path: "settings",
        element: <SettingsPage />
      },
      // Admin Routes
      {
        path: "users",
        element: <AdminRoute><UserManagement /></AdminRoute>
      },
      {
        path: "logs",
        element: <AdminRoute><SystemLogs /></AdminRoute>
      },
      {
        path: "security",
        element: <AdminRoute><SecuritySettings /></AdminRoute>
      },
      {
        path: "notifications",
        element: <AdminRoute><NotificationsPage /></AdminRoute>
      },
      {
        path: "tasks",
        element: <AdminRoute><TasksPage /></AdminRoute>
      },
      {
        path: "team-chat",
        element: <AdminRoute><TeamChat /></AdminRoute>
      }
    ]
  },
  // Management Section
  ...managementRoutes,
  // Employee Section
  ...employeeRoutes
]);

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
