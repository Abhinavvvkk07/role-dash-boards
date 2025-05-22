
import StatCard from "@/components/dashboard/StatCard";
import TablePlaceholder from "@/components/dashboard/TablePlaceholder";
import ChartPlaceholder from "@/components/dashboard/ChartPlaceholder";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">System Overview</h2>
        <p className="text-muted-foreground">Complete administrative dashboard with system-wide metrics</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Users" 
          value="247" 
          description="+12 this month"
        />
        <StatCard 
          title="Active Projects" 
          value="18" 
          description="Across 4 departments"
        />
        <StatCard 
          title="System Usage" 
          value="94.2%" 
          description="Last 30 days"
        />
        <StatCard 
          title="Error Rate" 
          value="0.08%" 
          description="Down from 0.12%"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartPlaceholder 
          title="User Activity" 
          description="Active users over the last 30 days"
        />
        
        <ChartPlaceholder 
          title="Resource Utilization" 
          description="CPU, Memory, and Storage usage"
        />
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Current status of all services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "API Gateway", status: "operational" },
                { name: "Authentication", status: "operational" },
                { name: "Database", status: "operational" },
                { name: "Storage", status: "degraded" },
                { name: "Analytics", status: "operational" },
                { name: "Email Service", status: "operational" },
                { name: "Task Queue", status: "operational" },
              ].map((service, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm">{service.name}</span>
                  <Badge variant={service.status === "operational" ? "outline" : "destructive"} className="capitalize">
                    {service.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <TablePlaceholder 
          title="Recent System Events" 
          description="Latest system logs and notifications"
          columns={[
            { header: "Event", width: "40%" },
            { header: "Source" },
            { header: "Type" },
            { header: "Time" },
          ]}
          className="lg:col-span-2"
        />
      </div>
      
      <TablePlaceholder 
        title="User Management" 
        description="All system users and roles"
        columns={[
          { header: "Name", width: "25%" },
          { header: "Email", width: "25%" },
          { header: "Role" },
          { header: "Status" },
          { header: "Last Active" },
          { header: "Actions", width: "100px" },
        ]}
      />
    </div>
  );
};

export default AdminDashboard;
