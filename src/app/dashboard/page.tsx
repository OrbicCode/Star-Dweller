'use client';

import styles from './page.module.css';

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <form action='/auth/signout' method='POST'>
        <button type='submit'>Sign Out</button>
      </form>
    </div>
  );
}
