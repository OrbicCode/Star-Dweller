'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import styles from './page.module.css';
import LoginForm from '@/components/auth/LoginForm/LoginForm';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    setEmailError(null);
    setPasswordError(null);
    setMessage(null);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    setPasswordError(null);
    setMessage(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: sanEmail,
        password: sanPassword,
      });

      if (error) {
        if (
          error.message.includes('Invalid login credentials') ||
          error.code?.toLowerCase().includes('invalid') ||
          error.status === 400
        ) {
          setMessage('Invalid credentials');
        } else {
          setMessage('Unexpected error, please try again later.');
        }
      } else if (data.user) {
        setMessage('Log in successful, redirecting.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (message === 'Log in successful, redirecting.') {
      const timer = setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, router]);

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <LoginForm
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
