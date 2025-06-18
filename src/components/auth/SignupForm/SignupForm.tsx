'use client';

import { signup } from '@/app/signup/actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SignupForm.module.css';
import { useAuth } from '../AuthProvider/AuthProvider';

interface FormErrors {
  email: string;
  password: string;
  serverError: string | null;
}

interface SignupFormProps {
  onSuccess: () => void;
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
  const router = useRouter();
  const { refreshUser } = useAuth();
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

    setErrors({ email: '', password: '', serverError: null });

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
      const result = await signup(formData);
      if (result && result.error) {
        setMessage(result.error);
      } else if (result && result.success) {
        setMessage('Sign up successful, redirecting.');
        await refreshUser();

        onSuccess();
        router.push('/dashboard');
      }
    } catch {
      setErrors(prev => ({
        ...prev,
        serverError: 'An unexpected error occured. Please try again.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
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
        <div className={styles.messageContainer}>
          {errors.email ? (
            <p className={styles.inputError}>{errors.email}</p>
          ) : null}
        </div>
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
        <div className={styles.messageContainer}>
          {errors.password ? (
            <p className={styles.inputError}>{errors.password}</p>
          ) : null}{' '}
        </div>
      </div>

      <button aria-label='Submit button' disabled={isSubmitting}>
        Sign up
      </button>

      <div className={styles.messageContainer}>
        {message ? (
          <p
            className={
              message.includes('successful')
                ? styles.successMessage
                : styles.errorMessage
            }
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
