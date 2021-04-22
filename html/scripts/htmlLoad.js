// ----------------Javascript begins-----------------------------

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

// let inputText;
// let setNewId = 0;
let tasks = [
  { id: uuidv4(), isCompleted: false, isEditing: false, content: 'cook barbeque' },
  { id: uuidv4(), isCompleted: true, isEditing: false, content: 'cook WOK' },
  { id: uuidv4(), isCompleted: false, isEditing: false, content: 'cycling' },
];

function deleteTask(id) {
  tasks = tasks.map(task => {
    if (id === task.id) return null;
    return task;
  }).filter(Boolean);

  render();
}

function editTask(id) {
  tasks = tasks.map(task => {
    if (id === task.id) return {...task, isEditing: true};
    return task;
  }).filter(Boolean);
  
  render();
}

function formOnBlur(id) {
  tasks = tasks.map(task => {
    if (id === task.id) return {...task, isEditing: false};
    return task;
  })

  render();
}

function saveEditedTask(id) {
  const editedContent = document.querySelector('.text-edit').value;
  tasks = tasks.map(task => {
    if (id === task.id) return {...task, isEditing: false, content: editedContent};
    return task;
  })

  render();
}

function editableRow({id, content, isCompleted, isEditing}) {
  if (isEditing) return `<input onblur="formOnBlur('${id}')" type="text" class="text-edit" value="${content}">
  <button onclick="saveEditedTask('${id}')" class="save-button" type="button">💾</button>`;
  
  return `${isCompleted === true ? `<s>${content}</s>` : `<span onclick="editTask('${id}')">${content}</span>`}`
}


function renderListRow(task) {
  const { id, isCompleted } = task;
  return `
    <li>
      <input onclick="changeState('${id}')" class="task-state" type="checkbox" ${isCompleted === true ? 'checked' : ''}>
      ${editableRow(task)}
      <button onclick="deleteTask('${id}')" type="button">
      X
      </button>
    </li>
  `
}

function renderList() {
  const todo = tasks.map(task => `${renderListRow(task)}`).join('');

  return `
    <ul>
      ${todo}
    </ul>
  `
}

function changeState(id) {
  tasks = tasks.map(task => {
    if (id === task.id) return { ...task, isCompleted: !task.isCompleted }
    return task;
  });

  render();
}

function setListeners() {
  document.querySelector('.submit-button').addEventListener('click', () => {
    const data = document.querySelector('.text-input').value;

    tasks = [...tasks, {id: uuidv4(), isCompleted: false, isEditing: false, content: data}];

    render();
  });

  // const taskStates = document.querySelectorAll('.task-state');
  // taskStates.forEach(task => {
  //   task.addEventListener('click', (e) => {

  // })
  
}

function render() {
  document.body.innerHTML = `
  <div class="input-form">
    <form action="">
      <input type="text" class="text-input">
      <button class="submit-button" type="button">
      Add task
      </button>
    </form>
  </div>
  <div class="tasks-container">
    ${renderList()} 
  </div>
  `;

  setListeners()
}

render()
