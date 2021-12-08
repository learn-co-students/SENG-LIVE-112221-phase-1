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
    event.target.reset()
  })
  

  const editSongForm = document.querySelector('#editSong')
  editSongForm.addEventListener('keyup', (e) => {
    triggerSongAutoSave()
  })
  document.getElementById('play-count').addEventListener('change', (e) => {
    triggerSongAutoSave();
  })
  editSongForm.addEventListener('submit', (e) => e.preventDefault())

  document.getElementById('deleteSong').addEventListener('click', (e) => {
    let nextSelectedSong;
    const songIdToDelete = document.querySelector('#deleteSong').dataset.songId;
    getSongs()
      .then(songs => {
        const index = songs.findIndex(song => song.id == songIdToDelete)
        if (songs.length === 1) {
          nextSelectedSong = null;
        } else if (songs.length - 1 === index) {
          nextSelectedSong = songs[index - 1]
        } else {
          nextSelectedSong = songs[index + 1]
        }
      })
      .then(() => deleteSong(songIdToDelete))
      .then(() => {
        document.querySelector(`#playlist li[data-song-id="${songIdToDelete}"]`).remove();
        if (nextSelectedSong) {
          loadSongIntoPlayer(nextSelectedSong)
        } else {
          document.querySelector('#main').classList.add('hidden');
        }
      })
    console.log('delete button clicked')
  })

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

  const getComments = (song) => {
    return fetch(`http://localhost:3000/comments?songId=${song.id}`)
      .then(res => res.json())
  }

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

  // add in updateComment(commentId, commentData) and
  // deleteComment(commentId)
  const updateComment = (commentId, commentData) => {
    return fetch(`http://localhost:3000/comments/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    })
      .then(res => res.json())
  }

  const deleteComment = (commentId) => {
    return fetch(`http://localhost:3000/comments/${commentId}`, {
      method: 'DELETE'
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
    document.querySelector('#main').classList.remove('hidden');
    document.querySelectorAll('#playlist li').forEach(li => {
      li.classList.remove('bg-gray-100')
    })
    document.querySelector(`#playlist li[data-song-id="${song.id}"]`).classList.add('bg-gray-100')
    document.querySelector('#deleteSong').dataset.songId = song.id;
    document.querySelector('#editSong').dataset.songId = song.id;
    document.querySelector('#newComment').dataset.songId = song.id;
    // clear out the comments list and load comments for this song into the comments part of the DOM
    document.querySelector('#comments').innerHTML = "";
    getComments(song)
      .then(renderComments)
  }

  // modify the renderComment function 
  // rendering a single comment from a 
  // peristed record passed as an argument
  // const renderComment = (record) => {
  //   const target = document.querySelector('#comments');
  //   const p = document.createElement('p');
  //   p.textContent = record.comment;
  //   target.append(p);
  // }

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
    // add event listeners for updating or deleting a comment
    input.addEventListener('keyup', (e) => {
      updateComment(record.id, { comment: e.target.value });
    })
    deleteBtn.addEventListener('click', (e) => {
      deleteComment(record.id)
        .then(() => p.remove())
    })
    target.append(p);
  }

  const renderComments = (comments) => {
    const target = document.querySelector('#comments');
    target.innerHTML = "";
    comments.forEach(renderComment)
  }

