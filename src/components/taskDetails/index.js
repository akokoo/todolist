import React from 'react';
import { useHistory } from 'react-router-dom';
import './taskDetails.scss';

const TaskDetails = (props) => {
    const history = useHistory();
    const back = () => {
        history.push('/');
    };
    const taskDetails = props.location.state;
    

    return (
        <div className='task-details todo-frame'>
            <div className='frame-header'>Task details</div>
            <div className='form-wrapper mx-auto'>
                <input disabled={true}
                    className='form-control form-inline title my-3 '
                    value={taskDetails.task_name}
                />
                <input disabled={true}
                    className='form-control description my-3'
                    value={taskDetails.description}
                />
                <button className='btn btn-success mb-3'
                    onClick={back}
                >
                    Back
                </button>
            </div>
        </div>
    )
};

export default TaskDetails;