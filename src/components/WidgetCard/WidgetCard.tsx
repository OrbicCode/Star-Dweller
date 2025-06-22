import styles from './WidgetCard.module.css';

import { ReactNode } from 'react';

interface WidgetCardProps {
  title: string | null;
  children: ReactNode;
  background: string | null;
}

export default function WidgetCard({
  title,
  children,
  background,
}: WidgetCardProps) {
  return (
    <div className={styles.card}>
      {background && (
        <div
          style={{ backgroundImage: `url(${background})` }}
          className={styles.background}
        ></div>
      )}
      <h3>{title}</h3>
      {children}
    </div>
  );
}
