import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

// Dummy data for time-off requests
const requests = {
  pending: [
    {
      id: "1",
      employee: {
        name: "Sarah Johnson",
        avatar: "/avatars/sarah-johnson.jpg",
        role: "Account Manager",
      },
      type: "vacation",
      startDate: "2024-04-01",
      endDate: "2024-04-05",
      status: "pending",
      reason: "Annual family vacation",
      submittedAt: "2024-03-15T10:30:00",
    },
    {
      id: "2",
      employee: {
        name: "Michael Brown",
        avatar: "/avatars/michael-brown.jpg",
        role: "Account Manager",
      },
      type: "sick",
      startDate: "2024-03-20",
      endDate: "2024-03-21",
      status: "pending",
      reason: "Doctor's appointment",
      submittedAt: "2024-03-15T09:15:00",
    },
  ],
  approved: [
    {
      id: "3",
      employee: {
        name: "John Smith",
        avatar: "/avatars/john-smith.jpg",
        role: "Senior Manager",
      },
      type: "vacation",
      startDate: "2024-03-25",
      endDate: "2024-03-29",
      status: "approved",
      reason: "Personal time off",
      submittedAt: "2024-03-10T14:20:00",
      approvedAt: "2024-03-11T09:00:00",
    },
  ],
  rejected: [
    {
      id: "4",
      employee: {
        name: "Michael Brown",
        avatar: "/avatars/michael-brown.jpg",
        role: "Account Manager",
      },
      type: "other",
      startDate: "2024-03-22",
      endDate: "2024-03-22",
      status: "rejected",
      reason: "Personal errands",
      submittedAt: "2024-03-14T11:30:00",
      rejectedAt: "2024-03-15T09:00:00",
      rejectionReason: "High workload period",
    },
  ],
};

export function RequestOffs() {
  const [activeTab, setActiveTab] = useState("pending");

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: "bg-yellow-500/10 text-yellow-500",
      approved: "bg-green-500/10 text-green-500",
      rejected: "bg-red-500/10 text-red-500",
    };
    return colors[status as keyof typeof colors] || "";
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      vacation: "bg-blue-500/10 text-blue-500",
      sick: "bg-purple-500/10 text-purple-500",
      other: "bg-gray-500/10 text-gray-500",
    };
    return colors[type as keyof typeof colors] || "";
  };

  const handleApprove = (id: string) => {
    // In a real app, this would make an API call to approve the request
    console.log(`Approving request ${id}`);
  };

  const handleReject = (id: string, reason: string) => {
    // In a real app, this would make an API call to reject the request
    console.log(`Rejecting request ${id} with reason: ${reason}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Time-Off Requests</h1>
        <p className="text-muted-foreground">Manage employee time-off requests</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.pending.length}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved This Month</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.approved.length}</div>
            <p className="text-xs text-muted-foreground">Time off approved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected This Month</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.rejected.length}</div>
            <p className="text-xs text-muted-foreground">Time off rejected</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pending">
            Pending
            {requests.pending.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {requests.pending.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.pending.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={request.employee.avatar} />
                            <AvatarFallback>
                              {request.employee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{request.employee.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {request.employee.role}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeBadge(request.type)}>
                          {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {format(new Date(request.startDate), "MMM d")} -{" "}
                            {format(new Date(request.endDate), "MMM d")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{request.reason}</TableCell>
                      <TableCell>
                        {format(new Date(request.submittedAt), "MMM d, h:mm a")}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleApprove(request.id)}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleReject(request.id, "Scheduling conflict")}
                          >
                            <XCircle className="h-4 w-4 text-red-500" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Approved Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Approved</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.approved.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={request.employee.avatar} />
                            <AvatarFallback>
                              {request.employee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{request.employee.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {request.employee.role}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeBadge(request.type)}>
                          {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {format(new Date(request.startDate), "MMM d")} -{" "}
                            {format(new Date(request.endDate), "MMM d")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{request.reason}</TableCell>
                      <TableCell>
                        {format(new Date(request.approvedAt), "MMM d, h:mm a")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Rejection Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.rejected.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={request.employee.avatar} />
                            <AvatarFallback>
                              {request.employee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{request.employee.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {request.employee.role}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeBadge(request.type)}>
                          {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {format(new Date(request.startDate), "MMM d")} -{" "}
                            {format(new Date(request.endDate), "MMM d")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{request.reason}</TableCell>
                      <TableCell>{request.rejectionReason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 