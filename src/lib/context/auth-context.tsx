"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean, message: string }>;
  register: (user: Omit<User, 'id'>, password: string) => Promise<{ success: boolean, message: string }>;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: '1',
    email: 'test@example.com',
    password: 'password123',
    name: 'Тестовый Пользователь',
    phone: '+7 (999) 123-4567',
    address: 'ул. Примерная, д. 1, кв. 1'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('samokat_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Failed to parse stored user data', error);
          localStorage.removeItem('samokat_user');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean, message: string }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const foundUser = MOCK_USERS.find(user => user.email === email);

    if (!foundUser || foundUser.password !== password) {
      return { success: false, message: 'Неверный email или пароль' };
    }

    // Remove password from user object before storing
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('samokat_user', JSON.stringify(userWithoutPassword));

    return { success: true, message: 'Успешный вход' };
  };

  const register = async (userData: Omit<User, 'id'>, password: string): Promise<{ success: boolean, message: string }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const existingUser = MOCK_USERS.find(user => user.email === userData.email);

    if (existingUser) {
      return { success: false, message: 'Пользователь с таким email уже существует' };
    }

    // Create new user
    const newUser = {
      ...userData,
      id: `${MOCK_USERS.length + 1}`, // Generate ID
      password // In a real app, this would be hashed
    };

    MOCK_USERS.push(newUser);

    // Log the user in after successful registration
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('samokat_user', JSON.stringify(userWithoutPassword));

    return { success: true, message: 'Регистрация успешна' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('samokat_user');
  };

  const updateUserProfile = async (userData: Partial<User>): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!user) return false;

    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('samokat_user', JSON.stringify(updatedUser));

    return true;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      updateUserProfile
    }}>
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
