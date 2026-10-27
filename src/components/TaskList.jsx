import TaskItem from './TaskItem';

// Этот компонент получает массив задач через props
function TaskList({ tasks }) {
  return (
    <ul>
      {/* Мы используем map, чтобы превратить массив данных в массив компонентов */}
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task}/>
      ))}
    </ul>
  );
}

export default TaskList;