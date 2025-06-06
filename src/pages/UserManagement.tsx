import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserFormDialog } from "@/components/users/user-form-dialog";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { MoreHorizontal, UserPlus, Search, Users, Shield, Clock } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  lastActive: string;
}

interface Activity {
  id: string;
  userId: string;
  userName: string;
  type: "login" | "profile_update" | "password_reset" | "role_change";
  timestamp: string;
}

// Dummy data
const initialUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    lastActive: "2024-03-20T10:30:00",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Management",
    status: "Active",
    lastActive: "2024-03-20T09:15:00",
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "bob@example.com",
    role: "Employee",
    status: "Inactive",
    lastActive: "2024-03-19T16:45:00",
  },
  {
    id: "4",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Management",
    status: "Active",
    lastActive: "2024-03-20T11:00:00",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Employee",
    status: "Active",
    lastActive: "2024-03-20T08:30:00",
  },
];

const initialActivities: Activity[] = [
  {
    id: "1",
    userId: "1",
    userName: "John Doe",
    type: "login",
    timestamp: "2024-03-20T10:30:00",
  },
  {
    id: "2",
    userId: "2",
    userName: "Jane Smith",
    type: "profile_update",
    timestamp: "2024-03-20T09:15:00",
  },
  {
    id: "3",
    userId: "4",
    userName: "Alice Johnson",
    type: "password_reset",
    timestamp: "2024-03-20T11:00:00",
  },
  {
    id: "4",
    userId: "3",
    userName: "Bob Wilson",
    type: "role_change",
    timestamp: "2024-03-19T16:45:00",
  },
];

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [activities] = useState<Activity[]>(initialActivities);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const roleDistribution = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleAddUser = (userData: any) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: "Active",
      lastActive: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
  };

  const handleEditUser = (userData: any) => {
    if (!selectedUser) return;
    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id
        ? { ...user, name: userData.name, email: userData.email, role: userData.role }
        : user
    );
    setUsers(updatedUsers);
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    setIsDeleteUserOpen(false);
  };

  const handleChangeRole = (userId: string, newRole: string) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
  };

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "login":
        return <Users className="h-4 w-4 text-green-500" />;
      case "profile_update":
        return <Shield className="h-4 w-4 text-blue-500" />;
      case "password_reset":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "role_change":
        return <Shield className="h-4 w-4 text-purple-500" />;
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage system users and their roles</p>
        </div>
        <Button onClick={() => setIsAddUserOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Active and inactive users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              {users.filter(u => u.status === "Active").length} active users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role Distribution</CardTitle>
            <CardDescription>Users by role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(roleDistribution).map(([role, count]) => (
                <div key={role} className="flex justify-between items-center">
                  <span className="text-sm">{role}</span>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.slice(0, 3).map((activity) => (
                <div key={activity.id} className="flex items-center gap-2">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.type.replace("_", " ")} • {formatDateTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <div className="flex gap-4 mt-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm pl-8"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Management">Management</SelectItem>
                <SelectItem value="Employee">Employee</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                      {user.role}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      user.status === "Active" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                    }`}>
                      {user.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Last active: {formatDateTime(user.lastActive)}
                    </span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedUser(user);
                        setIsEditUserOpen(true);
                      }}
                    >
                      Edit User
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedUser(user);
                        setIsDeleteUserOpen(true);
                      }}
                    >
                      Remove User
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        const newRole = user.role === "Admin" ? "Employee" : "Admin";
                        handleChangeRole(user.id, newRole);
                      }}
                    >
                      Change Role
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <UserFormDialog
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onSubmit={handleAddUser}
        mode="add"
      />

      {selectedUser && (
        <>
          <UserFormDialog
            isOpen={isEditUserOpen}
            onClose={() => {
              setIsEditUserOpen(false);
              setSelectedUser(null);
            }}
            onSubmit={handleEditUser}
            initialData={selectedUser}
            mode="edit"
          />

          <ConfirmationDialog
            isOpen={isDeleteUserOpen}
            onClose={() => {
              setIsDeleteUserOpen(false);
              setSelectedUser(null);
            }}
            onConfirm={handleDeleteUser}
            title="Remove User"
            description={`Are you sure you want to remove ${selectedUser.name}? This action cannot be undone.`}
            confirmText="Remove"
          />
        </>
      )}
    </div>
  );
} 