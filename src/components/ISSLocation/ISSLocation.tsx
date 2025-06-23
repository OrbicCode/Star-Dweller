import { useEffect, useState } from 'react';
import styles from './ISSLocation.module.css';

export default function ISSLocation() {
  const [location, setLocation] = useState<{
    lat: number;
    lon: number;
    state: string;
    country: string;
  } | null>(null);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const response = await fetch('http://api.open-notify.org/iss-now.json');
        if (!response.ok) throw new Error('failed to fetch location');
        const data = await response.json();

        const lat = parseFloat(data?.iss_position.latitude);
        const lon = parseFloat(data?.iss_position.longitude);

        const geoResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
        );
        if (!geoResponse.ok) throw new Error('failed to fetch geo location');
        const geoData = await geoResponse.json();
        console.log(geoData);

        let country = 'Unknown';
        let state = 'Unknown';

        if (geoData && geoData.address) {
          country = geoData.address.country ?? 'Unknown';
          state = geoData.address.state ?? 'Unknown';
        }

        setLocation({
          lat: lat,
          lon: lon,
          country: country,
          state: state,
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchLocation();
    const interval = setInterval(fetchLocation, 30000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles.container}>
      <p>{location && location.lat}</p>
      <p>{location && location.lon}</p>
      <p>{location && location.state}</p>
      <p>{location && location.country}</p>
    </div>
  );
}
