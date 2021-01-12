
const hostName = 'https://desolate-stream-21755.herokuapp.com' || 'http://localhost:5000';

export const loadTasksList = async (user, token) => {
    const { email } = user;
    const name = user.name || user.given_name;

    try {
        const response = await fetch(`${hostName}/gettasks`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({name, email})
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('ERROR', error);
    }
};

export const addTaskList = async (user, token, task_name, description, id) => {
    const { email } = user;
    try {
        const response = await fetch(`${hostName}/addtask`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({user, email, task_name, description, id})
        });
    } catch (error) {
        console.error('ERROR', error);
    }
};

export const editTaskList = async (settings) => {
    const { user, token, task_name, description, id, status } = settings;
    try {
        const response = await fetch(`${hostName}/edittask`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({email: user.email, task_name, description, id})
        });
    } catch (error) {
        console.error('ERROR', error);
    }
};

export const deleteTaskList = async (token, id) => {
    
    try {
        const response = await fetch(`${hostName}/deletetask`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({id})
        });
    } catch (error) {
        console.error('ERROR', error);
    }
};