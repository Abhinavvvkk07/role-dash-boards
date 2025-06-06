import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Mail, Phone, MapPin, Building2 } from 'lucide-react';

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: {
    id: string;
    name: string;
    role: string;
    department: string;
    email: string;
    phone: string;
    location: string;
    avatar: string;
    status: string;
    projects: string[];
    performance?: {
      overall: number;
      taskCompletion: number;
      projectContribution: number;
    };
  };
}

export function TeamMemberModal({ isOpen, onClose, member }: TeamMemberModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500";
      case "vacation":
        return "bg-yellow-500/10 text-yellow-500";
      case "offline":
        return "bg-gray-500/10 text-gray-500";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Team Member Profile</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6">
          {/* Basic Info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{member.name}</h2>
              <p className="text-muted-foreground">{member.role}</p>
              <Badge className={getStatusColor(member.status)}>
                {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
              </Badge>
            </div>
          </div>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>{member.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{member.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{member.location}</span>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          {member.performance && (
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Overall Performance</span>
                    <span className="text-sm font-medium">{member.performance.overall}%</span>
                  </div>
                  <Progress value={member.performance.overall} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Task Completion Rate</span>
                    <span className="text-sm font-medium">{member.performance.taskCompletion}%</span>
                  </div>
                  <Progress value={member.performance.taskCompletion} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Project Contribution</span>
                    <span className="text-sm font-medium">{member.performance.projectContribution}%</span>
                  </div>
                  <Progress value={member.performance.projectContribution} />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Active Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {member.projects.map((project) => (
                  <Badge key={project} variant="outline">
                    {project}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
} 