import {useState} from 'react';
import './CreateTask.css'

import {addNewListDB,addNewTaskDB,updateTaskDB} from '../../utils/backend/backend.utils'
import {getItemBasedOnId} from '../../utils/common/common'
import { useNavigate } from 'react-router-dom';
const CreateTask=(props)=>{
// console.log(props)
const navigate=useNavigate();

const onCreateTask = (newListData,listId) => {
    addNewTaskDB(newListData,listId).then((response)=>{
      console.log(response);
      const newList={
       name:getItemBasedOnId(props.listsData,listId).name,
       id: getItemBasedOnId(props.listsData,listId).id,
       tasks: [...props.taskItems.tasks, response]
    }
    const newLists= props.listsData.map((eachList,index)=>{
     if(index===listId-1)
     {
       return newList;
     }
     else
     {
       return eachList;
     }
  })
 props.setTaskItems(newList);
 props.setList(newLists);
 navigate('/lists')

    })

  };
  const onCreateList = (newListData,listId) => {
    console.log(newListData)
    addNewListDB(newListData).then((response)=>{
      const updatedList=[...props.listsData,response];
      props.setTaskItems(response);
      props.setList(updatedList);
      
      navigate('/view-lists')
    })

  };
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
            onCreateList(newList)
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
            
           // props.onCreateTask(newTask,props.listId)
            onCreateTask(newTask,props.listId)
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