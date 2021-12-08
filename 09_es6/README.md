# Lesson 9 - ES6

## Agenda

- Review examples of ES6 Syntax that you're already familiar with
- Introduce a few new ES6 Features you'll be making more use of in React within Phase 2



## [Top 10 ES6 Features](https://www.boardinfinity.com/blog/top-10-features-of-es6/)

- **let and const Keywords**
- **Arrow Functions**
- **Multi-line Strings**
- **Default Parameters**
- **Template Literals**
- Destructuring Assignment
- **Promises**
- Classes
- Modules

Of these 10 above, we've seen and/or made use of over half of them already (highlighted in bold above)

We can see a [more complete list here](http://es6-features.org/). I'm going to hone in on a few that didn't make the top 10 list that will be useful to keep in mind when you move into the next phase.

## Today's Focus

- Arrow function Syntax Review
- Destructuring Assignment
- Object Property shorthand
- Computed Property Names
- The Spread operator (for objects and arrays)
- Review of Pass by Reference vs Pass by Value


## Arrow functions Syntax

<details>
  <summary>
    When do we need curly braces?
  </summary>
  <hr/>

  When we have a function body containing more than a single expression, the body must be surrounded with curly braces.

  <hr/>

</details>
<br/>

<details>
  <summary>
    When do we need to use the return keyword and when can we skip it?
  </summary>
  <hr/>

  we only need the `return` keyword in an arrow function when we add curly braces after the arrow. If the arrow is followed by a single expression (and no curly braces) the expression's return value will be implicitly returned from the function.

  <hr/>

</details>
<br/>




<details>
  <summary>
    When do we need parentheses around the parameters list?
  </summary>
  <hr/>

  Parentheses are required around the parameters list for all arrow functions except those that accept a single parameter.

  <hr/>

</details>
<br/>

### Arrow functions vs function declarations (function keyword functions)

The main differences here that would actually affect our choice of whether to use an arrow function or a regular function declaration have to do with some concepts in JavaScript that we haven't explored at this point.

For now, it's important to know that arrow functions are a shorthand for function declarations. They work well for most of the common use cases like callbacks for event listeners and fetch calls, but they do have some limitations. There are more advanced use cases where the full functionality of the function declaration is required. You can read more about [when you should use arrow functions in javascript](https://stackoverflow.com/questions/22939130/when-should-i-use-arrow-functions-in-ecmascript-6) in this stack overflow thread.

During the course, you likely won't run into a situation where you'd need to use a function declaration instead of an arrow function, so feel free to use them exclusively if you prefer.

## Object Property shorthand

In ES6, we can create an object containing variables we've defined as values corresponding to their variable names as keys without having to repeat ourselves. Say we have these variables:

```js
const name = "Dakota";
const state = "California";
const favoriteFood = "Indian Curry";
```

We want to build up an object containing that information-maybe so we can use `JSON.stringify` to prepare it for inhabiting the `body` of a PSOT request.

Without the shorthand, we could do:

```js
const body = {
  name: name,
  state: state,
  favoriteFood: favoriteFood
}
JSON.stringify(body);
```

with the shorthand, we can skip the values:

```js
const body = {
  name,
  state,
  favoriteFood
}
JSON.stringify(body);
``` 

Looking at that, we could actually inline this in 1 line:

```js
JSON.stringify({name, state, favoriteFood})
```


## Destructuring Assignment
If we have an object, we can pull multiple properties out of it as variables using destructuring assignment.

```js
const obj = {
  name: 'Dakota',
  state: 'California',
  favoriteFood: 'Indian Curry'
}
const { name, state, favoriteFood } = obj;
console.log(name, state, favoriteFood)
```

This can be especially useful within a parameter list.

Take the following code as an example:
```js
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
```

Inside of this function, we're accessing the `id` and `comment` properties of the `record` passed as an argument. But, we really don't need to access the object as a whole within the function, just its properties.

So, we can destructure those properties directly from the object passed as an argument.

```js
const renderComment = ({id, comment}) => {
  const target = document.querySelector('#comments');
  const p = document.createElement('p');
  p.className = "flex justify-between";
  p.innerHTML = `
  <input class="w-5/6" />
  <button><i class="fas fa-trash-alt"></i></button>
  `
  const input = p.querySelector('input');
  const deleteBtn = p.querySelector('button');
  input.value = comment;
  // add event listeners for updating or deleting a comment
  input.addEventListener('keyup', (e) => {
    updateComment(id, { comment: e.target.value });
  })
  deleteBtn.addEventListener('click', (e) => {
    deleteComment(id)
      .then(() => p.remove())
  })
  target.append(p);
}
```

## The Spread Operator (...)

<details>
  <summary>
    What does the spread operator do?
  </summary>
  <hr/>

  It allows us to spread out the contents of an array or object into another array or object.
    
This is useful for making shallow copies of an existing array or object.
    
We say the copy is shallow because if the original object or array has values that are also objects or arrays, those values are passed by reference.

  <hr/>

</details>
<br/>



```js
const arr1 = [1,2,3];
const arr2 = [3,4,5];
// how could I use the spread operator to 
// get the following array: [1,2,3,4,5,6]
```

## Computed Property Names

If we want to add a property to an object dynamically (where the key is the return value of some expression rather than a literal value) ES6 allows us to surround the property name with `[]` to use the computed value of the expression as the property name. One example of this is the case where we're tracking the current state of a form within an object:

```js
let formState = {};
const inputs = document.querySelectorAll('input')
inputs.forEach(input => input.addEventListener('change', (e) => {
  const {name, value} = e.target;
  formState[name] = value
})
```

This would be fine for now, but the change will actually mutate the `formState` object. 

When we get to React, it will become important not to mutate objects that are keeping track of state, but rather to use them as a starting point to create a modified copy. There are lots of pesky bugs that can occur if we mutate state objects directly. Rather, it's a convention in React to replace the state with a new object without modifying the previous object. 

There are a couple of nice syntaxes in ES6 that we can use for this. Both of them rely on computed property names.

### Object.assign()

`Object.assign()` allows us to merge objects together. It is also destructive of the target object. For example:

```js
formState => Object.assign(formState, {[name]: value})
```

Will use the computed property value of the name of our input as the key to merge into the formState object. The `formState` object is the target object and will be modified by the change. In this case, `formState` will actually refer to the same object as before the change, just the modified version. 

If we want to create a copy, we can pass an empty object as the first argument and then add the other objects as subsequent arguments:

```js
formState => Object.assign({}, formState, {[name]: value})
```
### Object spread {...}

The Object spread operator allows us to do the same with a more compact syntax.

```js
formState => {...formState, [name]: value}
```

This is more frequently seen like this:

```js
formState => return {
  {
    ...formState,
    [name]: value
  }
}
```

These actual examples don't make as much sense now in phase 1, but in react there will be a function you'll call to update the state of your UI. If the new state is derived from the old state, you'll want to pass in another function that will take the old state as an argument and return the new state in such a way that the previous state is not modified. This has to do with the way React works internally and will help prevent bugs that are difficult to diagnose. 

In practice, you'll have a state variable and a function that will update that variable. Rather than updating the variable directly, you'll call the function to assign the new value for the state. The new state will sometimes be based on the original. So, to continue with the example, let's stay we have a state variable called `formState` and a function to update it called `setFormState`. It will actually end up looking something more like this:

```js
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormState(formState => {
    return {
      ...formState,
      [name]: value
    }
  })
}
```

The main reason that we don't just reassign the `formState` variable to a new value in react is that the function we use to update the `formState` variable in React doesn't **only** update the value of the variable. Calling the function to update the `formState` **also** tells React to take a look at our UI and:
1. See if the change to `formState` should result in a change to the DOM.
2. Make the change to the DOM for us if so.

So, it's important that we get clear on what methods we call are destructive (will mutate the object they're called on) and which are not.
## Review of the difference between Pass by Reference and Pass by Value

<details>
  <summary>
    What data types in JavaScript are passed by value?
  </summary>
  <hr/>
    
- Booleans
- Null
- Undefined
- Numbers
- BigInts
- Strings
- Symbols   
  
<hr/>

</details>
<br/>

<details>
  <summary>
    What data types in JavaScript are passed by reference?
  </summary>
  <hr/>

  Objects (includes: arrays, objects, dates, promises, functions and more)

  <hr/>

</details>
<br/>


```js
true === true // => 
null === null // => 
undefined === undefined // => 
1 === 1 // => 
{} === {} // => 
[] === [] // => 
function(){} === function(){} // => 
new Date('2021-12-22') === new Date('2021-12-22') // => 
```

<details>
  <summary>
    How can I tell the difference in practice?
  </summary>
  <hr/>

  For pass by value types, we can do a `===` comparison between two examples of the type that look the same and we'll get true.
    
For pass by reference types, we can do a `===` comparison between two examples of the type that look the same and we'll get false. (Unless we're actually comparing two references to the same object)

  <hr/>

</details>
<br/>

<details>
  <summary>
    Why does the difference between pass by reference and pass by value matter?
  </summary>
  <hr/>

  If we need to avoid mutating objects, we need to pay attention to arguments that are passed by reference. 
    
Reference types can be mutated because the reference to the object/array/function/whatever is passed around.
    
Value types cannot be mutated because they represent a more abstract idea. All interactions with them result in a different example of the same type, not a modified version of the original.
    
```js
let t = true;
let hungry = t;
// negate the value of the hungry variable
hungry = !hungry;
// now hungry refers to `false` instead of `true`
// but the underlying value of `true` remains unaffected
// t still refers to `true`
t === hungry // => 
```
    
Try the same when the value is an object and the result changes
    
```js
let t = {hungry: true};
let hungryObj = t;
// negate the avlue of hungry within the object
hungryObj.hungry = !hungryObj.hungry;
// now hungryObj.hungry refers to `false` instead of true
// while the boolean value itself isn't mutated 
// because it's not a reference type, in this case,
// changing a property of `hungryObj` does affect `t` // because the object is passed by reference when we
// assign `t` as the value for `hungryObj`
t === hungryObj
```

In react, if we're storing a primitive type that will be passed by value, we don't need to worry about modifying the previous state by accident.
    
If we're storing a reference type in state, we do! So, in those cases, we'll create a copy of the original object and modify the copy without affecting the original.
  <hr/>

</details>
<br/>

## Final Aside

### Let and Const vs var

We've focused mainly on working with the ES6 keywords `let` and `const` for declaring variables. This is what you'll be doing in most cases, but you still will see `var` out and about in older codebases. 

One key difference to keep in mind is that `let` and `const` are both block scoped, meaning that we can't create **truly** global variables using either in the same way we can with `var`. If we define a variable using either `let` or `const` , the variable will be available in global scope, but it won't be added as a property of the `window` (global) object.

You may encounter 3rd party libraries offered by other software as a service businesses (like [cloudinary](https://cloudinary.com/) that add a property to the global object that you can access from your code. Using the `var` keyword to declare variables will add them to the global object, `window`. Declaring named functions using the function keyword will also add those functions to the global `window` object.

If you're refactoring old code that uses `var` and converting `function` declarations to arrow functions, make sure to look out for references to those variables or functions that are made directly on the window object (`window.varName` or `window.functionName`) as those will no longer work after you change to the new syntax.

In practice:
- stick with `const`
- use `let` if the variable may be reassigned later on
- avoid using `var`



## Resources

- [Top 10 features in ES6](https://www.boardinfinity.com/blog/top-10-features-of-es6/)
- [When should I use Arrow functions in JavaScript](https://stackoverflow.com/questions/22939130/when-should-i-use-arrow-functions-in-ecmascript-6)
- [Object property shorthand in ES6](https://attacomsian.com/blog/javascript-object-property-shorthand)
- [Instantly Invokved Functional Expressions (IIFE) vs ES6 block scope](https://wesbos.com/es6-block-scope-iife)
- [ES6 Features List](http://es6-features.org/)
- [caniuse.com](https://caniuse.com/)