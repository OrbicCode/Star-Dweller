'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

export default function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    setEmailError(null);
    setMessage(null);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    setPasswordError(null);
    setMessage(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    setIsLoading(true);

    const sanEmail = email.trim();
    const sanPassword = password.trim();

    let hasError = false;
    if (!sanEmail) {
      setEmailError('Email required');
      hasError = true;
    } else if (!sanEmail.includes('@') || !sanEmail.includes('.')) {
      setEmailError('Invalid email');
      hasError = true;
    }
    if (!sanPassword) {
      setPasswordError('Password required');
      hasError = true;
    } else if (sanPassword.length < 8) {
      setPasswordError('Password must have at least 8 characters');
      hasError = true;
    }
    if (hasError) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: sanEmail,
        password: sanPassword,
      });

      if (error) {
        if (error.message.includes('already registered')) {
          setMessage('Email already in use');
        } else {
          setMessage('Unexpected error, please try again later.');
        }
      } else if (data.user) {
        setMessage('Sign Up successful, redirecting.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Unexpected error, please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (message === 'Sign Up successful, redirecting.') {
      const timer = setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, router]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email:</label>
        <input
          id='email'
          name='email'
          value={email}
          placeholder='space@cosmic.com'
          onChange={handleEmailChange}
          disabled={isLoading}
        />

        {emailError ? <p>{emailError}</p> : null}

        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          placeholder='password'
          onChange={handlePasswordChange}
          disabled={isLoading}
        />

        {passwordError ? <p>{passwordError}</p> : null}

        <button aria-label='Sign Up Button' disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>

        {message ? <p>{message}</p> : null}
      </form>
    </div>
  );
}
