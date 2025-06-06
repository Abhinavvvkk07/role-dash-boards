import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useTheme } from "@/components/ui/theme-provider";
import { Moon, Sun } from "lucide-react";

interface LoginCredentials {
  username: string;
  password: string;
  role: string;
}

const TEST_USERS: LoginCredentials[] = [
  { username: 'john_emp', password: 'password123', role: 'employee' },
  { username: 'sara_mgr', password: 'password123', role: 'management' },
  { username: 'lisa_admin', password: 'password123', role: 'admin' },
];

export function Login() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Clear any existing auth state on mount
  useEffect(() => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAuthenticated');
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = TEST_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // In a real app, you would:
      // 1. Call an API to authenticate
      // 2. Get a token
      // 3. Store the token securely
      // 4. Set up user context
      
      // For now, we'll store auth info in localStorage
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl">CREATOR RM</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>
          <CardDescription>
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Username
              </label>
              <input
                type="text"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-10 w-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-destructive text-center">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full">
              Sign In
            </Button>

            <div className="mt-4 text-sm text-muted-foreground">
              <p className="text-center font-semibold">Test Accounts:</p>
              <ul className="mt-2 space-y-1">
                <li>Employee: john_emp / password123</li>
                <li>Manager: sara_mgr / password123</li>
                <li>Admin: lisa_admin / password123</li>
              </ul>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 