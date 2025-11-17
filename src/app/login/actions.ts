'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData) {
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

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  return { success: true };
}

export async function skipLogin() {
  const supabase = await createClient();
  const demoEmail = process.env.DEMO_EMAIL;
  const demoPassword = process.env.DEMO_PASSWORD;

  if (!demoEmail || !demoPassword) {
    return { error: 'Demo credentials not configured' };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: demoEmail,
    password: demoPassword,
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/dashboard');
}
