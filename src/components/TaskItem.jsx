import { useTodos } from '../state/TodoContext';

function TaskItem({ task }) { // переименовали входящий пропс

  const { dispatch } = useTodos()

  // Функция-обработчик клика
  const handleToggle = () => {
    dispatch({
      type: 'task/toggled',
      payload: task.id 
    });
      
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Останавливаем всплытие!
    dispatch({
      type: 'task/removed',
      payload: task.id
    })
  };

  return (
    <li 
      onClick={handleToggle} 
      style={{ 
        cursor: 'pointer', 
        textDecoration: task.done ? 'line-through' : 'none',
        marginBottom: '10px'
      }}
    >
      {task.title} {task.done ? '✅' : '⏳'}
      <button onClick={handleDelete} style={{ marginLeft: '15px' }}>
        Удалить
      </button>
    </li>
  );
}

export default TaskItem;