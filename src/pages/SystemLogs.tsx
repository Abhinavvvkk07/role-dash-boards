import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollText, AlertTriangle, CheckCircle, Info, Download, Filter } from 'lucide-react';
import { cn } from "@/lib/utils";

// Mock data
const systemLogs = [
  {
    id: 1,
    type: "INFO",
    message: "System backup completed successfully",
    timestamp: "2024-03-20 01:00:00",
    component: "Backup Service",
    icon: Info
  },
  {
    id: 2,
    type: "WARNING",
    message: "High CPU usage detected (85%)",
    timestamp: "2024-03-20 01:30:00",
    component: "System Monitor",
    icon: AlertTriangle
  },
  {
    id: 3,
    type: "SUCCESS",
    message: "User authentication system updated",
    timestamp: "2024-03-20 02:00:00",
    component: "Auth Service",
    icon: CheckCircle
  },
  {
    id: 4,
    type: "INFO",
    message: "Scheduled maintenance completed",
    timestamp: "2024-03-20 02:30:00",
    component: "Maintenance",
    icon: Info
  },
  {
    id: 5,
    type: "WARNING",
    message: "Database connection pool near capacity",
    timestamp: "2024-03-20 03:00:00",
    component: "Database",
    icon: AlertTriangle
  }
];

export function SystemLogs() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">System Logs</h1>
          <p className="text-muted-foreground">Monitor system activities and events</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Log Summary</CardTitle>
            <CardDescription>Overview of system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <Info className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-muted-foreground">Information</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-muted-foreground">Warnings</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Success</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Logs</CardTitle>
            <CardDescription>Latest system events and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemLogs.map(log => (
                <div 
                  key={log.id}
                  className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <log.icon 
                    className={cn("h-5 w-5", {
                      "text-blue-500": log.type === "INFO",
                      "text-yellow-500": log.type === "WARNING",
                      "text-green-500": log.type === "SUCCESS"
                    })} 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{log.message}</p>
                      <span className="text-sm text-muted-foreground">{log.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{log.component}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Component Activity</CardTitle>
              <CardDescription>Log distribution by system component</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auth Service</p>
                    <p className="text-sm text-muted-foreground">Authentication and authorization</p>
                  </div>
                  <p className="font-medium">35%</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Database</p>
                    <p className="text-sm text-muted-foreground">Data operations</p>
                  </div>
                  <p className="font-medium">28%</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">System Monitor</p>
                    <p className="text-sm text-muted-foreground">Performance tracking</p>
                  </div>
                  <p className="font-medium">22%</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Backup Service</p>
                    <p className="text-sm text-muted-foreground">Data backup</p>
                  </div>
                  <p className="font-medium">15%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Log Settings</CardTitle>
              <CardDescription>Configure logging preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Log Retention</p>
                    <p className="text-sm text-muted-foreground">30 days</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Log Level</p>
                    <p className="text-sm text-muted-foreground">Info and above</p>
                  </div>
                  <Button variant="outline" size="sm">Adjust</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Auto Export</p>
                    <p className="text-sm text-muted-foreground">Weekly backup</p>
                  </div>
                  <Button variant="outline" size="sm">Schedule</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 