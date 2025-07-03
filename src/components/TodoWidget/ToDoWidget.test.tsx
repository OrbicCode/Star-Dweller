import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoWidget from './TodoWidget';

const mockTasks = [
  { id: 1, task: 'Test Task 1', completed: false, created_at: '2024-01-01' },
  { id: 2, task: 'Test Task 2', completed: true, created_at: '2024-01-02' },
];

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('TodoWidget', () => {
  it('renders initial tasks and task counts', () => {
    render(<TodoWidget initialTasks={mockTasks} />);
    expect(screen.getByDisplayValue('Test Task 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Task 2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('adds a new task', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 3,
        task: 'New Task',
        completed: false,
        created_at: '2024-01-03',
      }),
    });

    render(<TodoWidget initialTasks={mockTasks} />);
    const input = screen.getByLabelText('task input');
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.submit(screen.getByRole('form', { name: 'add task form' }));

    await waitFor(() => {
      expect(screen.getByDisplayValue('New Task')).toBeInTheDocument();
    });
  });

  it('toggles a task', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 1,
        task: 'Test Task 1',
        completed: true,
        created_at: '2024-01-01',
      }),
    });

    render(<TodoWidget initialTasks={mockTasks} />);
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect((checkbox as HTMLInputElement).checked).toBe(true);
    });
  });

  it('edits a task', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

    render(<TodoWidget initialTasks={mockTasks} />);
    const input = screen.getByDisplayValue('Test Task 1');
    fireEvent.change(input, { target: { value: 'Edited Task' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(screen.getByDisplayValue('Edited Task')).toBeInTheDocument();
    });
  });

  it('deletes a task', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

    render(<TodoWidget initialTasks={mockTasks} />);
    const deleteBtn = screen.getAllByText('delete')[0];
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(screen.queryByDisplayValue('Test Task 1')).not.toBeInTheDocument();
    });
  });

  it('does not add empty task', async () => {
    render(<TodoWidget initialTasks={mockTasks} />);
    const input = screen.getByLabelText('task input');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.submit(screen.getByRole('form', { name: 'add task form' }));
    expect(fetch).not.toHaveBeenCalled();
  });
});
