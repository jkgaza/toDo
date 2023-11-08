const newTask = document.getElementById('new-task');
const addLi = document.getElementById('tasksS');
const tasksS = document.getElementById('tasksS');

// ADD NEW TASK TO LIST
function addTask() {
  if (newTask.value === '') {
    alert('You must write something!');
  } else {
    let li = document.createElement('li');
    li.innerHTML = newTask.value;
    addLi.appendChild(li);
    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.appendChild(span);
    saveData(); // Call saveData to save the new task
  }
  newTask.value = '';
}

// CHANGE A TASK TO "CHECKED OFF" -- REMOVE TASK
addLi.addEventListener(
  'click',
  function (e) {
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle('checked');
      saveData();
    } else if (e.target.tagName === 'SPAN') {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

// STORE ALL TASKS LOCALLY, INCLUDING NEW TASKS
function saveData() {
  localStorage.setItem('data', tasksS.innerHTML);
}

// DISPLAY SAVED DATA ON REOPENED APP
function showTask() {
  tasksS.innerHTML = localStorage.getItem('data');
}
showTask();
