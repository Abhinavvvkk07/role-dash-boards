
import StatCard from "@/components/dashboard/StatCard";
import TablePlaceholder from "@/components/dashboard/TablePlaceholder";
import ChartPlaceholder from "@/components/dashboard/ChartPlaceholder";
import { useAuth } from "@/lib/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ManagementDashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Team Dashboard</h2>
        <p className="text-muted-foreground">Management view of team performance and metrics</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Team Members" 
          value="8" 
          description="2 new this month"
        />
        <StatCard 
          title="Active Projects" 
          value="6" 
          description="2 approaching deadline"
        />
        <StatCard 
          title="Avg. Completion Rate" 
          value="87%" 
          description="+5% from last month"
        />
        <StatCard 
          title="Budget Utilized" 
          value="68%" 
          description="$24,500/$36,000"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Resource Allocation</CardTitle>
            <CardDescription>Current team workload distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-2">
              {["Development", "Design", "Marketing", "Research"].map((dept) => (
                <div key={dept} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{dept}</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.floor(Math.random() * 30 + 70)}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div 
                      className="h-2 rounded-full bg-primary" 
                      style={{ width: `${Math.floor(Math.random() * 30 + 70)}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <ChartPlaceholder 
          title="Project Status" 
          description="Completion percentage by project"
          height={240}
          className="lg:col-span-3"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TablePlaceholder 
          title="Team Performance" 
          description="Individual team member metrics"
          columns={[
            { header: "Team Member", width: "30%" },
            { header: "Tasks" },
            { header: "Completion Rate" },
            { header: "Hours" },
            { header: "Status" },
          ]}
        />
        
        <ChartPlaceholder 
          title="Monthly Productivity Trend" 
          description="Team performance over the last 6 months"
        />
      </div>
    </div>
  );
};

export default ManagementDashboard;
