'use client';

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

interface SpaceXLaunchProps {
  launch: LaunchData | null;
  error: string | undefined;
}

export default function SpaceXLaunch({ launch, error }: SpaceXLaunchProps) {
  const [countdown, setCountdown] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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

  if (error) {
    return (
      <div className={styles.container}>
        <p>{error}</p>
      </div>
    );
  }

  if (!launch) {
    return (
      <div className={styles.container}>
        <p>Loading launch data...</p>
      </div>
    );
  }

  // Format date consistently for both server and client
  const formatDate = (dateString: string) => {
    if (!isClient) {
      return 'Loading...';
    }
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className={styles.container}>
      <div>
        <p>{formatDate(launch.t0)}</p>
        <p>{launch.vehicle.name}</p>
        <p>{launch.pad.location.name}</p>
      </div>
      <div>
        <p className={styles.countdown}>{countdown}</p>
      </div>
    </div>
  );
}
