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
    <form onSubmit={onSubmit} aria-label='Signup Form'>
      <div>
        <label htmlFor='email'>Email:</label>
        <input
          id='email'
          name='email'
          value={email}
          placeholder='space@cosmic.com'
          onChange={onEmailChange}
          disabled={isLoading}
        />

        {emailError ? <p>{emailError}</p> : null}
      </div>

      <div>
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          placeholder='password'
          onChange={onPasswordChange}
          disabled={isLoading}
        />

        {passwordError ? <p>{passwordError}</p> : null}
      </div>

      <button aria-label='Sign up button' disabled={isLoading}>
        {isLoading ? 'Signing up...' : 'Sign up'}
      </button>

      {message ? <p>{message}</p> : null}

      <p>
        Already have an account? <a href='/auth/login'>Login</a>
      </p>
    </form>
  );
}
