import {
  screen,
  render,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import Signup from './page';
import { supabase } from '@/utils/supabaseClient';

jest.mock('@/utils/supabaseClient', () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
    },
  },
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Sign Up Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form', () => {
    render(<Signup />);

    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Sign up button' })
    ).toBeInTheDocument();
  });

  it('displays error when inputs are empty', () => {
    render(<Signup />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Email required')).toBeInTheDocument();
    expect(screen.getByText('Password required')).toBeInTheDocument();
  });

  it('Loading state disables inputs, buttons and displays messages', async () => {
    const mockSignUp = supabase.auth.signUp as jest.Mock;
    mockSignUp.mockResolvedValue({
      data: { user: { email: 'test@example.com' } },
      error: null,
    });

    render(<Signup />);

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitBtn = screen.getByRole('button', { name: 'Sign up button' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(emailInput).toBeDisabled();
      expect(passwordInput).toBeDisabled();
      expect(submitBtn).toHaveTextContent('Signing up...');
    });
  });

  it('signs up user successfully and redirects', async () => {
    const mockSignUp = supabase.auth.signUp as jest.Mock;
    mockSignUp.mockResolvedValue({
      data: { user: { email: 'test@example.com' } },
      error: null,
    });

    jest.useFakeTimers();

    render(<Signup />);

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitBtn = screen.getByRole('button', { name: 'Sign up button' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitBtn);

    await screen.findByText('Sign up successful, redirecting.');

    await act(async () => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });

    jest.useRealTimers();
  });

  it('displays error for user already registered', async () => {
    const mockSignUp = supabase.auth.signUp as jest.Mock;
    mockSignUp.mockResolvedValue({
      data: null,
      error: { message: 'User already registered' },
    });

    render(<Signup />);

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitBtn = screen.getByRole('button', { name: 'Sign up button' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Email already in use')).toBeInTheDocument();
    });
  });
});
