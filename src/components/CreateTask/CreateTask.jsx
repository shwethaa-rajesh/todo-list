import {useState} from 'react';
import './CreateTask.css'
const CreateTask=(props)=>{
// console.log(props)
    let selectedTitle;
    if(props.taskFunction==='edit')
    {
     //   console.log(props)
        selectedTitle=props.task.title;
    }
    else{
        selectedTitle='';
    }
    const [enteredTask,setEnteredTask]=useState(selectedTitle);
    
    const submitHandler = (event) => {
        if(props.label==='List')
        {
            event.preventDefault();
        const newList = {
            name: enteredTask,
            tasks:[]
          };
            props.onCreateList(newList)
            setEnteredTask("");
          
        }
        else
        {event.preventDefault();
        const newTask = {
            title: enteredTask,
          };
        if(props.taskFunction==='edit')
        {
            console.log(props)
            newTask.id=props.task.id;
            console.log(newTask)
            props.onEditList(newTask,props.listId);
        }
        else{
            
            props.onCreateTask(newTask,props.listId)
            setEnteredTask("");
        }
       // console.log(newTask)
    }
        
      };
    
    const taskChangeHandler=(event)=>{
        setEnteredTask(event.target.value)
    }
    return(
        <div className='create-task'>
            <h1>Create 
                <span>{props.label}</span>
            </h1>
            
            <form onSubmit={submitHandler}>
                <div>
                        <input
                            value={enteredTask}
                            onChange={taskChangeHandler}
                            type="text"
                            data-testid="testId-listNameTextInput"
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