import { useState, useEffect } from 'react';
import styles from './TodoWidget.module.css';

interface Task {
  id: number;
  task: string;
  completed: boolean;
  created_at: string;
}

export default function TodoWidget() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [editText, setEditText] = useState<{ [key: number]: string }>({});
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

    setTasks([...tasks, data]);
    setNewTask('');
  }

  const toggleTask = async (id: number, completed: boolean) => {
    const response = await fetch('/api/todos/toggle', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, completed }),
    });
    const data = await response.json();
    if (response.ok) {
      setTasks(tasks.map(task => (task.id === id ? data : task)));
    }
  };

  const editTask = async (id: number, originalText: string) => {
    const newText = editText[id] || originalText;
    if (newText === originalText) return;

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

  const deleteTask = async (id: number) => {
    const response = await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const completed = tasks.filter(task => task.completed).length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>To-Do</h3>
        <div>
          <span className={completed > 0 ? styles.numberCompleted : undefined}>
            {completed}
          </span>
          <span
            className={
              tasks.length === completed ? styles.numberCompleted : undefined
            }
          >
            {' ' + '/' + ' '}
          </span>
          <span
            className={
              tasks.length === completed ? styles.numberCompleted : undefined
            }
          >
            {tasks.length}
          </span>
        </div>
      </div>
      <ul className={styles.listContainer}>
        {tasks.map((task: Task) => (
          <li key={task.id} className={styles.listItem}>
            <input
              type='checkbox'
              checked={task.completed}
              onChange={() => toggleTask(task.id, task.completed)}
              className={styles.checkbox}
            />
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
              className={
                task.completed ? styles.taskTextCompleted : styles.taskText
              }
            />
            <span
              className={`material-symbols-outlined ${styles.deleteBtn}`}
              onClick={() => deleteTask(task.id)}
            >
              delete
            </span>
          </li>
        ))}
      </ul>
      <form className={styles.addTaskForm} onSubmit={addTask}>
        <input
          type='text'
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <button>
          <span className='material-symbols-outlined'>add_circle</span>{' '}
        </button>
      </form>
    </div>
  );
}
