
//import ListItem from '../ListItem/ListItem'
import './AllLists.css'
import {BACKEND_URL,getLists,getTasksInList} from '../../constants/apiEndpoints';
import { useEffect, useState } from 'react';

import makeRequest from '../../utils/backend/makeRequest'
const AllLists=(props)=>{
 // console.log(props)
    const listItems = props.lists.map((eachList) => {
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
      
        </ul>
    </div>
    <button onClick={()=>{
            props.navigate('/add-list')
           }}>Add List</button>
   
    </div>)
}
export default AllLists;