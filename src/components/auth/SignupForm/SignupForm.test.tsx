import { fireEvent, render, screen } from '@testing-library/react';
import SignupForm from './SignupForm';

describe('Sign Up Form', () => {
  const defaultProps = {
    email: '',
    password: '',
    emailError: null,
    passwordError: null,
    isLoading: false,
    message: null,
    onEmailChange: jest.fn(),
    onPasswordChange: jest.fn(),
    onSubmit: jest.fn(),
  };

  it('renders inputs and button', () => {
    render(<SignupForm {...defaultProps} />);
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Sign Up Button' })
    ).toBeInTheDocument();
  });

  it('displays email validation error', () => {
    render(<SignupForm {...defaultProps} emailError='Invalid email' />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('displays message when provided', () => {
    render(<SignupForm {...defaultProps} message='Sign Up Successful' />);
    expect(screen.getByText('Sign Up Successful')).toBeInTheDocument();
  });

  it('disables inputs when isLoading state is true', () => {
    render(<SignupForm {...defaultProps} isLoading={true} />);
    expect(screen.getByLabelText('Email:')).toBeDisabled();
    expect(screen.getByLabelText('Password:')).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Sign Up Button' })
    ).toBeDisabled();
  });

  it('calls onSubmit when button is clicked', () => {
    render(<SignupForm {...defaultProps} />);
    fireEvent.submit(screen.getByRole('form'));
    expect(defaultProps.onSubmit).toHaveBeenCalled();
  });
});
