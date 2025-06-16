'use client';

import { login } from '@/app/login/actions';
import Link from 'next/link';
import { useState } from 'react';

interface FormErrors {
  email: string;
  password: string;
  serverError: string | null;
}

export default function LoginForm() {
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
    serverError: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    setErrors({ email: '', password: '', serverError: '' });

    const formData = new FormData(e.currentTarget);
    const email = (formData.get('email') as string).trim();
    const password = (formData.get('password') as string).trim();

    let hasError = false;
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'Email required' }));
      hasError = true;
    } else if (!email.includes('@') || !email.includes('.')) {
      setErrors(prev => ({ ...prev, email: 'Invalid email' }));
      hasError = true;
    }

    if (!password) {
      setErrors(prev => ({ ...prev, password: 'Password required' }));
      hasError = true;
    } else if (password.length < 6) {
      setErrors(prev => ({
        ...prev,
        password: 'Password must be at least 6 characters',
      }));
      hasError = true;
    }
    if (hasError) {
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await login(formData);
      if (result.error) {
        setMessage(result.error);
      }
    } catch (error) {
      console.error('Login Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <input
          id='email'
          name='email'
          type='email'
          placeholder='space@cosmic.com'
          required
          aria-label='Email'
          disabled={isSubmitting}
        />

        {errors.email ? <p>{errors.email}</p> : null}
      </div>
      <div>
        <input
          id='password'
          name='password'
          type='password'
          placeholder='Password'
          required
          minLength={6}
          aria-label='Password'
          disabled={isSubmitting}
        />
        {errors.password ? <p>{errors.password}</p> : null}
      </div>

      <button aria-label='Submit button' disabled={isSubmitting}>
        Log in
      </button>

      {message ? <p>{message}</p> : null}

      <p>
        Not a user? <Link href='/signup'>Signup</Link>
      </p>
    </form>
  );
}
