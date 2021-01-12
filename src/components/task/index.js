import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, formEditable, changeTaskStatus } from './../../actions';
import { useHistory } from 'react-router-dom';
import { deleteTaskList } from "../../fetch";
import { useAuth0} from "../../react-auth0-spa";
import './task.scss';

const Task  = (props) => {
    const { id, task_name } = props.settings;
    const [status, changeStatus] = useState(!!props.settings.status);
    const [animate, changeAnimate] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const taskHeader = useRef(null);
    const editStatus = useSelector(state => state.editable);
    const { getTokenSilently } = useAuth0();

    const _changeStatus = () => {
        !animate && changeAnimate(true);
        changeStatus(!status);
        dispatch(changeTaskStatus(id, !status));
    };
    const showTaskDetails = () => {
        history.push('/task-details', props.settings);
    };
    const editTask = () => {
        dispatch(formEditable(true, props.settings));
    };
    const _deleteTask = async () => {
        const token = await getTokenSilently();
        dispatch(deleteTask(id));
        deleteTaskList(token, id);
        if (editStatus) {
            dispatch(formEditable(false));
        }
    };
    let statusDone = status ? 'done' : 'undone';
    let statusAnimate = animate ? 'animate' : '';
    return (
        <div
            className={`task ${statusDone} ${statusAnimate}`}
            ref={taskHeader}
            data-id={id}
        >
            <div className='task-container form-group d-flex align-items-center my-1'>
                <input type='checkbox'
                    className='task-check mr-1'
                    onChange={_changeStatus}
                    checked={!!status}
                />
                <input className='task-title form-control'
                    readOnly={true}
                    value={task_name}
                    title='view task description'
                    onClick={showTaskDetails}
                />
                <button className='btn btn-warning'
                    onClick={editTask}
                    title='edit task'
                >&#9998;
                </button>
                 <button className='btn btn-danger'
                    onClick={_deleteTask}
                    title='delete task'
                 >&times;
                 </button>
            </div>
        </div>
    )
};

export default Task;