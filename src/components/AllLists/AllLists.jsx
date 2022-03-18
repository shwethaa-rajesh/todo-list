/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import './AllLists.css';
import React from 'react';
import PropTypes from 'prop-types';

function AllLists({ lists, onClickList, navigate }) {
  const listItems = lists.map((eachList) => (
    <button
      type="button"
      className="list-item"
      onClick={() => {
        onClickList(eachList);
      }}
    >
      {eachList.name}
    </button>
  ));
  return (
    <div className="list">
      <button
        type="button"
        className="add-list"
        onClick={() => {
          navigate('/add-list');
        }}
      >
        CREATE LIST
      </button>
      <br />
      <br />
      <div className="list-container">
        <h1>All lists</h1>
        <div className="list-items">
          {listItems}
        </div>
      </div>
    </div>
  );
}
AllLists.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.shape({
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
  onClickList: PropTypes.func,
  navigate: PropTypes.func,
};
AllLists.defaultProps = {
  lists: [],
  onClickList: () => {},
  navigate: () => {},
};
export default AllLists;
