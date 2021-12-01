# Phase 1 - Lecture 6 - Asynchronous JavaScript and Fetch

## Tasks

1. add an event listener for DOMContentLoaded that will `fetch` the tasks from the json-server (`http://localhost:3000/tasks`)
  - store the resulting data in `todoList`
  - invoke `loadTodoList`, passing `todoList` as an argument
2. BONUS! add a fetch request inside of `addTask` that will persist the newTask to the json-server (by posting to `http://localhost:3000/tasks`) and updating the `todoList` and DOM after getting the response from the server. If you add a task and refresh the page it should still appear in the HTML.
3. BONUS: add a fetch request to toggleComplete so that the change to the task's complete status is persisted to db.json and will be accessible after a page refresh.

