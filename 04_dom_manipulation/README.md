# Phase 1 Lecture 4 - DOM Manipulation

## Key Concepts

- Creating DOM elements
- Searching for DOM elements
- Updating DOM elements
- Removing DOM elements

## Tasks for Music Library

- Searching for DOM elements
  - `getPlaylistElement()`
  - `getSongNameElement()`
  - `getArtistElement()`
  - `getPlayCountElement()`
  - `getPlayerElement()`
- Creating DOM Elements
  - `renderSong(song)`
  - `loadPlaylistToSidebar()`
  - `addSongToPlaylist(playlist, song)`
- Removing DOM elements
  - `removeSongFromPlaylist(playlist, youtubeLink)`
- Updating DOM elements
  - `loadSongIntoPlayer(song)`
  - `songsByArtist(playlist, artist)`

## Tasks for Todo List

- `renderTask(task)`
- `loadTodoList(todoList)`
- `addTask(todoList, taskLabel)`
- `removeTask(todoList, task, dueDate)`
- BONUS!!! `toggleComplete(todoList, taskLabel)`

## Three Pillars

- Recognize Events
- Manipulate the DOM
- Communicate with the Server

## `renderSong()` -> InnerHTML= XSS Vulnerability

```js
name: '<style>@keyframes x{}</style><img style="animation-name:x" onanimationend="alert(1)"/>'
```

If we use `innerHTML=`, we open ourselves up to XSS attacks.

## `loadSongIntoPlayer()` -> Img or iframe src XSS vulnerability

If we take user input and put it directly into the src attribute of an img or iframe tag, that opens us to an XSS vulnerability as well. 

We do want to allow our users to paste in a youtube link directly into our application when they add a song to the playlist. So in our case, we can use [a function that uses RegEx](https://www.labnol.org/code/19797-regex-youtube-id) to extract the YouTube video ID from the user submitted url before adding it as part of the src attribute. What we're doing it ensuring that our users will only be able to add urls that point to youtube videos. If they submit another url, it won't end up working properly.  

```js
function extractVideoID(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[7].length == 11) {
    return match[7];
  } else {
    alert("Could not extract video ID.");
  }
}

function loadSongIntoPlayer(song) {
  getSongNameElement()?.textContent = song.name;
  getArtistElement()?.textContent = song.artist;
  getPlayCountElement()?.textContent = song.playCount;
  getPlayerElement()?.src = `https://www.youtube-nocookie.com/embed/${extractVideoID(song.youtubeLink)}`;
}
```

## Resources

- [JS Function that uses RegEx to extract Youtube Video ID](https://www.labnol.org/code/19797-regex-youtube-id)
- [Difference Between TextContent and innerText](https://stackoverflow.com/questions/35213147/difference-between-textcontent-vs-innertext)
- [XSS Cheatsheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet)
- [append vs appendChild](https://dev.to/ibn_abubakre/append-vs-appendchild-a4m)
- [remove vs removeChild](https://stackoverflow.com/questions/36998877/what-is-the-difference-between-remove-and-removechild-method-in-javascript)
- [Font Awesome for icons](https://fontawesome.com/v5.15/icons?d=gallery&p=2&m=free)

## Key Takeaways

- Coding out DOM Manipulation at a low level using vanilla javascript in the way we're doing today can be tricky and error prone. 
- It's important to understand how JavaScript can interact with the DOM by creating updating and removing nodes. But, when we get to React in Phase 2, DOM manipulation will be handled by React.
- When using libraries like React, we'll focus more on describing how things should be rendered in different situations and the low level DOM manipulation will be handled by the framework itself.