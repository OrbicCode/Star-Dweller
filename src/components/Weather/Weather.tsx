import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Weather.module.css';

interface WeatherProps {
  onIconLoad: (iconUrl: string | null) => void;
}

interface WeatherData {
  temperature: number;
  condition: string;
  city: string;
  icon: string;
}

export default function Weather({ onIconLoad }: WeatherProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather');
        const data = await response.json();
        setWeather(data);
        const iconUrl = data.icon
          ? `https://openweathermap.org/img/wn/${data.icon}@2x.png`
          : null;
        onIconLoad(iconUrl);
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
      }
    };
    fetchWeather();
  }, []);

  const iconUrl =
    weather && weather.icon
      ? `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
      : null;

  return (
    <div className={`${styles.container}`}>
      <div>
        <p>
          <span>{weather && weather.city}</span>
          <span> | </span>
          <span>
            {new Date().toLocaleDateString('en-GB', { weekday: 'long' })}
          </span>
        </p>
        <p>{weather && weather.condition}</p>
        <p className={styles.temp}>
          {weather && weather.temperature.toFixed(0) + ' ºC'}
        </p>
      </div>
      <div className={styles.iconWrapper}>
        {iconUrl && (
          <Image
            src={iconUrl}
            alt='weather icon'
            width={100}
            height={100}
            className={styles.icon}
          />
        )}
      </div>
    </div>
  );
}
