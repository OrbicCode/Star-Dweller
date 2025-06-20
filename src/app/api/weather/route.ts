import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const city = 'London'; // Default to London
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod !== 200) {
      return NextResponse.json({ error: data.message }, { status: 400 });
    }
    return NextResponse.json(
      {
        temperature: data.main.temp,
        condition: data.weather[0].main,
        city: data.name,
        icon: data.weather[0].icon,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
