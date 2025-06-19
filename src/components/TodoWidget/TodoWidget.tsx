import { useState, useEffect } from 'react';
import styles from './TodoWidget.module.css';

interface Task {
  id: number;
  task: string;
  completed: boolean;
}

export default function TodoWidget() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [editText, setEditText] = useState<{ [key: number]: string }>({});
  console.log(editText);
  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch('/api/todos');
      const data = await response.json();
      if (Array.isArray(data)) setTasks(data);
    }
    fetchTasks();
  }, []);

  async function addTask(e: React.FormEvent) {
    e.preventDefault();
    if (!newTask.trim()) return;

    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: newTask }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    console.log(data);

    setTasks([...tasks, data]);
    setNewTask('');
  }

  const editTask = async (id: number, originalText: string) => {
    const newText = editText[id] || originalText;
    if (newText === originalText) return; // No change, skip update

    const response = await fetch('/api/todos/edit', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, task: newText }),
    });
    if (response.ok) {
      setTasks(
        tasks.map(task => (task.id === id ? { ...task, task: newText } : task))
      );
      setEditText(prev => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number,
    task: string
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      editTask(id, task);
    }
  };

  const handleBlur = (id: number, task: string) => {
    editTask(id, task);
  };

  return (
    <div className={styles.container}>
      <ul>
        {tasks.map((task: Task) => (
          <li key={task.id}>
            <input
              type='text'
              value={
                editText[task.id] !== undefined ? editText[task.id] : task.task
              }
              onChange={e =>
                setEditText(prev => ({ ...prev, [task.id]: e.target.value }))
              }
              onKeyDown={e => handleKeyDown(e, task.id, task.task)}
              onBlur={() => handleBlur(task.id, task.task)}
            />
          </li>
        ))}
      </ul>
      <form onSubmit={addTask}>
        <input
          type='text'
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <button>+</button>
      </form>
    </div>
  );
}
