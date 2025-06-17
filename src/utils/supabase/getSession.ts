import { createClient } from './server';
import { Session } from '@supabase/supabase-js';

export async function getSession(): Promise<Session | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();

  if (error || !data?.session) {
    console.error('Error fetching session:', error?.message);
    return null;
  }

  return data.session;
}
