import React, { createContext, useState, useContext, useEffect } from 'react';

type UserRole = 'student' | 'teacher' | 'admin';

export type User = {
  id: string;
  email: string;
  name: string;
  userType: UserRole;
  avatar: string;
  department?: string;
  joinDate?: string;
};

type AuthResult = { success: true; user: User } | { success: false; error: string };

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, userType: UserRole) => Promise<AuthResult>;
  signup: (
    email: string,
    password: string,
    userType: UserRole,
    fullName: string
  ) => Promise<AuthResult>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      try {
        const parsed = JSON.parse(storedUser) as User;
        setUser(parsed);
      } catch (err) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
    userType: UserRole
  ): Promise<AuthResult> => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: 'user_' + Date.now(),
        email,
        name: email.split('@')[0] || 'User',
        userType,
        avatar: `https://i.pravatar.cc/150?img=${Math.round(Math.random() * 70)}`,
        department: 'Computer Science',
        joinDate: new Date().toISOString(),
      };

      const mockToken = 'token_' + Date.now();

      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', mockToken);
      setUser(mockUser);

      return { success: true, user: mockUser };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (
    email: string,
    password: string,
    userType: UserRole,
    fullName: string
  ): Promise<AuthResult> => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: 'user_' + Date.now(),
        email,
        name: fullName,
        userType,
        avatar: `https://i.pravatar.cc/150?img=${Math.round(Math.random() * 70)}`,
        department: 'Computer Science',
        joinDate: new Date().toISOString(),
      };

      const mockToken = 'token_' + Date.now();

      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', mockToken);
      setUser(mockUser);

      return { success: true, user: mockUser };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setError(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        signup,
        updateProfile,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
