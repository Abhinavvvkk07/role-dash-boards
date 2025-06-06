import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, MapPin, Building2, UserCircle2 } from 'lucide-react';
import { TeamMemberModal } from "@/components/modals/TeamMemberModal";

// Dummy data for team members
const teamMembers = [
  {
    id: "1",
    name: "John Smith",
    role: "Senior Developer",
    department: "Engineering",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    location: "New York",
    avatar: "/avatars/john-smith.jpg",
    status: "active",
    projects: ["Project A", "Project B"],
    performance: {
      overall: 92,
      taskCompletion: 88,
      projectContribution: 95,
    },
  },
  {
    id: "2",
    name: "Sarah Johnson",
    role: "UI Designer",
    department: "Design",
    email: "sarah.j@company.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco",
    avatar: "/avatars/sarah-johnson.jpg",
    status: "active",
    projects: ["Project C"],
    performance: {
      overall: 88,
      taskCompletion: 85,
      projectContribution: 90,
    },
  },
  {
    id: "3",
    name: "Michael Brown",
    role: "Product Manager",
    department: "Product",
    email: "michael.b@company.com",
    phone: "+1 (555) 345-6789",
    location: "Chicago",
    avatar: "/avatars/michael-brown.jpg",
    status: "vacation",
    projects: ["Project A", "Project D"],
    performance: {
      overall: 90,
      taskCompletion: 92,
      projectContribution: 87,
    },
  },
  // Add more team members as needed
];

const departments = ["All", "Engineering", "Design", "Product", "Marketing", "Sales"];
const roles = ["All", "Senior Developer", "UI Designer", "Product Manager", "Marketing Specialist"];

export function TeamOverview() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || member.department === selectedDepartment;
    const matchesRole = selectedRole === "All" || member.role === selectedRole;
    return matchesSearch && matchesDepartment && matchesRole;
  });

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Team Overview</h1>
        <p className="text-muted-foreground">Manage and monitor your team members</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 gap-4 max-w-xl">
          <Input
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <Card key={member.id}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center mb-4">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <Badge className={`mt-2 ${getStatusColor(member.status)}`}>
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>{member.department}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{member.location}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-medium mb-2">Active Projects</p>
                <div className="flex flex-wrap gap-2">
                  {member.projects.map((project) => (
                    <Badge key={project} variant="outline">
                      {project}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => setSelectedMember(member)}
              >
                <UserCircle2 className="h-4 w-4 mr-2" />
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedMember && (
        <TeamMemberModal
          isOpen={!!selectedMember}
          onClose={() => setSelectedMember(null)}
          member={selectedMember}
        />
      )}
    </div>
  );
} 