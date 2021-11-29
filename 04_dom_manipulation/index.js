const playlist = [
  {
    name: "What'd I Say",
    artist: 'Ray Charles',
    duration: 255,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=HAjeSS3kktA'
  },
  {
    name: 'Sweet Dreams',
    artist: 'The Eurythmics',
    duration: 216,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=qeMFqkcPYcg'
  },
  {
    name: 'Cry Me a River',
    artist: 'Justin Timberlake',
    duration: 290,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=DksSPZTZES0'
  },
  {
    name: 'With a Little Help from my Friends',
    artist: 'Joe Cocker',
    duration: 289,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=a3LQ-FReO7Q'
  },
  {
    name: 'Bohemian Rhapsody',
    artist: 'Queen',
    duration: 359,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ'
  },
  {
    name: 'Somebody To Love',
    artist: 'Queen',
    duration: 309,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=kijpcUv-b8M'
  },
  {
    name: 'Another One Bites the Dust',
    // name: '<style>@keyframes x{}</style><img style="animation-name:x" onanimationend="alert(1)"/>Another One Bites the Dust',
    artist: 'Queen',
    duration: 222,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=eqyUAtzS_6M'
  },
  {
    name: 'Purple Rain',
    artist: 'Prince',
    duration: 477,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=TvnYmWpD_T8'
  }
]

function formatDuration(duration) {
  const seconds = duration % 60; // duration - minutes * 60
  const minutes = Math.floor(duration / 60) % 60;
  const hours = Math.floor(duration / 3600);
  return `${hours ? (hours + ':') : ''}${minutes}:${seconds < 10 ? ('0'+ seconds) : seconds}`
}

function copy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

// ✅ Searching for DOM elements

function getSidebarElement() {

}

console.log('getSidebarElement', getSidebarElement())

function getPlaylistElement() {
  
}

console.log('getPlaylistElement', getPlaylistElement())

function getMainElement() {
  
}

console.log('getMainElement', getMainElement())

function getSongNameElement() {
  
}

console.log('getSongNameElement', getSongNameElement())

function getArtistElement() {
  
}

console.log('getArtistElement', getArtistElement())

function getPlayCountElement() {
  
}

console.log('getPlayCountElement', getPlayCountElement())

function getPlayerElement() {
  
}

console.log('getPlayerElement', getPlayerElement())

// ✅ Creating DOM elements (Avoiding XSS vulnerability)

function renderSong(song) {
  const li = document.createElement('li');
  li.className = "flex justify-between p-2 pr-4"
  li.innerHTML = `
  <div>
    <span class="song font-semibold">${song.name}</span>
    <span class="artist">by ${song.artist}</span>
  </div>
  <div class="duration text-gray-400">${formatDuration(song.duration)}</div>`
  song.element = li;
  return li;
}


function loadPlaylistToSidebar() {
  
}

// // 👟👟👟 uncomment the line below to test

// loadPlaylistToSidebar();

function addSongToPlaylist(playlist, song) {
  playlist.push(song);
  // Update the DOM with the new song in the sidebar
  return song;
}

// // 👟👟👟 uncomment the lines below to test

// window.setTimeout(() => {
//   console.log('addSongToPlaylist', addSongToPlaylist(playlist, {
//     name: "Georgia On My Mind",
//     artist: 'Ray Charles',
//     duration: 217,
//     playCount: 0,
//     youtubeLink: 'https://www.youtube.com/watch?v=ggGzE5KfCio'
//   })) 
//   console.log('playlist after addSongToPlaylist', copy(playlist))
// }, 1000)

// ✅ Removing DOM elements

function removeSongFromPlaylist(playlist, youtubeLink) {
  const foundSongIndex = playlist.findIndex(song => song.youtubeLink === youtubeLink)
  if (foundSongIndex !== -1) {
    const songToRemove = playlist.splice(foundSongIndex, 1)[0];
    // Remove the song from playlist in the sidebar
    return songToRemove;
  } else {
    alert('Song not found!')
  }
}

// // 👟👟👟 uncomment the lines below to test

// window.setTimeout(() => {
//   console.log('removeSongFromPlaylist', removeSongFromPlaylist(playlist, 'https://www.youtube.com/watch?v=ggGzE5KfCio'))
//   console.log('playlist after addSongToPlaylist', copy(playlist))
// }, 3000)

// ✅ Updating DOM elements

function extractVideoID(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[7].length == 11) {
    return match[7];
  } else {
    alert("Could not extract video ID.");
  }
}

// update the main section of the DOM with information
// using the following helper functions defined above:
// getSongNameElement()
// getArtistElement()
// getPlayCountElement()
// getPlayerElement()
// Take care **NOT** to put the youtubeLink from the song directly into the src attribute for the iframe. We want it to be an embed version of the link and we want to make sure we're extracting the VideoID using the function defined above
function loadSongIntoPlayer(song) {
  getSongNameElement()
  getArtistElement()
  getPlayCountElement()
  getPlayerElement()
  //`https://www.youtube.com/embed/${extractVideoID(song.youtubeLink)}`;
}



// // 👟👟👟 uncomment the lines below to test


// loadSongIntoPlayer(playlist[0]);
// loadSongIntoPlayer(playlist[1]);
// loadSongIntoPlayer(playlist[2]);
// loadSongIntoPlayer(playlist[3]);
// loadSongIntoPlayer(playlist[4]);
// loadSongIntoPlayer(playlist[5]);
// loadSongIntoPlayer(playlist[6]);


// replace the playlist in the sidebar with songs that match the artist passed as an argument
function songsByArtist(playlist, artist) {
  const target = getPlaylistElement();
  target.innerHTML = '';
  // how do we replace the songs in the sidebar with only the ones matching the artist passed as an argument?
  
}


// // 👟👟👟 uncomment the line below to test

// songsByArtist(playlist, 'Queen')
// loadPlaylistToSidebar() // to restore original playlist or just uncomment the line above