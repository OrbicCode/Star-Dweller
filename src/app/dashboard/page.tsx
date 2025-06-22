import WidgetCard from '@/components/WidgetCard/WidgetCard';
import styles from './page.module.css';
import WhoIsInSpace from '@/components/WhoIsInSpace/WhoIsInSpace';
import TodoWrapper from '@/components/wrappers/TodoWrapper/TodoWrapper';
import WeatherWrapper from '@/components/wrappers/WeatherWrapper/WeatherWrapper';

interface NasaApod {
  title: string;
  url: string;
  hdurl: string;
}
export const revalidate = 43200;

export default async function Dashboard() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const nasaPhotoResponse = await fetch(`${baseUrl}/api/nasaPhoto`);
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
        <WidgetCard title={null} background={'/rocket.png'}>
          <WhoIsInSpace />
        </WidgetCard>
      </div>
    </div>
  );
}
