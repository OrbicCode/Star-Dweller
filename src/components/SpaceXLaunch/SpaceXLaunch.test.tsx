import { render, screen, act } from '@testing-library/react';
import SpaceXLaunch from './SpaceXLaunch';

jest.useFakeTimers();

const launch = {
  id: 1,
  name: 'Starlink 99',
  provider: { name: 'SpaceX' },
  vehicle: { name: 'Falcon 9' },
  pad: { location: { name: 'Cape Canaveral' } },
  t0: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 1 day from now
};

describe('SpaceXLaunch', () => {
  it('renders loading state', () => {
    render(<SpaceXLaunch launch={null} error={undefined} />);
    expect(screen.getByText('Beaming down launch data...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(
      <SpaceXLaunch launch={null} error='No upcoming SpaceX launch found.' />
    );
    expect(
      screen.getByText('No upcoming SpaceX launch found.')
    ).toBeInTheDocument();
  });

  it('renders launch info', () => {
    render(<SpaceXLaunch launch={launch} error={undefined} />);
    expect(screen.getByText('Falcon 9')).toBeInTheDocument();
    expect(screen.getByText('Cape Canaveral')).toBeInTheDocument();
  });

  it('shows "Launch has occurred!" after countdown', () => {
    const pastLaunch = {
      ...launch,
      t0: new Date(Date.now() - 1000).toISOString(),
    };
    render(<SpaceXLaunch launch={pastLaunch} error={undefined} />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('Launch has occurred!')).toBeInTheDocument();
  });
});
