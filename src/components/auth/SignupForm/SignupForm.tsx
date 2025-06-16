import { signup } from '@/app/signup/actions';

export default function SignupForm() {
  return (
    <form>
      <input id='email' name='email' type='email' required aria-label='email' />
      <input
        id='password'
        name='password'
        type='password'
        required
        aria-label='password'
      />
      <button formAction={signup}>Sign up</button>
    </form>
  );
}
