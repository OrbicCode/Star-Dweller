import { createClient } from './server';
import { User } from '@supabase/supabase-js';

export async function getUser(): Promise<User | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    console.error('Error fetching user:', error?.message);
    return null;
  }

  return data.user;
}
