let playlist;

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#newSong').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.target.nameInput.value;
    const artist = event.target.artistInput.value;
    const youtubeLink = event.target.youtubeLink.value;
    const duration = formattedDurationToSeconds(event.target.durationInput.value);
    const song = {
      name: name,
      artist: artist,
      youtubeLink: youtubeLink,
      duration: duration
    };
    addSongToPlaylist(playlist, song);
    event.target.reset()
  })
})

function formatDuration(duration) {
  const seconds = duration % 60; // duration - minutes * 60
  const minutes = Math.floor(duration / 60) % 60;
  const hours = Math.floor(duration / 3600);
  return `${hours ? (hours + ':') : ''}${minutes}:${seconds < 10 ? ('0'+ seconds) : seconds}`
}

function formattedDurationToSeconds(formattedDuration) {
  const [seconds, minutes, hours] = formattedDuration.split(':').map(num => parseInt(num)).reverse();
  return seconds + (minutes ? minutes * 60 : 0) + (hours ? hours * 3600 : 0);
}

function copy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function getPlaylistElement() {
  return document.querySelector('#playlist');
}

function getSongNameElement() {
  return document.querySelector('#song-name');
}

function getArtistElement() {
  return document.querySelector('#artist');
}

function getPlayCountElement() {
  return document.querySelector('#play-count')
}

function getPlayerElement() {
  return document.querySelector('#player');
}

function renderSong(song) {
  const li = document.createElement('li');
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
  durationEl.textContent = formatDuration(song.duration);
  song.element = li;
  return li;
}

function loadPlaylistToSidebar() {
  const target = getPlaylistElement();
  target.innerHTML = '';
  playlist.forEach(song => {
    target.append(renderSong(song));
  })
}

loadPlaylistToSidebar();

function addSongToPlaylist(playlist, song) {
  playlist.push(song);
  getPlaylistElement().append(renderSong(song))
  return song;
}

function removeSongFromPlaylist(playlist, youtubeLink) {
  const foundSongIndex = playlist.findIndex(song => song.youtubeLink === youtubeLink)
  if (foundSongIndex !== -1) {
    const songToRemove = playlist.splice(foundSongIndex, 1)[0];
    songToRemove.element.remove();
    return songToRemove;
  } else {
    alert('Song not found!')
  }
}

function extractVideoID(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[7].length == 11) {
    return match[7];
  } else {
    alert("Could not extract video ID.");
  }
}

function loadSongIntoPlayer(song) {
  getSongNameElement().textContent = song.name;
  getArtistElement().textContent = song.artist;
  getPlayCountElement().textContent = song.playCount === 1 ? '1 play' : `${song.playCount} plays`;
  getPlayerElement().src = `https://www.youtube.com/embed/${extractVideoID(song.youtubeLink)}`;
  getPlaylistElement().querySelectorAll('li').forEach(li => {
    li.classList.remove('bg-gray-100')
  })
}

function songsByArtist(playlist, artist) {
  const target = getPlaylistElement();
  target.innerHTML = '';
  playlist.filter(song => song.artist === artist).forEach(song => {
    target.append(renderSong(song))
  })
}

