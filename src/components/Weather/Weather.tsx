import Image from 'next/image';
import styles from './Weather.module.css';

interface WeatherData {
  temperature: number;
  condition: string;
  city: string;
  icon: string;
}

interface WeatherProps {
  weather: WeatherData;
}

export default function Weather({ weather }: WeatherProps) {
  const iconUrl = weather.icon
    ? `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
    : null;
  return (
    <div className={styles.container}>
      <div className={styles.weatherInfo}>
        <p>
          <span className={styles.city}>{weather && weather.city}</span>
          <span> | </span>
          <span className={styles.day}>
            {new Date().toLocaleDateString('en-GB', { weekday: 'long' })}
          </span>
        </p>
        <p className={styles.condition}>{weather && weather.condition}</p>
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
