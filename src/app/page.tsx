import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h2>Info Page</h2>
      <Image src={'/logo-1.png'} width={400} height={400} alt='logo' />
    </div>
  );
}
