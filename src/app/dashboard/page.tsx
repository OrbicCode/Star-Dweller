'use client';

import WidgetCard from '@/components/WidgetCard/WidgetCard';
import styles from './page.module.css';
import TodoWidget from '@/components/TodoWidget/TodoWidget';

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <div>
        <WidgetCard title={null}>
          <TodoWidget />
        </WidgetCard>
      </div>
    </div>
  );
}
