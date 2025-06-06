import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  Activity,
  CheckCircle2,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

// Dummy data for the user growth chart
const userGrowthData = [
  { month: 'Jan', users: 120 },
  { month: 'Feb', users: 148 },
  { month: 'Mar', users: 175 },
  { month: 'Apr', users: 210 },
  { month: 'May', users: 242 },
  { month: 'Jun', users: 265 },
];

// Dummy data for system health
const systemHealth = {
  uptime: "99.9%",
  responseTime: "245ms",
  errorRate: "0.02%",
  lastIncident: "15 days ago",
  services: [
    { name: "API Server", status: "operational", uptime: "99.99%" },
    { name: "Database", status: "operational", uptime: "99.95%" },
    { name: "Authentication", status: "operational", uptime: "100%" },
    { name: "Storage", status: "degraded", uptime: "98.5%" },
  ],
};

export function AdminDashboard() {
  // Calculate user growth percentage
  const currentUsers = userGrowthData[userGrowthData.length - 1].users;
  const previousUsers = userGrowthData[userGrowthData.length - 2].users;
  const growthPercentage = ((currentUsers - previousUsers) / previousUsers) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of system performance and user statistics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUsers}</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              {growthPercentage > 0 ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span className={growthPercentage > 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(growthPercentage).toFixed(1)}%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.uptime}</div>
            <p className="text-xs text-muted-foreground">
              Last incident: {systemHealth.lastIncident}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.responseTime}</div>
            <p className="text-xs text-muted-foreground">
              Error rate: {systemHealth.errorRate}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Services</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {systemHealth.services.filter(s => s.status === "operational").length}/
              {systemHealth.services.length}
            </div>
            <p className="text-xs text-muted-foreground">Services operational</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Monthly active users over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <div className="flex h-full items-end justify-between gap-2">
                {userGrowthData.map((data) => (
                  <div key={data.month} className="relative flex flex-col items-center">
                    <div 
                      className="bg-primary/90 w-12 rounded-t"
                      style={{ 
                        height: `${(data.users / Math.max(...userGrowthData.map(d => d.users))) * 150}px`
                      }}
                    />
                    <span className="text-xs mt-2">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Service status and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.services.map((service) => (
                <div key={service.name} className="flex items-center">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {service.name}
                      <Badge 
                        variant={service.status === "operational" ? "default" : "destructive"}
                        className="ml-2"
                      >
                        {service.status}
                      </Badge>
                    </p>
                    <Progress value={parseFloat(service.uptime)} className="h-2" />
                    <p className="text-xs text-muted-foreground">{service.uptime} uptime</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 