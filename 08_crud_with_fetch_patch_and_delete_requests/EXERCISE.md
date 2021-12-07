# Phase 1 - Lecture 8 - CRUD with Fetch - PATCH/DELETE requests

## Tasks

- Within the `renderComment` function, add event listeners to handle updating and deleting comments.
- Add functions called `updateComment` and `deleteComment` that both return promises.
    - `updateComment` will accept both its `id` and the commentData (an object with a comment property) as arguments. It sends a PATCH request using the `id` in the url and the comment in the body.
    - `deleteComment` will accept a `commentId` as an argument that will send a DELETE request to delete the comment from the database.
- Within the event handler in `renderComment` for clicking on the delete button, chain on a .then to deleteComment and remove the comment node from the DOM.


## Bonus Task
- Add in a Fetch request to the `deleteTask` function within the `exercise.js` file so that deleting tasks removes data from db.json.