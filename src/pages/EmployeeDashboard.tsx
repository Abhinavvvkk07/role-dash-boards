
import StatCard from "@/components/dashboard/StatCard";
import { useAuth } from "@/lib/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const EmployeeDashboard = () => {
  const { currentUser } = useAuth();

  // Define features for employee role
  const features = [
    "View and manage personal tasks",
    "Track time spent on tasks",
    "Submit reports and timesheets",
    "View personal performance metrics",
    "Access project documents and resources"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Welcome, {currentUser?.name}! You are logged in as an employee.
        </h2>
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

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Employee Dashboard</CardTitle>
          <CardDescription>Access your tasks and track your performance</CardDescription>
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
    </div>
  );
};

export default EmployeeDashboard;
