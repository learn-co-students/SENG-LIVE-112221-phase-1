# Lecture 8 CRUD with Fetch - PATCH and DELETE requests

## Editing Content

- Edit Form
- Inline inputs to display content

We can have an edit form for a song that is a separate from our displayed song.
Or, we can display our songs using inputs without borders so they don't appear as inputs until clicking on one of them.

Instead of displaying the information within an `h2` element, we can use an `input` tag. This will allow our users to click upon the element and edit its content.

Say we start with this markup:

```html
<h2 id="song-name" class="text-2xl p-2">No Song Selected</h2>
<div class="relative" style="padding-top: 56.25%">
  <iframe id="player-frame" class="absolute inset-0 w-full h-full" frameborder="0" /></iframe>
</div>
<div class="flex justify-between mt-2">
  <span id="artist"></span> 
  <span id="play-count"></span>
</div>
```

We can update it to this:

```html
<form id="editSong">
  <h2 class="text-2xl p-2">
    <input id="song-name" class="w-full" value="No Song Selected" />
  </h2>
  <div class="relative" style="padding-top: 56.25%">
    <iframe id="player-frame" class="absolute inset-0 w-full h-full" frameborder="0" /></iframe>
  </div>
  <div class="flex justify-between mt-2">
    <input id="artist" class="w-3/4" /> 
    <span><input id="play-count" class="w-8" type="number" /> play(s)</span>
  </div>
</form>
```

This won't work for the iframe, sadly, but should work for the name, artist and play count. Before we hook things up, though, we need to rework the function that loads the content into these DOM containers. Now that they're inputs, we'll need to use the `value` property instead of `textContent`.

```js
const loadSongIntoPlayer = (song) => {
  document.querySelector('#song-name').textContent = song.name;
  document.querySelector('#artist').textContent = song.artist;
  document.querySelector('#play-count').textContent = song.playCount === 1 ? '1 play' : `${song.playCount} plays`;
  document.querySelector('#player-frame').src = `https://www.youtube.com/embed/${extractVideoID(song.youtubeLink)}`;
  document.querySelectorAll('#playlist li').forEach(li => {
    li.classList.remove('bg-gray-100')
  })
  document.querySelector('#newComment').dataset.songId = song.id;
  // clear out the comments list and load comments for this song into the comments part of the DOM
  document.querySelector('#comments').innerHTML = "";
  getComments(song)
    .then(renderComments)
}
```

We will also want to add the songId as a data attribute of the form when we load the song into the player. The function will become this:

```js
const loadSongIntoPlayer = (song) => {
  document.querySelector('#song-name').value = song.name;
  document.querySelector('#artist').value = song.artist;
  document.querySelector('#play-count').value = song.playCount;
  document.querySelector('#player-frame').src = `https://www.youtube.com/embed/${extractVideoID(song.youtubeLink)}`;
  document.querySelectorAll('#playlist li').forEach(li => {
    li.classList.remove('bg-gray-100')
  })
  document.querySelector('#editSong').dataset.songId = song.id;
  document.querySelector('#newComment').dataset.songId = song.id;
  // clear out the comments list and load comments for this song into the comments part of the DOM
  document.querySelector('#comments').innerHTML = "";
  getComments(song)
    .then(renderComments)
}
```

This covers the display portion of our 3 pillars approach, leaving behavior and data remaining. This time we're working backwards, starting with the display logic then moving to the data and finally hooking up the event listeners/handlers to handle behavior.

### Data

```js
const updateSong = (songId, songData) => {
  return fetch(`http://localhost:3000/songs/${songId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(songData)
  })
    .then(res => res.json())
}
```

### Behavior

In this case, the behavior we're tracking is users interacting with the inputs within our form. 

But, since we're editing inline, and the content doesn't look like a form, it would be better if we could trigger auto-saves so that our changes are persisted without having to press a save button or hit enter to submit the form.

In order to do this, we can add a different kind of event listener to our form: `keyup`. This way, whenever a user types in one of our form inputs, a `patch` request will be sent automatically to update our API with the new value.


```js
const editSongForm = document.querySelector('#editSong')
editSongForm.addEventListener('keyup', (e) => {
  triggerSongAutoSave()
})

const triggerSongAutoSave = () => {
  const songId = editSongForm.dataset.songId;
  const songData = {
    name: document.getElementById('song-name').value,
    artist: document.getElementById('artist').value,
    playCount: parseInt(document.getElementById('play-count').value, 10)
  };
  updateSong(songId, songData)
    .then(renderSong)
}
```

Let's try this out in the browser now, we can see in our network tab that patch requests are triggered every time we update the name or artist  of a song, but we've got a couple of bugs:

1. No patch requests are triggered if we click on the up and down errors to update the playCount, but patch reequests are sent if we click on the input and then use the up and down arrows on the keyboard.
2. Every time we change one of the values and the patch goes through, another copy of the song is added to the playlist in the sidebar.

Let's fix the 2nd one first.

### Fixing Duplicate renders upon song update
 This one happens because `renderSong` is creating a new list item for the updated song instead of updating the existing list item. We can fix this by changing the first line of the function where we define the `li` constant.

```js
const li = document.createElement('li');
```

Currently, this line of code will always create a new list item. Instead, we want to first check if we have a list item tag for this song already. The way we can do that is by taking a look one line down in the method:

```js
li.dataset.songId = song.id;
```

The `renderSong` function creates the list item and assigns the song's id as a data attribute. This will allow us to query the DOM to see if we've already rendered an `existingLi` for this song before creating a new one. If we assign the `li` constant to the `existingLi` element, then all subsequent lines in the method will update the existing DOM node rather than a brand new one. The `append` method only sets the parent of the appended node to the node upon which we called `append`. So, if the appended node is already a child of the target node, no duplicate is added.

We can use the attribute selector to query the DOM for an existing li.

```js
const existingLi = document.querySelector(
  `#playlist li[data-song-id="${song.id}"]`
) 
const li = existingLi || document.createElement('li')
```

If we try it now, we'll notice that the edited `li` element gets moved to the bottom of the list. We want it to update, but we don't want it to move!

To fix this, let's try only doing the `target.append(li)` code if we don't already have an `existingLi`.

```js
if (!existingLi) {
  const target = document.querySelector('#playlist');
  target.append(li);
}
```

After the update, our `renderSong` function looks like this:

```js
const renderSong = (song) => {
  const existingLi = document.querySelector(
    `#playlist li[data-song-id="${song.id}"]`
  ) 
  const li = existingLi || document.createElement('li')
  li.dataset.songId = song.id;
  li.className = "flex justify-between p-2 pr-4 cursor-pointer";
  li.innerHTML = `
  <div>
    <span class="song font-semibold"></span>
    <span class="artist"></span>
  </div>
  <div class="duration text-gray-400"></div>`;
  li.addEventListener('click', (e) => {
    loadSongIntoPlayer(song);
    li.classList.add('bg-gray-100')
  })
  const songEl = li.querySelector('.song');
  const artistEl = li.querySelector('.artist');
  const durationEl = li.querySelector('.duration')
  songEl.textContent = song.name;
  artistEl.textContent = `by ${song.artist}`;
  durationEl.textContent = song.duration;
  if (!existingLi) {
    const target = document.querySelector('#playlist');
    target.append(li);
  }
  return li;
}
```

Now, if we visit our application in the browser, we can update the name of a song in the main content area and see the song's name update within the sidebar in response!

### Making sure we can update the play count by clicking or using the keyboard

The issue here is coming from the fact that the keyup event isn't as good of a fit for the number type input as we can change it by clicking on  the up and down arrows without actually pressing a key. Instead, we can attach a `change` event to this number input that will fire off the update.

```js
document.querySelector('#play-count').addEventListener('change', (e) => {
  triggerSongAutoSave()
})
```

Now, if we go over to the browser, we can click on the up and down arrows and it does trigger a PATCH request as expected. 

But, if we click on the input and then use the keyboard to change the input, we're getting 2 patch requests every time we press the up or down key. 

<details>
  <summary>
    Why are we seeing 2 PATCH requests here?
  </summary>
  <hr/>

  We have two event listeners that are triggered by the keyboard event that targets the number input. The one attached to the form and the one attached to the input itself.
    
We can fix this is in two different ways. We can:
- rework the listeners so that we're only applying a 'change' listener to the number input and apply 2 separate listeners to the other two inputs, OR
- introduce debouncing to our `triggerSongAutoSave` function so that if we call it multiple times in quick succession, it waits briefly before going through with the update and only performs the last queued update. (This technique is often used when typing in an input that triggers a search when you pause typing briefly)

  <hr/>

</details>
<br/>

I'm going to show you a simple example of debouncing, because I think it's pretty cool. I've also included a couple of links below if you'd like to explore further with a more practical and reusable `debounce` function. For now, we're going to do the least amount possible to get this technique working.

This is how the `triggerSongAutoSave` function currently looks:

```js
const triggerSongAutoSave = () => {
  const songId = editSongForm.dataset.songId;
  const songData = {
    name: document.getElementById('song-name').value,
    artist: document.getElementById('artist').value,
    playCount: parseInt(document.getElementById('play-count').value, 10)
  };
  updateSong(songId, songData)
    .then(renderSong)
}
```

What we want to do is to declare a timeout variable outside the scope of this function. We'll call it `queuedSongAutoSave`.
These are our steps:
- create `queuedSongAutoSave` outside the function
- clear the previous `queuedSongAutoSave` every time the function is called
- reassign `queuedSongAutoSave` to another timeout to trigger the API/DOM update

The goal is to ensure that a user pauses in their typing briefly before we actually go through with updating the API & the DOM.

```js
let queuedSongAutoSave;
const triggerSongAutoSave = () => {
  window.clearTimeout(queuedSongAutoSave);
  queuedSongAutoSave = window.setTimeout(() => {
    const songId = editSongForm.dataset.songId;
    const songData = {
      name: document.getElementById('song-name').value,
      artist: document.getElementById('artist').value,
      playCount: parseInt(document.getElementById('play-count').value, 10)
    };
    updateSong(songId, songData)
      .then(renderSong)
  }, 300)
}
```

- [Debouncing on freecodecamp](https://www.freecodecamp.org/news/javascript-debounce-example/)
- [Debouncing in JS on dev.to](https://dev.to/abhishekjain35/debouncing-in-javascript-276j)


## Deleting Songs from the Playlist

### Display

Add a button with a trash icon inside to the header that will delete the song from the playlist.

```js
<h2 class="text-2xl p-2 flex justify-between">
  <input id="song-name" class="w-5/6" value="No Song Selected" />
  <button id="deleteSong">
    <i class="fas fa-trash-alt"></i>
  </button>
</h2>
```

We'll add the song's id to the button so that when we click on the button, we can retrieve the id we need to delete.
```js
document.querySelector('#deleteSong').dataset.songId = song.id;
```

We want to add the class to highlight the selected song within loadSongIntoPlayer
```js
document.querySelector(`#playlist li[data-song-id="${song.id}"]`).classList.add('bg-gray-100')
```

### Data

```js
const deleteSong = (songId) => {
  return fetch(`http://localhost:3000/songs/${songId}`, {
    method: 'DELETE'
  })
}
```


### Behavior

```js
document.getElementById('deleteSong').addEventListener('click', (e) => {
  let nextSelectedSong;
  const songIdToDelete = document.querySelector('#deleteSong').dataset.songId;
  getSongs()
    .then(songs => {
      const index = songs.findIndex(song => song.id == songIdToDelete)
      if (songs.length - 1 === index) {
        nextSelectedSong = songs[index - 1]
      } else {
        nextSelectedSong = songs[index + 1]
      }
    })
    .then(() => deleteSong(songIdToDelete))
    .then(() => {
      document.querySelector(`#playlist li[data-song-id="${songIdToDelete}"]`).remove();
      loadSongIntoPlayer(nextSelectedSong)
    })
  console.log('delete button clicked')
})
```

## Exercise

- Within the `renderComment` function, add event listeners to handle updating and deleting comments.
- Add functions called `updateComment` and `deleteComment` that both return promises.
    - `updateComment` will accept both its `id` and the commentData (an object with a comment property) as arguments. It sends a PATCH request using the `id` in the url and the comment in the body.
    - `deleteComment` will accept a `commentId` as an argument that will send a DELETE request to delete the comment from the database.
- Within the event handler in `renderComment` for clicking on the delete button, chain on a .then to deleteComment and remove the comment node from the DOM.