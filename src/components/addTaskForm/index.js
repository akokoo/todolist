import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateId } from './../../utils';
import { addTask, editTask, formEditable } from "./../../actions";
import { editTaskList, addTaskList } from './../../fetch';
import { useAuth0 } from "../../react-auth0-spa";
import './addTaskForm.scss';

const AddTaskForm = () => {

    const inputName = useRef(null);
    const inputDescription = useRef(null);
    const [buttonTitle, changeTitle] = useState('+');
    const editStatus = useSelector(state => state.editable);
    const taskDetails = useSelector(state => state.taskDetails);
    const dispatch = useDispatch();
    const { getTokenSilently, user } = useAuth0();

    const submit = async () => {
         const token = await getTokenSilently();
        if (!inputName.current.value) {
            inputName.current.focus();
        } else if (!editStatus) {
            const id =  generateId();

            dispatch(addTask(inputName.current.value, inputDescription.current.value, id));
            addTaskList(user, token, inputName.current.value, inputDescription.current.value, id);
        } else {
            dispatch(editTask(inputName.current.value, inputDescription.current.value, taskDetails.id));
            dispatch(formEditable(false));
            editTaskList({
                user,
                token,
                task_name: inputName.current.value,
                description: inputDescription.current.value,
                id: taskDetails.id
            });
        }
        inputName.current.value = null;
        inputDescription.current.value = null;
    };
    useEffect(() => {
        if (editStatus) {
            inputName.current.value = taskDetails.task_name;
            inputDescription.current.value = taskDetails.description;
            changeTitle('save');
        } else {
            inputName.current.value = null;
            inputDescription.current.value = null;
            changeTitle('+');
        }
    }, [editStatus, taskDetails]);

    return (
        <div className='todo-form card mt-2 mr-2 ml-2 mb-5 bg-light'>
            <div className='card-body'>
                <div className="form-group d-flex justify-content-center mt-3 title">
                    <input className='form-control'
                           placeholder='Title'
                           ref={inputName}
                    />
                    <button className='btn btn-primary btn-form'
                            onClick={submit}
                    >
                        {buttonTitle}
                    </button>
                </div>
                <div className='form-group form-inline justify-content-center description'>
                    <input className='form-control'
                           placeholder='Description'
                           ref={inputDescription}
                    />
                </div>
            </div>
        </div>
    )
};

export default AddTaskForm;