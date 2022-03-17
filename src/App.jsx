import './App.css';
import CreateTask from './components/CreateTask/CreateTask'
import ListDetails from './components/ListDetails/ListDetails'
import AllLists from './components/AllLists/AllLists'
import {Route, Routes} from 'react-router-dom'
import { Link , useNavigate} from "react-router-dom";
import {useEffect, useState} from 'react';
import makeRequest from './utils/backend/makeRequest'
import {BACKEND_URL,getLists,getTasksInList,} from './constants/apiEndpoints'
import {getAllLists,addTasksToLists,addNewListDB} from './utils/backend/backend.utils'
import {getItemBasedOnId} from './utils/common/common'
const INITIAL_DUMMY_LISTS=[{
  key:1,
  name:' Todo 1',
  tasks: [{key:1, title:'Sleep 1',},{key:2, title:'Cry 1'},{key:3, title:'BreakDown 1'}]},{
  key:2,
  name:' Todo 2',
  tasks: [{key:1, title:'Sleep 2',},{key:2, title:'Cry 2'},{key:3, title:'BreakDown 2'}]},{
  key:3,
  name:' Todo 3',
  tasks: [{key:1, title:'Sleep 3',},{key:2, title:'Cry 3'},{key:3, title:'BreakDown 3'}]}
  ]
  
function App() {
  
 
 const [isInitialised, setIsInitialised] = useState(false);
 const [responseData, setResponseData] = useState(null); 
 const [listsData, setList] = useState([]);
      useEffect(()=>{
        if(!isInitialised)
        {
          setIsInitialised(true);
         let data;
        getAllLists().then((response)=>{ data =response; console.log('response',data); setList(data);
      //  addTasksToLists(data).then((response)=>{ data =response; console.log('tasks',data); setList(data);})
      } );
       // addTasksToLists(data).then((response)=>{ data =response; console.log('response',data); setList(data);} )
        console.log(data)

        }
        
      }, [isInitialised, listsData])
      

  const navigate=useNavigate();
  const [taskItems, setTaskItems] = useState(INITIAL_DUMMY_LISTS[0]);
  const [editTask, setEditTask] = useState('');
  const [taskFunction,setTaskFunction]=useState('create');

  const [currentList,setCurrentList]=useState({});

   const saveNewListData = (newListData,listId) => {
     const newTaskData = {...newListData};
     newTaskData.key = getItemBasedOnId(listsData,listId).tasks.length+1;
     console.log("New ",newTaskData);
     const newList={
        name:getItemBasedOnId(listsData,listId).name,
        key: getItemBasedOnId(listsData,listId).key,
        tasks: [...taskItems.tasks, newTaskData]
     }
     console.log('New list ', newList)
     const newLists= listsData.map((eachList,index)=>{
        if(index===listId-1)
        {
          return newList;
        }
        else
        {
          return eachList;
        }
     })
    setTaskItems(newList);
    setList(newLists);
    navigate('/lists')
    //setPage('lists');
    //console.log(newLists);
   };

   const addNewList = (newListData,listId) => {
    console.log(newListData)
    addNewListDB(newListData).then((response)=>{
      const updatedList=[...listsData,response];
      setTaskItems(response);
      setList(updatedList);
      navigate('/view-lists')
    })
  //   newList.key = listsData.length+1;
  //   console.log("New ",newList);
  //   const updatedList=[...listsData,newList]
  //   console.log('New list ', newList)
  //  setTaskItems(newList);
  //  setList(updatedList);
  //  <Link to='view-lists'></Link>
  //  navigate('/view-lists');
  // setPage('view-lists');
   //console.log(newLists);
  };


   const editNewListData=(newListData,listId)=>{
     const updatedList={
       name: listsData[listId-1].name,
       key: listsData[listId-1].key,
       tasks: taskItems.tasks.map((eachTask,taskIndex)=>{
         if(taskIndex+1===newListData.key){
           return newListData;
         }
         else
         {
           return eachTask;
         }
       })
     }
     const updatedLists= listsData.map((eachList,index)=>{
      if(index===listId-1)
      {
        return updatedList;
      }
      else
      {
        return eachList;
      }
   })
   console.log(updatedLists, "updated list")
     setTaskItems(updatedList);
     console.log(taskItems);
     setList((prevList)=>updatedLists);
     setCurrentList(updatedList)
     setEditTask('')
     setTaskFunction('create')
     console.log(listsData,'after edit');
    //  console.log(taskItems,'after edit');
    //  console.log(currentList,'after edit');
   //   console.log(editTask,'after edit');
 

   navigate('/lists');
    // setPage('lists');
   }

   const onClickEdit=(task,listId)=>{
    setEditTask(task);
    console.log(task,listId,'onclickedit')
    setTaskFunction('edit');

   navigate('/tasks');
   // setPage('tasks');
    
   }
   const onClickList=(list)=>{
     console.log(listsData)
     addTasksToLists(list.key,listsData).then((response)=>{
       setList(response)
       setCurrentList(getItemBasedOnId(response,list.key));
       setTaskItems(getItemBasedOnId(response,list.key));
      });   

  //  setCurrentList(list);
    // setTaskItems(list);

   navigate('/lists');
    //setPage('lists')
   }
 return(
    <div className='app-container'>
{

  
      <Routes>
          <Route path='/view-lists' element={<AllLists lists={listsData} navigate={navigate} onClickList={onClickList} />}></Route>
          <Route path='/lists' element={<ListDetails tasks={taskItems} navigate={navigate} listId={currentList.key} onClickEdit={onClickEdit} setEditTask={setEditTask}  onCreateList={addNewList}/>}></Route>
          <Route path='/add-list' element={<CreateTask onCreateList={addNewList} navigate={navigate} label="List"></CreateTask>}></Route>
          <Route path='/tasks' element={<CreateTask label="Task" onCreateTask={saveNewListData} onEditList={editNewListData}  navigate={navigate} taskFunction={taskFunction} listId={currentList.key} task={editTask}></CreateTask> }></Route>
          <Route path='*' element={<div>Page not found</div>}></Route>
      </Routes>
  

  
  
  
}
    
  </div>
 );

}

export default App;
