import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <main className={cn(
        "flex-1 p-6 transition-all duration-200 ease-in-out",
        isSidebarCollapsed ? "ml-[80px]" : "ml-[240px]"
      )}>
        {children}
      </main>
    </div>
  );
} 