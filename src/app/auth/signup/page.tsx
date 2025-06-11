'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import SignupForm from '@/components/auth/SignupForm/SignupForm';

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
        setMessage('Sign up successful, redirecting.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Unexpected error, please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (message === 'Sign up successful, redirecting.') {
      const timer = setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, router]);

  return (
    <div>
      <h1>Sign Up</h1>
      <SignupForm
        email={email}
        password={password}
        emailError={emailError}
        passwordError={passwordError}
        isLoading={isLoading}
        message={message}
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
