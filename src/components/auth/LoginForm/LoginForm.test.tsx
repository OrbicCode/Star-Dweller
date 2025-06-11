import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('Login In Form', () => {
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

  it('renders input and button elements', () => {
    render(<LoginForm {...defaultProps} />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Log in button' })
    ).toBeInTheDocument();
  });

  it('displays email invalid error', () => {
    render(<LoginForm {...defaultProps} emailError='Email invalid' />);
    expect(screen.getByText('Email invalid')).toBeInTheDocument();
  });

  it('displays password invalid error', () => {
    render(<LoginForm {...defaultProps} passwordError='Password invalid' />);
    expect(screen.getByText('Password invalid')).toBeInTheDocument();
  });

  it('displays message when provided', () => {
    render(<LoginForm {...defaultProps} message='Log in susseccful' />);
    expect(screen.getByText('Log in susseccful')).toBeInTheDocument();
  });

  it('disables inputs and button when isLoading state is true', () => {
    render(<LoginForm {...defaultProps} isLoading={true} />);
    expect(screen.getByLabelText('Email')).toBeDisabled();
    expect(screen.getByLabelText('Password')).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Log in button' })
    ).toBeDisabled();
  });
});
