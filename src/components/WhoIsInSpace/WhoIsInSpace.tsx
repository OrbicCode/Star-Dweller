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

export async function fetchAstroData(): Promise<AstroData | null> {
  try {
    const response = await fetch('http://api.open-notify.org/astros.json');
    if (!response.ok) {
      throw new Error('Failed to fetch astronaut data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching astronaut data:', error);
    return null;
  }
}

export default async function WhoIsInSpace() {
  const data = await fetchAstroData();

  if (!data) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>{"Who's in Space?"}</h3>
          <span className={styles.number}>?</span>
        </div>
        <div className={styles.astrosContainer}>
          <p>Unable to load astronaut data</p>
          <p>Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{"Who's in Space?"}</h3>
        <span className={styles.number}>{data.number}</span>
      </div>
      <div className={styles.astrosContainer}>
        {data.people.map(astro => (
          <div key={astro.name} className={styles.astros}>
            <p>{astro.name}</p>
            <p>{astro.craft}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
