import TaskItem from './TaskItem';

function TaskList({ tasks, listId }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} listId={listId} />
      ))}
    </ul>
  );
}

export default TaskList;