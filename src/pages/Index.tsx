import { Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/hooks/useAuth';

const Index = () => {
  const { currentUser } = useAuth();

  // If the user is logged in, redirect them to the appropriate dashboard
  if (currentUser) {
    switch (currentUser.role) {
      case 'admin':
        return <Navigate to="/dashboard" replace />;
      case 'management':
        return <Navigate to="/management" replace />;
      case 'employee':
        return <Navigate to="/dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  // If not logged in, redirect to login
  return <Navigate to="/login" replace />;
};

export default Index;
