import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import {
  AlertTriangle,
  Calendar as CalendarIcon,
  FileText,
  Plus,
  Upload,
  Eye,
} from "lucide-react";

// Dummy data for disciplinary actions
const actions = [
  {
    id: "1",
    employee: {
      name: "Michael Brown",
      avatar: "/avatars/michael-brown.jpg",
      role: "Account Manager",
    },
    type: "warning",
    date: "2024-03-15",
    reason: "Repeated tardiness",
    description: "Employee has been late to work more than 3 times this month.",
    attachments: ["warning-letter.pdf"],
    status: "active",
  },
  {
    id: "2",
    employee: {
      name: "Sarah Johnson",
      avatar: "/avatars/sarah-johnson.jpg",
      role: "Account Manager",
    },
    type: "performance",
    date: "2024-03-10",
    reason: "Missed deadlines",
    description: "Failed to meet project deadlines on multiple occasions.",
    attachments: ["performance-review.pdf", "improvement-plan.pdf"],
    status: "resolved",
  },
];

export function DisciplinaryActions() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getTypeBadge = (type: string) => {
    const colors = {
      warning: "bg-yellow-500/10 text-yellow-500",
      performance: "bg-blue-500/10 text-blue-500",
      conduct: "bg-red-500/10 text-red-500",
    };
    return colors[type as keyof typeof colors] || "";
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: "bg-red-500/10 text-red-500",
      resolved: "bg-green-500/10 text-green-500",
      pending: "bg-yellow-500/10 text-yellow-500",
    };
    return colors[status as keyof typeof colors] || "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // In a real app, this would submit the form data to an API
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Disciplinary Actions</h1>
        <p className="text-muted-foreground">Manage employee disciplinary records</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_400px]">
        {/* Actions List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {actions.map((action) => (
                  <TableRow key={action.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={action.employee.avatar} />
                          <AvatarFallback>
                            {action.employee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{action.employee.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {action.employee.role}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeBadge(action.type)}>
                        {action.type.charAt(0).toUpperCase() + action.type.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(new Date(action.date), "MMM d, yyyy")}</TableCell>
                    <TableCell>{action.reason}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(action.status)}>
                        {action.status.charAt(0).toUpperCase() + action.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* New Action Form */}
        <Card>
          <CardHeader>
            <CardTitle>New Disciplinary Action</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Employee</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">John Smith</SelectItem>
                    <SelectItem value="2">Sarah Johnson</SelectItem>
                    <SelectItem value="3">Michael Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="conduct">Conduct</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Reason</label>
                <Input placeholder="Brief reason for the action" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Detailed description of the incident or behavior"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Attachments</label>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-center">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Upload documents
                      </span>
                      <input id="file-upload" type="file" className="hidden" multiple />
                    </label>
                  </div>
                </div>
              </div>

              <Button className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Action"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 