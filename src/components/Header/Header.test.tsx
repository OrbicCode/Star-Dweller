import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from './Header';
import AuthModal from '../auth/AuthModal/AuthModal';
import NavBar from '../NavBar/NavBar';
import { useAuth } from '../auth/AuthProvider/AuthProvider';

jest.mock('@/components/NavBar/NavBar', () => jest.fn(() => <div>NavBar</div>));
jest.mock('@/components/auth/AuthModal/AuthModal', () =>
  jest.fn(() => (
    <div>
      <div>AuthModal</div>
    </div>
  ))
);
jest.mock('next/link', () => {
  return jest.fn(({ children, href }) => <a href={href}>{children}</a>);
});
jest.mock('@/components/auth/AuthProvider/AuthProvider.tsx', () => ({
  useAuth: jest.fn(),
}));

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login button when no user', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    render(<Header />);
    expect(screen.getByRole('button', { name: 'Login' }));
  });

  it('shows AuthModal when login button clicked', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    render(<Header />);
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    await waitFor(() => {
      expect(AuthModal).toHaveBeenCalled();
    });
  });

  it('renders welcome and burger when user logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: '123', email: 'test@example.com' },
    });
    render(<Header />);
    expect(screen.getByText('Welcome Earthling')).toBeInTheDocument();
    expect(screen.getByText('menu')).toBeInTheDocument();
  });

  it('shows NavBar when burger is clicked', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: '123', email: 'test@example.com' },
    });
    render(<Header />);
    fireEvent.click(screen.getByRole('button', { name: 'Nav button' }));

    await waitFor(() => {
      expect(NavBar).toHaveBeenCalled();
    });
  });
});
