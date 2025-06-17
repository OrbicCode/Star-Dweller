import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { signup } from '@/app/signup/actions';
import SignupForm from './SignupForm';

jest.mock('@/app/signup/actions', () => ({
  signup: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('signup form', () => {
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders the signup form elements', () => {
    render(<SignupForm onSuccess={mockOnSuccess} />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Submit button' })
    ).toBeInTheDocument();
  });

  it('displays client-side empty fields error', async () => {
    render(<SignupForm onSuccess={mockOnSuccess} />);

    fireEvent.click(screen.getByRole('button', { name: 'Submit button' }));

    await waitFor(() => {
      expect(screen.getByText('Email required')).toBeInTheDocument();
      expect(screen.getByText('Password required')).toBeInTheDocument();
    });
  });

  it('displays client-side invalid email error', async () => {
    render(<SignupForm onSuccess={mockOnSuccess} />);

    fireEvent.input(screen.getByLabelText('Email'), {
      target: { value: 'invalidexample.com' },
    });
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit button' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });
  });

  it('displays client-side password too short error', async () => {
    render(<SignupForm onSuccess={mockOnSuccess} />);

    fireEvent.input(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: 'pass' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit button' }));

    await waitFor(() => {
      expect(
        screen.getByText('Password must be at least 6 characters')
      ).toBeInTheDocument();
    });
  });

  it('disables inputs and button onSubmit', async () => {
    render(<SignupForm onSuccess={mockOnSuccess} />);

    fireEvent.input(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit button' }));

    await waitFor(() => {
      expect(screen.getByLabelText('Email')).toBeDisabled();
      expect(screen.getByLabelText('Password')).toBeDisabled();
      expect(
        screen.getByRole('button', { name: 'Submit button' })
      ).toBeDisabled();
    });
  });

  it('signs up user and redirects to dashboard', async () => {
    (signup as jest.Mock).mockResolvedValue({ success: true });

    render(<SignupForm onSuccess={mockOnSuccess} />);

    fireEvent.input(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit button' }));

    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith(expect.any(FormData));
    });
    expect(signup).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('displays user already exists error', async () => {
    (signup as jest.Mock).mockResolvedValue({
      error: 'User already registered',
    });

    render(<SignupForm onSuccess={mockOnSuccess} />);

    fireEvent.input(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit button' }));
    await waitFor(() => {
      expect(screen.getByText('User already registered')).toBeInTheDocument();
    });
  });
});
