/* eslint-disable react/prop-types */
import React from 'react';

const mockList = {
  title: 'abcd',
};
const currentTask = mockList;
const onTaskTitleChange = (event) => {
  currentTask.title = event.value;
};
function Button({ onClick, buttonText }) {
  return (
    <>
      <input
        value={currentTask.title}
        onChange={onTaskTitleChange}
        data-testid="testId-taskTitleTextInput"
      />
      <button type="button" onClick={onClick}>{buttonText}</button>

    </>
  );
}

export default Button;
