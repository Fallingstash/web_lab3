export function todoReducer(state, action) {
  switch (action.type) {
    case 'task/added':
      return {
        ...state,
        tasks: [...state.tasks, action.payload] // action.payload - это новая задача
      };
      
    case 'task/toggled':
      // Твоя задача: вернуть новый объект state, где в массиве tasks
      // у задачи с нужным id меняется done на противоположное
      // Подсказка: используй state.tasks.map(...)
      return {
         ...state,
         tasks: state.tasks.map(task => {
            if (task.id === action.payload) {
                return {...task, done: !task.done};
            }

            return task;
        })
            
      };

    case 'task/removed':

       return {
         ...state,
         tasks: state.tasks.filter(task => task.id !== action.payload)
       };

    default:
      return state;
  }
}