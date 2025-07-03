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

export async function fetchAstroData(): Promise<AstroData> {
  const response = await fetch('http://api.open-notify.org/astros.json');
  return response.json();
}

export default async function WhoIsInSpace() {
  const data = await fetchAstroData();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{"Who's in Space?"}</h3>
        <span className={styles.number}>{data && data.number}</span>
      </div>
      <div className={styles.astrosContainer}>
        {data
          ? data.people.map(astro => (
              <div key={astro.name} className={styles.astros}>
                <p>{astro.name}</p>
                <p>{astro.craft}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
