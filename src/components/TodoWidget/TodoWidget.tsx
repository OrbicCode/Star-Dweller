'use client';

import { useState } from 'react';
import styles from './TodoWidget.module.css';

interface Task {
  id: number;
  task: string;
  completed: boolean;
  created_at: string;
}

interface TodoWidgetProps {
  initialTasks: Task[];
}

export default function TodoWidget({ initialTasks }: TodoWidgetProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks || []);
  const [newTask, setNewTask] = useState<string>('');
  const [editText, setEditText] = useState<{ [key: number]: string }>({});

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
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !completed } : task
      )
    );

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
              aria-label={`Mark "${task.task}" as ${task.completed ? 'incomplete' : 'complete'}`}
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
              aria-label={`Edit task: ${task.task}`}
            />
            <span
              className={`material-symbols-outlined ${styles.deleteBtn}`}
              onClick={() => deleteTask(task.id)}
              aria-label={`Delete task: ${task.task}`}
              role='button'
            >
              delete
            </span>
          </li>
        ))}
      </ul>
      <form
        className={styles.addTaskForm}
        onSubmit={addTask}
        aria-label='add task form'
      >
        <input
          type='text'
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          aria-label='task input'
        />
        <button className={styles.addCircle}>
          <span className='material-symbols-outlined'>add_circle</span>{' '}
        </button>
      </form>
    </div>
  );
}
