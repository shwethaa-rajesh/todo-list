
import './ListDetails.css'
//import {useState} from 'react'
const ListDetails=(props)=>{
    //console.log(props)
    /*
<div className='task-item'>
           <h4>{eachTask.title}</h4>
           <button onClick={()=>{
             props.onClickEdit(eachTask,props.listId)
           }}>Edit</button>
       </div>
    */
    const TaskItems = props.tasks.tasks.map((eachTask) => {
       // console.log(eachTask)
       return (
        <button type="button" className='task-item' onClick={()=>{
          props.onClickEdit(eachTask,props.listId)
        }}>{eachTask.title}</button>
       )
    });
    return(
        <div className='list'>
            <button className="add-task" onClick={()=>{
             props.setEditTask('')
             props.navigate('/tasks');
             
           }}>CREATE TASK</button>
            <br/>
            <br/>
          <div className='task-container'>
            <h1>{props.tasks.name}</h1>
    <div className="task-items">
            {TaskItems}
    </div>
    </div>
    <br/>
    <br/>
    <button onClick={()=>{
             props.navigate('/view-lists')
           }}>View Lists</button>
    </div>)
}
export default ListDetails;