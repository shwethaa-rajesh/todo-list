
//import ListItem from '../ListItem/ListItem'
import './AllLists.css'
import {BACKEND_URL,getLists,getTasksInList} from '../../constants/apiEndpoints';
import { useEffect, useState } from 'react';

import makeRequest from '../../utils/backend/makeRequest'
const AllLists=(props)=>{
 //console.log(props)
    const listItems = props.lists.map((eachList) => {
       return (
       
          
           <button type="button" className='list-item' onClick={()=>{
             props.onClickList(eachList)
           }}>{eachList.name}</button>
          
     
       
       )
    });
    return(
        <div className='list'>
        <button className="add-list" onClick={()=>{
            props.navigate('/add-list')
           }}>CREATE LIST</button>
            <br/>
            <br/>
    <div className="list-container">
        <h1>All lists</h1>
        <div className='list-items'>
            {listItems}
      
            </div>
    </div>
   
   
    </div>)
}
export default AllLists;