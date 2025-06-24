'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styles from './ISSLocation.module.css';

export default function ISSLocation() {
  const [location, setLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const response = await fetch('http://api.open-notify.org/iss-now.json');
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
    const interval = setInterval(fetchLocation, 30000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles.container}>
      <MapContainer
        center={location ? [location.lat, location.lon] : [51.505, -0.09]}
        zoom={3}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }} // Ensure the map fills the container
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {location && (
          <Marker position={[location.lat, location.lon]}>
            <Popup>
              ISS Current Location
              <br />
              Lat: {location.lat.toFixed(2)}, Lon: {location.lon.toFixed(2)}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
