import LoginForm from '@/components/auth/LoginForm/LoginForm';
import styles from './page.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <h1>Log in</h1>
      <LoginForm />
    </div>
  );
}
