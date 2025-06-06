import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Calendar, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  Timer,
  Coffee,
  CheckSquare
} from 'lucide-react';

// Mock data
const todaysTasks = [
  { id: 1, title: "Complete Project Documentation", status: "In Progress", priority: "High" },
  { id: 2, title: "Team Standup Meeting", status: "Completed", priority: "Medium" },
  { id: 3, title: "Code Review", status: "Pending", priority: "High" },
];

const upcomingLeave = [
  { id: 1, type: "Vacation", date: "Dec 24-31", status: "Approved" },
  { id: 2, type: "Personal", date: "Nov 15", status: "Pending" },
];

const performanceMetrics = {
  taskCompletion: 92,
  attendance: 98,
  productivity: 87,
  collaboration: 94
};

export function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Employee Dashboard</h1>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Request Leave
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Tracked</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6h 30m</div>
            <p className="text-xs text-muted-foreground">Today's tracked time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12/15</div>
            <p className="text-xs text-muted-foreground">This week's tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Break Time</CardTitle>
            <Coffee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45m</div>
            <p className="text-xs text-muted-foreground">Remaining today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Meeting</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2:30 PM</div>
            <p className="text-xs text-muted-foreground">Team Standup</p>
          </CardContent>
        </Card>
      </div>

      {/* Tasks and Performance */}
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Today's Tasks</CardTitle>
              <Button variant="outline" size="sm">+ Add Task</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaysTasks.map(task => (
                <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      {task.status === 'Completed' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : task.priority === 'High' ? (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground">Status: {task.status}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    {task.status === 'Completed' ? 'View' : 'Start'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Your current performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(performanceMetrics).map(([metric, value]) => (
                <div key={metric} className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium capitalize">
                      {metric.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-sm font-medium">{value}%</p>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave Management and Schedule */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Leave Status</CardTitle>
            <CardDescription>Your upcoming and pending leave requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingLeave.map(leave => (
                <div key={leave.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{leave.type}</p>
                    <p className="text-sm text-muted-foreground">{leave.date}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-sm ${
                    leave.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                  }`}>
                    {leave.status}
                  </div>
                </div>
              ))}
              <Button className="w-full" variant="outline">View Leave History</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Timer size={20} />
                <span className="mt-2">Time Log</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Calendar size={20} />
                <span className="mt-2">Schedule</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <TrendingUp size={20} />
                <span className="mt-2">Reports</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <CheckSquare size={20} />
                <span className="mt-2">Tasks</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 