import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  TrendingUp,
  Clock,
  Target,
  Award,
  Star,
  Calendar,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// Mock data
const performanceMetrics = {
  productivity: 85,
  taskCompletion: 92,
  attendance: 98,
  quality: 88,
  targetAchievement: 90
};

const recentAchievements = [
  {
    id: 1,
    title: "Project Milestone",
    description: "Successfully completed the Q1 project ahead of schedule",
    date: "2024-03-15",
    type: "milestone"
  },
  {
    id: 2,
    title: "Performance Recognition",
    description: "Received recognition for outstanding contribution",
    date: "2024-03-10",
    type: "recognition"
  },
  {
    id: 3,
    title: "Skill Development",
    description: "Completed advanced React certification",
    date: "2024-03-05",
    type: "development"
  }
];

const weeklyStats = {
  hoursWorked: 38,
  tasksCompleted: 15,
  meetings: 8,
  projectProgress: 75
};

const monthlyTrends = {
  productivity: [65, 70, 75, 80, 85],
  quality: [80, 82, 85, 88, 88],
  attendance: [95, 96, 97, 98, 98]
};

export function Performance() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Performance</h2>
        <p className="text-muted-foreground">
          Track your performance metrics and achievements
        </p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productivity</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.productivity}%</div>
            <Progress value={performanceMetrics.productivity} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Task Completion</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.taskCompletion}%</div>
            <Progress value={performanceMetrics.taskCompletion} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Above target (85%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.quality}%</div>
            <Progress value={performanceMetrics.quality} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              High quality maintained
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Target Achievement</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.targetAchievement}%</div>
            <Progress value={performanceMetrics.targetAchievement} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              On track for Q1 goals
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Overview</CardTitle>
          <CardDescription>Your performance this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Hours Worked</span>
              </div>
              <p className="text-2xl font-bold">{weeklyStats.hoursWorked}h</p>
              <p className="text-xs text-muted-foreground">Target: 40h</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Tasks Completed</span>
              </div>
              <p className="text-2xl font-bold">{weeklyStats.tasksCompleted}</p>
              <p className="text-xs text-muted-foreground">+3 from last week</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Meetings Attended</span>
              </div>
              <p className="text-2xl font-bold">{weeklyStats.meetings}</p>
              <p className="text-xs text-muted-foreground">100% attendance</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BarChart className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Project Progress</span>
              </div>
              <p className="text-2xl font-bold">{weeklyStats.projectProgress}%</p>
              <p className="text-xs text-muted-foreground">On schedule</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
          <CardDescription>Your latest accomplishments and recognition</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-start space-x-4 p-4 border rounded-lg"
              >
                <div className="bg-primary/10 p-2 rounded-full">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium">{achievement.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {achievement.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Trends</CardTitle>
          <CardDescription>Performance trends over the last 5 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Productivity Trend</span>
                <span className="text-sm font-medium">
                  {monthlyTrends.productivity[monthlyTrends.productivity.length - 1]}%
                </span>
              </div>
              <div className="flex gap-1">
                {monthlyTrends.productivity.map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 space-y-1"
                  >
                    <Progress value={value} />
                    <p className="text-xs text-center text-muted-foreground">
                      M{index + 1}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Quality Trend</span>
                <span className="text-sm font-medium">
                  {monthlyTrends.quality[monthlyTrends.quality.length - 1]}%
                </span>
              </div>
              <div className="flex gap-1">
                {monthlyTrends.quality.map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 space-y-1"
                  >
                    <Progress value={value} />
                    <p className="text-xs text-center text-muted-foreground">
                      M{index + 1}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Attendance Trend</span>
                <span className="text-sm font-medium">
                  {monthlyTrends.attendance[monthlyTrends.attendance.length - 1]}%
                </span>
              </div>
              <div className="flex gap-1">
                {monthlyTrends.attendance.map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 space-y-1"
                  >
                    <Progress value={value} />
                    <p className="text-xs text-center text-muted-foreground">
                      M{index + 1}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 