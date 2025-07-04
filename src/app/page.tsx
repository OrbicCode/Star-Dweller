import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>StarDweller</h1>
      <div>
        <h2>Keep Your Eyes on the Skies</h2>
        <p>
          Manage your tasks, keep up with space news, see when the next SpaceX
          launch is and more
        </p>
      </div>
      <Image src={'/dashboard.webp'} width={575} height={300} alt='logo' />
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
