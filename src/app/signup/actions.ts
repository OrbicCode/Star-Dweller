'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/utils/supabase/server';
export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: (formData.get('email') as string).trim(),
    password: (formData.get('password') as string).trim(),
  };

  if (!data.email) {
    return { error: 'Email Required' };
  } else if (!data.email.includes('@') || !data.email.includes('.')) {
    return { error: 'Invalid email' };
  }

  if (!data.password) {
    return { error: 'Password required' };
  } else if (data.password.length < 6) {
    return { error: 'Password must be at least 6 characters' };
  }

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { error: error.message };
  }

  const { error: signInError } = await supabase.auth.signInWithPassword(data);

  if (signInError) {
    return { error: signInError.message };
  }

  revalidatePath('/', 'layout');
  return { success: true };
}
