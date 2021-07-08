import React, { useState }from "react";

function TaskInput(props) {
  const [textInput, setTextInput] = useState("");

  function onChange(e) {
    setTextInput(e.target.value)
  }
  
  function onSubmit(e) {
    e.preventDefault();
    if (textInput.trim()) {
      props.addTodo(props.column, textInput);
      setTextInput("")
    } else {
      alert("Please write item");
    }
  }

  return(
    <div className="input-form">
      <form onSubmit={onSubmit}>
        <input type="text"
          className="text-input"
          value={textInput}
          onChange={onChange}
        />
        <button className="submit-button">
          Add task
        </button>
      </form>
    </div>
  )
}

export default TaskInput