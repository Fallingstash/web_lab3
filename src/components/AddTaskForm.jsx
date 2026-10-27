import { useState } from 'react';
import { useTodos } from '../state/TodoContext';

function AddTaskForm() {
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
        title: taskName, 
        done: false 
      } 
    });
    
    setTaskName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
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
