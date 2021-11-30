# Phase 1 Lecture 4 - DOM Events

## Key Concepts

- Use a form to add elements to the DOM
- Use submit event handlers
- Use click event handlers 

## Tasks for Music Library

- Adding a submit event handler to allow adding songs to the Playlist
- Adding a click event handler to allow loading songs into the player.
  
## Tasks for Todo List

- Adding a submit event handler to allow adding tasks to the todoList
- Adding a click event handler to allow toggling a task's completeness

## Three Pillars

- Recognize Events
- Manipulate the DOM
- Communicate with the Server

## Music Library API

- `playlist`
  - array of song objects with `name`, `artist`, `duration`, `playCount` and `youtubeLink`
- `formatDuration(duration)`
  - takes a `duration` integer as an argument and returns a string formatted version
- `formattedDurationToSeconds(formattedDuration)`
  - takes a string formatted duration as an argument and returns a `duration` integer in seconds.
- `copy(obj)`
  - takes an object as an argument and returns a deep copy of it.
- `getPlaylistElement()`
  - return the playlist element where songs will be added to the sidebar.
- `getSongNameElement()`
  - return the element where the name of the song in the player will be displayed.
- `getArtistElement()`
  - return the element where the artist of the song in the player will be displayed.
- `getPlayCountElement()`
  - return the element where the play count for the song in the player will be displayed.
- `getPlayerElement()`
  - return the element where the video player will be rendered.
- `renderSong(song)`
  - takes a song object as an argument and returns an `li` element for display within the sidebar. This method also stores the `li` as an `element` property within the `song` object for later use.
- `loadPlaylistToSidebar()`
  - takes the contents of the `playlist` variable and renders all of the songs as `li` elements, appending them to the playlist `ul` element in the sidebar.
- `addSongToPlaylist(playlist, song)`
  - takes the playlist and a song as arguments. It adds the song to the playlist, passes it to `renderSong` and appends the returned `li` to the playlist `ul` element in the sidebar`.
- `removeSongFromPlaylist(playlist, youtubeLink)`
  - takes the `playlist` and a `youtubeLink` as arguments and finds the `song` within the `playlist` that matches the `youtubeLink`, removes it from the `playlist` and removing its `li` element from the DOM.
- `extractVideoID(url)`
  - helper method that takes a youtube url from a user and extracts the YouTube VideoID.
- `loadSongIntoPlayer(song)`
  - takes a song as an argument and loads its details into the player.
- `songsByArtist(playlist, artist)`
  - takes the `playlist` and an `artist` as arguments, populates the playlist in the sidebar with all songs whose artist matches the `artist` argument.

### Today's Changes

- `handleNewSongSubmit(event)`
  - we'll need to prevent the default behavior.
  - we'll then need to attach an event listener to the newSong form.
  - when the form is submitted, we'll pull the form data out of the form, use it to build a new `song` object and pass it to `addSongToPlaylist`.
- `handleChooseSong(song)`
  - we'll need to attach an event listener to each list item in the sidebar.
  - when one of them is clicked, we'll invoke `loadSongIntoPlayer` and pass in the appropriate `song` as an argument.

## Todo List API

- `todoList`
  - array of task objects with `label`, `complete`, and `dueDate` properties.
- `getTodoListElement()`
  - returns the `todoList` element where tasks will be added.
- `renderTask(task)`
  - takes a `task` object as an argument and returns an `li` element for displaying the task. This method also stores the `li` as an `element` property within the `task` object for later use.
- `loadTodoList(todoList)`
  - takes the `todoList` as an argument, renders all of the tasks as `li` elements, appending them to the `todoList`.
- `addTask(todoList, taskLabel, dueDate)`
  - takes the `todoList`, `taskLabel` and `dueDate` as arguments. It uses the `taskLabel` and `dueDate` to create a new task, add it to the `todoList` and append it to the `todoList` container.
- `removeTask(todoList, taskLabel)`
  - takes the `todoList` and the `taskLabel` as arguments, finds the task that matches the `taskLabel`, removes it from the `todoList` and removes its `li` element from the DOM.
- `toggleComplete(task)`
  - takes the `task` as an argument, toggles its `complete` property and invokes `renderTask` again to update the DOM.

### Today's Changes

- `handleNewTaskSubmit(event)`
  - we'll need to prevent the default behavior.
  - we'll then need to attach an event listener to the newTask form.
  - when the form is submitted, we'll pull the data out of the form, and pass it to `addTask` function.
- `handleToggleComplete(task)`
  - we'll need to attach an event listener to each box in the todo list.
  - when one of them is clicked, we'll invoke `toggleComplete` and pass in the appropriate `task` as an argument.