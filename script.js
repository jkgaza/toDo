const newTask = document.getElementById('new-task');
const addLi = document.getElementById('tasksS');
const tasksS = document.getElementById('tasksS');
const totalTasks = document.getElementById('total-tasks');
const completedTasks = document.getElementById('completed-tasks');

let totalTaskCount = 0;
let completedTaskCount = 0;

// ADD NEW TASK TO LIST
function addTask() {
    if (newTask.value === '') {
        alert('Add a task first!');
    } else {
        let li = document.createElement('li');
        li.innerHTML = newTask.value;
        addLi.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
        totalTaskCount++; // Increment total tasks count
        updateStatistics();
        saveData();
    }
    newTask.value = '';
}

// CHANGE A TASK TO "CHECKED OFF" -- REMOVE TASK 
addLi.addEventListener(
    'click',
    function (e) {
        if (e.target.tagName === 'LI') {
            e.target.classList.toggle('checked');
            if (e.target.classList.contains('checked')) {
                completedTaskCount++;
            } else {
                completedTaskCount--;
            }
            updateStatistics();
            saveData();
        } else if (e.target.tagName === 'SPAN') {
            e.target.parentElement.remove();
            totalTaskCount--; // Decrement total tasks count
            updateStatistics();
            saveData();
        }
    },
    false
);

// Update the statistics display
function updateStatistics() {
    totalTasks.textContent = totalTaskCount;
    completedTasks.textContent = completedTaskCount;
}

// STORE ALL TASKS LOCALLY, INCLUDING NEW TASKS
function saveData() {
    localStorage.setItem("data", tasksS.innerHTML);
}

// DISPLAY SAVED DATA ON REOPENED APP
function showTask() {
    tasksS.innerHTML = localStorage.getItem("data");
    // Calculate completed tasks from the saved data
    completedTaskCount = document.querySelectorAll('#tasksS .checked').length;
    totalTaskCount = document.querySelectorAll('#tasksS li').length;
    updateStatistics();
}
showTask();
