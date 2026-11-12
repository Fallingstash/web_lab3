import { useParams, useSearchParams, Link } from 'react-router'; 
import { useTodos } from '../state/TodoContext';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import { useState } from 'react'; // Добавили useState
import { useDebounce } from '../hooks/useDebounce'; // Импортируем хук

function ListPage() {
  // Достаем ID списка из адресной строки
  const { listId } = useParams(); 
  const { state } = useTodos();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get('filter') || 'all'

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  
  // Находим нужный список по ID
  const currentList = state.lists.find(l => l.id === listId);
  
  // Если списка нет — показываем ошибку
  if (!currentList) return <h2>Список не найден</h2>;
  
  // Фильтруем задачи: оставляем только те, что относятся к этому списку
  const tasksForList = state.tasks.filter(t => t.listId === listId);

  let filteredTasks = tasksForList;

  if (currentFilter === 'active') {
    filteredTasks = tasksForList.filter(t => !t.done);
  } else if (currentFilter === 'completed') {
    filteredTasks = tasksForList.filter(t => t.done);
  }

  if (debouncedSearch.trim()) {
    filteredTasks = filteredTasks.filter(t =>
      t.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }

  return (
    <div>
      {/* Поле поиска */}
      <div style={{ marginBottom: '25px' }}>
        <input 
          type="search"
          placeholder="Поиск по задачам..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #333', background: 'transparent', color: 'white' }}
        />
      </div>
      <h1>{currentList.title}</h1>

      <div style={{ marginBottom: '15px' }}>
        <AddTaskForm listId={listId}/>
      </div>


      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <button onClick={() => setSearchParams({ filter: 'all' })}>Все</button>
        <button onClick={() => setSearchParams({ filter: 'active' })}>Активные</button>
        <button onClick={() => setSearchParams({ filter: 'completed' })}>Выполненные</button>
      </div>

      {/* Обработка пустого результата поиска */}
      {filteredTasks.length === 0 && debouncedSearch.trim() !== '' ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>По запросу "{debouncedSearch}" ничего не найдено</p>
          <button onClick={() => setSearchQuery('')}>Сбросить поиск</button>
        </div>
      ) : (
        <TaskList tasks={filteredTasks} listId={listId} />
      )}
    </div>
  );
}

export default ListPage;