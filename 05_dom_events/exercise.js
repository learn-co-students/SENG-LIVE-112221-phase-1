const _____ = 'MAKE SURE TO FILL ME IN!!!';
const todoList = [
  {
    label: 'Learn about JS Data Types',
    complete: true,
    dueDate: new Date('2021-11-22')
  },
  {
    label: 'Learn about Iteration',
    complete: false,
    dueDate: new Date('2021-11-24')
  },
]

function getTodoListElement() {
  return document.querySelector('#todoList')
}

function renderTask(task) {
  const li = task.element || document.createElement('li');
  li.className = 'flex justify-between';
  li.innerHTML = `
  <span class="task-label">

  </span>
  <span class="due-date">

  </span>
  <span class="completed">
    
  </span>
  `;
  // target the .task-label and .due-date spans 
  const taskLabelEl = li.querySelector('.task-label');
  const dueDateEl = li.querySelector('.due-date');
  const completedEl = li.querySelector('.completed');
  // fill them in with the appropriate content from the task object
  taskLabelEl.textContent = task.label;
  dueDateEl.textContent = task.dueDate;
  completedEl.innerHTML = `<i class="far ${task.complete ? 'fa-check-square' : 'fa-square'} text-4xl text-green-300 cursor-pointer"></i>`;
  completedEl.addEventListener('click', (e) => {
    toggleComplete(task);
  })
  task.element = li;
  return li;
}

function loadTodoList(todoList) {
  const target = getTodoListElement();
  todoList.forEach(task => {
    target.append(renderTask(task))
  })
}

loadTodoList(todoList);

function addTask(todoList, taskLabel, dueDate) {
  const newTask = {
    label: taskLabel,
    dueDate: dueDate,
    completed: false
  }
  todoList.push(newTask);
  // Render the newTask to the DOM within the #todoList
  const target = getTodoListElement();
  target.append(renderTask(newTask))
  return newTask
}

function removeTask(todoList, taskLabel) {
  const indexToRemove = todoList.findIndex(task => task.label === taskLabel);
  // Remove the task element from the DOM
  todoList[indexToRemove].element.remove();
  return todoList.splice(indexToRemove, 1)[0];
}

function toggleComplete(task) {
  task.complete = !task.complete;
  // Update the Task in the DOM to indicate that the task is completed.
  renderTask(task);
  return task;
}

document.addEventListener('DOMContentLoaded', (e) => {
  document.querySelector('#newTask').addEventListener('submit', (e) => {
    e.preventDefault();
    const taskLabel = document.getElementById('labelInput').value || e.target.labelInput.value;
    const dueDate = document.getElementById('dueDateInput').value || e.target.labelInput.value;
    addTask(todoList, taskLabel, new Date(dueDate))
    e.target.reset()
  })
})