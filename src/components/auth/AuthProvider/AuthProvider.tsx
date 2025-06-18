// src/components/AuthProvider/AuthProvider.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

type AuthContextType = {
  user: User | null;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    setUser(data?.user || null);
    if (error && error.message !== 'Auth session missing!') {
      console.error('Error fetching user:', error.message);
    }
  };

  useEffect(() => {
    const supabase = createClient();
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, refreshUser: fetchUser }}>
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
