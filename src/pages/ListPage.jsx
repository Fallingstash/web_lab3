import { useParams, useSearchParams, Link } from 'react-router'; 
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
  
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get('filter') || 'all'

  let filteredTasks = tasksForList;

  if (currentFilter === 'active') {
    filteredTasks = tasksForList.filter(t => !t.done);
  } else if (currentFilter === 'completed') {
    filteredTasks = tasksForList.filter(t => t.done);
  }

  return (
    <div>
      <h1>{currentList.title}</h1>
      <div style={{ marginBottom: '15px' }}>
        <AddTaskForm listId={listId}/>
      </div>

      {/* Блок фильтров */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <button onClick={() => setSearchParams({ filter: 'all' })}>Все</button>
        <button onClick={() => setSearchParams({ filter: 'active' })}>Активные</button>
        <button onClick={() => setSearchParams({ filter: 'completed' })}>Выполненные</button>
      </div>

      
      <TaskList tasks={filteredTasks} listId={listId} />

    </div>
  );
}

export default ListPage;