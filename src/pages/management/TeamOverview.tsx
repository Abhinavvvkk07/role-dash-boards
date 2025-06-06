import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Users, TrendingUp, Clock, Award, UserPlus } from "lucide-react";

// Mock data - In a real app, this would come from an API
const performanceData = [
  { month: "Jan", performance: 85, attendance: 92 },
  { month: "Feb", performance: 88, attendance: 95 },
  { month: "Mar", performance: 92, attendance: 89 },
  { month: "Apr", performance: 90, attendance: 93 },
  { month: "May", performance: 95, attendance: 94 },
  { month: "Jun", performance: 89, attendance: 91 },
];

const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Account Manager",
    performance: 95,
    attendance: 98,
    accountsManaged: 5,
    status: "Active",
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Account Manager",
    performance: 88,
    attendance: 92,
    accountsManaged: 3,
    status: "Active",
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "Senior Account Manager",
    performance: 92,
    attendance: 95,
    accountsManaged: 4,
    status: "Active",
  },
  {
    id: 4,
    name: "Alex Thompson",
    role: "Account Manager",
    performance: 85,
    attendance: 90,
    accountsManaged: 2,
    status: "Training",
  },
];

const recentActivities = [
  {
    id: 1,
    member: "Sarah Johnson",
    action: "Completed monthly review",
    time: "2 hours ago",
  },
  {
    id: 2,
    member: "Mike Chen",
    action: "Updated account metrics",
    time: "4 hours ago",
  },
  {
    id: 3,
    member: "Emma Davis",
    action: "Submitted performance report",
    time: "Yesterday",
  },
];

export function TeamOverview() {
  const averagePerformance = Math.round(
    teamMembers.reduce((acc, member) => acc + member.performance, 0) / teamMembers.length
  );

  const averageAttendance = Math.round(
    teamMembers.reduce((acc, member) => acc + member.attendance, 0) / teamMembers.length
  );

  const totalAccountsManaged = teamMembers.reduce(
    (acc, member) => acc + member.accountsManaged,
    0
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Team Overview</h2>
        <p className="text-muted-foreground">
          Monitor team performance and productivity metrics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">
              {teamMembers.filter(m => m.status === "Active").length} active members
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averagePerformance}%</div>
            <Progress value={averagePerformance} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageAttendance}%</div>
            <Progress value={averageAttendance} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accounts Managed</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAccountsManaged}</div>
            <p className="text-xs text-muted-foreground">
              Across all team members
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>6-month performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={performanceData}>
                    <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                    <Line type="monotone" dataKey="performance" stroke="#2563eb" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Trends</CardTitle>
                <CardDescription>6-month attendance rates</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={performanceData}>
                    <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                    <Bar dataKey="attendance" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="members">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Detailed view of all team members</CardDescription>
                </div>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Accounts</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{member.performance}%</span>
                          <Progress value={member.performance} className="w-[60px]" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{member.attendance}%</span>
                          <Progress value={member.attendance} className="w-[60px]" />
                        </div>
                      </TableCell>
                      <TableCell>{member.accountsManaged}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            member.status === "Active"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-yellow-500/10 text-yellow-500"
                          }
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest team member activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.member}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                    <div className="ml-auto text-sm text-muted-foreground">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 