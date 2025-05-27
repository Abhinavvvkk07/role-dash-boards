import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1c2e] to-[#2a2d4a] font-sans">
      <div className="text-center mb-12">
        <h1 className="text-[2.5rem] font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          CREATOR RM
        </h1>
        <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-3"></div>
        <p className="text-gray-300 text-sm font-light tracking-wide">Enterprise Creator Management Platform</p>
      </div>

      <Card className="w-[380px] bg-[#2a2d4a]/50 backdrop-blur-sm border border-white/10 shadow-2xl">
        <CardContent className="pt-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-200 text-sm font-medium">Username</Label>
              <Input
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-[#1a1c2e]/50 border-white/10 text-white placeholder:text-gray-500 focus:border-white/30 focus:ring-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200 text-sm font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-[#1a1c2e]/50 border-white/10 text-white placeholder:text-gray-500 focus:border-white/30 focus:ring-white/10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
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
              <p className="text-sm text-red-400">{error}</p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-[#1a1c2e]"
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-gray-300"
                >
                  Remember me
                </Label>
              </div>
              <Button
                type="button"
                variant="link"
                className="px-0 text-sm text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsResetModalOpen(true)}
              >
                Forgot password?
              </Button>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-white text-[#1a1c2e] hover:bg-gray-100 mt-6 font-medium transition-colors"
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={isResetModalOpen} onOpenChange={setIsResetModalOpen}>
        <DialogContent className="bg-[#2a2d4a] text-white border-white/10 shadow-2xl">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter your email address to reset your password.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email" className="text-gray-200 text-sm font-medium">Email</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                className="bg-[#1a1c2e]/50 border-white/10 text-white placeholder:text-gray-500 focus:border-white/30 focus:ring-white/10"
              />
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsResetModalOpen(false)}
                className="border-white/10 text-white hover:bg-white/10 transition-colors"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-white text-[#1a1c2e] hover:bg-gray-100 font-medium transition-colors"
              >
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
