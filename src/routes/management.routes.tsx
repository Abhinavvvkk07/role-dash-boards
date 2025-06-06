import { RouteObject } from "react-router-dom";
import { ManagementLayout } from "@/components/layout/ManagementLayout";
import { Dashboard } from "@/pages/management/Dashboard";
import { ContentTracker } from "@/pages/management/ContentTracker";
import { AccountAssignment } from "@/pages/management/AccountAssignment";
import { ChatterTools } from "@/pages/management/ChatterTools";
import { ApprovalPanel } from "@/pages/management/ApprovalPanel";
import { TeamOverview } from "@/pages/management/TeamOverview";
import { ScheduleEditor } from "@/pages/management/ScheduleEditor";
import { RequestOffs } from "@/pages/management/RequestOffs";
import { DisciplinaryActions } from "@/pages/management/DisciplinaryActions";
import { ProjectTracker } from "@/pages/management/ProjectTracker";
import { Settings } from "@/pages/management/Settings";
import { Navigate, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

function ManagementRoute({ children }: { children: React.ReactNode }) {
  const userRole = localStorage.getItem('userRole');
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (userRole !== 'management') {
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
          <p className="text-muted-foreground mb-4">Sorry, we couldn't find the management page you're looking for.</p>
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

export const managementRoutes: RouteObject[] = [
  {
    path: "/management",
    element: <ProtectedRoute><ManagementRoute><ManagementLayout /></ManagementRoute></ProtectedRoute>,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "content",
        element: <ContentTracker />,
      },
      {
        path: "accounts",
        element: <AccountAssignment />,
      },
      {
        path: "chat",
        element: <ChatterTools />,
      },
      {
        path: "approvals",
        element: <ApprovalPanel />,
      },
      {
        path: "team",
        element: <TeamOverview />,
      },
      {
        path: "schedule",
        element: <ScheduleEditor />,
      },
      {
        path: "request-offs",
        element: <RequestOffs />,
      },
      {
        path: "disciplinary",
        element: <DisciplinaryActions />,
      },
      {
        path: "projects",
        element: <ProjectTracker />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]; 