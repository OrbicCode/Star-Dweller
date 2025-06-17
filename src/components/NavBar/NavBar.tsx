import Link from 'next/link';
import styles from './NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href=''>Home</Link>
        </li>
        <li>
          <Link href=''>Dashboard</Link>
        </li>
        <li>
          <Link href=''>Sign Out</Link>
        </li>
      </ul>
    </nav>
  );
}
