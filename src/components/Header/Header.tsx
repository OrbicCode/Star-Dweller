'use client';

import Link from 'next/link';
import NavBar from '../NavBar/NavBar';
import styles from './Header.module.css';
import AuthModal from '../auth/AuthModal/AuthModal';
import { useState } from 'react';
import { User } from '@supabase/supabase-js';

interface HeaderProps {
  user: User | null;
}

export default function Header({ user }: HeaderProps) {
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
          >
            <span className={`material-symbols-outlined burger-menu`}>
              menu
            </span>
          </button>
          {isMenuOpen ? <NavBar /> : null}
        </div>
      ) : (
        <button
          onClick={() => setIsAuthModalOpen(!isAuthModalOpen)}
          className={styles.loginBtn}
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
