import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';

jest.mock('next/link', () =>
  jest.fn(({ children, href }) => <a href={href}>{children}</a>)
);

describe('NavBar', () => {
  const isOpen = true;
  const onClose = jest.fn();
  const onProfileClick = jest.fn();
  it('renders Home link', () => {
    render(
      <NavBar
        onClose={onClose}
        isOpen={isOpen}
        onProfileClick={onProfileClick}
      />
    );
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });
});
