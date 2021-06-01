class Task {
  constructor(id, isCompleted, content) {
    this.id = id;
    this.isCompleted = isCompleted;
    this.content = content;
  }

  render() {
    document.body.innerHTML = `
      <div class="input-form">
        <form action="">
          <input type="text" class="text-input">
          <button class="submit-button" type="button">
          Add task
          </button>
        </form>
      </div>
    `
  }

  create() {
    
  }
  getData() {
    return (this.id, this.isCompleted, this.content);
  }

  setData(value) {
    
  }

}
