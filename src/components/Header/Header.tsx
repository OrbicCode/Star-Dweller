'use client';

import Link from 'next/link';
import Image from 'next/image';
import NavBar from '../NavBar/NavBar';
import styles from './Header.module.css';
import AuthModal from '../auth/AuthModal/AuthModal';
import { useState } from 'react';
import { useAuth } from '../auth/AuthProvider/AuthProvider';
import ProfileMenuModal from '../auth/ProfileModal/ProfileMenuModal';

export default function Header() {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <Link href={user ? '/dashboard' : '/'} className={styles.logoContainer}>
        <Image src={'/logo-1.png'} width={75} height={75} alt='logo' />
        <span className={styles.logoText}>Star Dweller</span>
      </Link>

      {user && <p className={styles.welcome}>Welcome Earthling</p>}

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
          <NavBar
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onProfileClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
          />
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

      {isProfileModalOpen && (
        <ProfileMenuModal onProfileClick={() => setIsProfileModalOpen(false)} />
      )}
    </div>
  );
}
