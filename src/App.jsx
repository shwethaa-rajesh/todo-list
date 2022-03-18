import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import CreateTask from './components/CreateTask/CreateTask';
import ListDetails from './components/ListDetails/ListDetails';
import AllLists from './components/AllLists/AllLists';
import { getAllLists, addTasksToLists } from './utils/backend/backend.utils';
import { getItemBasedOnId } from './utils/common/common';

const INITIAL_DUMMY_LISTS = [{
  id: 1,
  name: ' ',
  tasks: [],
}, {
  id: 2,
  name: ' ',
  tasks: [],
}, {
  id: 3,
  name: '',
  tasks: [],
},
];

function App() {
  const [isInitialised, setIsInitialised] = useState(false);
  const [listsData, setList] = useState([]);
  useEffect(() => {
    if (!isInitialised) {
      setIsInitialised(true);
      let data;
      getAllLists().then((response) => {
        data = response; setList(data);
      });
      console.log(data);
    }
  }, [isInitialised, listsData]);
  const navigate = useNavigate();
  const [taskItems, setTaskItems] = useState(INITIAL_DUMMY_LISTS[0]);
  const [editTask, setEditTask] = useState('');
  const [taskFunction, setTaskFunction] = useState('create');
  const [currentList, setCurrentList] = useState({});
  const onClickList = (list) => {
    console.log(listsData);
    console.log(list);
    addTasksToLists(list.id, listsData).then((response) => {
      setList(response);
      setCurrentList(getItemBasedOnId(response, list.id));
      setTaskItems(getItemBasedOnId(response, list.id));
    });
    navigate('/lists');
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/view-lists" element={<AllLists lists={listsData} navigate={navigate} onClickList={onClickList} setList={setList} setCurrentList={setCurrentList} setTaskItems={setTaskItems} />} />
        <Route path="/lists" element={<ListDetails tasks={taskItems} navigate={navigate} listId={currentList.id} setEditTask={setEditTask} setTaskFunction={setTaskFunction} />} />
        <Route path="/add-list" element={<CreateTask navigate={navigate} label="List" listsData={listsData} setList={setList} taskItems={taskItems} setTaskItems={setTaskItems} />} />
        <Route path="/tasks" element={<CreateTask label="Task" listsData={listsData} setList={setList} taskItems={taskItems} setTaskItems={setTaskItems} setTaskFunction={setTaskFunction} setCurrentList={setCurrentList} setEditTask={setEditTask} taskFunction={taskFunction} listId={currentList.id} task={editTask} />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>

    </div>
  );
}

export default App;
