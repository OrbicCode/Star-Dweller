import Link from 'next/link';
import styles from './NavBar.module.css';

interface NavBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavBar({ isOpen, onClose }: NavBarProps) {
  return (
    <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
      <button onClick={onClose} className={styles.closeBtn}>
        <span className={`material-symbols-outlined`}>close</span>
      </button>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/dashboard'>Dashboard</Link>
        </li>
        <li>
          <Link href=''>Sign Out</Link>
        </li>
      </ul>
    </nav>
  );
}
