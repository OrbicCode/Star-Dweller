import styles from './WhoIsInSpace.module.css';

interface Astronaut {
  craft: string;
  name: string;
}

interface AstroData {
  people: Astronaut[];
  number: number;
}

export const revalidate = 86400;

export default async function WhoIsInSpace() {
  const response = await fetch('http://api.open-notify.org/astros.json');
  const data: AstroData = await response.json();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{"Who's in Space?"}</h3>
        <span>{data && data.number}</span>
      </div>
      {data
        ? data.people.map(astro => (
            <div key={astro.name} className={styles.astrosContainer}>
              <p>{astro.name}</p>
              <p>{astro.craft}</p>
            </div>
          ))
        : null}
    </div>
  );
}
