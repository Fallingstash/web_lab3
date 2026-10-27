import { useState } from 'react';
import { useTodos } from '../state/TodoContext';

function AddTaskForm({ listId }) {
  const [taskName, setTaskName] = useState("");
  const { dispatch } = useTodos();
  
  const handleSubmit = (event) => {
    event.preventDefault(); 
    
    // Проверяем: если пустая строка или пробелы — выходим
    if (taskName.trim() === "") {
        return; 
    }
    
    // КРИЧИМ ДИСПЕТЧЕРУ: "Добавь задачу!"
    dispatch({ 
      type: 'task/added', 
      payload: { 
        id: crypto.randomUUID(), // Важно: ID создается ЗДЕСЬ, а не в редьюсере!
        listId: listId,
        title: taskName, 
        done: false 
      } 
    });
    
    setTaskName("");
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input className='input'
        type="text" 
        value={taskName} 
        onChange={(e) => setTaskName(e.target.value)} 
        placeholder="Новая задача..."
      />
      <button type="submit">Добавить</button>
    </form>
  );
}

export default AddTaskForm;
