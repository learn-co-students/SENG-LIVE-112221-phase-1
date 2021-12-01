let todoList
// 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
// Task 1: add an event listener for DOMContentLoaded that will `fetch` the tasks from the json-server (`http://localhost:3000/tasks`)
//  - store the resulting data in `todoList`
//  - invoke `loadTodoList`, passing `todoList` as an argument




function loadTodoList(todoList) {
  const target = getTodoListElement();
  todoList.forEach(task => {
    target.append(renderTask(task))
  })
}

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
  const taskLabelEl = li.querySelector('.task-label');
  const dueDateEl = li.querySelector('.due-date');
  const completedEl = li.querySelector('.completed');
  
  // 🚧 Task 2: add Event Listener to toggle the completed status here
  completedEl.addEventListener('click', (event) => {
    toggleComplete(task);
  })

  taskLabelEl.textContent = task.label;
  dueDateEl.textContent = task.dueDate;
  completedEl.innerHTML = `<i class="far ${task.complete ? 'fa-check-square' : 'fa-square'} text-4xl text-green-300 cursor-pointer"></i>`;
  task.element = li;
  return li;
}



function addTask(taskLabel, dueDate) {
  const newTask = {
    label: taskLabel,
    dueDate: dueDate,
    completed: false
  }
  // 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
  // BONUS Task 2: Add fetch request to persist the newTask to the json-server before adding it to the todoList and the DOM
  // 
  // move the lines below inside of the promise callback so that you update the todoList and the DOM after the `newTask` is added to db.json via fetch.
  // You want to make sure that the newly added task has an id as that will be important later on.
  todoList.push(newTask);
  const target = getTodoListElement();
  target.append(renderTask(newTask))
  return newTask
}

function removeTask(todoList, taskLabel) {
  const indexToRemove = todoList.findIndex(task => task.label === taskLabel);
  todoList[indexToRemove].element.remove();
  return todoList.splice(indexToRemove, 1)[0];
}

function toggleComplete(task) {
  task.complete = !task.complete;
  // 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
  // BONUS Task 3: send a fetch request to update the task in json-server so that the complete status will be persisted to db.json
  renderTask(task);
  return task;
}

function handleNewTaskSubmit(event) {
  event.preventDefault();
  const label = event.target.labelInput.value;
  const dueDate = new Date(event.target.dueDateInput.value);
  addTask(todoList, label, dueDate);
  event.target.reset();
}

document.querySelector('form#newTask').addEventListener('submit', handleNewTaskSubmit)
