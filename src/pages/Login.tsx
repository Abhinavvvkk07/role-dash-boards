
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
import { Eye, EyeOff, Shield, Users, BarChart3 } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="text-white space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Welcome to
            </h1>
            <h2 className="text-4xl lg:text-5xl font-bold text-purple-300">
              Role Dashboards
            </h2>
            <p className="text-xl text-slate-300 max-w-md mx-auto lg:mx-0">
              Streamline your workflow with powerful, role-based dashboards designed for modern teams.
            </p>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            <div className="flex flex-col items-center lg:items-start space-y-2">
              <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center border border-purple-500/30">
                <Users className="h-6 w-6 text-purple-300" />
              </div>
              <h3 className="font-semibold text-white">Role-Based Access</h3>
              <p className="text-sm text-slate-400 text-center lg:text-left">Customized dashboards for every role</p>
            </div>
            <div className="flex flex-col items-center lg:items-start space-y-2">
              <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                <BarChart3 className="h-6 w-6 text-blue-300" />
              </div>
              <h3 className="font-semibold text-white">Analytics</h3>
              <p className="text-sm text-slate-400 text-center lg:text-left">Real-time insights and metrics</p>
            </div>
            <div className="flex flex-col items-center lg:items-start space-y-2">
              <div className="w-12 h-12 rounded-lg bg-green-600/20 flex items-center justify-center border border-green-500/30">
                <Shield className="h-6 w-6 text-green-300" />
              </div>
              <h3 className="font-semibold text-white">Secure</h3>
              <p className="text-sm text-slate-400 text-center lg:text-left">Enterprise-grade security</p>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md bg-slate-800/50 border-slate-700/50 backdrop-blur-xl shadow-2xl">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-white">Sign In</CardTitle>
              <CardDescription className="text-slate-400">
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-slate-200">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                  />
                  <p className="text-xs text-slate-400">
                    Demo: john_emp, sara_mgr, lisa_admin
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-200">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500/20 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">
                    Use: password123
                  </p>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="border-slate-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-slate-300 cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2.5 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Sign In
                </Button>

                <div className="text-center">
                  <Button
                    variant="link"
                    className="px-0 text-sm text-slate-400 hover:text-purple-400 transition-colors"
                    onClick={() => setIsResetModalOpen(true)}
                  >
                    Forgot your password?
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isResetModalOpen} onOpenChange={setIsResetModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Reset Password</DialogTitle>
            <DialogDescription className="text-slate-400">
              Enter your email address and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email" className="text-slate-200">Email</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="Enter your email address"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsResetModalOpen(false)}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
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
