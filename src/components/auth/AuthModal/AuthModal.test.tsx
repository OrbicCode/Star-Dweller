import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthModal from './AuthModal';

jest.mock('@/components/auth/LoginForm/LoginForm', () =>
  jest.fn(() => <div>Login Form</div>)
);
jest.mock('@/components/auth/SignupForm/SignupForm', () =>
  jest.fn(() => <div>Sign up Form</div>)
);

describe('AuthModal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form by default', () => {
    render(<AuthModal onClose={onClose} />);
    expect(screen.getByText('Log in')).toBeInTheDocument();
  });

  it('toggles to signup when sign up button clicked', async () => {
    render(<AuthModal onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }));
    await waitFor(() => {
      expect(screen.getByText('Sign up')).toBeInTheDocument();
    });
  });

  it('calls onClose when close button clicked', () => {
    render(<AuthModal onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: 'close' }));
    expect(onClose).toHaveBeenCalled();
  });
});
