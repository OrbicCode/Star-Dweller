import { login } from '@/app/login/actions';

export default function LoginForm() {
  return (
    <form>
      <input
        id='email'
        name='email'
        type='email'
        placeholder='space@cosmic.com'
        required
        aria-label='email'
      />
      <input
        id='password'
        name='password'
        type='password'
        placeholder='Password'
        required
        aria-label='password'
      />
      <button formAction={login}>Log in</button>
    </form>
  );
}
