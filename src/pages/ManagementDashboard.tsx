import StatCard from "@/components/dashboard/StatCard";
import TablePlaceholder from "@/components/dashboard/TablePlaceholder";
import ChartPlaceholder from "@/components/dashboard/ChartPlaceholder";
import { useAuth } from "@/lib/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Calendar as CalendarIcon, CheckSquare, Users, CalendarDays, Clock, BarChart, PieChart, LineChart } from "lucide-react";

const ManagementDashboard = () => {
  const { currentUser } = useAuth();

  // Dummy data for demonstration
  const pendingRequests = [
    { name: "Alice Smith", date: "2024-04-15", reason: "Family event" },
    { name: "Bob Johnson", date: "2024-04-20", reason: "Medical appointment" }
  ];

  const accounts = [
    "Account 1", "Account 2", "Account 3", "Account 4", "Account 5"
  ];

  const chatters = [
    "Chatter 1", "Chatter 2", "Chatter 3", "Chatter 4"
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Chatter Tools */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <CardTitle>Chatter Tools</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center justify-center border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">Internal messaging system placeholder</p>
            </div>
          </CardContent>
        </Card>

        {/* Feed/Mass Message/PPV Tracker */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              <CardTitle>Content Tracker</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Days since last Feed Post:</span>
              <Badge>4</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Days since last Mass Msg:</span>
              <Badge>2</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Days since last Mass PPV:</span>
              <Badge>7</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Approval Panel */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-primary" />
              <CardTitle>Approval Panel</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Feed Posts Pending:</span>
                <Badge variant="secondary">1</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Mass Messages to Review:</span>
                <Badge variant="secondary">2</Badge>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="w-full">Reject</Button>
                <Button className="w-full">Approve</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assign Accounts */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>Assign Accounts</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Chatter" />
              </SelectTrigger>
              <SelectContent>
                {chatters.map((chatter) => (
                  <SelectItem key={chatter} value={chatter}>{chatter}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="space-y-2">
              {accounts.map((account) => (
                <div key={account} className="flex items-center space-x-2">
                  <Checkbox id={account} />
                  <label htmlFor={account}>{account}</label>
                </div>
              ))}
            </div>
            <Button className="w-full">Assign Selected</Button>
          </CardContent>
        </Card>

        {/* Schedule Editor */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              <CardTitle>Schedule Editor</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" className="rounded-md border" />
          </CardContent>
        </Card>

        {/* Request Off Approval */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <CardTitle>Time-Off Requests</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingRequests.map((request, index) => (
                <div key={index} className="space-y-2 pb-4 border-b last:border-0">
                  <div className="flex justify-between">
                    <span className="font-medium">{request.name}</span>
                    <span className="text-sm text-muted-foreground">{request.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{request.reason}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="w-full">Reject</Button>
                    <Button size="sm" className="w-full">Approve</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              <CardTitle>Team Performance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ChartPlaceholder 
              title="Team Performance Overview"
              height={200} 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              <CardTitle>Project Status</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ChartPlaceholder 
              title="Project Completion Status"
              height={200} 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-primary" />
              <CardTitle>Resource Allocation</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ChartPlaceholder 
              title="Resource Distribution"
              height={200} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagementDashboard;
