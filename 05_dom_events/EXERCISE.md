# Phase 1 - Lecture 5 - DOM Events

## Tasks
- `handleNewTaskSubmit(event)`
  - we'll need to prevent the default behavior.
  - we'll then need to attach an event listener to the newTask form.
  - when the form is submitted, we'll pull the data out of the form, and pass it to `addTask` function.
- `handleToggleComplete(task)`
  - we'll need to attach an event listener to each box in the todo list.
  - when one of them is clicked, we'll invoke `toggleComplete` and pass in the appropriate `task` as an argument.