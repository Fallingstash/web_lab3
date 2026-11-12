import { Link } from 'react-router'; // Импортируем Link
import { useTodos } from '../state/TodoContext';

function TaskItem({ task, listId }) { // Добавили listId для ссылки
  const { dispatch } = useTodos();

  const handleToggle = (e) => {
    e.preventDefault(); // Чтобы клик по чекбоксу не открывал ссылку
    dispatch({ type: 'task/toggled', payload: task.id });
  };

  const handleDelete = (e) => {
    e.stopPropagation(); 
    dispatch({ type: 'task/removed', payload: task.id });
  };

  // Считаем прогресс
  const total = task.subtasks ? task.subtasks.length : 0;
  const done = task.subtasks ? task.subtasks.filter(st => st.done).length : 0;

  return (
    <li className="task-card">
      <div className="task-content">
        <span onClick={handleToggle} style={{ cursor: 'pointer' }}>
          {task.done ? '✅' : '⏳'}
        </span>
        
        {/* Ссылка на карточку задачи */}
        <Link 
          to={`/lists/${listId}/tasks/${task.id}`} 
          style={{ textDecoration: task.done ? 'line-through' : 'none', color: 'inherit' }}
        >
          {task.title}
        </Link>

        {/* Показываем прогресс, если есть подзадачи */}
        {total > 0 && (
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            [{done}/{total}]
          </span>
        )}
      </div>
      
      <button className="btn-delete" onClick={handleDelete}>
        Удалить
      </button>
    </li>
  );
}

export default TaskItem;