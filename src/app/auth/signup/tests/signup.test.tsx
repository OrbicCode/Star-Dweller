import { screen, render, fireEvent } from '@testing-library/react';
import Signup from '../page';

describe('Sign Up Page', () => {
  it('renders the form', () => {
    render(<Signup />);

    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Sign Up Button' })
    ).toBeInTheDocument();
  });

  it('displays error when inputs are empty', () => {
    render(<Signup />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Email required')).toBeInTheDocument();
    expect(screen.getByText('Password required')).toBeInTheDocument();
  });

  it('Loading state disables inputs, buttons and displays messages', () => {
    render(<Signup />);

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitBtn = screen.getByRole('button');
    fireEvent.click(screen.getByRole('button'));

    expect(emailInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
    expect(submitBtn).toHaveTextContent('Signing Up...');
  });

  it('signs up user successfully', () => {});
});
