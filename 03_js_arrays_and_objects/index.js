// why is const a good choice for declaring an array type variable?
const playlist = [
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
    artist: 'Queen',
    duration: 222,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ'
  },
  {
    name: 'Purple Rain',
    artist: 'Prince',
    duration: 477,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=TvnYmWpD_T8'
  },
]

function formatDuration(duration) {
  const seconds = duration % 60; // duration - minutes * 60
  const minutes = Math.floor(duration / 60) % 60;
  const hours = Math.floor(duration / 3600);
  return `${hours ? (hours + ':') : ''}${minutes}:${seconds}`
}

// ✅ Accessing Data in Arrays

// this function should return the first element
function retrieveFirst(playlist) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('retrieveFirst', retrieveFirst(playlist))
// console.log('playlist after retrieveFirst', playlist)

// ✅ adding and removing values

function addSongToBeginningOfPlaylist(playlist, song) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('addSongToBeginningOfPlaylist', addSongToBeginningOfPlaylist(playlist, {
//   name: "What'd I Say",
//   artist: 'Ray Charles',
//   duration: 255,
//   playCount: 0,
//   youtubeLink: 'https://www.youtube.com/watch?v=HAjeSS3kktA'
// })) 
// console.log('playlist after addSongToBeginningOfPlaylist', playlist)

function addSongToEndOfPlaylist(playlist, song) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('addSongToEndOfPlaylist',addSongToEndOfPlaylist(playlist, {
//   name: "Georgia On My Mind",
//   artist: 'Ray Charles',
//   duration: 217,
//   playCount: 0,
//   youtubeLink: 'https://www.youtube.com/watch?v=ggGzE5KfCio'
// })) 
// console.log('playlist after addSongToEndOfPlaylist', playlist)

function removeLastSongFromPlaylist(playlist) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('removeLastSongFromPlaylist', removeLastSongFromPlaylist(playlist))
// console.log('playlist after removeLastSongFromPlaylist', playlist)

function removeFirstSongFromPlaylist(playlist) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('removeFirstSongFromPlaylist', removeFirstSongFromPlaylist(playlist))
// console.log('playlist after removeFirstSongFromPlaylist', playlist)

// ✅ Iteration

function logSongNames(playlist) {

}

// // 👟👟👟 uncomment the lines below to test

// logSongNames(playlist) 
// console.log('playlist after logSongNames', playlist)

function calculatePlaylistDuration(playlist) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('calculatePlaylistDuration',calculatePlaylistDuration(playlist))
// console.log('playlist after calculatePlaylistDuration', playlist)


function songsByArtist(playlist, artist) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('songsByArtist', songsByArtist(playlist, "Queen")) // uncomment this to test
// console.log('playlist after songsByArtist', playlist)

// what method of iteration should we use here?
function renameArtist(playlist, oldArtistName, newArtistName) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('renameArtist', renameArtist(playlist, "Prince", "The Artist Formerly Known As Prince"))
// console.log('playlist after renameArtist', playlist)


// // Let's discuss Pass by value vs pass by reference here


console.log("------------------------");
console.log("⬇️ Break Out Activities ⬇️");
console.log("🚨 Comment Out Lecture Code Above Before Starting 🚨");
console.log("📌 Follow instructions in the EXERCISE.md file")
console.log("💡 Use console.log() To Check Answers 💡");
console.log("------------------------");

const todoList = [
  {
    task: 'Learn about JS Data Types',
    complete: true,
    dueDate: new Date('2021-11-22')
  },
  {
    task: 'Learn about Iteration',
    complete: false,
    dueDate: new Date('2021-11-24')
  },
]
// 🚧 Task 1: `addTask(todoList, task)`

function addTask(todoList, task) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('addTask', addTask(todoList, 'Practice using the filter method'))
// console.log('todoList after addTask', todoList)





// 🚧 Task 2: `markComplete(todoList, task)`

function markComplete(todoList, task) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('markComplete', markComplete(todoList, 'Learn about Iteration'))
// console.log('todoList after markComplete', todoList)





// 🚧 Task 3: `addDueDateToTask(todoList, task, dueDate)`

function addDueDateToTask(todoList, task, dueDate) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('addDueDateToTask', addDueDateToTask(todoList, 'Practice using the filter method', new Date('2021-11-24')))
// console.log('todoList after addDueDateToTask', todoList)





// ADVANCED DELIVERABLE!

// Think about different ways you could do this
// What would you want to return?
// How would you remove the task from todoList passed as an argument destructively?
// How would your approach change if you wanted to return a todoList array without the removed task non-destructively? (Without affecting the todoList passed as an argument)
// Which is more difficult? Why?
function removeTask(todoList, task) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('addTask', addTask(todoList, 'demo task'));
// console.log('todoList after addTask', todoList);
// console.log('removeTask', removeTask(todoList, 'demo task'));
// console.log('todoList after removeTask', todoList);

