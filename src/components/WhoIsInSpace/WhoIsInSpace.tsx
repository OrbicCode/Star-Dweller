import { useState, useEffect } from 'react';
import styles from './WhoIsInSpace.module.css';

interface Astronaut {
  craft: string;
  name: string;
}

interface AstroData {
  people: Astronaut[];
  number: number;
}

export default function WhoIsInSpace() {
  const [astros, setAstros] = useState<AstroData | null>(null);

  useEffect(() => {
    fetch('http://api.open-notify.org/astros.json')
      .then(res => res.json())
      .then(data => setAstros(data));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{"Who's in Space?"}</h3>
        <span>{astros && astros.number}</span>
      </div>
      {astros
        ? astros.people.map(astro => (
            <div key={astro.name} className={styles.astrosContainer}>
              <p>{astro.name}</p>
              <p>{astro.craft}</p>
            </div>
          ))
        : null}
    </div>
  );
}
