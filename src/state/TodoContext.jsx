import { createContext, useContext, useReducer } from 'react';
import { todoReducer } from './todoReducer';

// 1. Создаем сам Контекст (канал связи)
const TodoContext = createContext(null);

// 2. Создаем Провайдер (обертку, которая раздает данные всем детям)
export function TodoProvider({ children }) {
  // Наше начальное состояние
  const initialState = {
    tasks: [
      { id: '1', title: 'Купить хлеб', done: false },
      { id: '2', title: 'Выучить React', done: true }
    ]
  };

  // useReducer принимает редьюсер и начальное состояние
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    // Передаем state и dispatch всем вложенным компонентам
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

// 3. Создаем свой хук для удобства (чтобы не писать useContext везде)
export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos должен использоваться внутри TodoProvider');
  }
  return context;
}