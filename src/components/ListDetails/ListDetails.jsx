
import './ListDetails.css'
//import {useState} from 'react'
const ListDetails=(props)=>{
    //console.log(props)
    const TaskItems = props.tasks.tasks.map((eachTask) => {
       // console.log(eachTask)
       return (
       <div className='task-item'>
           <h4>{eachTask.title}</h4>
           <button onClick={()=>{
             props.onClickEdit(eachTask,props.listId)
           }}>Edit</button>
       </div>
       )
    });
    return(
        <div className='list'>
            <h1>{props.tasks.name}</h1>
    <div className="task-container">
            {TaskItems}
            <hr/>
            
    </div>
    
    <button onClick={()=>{
             props.setEditTask('')
             props.navigate('/tasks');
             
           }}>Add task</button>
    <button onClick={()=>{
             props.navigate('/view-lists')
           }}>View Lists</button>
    </div>)
}
export default ListDetails;