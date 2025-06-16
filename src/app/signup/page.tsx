import SignupForm from '@/components/auth/SignupForm/SignupForm';
import styles from './page.module.css';

export default function SignupPage() {
  return (
    <div className={styles.container}>
      <h1>Sign up</h1>
      <SignupForm />
    </div>
  );
}
