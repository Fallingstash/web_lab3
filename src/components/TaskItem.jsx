import { useState } from 'react';

function TaskItem({ title, done, onDelete, onToggle }) { // переименовали входящий пропс

  // Функция-обработчик клика
  const handleClick = () => {
    onToggle();
  };

  const handleDeleteClick = () => {
    e.stopPropagation(); // Останавливаем всплытие!
    onDelete()
  };

  return (
    <li 
      onClick={handleClick} 
      style={{ 
        cursor: 'pointer', // Чтобы было видно, что на это можно кликнуть
        textDecoration: done ? 'line-through' : 'none' 
      }}
    >
      {title} {done ? '✅' : '⏳'}
      <button text="Delete" onClick={() => handleDeleteClick()}>Удалить</button>
    </li>
  );
}

export default TaskItem;