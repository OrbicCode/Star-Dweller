import { render, screen } from '@testing-library/react';
import WidgetCard from './WidgetCard';

it('should render title', () => {
  render(
    <WidgetCard title='To-Do' background={null}>
      <></>
    </WidgetCard>
  );
  expect(screen.getByText('To-Do'));
});
