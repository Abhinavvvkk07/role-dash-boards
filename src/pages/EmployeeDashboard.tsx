
import StatCard from "@/components/dashboard/StatCard";
import RoleTabs from "@/components/dashboard/RoleTabs";
import { useAuth } from "@/lib/hooks/useAuth";

const EmployeeDashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back, {currentUser?.name.split(' ')[0]}</h2>
        <p className="text-muted-foreground">Here's an overview of your tasks and performance.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Tasks Completed" 
          value="12/15" 
          description="80% completion rate"
        />
        <StatCard 
          title="Time Tracked" 
          value="32.5h" 
          description="This week"
        />
        <StatCard 
          title="Projects" 
          value="4" 
          description="2 high priority"
        />
        <StatCard 
          title="Upcoming Deadlines" 
          value="3" 
          description="Next 7 days"
        />
      </div>

      <div className="mt-8">
        <RoleTabs />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
