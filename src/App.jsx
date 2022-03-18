// import './App.css';
// import CreateTask from './components/CreateTask/CreateTask'
// import ListDetails from './components/ListDetails/ListDetails'
// import AllLists from './components/AllLists/AllLists'
// import {Route, Routes} from 'react-router-dom'
// import { Link , useNavigate} from "react-router-dom";
// import {useEffect, useState} from 'react';
// import makeRequest from './utils/backend/makeRequest'
// import {BACKEND_URL,getLists,getTasksInList,} from './constants/apiEndpoints'
// import {getAllLists,addTasksToLists,addNewListDB,addNewTaskDB,updateTaskDB} from './utils/backend/backend.utils'
// import {getItemBasedOnId} from './utils/common/common'
// const INITIAL_DUMMY_LISTS=[{
//   key:1,
//   name:' Todo 1',
//   tasks: [{key:1, title:'Sleep 1',},{key:2, title:'Cry 1'},{key:3, title:'BreakDown 1'}]},{
//   key:2,
//   name:' Todo 2',
//   tasks: [{key:1, title:'Sleep 2',},{key:2, title:'Cry 2'},{key:3, title:'BreakDown 2'}]},{
//   key:3,
//   name:' Todo 3',
//   tasks: [{key:1, title:'Sleep 3',},{key:2, title:'Cry 3'},{key:3, title:'BreakDown 3'}]}
//   ]
  
// function App() {
  
 
//  const [isInitialised, setIsInitialised] = useState(false);
//  const [responseData, setResponseData] = useState(null); 
//  const [listsData, setList] = useState([]);
//       useEffect(()=>{
//         if(!isInitialised)
//         {
//           setIsInitialised(true);
//          let data;
//         getAllLists().then((response)=>{ data =response;  setList(data);
//       //  addTasksToLists(data).then((response)=>{ data =response; console.log('tasks',data); setList(data);})
//       } );
//        // addTasksToLists(data).then((response)=>{ data =response; console.log('response',data); setList(data);} )
//         console.log(data)

//         }
        
//       }, [isInitialised, listsData])
      

//   const navigate=useNavigate();
//   const [taskItems, setTaskItems] = useState(INITIAL_DUMMY_LISTS[0]);
//   const [editTask, setEditTask] = useState('');
//   const [taskFunction,setTaskFunction]=useState('create');

//   const [currentList,setCurrentList]=useState({});

//    const saveNewListData = (newListData,listId) => {
//      addNewTaskDB(newListData,listId).then((response)=>{
//        console.log(response);
//        const newList={
//         name:getItemBasedOnId(listsData,listId).name,
//         key: getItemBasedOnId(listsData,listId).key,
//         tasks: [...taskItems.tasks, response]
//      }
//      const newLists= listsData.map((eachList,index)=>{
//       if(index===listId-1)
//       {
//         return newList;
//       }
//       else
//       {
//         return eachList;
//       }
//    })
//   setTaskItems(newList);
//   setList(newLists);
//   navigate('/lists')

//      })

//    };

//    const addNewList = (newListData,listId) => {
//     console.log(newListData)
//     addNewListDB(newListData).then((response)=>{
//       const updatedList=[...listsData,response];
//       setTaskItems(response);
//       setList(updatedList);
//       navigate('/view-lists')
//     })

//   };


//    const editNewListData=(newTaskData,listId)=>{
//      console.log(getItemBasedOnId(listsData,listId))
//     updateTaskDB(newTaskData).then((response)=>{
//       const updatedList={
//         name: getItemBasedOnId(listsData,listId).name,
//         key: getItemBasedOnId(listsData,listId).id,
//         tasks: taskItems.tasks.map((eachTask,taskIndex)=>{
//           if(eachTask.id===newTaskData.key){
//             return newTaskData;
//           }
//           else
//           {
//             return eachTask;
//           }
//         })
//       }    
//      const updatedLists= listsData.map((eachList,index)=>{
//       if(index===listId-1)
//       {
//         return updatedList;
//       }
//       else
//       {
//         return eachList;
//       }
//    })
//    console.log(updatedLists)
//      setTaskItems(()=>updatedList);
//      setList((prevList)=>updatedLists);
//      setCurrentList(()=>updatedList)
//      setEditTask('')
//      setTaskFunction('create')
//      navigate('/lists');
//     })
   

//    }

//    const onClickEdit=(task,listId)=>{
//     setEditTask(task);
//     console.log(task,listId,'onclickedit')
//     setTaskFunction('edit');

//    navigate('/tasks');
//    // setPage('tasks');
    
//    }
//    const onClickList=(list)=>{
//      console.log(listsData)
//      addTasksToLists(list.key,listsData).then((response)=>{
//        setList(response)
//        setCurrentList(getItemBasedOnId(response,list.key));
//        setTaskItems(getItemBasedOnId(response,list.key));
//       });   

//   //  setCurrentList(list);
//     // setTaskItems(list);

//    navigate('/lists');
//     //setPage('lists')
//    }
//  return(
//     <div className='App'>
// {

  
//       <Routes>
//           <Route path='/view-lists' element={<AllLists lists={listsData} navigate={navigate} onClickList={onClickList} />}></Route>
//           <Route path='/lists' element={<ListDetails tasks={taskItems} navigate={navigate} listId={currentList.key} onClickEdit={onClickEdit} setEditTask={setEditTask}  onCreateList={addNewList}/>}></Route>
//           <Route path='/add-list' element={<CreateTask onCreateList={addNewList} navigate={navigate} label="List"></CreateTask>}></Route>
//           <Route path='/tasks' element={<CreateTask label="Task" onCreateTask={saveNewListData} onEditList={editNewListData}  navigate={navigate} taskFunction={taskFunction} listId={currentList.key} task={editTask}></CreateTask> }></Route>
//           <Route path='*' element={<div>Page not found</div>}></Route>
//       </Routes>
  

  
  
  
// }
    
//   </div>
//  );

// }

// export default App;



import './App.css';
import CreateTask from './components/CreateTask/CreateTask'
import ListDetails from './components/ListDetails/ListDetails'
import AllLists from './components/AllLists/AllLists'
import {Route, Routes} from 'react-router-dom'
import {  useNavigate} from "react-router-dom";
import {useEffect, useState} from 'react';
import {getAllLists,addTasksToLists,addNewListDB,addNewTaskDB,updateTaskDB} from './utils/backend/backend.utils'
import {getItemBasedOnId} from './utils/common/common'
const INITIAL_DUMMY_LISTS=[{
  id:1,
  name:' Todo 1',
  tasks: [{id:1, title:'Sleep 1',},{id:2, title:'Cry 1'},{id:3, title:'BreakDown 1'}]},{
  id:2,
  name:' Todo 2',
  tasks: [{id:1, title:'Sleep 2',},{id:2, title:'Cry 2'},{id:3, title:'BreakDown 2'}]},{
  id:3,
  name:' Todo 3',
  tasks: [{id:1, title:'Sleep 3',},{id:2, title:'Cry 3'},{id:3, title:'BreakDown 3'}]}
  ]
  
function App() {
  
 
 const [isInitialised, setIsInitialised] = useState(false);
 const [listsData, setList] = useState([]);
      useEffect(()=>{
        if(!isInitialised)
        {
          setIsInitialised(true);
         let data;
        getAllLists().then((response)=>{ data =response;  setList(data);
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
     addNewTaskDB(newListData,listId).then((response)=>{
       console.log(response);
       const newList={
        name:getItemBasedOnId(listsData,listId).name,
        id: getItemBasedOnId(listsData,listId).id,
        tasks: [...taskItems.tasks, response]
     }
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

     })

   };

   const addNewList = (newListData,listId) => {
    console.log(newListData)
    addNewListDB(newListData).then((response)=>{
      const updatedList=[...listsData,response];
      setTaskItems(response);
      setList(updatedList);
      navigate('/view-lists')
    })

  };


   const editNewListData=(newTaskData,listId)=>{
     console.log(getItemBasedOnId(listsData,listId))
     console.log(listId,listsData)
    updateTaskDB(newTaskData).then((response)=>{
      const updatedList={
        name: getItemBasedOnId(listsData,listId).name,
        id: getItemBasedOnId(listsData,listId).id,
        tasks: taskItems.tasks.map((eachTask,taskIndex)=>{
          if(eachTask.id===newTaskData.id){
            return newTaskData;
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
   console.log(updatedLists)
     setTaskItems(()=>updatedList);
     setList((prevList)=>updatedLists);
     setCurrentList(()=>updatedList)
     setEditTask('')
     setTaskFunction('create')
     navigate('/lists');
    })
   

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
     addTasksToLists(list.id,listsData).then((response)=>{
       setList(response)
       setCurrentList(getItemBasedOnId(response,list.id));
       setTaskItems(getItemBasedOnId(response,list.id));
      });   

  //  setCurrentList(list);
    // setTaskItems(list);

   navigate('/lists');
    //setPage('lists')
   }
 return(
    <div className='App'>
{

  
      <Routes>
          <Route path='/view-lists' element={<AllLists lists={listsData} navigate={navigate} onClickList={onClickList} />}></Route>
          <Route path='/lists' element={<ListDetails tasks={taskItems} navigate={navigate} listId={currentList.id} onClickEdit={onClickEdit} setEditTask={setEditTask}  onCreateList={addNewList}/>}></Route>
          <Route path='/add-list' element={<CreateTask onCreateList={addNewList} navigate={navigate} label="List"></CreateTask>}></Route>
          <Route path='/tasks' element={<CreateTask label="Task" onCreateTask={saveNewListData} onEditList={editNewListData}  navigate={navigate} taskFunction={taskFunction} listId={currentList.id} task={editTask}></CreateTask> }></Route>
          <Route path='*' element={<div>Page not found</div>}></Route>
      </Routes>
  

  
  
  
}
    
  </div>
 );

}

export default App;
