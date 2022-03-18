import { useNavigate } from 'react-router-dom';
import './ListDetails.css'
const ListDetails=(props)=>{
    const navigate=useNavigate()
      const onClickEdit=(task,listId)=>{
        props.setEditTask(task);
        console.log(task,listId,'onclickedit')
        props.setTaskFunction('edit');
    
       navigate('/tasks');
       }
    const TaskItems = props.tasks.tasks.map((eachTask) => {
       return (
        <button type="button" className='task-item' onClick={()=>{
           onClickEdit(eachTask,props.listId)
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