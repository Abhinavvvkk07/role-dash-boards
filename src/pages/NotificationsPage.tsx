import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, CheckCircle2, XCircle, AlertTriangle, Settings, Trash2 } from 'lucide-react';
import { cn } from "@/lib/utils";

// Mock data
const notifications = [
  {
    id: 1,
    type: "success",
    title: "System Update Completed",
    message: "The system has been successfully updated to version 2.1.0",
    time: "2 mins ago",
    icon: CheckCircle2
  },
  {
    id: 2,
    type: "warning",
    title: "Storage Space Low",
    message: "Server storage capacity is at 85%. Consider cleanup.",
    time: "10 mins ago",
    icon: AlertTriangle
  },
  {
    id: 3,
    type: "error",
    title: "Failed Backup Attempt",
    message: "Automated backup failed. Check backup configuration.",
    time: "15 mins ago",
    icon: XCircle
  },
  {
    id: 4,
    type: "success",
    title: "New User Registration",
    message: "3 new users have registered and await approval",
    time: "1 hour ago",
    icon: CheckCircle2
  },
  {
    id: 5,
    type: "warning",
    title: "Security Alert",
    message: "Multiple failed login attempts detected",
    time: "2 hours ago",
    icon: AlertTriangle
  }
];

export function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Manage your notifications and alerts</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Notification Summary</CardTitle>
            <CardDescription>Overview of your notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <Bell className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Success</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-sm text-muted-foreground">Warnings</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <XCircle className="h-8 w-8 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Errors</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-7">
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Your latest notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <notification.icon 
                      className={cn("h-5 w-5", {
                        "text-green-500": notification.type === "success",
                        "text-yellow-500": notification.type === "warning",
                        "text-red-500": notification.type === "error"
                      })} 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{notification.title}</p>
                        <span className="text-sm text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure your notification preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>System Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about system updates
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about security-related events
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>User Activities</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications about user actions
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Desktop Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Show desktop push notifications
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 