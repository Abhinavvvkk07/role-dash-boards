import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const performanceData = [
  { name: "Mon", value: 85 },
  { name: "Tue", value: 92 },
  { name: "Wed", value: 88 },
  { name: "Thu", value: 90 },
  { name: "Fri", value: 95 },
  { name: "Sat", value: 82 },
  { name: "Sun", value: 87 },
];

const teamMetrics = [
  { name: "Week 1", posts: 45, messages: 32, ppv: 28 },
  { name: "Week 2", posts: 52, messages: 38, ppv: 34 },
  { name: "Week 3", posts: 48, messages: 42, ppv: 36 },
  { name: "Week 4", posts: 58, messages: 45, ppv: 42 },
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Management Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to your management dashboard overview.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              3 due this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Content awaiting review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              +6% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Team Performance Overview</CardTitle>
            <CardDescription>
              Weekly performance metrics across all activities
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={teamMetrics}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Bar dataKey="posts" fill="#adfa1d" radius={[4, 4, 0, 0]} />
                <Bar dataKey="messages" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ppv" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Daily Activity</CardTitle>
            <CardDescription>
              7-day performance trend
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={performanceData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest team updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">New project assigned</p>
                  <p className="text-sm text-muted-foreground">
                    Summer Campaign 2024
                  </p>
                </div>
                <div className="ml-auto font-medium">Just now</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Content approved</p>
                  <p className="text-sm text-muted-foreground">
                    Mass message campaign
                  </p>
                </div>
                <div className="ml-auto font-medium">2h ago</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Schedule updated</p>
                  <p className="text-sm text-muted-foreground">
                    Week of May 15
                  </p>
                </div>
                <div className="ml-auto font-medium">5h ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>This week's standout employees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">
                    15 approved posts
                  </p>
                </div>
                <div className="ml-auto font-medium">98%</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Mike Chen</p>
                  <p className="text-sm text-muted-foreground">
                    12 approved posts
                  </p>
                </div>
                <div className="ml-auto font-medium">95%</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Emma Davis</p>
                  <p className="text-sm text-muted-foreground">
                    10 approved posts
                  </p>
                </div>
                <div className="ml-auto font-medium">92%</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Projects due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Summer Campaign</p>
                  <p className="text-sm text-muted-foreground">
                    Due in 3 days
                  </p>
                </div>
                <div className="ml-auto font-medium text-orange-500">High</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Content Calendar</p>
                  <p className="text-sm text-muted-foreground">
                    Due in 5 days
                  </p>
                </div>
                <div className="ml-auto font-medium text-yellow-500">Medium</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Monthly Report</p>
                  <p className="text-sm text-muted-foreground">
                    Due in 1 week
                  </p>
                </div>
                <div className="ml-auto font-medium text-green-500">Low</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 