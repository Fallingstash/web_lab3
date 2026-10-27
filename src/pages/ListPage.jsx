import { useParams } from 'react-router';
import { useTodos } from '../state/TodoContext';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';

function ListPage() {
  // Достаем ID списка из адресной строки
  const { listId } = useParams(); 
  const { state } = useTodos();

  // Находим нужный список по ID
  const currentList = state.lists.find(l => l.id === listId);

  // Если списка нет — показываем ошибку
  if (!currentList) return <h2>Список не найден</h2>;

  // Фильтруем задачи: оставляем только те, что относятся к этому списку
  const tasksForList = state.tasks.filter(t => t.listId === listId);

  return (
    <div>
      <h1>{currentList.title}</h1>
      <AddTaskForm />
      <TaskList tasks={tasksForList} />
    </div>
  );
}

export default ListPage;