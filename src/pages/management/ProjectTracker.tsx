import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DndContext, 
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  MoreVertical,
  Plus,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// Dummy data for projects
const initialProjects = {
  todo: [
    {
      id: "1",
      title: "Content Calendar Setup",
      description: "Create and implement content calendar for Q2",
      priority: "high",
      assignee: {
        name: "Sarah Johnson",
        avatar: "/avatars/sarah-johnson.jpg",
      },
      dueDate: "2024-04-01",
    },
    {
      id: "2",
      title: "Performance Reviews",
      description: "Conduct quarterly performance reviews",
      priority: "medium",
      assignee: {
        name: "John Smith",
        avatar: "/avatars/john-smith.jpg",
      },
      dueDate: "2024-03-25",
    },
  ],
  inProgress: [
    {
      id: "3",
      title: "Team Training Program",
      description: "Develop new employee training materials",
      priority: "high",
      assignee: {
        name: "Michael Brown",
        avatar: "/avatars/michael-brown.jpg",
      },
      dueDate: "2024-03-20",
    },
  ],
  completed: [
    {
      id: "4",
      title: "Account Audit",
      description: "Review and audit all client accounts",
      priority: "medium",
      assignee: {
        name: "Sarah Johnson",
        avatar: "/avatars/sarah-johnson.jpg",
      },
      dueDate: "2024-03-10",
    },
  ],
};

interface SortableItemProps {
  id: string;
  project: any;
  getPriorityBadge: (priority: string) => string;
  formatDate: (date: string) => string;
}

function SortableItem({ id, project, getPriorityBadge, formatDate }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="cursor-grab active:cursor-grabbing">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <Badge className={getPriorityBadge(project.priority)}>
              {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
            </Badge>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
          <CardTitle className="text-base mt-2">{project.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {project.description}
          </p>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={project.assignee.avatar} />
                <AvatarFallback>
                  {project.assignee.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">{project.assignee.name}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {formatDate(project.dueDate)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ProjectTracker() {
  const [projects, setProjects] = useState(initialProjects);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: "bg-red-500/10 text-red-500",
      medium: "bg-yellow-500/10 text-yellow-500",
      low: "bg-blue-500/10 text-blue-500",
    };
    return colors[priority as keyof typeof colors] || "";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setProjects((prev) => {
      const allProjects = { ...prev };
      let sourceList: string | null = null;
      let destList: string | null = null;

      // Find which list contains the dragged item
      Object.entries(allProjects).forEach(([listName, items]) => {
        if (items.find((item: any) => item.id === activeId)) {
          sourceList = listName;
        }
        if (items.find((item: any) => item.id === overId)) {
          destList = listName;
        }
      });

      if (!sourceList || !destList) return prev;

      const sourceItems = [...allProjects[sourceList as keyof typeof allProjects]];
      const destItems = sourceList === destList ? sourceItems : [...allProjects[destList as keyof typeof allProjects]];

      const sourceIndex = sourceItems.findIndex((item) => item.id === activeId);
      const destIndex = destItems.findIndex((item) => item.id === overId);

      if (sourceList === destList) {
        const newItems = arrayMove(sourceItems, sourceIndex, destIndex);
        return {
          ...prev,
          [sourceList]: newItems,
        };
      } else {
        const [movedItem] = sourceItems.splice(sourceIndex, 1);
        destItems.splice(destIndex, 0, movedItem);
        return {
          ...prev,
          [sourceList]: sourceItems,
          [destList]: destItems,
        };
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Project Tracker</h1>
          <p className="text-muted-foreground">Manage and track project progress</p>
        </div>
        <div className="flex items-center gap-4">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.values(projects).reduce((acc, curr) => acc + curr.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Active projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.inProgress.length}</div>
            <p className="text-xs text-muted-foreground">Projects in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.completed.length}</div>
            <p className="text-xs text-muted-foreground">Completed projects</p>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {/* Todo Column */}
          <div>
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              To Do ({projects.todo.length})
            </h2>
            <SortableContext
              items={projects.todo.map(p => p.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {projects.todo.map((project) => (
                  <SortableItem
                    key={project.id}
                    id={project.id}
                    project={project}
                    getPriorityBadge={getPriorityBadge}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            </SortableContext>
          </div>

          {/* In Progress Column */}
          <div>
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              In Progress ({projects.inProgress.length})
            </h2>
            <SortableContext
              items={projects.inProgress.map(p => p.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {projects.inProgress.map((project) => (
                  <SortableItem
                    key={project.id}
                    id={project.id}
                    project={project}
                    getPriorityBadge={getPriorityBadge}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            </SortableContext>
          </div>

          {/* Completed Column */}
          <div>
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Completed ({projects.completed.length})
            </h2>
            <SortableContext
              items={projects.completed.map(p => p.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {projects.completed.map((project) => (
                  <SortableItem
                    key={project.id}
                    id={project.id}
                    project={project}
                    getPriorityBadge={getPriorityBadge}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            </SortableContext>
          </div>
        </div>
      </DndContext>
    </div>
  );
} 