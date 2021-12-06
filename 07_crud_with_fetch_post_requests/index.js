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
  // Add Submit Handler for new Comment Form
  // pull data out of form and pass to createComment
  // after promise resolves, pass response to renderComment and reset the form
  
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

  // add in comment Requests
  // getComments(song)
  // include the songId within the comments url so 
  // that json-server will filter out comments on 
  // other songs
  const getComments = (song) => {
    
  }
  // add in a createComment(commentData) function
  // that will accept an object with songId and 
  // comment properties
  const createComment = (commentData) => {
    
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
    const li = document.createElement('li');
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
    const target = document.querySelector('#playlist');
    target.append(li);
    return li;
  }

  const renderSongs = (songs) => {
    songs.forEach(renderSong)
    loadSongIntoPlayer(songs[0])
  }

  const loadSongIntoPlayer = (song) => {
    document.querySelector('#song-name').textContent = song.name;
    document.querySelector('#artist').textContent = song.artist;
    document.querySelector('#play-count').textContent = song.playCount === 1 ? '1 play' : `${song.playCount} plays`;
    document.querySelector('#player-frame').src = `https://www.youtube.com/embed/${extractVideoID(song.youtubeLink)}`;
    document.querySelectorAll('#playlist li').forEach(li => {
      li.classList.remove('bg-gray-100')
    })
    // Add a data attribute to the newComment form
    // to track the songId of the selected song
    // We'll use this from within the submit event
    // handler to ensure that the comment is 
    // associated with the song that is loaded into
    // the player.
    
    // clear out the comments list and load comments for this song into the comments part of the DOM
    
  }

  // define a function renderComment for 
  // rendering a single comment from a 
  // peristed record passed as an argument
  const renderComment = (record) => {
    
  }

  // define a function renderComments for
  // clearing out the comments and fill in the
  // div with the retrieved comments from the API
  // passing them to renderComment 
  const renderComments = (comments) => {
    
  }

