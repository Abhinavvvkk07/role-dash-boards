import StatCard from "@/components/dashboard/StatCard";
import TablePlaceholder from "@/components/dashboard/TablePlaceholder";
import ChartPlaceholder from "@/components/dashboard/ChartPlaceholder";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/hooks/useAuth";
import { Users, Lock, Settings, BarChart2, HardDrive, Link2, MessageSquare } from "lucide-react";
import { TeamChat } from "@/components/chat/TeamChat";

const AdminDashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Welcome, {currentUser?.name}! You are logged in as an admin.
        </h2>
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

      {/* 👥 User Account Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle>User Account Management</CardTitle>
          </div>
          <CardDescription>Manage user accounts and their statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <TablePlaceholder
            title="User Accounts"
            description="All registered users in the system"
            columns={[
              { header: "Name", width: "25%" },
              { header: "Email", width: "30%" },
              { header: "Role", width: "20%" },
              { header: "Status", width: "15%" },
              { header: "Actions", width: "10%" }
            ]}
            rowCount={5}
          />
        </CardContent>
      </Card>

      {/* 🔐 Role & Permission Assignment */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <CardTitle>Role & Permission Assignment</CardTitle>
          </div>
          <CardDescription>Assign roles and permissions to users</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select User" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user1">John Doe</SelectItem>
                <SelectItem value="user2">Jane Smith</SelectItem>
                <SelectItem value="user3">Bob Johnson</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Set Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employee">Employee</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Button>Apply Changes</Button>
          </div>
        </CardContent>
      </Card>

      {/* 💬 Team Chat */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <CardTitle>Team Communication</CardTitle>
          </div>
          <CardDescription>Chat with team members and manage communications</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <TeamChat variant="compact" height="600px" />
        </CardContent>
      </Card>

      {/* ⚙️ System Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            <CardTitle>System Configuration</CardTitle>
          </div>
          <CardDescription>Configure system-wide settings and defaults</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Enable Notifications</Label>
                <Switch id="notifications" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="analytics">Enable Analytics</Label>
                <Switch id="analytics" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="maintenance">Maintenance Mode</Label>
                <Switch id="maintenance" />
              </div>
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="est">EST</SelectItem>
                <SelectItem value="pst">PST</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 📊 Global Metrics & Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-primary" />
              <CardTitle>System Usage</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ChartPlaceholder 
              title="System Usage Overview" 
              description="Active users over time"
              height={200}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-primary" />
              <CardTitle>Error Rate</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ChartPlaceholder 
              title="System Error Rate" 
              description="Errors over time"
              height={200}
            />
          </CardContent>
        </Card>
      </div>

      {/* 💾 Data Backup & Security Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <HardDrive className="h-5 w-5 text-primary" />
            <CardTitle>Data Backup & Security Settings</CardTitle>
          </div>
          <CardDescription>Manage system backups and security</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button className="flex-1">Run Backup Now</Button>
              <Button className="flex-1" variant="outline">Schedule Backup</Button>
              <Button className="flex-1" variant="outline">View Audit Logs</Button>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-medium mb-2">Last Backup Status</h4>
              <div className="flex justify-between items-center">
                <Badge variant="outline">Success</Badge>
                <span className="text-sm text-muted-foreground">Today at 03:00 AM</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 🔗 Third-Party Integrations */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-primary" />
            <CardTitle>Third-Party Integrations</CardTitle>
          </div>
          <CardDescription>Manage external service connections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">NexusPay</h4>
                <p className="text-sm text-muted-foreground">Payment processing service</p>
              </div>
              <Button variant="outline">Setup Integration</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Slack</h4>
                <p className="text-sm text-muted-foreground">Team communication</p>
              </div>
              <Badge>Connected</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Google Workspace</h4>
                <p className="text-sm text-muted-foreground">Productivity suite</p>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
