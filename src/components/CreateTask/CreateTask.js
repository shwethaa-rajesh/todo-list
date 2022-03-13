import {useState} from 'react';
import './CreateTask.css'
const CreateTask=(props)=>{
    console.log(props)
    let selectedTitle;
    if(props.taskFunction==='edit')
    {
        selectedTitle=props.task.title;
    }
    else{
        selectedTitle='';
    }
    const [enteredTask,setEnteredTask]=useState(selectedTitle);
    
    const submitHandler = (event) => {
        event.preventDefault();
        const newTask = {
            title: enteredTask,
          };
        if(props.taskFunction==='edit')
        {
            newTask.key=props.task.key;
            props.onEditList(newTask);
        }
      
        else{
            props.onCreateList(newTask)
            setEnteredTask("");
        }
        console.log(newTask)
        
      };
    
    const taskChangeHandler=(event)=>{
        setEnteredTask(event.target.value)
    }
    return(
        <div className='create-task'>
            <h1>Create Task</h1>
            <form onSubmit={submitHandler}>
                <div>
                        <input
                            value={enteredTask}
                            onChange={taskChangeHandler}
                            type="text"
                        ></input>
                </div>
                <button type="submit">Submit</button>
                <button className="cancel" onClick={props.onClick}>
                    Cancel
                </button>
            </form>
        </div>
        
    )
}

export default CreateTask