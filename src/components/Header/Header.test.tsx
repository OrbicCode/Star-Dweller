import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from './Header';
import AuthModal from '../auth/AuthModal/AuthModal';
import NavBar from '../NavBar/NavBar';
import { User } from '@supabase/supabase-js';

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

describe('Header', () => {
  it('renders login button when no user', () => {
    render(<Header user={null} />);
    expect(screen.getByText('orbit')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' }));
  });

  it('shows AuthModal when login button clicked', async () => {
    render(<Header user={null} />);
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    await waitFor(() => {
      expect(AuthModal).toHaveBeenCalled();
    });
  });

  it('renders welcome and burger when user logged in', () => {
    render(<Header user={{ id: '123', email: 'test@example.com' } as User} />);
    expect(screen.getByText('Welcome Earthling')).toBeInTheDocument();
    expect(screen.getByText('menu')).toBeInTheDocument();
  });

  it('shows NavBar when burger is clicked', async () => {
    render(<Header user={{ id: '123', email: 'test@example.com' } as User} />);
    fireEvent.click(screen.getByRole('button', { name: 'Nav button' }));

    await waitFor(() => {
      expect(NavBar).toHaveBeenCalled();
    });
  });
});
