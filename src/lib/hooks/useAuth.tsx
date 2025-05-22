
import { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';

// Sample users for demonstration
const users: User[] = [
  {
    id: '1',
    name: 'John',
    email: 'john@example.com',
    role: 'employee',
    avatar: 'https://ui-avatars.com/api/?name=John&background=3b82f6&color=fff',
  },
  {
    id: '2',
    name: 'Sara',
    email: 'sara@example.com',
    role: 'management',
    avatar: 'https://ui-avatars.com/api/?name=Sara&background=3b82f6&color=fff',
  },
  {
    id: '3',
    name: 'Lisa',
    email: 'lisa@example.com',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Lisa&background=3b82f6&color=fff',
  },
];

interface AuthContextType {
  currentUser: User | null;
  login: (userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Start with Sara (management) as the default user
  const [currentUser, setCurrentUser] = useState<User | null>(users[1]);

  const login = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
