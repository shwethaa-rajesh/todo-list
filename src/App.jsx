import './App.css';
import CreateTask from './components/CreateTask/CreateTask'
import CreateList from './components/CreateList/CreateList'
import Tasks from './components/Tasks/Tasks'
import List from './components/List/List'
import {useState} from 'react';
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
  const [listsData, setList] = useState(INITIAL_DUMMY_LISTS);
  const [taskItems, setTaskItems] = useState(INITIAL_DUMMY_LISTS[0]);
  const [currentPage, setPage] = useState('view-lists');
  const [editTask, setEditTask] = useState('');
  const [taskFunction,setTaskFunction]=useState('create');

  const [currentList,setCurrentList]=useState();

   const saveNewListData = (newListData,listId) => {
     console.log('Task items',taskItems)
     console.log('new list data',newListData)
     console.log('all lists',listsData);
     console.log('current list',currentList)
     const newTaskData = {...newListData};
     newTaskData.key = listsData[listId-1].tasks.length+1;
     console.log("New ",newTaskData);
     const newList={
        name:listsData[listId-1].name,
        key: listsData[listId-1].key,
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
    setPage('lists');
    //console.log(newLists);
   };

   const addNewList = (newListData,listId) => {
    // console.log('Task items',taskItems)
    // console.log('new list data',newListData)
    // console.log('all lists',listsData);
    // console.log('current list',currentList)
    const newList = {...newListData};
    newList.key = listsData.length+1;
    console.log("New ",newList);
    const updatedList=[...listsData,newList]
    console.log('New list ', newList)
   setTaskItems(newList);
   setList(updatedList);
   setPage('view-lists');
   //console.log(newLists);
  };


   const editNewListData=(newListData,listId)=>{
      console.log(listsData,'before edit');
   //   console.log(taskItems,'before edit');
     // console.log(currentList,'before edit');
      //console.log(editTask,'before edit');
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
     setList((prevList)=>{
       return prevList.map((eachList,index)=>{
        if(index===listId-1)
        {
          return updatedList;
        }
        else
        {
          return eachList;
        }
     })
     });
     setEditTask('')
     setTaskFunction('create')
     console.log(listsData,'after edit');
    //  console.log(taskItems,'after edit');
    //  console.log(currentList,'after edit');
   //   console.log(editTask,'after edit');
     setPage('lists');
   }

   const onClickEdit=(task,listId)=>{
    setEditTask(task);
    console.log(task,listId,'onclickedit')
    setTaskFunction('edit');
    setPage('tasks');
    
   }
   const onClickList=(list)=>{
     console.log(listsData)
    setCurrentList(list);
    setTaskItems(list);

    setPage('lists')
   }
   /*
  return (
   <div className='app-container'>
     
     {
       (currentPage==='lists')? <Tasks tasks={taskItems} onClickEdit={onClickEdit} setPage={setPage}/>:<CreateTask onCreateList={saveNewListData} onEditList={editNewListData} taskFunction={taskFunction}  task={editTask}></CreateTask>

     }
    

   </div>
  );
  */
 return(
    <div className='app-container'>
{
  // (currentPage==='view-lists')? <List lists={listsData} onClickList={onClickList} setPage={setPage}/>
  // : ((currentPage==='lists')? <Tasks tasks={taskItems} listId={currentList.key} onClickEdit={onClickEdit} setEditTask={setEditTask} setPage={setPage} onCreateList={addNewList}/>
  // : <CreateTask onCreateTask={saveNewListData} onEditList={editNewListData} taskFunction={taskFunction} listId={currentList.key} task={editTask}></CreateTask> )
  
  (currentPage==='view-lists')? <List lists={listsData} onClickList={onClickList} setPage={setPage}/>
  : ((currentPage==='lists')? <Tasks tasks={taskItems} listId={currentList.key} onClickEdit={onClickEdit} setEditTask={setEditTask} setPage={setPage} onCreateList={addNewList}/>
  :( (currentPage==='add-list')?<CreateTask onCreateList={addNewList} label="List"></CreateTask>:<CreateTask label="Task" onCreateTask={saveNewListData} onEditList={editNewListData} taskFunction={taskFunction} listId={currentList.key} task={editTask}></CreateTask> )
  )
  
  
  
}
    
  </div>
 );

}

export default App;
