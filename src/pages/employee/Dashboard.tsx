import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  Calendar,
  CheckSquare,
  Coffee,
  Timer,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

// Mock data
const todaysTasks = [
  { id: 1, title: "Complete Project Documentation", status: "In Progress", priority: "High" },
  { id: 2, title: "Team Standup Meeting", status: "Completed", priority: "Medium" },
  { id: 3, title: "Code Review", status: "Pending", priority: "High" },
];

const performanceMetrics = {
  taskCompletion: 92,
  attendance: 98,
  productivity: 87,
  collaboration: 94
};

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Employee Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's your overview for today
        </p>
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
                  <Progress value={value} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <Timer className="h-6 w-6 mb-2" />
              <span>Start Timer</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <Calendar className="h-6 w-6 mb-2" />
              <span>View Schedule</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <TrendingUp className="h-6 w-6 mb-2" />
              <span>View Reports</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <CheckSquare className="h-6 w-6 mb-2" />
              <span>Add Task</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 