🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
## Tasks for the Day
🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 

1. Create a variable called `timeSpent` with an initial value of `0` and a variable called `interval` with no initial value. 
2. Create a function called `startTimer` that will take `seconds` as an argument, indicating how long the timer should run. 
    - Use the `setInterval` method to start a timer that will print a message to the console every second until the timer expires.
    - Every tick of the timer should also increment the `timeSpent` variable.
    - Each console.log should print the number of seconds remaining on the timer
3. Create a function called `stopTimer` that will use the `clearInterval` method to stop the timer from running and return a message including how much time was spent on the task, like so: `"Time Spent on Task: 15 seconds"`

## Testing your Solution

In order to test your solution to see that it works properly, you can use the Live Server and try this expression:

```js
startTimer(5);
```

You should see the following printed:

```
undefined
4 seconds remaining
3 seconds remaining
2 seconds remaining
1 seconds remaining
0 seconds remaining
Timer expired!
```

If you then type in `timeSpent`, you should see `5`

Now, start a longer timer and then stop it:

```js
startTimer(10);
```

Wait a couple of seconds and then type in:

```js
stopTimer();
```

Don't worry if the logs keep going as you type, it will still work fine.

At this point, you should see additional messages counting down from 10. If you type in `timeSpent` to check its value this time, you'll see that it has grown from 5 and the new amount of time elapsed has been added.

### BONUS Deliverables:
1. Try adjusting the message printed while the timer is running to print `1 second remaining` instead of `1 seconds remaining`. Hint: Ternary logic is a good fit here.
2. Try using the `formatDuration` method (or logic from it) to handle the case where the time spent on a task is longer than 60 seconds. In that case, your `stopTimer` method should format the returned message including the time spent on the task. Perhaps something like this: `"Time Spent on Task: 2 minutes and 15 seconds"`
3. Handle the case where `stopTimer()` is called before `startTimer()`. What should happen in this case?

🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 