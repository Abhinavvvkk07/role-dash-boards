import { RouteObject } from "react-router-dom";
import { EmployeeLayout } from "@/components/layout/EmployeeLayout";
import { Dashboard } from "@/pages/employee/Dashboard";
import { TimeTracking } from "@/pages/employee/TimeTracking";
import { Schedule } from "@/pages/employee/Schedule";
import { Tasks } from "@/pages/employee/Tasks";
import { TeamChat } from "@/pages/employee/TeamChat";
import { Performance } from "@/pages/employee/Performance";
import { BreakTimer } from "@/pages/employee/BreakTimer";
import { TimeOff } from "@/pages/employee/TimeOff";
import { Settings } from "@/pages/employee/Settings";
import { Navigate, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

function EmployeeRoute({ children }: { children: React.ReactNode }) {
  const userRole = localStorage.getItem('userRole');
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (userRole !== 'employee') {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

function ErrorBoundary() {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-4">Sorry, we couldn't find the employee page you're looking for.</p>
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

export const employeeRoutes: RouteObject[] = [
  {
    path: "/employee",
    element: <ProtectedRoute><EmployeeRoute><EmployeeLayout /></EmployeeRoute></ProtectedRoute>,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "time",
        element: <TimeTracking />,
      },
      {
        path: "schedule",
        element: <Schedule />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "chat",
        element: <TeamChat />,
      },
      {
        path: "performance",
        element: <Performance />,
      },
      {
        path: "breaks",
        element: <BreakTimer />,
      },
      {
        path: "time-off",
        element: <TimeOff />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]; 