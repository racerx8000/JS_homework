// ----------------Javascript begins-----------------------------

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
const colors = {
  red: '#f00e1a',
  green: '#16f50f',
  blue: '#0f41f5',
  purple: '#9c57e6',
  black: '#000000',
};

Object.freeze(colors);

let tasks = [
  { id: uuidv4(), isCompleted: false, isEditing: false, color: undefined, content: 'cook barbeque' },
  { id: uuidv4(), isCompleted: true, isEditing: false, color: undefined, content: 'cook WOK' },
  { id: uuidv4(), isCompleted: false, isEditing: false, color: undefined, content: 'cycling' },
];

const pageContent = {
  todo: tasks,
  inProcess: [],
  done: [],
};

function renderTasks(value) {
  const taskList = value.map(task => `${renderListRow(task)}`).join('');
  return `
    ${taskList}
  `
}

function renderColumns(key, value) {
  return `
  <div class="tasks-container" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h1 class="column-heading">${key}</h1>
    ${renderTasks(value)}
  </div>
  `;
}

function drop(dropEvent) {
  dropEvent.target.append(selectedElement);
}

function drag(dragStartEvent) {
  selectedElement = dragStartEvent.target;
}

function allowDrop(allowDropEvent) {
  allowDropEvent.preventDefault();
}

function changeColor(id, newClr) {
  tasks = tasks.map(task => {
    if (id === task.id) {
      return {...task, color: newClr};
    }
    return task;
  });

  render();
}

function deleteTask(id) {
  tasks = tasks.filter(task => {
    if (id === task.id) return null;
    return task;
  });

  render();
}

function editTask(id) {
  tasks = tasks.map(task => {
    if (id === task.id) return {...task, isEditing: true};
    return task;
  });
  
  render();
} 



function formOnBlur(id) {
  tasks = tasks.map(task => {
    if (id === task.id) return {...task, isEditing: false};
    return task;
  });

  render();
}

function saveEditedTask(id) {
  const editedContent = document.querySelector('.text-edit').value;
  tasks = tasks.map(task => {
    if (id === task.id) return {...task, isEditing: false, content: editedContent};
    return task;
  });

  render();
}

function editableRow({id, content, isCompleted, isEditing}) {
  if (isEditing) return `
    <input  onblur="formOnBlur('${id}')" type="text" class="text-edit" value="${content}">
    <button onclick="saveEditedTask('${id}')" class="save-button" type="button">💾</button>
  `;

  return isCompleted ? `<s>${content}</s>` : `<span onclick="editTask('${id}')">${content}</span>`;
}

function renderListRow(task) {
  const { id, isCompleted, color } = task;
  const { red, green, blue, purple, black } = colors;
  return `
    <li class="draggable-elem" id="${id}" draggable="true" ondrag="drag(event)">
      <span class="dropdown">
        <button class="dropbtn" style="background-color:${color}"></button>
        <div class="dropdown-content">
          <p onclick="changeColor('${id}','${red}')"  style="background-color:${red}"></p>
          <p onclick="changeColor('${id}','${green}')" style="background-color:${green}"></p>
          <p onclick="changeColor('${id}','${blue}')" style="background-color:${blue}"></p>
          <p onclick="changeColor('${id}','${purple}')" style="background-color:${purple}"></p>
          <p onclick="changeColor('${id}','${black}')" style="background-color:${black}"></p>
        </div>
      </span>
      <input onclick="changeState('${id}')" class="task-state" type="checkbox" ${isCompleted ? 'checked' : ''}>
      ${editableRow(task)}
      <button onclick="deleteTask('${id}')" type="button">
        X
      </button>
    </li>
  `;
}

function renderList() {
  for (let [key, task] of Object.entries(pageContent)) {
    return renderColumns(key, task);
  }
}

function changeState(id) {
  tasks = tasks.map(task => {
    if (id === task.id) return { ...task, isCompleted: !task.isCompleted };
    return task;
  });

  render();
}

function setListeners() {
  document.querySelector('.submit-button').addEventListener('click', () => {
    const data = document.querySelector('.text-input').value;

    tasks = [...tasks, {id: uuidv4(), isCompleted: false, isEditing: false, color: undefined, content: data}];

    render();
  });

  const saveButton = document.querySelector('.save-button');
  if (saveButton) {
    saveButton.addEventListener('mousedown', (event) => {
      event.preventDefault();
    });
  }
}

function render() {
  document.body.innerHTML = `
  <div class="task-row-wrapper">
      ${renderList()}
  </div>
  <div class="input-form">
  <form action="">
    <input type="text" class="text-input">
    <button class="submit-button" type="button">
    Add task
    </button>
  </form>
  </div>
  `;

  setListeners();
}

render();
