import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <main className={`flex-1 transition-all duration-200 ease-in-out ${
        isSidebarCollapsed ? 'ml-[80px]' : 'ml-[240px]'
      }`}>
        <div className="container mx-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
} 