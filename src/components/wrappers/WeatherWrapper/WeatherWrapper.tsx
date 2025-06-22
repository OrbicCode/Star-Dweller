'use client';

import { useState } from 'react';
import styles from './WeatherWrapper.module.css';
import Weather from '@/components/Weather/Weather';

export default function WeatherWrapper() {
  const [weatherBG, setWeatherBG] = useState<string | null>(null);

  return (
    <div className={styles.weatherWrapper}>
      <div
        style={{ backgroundImage: weatherBG ? `url(${weatherBG})` : 'none' }}
        className={styles.background}
      ></div>
      <Weather onIconLoad={setWeatherBG} />
    </div>
  );
}
