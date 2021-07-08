import React from "react";
import ColumnHeader from "./ColumnHeader";
import Task from "./Task";
import TaskInput from "./TaskInput";

function TaskColumn(props) {

  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  return (
    <div
      className="tasks-container"
      onDrop={() => props.drop(props.column)}
      onDragOver={allowDrop}
    >
      <ColumnHeader columnName={props.column} />
      <ul>
        {props.tasks.map(todo => (
          <Task
            columnName={props.column}
            todo={todo}
            colorList={props.colorList}
            delTodo={props.delTodo}
            editTodo={props.editTodo}
            setTodoColor={props.setTodoColor}
            toggleTaskState={props.toggleTaskState}
            drag={props.drag}
            dragEnd={props.dragEnd}
            dropToColumn={props.dropToColumn}
          />
        ))}
      </ul>
      <TaskInput
        addTodo={props.addTodo}
        column={props.column}
      />
    </div>
  )
};

export default TaskColumn
