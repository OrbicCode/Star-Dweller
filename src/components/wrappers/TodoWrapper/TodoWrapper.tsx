import TodoWidget from '../../TodoWidget/TodoWidget';
import { createClient } from '@/utils/supabase/server'; // Adjust path as needed

export default async function TodoWrapper() {
  const supabase = await createClient();
  const { data: tasks, error } = await supabase
    .from('todos')
    .select('id, task, completed, created_at');

  if (error) {
    console.error('Error fetching todos:', error.message);
    return <TodoWidget initialTasks={[]} />; // Fallback to empty array
  }

  return <TodoWidget initialTasks={tasks || []} />;
}
