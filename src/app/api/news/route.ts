import { NextResponse } from 'next/server';

export async function GET() {
  const url = 'https://api.spaceflightnewsapi.net/v4/articles/?limit=3';

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch space news');
    const data = await response.json();
    return NextResponse.json(data.results);
  } catch {
    return NextResponse.json(
      { error: 'Error fetching space news' },
      { status: 500 }
    );
  }
}
