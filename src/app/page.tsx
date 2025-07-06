import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        {/* <h1>StarDweller</h1> */}
        <h2>Keep Your Eyes on the Skies</h2>
        <p>
          Manage your tasks, keep up with space news, see when the next SpaceX
          launch is and more
        </p>
      </div>
      <div className={styles.imageSection}>
        <div className={styles.dashboardImageContainer}>
          <Image
            src={'/dashboard-1.webp'}
            fill
            style={{ objectFit: 'cover' }}
            alt='logo'
          />
        </div>
      </div>
      <div>
        <div>
          <span className={`material-symbols-outlined burger-menu`}>menu</span>
          <h3>To-Do List</h3>
          <p>manage your tasks with a to-do list saved to your account</p>
        </div>
      </div>
    </div>
  );
}
