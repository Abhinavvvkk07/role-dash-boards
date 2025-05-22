
import { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';

// Sample users for demonstration
const users: User[] = [
  {
    id: '1',
    name: 'John Employee',
    email: 'john@example.com',
    role: 'employee',
    avatar: 'https://ui-avatars.com/api/?name=John+E&background=3b82f6&color=fff',
  },
  {
    id: '2',
    name: 'Sarah Manager',
    email: 'sarah@example.com',
    role: 'management',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+M&background=3b82f6&color=fff',
  },
  {
    id: '3',
    name: 'Alex Admin',
    email: 'alex@example.com',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Alex+A&background=3b82f6&color=fff',
  },
];

interface AuthContextType {
  currentUser: User | null;
  login: (userId: string) => void;
  logout: () => void;
  switchUser: (userId: string) => void;
  availableUsers: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(users[0]); // Default to first user

  const login = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchUser = (userId: string) => {
    login(userId);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        switchUser,
        availableUsers: users,
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
