
const button = 'Add task';
const markup = `
  <div class="input-form">
    <form action="">
      <input type="text" class="text-input">
      <button class="submit-button" type="button">
      ${button}
      </button>
    </form>
  </div>
`;

document.body.innerHTML = markup;

// ----------------Javascript begins-----------------------------

const submitBtn = document.querySelector('.submit-button')


let inputText;
let setNewId = 0;
let arrOfId = [];

function getId() {
  arrOfId.push(setNewId);
  setNewId++;
  // return this.id;
}

function appendNewText() {
  const task = document.createElement('div');

  let newText = document.createElement('p');
  
  inputText = document.querySelector('.text-input').value;
  newText.innerHTML = (`
    <button class="task-completed" type="button">
    </button>
    ${inputText}
  `);
  newText.className = 'new-task';
  newText.id = setNewId;
  task.append(newText);
  document.body.append(task);
  document.querySelector('.text-input').value = '';

  getId();
}

function crossedText(clickedId) {
  // () => {
  //   let foundId = arrOfId.find( id => );
  //   newId = foundId;
  // }
  let textOutput = document.getElementById(clickedId);

  textOutput.innerHTML = (`
    <s>
      ${textOutput.textContent}
    </s>
  `)
}

submitBtn.addEventListener('click', () => {
  appendNewText();

  const taskCompletedBtn = document.querySelector('.task-completed');

  taskCompletedBtn.addEventListener ('click', crossedText());
  
  // let task = `
  //   <div>
  //     <p class="new-text">
  //       <button class="task-completed" type="button">
  //       </button>
  //       ${inputText}
  //     </p>
  //   </div>
  // `

  
  // taskCompletedBtn.addEventListener ('click', )
})
