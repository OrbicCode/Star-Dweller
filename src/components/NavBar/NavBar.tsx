import Link from 'next/link';
import styles from './NavBar.module.css';

interface NavBarProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileClick: () => void;
}

export default function NavBar({
  isOpen,
  onClose,
  onProfileClick,
}: NavBarProps) {
  return (
    <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
      <button onClick={onClose} className={styles.closeBtn}>
        <span className={`material-symbols-outlined`}>close</span>
      </button>
      <ul>
        <li onClick={onClose}>
          <Link href='/'>Home</Link>
        </li>
        <li onClick={onClose}>
          <Link href='/dashboard'>Dashboard</Link>
        </li>
        <li onClick={onClose} className={styles.signoutForm}>
          <form action='/auth/signout' method='POST'>
            <button type='submit' onClick={onClose}>
              Sign Out
            </button>
          </form>
        </li>
        <li className={styles.profileBtnLi}>
          <button onClick={onProfileClick} className={styles.profileBtn}>
            <span className={`material-symbols-outlined ${styles.profile}`}>
              account_circle
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
