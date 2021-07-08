import React, { useState, useEffect } from "react"
import styles from "./TodoItem.module.css"

const completedStyle = {
  fontStyle: "italic",
  color: "#595959",
  opacity: 0.4,
  textDecoration: "line-through"  
}

const TodoItem = props => {
  const [editing ,setEditing] = useState(false)

  const enterEditMode = () => {
    setEditing(true)
  };

  const exitEditMode = (event) => {
    if (event.key === "Enter") {
      setEditing(false)
    }
  };

  useEffect(() => {
    return () => {
      console.log("Cleaning up...")
    }
  }, []) 

  let viewMode = {};
  let editMode = {};

  if (editing) {
    viewMode.display = "none"
  } else {
    editMode.display = "none"
  }

  const { id, title, completed} = props.todo

  return ( 
    <li className={styles.item}>
      <div style={viewMode} onDoubleClick={enterEditMode}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={completed}
          onChange={() => props.handleChangeProps(id)}  
        /> 
        <button onClick={() => props.deleteTodoProps(id)}>
          Delete
        </button>
        <span 
          style={completed ? completedStyle : null}
        >
          {title}
        </span>
      </div>
      <input
        type="text"
        style={editMode}
        className={styles.textInput}
        onChange={(e) => {
          props.setUpdate(e.target.value, id)
        }}
        onKeyDown={exitEditMode}/>
    </li>
  )
}

export default TodoItem
