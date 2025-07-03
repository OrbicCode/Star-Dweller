import { render, screen } from '@testing-library/react';
import Weather from './Weather';

describe('Weather', () => {
  const weatherData = {
    temperature: 21.5,
    condition: 'Cloudy',
    city: 'London',
    icon: '03d',
  };

  it('renders weather info with icon', () => {
    render(<Weather weather={weatherData} />);
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Cloudy')).toBeInTheDocument();
    const img = screen.getByAltText('weather icon');
    expect(img).toHaveAttribute(
      'src',
      expect.stringContaining(weatherData.icon)
    );
  });

  it('renders without icon if icon is missing', () => {
    const noIconData = { ...weatherData, icon: '' };
    render(<Weather weather={noIconData} />);
    expect(screen.queryByAltText('weather icon')).not.toBeInTheDocument();
  });

  it('shows the current day', () => {
    render(<Weather weather={weatherData} />);
    const day = new Date().toLocaleDateString('en-GB', { weekday: 'long' });
    expect(screen.getByText(day)).toBeInTheDocument();
  });
});
