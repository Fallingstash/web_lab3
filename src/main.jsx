import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './router.jsx';
import { TodoProvider } from './state/TodoContext.jsx';
import './index.css';
import { ThemeProvider } from './state/ThemeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <TodoProvider>
        <RouterProvider router={router} />
      </TodoProvider>
    </ThemeProvider>
  </React.StrictMode>
);