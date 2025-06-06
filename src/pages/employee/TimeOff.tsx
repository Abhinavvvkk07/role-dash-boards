import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Calendar,
  Timer,
  BarChart,
} from "lucide-react";
import { format } from "date-fns";

// Mock data
const timeOffBalance = {
  vacation: {
    used: 10,
    total: 25,
    pending: 3
  },
  sick: {
    used: 2,
    total: 10,
    pending: 0
  },
  personal: {
    used: 3,
    total: 5,
    pending: 1
  }
};

const upcomingTimeOff = [
  {
    id: 1,
    type: "Vacation",
    startDate: "2024-04-01",
    endDate: "2024-04-05",
    status: "approved",
    duration: "5 days"
  },
  {
    id: 2,
    type: "Personal",
    startDate: "2024-03-25",
    endDate: "2024-03-25",
    status: "pending",
    duration: "1 day"
  }
];

const timeOffHistory = [
  {
    id: 1,
    type: "Sick Leave",
    date: "2024-02-15",
    duration: "1 day",
    status: "approved"
  },
  {
    id: 2,
    type: "Vacation",
    date: "2024-01-10",
    duration: "3 days",
    status: "approved"
  },
  {
    id: 3,
    type: "Personal",
    date: "2024-01-05",
    duration: "1 day",
    status: "denied"
  }
];

export function TimeOff() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
            <AlertCircle className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      case "denied":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
            <XCircle className="mr-1 h-3 w-3" />
            Denied
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
        <h2 className="text-3xl font-bold tracking-tight">Time Off</h2>
        <p className="text-muted-foreground">
          Manage your time off requests and balances
        </p>
      </div>

      {/* Time Off Balance */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vacation Balance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {timeOffBalance.vacation.used}/{timeOffBalance.vacation.total} days
            </div>
            <Progress 
              value={(timeOffBalance.vacation.used / timeOffBalance.vacation.total) * 100} 
              className="mt-2"
            />
            {timeOffBalance.vacation.pending > 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                {timeOffBalance.vacation.pending} days pending approval
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sick Leave Balance</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {timeOffBalance.sick.used}/{timeOffBalance.sick.total} days
            </div>
            <Progress 
              value={(timeOffBalance.sick.used / timeOffBalance.sick.total) * 100} 
              className="mt-2"
            />
            {timeOffBalance.sick.pending > 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                {timeOffBalance.sick.pending} days pending approval
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Personal Leave Balance</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {timeOffBalance.personal.used}/{timeOffBalance.personal.total} days
            </div>
            <Progress 
              value={(timeOffBalance.personal.used / timeOffBalance.personal.total) * 100} 
              className="mt-2"
            />
            {timeOffBalance.personal.pending > 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                {timeOffBalance.personal.pending} days pending approval
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Time Off */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Upcoming Time Off</CardTitle>
              <CardDescription>Your scheduled time off</CardDescription>
            </div>
            <Button>Request Time Off</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingTimeOff.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{request.type}</span>
                    {getStatusBadge(request.status)}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(new Date(request.startDate), "MMM dd")}
                    {request.endDate !== request.startDate && (
                      <> - {format(new Date(request.endDate), "MMM dd")}</>
                    )}
                    <Clock className="ml-4 mr-2 h-4 w-4" />
                    {request.duration}
                  </div>
                </div>
                {request.status === "pending" && (
                  <Button variant="outline" size="sm">Cancel Request</Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Time Off History */}
      <Card>
        <CardHeader>
          <CardTitle>Time Off History</CardTitle>
          <CardDescription>Your past time off requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeOffHistory.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{record.type}</span>
                    {getStatusBadge(record.status)}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(new Date(record.date), "MMM dd, yyyy")}
                    <Clock className="ml-4 mr-2 h-4 w-4" />
                    {record.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 