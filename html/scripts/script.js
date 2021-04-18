document.addEventListener('DOMContentLoaded', () => {
  const taskCompletedBtn = document.querySelector('.task-completed');

  taskCompletedBtn.onclick =  () => {

    let text = document.querySelector('.new-text');
    text.innerHTML = `
      <s>
        ${text}
      </s>
    `
    // text.prepend;
    // text.insertAdjacentHTML('beforeend', '</s>');
  }

})