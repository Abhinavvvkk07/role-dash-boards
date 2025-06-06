import { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Clock,
  Calendar,
  MessageSquare,
  CheckSquare,
  Users,
  FileText,
  Coffee,
  Timer,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/employee",
    description: "Overview & Quick Actions"
  },
  {
    title: "Time Tracking",
    icon: Clock,
    href: "/employee/time",
    description: "Track Work Hours & Breaks"
  },
  {
    title: "Schedule",
    icon: Calendar,
    href: "/employee/schedule",
    description: "View & Manage Your Schedule"
  },
  {
    title: "Tasks",
    icon: CheckSquare,
    href: "/employee/tasks",
    description: "Your Tasks & To-Dos"
  },
  {
    title: "Team Chat",
    icon: MessageSquare,
    href: "/employee/chat",
    description: "Communicate with Team"
  },
  {
    title: "Performance",
    icon: FileText,
    href: "/employee/performance",
    description: "View Your Performance Metrics"
  },
  {
    title: "Break Timer",
    icon: Coffee,
    href: "/employee/breaks",
    description: "Manage Break Time"
  },
  {
    title: "Time Off",
    icon: Timer,
    href: "/employee/time-off",
    description: "Request & View Time Off"
  },
];

export function EmployeeLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={cn(
          "bg-card border-r transition-all duration-300 ease-in-out relative",
          isCollapsed ? "w-[60px]" : "w-[280px]"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-semibold">Employee Portal</span>
                <span className="text-xs text-muted-foreground">Work Space</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                "h-8 w-8",
                isCollapsed && "rotate-180"
              )}
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-2">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    "group relative",
                    location.pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed && (
                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-none">{item.title}</span>
                      <span className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {item.description}
                      </span>
                    </div>
                  )}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground rounded-md opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible z-50 whitespace-nowrap">
                      <div className="text-sm font-medium">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </nav>

          {/* Footer with Settings and Logout */}
          <div className="p-4 border-t">
            <div className="space-y-2">
              <Link
                to="/employee/settings"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full",
                  "hover:bg-accent hover:text-accent-foreground",
                  location.pathname === "/employee/settings"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                <Settings className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span>Settings</span>}
              </Link>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 px-3",
                  "hover:bg-destructive/10 hover:text-destructive"
                )}
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span>Logout</span>}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
} 