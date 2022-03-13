import CreateTask from '../CreateTask/CreateTask'
import TaskItem from '../TaskItem/TaskItem'
import './Tasks.css'
//import {useState} from 'react'
const Tasks=(props)=>{
    const TaskItems = props.tasks.tasks.map((eachTask) => {
        console.log(eachTask)
       return (
       <div className='task-item'>
           <h4>{eachTask.title}</h4>
           <button onClick={()=>{
             props.onClickEdit(eachTask)
           }}>Edit</button>
       </div>
       )
    });
    return(
        <div className='list'>
    <div className="task-container">
            {TaskItems}
            <hr/>
            
    </div>
    <button onClick={()=>{
             props.setPage('tasks')
           }}>Add task</button>
    </div>)
}
export default Tasks;