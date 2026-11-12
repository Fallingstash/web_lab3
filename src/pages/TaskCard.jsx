import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { useTodos } from '../state/TodoContext';

function TaskCard() {
  const { listId, taskId } = useParams();
  const { state, dispatch } = useTodos();

  // Находим задачу по ID
  const task = state.tasks.find(t => t.id === taskId);

  // Локальные стейты для полей ввода (чтобы не менять глобальный стейт на каждую букву)
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description || '' : '');
  const [newSubtask, setNewSubtask] = useState('');

  // Если задачи нет (например, неверный URL)
  if (!task) {
    return (
      <div>
        <h2>Задача не найдена</h2>
        <Link to={`/lists/${listId}`}>Вернуться к списку</Link>
      </div>
    );
  }

  // Сохранение заголовка и описания (срабатывает при потере фокуса)
  const handleSave = () => {
    dispatch({
      type: 'task/updated',
      payload: { id: task.id, changes: { title, description } }
    });
  };

  // Добавление подзадачи
  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtask.trim()) return;

    dispatch({
      type: 'subtask/added',
      payload: {
        taskId: task.id,
        subtask: { id: crypto.randomUUID(), title: newSubtask, done: false }
      }
    });
    setNewSubtask('');
  };

  return (
    <div>
      <Link to={`/lists/${listId}`} style={{ color: 'var(--color-primary)' }}>← Назад к списку</Link>
      
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          onBlur={handleSave} // Сохраняем, когда кликаем мимо
          style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'transparent', border: 'none', color: 'var(--color-primary)', borderBottom: '1px solid var(--color-secondary)' }}
        />
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          onBlur={handleSave}
          placeholder="Добавить описание..."
          style={{ background: 'var(--bg-card)', color: 'var(--text-main)', border: '1px solid #333', padding: '10px', borderRadius: '8px', minHeight: '80px' }}
        />

        <h3>Подзадачи</h3>
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {task.subtasks?.map(st => (
            <li key={st.id} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
              <input 
                type="checkbox" 
                checked={st.done} 
                onChange={() => dispatch({ type: 'subtask/toggled', payload: { taskId: task.id, subtaskId: st.id } })}
              />
              <span style={{ textDecoration: st.done ? 'line-through' : 'none', flex: 1 }}>{st.title}</span>
              <button 
                onClick={() => dispatch({ type: 'subtask/removed', payload: { taskId: task.id, subtaskId: st.id } })}
                style={{ background: 'transparent', color: 'red', border: 'none', padding: '0 10px' }}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <form onSubmit={handleAddSubtask} className="add-form">
          <input 
            value={newSubtask} 
            onChange={(e) => setNewSubtask(e.target.value)} 
            placeholder="Новая подзадача..."
          />
          <button type="submit">Добавить</button>
        </form>
      </div>
    </div>
  );
}

export default TaskCard;