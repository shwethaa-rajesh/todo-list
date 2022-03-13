
//import ListItem from '../ListItem/ListItem'
import './List.css'
//import {useState} from 'react'
const List=(props)=>{
    const listItems = props.lists.map((eachList) => {
      //  console.log(eachList)
       return (
       <div className='list-item'>
           <li>
           <h4>{eachList.name}</h4>
           <button onClick={()=>{
             props.onClickList(eachList)
           }}>View</button>
           </li>
       </div>
       )
    });
    return(
        <div className='list'>
    <div className="task-container">
        <ul>
            {listItems}
            <hr/>
        </ul>
    </div>
    <button onClick={()=>{
             props.setPage('add-list')
           }}>Add List</button>
    </div>)
}
export default List;