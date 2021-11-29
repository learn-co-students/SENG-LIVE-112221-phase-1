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

// 🚧 Task 0: Complete the renderTask() function below by filling in the blanks!

// renderTask accepts a `task` object as an argument with keys for `label`, `dueDate`, and `complete`. It's purpose is to create a list item for a particular task in the todo list.
// Fill in the _____ below with the appropriate code.

function renderTask(task) {
  const li = _____
  li.className = 'flex justify-between';
  li.innerHTML = `
  <span class="task-label">

  </span>
  <span class="due-date">

  </span>
  <span class="completed">
    <i class="far ${task.complete ? 'fa-check-square' : 'fa-square'} text-4xl text-green-300"></i>
  </span>
  `;
  // target the .task-label and .due-date spans 
  const taskLabelEl = _____
  const dueDateEl = _____
  // fill them in with the appropriate content from the task object
  taskLabelEl._____ = _____;
  dueDateEl._____ = _____;
  task.element = li;
  return li;
}

// 🚧 Task 1: Iterate over the tasks in the todoList, render the task and append it to the todoList element in the DOM
function loadTodoList(todoList) {
  const target = getTodoListElement();
  _____
}

loadTodoList(todoList);

// 🚧 Task 2: Render the added task before returning

function addTask(todoList, taskLabel) {
  const newTask = {
    label: taskLabel,
    completed: false
  }
  todoList.push(newTask);
  // Render the newTask to the DOM within the #todoList
  _____
  return newTask
}

// // 👟👟👟 uncomment the lines below to test

// console.log('addTask', addTask(todoList, 'Practice using the filter method'))
// console.log('todoList after addTask', todoList)




// 🚧 Task 3: Remove the task element from the DOM

function removeTask(todoList, taskLabel) {
  const indexToRemove = todoList.findIndex(task => task.label === taskLabel);
  // Remove the task element from the DOM
  _____
  return todoList.splice(indexToRemove, 1)[0];
}

// // 👟👟👟 uncomment the lines below to test

// console.log('addTask', addTask(todoList, 'demo task'));
// console.log('todoList after addTask', todoList);
// window.setTimeout(() => {
//   console.log('removeTask', removeTask(todoList, 'demo task'));
//   console.log('todoList after removeTask', todoList);
// }, 2000)




// BONUS DELIVERABLE
// 🚧 Task 4: Update the element for the task in the DOM

function toggleComplete(todoList, taskLabel) {
  const task = todoList.find(task => task.label === taskLabel)
  task.complete = !task.complete;
  // Update the Task in the DOM to indicate that the task is completed.
  _____
  return task;
}

// // 👟👟👟 uncomment the lines below to test

// window.setTimeout(() => {
//   console.log('toggleComplete', toggleComplete(todoList, 'Learn about Iteration'))
//   console.log('todoList after toggleComplete', todoList)
// }, 3000)