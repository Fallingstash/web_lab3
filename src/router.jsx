import { createBrowserRouter } from 'react-router';
import Layout from './pages/Layout'; // Мы создадим их ниже
import ListPage from './pages/ListPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Обертка со списками
    children: [
      {
        path: 'lists/:listId', // :listId означает, что тут будет динамический ID
        element: <ListPage />, // Страница конкретного списка
      },
    ],
  },
]);