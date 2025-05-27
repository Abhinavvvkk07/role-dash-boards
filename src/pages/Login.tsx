import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { Eye, EyeOff } from 'lucide-react';

// Hardcoded users for demonstration
const DEMO_USERS = {
  'john_emp': { id: '1', role: 'employee', name: 'John', password: 'password123' },
  'sara_mgr': { id: '2', role: 'management', name: 'Sara', password: 'password123' },
  'lisa_admin': { id: '3', role: 'admin', name: 'Lisa', password: 'password123' }
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // Check for remembered credentials on mount
  useState(() => {
    const remembered = localStorage.getItem('rememberedUser');
    if (remembered) {
      const { username: savedUsername } = JSON.parse(remembered);
      setUsername(savedUsername);
      setRememberMe(true);
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = DEMO_USERS[username as keyof typeof DEMO_USERS];

    if (!user || user.password !== password) {
      setError('Invalid username or password. Please try again.');
      return;
    }

    // Handle "Remember me"
    if (rememberMe) {
      localStorage.setItem('rememberedUser', JSON.stringify({ username }));
    } else {
      localStorage.removeItem('rememberedUser');
    }

    // Login successful
    login(user.id);
    toast({
      title: "Login Successful",
      description: `Welcome, ${user.name}!`
    });

    // Redirect based on role
    switch (user.role) {
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

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock password reset functionality
    toast({
      title: "Password Reset Email Sent",
      description: "If an account exists with this email, you will receive reset instructions."
    });
    setIsResetModalOpen(false);
    setResetEmail('');
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
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
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
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </Label>
            </div>

            <Button type="submit" className="w-full">
              Log In
            </Button>

            <div className="text-right">
              <Button
                variant="link"
                className="px-0 text-sm"
                onClick={() => setIsResetModalOpen(true)}
              >
                Forgot your password?
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={isResetModalOpen} onOpenChange={setIsResetModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Enter your email address and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="Enter your email address"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsResetModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Send Reset Link
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login; 