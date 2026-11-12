export function todoReducer(state, action) {
  switch (action.type) {
    case 'task/added':
      return {
        ...state,
        tasks: [...state.tasks, action.payload] // action.payload - это новая задача
      };
      
    case 'task/toggled':
      return {
         ...state,
         tasks: state.tasks.map(task => {
            if (task.id === action.payload) {
                const newDoneStatus = !task.done
                return {
                    ...task,
                    done: newDoneStatus,
                    subtasks: task.subtasks.map(st => ({...st, done: newDoneStatus}))
                };
            }

            return task;
        })
            
      };

    case 'task/removed':
       return {
         ...state,
         tasks: state.tasks.filter(task => task.id !== action.payload)
       };

    case 'task/updated':
        return {
            ...state,
            tasks: state.tasks.map(task => 
                task.id === action.payload.id
                    ? {...task, ...action.payload.changes } // Меняем только то, что пришло в changes
                    : task            
            )
        };

    case 'subtask/added':
        return {
            ...state,
            tasks: state.tasks.map(task =>
                task.id === action.payload.taskId
                ? {...task, subtasks: [...task.subtasks, action.payload.subtask]}
                : task
            )
        };

    case 'subtask/toggled':
        return { 
            ...state,
            tasks: state.tasks.map(task => {
                if (task.id === action.payload.taskId) {
                    // 1. Обновляем нужную подзадачу
                    const updatedSubtasks = task.subtasks.map(subtask => 
                        subtask.id === action.payload.subtaskId 
                        ? {...subtask, done: !subtask.done }
                        : subtask
                    );
                    
                    // 2. Проверяем: если ВСЕ подзадачи выполнены (every), то и задача выполнена
                    const allDone = updatedSubtasks.every(st => st.done);

                    return {
                        ...task,
                        subtasks: updatedSubtasks,
                        done: allDone // Задача становится выполненной, только если все подзадачи галочками
                    };
                }
                return task;
            })
        };
    
    case 'subtask/removed':
        return {
            ...state,
            tasks: state.tasks.map(task =>
                task.id === action.payload.taskId
                ? {...task, subtasks: task.subtasks.filter(subtask =>
                    subtask.id != action.payload.subtaskId
                )}
                : task
            )
        };

    default:
      return state;
  }
}