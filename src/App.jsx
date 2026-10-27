import { useState } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';

function App() {

  const [tasks, setTasks] = useState(
    [
    { id: 1, title: 'Купить хлеб', done: false },
    { id: 2, title: 'Выучить React', done: true },
    { id: 3, title: 'Сдать лабу', done: false }
  ]
  );

  function handleAddTask(newTitle) {
    let newTask = {id: crypto.randomUUID(), title: newTitle, done: false };
    setTasks([...tasks, newTask]);
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter(task => task.id != id));
  }
  
  function handleToggleTask(id) {
  setTasks(tasks.map(task => 
    task.id === id 
      ? { ...task, done: !task.done } // Если это та задача, создаем копию с противоположным done
      : task // Если не та, оставляем без изменений
  ));
}

  return (
    <div>
      <h1>Мой React Менеджер Задач</h1>
      <AddTaskForm onAdd={handleAddTask} />
      <TaskList tasks={tasks} onDelete={handleDeleteTask} onToggle={handleToggleTask} />
    </div>
  );
}

export default App;