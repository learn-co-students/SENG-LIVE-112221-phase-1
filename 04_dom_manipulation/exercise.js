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
  const li = task.element || document.createElement('li')
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
  const taskLabelEl = li.querySelector('.task-label');
  const dueDateEl = li.querySelector('.due-date')
  // fill them in with the appropriate content from the task object
  taskLabelEl.textContent = task.label;
  dueDateEl.textContent = task.dueDate;
  task.element = li;
  return li;
}

// 🚧 Task 1: Iterate over the tasks in the todoList, render the task and append it to the todoList element in the DOM
function loadTodoList(todoList) {
  const target = getTodoListElement();
  todoList.forEach(task => {
    target.append(renderTask(task))
  })
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
  const target = getTodoListElement();
  target.append(renderTask(newTask))
  return newTask
}

// // 👟👟👟 uncomment the lines below to test

console.log('addTask', addTask(todoList, 'Practice using the filter method'))
console.log('todoList after addTask', todoList)




// 🚧 Task 3: Remove the task element from the DOM

function removeTask(todoList, taskLabel) {
  const indexToRemove = todoList.findIndex(task => task.label === taskLabel);
  // Remove the task element from the DOM
  todoList[indexToRemove].element.remove();
  // the indexToRemove indicates where in the todoList the task that should be removed appears
  // we use bracket notation to access the task object, but before we remove the task from the array
  // we want to remove the element that represents it from the DOM, so we use dot notation to access
  // the DOM element and then .remove() to detach it from the DOM tree (removing it from the HTML doc)
  return todoList.splice(indexToRemove, 1)[0];
}

// // 👟👟👟 uncomment the lines below to test

console.log('addTask', addTask(todoList, 'demo task'));
console.log('todoList after addTask', todoList);
window.setTimeout(() => {
  console.log('removeTask', removeTask(todoList, 'demo task'));
  console.log('todoList after removeTask', todoList);
}, 2000)




// BONUS DELIVERABLE
// 🚧 Task 4: Update the element for the task in the DOM

function toggleComplete(todoList, taskLabel) {
  const task = todoList.find(task => task.label === taskLabel)
  task.complete = !task.complete;
  // Update the Task in the DOM to indicate that the task is completed.
  
  // There are 2 alternatives here: 
  //  // 1. update the DOM manually by targeting the checkbox inside of task.element
  //  // 2. update the DOM by invoking renderTask again (requires a small change to renderTask to work properly)

  // // approach 1:
  // const completedSpan = task.element.querySelector('.complete');
  // completedSpan.innerHTML = `<i class="far ${task.complete ? 'fa-check-square' : 'fa-square'} text-4xl text-green-300"></i>`;

  // // approach 2:
  renderTask(task);

  // // the above requires that we change the top line in renderTask from:
  // // const li = document.createElement('li')
  // // to: const li = task.element || document.createElement('li')
  // // so that if we call renderTask again with the same task object as an argument
  // // it will update the existing li element rather than creating another one
  // // allowing us to update the existing DOM element with new values by invoking
  // // the method again (this is more similar to the way React works under the hood)
  return task;
}

// // 👟👟👟 uncomment the lines below to test

window.setTimeout(() => {
  console.log('toggleComplete', toggleComplete(todoList, 'Learn about Iteration'))
  console.log('todoList after toggleComplete', todoList)
}, 3000)