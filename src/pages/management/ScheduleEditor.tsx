import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { CalendarDays, Clock, Users, Plus } from "lucide-react";

// Mock data - In a real app, this would come from an API
const teamMembers = [
  { id: 1, name: "Sarah Johnson", role: "Senior Account Manager" },
  { id: 2, name: "Mike Chen", role: "Account Manager" },
  { id: 3, name: "Emma Davis", role: "Senior Account Manager" },
  { id: 4, name: "Alex Thompson", role: "Account Manager" },
];

const schedules = [
  {
    id: 1,
    member: "Sarah Johnson",
    date: "2024-05-15",
    shift: "Morning (9AM-5PM)",
    status: "Confirmed",
  },
  {
    id: 2,
    member: "Mike Chen",
    date: "2024-05-15",
    shift: "Evening (2PM-10PM)",
    status: "Pending",
  },
  {
    id: 3,
    member: "Emma Davis",
    date: "2024-05-16",
    shift: "Morning (9AM-5PM)",
    status: "Confirmed",
  },
  {
    id: 4,
    member: "Alex Thompson",
    date: "2024-05-16",
    shift: "Evening (2PM-10PM)",
    status: "Confirmed",
  },
];

const shifts = [
  { id: 1, name: "Morning", time: "9AM-5PM", capacity: 2 },
  { id: 2, name: "Evening", time: "2PM-10PM", capacity: 2 },
  { id: 3, name: "Night", time: "10PM-6AM", capacity: 1 },
];

export function ScheduleEditor() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedShift, setSelectedShift] = useState<string>("");

  const getStatusColor = (status: string) => {
    return status === "Confirmed" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500";
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Schedule Editor</h2>
        <p className="text-muted-foreground">
          Manage team schedules and shift assignments
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">
              Available for scheduling
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Shifts</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shifts.length}</div>
            <p className="text-xs text-muted-foreground">
              Shift patterns available
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Schedule</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {schedules.filter(s => new Date(s.date).toDateString() === new Date().toDateString()).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Shifts scheduled today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {schedules.filter(s => s.status === "Pending").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting confirmation
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Select date to view or edit schedule</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Available Shifts</h4>
                {shifts.map((shift) => (
                  <div
                    key={shift.id}
                    className="flex items-center justify-between p-2 border rounded-lg mb-2 cursor-pointer hover:bg-accent"
                    onClick={() => setSelectedShift(shift.name)}
                  >
                    <div>
                      <p className="font-medium">{shift.name}</p>
                      <p className="text-sm text-muted-foreground">{shift.time}</p>
                    </div>
                    <Badge variant="outline">
                      {shift.capacity} slots
                    </Badge>
                  </div>
                ))}
              </div>
              <Button className="w-full" disabled={!date || !selectedShift}>
                <Plus className="mr-2 h-4 w-4" />
                Add Schedule
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Schedule Overview</CardTitle>
                <CardDescription>Current schedule assignments</CardDescription>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Schedules</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team Member</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Shift</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell className="font-medium">{schedule.member}</TableCell>
                    <TableCell>{new Date(schedule.date).toLocaleDateString()}</TableCell>
                    <TableCell>{schedule.shift}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(schedule.status)}>
                        {schedule.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={schedule.status === "Confirmed"}
                      >
                        {schedule.status === "Confirmed" ? "Confirmed" : "Confirm"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 