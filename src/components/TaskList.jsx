import TaskItem from './TaskItem';

// Этот компонент получает массив задач через props
function TaskList({ tasks, onDelete, onToggle }) {
  return (
    <ul>
      {/* Мы используем map, чтобы превратить массив данных в массив компонентов */}
      {tasks.map((task) => (
        <TaskItem key={task.id} title={task.title} done={task.done} onDelete={() => onDelete(task.id)} onToggle={() => onToggle(task.id)}/>
      ))}
    </ul>
  );
}

export default TaskList;