
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/hooks/useAuth';

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirect based on user role
  useEffect(() => {
    if (currentUser) {
      switch (currentUser.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'management':
          navigate('/management');
          break;
        case 'employee':
          navigate('/employee');
          break;
        default:
          navigate('/employee');
      }
    }
  }, [currentUser, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <h1 className="text-2xl font-semibold">Loading your dashboard...</h1>
        <p className="text-muted-foreground mt-2">Please wait while we prepare your experience</p>
      </div>
    </div>
  );
};

export default Home;
