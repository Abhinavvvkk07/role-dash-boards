import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Pause,
  Clock,
  Calendar,
  BarChart,
  Coffee,
  Timer,
  RefreshCw,
} from "lucide-react";
import { format } from "date-fns";

// Mock data
const weeklyStats = {
  totalHours: 38.5,
  targetHours: 40,
  breakTime: 5.5,
  meetings: 6.5,
  tasks: 26.5
};

const recentActivities = [
  { id: 1, task: "Project Documentation", duration: "2h 15m", timestamp: "2024-03-20T09:30:00" },
  { id: 2, task: "Team Meeting", duration: "45m", timestamp: "2024-03-20T13:00:00" },
  { id: 3, task: "Code Review", duration: "1h 30m", timestamp: "2024-03-20T15:00:00" },
];

export function TimeTracking() {
  const [isTracking, setIsTracking] = useState(false);
  const [currentTimer, setCurrentTimer] = useState("0:00:00");
  const [currentTask, setCurrentTask] = useState("Working on Project Tasks");

  const toggleTimer = () => {
    setIsTracking(!isTracking);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Time Tracking</h2>
        <p className="text-muted-foreground">
          Track your work hours and monitor your productivity
        </p>
      </div>

      {/* Current Timer */}
      <Card>
        <CardHeader>
          <CardTitle>Current Session</CardTitle>
          <CardDescription>Track your current work session</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <div className="text-6xl font-bold tracking-tighter">
              {currentTimer}
            </div>
            <p className="text-lg text-muted-foreground">{currentTask}</p>
            <div className="flex gap-4">
              <Button
                size="lg"
                onClick={toggleTimer}
                className={isTracking ? "bg-red-500 hover:bg-red-600" : ""}
              >
                {isTracking ? (
                  <><Pause className="mr-2 h-5 w-5" /> Pause</>
                ) : (
                  <><Play className="mr-2 h-5 w-5" /> Start</>
                )}
              </Button>
              <Button variant="outline" size="lg">
                <RefreshCw className="mr-2 h-5 w-5" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.totalHours}h</div>
            <p className="text-xs text-muted-foreground">
              Target: {weeklyStats.targetHours}h
            </p>
            <Progress 
              value={(weeklyStats.totalHours / weeklyStats.targetHours) * 100} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Break Time</CardTitle>
            <Coffee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.breakTime}h</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meetings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.meetings}h</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Task Time</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.tasks}h</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Your tracked activities for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{activity.task}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(activity.timestamp), "h:mm a")}
                    </p>
                  </div>
                </div>
                <div className="text-sm font-medium">{activity.duration}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Time Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Time Distribution</CardTitle>
          <CardDescription>How your time was spent this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Tasks</span>
                <span className="text-sm font-medium">
                  {((weeklyStats.tasks / weeklyStats.totalHours) * 100).toFixed(1)}%
                </span>
              </div>
              <Progress value={(weeklyStats.tasks / weeklyStats.totalHours) * 100} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Meetings</span>
                <span className="text-sm font-medium">
                  {((weeklyStats.meetings / weeklyStats.totalHours) * 100).toFixed(1)}%
                </span>
              </div>
              <Progress value={(weeklyStats.meetings / weeklyStats.totalHours) * 100} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Breaks</span>
                <span className="text-sm font-medium">
                  {((weeklyStats.breakTime / weeklyStats.totalHours) * 100).toFixed(1)}%
                </span>
              </div>
              <Progress value={(weeklyStats.breakTime / weeklyStats.totalHours) * 100} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 