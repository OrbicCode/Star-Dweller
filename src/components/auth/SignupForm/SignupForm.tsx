import styles from './SignupForm.module.css';

interface SignupFormProps {
  email: string;
  password: string;
  emailError: string | null;
  passwordError: string | null;
  isLoading: boolean;
  message: string | null;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SignupForm({
  email,
  password,
  emailError,
  passwordError,
  isLoading,
  message,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: SignupFormProps) {
  return (
    <form onSubmit={onSubmit} className={styles.form} aria-label='Signup Form'>
      <div>
        <input
          id='email'
          name='email'
          value={email}
          placeholder='space@cosmic.com'
          onChange={onEmailChange}
          disabled={isLoading}
          aria-label='Email'
        />
        <div className={styles.messageContainer}>
          {emailError ? (
            <p className={styles.inputError}>{emailError}</p>
          ) : null}
        </div>
      </div>

      <div>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          placeholder='password'
          onChange={onPasswordChange}
          disabled={isLoading}
          aria-label='Password'
        />
        <div className={styles.messageContainer}>
          {passwordError ? (
            <p className={styles.inputError}>{passwordError}</p>
          ) : null}
        </div>
      </div>

      <button aria-label='Sign up button' disabled={isLoading}>
        {isLoading ? 'Signing up...' : 'Sign up'}
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

      <p className={styles.gotoLogin}>
        Already have an account? <a href='/auth/login'>Login</a>
      </p>
    </form>
  );
}
