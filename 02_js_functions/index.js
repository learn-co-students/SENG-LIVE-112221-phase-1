// ✅ Declaring, Referencing, and Invoking Functions

  // function playSong() {
  //   return "playing some song";
  // }

  // print a reference to the 'playSong' function

    // console.log(playSong);

  // call function and evaluate logic
  
    // console.log(playSong());

// ✅ Parameters vs. Arguments

  // Parameters go with function definitions, arguments go with function invocations

  // using the playSong function again, let's define a parameter 'song'

    // function playSong(song) {
    //   return "playing some song";
    // }

  // how can we use the paramater to make our code more dynamic?

    // function playSong(song, artist, playCount=0) {
    //   return `playing: ${song} by ${artist} play count: ${playCount}`;
    // }

  // now invoke the function and pass in an argument

    // console.log(
    //   playSong("Sweet Dreams", "The Eurythmics", 23)
    // );

// ✅ Arrow Functions

// const squareMe = (n) => n*n;

const squareMe = (n) => {
  return n*n;
}

// console.log(squareMe(2))

// debugging function

function log(obj) {
  console.log(obj);
  return obj;
}

// ✅ First Class / Higher Order Functions

  // regular first class function => can treated like any other JS object

  // higher order function => accepts another function as a parameter or returns a function
  // https://www.codecademy.com/learn/game-dev-learn-javascript-higher-order-functions-and-iterators/modules/game-dev-learn-javascript-iterators/cheatsheet

// console.log('starting now');
// window.setTimeout(() => {
//   console.log('2 seconds later')
// }, 1000 * 60 * 2);

// Alternatively

// function callback() {
//   console.log('2 seconds later')
// }
// console.log('starting now');
// window.setTimeout(callback, 2000);


let counter = 10;
const timerInterval = window.setInterval(() => {
  console.log(counter);
  if(counter === 0) {
    window.clearInterval(timerInterval);
  }
  counter--; 
}, 1000);
console.log('timerInterval',timerInterval);

// ✅ Scope

function outerFunction() {
  let name = "outer";
  let outer = "outer";
  console.log("name", name);
  console.log("outer", outer);
  // console.log("child", child); // throws an error
  // console.log("grandChild", grandChild); // throws an error
  return function childFunction() {
    let name = "child";
    let child = "child";
    console.log("name", name);
    console.log("outer", outer);
    console.log("child", child);
    // console.log("grandChild", grandChild); // throws an error
    return function grandChild(child) {
      let name = "grandChild";
      let grandChild = "grandChild";
      console.log("name", name);
      console.log("outer", outer);
      console.log("child", child);
      console.log("grandChild", grandChild);
    }
  }
}

// outerFunction()()();

// -------------------------------------------

// ✅ Defining Variables

/*
🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
1. Declare a variable called `currentSong` that will hold the current song.
🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
*/

// CODE HERE
let currentSong = "Sweet Dreams";
let songDuration = 216;

// ✅ Defining Functions

/* 
🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
2. Create a function called `formatDuration` that will take a number of seconds as an argument and return a string containing minutes and seconds.
🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
*/

// CODE HERE

function formatDuration(duration) {
  const seconds = duration % 60; // duration - minutes * 60
  const minutes = Math.floor(duration / 60) % 60;
  const hours = Math.floor(duration / 3600);
  return `${hours ? (hours + ':') : ''}${minutes}:${seconds}`
}

// uncomment the below to test it out
console.log(formatDuration(216)) // should return '3:36'
console.log(formatDuration(4216)) // should return '3:36'

/*
🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
3. Create a function called `playSong` that will take a song as an argument and set `currentSong` to the argument passed.
🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
*/

function playSong(song, duration) {
  currentSong = song;
}

currentSong = "Cry Me a River"

// instead of

playSong("Cry Me a River")

// 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 


console.log("------------------------");
console.log("⬇️ Break Out Activities ⬇️");
console.log("🚨 Comment Out Lecture Code Above Before Starting 🚨");
console.log("📌 Follow instructions in the EXERCISE.md file")
console.log("💡 Use console.log() To Check Answers 💡");
console.log("------------------------");

// 🚧 Break Out Activity Step 1: 
// Declare `interval` and `timeSpent`

// CODE HERE
let interval;
let timeSpent = 0;

// 🚧 Break Out Activity Step 2: Utilizing Callbacks with `setInterval`
// Declare the function startTimer below

// CODE HERE
function startTimer(seconds) {
  interval = window.setInterval(() => {
    timeSpent++;
    seconds--;
    console.log(`${seconds} seconds remaining`)
    if (seconds === 0) {
      window.clearInterval(interval);
      console.log('Timer expired!')
    }
  }, 1000)
}

// 🚧 Break Out Activity Step 3: Invoking `clearInterval` to stop the running timer and print the value of `timeSpent`
// Declare the function stopTimer below

// CODE HERE
function stopTimer() {
  window.clearInterval(interval);
  return `Time Spent on Task: ${timeSpent} seconds`
}