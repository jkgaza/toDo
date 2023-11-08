const newTask = document.getElementById('new-task');
const addLi = document.getElementById('tasksS');
const tasksS = document.getElementById('tasksS');
const totalTasks = document.getElementById('total-tasks');
const completedTasks = document.getElementById('completed-tasks');
const pieChartCanvas = document.getElementById('pie-chart').getContext('2d');

let totalTaskCount = 0;
let completedTaskCount = 0;
let pieChart; // Declare a variable to hold the pie chart instance

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
    updateStatsAndChart();
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
      updateStatsAndChart();
      updateStatistics();
      saveData();
    } else if (e.target.tagName === 'SPAN') {
      e.target.parentElement.remove();
      totalTaskCount--; // Decrement total tasks count
      updateStatsAndChart();
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

// Function to create and update the pie chart
function updatePieChart() {
  // Calculate the percentage of completed tasks
  const completedPercentage = (completedTaskCount / totalTaskCount) * 100;

  // Create the pie chart data
  const data = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [completedPercentage, 100 - completedPercentage],
        backgroundColor: ['#D99C28', '#146065'],
      },
    ],
  };

  // Check if the pie chart already exists and destroy it to avoid conflicts
  if (pieChart) {
    pieChart.destroy();
  }

  // Create the pie chart
  pieChart = new Chart(pieChartCanvas, {
    type: 'doughnut', // You can change the chart type as needed
    data: data,
    options: {
      responsive: false, // Adjust this as needed for responsiveness
    },
  });
}

// Update the statistics display
function updateStatistics() {
  totalTasks.textContent = totalTaskCount;
  completedTasks.textContent = completedTaskCount;
}

function updateStatsAndChart() {
  updateStatistics(); // Update the statistics
  updatePieChart(); // Update the pie chart
}

// STORE ALL TASKS LOCALLY, INCLUDING NEW TASKS
function saveData() {
  localStorage.setItem('data', tasksS.innerHTML);
}

// DISPLAY SAVED DATA ON REOPENED APP
function showTask() {
  tasksS.innerHTML = localStorage.getItem('data');
  // Calculate completed tasks from the saved data
  completedTaskCount = document.querySelectorAll('#tasksS .checked').length;
  totalTaskCount = document.querySelectorAll('#tasksS li').length;
  updateStatistics();
}
showTask();
updatePieChart(); // Call updatePieChart to initialize the pie chart
