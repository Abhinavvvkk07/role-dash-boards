
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserRole } from '@/types';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabItem {
  id: string;
  label: string;
  path: string;
  roles: UserRole[];
}

const tabs: TabItem[] = [
  { 
    id: 'my-tasks', 
    label: 'My Tasks', 
    path: '/employee', 
    roles: ['employee', 'management', 'admin'] 
  },
  { 
    id: 'team-performance', 
    label: 'Team Performance', 
    path: '/management', 
    roles: ['management', 'admin'] 
  },
  { 
    id: 'system-overview', 
    label: 'System Overview', 
    path: '/admin', 
    roles: ['admin'] 
  },
];

const TabNavigation = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string | undefined>(undefined);

  // Filter tabs based on user role
  const visibleTabs = currentUser 
    ? tabs.filter(tab => tab.roles.includes(currentUser.role)) 
    : [];

  // Handle tab change
  const handleTabChange = (value: string) => {
    const selectedTab = tabs.find(tab => tab.id === value);
    if (selectedTab) {
      navigate(selectedTab.path);
    }
  };

  // Set the active tab based on current path
  useEffect(() => {
    const currentTab = tabs.find(tab => tab.path === location.pathname);
    if (currentTab) {
      setActiveTab(currentTab.id);
    } else if (location.pathname === '/' && visibleTabs.length > 0) {
      // Redirect to first accessible tab if on home page
      navigate(visibleTabs[0].path);
    }
  }, [location.pathname, visibleTabs, navigate]);

  if (!currentUser || visibleTabs.length === 0) {
    return null;
  }

  return (
    <div className="border-b bg-white px-4 md:px-6">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          {visibleTabs.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TabNavigation;
