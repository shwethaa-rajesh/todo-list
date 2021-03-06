
//import ListItem from '../ListItem/ListItem'
import './List.css'

import { Outlet, Link } from "react-router-dom";
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
        <h1>All lists</h1>
        <ul>
            {listItems}
            <hr/>
        </ul>
    </div>
    <button onClick={()=>{
             props.setPage('add-list');
            props.navigate('/add-list')
           }}>Add List</button>
   ]
    </div>)
}
export default List;