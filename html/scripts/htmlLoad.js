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

let pageContent = {
  todo: [
    { id: uuidv4(), isCompleted: false, isEditing: false, color: undefined, content: 'cook barbeque' },
    { id: uuidv4(), isCompleted: true, isEditing: false, color: undefined, content: 'cook WOK' },
    { id: uuidv4(), isCompleted: false, isEditing: false, color: undefined, content: 'cycling' },
  ],
  inProcess: [],
  done: [],
};

function saveData() {
  const savedData = JSON.stringify(pageContent);
  localStorage.setItem('data', savedData);
  console.log(savedData);
}

function loadData() {
  const data = localStorage.getItem('data')
  if (!data) return render();
  pageContent = JSON.parse(data);
  console.log(data);
  render()
}

function renderTasks(columnName, value) {
  const taskList = value.map(task => `${renderListRow(columnName, task)}`).join('');
  return `
    ${taskList}
  `
}

function renderColumns(columnName, value) {
  return `
    <div class="tasks-container" name="${columnName}" ondrop="drop('${columnName}')" ondragover="allowDrop(event)">
      <h1 class="column-heading">${columnName}</h1>
      ${renderTasks(columnName, value)}
      <div class="input-form">
      <form action="">
        <input type="text" class="text-input">
        <button class="submit-button" type="button" onclick="addTask(event, '${columnName}')">
        Add task
        </button>
      </form>
      </div>    
    </div>
  `;
}

function addTask(event, columnName) {
  const data = event.target.parentElement.querySelector('.text-input').value;
  const setNewData =  { id: uuidv4(), isCompleted: false, isEditing: false, color: undefined, content: data };
  pageContent[columnName].push(setNewData);
  saveData();
  render();
}

function moveTask(selectedElem, selectedElemId, dragFrom, dropTo) {
  const restOFTasks = pageContent[dragFrom].filter(task => task.id !== selectedElemId);

  pageContent[dragFrom] = restOFTasks;
  pageContent[dropTo].push(selectedElem);
  saveData();
}

function drop(columnName) {
  dropTo = columnName;
  moveTask(selectedElem, selectedElemId, dragFrom, dropTo);
  render();
}

function drag(id, columnName) {
  dragFrom = columnName;
  selectedElem = pageContent[dragFrom].find(task => task.id === id)
  selectedElemId = id;
}

function allowDrop(allowDropEvent) {
  allowDropEvent.preventDefault();
}

function changeColor(id, newClr, columnName) {
  const savedColor = pageContent[columnName].map(task => {
    if (id === task.id) {
      return {...task, color: newClr};
    }
    return task;
  });
  pageContent[columnName] = savedColor;
  saveData();
  render();
}

function deleteTask(id, columnName) {
  const restOfTasks = pageContent[columnName].filter(task => task.id !== id);
  pageContent[columnName] = restOfTasks;
  saveData();
  render();
}

function editTask(id, columnName) {
  const editedTask = pageContent[columnName].map(task => {
    if (id === task.id) return {...task, isEditing: true};
    return task;
  });
  pageContent[columnName] = editedTask;
  saveData();
  render();
}

function formOnBlur(id, columnName) {
  const rejectEditing = pageContent[columnName].map(task => {
    if (id === task.id) return {...task, isEditing: false};
    return task;
  });
  pageContent[columnName] = rejectEditing;
  saveData();
  render();
}

function saveEditedTask(id, columnName) {
  const editedContent = document.querySelector('.text-edit').value;
  const saveContent = pageContent[columnName].map(task => {
    if (id === task.id) return {...task, isEditing: false, content: editedContent};
    return task;
  });
  pageContent[columnName] = saveContent;
  saveData();
  render();
}

function editableRow(task, columnName) {
  const {id, content, isCompleted, isEditing} = task
  if (isEditing) return `
    <input  onblur="formOnBlur('${id}', '${columnName}')" type="text" class="text-edit" value="${content}">
    <button onclick="saveEditedTask('${id}', '${columnName}')" class="save-button" type="button">💾</button>
  `;

  return isCompleted ? `<s>${content}</s>` : `<span onclick="editTask('${id}', '${columnName}')">${content}</span>`;
}

function renderListRow(columnName, task) {
  const { id, isCompleted, color } = task;
  const { red, green, blue, purple, black } = colors;
  return `
    <li class="draggable-elem" id="${id}" draggable="true" ondrag="drag('${id}', '${columnName}')">
      <span class="dropdown">
        <button class="dropbtn" style="background-color:${color}"></button>
        <div class="dropdown-content">
          <p onclick="changeColor('${id}','${red}','${columnName}')"  style="background-color:${red}"></p>
          <p onclick="changeColor('${id}','${green}','${columnName}')" style="background-color:${green}"></p>
          <p onclick="changeColor('${id}','${blue}','${columnName}')" style="background-color:${blue}"></p>
          <p onclick="changeColor('${id}','${purple}','${columnName}')" style="background-color:${purple}"></p>
          <p onclick="changeColor('${id}','${black}','${columnName}')" style="background-color:${black}"></p>
        </div>
      </span>
      <input onclick="changeState('${id}', '${columnName}')" class="task-state" type="checkbox" ${isCompleted ? 'checked' : ''}>
      ${editableRow(task, columnName)}
      <button onclick="deleteTask('${id}', '${columnName}')" type="button">
        X
      </button>
    </li>
  `;
}

function renderList() {
  return Object.entries(pageContent).map(([columnName, value]) => renderColumns(columnName, value)).join('');
}

function changeState(id, columnName) {
  const newState = pageContent[columnName].map(task => {
    if (id === task.id) return { ...task, isCompleted: !task.isCompleted };
    return task;
  });
  pageContent[columnName] = newState;
  saveData();
  render();
}

function setListeners() {
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
  `;

  setListeners();
}
