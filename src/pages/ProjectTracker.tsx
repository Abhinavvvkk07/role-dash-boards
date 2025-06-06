import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, AlertCircle, Plus, Filter } from "lucide-react";
import { AddProjectModal } from "@/components/modals/AddProjectModal";

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  assignees: TeamMember[];
  tags: string[];
}

interface ProjectColumns {
  backlog: Project[];
  inProgress: Project[];
  review: Project[];
  completed: Project[];
}

// Team members data
const teamMembers: TeamMember[] = [
  { id: "1", name: "John Smith", avatar: "/avatars/john-smith.jpg" },
  { id: "2", name: "Sarah Johnson", avatar: "/avatars/sarah-johnson.jpg" },
  { id: "3", name: "Michael Brown", avatar: "/avatars/michael-brown.jpg" },
];

// Update initialProjects with proper typing
const initialProjects: ProjectColumns = {
  backlog: [
    {
      id: "1",
      title: "Website Redesign",
      description: "Implement new design system across the platform",
      priority: "high",
      dueDate: "2024-04-15",
      assignees: [
        { id: "1", name: "John Smith", avatar: "/avatars/john-smith.jpg" },
        { id: "2", name: "Sarah Johnson", avatar: "/avatars/sarah-johnson.jpg" },
      ],
      tags: ["design", "frontend"],
    },
    {
      id: "2",
      title: "API Documentation",
      description: "Update API documentation with new endpoints",
      priority: "medium",
      dueDate: "2024-04-20",
      assignees: [
        { id: "3", name: "Michael Brown", avatar: "/avatars/michael-brown.jpg" },
      ],
      tags: ["documentation", "api"],
    },
  ],
  inProgress: [
    {
      id: "3",
      title: "User Authentication",
      description: "Implement OAuth2 and role-based access control",
      priority: "high",
      dueDate: "2024-04-10",
      assignees: [
        { id: "1", name: "John Smith", avatar: "/avatars/john-smith.jpg" },
      ],
      tags: ["security", "backend"],
    },
  ],
  review: [
    {
      id: "4",
      title: "Performance Optimization",
      description: "Optimize database queries and frontend rendering",
      priority: "medium",
      dueDate: "2024-04-12",
      assignees: [
        { id: "2", name: "Sarah Johnson", avatar: "/avatars/sarah-johnson.jpg" },
        { id: "3", name: "Michael Brown", avatar: "/avatars/michael-brown.jpg" },
      ],
      tags: ["optimization", "performance"],
    },
  ],
  completed: [
    {
      id: "5",
      title: "Email Templates",
      description: "Design and implement new email templates",
      priority: "low",
      dueDate: "2024-04-05",
      assignees: [
        { id: "2", name: "Sarah Johnson", avatar: "/avatars/sarah-johnson.jpg" },
      ],
      tags: ["design", "email"],
    },
  ],
};

export function ProjectTracker() {
  const [projects, setProjects] = useState<ProjectColumns>(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  const filterProjects = (projects: ProjectColumns): ProjectColumns => {
    return Object.entries(projects).reduce((acc, [status, items]) => {
      const filteredItems = items.filter((project) => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPriority = selectedPriority === "all" || project.priority === selectedPriority;
        return matchesSearch && matchesPriority;
      });
      return { ...acc, [status]: filteredItems };
    }, {} as ProjectColumns);
  };

  const filteredProjects = filterProjects(projects);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-500/10";
      case "medium":
        return "text-yellow-500 bg-yellow-500/10";
      case "low":
        return "text-blue-500 bg-blue-500/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const handleDragStart = (e: React.DragEvent, projectId: string, fromStatus: string) => {
    e.dataTransfer.setData("projectId", projectId);
    e.dataTransfer.setData("fromStatus", fromStatus);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, toStatus: string) => {
    e.preventDefault();
    const projectId = e.dataTransfer.getData("projectId");
    const fromStatus = e.dataTransfer.getData("fromStatus");

    if (fromStatus === toStatus) return;

    const projectToMove = (projects[fromStatus as keyof typeof projects] as any[])
      .find(p => p.id === projectId);

    if (!projectToMove) return;

    setProjects(prev => ({
      ...prev,
      [fromStatus]: (prev[fromStatus as keyof typeof prev] as any[]).filter(p => p.id !== projectId),
      [toStatus]: [...(prev[toStatus as keyof typeof prev] as any[]), projectToMove],
    }));
  };

  const handleAddProject = (newProject: Omit<Project, 'assignees'> & { assignees: string[] }) => {
    setProjects(prev => ({
      ...prev,
      backlog: [...prev.backlog, {
        ...newProject,
        assignees: newProject.assignees
          .map(id => teamMembers.find(member => member.id === id))
          .filter((member): member is TeamMember => member !== undefined),
      }],
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Project Tracker</h1>
        <p className="text-muted-foreground">Track and manage project progress</p>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
        <Select value={selectedPriority} onValueChange={setSelectedPriority}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
        <Button onClick={() => setIsAddProjectModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.entries(filteredProjects).map(([status, items]) => (
          <div
            key={status}
            className="space-y-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold capitalize">{status.replace(/([A-Z])/g, ' $1').trim()}</h2>
              <Badge variant="outline">{items.length}</Badge>
            </div>
            <div className="space-y-4">
              {(items as any[]).map((project) => (
                <Card
                  key={project.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, project.id, status)}
                  className="cursor-move"
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className={getPriorityColor(project.priority)}>
                          {project.priority}
                        </Badge>
                        <div className="flex -space-x-2">
                          {project.assignees.map((assignee: any) => (
                            <Avatar key={assignee.id} className="h-6 w-6 border-2 border-background">
                              <AvatarImage src={assignee.avatar} alt={assignee.name} />
                              <AvatarFallback>{assignee.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      </div>
                      <h3 className="font-medium">{project.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Due {new Date(project.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag: string) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <AddProjectModal
        isOpen={isAddProjectModalOpen}
        onClose={() => setIsAddProjectModalOpen(false)}
        onSubmit={handleAddProject}
        teamMembers={teamMembers}
      />
    </div>
  );
} 