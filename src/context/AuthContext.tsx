import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const VALID_USERS = [
  {
    id: '1',
    email: 'anugrah@email.com',
    password: '1234',
    name: 'Anugrah',
  },
  {
    id: '2',
    email: 'kunal@email.com',
    password: '1234',
    name: 'Kunal',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const validUser = VALID_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (!validUser) {
        throw new Error('Invalid email or password');
      }

      const userObj = {
        id: validUser.id,
        email: validUser.email,
        name: validUser.name,
      };

      setUser(userObj);
      localStorage.setItem('user', JSON.stringify(userObj));
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 