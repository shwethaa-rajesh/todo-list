/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Create.css';
import PropTypes from 'prop-types';
import { addNewListDB, addNewTaskDB, updateTaskDB } from '../../utils/backend/backend.utils';
import { getItemBasedOnId } from '../../utils/common/common';

// { listsData, taskItems, setTaskItems, setList, setCurrentList, setEditTask,
// setTaskFunction, taskFunction, task,label ,listId}
function Create(
  {
    listsData, taskItems, setTaskItems, setList, setCurrentList, setEditTask, setTaskFunction,
    taskFunction, task, label, listId, navigate,
  },
) {
  const onCreateTask = (newListData, listId) => {
    addNewTaskDB(newListData, listId).then((response) => {
      console.log(response);
      const newList = {
        name: getItemBasedOnId(listsData, listId).name,
        id: getItemBasedOnId(listsData, listId).id,
        tasks: [...taskItems.tasks, response],
      };
      const newLists = listsData.map((eachList, index) => {
        if (index === listId - 1) {
          return newList;
        }

        return eachList;
      });
      setTaskItems(newList);
      setList(newLists);
      navigate('/lists');
    });
  };
  const onCreateList = (newListData, listId) => {
    console.log(newListData);
    addNewListDB(newListData).then((response) => {
      const updatedList = [...listsData, response];
      setTaskItems(response);
      setList(updatedList);

      navigate('/view-lists');
    });
  };

  const onEditList = (newTaskData, listId) => {
    console.log(getItemBasedOnId(listsData, listId));
    console.log(listId, listsData);
    console.log(newTaskData);
    updateTaskDB(newTaskData).then((response) => {
      const updatedList = {
        name: getItemBasedOnId(listsData, listId).name,
        id: getItemBasedOnId(listsData, listId).id,
        tasks: taskItems.tasks.map((eachTask, taskIndex) => {
          if (eachTask.id === newTaskData.id) {
            return newTaskData;
          }

          return eachTask;
        }),
      };
      const updatedLists = listsData.map((eachList, index) => {
        if (index === listId - 1) {
          return updatedList;
        }

        return eachList;
      });
      console.log(updatedLists);
      setTaskItems(() => updatedList);
      setList((prevList) => updatedLists);
      setCurrentList(() => updatedList);
      setEditTask('');
      setTaskFunction('create');
      navigate('/lists');
    });
  };
  let selectedTitle;
  if (taskFunction === 'edit') {
    //   console.log(props)
    selectedTitle = task.title;
  } else {
    selectedTitle = '';
  }
  const [enteredTask, setEnteredTask] = useState(selectedTitle);

  const submitHandler = (event) => {
    if (label === 'List') {
      event.preventDefault();
      const newList = {
        name: enteredTask,
        tasks: [],
      };
      onCreateList(newList);
      setEnteredTask('');
    } else {
      event.preventDefault();
      const newTask = {
        title: enteredTask,
      };
      if (taskFunction === 'edit') {
        // console.log(props);
        newTask.id = task.id;
        console.log(newTask);
        onEditList(newTask, listId);
      } else {
        onCreateTask(newTask, listId);
        setEnteredTask('');
      }
    }
  };

  const taskChangeHandler = (event) => {
    setEnteredTask(event.target.value);
  };
  return (
    <div className="create-task">
      <h1>
        Create
        <span>{label}</span>
      </h1>

      <form onSubmit={submitHandler}>
        <div>
          <input
            value={enteredTask}
            onChange={taskChangeHandler}
            type="text"
            data-testid="testId-listNameTextInput"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
Create.propTypes = {
  listsData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      listId: PropTypes.number,
    })),
  })),
  taskItems: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      listId: PropTypes.number,
    })),
  }),
  setTaskItems: PropTypes.func,
  setList: PropTypes.func,
  setCurrentList: PropTypes.func,
  setEditTask: PropTypes.func,
  setTaskFunction: PropTypes.func,
  taskFunction: PropTypes.string,
  task: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    listId: PropTypes.number,
  }),
  label: PropTypes.string,
  listId: PropTypes.number,
  navigate: PropTypes.func,
};
Create.defaultProps = {
  listsData: [],
  taskItems: {},
  setTaskItems: () => {},
  setList: () => {},
  setCurrentList: () => {},
  setEditTask: () => {},
  setTaskFunction: () => {},
  taskFunction: 'create',
  task: {},
  label: 'Task',
  listId: 1,
  navigate: () => {},
};
export default Create;
