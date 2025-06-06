import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Tag,
  BarChart,
  Filter,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock data
const tasks = {
  todo: [
    {
      id: 1,
      title: "Review Project Proposal",
      dueDate: "2024-03-22",
      priority: "high",
      category: "Documentation",
      status: "todo"
    },
    {
      id: 2,
      title: "Update User Interface",
      dueDate: "2024-03-23",
      priority: "medium",
      category: "Development",
      status: "todo"
    }
  ],
  inProgress: [
    {
      id: 3,
      title: "Implement New Feature",
      dueDate: "2024-03-21",
      priority: "high",
      category: "Development",
      status: "in-progress"
    },
    {
      id: 4,
      title: "Write Test Cases",
      dueDate: "2024-03-22",
      priority: "medium",
      category: "Testing",
      status: "in-progress"
    }
  ],
  completed: [
    {
      id: 5,
      title: "Code Review",
      dueDate: "2024-03-20",
      priority: "high",
      category: "Development",
      status: "completed"
    },
    {
      id: 6,
      title: "Team Meeting Notes",
      dueDate: "2024-03-20",
      priority: "low",
      category: "Documentation",
      status: "completed"
    }
  ]
};

const taskMetrics = {
  completed: 12,
  total: 15,
  onTrack: 8,
  delayed: 2,
  highPriority: 4
};

export function Tasks() {
  const [searchQuery, setSearchQuery] = useState("");

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
            High
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
            Medium
          </Badge>
        );
      case "low":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            Low
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            {priority}
          </Badge>
        );
    }
  };

  const TaskCard = ({ task }: { task: any }) => (
    <div className="p-4 border rounded-lg space-y-3">
      <div className="flex items-start justify-between">
        <h3 className="font-medium">{task.title}</h3>
        {getPriorityBadge(task.priority)}
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          <Calendar className="mr-1 h-4 w-4" />
          {task.dueDate}
        </div>
        <div className="flex items-center">
          <Tag className="mr-1 h-4 w-4" />
          {task.category}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        {task.status !== "completed" && (
          <Button variant="outline" size="sm">
            Start
          </Button>
        )}
        <Button variant="ghost" size="sm">
          View
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
        <p className="text-muted-foreground">
          Manage and track your tasks
        </p>
      </div>

      {/* Task Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Task Progress</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {taskMetrics.completed}/{taskMetrics.total}
            </div>
            <Progress 
              value={(taskMetrics.completed / taskMetrics.total) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {Math.round((taskMetrics.completed / taskMetrics.total) * 100)}% completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Track</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskMetrics.onTrack}</div>
            <p className="text-xs text-muted-foreground">Tasks on schedule</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delayed</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskMetrics.delayed}</div>
            <p className="text-xs text-muted-foreground">Tasks behind schedule</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskMetrics.highPriority}</div>
            <p className="text-xs text-muted-foreground">Tasks need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Task Management */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Task Management</CardTitle>
              <CardDescription>View and manage your tasks</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[200px]"
              />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button>+ Add Task</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="todo" className="space-y-4">
            <TabsList>
              <TabsTrigger value="todo">To Do</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="todo" className="space-y-4">
              {tasks.todo.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </TabsContent>

            <TabsContent value="in-progress" className="space-y-4">
              {tasks.inProgress.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {tasks.completed.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 