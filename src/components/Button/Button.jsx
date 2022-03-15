
import React from "react";
const mockList={
    title:'abcd'
};
let currentTask=mockList;
const onTaskTitleChange=(event)=>{
    currentTask.title=event.value;
}
const Button = ({ onClick, buttonText }) => (
    <>
    <input value={currentTask.title}
        onChange={onTaskTitleChange}
        data-testid="testId-taskTitleTextInput">

    </input>
  <button onClick={onClick}>{buttonText}</button>

  </>
);

export default Button;