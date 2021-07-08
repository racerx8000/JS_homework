import React from "react"
import styles from "./TodoItem.module.css"

const completedStyle = {
  fontStyle: "italic",
  color: "#595959",
  opacity: 0.4,
  textDecoration: "line-through"  
}

class TodoItem extends React.Component {
  state = {
    editing: false,
  }
  
  enterEditMode = () => {
    this.setState({
      editing: true,
    })
  };

  exitEditMode = (event) => {
    if (event.key === "Enter") {
      this.setState({
        editing: false,
      })
    }
  }

  componentWillUnmount() {
    
  }

  render() {
    let viewMode = {};
    let editMode = {};

    if (this.state.editing) {
      viewMode.display = "none"
    } else {
      editMode.display = "none"
    }

    const { id, title, completed} = this.props.todo

    return ( 
      <li className={styles.item}>
        <div style={viewMode}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={completed}
            onChange={() => this.props.handleChangeProps(id)}  
          /> 
          <button onClick={() => this.props.deleteTodoProps(id)}>
            Delete
          </button>
          <span 
            style={completed ? completedStyle : null}
            onDoubleClick={this.enterEditMode}
          >
            {title}
          </span>
        </div>
        <input
          type="text"
          style={editMode}
          className={styles.textInput}
          onChange={(e) => {
            this.props.editTodoProps(id, e.target.value)
          }}
          onKeyDown={this.exitEditMode}/>
      </li>
    )
  }
}

export default TodoItem
