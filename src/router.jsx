import { createBrowserRouter } from 'react-router';
import Layout from './pages/Layout';
import ListPage from './pages/ListPage';
import TaskCard from './pages/TaskCard'; // Импортируем


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'lists/:listId',
        element: <ListPage />,
        // Убрали отсюда children!
      },
      {
        path: 'lists/:listId/tasks/:taskId', // Тот же путь, но отдельный компонент
        element: <TaskCard />,
      }
    ],
  },
]);