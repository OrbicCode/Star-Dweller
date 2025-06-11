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
    <form onSubmit={onSubmit}>
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
      </div>

      {emailError ? <p>{emailError}</p> : null}

      <div>
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          value={password}
          placeholder='password'
          onChange={onPasswordChange}
          disabled={isLoading}
        />
      </div>

      {passwordError ? <p>{passwordError}</p> : null}

      <button aria-label='Log in button' disabled={isLoading}>
        Log in
      </button>

      {message ? <p>{message}</p> : null}

      <p>
        Not a user? <a href='#'>Sign up</a>
      </p>
    </form>
  );
}
