import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';

export async function handleSignOut(router: ReturnType<typeof useRouter>) {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log('signout error:', JSON.stringify(error));
      throw new Error('Sign out failed:', error);
    }

    router.push('/auth/login');
  } catch (error) {
    console.error('Unexpected error during sign out:', error);
    throw error;
  }
}
