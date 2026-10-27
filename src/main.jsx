import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './router.jsx';
import { TodoProvider } from './state/TodoContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodoProvider>
      <RouterProvider router={router} />
    </TodoProvider>
  </React.StrictMode>
);