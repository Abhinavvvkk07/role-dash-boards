
import StatCard from "@/components/dashboard/StatCard";
import TablePlaceholder from "@/components/dashboard/TablePlaceholder";
import ChartPlaceholder from "@/components/dashboard/ChartPlaceholder";
import { useAuth } from "@/lib/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const ManagementDashboard = () => {
  const { currentUser } = useAuth();

  // Define features for management role
  const features = [
    "Oversee team tasks and assignments",
    "Review and approve timesheets",
    "Track team performance metrics",
    "Generate team reports",
    "Manage resource allocation",
    "Set team priorities and deadlines"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Welcome, {currentUser?.name}! You are logged in as management.
        </h2>
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

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Management Dashboard</CardTitle>
          <CardDescription>Team oversight and performance tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h3 className="font-medium">Features:</h3>
            <ul className="space-y-1 ml-5">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

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
    </div>
  );
};

export default ManagementDashboard;
