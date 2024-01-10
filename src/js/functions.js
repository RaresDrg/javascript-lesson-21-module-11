import { saveTask, loadTasks, updateTask, deleteTask } from './api.js';

const myInput = document.getElementById('myInput');
const myUL = document.getElementById('myUL');
let currentId = 1;

function addNewTask() {
  const inputValue = myInput.value.trim();

  if (inputValue === '') {
    alert('You must write something!');
    return;
  }

  createLI(inputValue);
  myInput.value = '';
  addTaskToDB(inputValue);
}

function createLI(text, isDone = false, id = currentId) {
  const liEL = document.createElement('LI');
  myUL.appendChild(liEL);

  liEL.textContent = text;
  liEL.dataset.id = id;

  if (isDone) {
    liEL.className = 'checked';
  }

  addCloseButton(liEL);
}

function addCloseButton(li) {
  const span = document.createElement('SPAN');
  li.appendChild(span);

  span.textContent = '\u00D7';
  span.className = 'close';
}

function addTaskToDB(text, isDone = false) {
  const newTask = { text, isDone };
  // const newTask = {text: text, isDone: isDone};
  saveTask(newTask);
  currentId += 1;
}

function handleTaskBehaviour({ target }) {
  if (target.tagName === 'LI') {
    target.classList.toggle('checked');

    const taskId = target.dataset.id;
    const taskStatus = target.classList.contains('checked');
    updateTask(taskId, taskStatus);
  }

  if (target.tagName === 'SPAN') {
    target.parentNode.remove();

    const taskId = target.parentNode.dataset.id;
    deleteTask(taskId);
  }
}

function fillTasksList() {
  loadTasks()
    .then(todos => {
      todos.forEach(({ text, isDone, id }) => createLI(text, isDone, id));
      console.log(todos);
      return todos;
    })
    .then(todos => {
      currentId =
        todos.length === 0 ? 1 : Number(todos[todos.length - 1].id) + 1;
    });
}

export { addNewTask, handleTaskBehaviour, fillTasksList };
