import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'SALES_REP';
}

interface Tenant {
  id: string;
  name: string;
  plan: 'FREE' | 'PRO' | 'ENTERPRISE';
}

interface TenantContextType {
  tenant: Tenant | null;
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking local storage or session
    const storedUser = localStorage.getItem('realtech_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        // Mock tenant fetch based on user
        setTenant({
          id: 'tenant-123',
          name: 'Acme Corp',
          plan: 'PRO'
        });
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    } else {
      // Default mock user for dev convenience if not logged in
      // In production, this would remain null until login
      setUser({
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'SALES_REP'
      });
      setTenant({
        id: 'tenant-123',
        name: 'Acme Corp',
        plan: 'PRO'
      });
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string) => {
    setIsLoading(true);
    // Simulate API login
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: 'user-' + Math.random().toString(36).substr(2, 9),
      name: 'Demo User',
      email: email,
      role: 'SALES_REP'
    };
    
    setUser(mockUser);
    setTenant({
      id: 'tenant-123',
      name: 'Acme Corp',
      plan: 'PRO'
    });
    
    localStorage.setItem('realtech_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    setTenant(null);
    localStorage.removeItem('realtech_user');
  };

  return (
    <TenantContext.Provider value={{ tenant, user, isLoading, login, logout }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}
