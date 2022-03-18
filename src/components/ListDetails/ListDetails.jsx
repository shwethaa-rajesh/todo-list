/* eslint-disable no-shadow */
import { useNavigate } from 'react-router-dom';
import './ListDetails.css';
import React from 'react';

import PropTypes from 'prop-types';

function ListDetails(
  {
    setEditTask, setTaskFunction, tasks, listId,
  },
) {
  const navigate = useNavigate();
  const onClickEdit = (task, listId) => {
    setEditTask(task);
    console.log(task, listId, 'onclickedit');
    setTaskFunction('edit');

    navigate('/tasks');
  };

  const TaskItems = tasks.tasks.map((eachTask) => (
    <button
      type="button"
      className="task-item"
      onClick={() => {
        onClickEdit(eachTask, listId);
      }}
    >

      {eachTask.title}
    </button>
  ));
  return (
    <div className="list">
      <button
        type="button"
        className="add-task"
        onClick={() => {
          setEditTask('');
          navigate('/tasks');
          // navigate('/tasks');
        }}
      >
        CREATE TASK
      </button>
      <br />
      <br />
      <div className="task-container">
        <h1>{tasks.name}</h1>
        <div className="task-items">
          {TaskItems}
        </div>
      </div>
      <br />
      <br />
      <button
        type="button"
        onClick={() => {
          navigate('/view-lists');
        }}
      >
        View Lists
      </button>
    </div>
  );
}
ListDetails.propTypes = {
  setEditTask: PropTypes.func,
  setTaskFunction: PropTypes.func,
  tasks: PropTypes.shape({
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
  listId: PropTypes.number,
};
ListDetails.defaultProps = {
  setEditTask: () => {},
  setTaskFunction: () => {},
  tasks: {},
  listId: 1,
};
export default ListDetails;
