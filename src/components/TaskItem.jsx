import { useTodos } from '../state/TodoContext';

function TaskItem({ task }) {
  const { dispatch } = useTodos();

  const handleToggle = () => {
    dispatch({ type: 'task/toggled', payload: task.id });
  };

  const handleDelete = (e) => {
    e.stopPropagation(); 
    dispatch({ type: 'task/removed', payload: task.id });
  };

  return (
    <li className="task-card" onClick={handleToggle}>
      <div className="task-content">
        <span>{task.done ? '✅' : '⏳'}</span>
        <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
          {task.title}
        </span>
      </div>
      
      <button className="btn-delete" onClick={handleDelete}>
        Удалить
      </button>
    </li>
  );
}

export default TaskItem;