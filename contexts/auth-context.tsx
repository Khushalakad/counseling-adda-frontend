"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

export type UserRole = "admin" | "user";

export interface User {
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// Mock user database (in production, this would be an API)
const mockUsers: Array<{ email: string; password: string; name: string; role: UserRole }> = [
  { email: "admin@counselingadda.com", password: "admin123", name: "Vishal Gupta", role: "admin" },
  { email: "user@example.com", password: "user123", name: "Himanshu Gupta", role: "user" },
  { email: "student@example.com", password: "student123", name: "Vishal Gupta", role: "user" },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    // Check if user is logged in from localStorage
    const storedAuth = localStorage.getItem("user_auth");
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        setIsAuthenticated(true);
        setUser(authData.user);
      } catch (error) {
        localStorage.removeItem("user_auth");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in production, this would call an API
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData: User = {
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
      };
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem("user_auth", JSON.stringify({ user: userData }));
      return true;
    }
    return false;
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      return false;
    }

    // Add new user to mock database
    const newUser = { email, password, name, role: "user" as UserRole };
    mockUsers.push(newUser);

    // Auto-login after registration
    const userData: User = {
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    };
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem("user_auth", JSON.stringify({ user: userData }));
    return true;
  };

  const logout = () => {
    const currentUser = user;
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user_auth");

    // Redirect based on user role
    if (currentUser?.role === "admin") {
      router.push("/admin/login");
    } else {
      router.push("/login");
    }
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, isAdmin, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
