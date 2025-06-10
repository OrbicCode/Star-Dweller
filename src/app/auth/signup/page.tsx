'use client';

import { useState, ChangeEvent } from 'react';
import { supabase } from '@/utils/supabaseClient';

export default function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    setEmailError(null);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    setPasswordError(null);
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
        if (error.message === 'User already registered') {
          setMessage('Email already in use');
        }
      } else if (data.user) {
        setMessage('Sign Up successful, redirecting.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email:</label>
        <input
          id='email'
          name='email'
          value={email}
          onChange={handleEmailChange}
          disabled={isLoading}
        />
        {emailError ? <p>{emailError}</p> : null}
        <label htmlFor='password'>Password:</label>
        <input
          id='password'
          name='password'
          onChange={handlePasswordChange}
          disabled={isLoading}
        />
        {passwordError ? <p>{passwordError}</p> : null}
        <button aria-label='Sign Up Button'>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
        {message ? <p>{message}</p> : null}
      </form>
    </div>
  );
}
