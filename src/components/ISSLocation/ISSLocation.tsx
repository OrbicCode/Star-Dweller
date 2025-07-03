'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import styles from './ISSLocation.module.css';

export default function ISSLocation() {
  const [location, setLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const response = await fetch('/api/iss_location');
        if (!response.ok) throw new Error('failed to fetch location');
        const data = await response.json();

        const lat = parseFloat(data?.iss_position.latitude);
        const lon = parseFloat(data?.iss_position.longitude);

        setLocation({
          lat: lat,
          lon: lon,
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchLocation();
    const interval = setInterval(fetchLocation, 180000);
    return () => clearInterval(interval);
  }, []);

  const RecenterMap = ({ lat, lon }: { lat: number; lon: number }) => {
    const map = useMap();
    useEffect(() => {
      map.setView([lat, lon], 0);
    }, [lat, lon, map]);
    return null;
  };

  return (
    <div className={styles.container}>
      <MapContainer
        center={location ? [location.lat, location.lon] : [51.505, -0.09]}
        zoom={0}
        scrollWheelZoom={false}
        className={styles.mapContainer}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {location && (
          <>
            <Marker position={[location.lat, location.lon]}>
              <Popup>ISS Current Location</Popup>
            </Marker>
            <RecenterMap lat={location.lat} lon={location.lon} />
          </>
        )}
      </MapContainer>
    </div>
  );
}
