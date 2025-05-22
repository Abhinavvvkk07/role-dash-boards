
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/hooks/useAuth';
import Navbar from './Navbar';

const AppLayout = () => {
  const { currentUser } = useAuth();

  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 p-4 md:p-6">
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
