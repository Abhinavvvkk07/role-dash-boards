
import { useAuth } from "@/lib/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import TablePlaceholder from "@/components/dashboard/TablePlaceholder";
import StatCard from "@/components/dashboard/StatCard";
import { Bell, Clock, Calendar, BarChart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const EmployeeDashboard = () => {
  const { currentUser } = useAuth();

  // Placeholder data
  const assignedAccounts = 5;
  const shiftsAccepted = 12;
  const daysActive = 45;
  const creatorAccounts = 3;
  
  // Placeholder notifications
  const notifications = [
    { id: 1, message: "New shift posted", time: "2 hours ago" },
    { id: 2, message: "Manager approved your time-off request", time: "1 day ago" },
    { id: 3, message: "Reminder: Performance metrics update today", time: "Just now" }
  ];
  
  // Placeholder shifts
  const availableShifts = [
    { id: 1, date: "May 25, 2025", time: "9:00 AM - 5:00 PM", account: "Acme Corp" },
    { id: 2, date: "May 26, 2025", time: "10:00 AM - 6:00 PM", account: "Globex Inc" },
    { id: 3, date: "May 27, 2025", time: "8:00 AM - 4:00 PM", account: "Stark Industries" }
  ];

  return (
    <div className="space-y-8">
      {/* Greeting Section */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Welcome back, {currentUser?.name}!
        </h2>
        <p className="text-muted-foreground">
          Here's your dashboard overview as an Employee.
        </p>
      </div>
      
      {/* 1. Personal Dashboard Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard 
          title="Assigned Accounts" 
          value={assignedAccounts} 
          description="Active accounts"
          icon={<BarChart className="h-4 w-4" />}
        />
        <StatCard 
          title="Shifts Accepted" 
          value={shiftsAccepted} 
          description="This month"
          icon={<Clock className="h-4 w-4" />}
        />
        <StatCard 
          title="Days Active" 
          value={daysActive} 
          description="Total active days"
          icon={<Calendar className="h-4 w-4" />}
        />
      </div>
      
      {/* 2. Notification Dash */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Alerts and Messages
          </CardTitle>
          <CardDescription>Stay updated with your latest notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li key={notification.id} className="flex justify-between border-b pb-2">
                <span>{notification.message}</span>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      {/* 3. Creator Account Access */}
      <Card>
        <CardHeader>
          <CardTitle>Creator Account Access</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <p>You have access to {creatorAccounts} creator accounts</p>
          <Button>Access Creator Portal</Button>
        </CardContent>
      </Card>
      
      {/* 4. See Accounts Assigned */}
      <TablePlaceholder 
        title="Assigned Accounts" 
        description="Accounts you are currently managing"
        columns={[
          { header: "Account Name", width: "40%" },
          { header: "Type", width: "30%" },
          { header: "Status", width: "30%" }
        ]}
        rowCount={4}
      />
      
      {/* 5. Personal Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Performance Metrics</CardTitle>
          <CardDescription>Your current performance statistics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Response Time</span>
              <span>85%</span>
            </div>
            <Progress value={85} />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Message Count</span>
              <span>65%</span>
            </div>
            <Progress value={65} />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Feedback Score</span>
              <span>92%</span>
            </div>
            <Progress value={92} />
          </div>
        </CardContent>
      </Card>
      
      {/* 6. Request Off Submission */}
      <Card>
        <CardHeader>
          <CardTitle>Submit Time-Off Request</CardTitle>
          <CardDescription>Request time off from your schedule</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Date</label>
            <Input type="date" className="w-full" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Reason</label>
            <Textarea placeholder="Enter reason for time-off request..." />
          </div>
          
          <Button>Submit Request</Button>
        </CardContent>
      </Card>
      
      {/* 7. Accept Available Shifts */}
      <Card>
        <CardHeader>
          <CardTitle>Available Shifts</CardTitle>
          <CardDescription>Shifts you can accept</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-2 text-left font-medium">Date</th>
                  <th className="p-2 text-left font-medium">Time</th>
                  <th className="p-2 text-left font-medium">Account</th>
                  <th className="p-2 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {availableShifts.map((shift) => (
                  <tr key={shift.id} className="border-b">
                    <td className="p-2">{shift.date}</td>
                    <td className="p-2">{shift.time}</td>
                    <td className="p-2">{shift.account}</td>
                    <td className="p-2 text-right">
                      <Button size="sm">Accept</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDashboard;
