import styles from './WeatherWrapper.module.css';
import Weather from '@/components/Weather/Weather';

export const revalidate = 600;

export default async function WeatherWrapper() {
  const response = await fetch('/api/weather', { cache: 'no-store' });
  if (!response.ok) throw new Error('Failed to fetch weather data');
  const weather = await response.json();

  const iconUrl = weather.icon
    ? `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
    : null;
  return (
    <div className={styles.weatherWrapper}>
      <div
        style={{ backgroundImage: iconUrl ? `url(${iconUrl})` : 'none' }}
        className={styles.background}
      ></div>
      <Weather weather={weather} />
    </div>
  );
}
