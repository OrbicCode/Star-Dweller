import WidgetCard from '@/components/WidgetCard/WidgetCard';
import WhoIsInSpace from '@/components/WhoIsInSpace/WhoIsInSpace';
import TodoWrapper from '@/components/wrappers/TodoWrapper/TodoWrapper';
import WeatherWrapper from '@/components/wrappers/WeatherWrapper/WeatherWrapper';
import SpaceNews from '@/components/SpaceNews/SpaceNews';
import SpaceXLaunchWrapper from '@/components/wrappers/SpaceXLaunchWrapper/SpaceXLaunchWrapper';
import ISSLocationWrapper from '@/components/wrappers/ISSLocationWrapper/ISSLocationWrapper';
import styles from './page.module.css';

interface NasaApod {
  title: string;
  url: string;
  hdurl: string;
}
export const dynamic = 'force-dynamic';
export const revalidate = 43200;

async function fetchNasaPhoto(): Promise<NasaApod | null> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY;
    const nasaApiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    const response = await fetch(nasaApiUrl, { next: { revalidate: 43200 } });
    if (!response.ok) {
      throw new Error('Failed to fetch NASA photo');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching NASA photo:', error);
    return null;
  }
}

export default async function Dashboard() {
  const nasaPhoto = await fetchNasaPhoto();

  const containerStyle = nasaPhoto
    ? { backgroundImage: `url(${nasaPhoto.url})` }
    : {};

  return (
    <div className={styles.container} style={containerStyle}>
      <h1 className={styles.visuallyHidden}>Dashboard</h1>
      <div className={styles.widgetContainer}>
        <WidgetCard title={null} background={null}>
          <TodoWrapper />
        </WidgetCard>
        <WidgetCard title='Weather' background={null}>
          <WeatherWrapper />
        </WidgetCard>
        <WidgetCard title='Space News' background={null}>
          <SpaceNews />
        </WidgetCard>
        <WidgetCard title='Next SpaceX Launch' background={'/spacex.png'}>
          <SpaceXLaunchWrapper />
        </WidgetCard>
        <WidgetCard title='ISS Location' background={null}>
          <ISSLocationWrapper />
        </WidgetCard>
        <WidgetCard title={null} background={'/rocket.png'}>
          <WhoIsInSpace />
        </WidgetCard>
      </div>
    </div>
  );
}
