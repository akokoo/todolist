import React from 'react';
import { useSelector } from 'react-redux';
import Task from './../task';
import AddTaskForm from './../addTaskForm';
import { useAuth0 } from "../../react-auth0-spa";
import './mainPage.scss';

const MainPage = () => {

    const _tasksList = useSelector(state => state.tasksList);
    let tasksList = [];
    if (_tasksList) {
        tasksList = _tasksList.map(task => {
            return (
            <Task key={task.id}  settings={task} />
            )
        });
    }
    
    const {logout} = useAuth0();

    return (
        <div className='todo-container todo-frame'>
            <div className='todo-list'>
                <div className='frame-header'>
                    <div className='frame-title'>Todo List</div>
                </div>
                <div className='list mt-1'>
                    {tasksList}
                </div>
            </div>
            <AddTaskForm/>
            <div className='logout-container'>
                <button
                    className='btn btn-outline-warning'
                    onClick={() => logout()}
                >
                    Logout
                </button>
            </div>
        </div>
    )
};

export default MainPage;