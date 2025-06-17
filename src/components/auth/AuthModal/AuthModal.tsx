import { useState } from 'react';
import styles from './AuthModal.module.css';
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm/SignupForm';

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  function handleSuccess() {
    onClose();
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeBtn}>
          {<span className={`material-symbols-outlined`}>close</span>}
        </button>
        <h2>{isLogin ? 'Log in' : 'Sign up'}</h2>
        {isLogin ? (
          <LoginForm onSuccess={handleSuccess} />
        ) : (
          <SignupForm onSuccess={handleSuccess} />
        )}
        <p>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            className={styles.toggle}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
}
