
export function tasksListLoaded(data) {
    return {
        type: 'tasksListLoaded',
        data: data
    }
}

export function addTask(task_name, description, id) {
    return {
        type: 'addTask',
        data: {id, task_name, description}

    }
}

export function editTask(task_name, description, id) {
    return {
        type: 'editTask',
        data: {id, task_name, description}
    }
}

export function formEditable(bool, taskDetails) {
    return {
        type: 'formEditable',
        status: bool,
        taskDetails: taskDetails ? taskDetails: null
    }
}

export function deleteTask(id) {
    return {
        type: 'deleteTask',
        id
    }
}

export function changeTaskStatus(id, status) {
    return {
        type: 'changeTaskStatus',
        id,
        status
    }
}