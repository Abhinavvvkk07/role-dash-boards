
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/hooks/useAuth';

const Index = () => {
  const { currentUser } = useAuth();

  // If the user is logged in, redirect them to the appropriate dashboard
  if (currentUser) {
    switch (currentUser.role) {
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'management':
        return <Navigate to="/management" replace />;
      case 'employee':
        return <Navigate to="/employee" replace />;
      default:
        return <Navigate to="/employee" replace />;
    }
  }

  // If we somehow get here, redirect to home
  return <Navigate to="/" replace />;
};

export default Index;
