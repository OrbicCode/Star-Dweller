import styles from './WeatherWrapper.module.css';
import Weather from '@/components/Weather/Weather';

export const revalidate = 600;

export default async function WeatherWrapper() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000');
  const url = `${baseUrl}/api/weather`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      console.error('Weather API error:', response.status, response.statusText);
      throw new Error(`Weather API failed: ${response.status}`);
    }

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
  } catch (error) {
    console.error('WeatherWrapper error:', error);
    // Return fallback UI instead of crashing
    return (
      <div className={styles.weatherWrapper}>
        <Weather
          weather={{
            temperature: 0,
            condition: 'Data unavailable',
            city: 'Unknown',
            icon: '',
          }}
        />
      </div>
    );
  }
}
