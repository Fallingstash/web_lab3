import { createBrowserRouter } from 'react-router';
import Layout from './pages/Layout';
import ListPage from './pages/ListPage';
import TaskCard from './pages/TaskCard'; // Импортируем
import NotFoundPage from './pages/NotFoundPage';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'lists/:listId',
        element: <ListPage />,
      },
      {
        path: 'lists/:listId/tasks/:taskId',
        element: <TaskCard />,
      },
      {
        path: '*', // Звездочка означает "любой другой путь"
        element: <NotFoundPage />,
      }
    ],
  },
]);