import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'Image URL is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    return new NextResponse(Buffer.from(arrayBuffer), {
      status: 200,
      headers: { 'Content-Type': contentType },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
}
