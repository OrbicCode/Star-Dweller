import styles from './WidgetCard.module.css';

import { ReactNode } from 'react';

interface WidgetCardProps {
  title: string | null;
  children: ReactNode;
}

export default function WidgetCard({ title, children }: WidgetCardProps) {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}
