/* eslint-disable no-unused-vars */
import makeRequest from './makeRequest';
import {
  getLists, getTasksInList, addList, addTask, updateTask,
} from '../../constants/apiEndpoints';

const getAllLists = async () => {
  let listsDB = await makeRequest(getLists());

  listsDB = listsDB.map((eachList) => ({
    id: eachList.id,
    name: eachList.name,
    tasks: [],

  }));
  console.log(listsDB);
  return listsDB;
};
const addNewListDB = async (newList) => {
  console.log(newList);
  const updatedList = await makeRequest(addList({ lists: newList.name }));
  console.log(updatedList);
  updatedList.tasks = [];
  return updatedList;
};

const addNewTaskDB = async (newTask, listId) => {
  console.log(newTask);
  const updatedTask = await makeRequest(addTask(listId, { task: newTask.title }));
  console.log(updatedTask);
  // delete updatedTask['createdAt'];
  // delete updatedTask['updatedAt'];
  // delete updatedTask['list_id'];
  // delete updatedTask['listId'];
  // Object.defineProperty(updatedTask, 'id', Object.getOwnPropertyDescriptor(updatedTask, 'id'));
  // delete updatedTask['id'];
  console.log('new task', updateTask);
  return updatedTask;
};
const updateTaskDB = async (newTask) => {
  const taskId = newTask.id;
  console.log(taskId, newTask.title, 'id title');
  const updatedTask = await makeRequest(updateTask(taskId, { task: newTask.title }));
  return newTask;
};
const addTasksToLists = async (listId, lists) => {
  const tasks = await makeRequest(getTasksInList(listId));
  const data = await lists.map((eachList) => {
    if (eachList.id === listId) {
      return {
        id: eachList.id,
        name: eachList.name,
        tasks,
      };
    }

    return eachList;
  });
  // console.log(data);
  return data;
};

const getTasks = async (listId) => {
  let tasks = await makeRequest(getTasksInList(listId));
  tasks = tasks.map((eachTask) => ({
    id: eachTask.id,
    title: eachTask.title,
  }));
  return tasks;
};
// console.log(getAllLists())
export {
  getAllLists, getTasks, addTasksToLists, addNewListDB, addNewTaskDB, updateTaskDB,
};
