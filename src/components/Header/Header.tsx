'use client';

import Link from 'next/link';
import NavBar from '../NavBar/NavBar';
import styles from './Header.module.css';
import AuthModal from '../auth/AuthModal/AuthModal';
import { useState } from 'react';
import { useAuth } from '../auth/AuthProvider/AuthProvider';

export default function Header() {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <Link href={user ? '/dashboard' : '/'}>
        <span className='material-symbols-outlined'>orbit</span>
      </Link>

      {user && <p>Welcome Earthling</p>}

      {user ? (
        <div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={styles.burger_menu}
            aria-label='Nav button'
          >
            <span className={`material-symbols-outlined burger-menu`}>
              menu
            </span>
          </button>
          <NavBar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
      ) : (
        <button
          onClick={() => setIsAuthModalOpen(!isAuthModalOpen)}
          className={styles.loginBtn}
          aria-label='Login'
        >
          Login
        </button>
      )}
      {isAuthModalOpen && (
        <AuthModal onClose={() => setIsAuthModalOpen(false)} />
      )}
    </div>
  );
}
