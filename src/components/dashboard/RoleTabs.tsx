
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/lib/hooks/useAuth";
import { Check } from "lucide-react";

const RoleTabs = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<string>(currentUser?.role || "employee");

  // Define features for each role
  const features = {
    employee: [
      "View and manage personal tasks",
      "Track time spent on tasks",
      "Submit reports and timesheets",
      "View personal performance metrics",
      "Access project documents and resources"
    ],
    management: [
      "Oversee team tasks and assignments",
      "Review and approve timesheets",
      "Track team performance metrics",
      "Generate team reports",
      "Manage resource allocation",
      "Set team priorities and deadlines"
    ],
    admin: [
      "User account management",
      "Role and permission assignment",
      "System configuration",
      "Global metrics and analytics",
      "Data backup and security settings",
      "Integration with third-party services"
    ]
  };

  // Determine which tabs to show based on user role
  const showTab = (role: string) => {
    if (!currentUser) return false;
    
    switch (currentUser.role) {
      case "admin":
        return true; // Admin can see all tabs
      case "management":
        return role !== "admin"; // Management can see employee and management
      case "employee":
        return role === "employee"; // Employee can only see employee
      default:
        return false;
    }
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3 mb-6">
        {showTab("employee") && (
          <TabsTrigger value="employee">Employee</TabsTrigger>
        )}
        {showTab("management") && (
          <TabsTrigger value="management">Management</TabsTrigger>
        )}
        {showTab("admin") && (
          <TabsTrigger value="admin">Admin</TabsTrigger>
        )}
      </TabsList>
      
      <TabsContent value="employee" className="mt-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Employee Dashboard</CardTitle>
            <CardDescription>Access your tasks and track your performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="font-medium">Features:</h3>
              <ul className="space-y-1 ml-5">
                {features.employee.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="management" className="mt-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Management Dashboard</CardTitle>
            <CardDescription>Team oversight and performance tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="font-medium">Features:</h3>
              <ul className="space-y-1 ml-5">
                {features.management.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="admin" className="mt-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Admin Dashboard</CardTitle>
            <CardDescription>System-wide configuration and management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="font-medium">Features:</h3>
              <ul className="space-y-1 ml-5">
                {features.admin.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default RoleTabs;
