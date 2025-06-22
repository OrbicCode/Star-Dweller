import Image from 'next/image';
import Link from 'next/link';
import styles from './SpaceNews.module.css';

interface Article {
  title: string;
  image_url: string;
  url: string;
}

export default async function SpaceNews() {
  const response = await fetch(
    'https://api.spaceflightnewsapi.net/v4/articles?limit=3'
  );
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }
  const data = await response.json();

  return (
    <div className={styles.container}>
      {data
        ? data.results.map((article: Article) => (
            <Link
              href={article.url}
              key={article.title}
              className={styles.articleContainer}
              target='_blank'
            >
              <Image
                src={`/api/news_image_proxy?url=${encodeURIComponent(article.image_url)}`}
                alt='article image preview'
                width={50}
                height={50}
                className={styles.articleImg}
              />
              <h4 className={styles.articleTitle}>{article.title}</h4>
            </Link>
          ))
        : null}
    </div>
  );
}
