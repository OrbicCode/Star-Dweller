import styles from './LoginForm.module.css';

interface LoginFormProps {
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

export default function LoginForm({
  email,
  password,
  emailError,
  passwordError,
  isLoading,
  message,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
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

      <button aria-label='Log in button' disabled={isLoading}>
        Log in
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

      <p className={styles.gotoSignup}>
        Not a user? <a href='/auth/signup'>Sign up</a>
      </p>
    </form>
  );
}
