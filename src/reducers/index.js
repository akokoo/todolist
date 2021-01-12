import initialState from './../initialState';

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'tasksListLoaded': {
            return {
                ...state,
                // tasksListLoaded: true,
                tasksList: action.data
            }
        }
        case 'addTask': {
            return {
                ...state,
                tasksList: [...state.tasksList, action.data]
            }
        }
        case 'editTask': {
            return {
                ...state,
                tasksList: state.tasksList.map(task => {
                    if (task.id === action.data.id) {
                        return {...task, ...action.data};
                    } else {
                        return task;
                    }
                })
            }
        }
        case 'deleteTask': {
            return {
                ...state,
                tasksList: state.tasksList.filter(task => {
                    return task.id !== action.id
                })
            }
        }
        case 'formEditable': {
            return {
                ...state,
                editable: action.status,
                taskDetails: action.taskDetails
            }
        }
        case 'changeTaskStatus': {
            return {
                ...state,
                tasksList: state.tasksList.map(task => {
                    if (task.id === action.id) {
                        return {
                            ...task,
                           status: action.status
                        }
                    } else {
                        return task
                    }
                })
            }
        }
        default: {
            return state;
        }
    }
}