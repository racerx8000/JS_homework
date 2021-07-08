import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskColumn from "./TaskColumn";

const colors = {
  red: '#f00e1a',
  green: '#16f50f',
  blue: '#0f41f5',
  purple: '#9c57e6',
  black: '#000000',
};

function ColumnContainer() {
  const [todos, setTodos] = useState(getInitialTodos());

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp)
  }, [todos])

  const [colorList] = useState(colors);
  const [draggedTask, setDraggedTask] = useState({});
  const [dragFromColumn, setDragFromColumn] = useState([]);
  const [dropToColumn, setDropToColumn] = useState([]);

  function getInitialTodos() {
    const temp = localStorage.getItem("todos");
    const savedTodos = JSON.parse(temp);
    const initialContent = {
      todo: [],
      inProcess: [],
      done: [],
    };
    if (savedTodos) {
      return savedTodos;
    } else {
      return initialContent;      
    }
  }  

  function addTodo(columnName, title) {
    const newTodo = todos[columnName].concat({
      id: uuidv4(),
      color: "white",
      title: title,
      completed: false
    })

    setTodos({ ...todos, [columnName]: newTodo })
  }

  function delTodo(id, columnName) {
    const restOfTasks = todos[columnName].filter(task => task.id !== id);

    setTodos({...todos, [columnName]: restOfTasks})
  }

  function editTodo(id, columnName, newTitle) {
    const editedTask = todos[columnName].map(task => {
      if (task.id === id) return { ...task, title: newTitle };
      return task;
    })

    setTodos({ ...todos, [columnName]: editedTask })
  }

  function toggleTaskState(id, columnName) {
    const newState = todos[columnName].map(task => {
      if (task.id === id) return { ...task, completed: !task.completed };
      return task;
    })

    setTodos({ ...todos, [columnName]: newState })
  }

  function setTodoColor(id, columnName, newColor) {
    const setColor = todos[columnName].map(task => {
      if (task.id === id) return { ...task, color: newColor };
      return task;
    })
    setTodos({ ...todos, [columnName]: setColor })
  }
  
  function drag(id, dragFrom) {
    const draggedItem = todos[dragFrom].find(task => {
      return task.id === id;
    })

    setDraggedTask(draggedItem);
    setDragFromColumn(dragFrom);
  }

  function drop(dropTo) {
    const draggedItem = todos[dropTo].concat(draggedTask);
    if (dropTo !== dragFromColumn) {
      setTodos({ ...todos, [dropTo]: draggedItem });
      setDragFromColumn([]);
    }
    
    setDropToColumn(dropTo);
    setDraggedTask({});
  }

  function dragEnd(id, dragFrom, dropTo) {
    const restOfTasks = todos[dragFrom].filter(task => {
      return task.id !== id;
    });
    if (dragFrom !== dropTo) {
      setTodos({ ...todos, [dragFrom]: restOfTasks });
    }
  }

  return(
    <div className="task-column-wrapper">
      {Object.entries(todos).map(([column, tasks]) => (
        <TaskColumn
          column={column}
          tasks={tasks}
          colorList={colorList}
          addTodo={addTodo}
          delTodo={delTodo}
          editTodo={editTodo}
          setTodoColor={setTodoColor}
          toggleTaskState={toggleTaskState}
          drop={drop}
          dropToColumn={dropToColumn}
          drag={drag}
          dragEnd={dragEnd}
        />
      ))}
    </div>
  );
}

export default ColumnContainer;