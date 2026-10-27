import { useState } from 'react';

function AddTaskForm({ onAdd }) {
  // Переименовали для удобства понимания
  const [taskName, setTaskName] = useState("");
  
  const handleSubmit = (event) => {
    event.preventDefault(); 
    
    // Проверяем: если пустая строка или пробелы — выходим
    if (taskName.trim() === "") {
        return; 
    }
    
    // Передаем наверх в App.jsx
    onAdd(taskName);
    
    // Очищаем поле (вызываем функцию-сеттер)
    setTaskName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Управляемый инпут (Controlled Input) */}
      <input 
        type="text" 
        value={taskName} // Значение берется из стейта
        onChange={(e) => setTaskName(e.target.value)} // При каждом вводе обновляем стейт
        placeholder="Новая задача..."
      />
      <button type="submit">Добавить</button>
    </form>
  );
}

export default AddTaskForm;
