import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import { useTodos } from './state/TodoContext';

function App() {

  const { state } = useTodos();

  return (
    <div>
      <h1>Мой React Менеджер Задач</h1>
      {/* 2. Форма теперь сама знает, куда отправлять задачи (через dispatch) */}
      <AddTaskForm />
      {/* 3. Передаем только сами данные (tasks) для отрисовки */}
      <TaskList tasks={state.tasks} />
    </div>
  );
}

export default App;
