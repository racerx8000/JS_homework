import React, { useState } from "react";
import ColorMenu from "./ColorMenu";
import DropdownTrigger from "./DropdownTrigger";

const completedStyle = {
  fontStyle: "italic",
  color: "#595959",
  opacity: 0.4,
  textDecoration: "line-through"
}

function Task(props) {
  const [editing, setEditing] = useState(false);

  const { id, color, title, completed } = props.todo

  let normalMode = {};
  let editMode = {};

  if (editing) {
    normalMode.display = "none";
  } else {
    editMode.display = "none";
  }

  function enterEditMode() {
    setEditing(true);
  }

  function quitEditMode(ev) {
    if (ev.key === "Enter") {
      setEditing(false);
    }
  }

  return(
    <li
      key={id}
      className="draggable-elem"
      draggable="true"
      onDrag={() => props.drag(id, props.columnName)}
      onDragEnd={() => props.dragEnd(id, props.columnName, props.dropToColumn)}
      >
      <div
        onDoubleClick={enterEditMode}
        style={normalMode}
      >
        <span className="dropdown">
          <DropdownTrigger
            color={color}
          />
          <ColorMenu
            colorList={props.colorList}
            setTodoColor={props.setTodoColor}
            taskId={id}
            columnName={props.columnName}
          />
        </span>
        <input
          type="checkbox"
          onChange={() => props.toggleTaskState(id, props.columnName)}
          defaultChecked={completed ? "checked" : ""}
        />
        <span style={completed ? completedStyle : null}>
          {title}
        </span>
        <button onClick={() => {
          props.delTodo(id, props.columnName)
        }}>
          x
        </button>
      </div>
      <input 
        onChange={(ev) => {
          props.editTodo(id, props.columnName, ev.target.value)
        }}
        type="text"
        onKeyDown={quitEditMode}
        style={editMode}
      />
    </li>
  )
}

export default Task
