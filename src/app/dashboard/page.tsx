'use client';

import { useState, useEffect } from 'react';
import WidgetCard from '@/components/WidgetCard/WidgetCard';
import styles from './page.module.css';
import TodoWidget from '@/components/TodoWidget/TodoWidget';
import WhoIsInSpace from '@/components/WhoIsInSpace/WhoIsInSpace';
import Weather from '@/components/Weather/Weather';

interface NasaApod {
  title: string;
  url: string;
  hdurl: string;
}

export default function Dashboard() {
  const [nasaPhoto, setNasaPhoto] = useState<NasaApod | null>(null);
  const [weatherBG, setWeatherBG] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/nasaPhoto')
      .then(res => res.json())
      .then(data => setNasaPhoto(data));
  }, []);

  const containerStyle = nasaPhoto
    ? { backgroundImage: `url(${nasaPhoto.url})` }
    : {};

  return (
    <div className={styles.container} style={containerStyle}>
      <h1>Dashboard</h1>
      <div>
        <WidgetCard title={null} background={null}>
          <TodoWidget />
        </WidgetCard>
        <WidgetCard title='Weather' background={weatherBG}>
          <Weather onIconLoad={setWeatherBG} />
        </WidgetCard>
        <WidgetCard title={null} background={'/rocket.png'}>
          <WhoIsInSpace />
        </WidgetCard>
      </div>
    </div>
  );
}
