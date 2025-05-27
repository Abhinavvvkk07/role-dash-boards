import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

// Hardcoded users for demonstration
const DEMO_USERS = {
  'john_emp': { id: '1', role: 'employee', name: 'John' },
  'sara_mgr': { id: '2', role: 'management', name: 'Sara' },
  'lisa_admin': { id: '3', role: 'admin', name: 'Lisa' }
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user = DEMO_USERS[username as keyof typeof DEMO_USERS];

    if (!user) {
      toast({
        title: "Login Failed",
        description: "Invalid username. Please try one of the demo accounts.",
        variant: "destructive"
      });
      return;
    }

    if (user.role !== selectedRole) {
      toast({
        title: "Role Mismatch",
        description: "Selected role doesn't match the user's assigned role.",
        variant: "destructive"
      });
      return;
    }

    // Login successful
    login(user.id);
    toast({
      title: "Login Successful",
      description: `Welcome, ${user.name}! You are logged in as ${selectedRole}.`
    });

    // Redirect based on role
    switch (selectedRole) {
      case 'admin':
        navigate('/admin');
        break;
      case 'management':
        navigate('/management');
        break;
      case 'employee':
        navigate('/employee');
        break;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Welcome to Role Dashboards</CardTitle>
          <CardDescription>
            Please log in with your credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Username
              </label>
              <Input
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Demo accounts: john_emp, sara_mgr, lisa_admin
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Role
              </label>
              <Select
                value={selectedRole}
                onValueChange={setSelectedRole}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login; 