
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
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-white mb-2 tracking-wide">
            letsgo
          </h1>
          <p className="text-gray-400 text-sm">
            Secure access to internal tools
          </p>
        </div>

        {/* Login Card */}
        <Card className="bg-gray-800 border-gray-700 shadow-2xl">
          <CardHeader className="space-y-1 text-center pb-6">
            <CardTitle className="text-xl font-medium text-white">Sign In</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300 text-sm">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-black border-gray-600 text-white placeholder:text-gray-500 focus:border-gray-400 focus:ring-0 h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300 text-sm">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-black border-gray-600 text-white placeholder:text-gray-500 focus:border-gray-400 focus:ring-0 h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
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
                <div className="p-3 rounded-md bg-red-900/20 border border-red-800/30">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-gray-600 data-[state=checked]:bg-white data-[state=checked]:border-white data-[state=checked]:text-black"
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-gray-300 cursor-pointer"
                >
                  Remember me
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-white text-black hover:bg-gray-100 font-medium h-11 transition-colors"
              >
                Sign In
              </Button>

              <div className="text-center">
                <Button
                  variant="link"
                  className="px-0 text-sm text-gray-400 hover:text-white transition-colors"
                  onClick={() => setIsResetModalOpen(true)}
                >
                  Forgot password?
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isResetModalOpen} onOpenChange={setIsResetModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Reset Password</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter your email address and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email" className="text-gray-300">Email</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="Enter your email address"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                className="bg-black border-gray-600 text-white placeholder:text-gray-500 focus:border-gray-400 focus:ring-0"
              />
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsResetModalOpen(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-white text-black hover:bg-gray-100"
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
