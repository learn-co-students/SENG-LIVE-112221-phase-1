# Phase 1 Lecture 6 - Asynchronous Javascript and Fetch

## Agenda
- Discuss Asynchronous functions in JS
- Discuss Promises and the event queue
- Fetch and .then()
- Add fetching songs to the Music Library App
- Break
- Add fetching songs to TodoList App
- Solution Review

## Async callbacks (from [MDN article](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing))
Async callbacks are functions that are specified as arguments when calling a function which will start executing code in the background. When the background code finishes running, the callback function will be invoked to let you know the work is done, or to let you know that something of interest has happened. 

Using callbacks is slightly old-fashioned now, but you'll still see them used in a number of older-but-still-commonly-used APIs.

An example of an async callback is the second parameter of the `addEventListener()` method (as we saw in action above):

```js
btn.addEventListener('click', () => {
  alert('You clicked me!');

  let pElem = document.createElement('p');
  pElem.textContent = 'This is a newly-added paragraph.';
  document.body.appendChild(pElem);
});
```

- first parameter is the type of event to be listened for
- second parameter is a callback function that is invoked when the event is fired.
- When we pass a callback function as an argument to another function, we are only passing the function's reference as an argument.
- The function is "called back" to within the enclosing function body, hence the name.
- If the callback function is not executed immediately when its enclosing function is invoked, we refer to it as an asynchronous (or async) callback. 

## Not all Callbacks are Async

Note that not all callbacks are async — some run synchronously. An example is when we use [Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) to loop through the items in an array:

```js
const gods = ['Apollo', 'Artemis', 'Ares', 'Zeus'];
console.log('before forEach')
gods.forEach(function (eachName, index){
  console.log(index + '. ' + eachName);
});
console.log('after forEach')
```

In this example we loop through an array of Greek gods and print the index numbers and values to the console. The expected parameter of forEach() is a callback function, which itself takes two parameters, a reference to the array name and index values. However, it doesn't wait for anything — it runs immediately.

## Promises

Promises are the new style of async code that you'll see used in modern Web APIs. A good example is the [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/fetch) API, which is basically like a modern, more efficient version of [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) (which you may still see in legacy code). Let's look at a quick example,

```js
console.log('before fetch')
fetch("https://api.tvmaze.com/singlesearch/shows?q=friends")
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (json) {
    console.log(json);
  });
console.log('after fetch')
```


- Here we see `fetch()` taking a single parameter — the URL of a resource you want to fetch from the network — and returning a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) for a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object. 
- The promise is an object representing the evental completion or failure of the async operation. 
- The promise is the browser's way of saying "I promise to get back to you with the answer as soon as I can," hence the name "promise."

Neither of the possible outcomes have happened yet, so the fetch operation is currently waiting on the result of the browser trying to complete the operation at some point in the future. We've then got three further code blocks chained onto the end of the fetch():

- Two `then()` blocks. **Both contain a callback function that will run if the previous operation is successful (a fulfilled promise), and each callback receives as input the result (return value) of the previous successful operation**, so you can go forward and do something else to it. Each `.then()` block returns another promise, meaning that you can chain multiple `.then()` blocks onto each other, so multiple asynchronous operations can be made to run in order, one after another.
- The `catch()` block at the end runs if any of the `.then()` blocks fail, receiving the error that caused the problem as an argument.
- 💡💡💡 **IMPORTANT NOTE**: In the case of `fetch`, if we get a response back from the server we sent the request to, that's considered a fulfilled promise. 
    - This means that even if we get an error response from our API, it's still considered a resolved promise as fetch was able to successfully retrieve a response (even though the response represented an error)
    - We can get around this by checking if `response.ok` and throwing an error that we can catch if not.

```js
console.log('before fetch')
fetch("https://api.tvmaze.com/shows/1389478917389479827389474")
  .then(function (response) {
    console.log(response);
    if(!response.ok) {
        throw new Error('something went wrong')
    }
    return response.json();
  })
  .then(function (json) {
    console.log(json);
  })
  .catch(function(error) {
      console.log(error)
  })
console.log('after fetch')
```
- 🤓🤓🤓 BONUS NOTE— in a similar way to synchronous [`try...catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) blocks, an error object is made available inside the `catch()`, which can be used to report the kind of error that has occurred. Note however that synchronous `try...catch` won't work with promises, although it will work with the [async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) syntax that you may wish to learn later on.

## The Event Queue

Async operations like promises are put into an **event queue**, which runs after the main thread has finished processing so that they *do not block* subsequent JavaScript code from running. The queued operations will complete as soon as possible then return their results to the JavaScript environment.

## Summary

In its most basic form, JavaScript is a synchronous, blocking, single-threaded language, in which only one operation can be in progress at a time. But web browsers define functions and APIs (like `setTimeout`, `addEventListener`, and `fetch`) that allow us to register functions that should not be executed synchronously, and should instead be invoked asynchronously when some kind of event occurs (the passage of time, the user's interaction with the mouse, or the arrival of data over the network, for example). This means that you can let your code tell the browser to do several things at the same time without stopping or blocking your main thread.

Whether we want to run code synchronously or asynchronously will depend on what we're trying to do.

There are times when we want things to load and happen right away. For example when applying some user-defined styles to a webpage you'll want the styles to be applied as soon as possible.

If we're running an operation that takes time however, like querying a database and using the results to populate templates, it is better to push this off the stack and complete the task asynchronously. Over time, you'll learn when it makes more sense to choose an asynchronous technique over a synchronous one.

## Key Takeaways

### Order of Operations

Sync code runs before Async code.

One of the most important things to take away from this conversation is that asynchronous callbacks will always execute after surrounding synchronous code.
```js
window.setTimeout(() => console.log('async'), 0);
for(let i = 0 ; i < 10000 ; i++) {
    console.log('sync');
}
```

### Promises

If a promise is fulfilled, we can attach an async callback that will receive the resolved value via `.then()`. If the promise is rejected, the error can be captured and handled via `.catch()`

Both `.then()` and `.catch()` are called on a `Promise` and return a `Promise`, allowing us to create a chain of asynchronous actions that happen in a particular order.

### Fetch

```js
console.log('before fetch')
fetch("https://api.tvmaze.com/singlesearch/shows?q=friends")
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (show) {
    console.log(show);
  });
console.log('after fetch')
```

## Posting data to JSON Server

```
```

- `fetch` returns a `Promise` that will resolve to a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response#methods) object if the browser is able to connect to the serve rand receive one.
- the first `.then()` callback receives the resolved `response` as an argument.
- The `.json()` method is defined within the `Response` object and it returns a promise that resolves with the result of parsing the response body text as JSON (this converts the string formatted body into the JavaScript data structure that it represents)
- The following `.then()` callback receives the resolved value of hte previous promise. This is the JS data structure represented in the body of the response (an object or an array of objects)

---

## Resources
- [Fix json-server conflict with Live Server](https://gist.github.com/ihollander/cc5f36c6447d15dea6a16f68d82aacf7)
- [json-server](https://www.npmjs.com/package/json-server)
- [Postman](https://www.postman.com/) (for api testing)
- [JSONView Chrome extension](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en) (for pretty viewing of JSON formatted data in browser)
- [Asynchronous JavaScript Article Series from MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)

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

- Instead of loading hard coding the playlist array, we'll add an event listener/handler that will use `fetch` to retrieve it from our json-server and then trigger `loadPlaylistToSidebar()`
- Within our event handler for handling the new song form submission, we'll use `fetch` to persist the new song to `db.json` so that it will stay there when we refresh the page.

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

1. add an event listener for DOMContentLoaded that will `fetch` the tasks from the json-server (`http://localhost:3000/tasks`)
  - store the resulting data in `todoList`
  - invoke `loadTodoList`, passing `todoList` as an argument
2. BONUS! add a fetch request inside of `addTask` that will persist the newTask to the json-server (by posting to `http://localhost:3000/tasks`) and updating the `todoList` and DOM after getting the response from the server. If you add a task and refresh the page it should still appear in the HTML.
3. BONUS: add a fetch request to toggleComplete so that the change to the task's complete status is persisted to db.json and will be accessible after a page refresh.