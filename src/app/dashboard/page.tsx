import WidgetCard from '@/components/WidgetCard/WidgetCard';
import styles from './page.module.css';
import WhoIsInSpace from '@/components/WhoIsInSpace/WhoIsInSpace';
import TodoWrapper from '@/components/wrappers/TodoWrapper/TodoWrapper';
import WeatherWrapper from '@/components/wrappers/WeatherWrapper/WeatherWrapper';
import SpaceNews from '@/components/SpaceNews/SpaceNews';

interface NasaApod {
  title: string;
  url: string;
  hdurl: string;
}
export const revalidate = 43200;

export default async function Dashboard() {
  const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY;
  const nasaApiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  const nasaPhotoResponse = await fetch(nasaApiUrl);
  if (!nasaPhotoResponse.ok) {
    throw new Error('Failed to fetch NASA photo');
  }
  const nasaPhoto: NasaApod = await nasaPhotoResponse.json();

  const containerStyle = nasaPhoto
    ? { backgroundImage: `url(${nasaPhoto.url})` }
    : {};

  return (
    <div className={styles.container} style={containerStyle}>
      <h1>Dashboard</h1>
      <div>
        <WidgetCard title={null} background={null}>
          <TodoWrapper />
        </WidgetCard>
        <WidgetCard title='Weather' background={null}>
          <WeatherWrapper />
        </WidgetCard>
        <WidgetCard title='Space News' background={null}>
          <SpaceNews />
        </WidgetCard>
        <WidgetCard title={null} background={'/rocket.png'}>
          <WhoIsInSpace />
        </WidgetCard>
      </div>
    </div>
  );
}
