import React from "react"

class InputTodo extends React.Component {
  state = {
    title: ""
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.title.trim()) {
      this.props.addTodoProps(this.state.title);
      this.setState({
        title: "",
      });
    } else {
      alert("Please write item")
    }
  };

  onChange = (e) => {
    this.setState({
      title: e.target.value
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-container">
        <input
          type="text"
          className="input-text"
          placeholder="Add Todo..."
          value={this.state.title}
          onChange={this.onChange}
        />
        <button className="input-submit">
          Submit
        </button>
      </form>
    )
  }
}

export default InputTodo
