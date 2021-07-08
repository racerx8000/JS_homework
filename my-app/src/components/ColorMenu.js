import React from "react";

function ColorMenu(props) {
  return (
    <div className="dropdown-content">
      {Object.values(props.colorList).map(color => (
        <p 
          style={{backgroundColor: color}}
          onClick={() => props.setTodoColor(props.taskId, props.columnName, color)}
        />
      ))}
    </div>
  )
}

export default ColorMenu