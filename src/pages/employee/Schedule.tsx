import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";

// Mock data
const upcomingShifts = [
  {
    id: 1,
    date: "2024-03-21",
    startTime: "09:00",
    endTime: "17:00",
    location: "Main Office",
    team: "Development",
    status: "confirmed"
  },
  {
    id: 2,
    date: "2024-03-22",
    startTime: "10:00",
    endTime: "18:00",
    location: "Remote",
    team: "Design",
    status: "pending"
  },
  {
    id: 3,
    date: "2024-03-23",
    startTime: "08:00",
    endTime: "16:00",
    location: "Main Office",
    team: "Development",
    status: "confirmed"
  }
];

const weeklySchedule = [
  { day: "Monday", shifts: ["9:00 AM - 5:00 PM"] },
  { day: "Tuesday", shifts: ["10:00 AM - 6:00 PM"] },
  { day: "Wednesday", shifts: ["9:00 AM - 5:00 PM"] },
  { day: "Thursday", shifts: ["9:00 AM - 5:00 PM"] },
  { day: "Friday", shifts: ["8:00 AM - 4:00 PM"] },
  { day: "Saturday", shifts: [] },
  { day: "Sunday", shifts: [] },
];

const timeOffRequests = [
  {
    id: 1,
    type: "Vacation",
    startDate: "2024-04-01",
    endDate: "2024-04-05",
    status: "approved"
  },
  {
    id: 2,
    type: "Personal",
    startDate: "2024-03-25",
    endDate: "2024-03-25",
    status: "pending"
  }
];

export function Schedule() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Confirmed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
            <AlertCircle className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Approved
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            <AlertCircle className="mr-1 h-3 w-3" />
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Schedule</h2>
        <p className="text-muted-foreground">
          View and manage your work schedule
        </p>
      </div>

      {/* Upcoming Shifts */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Shifts</CardTitle>
          <CardDescription>Your scheduled shifts for the next few days</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingShifts.map((shift) => (
                <TableRow key={shift.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      {format(new Date(shift.date), "MMM dd, yyyy")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      {shift.startTime} - {shift.endTime}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      {shift.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      {shift.team}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(shift.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Weekly Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
          <CardDescription>Your regular weekly schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {weeklySchedule.map((day) => (
              <div
                key={day.day}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="font-medium">{day.day}</div>
                <div>
                  {day.shifts.length > 0 ? (
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      {day.shifts[0]}
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Off</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Time Off Requests */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Time Off Requests</CardTitle>
              <CardDescription>Your upcoming time off and requests</CardDescription>
            </div>
            <Button>Request Time Off</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeOffRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <p className="font-medium">{request.type}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(new Date(request.startDate), "MMM dd")}
                    {request.endDate !== request.startDate && (
                      <> - {format(new Date(request.endDate), "MMM dd")}</>
                    )}
                  </div>
                </div>
                {getStatusBadge(request.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 