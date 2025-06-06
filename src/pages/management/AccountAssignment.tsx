import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Search, UserPlus, Users } from "lucide-react";

// Mock data - In a real app, this would come from an API
const mockTeamMembers = [
  { id: 1, name: "Sarah Johnson", capacity: "3/5", performance: "High" },
  { id: 2, name: "Mike Chen", capacity: "2/5", performance: "Medium" },
  { id: 3, name: "Emma Davis", capacity: "4/5", performance: "High" },
  { id: 4, name: "Alex Thompson", capacity: "1/5", performance: "Medium" },
];

const mockAccounts = [
  { id: 1, name: "Account A", type: "Premium", status: "Unassigned" },
  { id: 2, name: "Account B", type: "Standard", status: "Assigned" },
  { id: 3, name: "Account C", type: "Premium", status: "Unassigned" },
  { id: 4, name: "Account D", type: "Standard", status: "Unassigned" },
  { id: 5, name: "Account E", type: "Premium", status: "Assigned" },
];

export function AccountAssignment() {
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredAccounts = mockAccounts.filter(account => 
    account.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === "Assigned" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500";
  };

  const getPerformanceColor = (performance: string) => {
    return performance === "High" ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500";
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Account Assignment</h2>
        <p className="text-muted-foreground">
          Manage account assignments for your team members
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Accounts</CardTitle>
            <CardDescription>Active accounts in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAccounts.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockAccounts.filter(a => a.status === "Unassigned").length} unassigned
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Available for assignment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTeamMembers.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockTeamMembers.filter(m => m.performance === "High").length} high performers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Assignment Rate</CardTitle>
            <CardDescription>Account distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((mockAccounts.filter(a => a.status === "Assigned").length / mockAccounts.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Of accounts assigned
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Select a team member to assign accounts</CardDescription>
              </div>
              <Button variant="outline" size="icon">
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTeamMembers.map((member) => (
                <div
                  key={member.id}
                  className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors
                    ${selectedMember === member.name ? 'bg-accent' : 'hover:bg-accent/50'}`}
                  onClick={() => setSelectedMember(member.name)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{member.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Capacity: {member.capacity}
                      </p>
                    </div>
                  </div>
                  <Badge className={getPerformanceColor(member.performance)}>
                    {member.performance}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Available Accounts</CardTitle>
            <CardDescription>Accounts ready for assignment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search accounts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Accounts</SelectItem>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAccounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell>{account.name}</TableCell>
                      <TableCell>{account.type}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(account.status)}>
                          {account.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={!selectedMember || account.status === "Assigned"}
                        >
                          Assign
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 