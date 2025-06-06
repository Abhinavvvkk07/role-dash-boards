import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Settings,
  User,
  LogOut,
  Users,
  ScrollText,
  Bell,
  Shield,
  ListTodo,
  UserCircle2,
  FolderKanban,
  FileBarChart,
  MessageSquare,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

// Define navigation items based on user role
const getNavItems = (role: string) => {
  const commonItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: '/dashboard',
    },
  ];

  if (role === 'admin') {
    return [
      ...commonItems,
      {
        icon: Users,
        label: 'User Management',
        href: '/users',
      },
      {
        icon: ListTodo,
        label: 'Tasks',
        href: '/tasks',
      },
      {
        icon: MessageSquare,
        label: 'Team Chat',
        href: '/team-chat',
      },
      {
        icon: ScrollText,
        label: 'System Logs',
        href: '/logs',
      },
      {
        icon: Bell,
        label: 'Notifications',
        href: '/notifications',
      },
      {
        icon: Shield,
        label: 'Security',
        href: '/security',
      },
    ];
  }

  if (role === 'management') {
    return [
      ...commonItems,
      {
        icon: UserCircle2,
        label: 'Team Overview',
        href: '/team',
      },
      {
        icon: FolderKanban,
        label: 'Project Tracker',
        href: '/projects',
      },
      {
        icon: FileBarChart,
        label: 'Reports',
        href: '/reports',
      },
    ];
  }

  return commonItems;
};

export function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'employee';
  const navItems = getNavItems(userRole);

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem('userRole');
    // Redirect to login
    navigate('/login');
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-card border-r transition-all duration-200 ease-in-out z-50",
        isCollapsed ? "w-[80px]" : "w-[240px]"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          {!isCollapsed && (
            <span className="text-lg font-semibold">CREATOR RM</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="ml-auto"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  isCollapsed ? "px-2" : "px-4"
                )}
                onClick={() => navigate(item.href)}
              >
                <item.icon size={20} />
                {!isCollapsed && (
                  <span className="ml-3">{item.label}</span>
                )}
              </Button>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 mt-auto">
          <Separator className="my-4" />
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              isCollapsed ? "px-2" : "px-4"
            )}
            onClick={() => navigate('/settings')}
          >
            <Settings size={20} />
            {!isCollapsed && <span className="ml-3">Settings</span>}
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-destructive mt-2",
              isCollapsed ? "px-2" : "px-4"
            )}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
} 