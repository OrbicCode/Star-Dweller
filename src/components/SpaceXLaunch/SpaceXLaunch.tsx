import { useState, useEffect } from 'react';
import styles from './SpaceXLaunch.module.css';

interface LaunchData {
  id: number;
  name: string;
  provider: { name: string };
  vehicle: { name: string };
  pad: { location: { name: string } };
  t0: string;
}

export default function SpaceXLaunch() {
  const [launch, setLaunch] = useState<LaunchData | null>(null);
  const [countdown, setCountdown] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const cached = localStorage.getItem('nextLaunch');

    if (cached) {
      const { launch: cachedLaunch, timestamp } = JSON.parse(cached);
      const now = new Date().getTime();
      const cacheAge = now - timestamp;
      const launchTime = new Date(cachedLaunch.date_utc).getTime();

      if (cacheAge < 24 * 60 * 60 * 1000 && launchTime > now) {
        setLaunch(cachedLaunch);
        return;
      }
    }

    async function fetchLaunch() {
      try {
        const response = await fetch(
          'https://fdo.rocketlaunch.live/json/launches/next/5'
        );
        if (!response.ok) throw new Error('Failed to fetch launch data');
        const data = await response.json();
        const spaceXLaunch = data.result.find(
          (launch: LaunchData) =>
            launch.provider.name === 'SpaceX' &&
            new Date(launch.t0).getTime() > Date.now()
        );
        if (!spaceXLaunch) {
          setError('No upcoming SpaceX launch found');
          throw new Error('No upcoming SpaceX launch found');
        }
        setLaunch(spaceXLaunch);
        localStorage.setItem(
          'nextLaunch',
          JSON.stringify({
            launch: spaceXLaunch,
            timestamp: new Date().getTime(),
          })
        );
      } catch (err) {
        console.error(err);
      }
    }
    fetchLaunch();
  }, []);

  useEffect(() => {
    if (!launch?.t0) return;

    const updateCountdown = () => {
      const launchTime = new Date(launch.t0).getTime();
      const now = new Date().getTime();
      const distance = launchTime - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCountdown(`${days} : ${hours} : ${minutes} : ${seconds}`);
      } else {
        setCountdown('Launch has occurred!');
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, [launch]);

  if (!launch) {
    return (
      <div className={styles.container}>
        <p>{error ? error : 'Loading launch data...'}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <p>{new Date(launch.t0).toLocaleString()}</p>
        <p>{launch.vehicle.name}</p>
        <p>{launch.pad.location.name}</p>
      </div>
      <div>
        <p className={styles.countdown}>{countdown}</p>
      </div>
    </div>
  );
}
