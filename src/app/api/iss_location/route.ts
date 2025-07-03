import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.open-notify.org/iss-now.json');
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch ISS location' },
        { status: 500 }
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch ISS location' },
      { status: 500 }
    );
  }
}
