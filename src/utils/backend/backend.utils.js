import makeRequest from './makeRequest';
import {BACKEND_URL,getLists,getTasksInList,addList,addTask} from '../../constants/apiEndpoints'
const getAllLists= async()=>{
    let listsDB= await makeRequest(getLists());

    listsDB= listsDB.map( (eachList)=>{

        return {
            key:eachList.id,
            name: eachList.name,
            tasks:[]
           
        }
    })
    return listsDB;
}
const addNewListDB=async(newList)=>{
    console.log(newList)
    let updatedList= await makeRequest(addList({lists:newList.name}));
    console.log(updatedList);
    updatedList.tasks=[];
    Object.defineProperty(updatedList, 'key', Object.getOwnPropertyDescriptor(updatedList, 'id'));
    delete updatedList['id'];                
    return updatedList;
}
const addTasksToLists=async(listId,lists)=>{
    let tasks=  await makeRequest(getTasksInList(listId));
    const data=  await lists.map( (eachList)=>{
        if(eachList.key===listId)
        {
            return{
                key:eachList.key,
                name: eachList.name,
                tasks:tasks
            }
            
        }
        else
        {
            return eachList;
        }

    })
    console.log(data);
    return data
}

const getTasks= async(listId)=>{
    let tasks= await makeRequest(getTasksInList(listId));
    tasks=tasks.map((eachTask)=>{
        return {
            key: eachTask.id,
            title: eachTask.title
        }
    })
    return tasks;
}
//console.log(getAllLists())
export {getAllLists, getTasks,addTasksToLists,addNewListDB};

