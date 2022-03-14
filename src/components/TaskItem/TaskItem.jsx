import {useState} from 'react';
import './TaskItem.css'
const TaskItem=(props)=>{
    
    const [initialTitle,setInitialTitle]=useState(props.title);
    const [editedTitle,setEditedTitle]=useState('');
    let editedValue
    const changeTitleHandler=(event)=>{
        editedValue=event.target.value;
        setEditedTitle(editedValue);
    }
    const editHandler=(event)=>{
        event.preventDefault();
        setInitialTitle(editedTitle);
        setEditedTitle('')
    }
    return(
        <div className='task-item'>
            <h4>{initialTitle}</h4>
            <form>
            <div>
                        <input
                            value={editedTitle}
                            onChange={changeTitleHandler}
                            type="text"
                        ></input>
                        <button onClick={editHandler}>Edit</button>
                </div>
                
            </form>
            
        </div>
        
    )
}

export default TaskItem