// Behavior

const init = () => {
  // fetch songs for initial load
  getSongs()
    .then(renderSongs)
  // handle form submission for creating a new song
  document.querySelector('#newSong').addEventListener('submit', (event) => {
    event.preventDefault();
    const songData = {
      name: event.target.nameInput.value,
      artist: event.target.artistInput.value,
      duration: event.target.durationInput.value,
      youtubeLink: event.target.youtubeLinkInput.value,
      playCount: 0
    }
    createSong(songData)
      .then(renderSong)
  })
  const editSongForm = document.querySelector('#editSong')
  editSongForm.addEventListener('keyup', (event) => {
    console.log('we pressed a key and let it go')
    triggerSongAutoSave()
  })

  editSongForm.addEventListener('submit', (event) => event.preventDefault())

  let queuedSongAutoSave;
  const triggerSongAutoSave = () => {
    window.clearTimeout(queuedSongAutoSave);
    queuedSongAutoSave = window.setTimeout(() => {
      const songId = editSongForm.dataset.songId;
      const songData = {
        name: document.getElementById('song-name').value,
        artist: document.getElementById('artist').value,
        playCount: parseInt(document.getElementById('play-count').value, 10)
      }
      updateSong(songId, songData)
        .then(renderSong);
    }, 300)
  }

  document.querySelector('#play-count').addEventListener('change', (e) => {
    triggerSongAutoSave()
  })

  const deleteBtn = document.getElementById('deleteSong');
  deleteBtn.addEventListener('click', (e) => {
    let nextSelectedSong;
    const songIdToDelete = parseInt(deleteBtn.dataset.songId, 10);
    getSongs()
      .then(songs => {
        const index = songs.findIndex((song) => song.id === songIdToDelete);
        if (songs.length - 1 === index) {
          nextSelectedSong = songs[index - 1]
        } else {
          nextSelectedSong = songs[index + 1];
        }
      })
      .then(() => deleteSong(songIdToDelete))
      .then(() => {
        document.querySelector(`#playlist li[data-song-id="${songIdToDelete}"]`).remove();
        loadSongIntoPlayer(nextSelectedSong)
      })
  })

  // Add Submit Handler for new Comment Form
  // pull data out of form and pass to createComment
  // after promise resolves, pass response to renderComment and reset the form
  document.querySelector('#newComment').addEventListener('submit', (event) => {
    event.preventDefault();
    const commentData = {
      songId: event.target.dataset.songId,
      comment: event.target.commentInput.value,
    }
    createComment(commentData)
      .then(savedRecord => {
        renderComment(savedRecord)
        event.target.reset();
      })
  })
}

document.addEventListener('DOMContentLoaded', init)

// Data
 
  // Requests
  const getSongs = () => {
    return fetch('http://localhost:3000/songs')
      .then(res => res.json())
  }

  const createSong = (songData) => {
    return fetch('http://localhost:3000/songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(songData)
    })
      .then(res => res.json())
  }

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

  const deleteSong = (songId) => {
    return fetch(`http://localhost:3000/songs/${songId}`, {
      method: 'DELETE'
    })  
  }


  const getComments = (song) => {
    return fetch(`http://localhost:3000/comments?songId=${song.id}`)
      .then(res => res.json())
  }
  // add in createComment
  const createComment = (commentData) => {
    return fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    })
      .then(res => res.json())
  }

  // 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
  // add in updateComment(commentId, commentData) and
  // deleteComment(commentId)
  


  // utility functions related to data

  const extractVideoID = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[7].length == 11) {
      return match[7];
    } else {
      alert("Could not extract video ID.");
    }
  }

// Display

  const renderSong = (song) => {
    const existingLi = document.querySelector(`#playlist li[data-song-id="${song.id}"]`)
    const li = existingLi || document.createElement('li');
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

  const renderSongs = (songs) => {
    songs.forEach(renderSong)
    loadSongIntoPlayer(songs[0])
  }

  const loadSongIntoPlayer = (song) => {
    document.querySelector('#song-name').value = song.name;
    document.querySelector('#artist').value = song.artist;
    document.querySelector('#play-count').value = song.playCount;
    document.querySelector('#player-frame').src = `https://www.youtube.com/embed/${extractVideoID(song.youtubeLink)}`;
    document.querySelectorAll('#playlist li').forEach(li => {
      li.classList.remove('bg-gray-100')
    })
    document.querySelector(`#playlist li[data-song-id="${song.id}"]`).classList.add('bg-gray-100')
    // Add a data attribute to the newComment form
    // to track the songId of the selected song
    // We'll use this from within the submit event
    // handler to ensure that the comment is 
    // associated with the song that is loaded into
    // the player.
    document.querySelector('#editSong').dataset.songId = song.id;
    document.querySelector('#deleteSong').dataset.songId = song.id;
    document.querySelector('#newComment').dataset.songId = song.id;
    // clear out the comments list and load comments for this song into the comments part of the DOM
    document.querySelector('#comments').innerHTML = "";
    getComments(song)
      .then(renderComments)
  }

  // define a function renderComment for 
  // rendering a single comment from a 
  // peristed record passed as an argument
  const renderComment = (record) => {
    const target = document.querySelector('#comments');
    const p = document.createElement('p');
    p.className = "flex justify-between";
    p.innerHTML = `
    <input class="w-5/6" />
    <button><i class="fas fa-trash-alt"></i></button>
    `
    const input = p.querySelector('input');
    const deleteBtn = p.querySelector('button');
    input.value = record.comment;
    // 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
    // add event listeners for updating or deleting a comment
    
    target.append(p);
  }

  // define a function renderComments for
  // clearing out the comments and fill in the
  // div with the retrieved comments from the API
  // passing them to renderComment 
  const renderComments = (comments) => {
    const target = document.querySelector('#comments');
    target.innerHTML = "";
    comments.forEach(renderComment)
  }

