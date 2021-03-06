import logo from './logo.svg';
import './App.css';
import CreateTask from './components/CreateTask/CreateTask'
import Tasks from './components/Tasks/Tasks'
import {useState} from 'react';
const INITIAL_DUMMY_LISTS=[{
  key:1,
  name:'Immediate Todo',
  tasks: [{key:1, title:'Sleep',},{key:2, title:'Cry'},{key:3, title:'BreakDown'}]},{
  key:2,
  name:'Immediate Todo 2',
  tasks: [{key:1, title:'Sleep',},{key:2, title:'Cry'},{key:3, title:'BreakDown'}]},{
  key:2,
  name:'Immediate Todo 3',
  tasks: [{key:1, title:'Sleep',},{key:2, title:'Cry'},{key:3, title:'BreakDown'}]}
  ]
  
function App() {
  const [taskItems, setTaskItems] = useState(INITIAL_DUMMY_LISTS[0]);
  const [currentPage, setPage] = useState('lists');
  const [editTask, setEditTask] = useState('');
  const [taskFunction,setTaskFunction]=useState('create');
   const saveNewListData = (newListData) => {
     const newTaskData = {...newListData};
     newTaskData.key = taskItems.tasks.length+1;
     console.log("New ",newTaskData);
     const newLists={
        name:taskItems.name,
        tasks: [...taskItems.tasks, newTaskData]

     }
    setTaskItems(newLists);
    setPage('lists')
    console.log(newLists);
   };
   const editNewListData=(newListData)=>{

     const updatedList={
       name: taskItems.name,
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
     setTaskItems(updatedList);
     setPage('lists');
   }

   const onClickEdit=(task)=>{
    setEditTask(task);
    setTaskFunction('edit');
    setPage('tasks');
    
   }
  return (
   <div className='app-container'>
     <h1>fy</h1>
     {
       <Tasks tasks={taskItems} onClickEdit={onClickEdit} setPage={setPage}/>

     }
    

   </div>
  );
}

export default App;
