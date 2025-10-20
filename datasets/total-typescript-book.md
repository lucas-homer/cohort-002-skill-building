Before diving into TypeScript, let's take a moment to talk about its foundation — JavaScript.

JavaScript is the language that makes web pages interactive. Any modern website will utilize some amount of it. And the more complex the site, the more complex the JavaScript.

But, unlike other coding languages, JavaScript was not built for building complex systems.

If you were building JavaScript apps in the 2000's, you were often having a bad time. Your IDE (integrated development environment) was lacking basic features. Autocomplete. Inline errors. There was no way to know if you were passing the right arguments to the right function. As users began demanding more complex experiences online, this made working with JavaScript a nightmare.

This was especially true for refactoring code. If you had to change a function signature, you had to manually find and update every place that function was called throughout your entire codebase. This could take hours, and with no guarantee that you'd fixed everything before you pushed to production.

## TypeScript's Beginnings

As limitations like these became more apparent, developers started looking for a better way to write JavaScript.

Around 2010, Microsoft noticed that a lot of their teams were using a community project called Script# (ScriptSharp) to build their JavaScript apps. This library allowed developers to write code in C#, and then turn it to JavaScript. C# had excellent features for building large applications - so it made the experience of building these apps more pleasant. In fact, many teams had found this was the only way they could build complex applications in large teams.

Anders Hejlsberg, the creator of C#, was tasked to investigate this phenomenon. He was astonished. People were so annoyed with JavaScript that they were willing to code in a completely different language in order to get the powerful IDE features they were used to.

So he thought: what if we create a new language that was closer to JavaScript, but that enabled all the IDE features that JavaScript is missing?

Thus, TypeScript was born. (And yes, the inventor of C# was also the inventor of TypeScript. Not bad.)

In the decade or so since its introduction, TypeScript has grown to become a staple of modern development. In many metrics, it is even more popular than JavaScript.

In this book, you'll learn why it has become so popular, and how it can help you develop better applications while making your life as a developer easier.

## How TypeScript Works

With a JavaScript-only project, you would typically write your code in files with a `.js` file extension. These files are then able to be directly executed in the browser or a runtime environment like Node.js (which is used to run JavaScript on servers, or on your laptop). The JavaScript you write is the JavaScript that gets executed.

![](images/image5.png)

If you're testing whether your code works, you need to test it inside the runtime - the browser or Node.js.

For a TypeScript project, your code is primarily inside of `.ts` files.

Inside your IDE, these files are monitored by TypeScript's 'language server'. This server watches you as you type, and powers IDE features like autocompletion and error checking, among others.

Unlike a `.js` file, `.ts` files can't usually be executed directly by the browser or a runtime. Instead, they require an initial build process.

This is where TypeScript's `tsc` CLI comes in, which transforms your `.ts` files into `.js` files. You are able to take advantage of TypeScript's features while writing your code, but the output is still plain JavaScript.

![](images/image4.png)

The great benefit of this system is that you get in a feedback loop with TypeScript. You write code. The in-IDE server gives you feedback. You adjust based on the feedback. And all of this happens before your code goes into the browser. This loop is much faster than JavaScript's, so can help you create higher-quality code faster.

> Automated testing can also provide a high-quality feedback loop. While we won't cover this in this book, automated tests are a great companion to TypeScript for creating extremely high-quality code.

So, while TypeScript's build process is more complex than JavaScript's, the benefits are well worth it.

## What's Different About TypeScript?

The thing that makes TypeScript from JavaScript different can be summed up in a single word: types.

But there's a common misconception here. People think that TypeScript's core mission is to make JavaScript a strongly typed language, like C# or Rust. This is not quite accurate.

TypeScript wasn't invented to make JavaScript strongly typed. It was built to allow amazing tooling for JavaScript.

Imagine you're building an IDE, and you want to give people warnings when they mis-type a function name or an object property. If you don't know the shapes of the variables, parameters and objects in your code, you'd have to resort to guesswork.

But if you do know the types of everything in your app, you can begin implementing powerful IDE features like autocomplete, inline errors and automatic refactors.

So, TypeScript aims to provide just enough strong typing to make working with JavaScript more pleasant and productive.

## Tools for TypeScript Development

Let's break down the tools you need in order to work with TypeScript:

- An IDE: In order to write code, you need an editor or Integrated Development Environment. While you can use any IDE, the assumption in this book is that you are using Microsoft's Visual Studio Code. The TypeScript integration with VS Code is excellent, as you will see shortly. Install it from https://code.visualstudio.com if you haven't already.
- An Execution Environment: You need somewhere to run your emitted JavaScript. This could be Node.js or a web browser like Chrome.
- The TypeScript CLI: Node.js is needed in order to run the TypeScript CLI (command line interface). This tool converts your TypeScript to JavaScript, and warns you of any issues in your project.

### Installing Node.js

The Node.js installer can be downloaded from the [Node.js website](https://nodejs.org/).

When you visit the site, you'll see two options: LTS and Current.

LTS is short for "Long Term Support". This is the recommended version for production use. It's the most stable version, and the one we'll be using in this book.

The Current version contains the latest features, but it's not recommended for production use.

Click the LTS button to download the installer and follow the installation instructions.

After running the installer, you can verify it installed correctly by opening a terminal and running the following command:

```
node -v
```

If Node.js is installed correctly, this command will display the version number. If you see an error message like "node command not found," it means the installation was not successful, and you should try again.

### Alternative Package Management with PNPM

Node.js includes the `npm` package manager by default.

If you've worked with JavaScript repositories, you're likely familiar with `npm` and the `package.json` file. The `package.json` file represents all the packages we need to install to run the code in the repository.

For example, in the repository for this material, we have a special CLI for running exercises along with helper packages and various other dependencies like `cross-fetch` and `nodemon`:

```json
// package.json

{
  "devDependencies": {
    "@total-typescript/exercise-cli": "0.4.0",
    "@total-typescript/helpers": "~0.0.1",
    "cross-fetch": "~3.1.5",
    "nodemon": "~3.0.1",
    "npm-run-all": "~4.1.5",
    "prettier": "~2.8.7",
    "typescript": "~5.2.2",
    "vite-tsconfig-paths": "~4.0.7",
    "vitest": "0.34.4"
  }
}
```

To install these packages, you would typically run the `npm install` command, which downloads them from the npm registry into your `node_modules` folder. The `node_modules` folder contains JavaScript files that the exercises in the `src` directory need to run.

However, for the book's repository we will be using the PNPM package manager instead.

`pnpm` is used the same way as `npm`, but it is more efficient. Instead of having individual `node_modules` folders for each project, `pnpm` uses a single location on your computer and hard links the dependencies from there. This makes it run faster and use less disk space. I use PNPM in all my projects.

To install PNPM, follow the instructions provided in the [official documentation](https://pnpm.io/installation).

## Installing TypeScript

TypeScript and its dependencies are contained within a single package, called typescript.

You can install it globally with either pnpm or npm:

```
pnpm add -g typescript
```

or

```
npm install –-global typescript
```

TypeScript is usually also installed in your `package.json` to make sure that all developers using the project are using the same version. For the purposes of this book, a global installation will do just fine.


--- CHAPTER ---

TypeScript works the same no matter what IDE you use, but for this book we'll assume you're using Visual Studio Code (VS Code).

When you open VS Code, the TypeScript server starts in the background. It will be active as long as you have a TypeScript file open.

Let's take a look at some of the awesome VS Code features that are powered by the TypeScript server.

## Autocomplete

If I were to name the single TypeScript feature I couldn't live without, it would be autocomplete.

TypeScript knows what type everything is inside your app. Because of that, it can give you suggestions when you're typing - speeding you up enormously.

In the example below, just typing 'p' after `audioElement` brings up all the properties which start with 'p'.

```typescript
const audioElement = document.createElement("audio");

audioElement.p; // play, pause, part etc
```

This is really powerful for exploring APIs you might not be familiar with, like the `HTMLAudioElement` API in this case.

### Manually Triggering Autocomplete

You'll often want to manually trigger autocomplete. In VS Code, the `Ctrl + Space` keyboard shortcut will show you a list of suggestions for what you're typing.

For example, if you were adding an event listener to an element, you would see a list of available events:

```typescript
document.addEventListener(
  "", // autocomplete here
);
```

Hitting the `Ctrl + Space` shortcut with the cursor inside the quotes will show you a list of events that can be listened for:

```
DOMContentLoaded
abort
animationcancel
...
```

If you wanted to narrow down the list to the events you were interested in, you could type "drag" before hitting `Ctrl + Space` and only the appropriate events would display:

```
drag
dragend
dragenter
dragleave
...
```

Autocomplete is an essential tool for writing TypeScript code, and it's available right out of the box in VS Code.

### Exercises

#### Exercise 1: Autocomplete

Here's an example of some code where autocomplete can be triggered:

```typescript
const acceptsObj = (obj: { foo: string; bar: number; baz: boolean }) => {};

acceptsObj({
  // Autocomplete in here!
});
```

Practice using the autocomplete shortcut to fill in the object when calling `acceptsObj`.

<Exercise title="Exercise 1: Autocomplete" filePath="/src/016.5-ide-superpowers/044-manually-triggering-autocomplete.problem.ts"></Exercise>

#### Solution 1: Autocomplete

When you hit `Ctrl + Space` inside the object, you'll see a list of the possible properties based on the `MyObj` type:

```typescript
bar;
baz;
foo;
```

As you select each property, the autocomplete list will update to show you the remaining properties.

## TypeScript Error Checking

The thing TypeScript is most famous for is its errors. These are a set of rules which TypeScript uses to make sure your code is doing what you think it's doing.

For every change you make to a file, the TypeScript server will check your code.

If the TypeScript server finds any errors, it will tell VS Code to draw a red squiggly line under the part of the code that has a problem. Hovering over the underlined code will show you the error message. Once you make a change, the TypeScript server will check again and remove the red squiggly line if the error is fixed.

I like to think of it like a teacher hovering over your shoulder, underlining your work in red pen while you type.

Let's look at these errors a bit more deeply.

### Catching Runtime Errors

Sometimes TypeScript will warn you about things that will definitely fail at runtime.

For example, consider the following code:

```ts twoslash
// @errors: 18047
const a = null;

a.toString();
```

TypeScript tells us that there is a problem with `a`. This tells us where the problem is, but it doesn't necessarily tell us what the problem is. In this case, we need to stop and think about why we can't call `toString()` on `null`. If we do, it will throw an error at runtime.

```
Uncaught TypeError: Cannot read properties of null (reading 'toString').
```

Here, TypeScript is telling us that an error might happen even without us needing to check it. Very handy.

### Warnings About Non-Runtime Errors

Not everything TypeScript warns us about will actually fail at runtime.

Take a look at this example where we're assigning a property to an empty object:

```ts twoslash
// @errors: 2339
const obj = {};

const result = obj.foo;
```

TypeScript draws a red squiggly line below `foo`. But if we think about it, this code won't actually cause an error at runtime. We're trying to assign a property that doesn't exist in this object: `foo`. This won't error, it will just mean that result is undefined.

It may seem strange that TypeScript would warn us about something that won't cause an error, but it's actually a good thing. If TypeScript didn't warn us about this, it would be saying that we can access any property on any object at any time. Over the course of an entire application, this could result in quite a few bugs.

It's best to think of TypeScript's rules as opinionated. They are a collection of helpful tips that will make your application safer as a whole.

### Warnings Close to the Source of the Problem

TypeScript will try to give you warnings as close to the source of the problem as possible.

Let's take a look at an example.

```ts twoslash
// @errors: 2561
type Album = {
  artist: string;
  title: string;
  year: number;
};

const album: Album = {
  artsist: "Television",
  title: "Marquee Moon",
  year: 1977,
};
```

We define an 'Album' type - an object with three properties. Then, we say that const album needs to be of that type via `const album: Album`. Don't worry if you don't understand all the syntax yet - we'll cover it all later.

Can you see the problem? There's a typo of the `artist` property when creating an album. That's because we've said that the `album` variable needs to be of type `Album`, but we've misspelled `artist` as `artsist`. TypeScript is telling us that we've made a mistake, and even suggests the correct spelling.

### Dealing With Multi-Line Errors

However, sometimes TypeScript will give you an error in a more unhelpful spot.

In this example, we have a function called `logUserJobTitle` that logs the job title of a user:

```typescript
const logUserJobTitle = (user: {
  job: {
    title: string;
  };
}) => {
  console.log(user.job.title);
};
```

Don't worry about the syntax for now - we'll cover it later. The important thing is that `logUserJobTitle` takes a user object with a `job` property that has a `title` property.

Now, let's call `logUserJobTitle` with a user object where the `job.title` is a number, not a string.

```ts twoslash
// @errors: 2345
const logUserJobTitle = (user: {
  job: {
    title: string;
  };
}) => {
  console.log(user.job.title);
};

// ---cut---
const exampleUser = {
  job: {
    title: 123,
  },
};

logUserJobTitle(exampleUser);
```

It might seem like TypeScript should give us an error on `title` in the `exampleUser` object. But instead, it gives us an error on the `exampleUser` variable itself.

It's multiple lines long, which can feel pretty scary. A good rule of thumb with multi-line errors is to start at the bottom:

```
Type 'number' is not assignable to type 'string'.
```

This tells us that a `number` is being passed into a slot where a `string` is expected. This is the root of the problem.

Let's go to the next line:

```
The types of 'job.title' are incompatible between these types.
```

This tells us that the `title` property in the `job` object is the problem.

Already, we understand the issue without needing to see the top line, which is usually a long summary of the problem.

Reading errors bottom-to-top can be a helpful strategy when dealing with multi-line TypeScript errors.

## Introspecting Variables and Declarations

You can hover over more than just error messages. Any time you hover over a variable or declaration, VS Code will show you information about it.

In this example, we could hover over `thing` and see that it's of type `number`:

```ts twoslash
let thing = 123;
//  ^?
```

Hovering works for more involved examples as well. Here `otherObject` spreads in the properties of `otherThing` as well as adding `thing`:

```typescript
let otherThing = {
  name: "Alice",
};

const otherObject = {
  ...otherThing,
  thing: "abc",
};

otherObject.thing;
```

Hovering over `otherObject` will give us a computed readout of all of its properties:

```ts twoslash
let otherThing = {
  name: "Alice",
};

const otherObject = {
  ...otherThing,
  thing: "abc",
};

// ---cut---
console.log(otherObject);
//          ^?
```

Depending on what you hover over, VS Code will show you different information. For example, hovering over `otherObject` will show you all of its properties, while hovering over `thing` will show you its type.

Get used to the ability to float around your codebase introspecting variables and declarations, because it's a great way to understand what the code is doing.

### Exercises

#### Exercise 1: Hovering a Function Call

In this code snippet we're trying to grab an element using `document.getElementById` with an ID of `12`. However, TypeScript is complaining.

```ts twoslash
// @errors: 2345
let element = document.getElementById(12);
```

How can hovering help to determine what argument `document.getElementById` actually requires? And for a bonus point, what type is `element`?

<Exercise title="Exercise 1: Hovering a Function Call" filePath="/src/016.5-ide-superpowers/041-hovering-a-function-call.problem.ts"></Exercise>

#### Solution 1: Hovering a Function Call

First of all, we can hover over the red squiggly error itself. In this case, hovering over `12`, we get the following error message:

```
Argument of type 'number' is not assignable to parameter of type 'string'.
```

We'll also get a readout of the `getElementById` function:

```
(method) Document.getElementById(elementId: string): HTMLElement | null
```

In the case of `getElementById`, we can see that it requires a string as an argument, and it returns an `HTMLElement | null`. We'll look at this syntax later, but it basically means either a `HTMLElement` or `null`.

This tells us that we can fix the error by changing the argument to a string:

```ts twoslash
let element = document.getElementById("12");
//  ^?
```

We also know that `element`'s type will be what `document.getElementById` returns, which we can confirm by hovering over `element`.

So, hovering in different places reveals different information. When I'm working in TypeScript, I hover constantly to get a better sense of what my code is doing.

## JSDoc Comments

JSDoc is a syntax for adding documentation to the types and functions in your code. It allows VS Code to show additional information in the popup that shows when hovering.

This is extremely useful when working with a team

Here's an example of how a `logValues` function could be documented:

````typescript
/**
 * Logs the values of an object to the console.
 *
 * @param obj - The object to log.
 *
 * @example
 * ```ts
 * logValues({ a: 1, b: 2 });
 * // Output:
 * // a: 1
 * // b: 2
 * ```
 */

const logValues = (obj: any) => {
  for (const key in obj) {
    console.log(`${key}: ${obj[key]}`);
  }
};
````

The `@param` tag is used to describe the parameters of the function. The `@example` tag is used to provide an example of how the function can be used, using markdown syntax.

There are many, many more tags available for use in JSDoc comments. You can find a full list of them in the [JSDoc documentation](https://jsdoc.app/).

Adding JSDoc comments is a useful way to communicate the purpose and usage of your code, whether you're working on a library, a team, or your own personal projects.

### Exercises

#### Exercise 1: Adding Documentation for Hovers

Here's a simple function that adds two numbers together:

```typescript
const myFunction = (a: number, b: number) => {
  return a + b;
};
```

In order to understand what this function does, you'd have to read the code.

Add some documentation to the function so that when you hover over it, you can read a description of what it does.

<Exercise title="Exercise 1: Adding Documentation For Hovers" filePath="/src/016.5-ide-superpowers/042-adding-tsdoc-comments-for-hovers.problem.ts"></Exercise>

#### Solution 1: Adding Documentation for Hovers

In this case, we'll specify that the function "Adds two numbers together". We can also use an `@example` tag to show an example of how the function is used:

```typescript
/**
 * Adds two numbers together.
 * @example
 * myFunction(1, 2);
 * // Will return 3
 */

const myFunction = (a: number, b: number) => {
  return a + b;
};
```

Now whenever you hover over this function, the signature of the function along with the comment and full syntax highlighting for anything below the `@example` tag:

```
// hovering over myFunction shows:

const myFunction: (a: number, b: number) => number

Adds two numbers together.

@example

myFunction(1, 2);

// Will return 3
```

While this example is trivial (we could, of course, just name the function better), this can be an extremely important tool for documenting your code.

## Navigating with Go To Definition and Go To References

The TypeScript server also provides the ability to navigate to the definition of a variable or declaration.

In VS Code, this "Go to Definition" shortcut is used with `Command + Click` on a Mac or `F12` on Windows for the current cursor position. You can also right click and select "Go to Definition" from the context menu on either platform. For the sake of brevity, we'll use the Mac shortcut.

Once you've arrived at the definition location, repeating the `Command + Click` shortcut will show you everywhere that the variable or declaration is used. This is called "Go To References". This is especially useful for navigating around large codebases.

The shortcut can also be used for finding the type definitions for built-in types and libraries. For example, if you `Command + Click` on `document` when using the `getElementById` method, you'll be taken to the type definitions for `document` itself.

This is a great feature for understanding how built-in types and libraries work.

## Rename Symbol

In some situations, you might want to rename a variable across your entire codebase. Let's imagine that a database column changes from 'id' to 'entityId'. A simple find and replace won't work, because 'id' is used in many places for different purposes.

A TypeScript-enabled feature called 'Rename Symbol' allows you to do that with a single action.

Let's take a look at an example.

```typescript
const filterUsersById = (id: string) => {
  return users.filter((user) => user.id === id);
};
```

Right click on the `id` parameter of the `findUsersById` function and select "Rename Symbol".

A panel will be displayed that prompts for the new name. Type in `userIdToFilterBy` and hit `enter`. VS Code is smart enough to realize that we only want to rename the `id` parameter for the function, and not the `user.id` property:

```typescript
const filterUsersById = (userIdToFilterBy: string) => {
  return users.filter((user) => user.id === userIdToFilterBy);
};
```

The rename symbol feature is a great tool for refactoring code, and it works across multiple files as well.

## Automatic Imports

Large JavaScript applications can be composed of many, many modules. Manually importing from other files can be tedious. Fortunately, TypeScript supports automatic imports.

When you start typing the name of a variable you want to import, TypeScript will show a list of suggestions when you use the `Ctrl + Space` shortcut. Select a variable from the list, and TypeScript will automatically add an import statement to the top of the file.

You do need to be a little bit careful when using autocompletion in the middle of a name since the rest of the line could be unintentionally altered. To avoid this issue, make sure your cursor is at the end of the name before hitting `Ctrl + Space`.

## Quick Fixes

VS Code also offers a "Quick Fix" feature that can be used to run quick refactor scripts. For now, let's use it to import multiple missing imports at the same time.

To open the Quick Fix menu, hit `Command + .`. If you do this on a line of code which references a value that hasn't been imported yet, a popup will show.

```ts twoslash
// @errors: 2552
const triangle = new Triangle();
```

One of the options in the Quick Fix menu will be 'Add All Missing Imports'. Selecting this option will add all the missing imports to the top of the file.

```typescript
import { Triangle } from "./shapes";

const triangle = new Triangle();
```

We'll look at the Quick Fixes menu again in the exercises. It provides a lot of options for refactoring your code, and it's a great way to learn about TypeScript's capabilities.

## Restarting the VS Code Server

We've looked at several examples of the cool things that TypeScript can do for you in VS Code. However, running a language server is not a simple task. The TypeScript server can sometimes get into a bad state and stop working properly. This might happen if configuration files are changed or when working with a particularly large codebase.

If you're experiencing strange behavior, it's a good idea to restart the TypeScript server. To do this, open the VS Code Command Palette with `Shift + Command + P`, then search for "Restart TS Server".

After a couple of seconds, the server should kick back into gear and ensure that errors are being reported properly.

## Working in JavaScript

If you're a JavaScript user, you might have noticed that lots of these features are already available without using TypeScript. Autocomplete, organizing imports, auto imports and hovering all work in JavaScript. Why is that?

It's because of TypeScript. TypeScript's IDE server is not just running on TypeScript files, but on JavaScript files too. That means that some of TypeScript's amazing IDE experience is also available in JavaScript.

Some features aren't available in JavaScript out of the box. The most prominent is in-IDE errors. Without type annotations, TypeScript isn't confident enough about the shape of your code to give you accurate warnings.

> TIP: There is a system for adding types to `.js` files using JSDoc comments which TypeScript supports, but it isn't enabled by default. We'll learn how to configure it later.

The reason TypeScript does this is, first of all, to support a better experience working in JavaScript for VS Code users. A subset of TypeScript's features is better than nothing at all.

But the upshot is that moving to TypeScript should feel extremely familiar for JavaScript users. It's the same IDE experience, just better.

## Exercises

### Exercise 1: Quick Fix Refactoring

Let's revisit VS Code's Quick Fixes menu we looked at earlier.

In this example, we have a function that contains a `randomPercentage` variable, which is created by calling `Math.random()` and converting the result to a fixed number:

```typescript
const func = () => {
  // Refactor this to be its own function
  const randomPercentage = `${(Math.random() * 100).toFixed(2)}%`;

  console.log(randomPercentage);
};
```

The goal here is to refactor the logic that generates the random percentage into its own separate function.

Highlight a variable, line, or entire code block then hit `Command + .` to open the Quick Fix menu. There will be several options for modifying the code, depending on where your cursor is when you open the menu.

Experiment with different options to see how they affect the example function.

<Exercise title="Exercise 1: Quick Fix Refactoring" filePath="/src/016.5-ide-superpowers/050-refactor.problem.ts"></Exercise>

### Solution 1: Quick Fix Refactoring

The Quick Fix menu will show different refactoring options depending on where your cursor is when you open it.

#### Inlining Variables

If you target `randomPercentage`, you can select an "Inline variable" option.

This would remove the variable and inline its value into the `console.log`:

```typescript
const func = () => {
  console.log(`${(Math.random() * 100).toFixed(2)}%`);
};
```

#### Extracting Constants

When selecting a smaller portion of code like `Math.random() * 100`, the option to "Extract constant in enclosing scope" will appear.

Selecting this option creates a new local variable that you are prompted to name, and assigns the selected value to it. After saving and running a code formatter, everything is cleaned up nicely:

```typescript
const func = () => {
  const randomTimes100 = Math.random() * 100;

  const randomPercentage = `${randomTimes100.toFixed(2)}%`;

  console.log(randomPercentage);
};
```

Similarly, the "Extract to Constant in Module Scope" option will create a new constant in the module scope:

```typescript
const randomTimes100 = Math.random() * 100;

const func = () => {
  const randomPercentage = `${randomTimes100.toFixed(2)}%`;

  console.log(randomPercentage);
};
```

#### Inlining and Extracting Functions

Selecting the entire random percentage logic enables some other extraction options.

The "Extract to function in module scope" option will act similarly to the constant option, but create a function instead:

```typescript
const func = () => {
  const randomPercentage = getRandomPercentage();

  console.log(randomPercentage);
};

function getRandomPercentage() {
  return `${(Math.random() * 100).toFixed(2)}%`;
}
```

These are just some of the options provided by the Quick Fix menu. There's so much you can achieve with them, and we're only scratching the surface. Keep exploring and experimenting to discover their full potential!


--- CHAPTER ---

We've explored the relationship between JavaScript and TypeScript, and also how TypeScript improves your life as a developer. But let's go a bit deeper. In this chapter we'll get the TypeScript CLI up and running, and see how it fits into the development pipeline.

As an example, we'll be looking at using TypeScript to build a web application. But TypeScript can also be used anywhere JavaScript can - in a Node, Electron, React Native or any other app.

## The Problem with TypeScript in the Browser

Consider this TypeScript file `example.ts` that contains a `run` function that logs a message to the console:

```ts twoslash
const run = (message: string) => {
  console.log(message);
};

run("Hello!");
```

Alongside the `example.ts` file, we have a basic `index.html` file that references the `example.ts` file in a script tag.

```html
<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <title>My App</title>
  </head>

  <body>
    <script src="example.ts"></script>
  </body>
</html>
```

However, when we try to open the `index.html` file in a browser, you'll see an error in the console:

```
Unexpected token ':'
```

There aren't any red lines in the TypeScript file, so why is this happening?

### Runtimes Can't Run TypeScript

The problem is that browsers (and other runtimes like Node.js) can't understand TypeScript on their own. They only understand JavaScript.

In the case of the `run` function, the `: string` after `message` in the function declaration is not valid JavaScript:

```ts twoslash
const run = (message: string) => {
  // `: string` is not valid JavaScript!

  console.log(message);
};
```

Removing `: string` gives us something that looks a bit more like JavaScript, but now TypeScript displays an error underneath `message`:

```ts twoslash
// @errors: 7006
const run = (message) => {};
```

Hovering over the red squiggly line in VS Code, we can see that TypeScript's error message is telling us that `message` implicitly has an `any` type.

We'll get into what that particular error means later, but for now the point is that our `example.ts` file contains syntax that the browser can't understand, but the TypeScript CLI isn't happy when we remove it.

So, in order to get the browser to understand our TypeScript code, we need to turn it into JavaScript.

## Transpiling TypeScript

The process of turning TypeScript into JavaScript (called 'transpilation') can be handled by the TypeScript CLI `tsc`, which is installed when you install TypeScript. But before we can use `tsc`, we need to set up our TypeScript project.

Open a terminal, and navigate to the parent directory of `example.ts` and `index.html`.

To double check that you have TypeScript installed properly, run `tsc --version` in your terminal. If you see a version number, you're good to go. Otherwise, install TypeScript globally with PNPM by running:

```bash
pnpm add -g typescript
```

With our terminal open to the correct directory and TypeScript installed, we can initialize our TypeScript project.

### Initializing a TypeScript Project

In order for TypeScript to know how to transpile our code, we need to create a `tsconfig.json` file in the root of our project.

Running the following command will generate the `tsconfig.json` file:

```bash
tsc --init
```

Inside of the newly created `tsconfig.json` file, you will find a number of useful starter configuration options as well as many other commented out options.

For now, we'll just stick with the defaults:

```json
// excerpt from tsconfig.json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

With our `tsconfig.json` file in place, we can begin transpilation.

### Running `tsc`

Running the `tsc` command in the terminal without any arguments will take advantage of the defaults in `tsconfig.json` and transpile all TypeScript files in the project to JavaScript.

```bash
tsc
```

In this case, this means that our TypeScript code in `example.ts` file will become JavaScript code inside of `example.js`.

Inside of `example.js`, we can see that the TypeScript syntax has been transpiled into JavaScript:

```javascript
// Inside of the example.js file

"use strict";

const run = (message) => {
  console.log(message);
};

run("Hello!");
```

Now that we have our JavaScript file, we can update the `index.html` file to reference `example.js` instead of `example.ts`:

```html
// inside of index.html

<script src="example.js"></script>
```

Opening the `index.html` file in the browser will now show the expected "Hello!" output in the console without any errors!

### Does TypeScript Change My JavaScript?

Looking at our JavaScript file, we can see how little has changed from the TypeScript code.

```javascript
"use strict";

const run = (message) => {
  console.log(message);
};

run("Hello!");
```

It's removed the `: string` from the `run` function, and added `"use strict";` to the top of the file. But other than that, the code is identical.

This is a key guiding principle for TypeScript - it gives you a thin layer of syntax on top of JavaScript, but it doesn't change the way your code works. It doesn't add runtime validation. It doesn't attempt to optimise your code's performance.

It just adds types (to give you better DX), and then removes them when it's time to turn your code into JavaScript.

> There are some exceptions to this guiding principle, such as enums, namespaces and class parameter properties - but we'll cover those later.

### A Note on Version Control

We've successfully transpiled our TypeScript code to JavaScript, but we've also added a new file to our project. Adding a `.gitignore` file to the root of the project and including `*.js` will prevent the JavaScript files from being added to version control.

This is important, because it communicates to other developers using the repo that the `*.ts` files are the source of truth for the JavaScript.

## Running TypeScript in Watch Mode

You might have noticed something. If you make some changes to your TypeScript file, you'll need to run `tsc` again in order to see the changes in the browser.

This will get old fast. You might forget it, and wonder why your changes aren't yet in the browser. Fortunately, the TypeScript CLI has a `--watch` flag that will automatically recompile your TypeScript files on save:

```
tsc --watch
```

To see it in action, open VS Code with the `example.ts` and `example.js` files side by side.

If you change the `message` being passed to the `run` function in `example.ts` to something else, you'll see the `example.js` file update automatically.

## Errors In The TypeScript CLI

If `tsc` encounters an error, it will display the error in the terminal and the file with the error will be marked with a red squiggly line in VS Code.

For example, try changing the `message: string` to `message: number` in the `run` function inside of `example.ts`:

```ts twoslash
// @errors: 2345
const run = (message: number) => {
  console.log(message);
};

run("Hello world!");
```

Inside the terminal, `tsc` will display an error message:

```
// inside the terminal

Argument of type 'string' is not assignable to parameter of type 'number'.

run("Hello world!");

Found 1 error. Watching for file changes.

```

Reversing the change back to `message: string` will remove the error and the `example.js` file will again update automatically.

Running `tsc` in watch mode is extremely useful for automatically compiling TypeScript files and catching errors as you write code.

It can be especially useful on large projects because it checks the entire project. This is different to your IDE, which only shows the errors of the file that's currently open.

## TypeScript With Modern Frameworks

The setup we have so far is pretty simple. A TypeScript file, a `tsc –watch` command, and a JavaScript file. But in order to build a frontend app, we're going to need to do a lot more. We'll need to handle CSS, minification, bundling, and a lot more. TypeScript can't help us with all of that.

Fortunately, there are many frontend frameworks that can help.

Vite is one example of a frontend tooling suite that not only transpiles `.ts` files to `.js` files, but also provides a dev server with Hot Module Replacement. Working with an HMR setup allows you to see changes in your code reflected in the browser without having to manually reload the page.

But there's a drawback. While Vite and other tools handle the actual transpilation of TypeScript to JavaScript, they don't provide type checking out of the box. This means that you could introduce errors into your code and Vite would continue running the dev server without telling you. It would even allow you to push errors into production, because it doesn't know any better.

So, we still need the TypeScript CLI in order to catch errors. But if Vite is transpiling our code, we don't need TypeScript to do it too.

### TypeScript as a Linter

Fortunately, we can configure TypeScript's CLI to allow for type checking without interfering with our other tools.

Inside the `tsconfig.json` file, there's an option called `noEmit` that tells `tsc` whether or not to emit JavaScript files.

By setting `noEmit` to `true`, no JavaScript files will be created when you run `tsc`. This makes TypeScript act more like a linter than a transpiler. This makes a `tsc` step a great addition to a CI/CD system, since it can prevent merging a pull request with TypeScript errors.

Later in the book, we'll look closer at more advanced TypeScript configurations for application development.


--- CHAPTER ---

Now we've covered most of the why of TypeScript, it's time to start with the how. We'll cover key concepts like type annotations and type inference, as well as how to start writing type-safe functions.

It's important to build a solid foundation, as everything you'll learn later builds upon what you'll learn in this chapter.

## Basic Annotations

One of the most common things you'll need to do as a TypeScript developer is to annotate your code. Annotations tell TypeScript what type something is supposed to be.

Annotations will often use a `:` - this is used to tell TypeScript that a variable or function parameter is of a certain type.

### Function Parameter Annotations

One of the most important annotations you'll use is for function parameters.

For example, here is a `logAlbumInfo` function that takes in a `title` string, a `trackCount` number, and an `isReleased` boolean:

```ts twoslash
const logAlbumInfo = (
  title: string,
  trackCount: number,
  isReleased: boolean,
) => {
  // implementation
};
```

Each parameter's type annotation enables TypeScript to check that the arguments passed to the function are of the correct type. If the type doesn't match up, TypeScript will show a squiggly red line under the offending argument.

```ts twoslash
// @errors: 2345
const logAlbumInfo = (
  title: string,
  trackCount: number,
  isReleased: boolean,
) => {
  // implementation
};

// ---cut---
logAlbumInfo("Black Gold", false, 15);
```

In the example above, we would first get an error under `false` because a boolean isn't assignable to a number.

```ts twoslash
// @errors: 2345
const logAlbumInfo = (
  title: string,
  trackCount: number,
  isReleased: boolean,
) => {
  // implementation
};

// ---cut---
logAlbumInfo("Black Gold", 20, 15);
```

After fixing that, we would have an error under `15` because a number isn't assignable to a boolean.

### Variable Annotations

As well as function parameters, you can also annotate variables.

Here's an example of some variables, with their associated types.

```ts twoslash
let albumTitle: string = "Midnights";
let isReleased: boolean = true;
let trackCount: number = 13;
```

Notice how each variable name is followed by a `:` and its primitive type before its value is set.

Variable annotations are used to explicitly tell TypeScript what we expect the types of our variables to be.

Once a variable has been declared with a specific type annotation, TypeScript will ensure the variable remains compatible with the type you specified.

For example, this reassignment would work:

```ts twoslash
let albumTitle: string = "Midnights";

albumTitle = "1989";
```

But this one would show an error:

```ts twoslash
// @errors: 2322
let isReleased: boolean = true;

isReleased = "yes";
```

TypeScript's static type checking is able to spot errors at compile time, which is happening behind the scenes as you write your code.

In the case of the `isReleased` example above, the error message reads:

```txt
Type 'string' is not assignable to type 'boolean'.
```

In other words, TypeScript is telling us that it expects `isReleased` to be a boolean, but instead received a `string`.

It's nice to be warned about these kinds of errors before we even run our code!

### The Basic Types

TypeScript has a number of basic types that you can use to annotate your code. Here are a few of the most common ones:

```ts twoslash
let example1: string = "Hello World!";
let example2: number = 42;
let example3: boolean = true;
let example4: symbol = Symbol();
let example5: bigint = 123n;
let example6: null = null;
let example7: undefined = undefined;
```

Each of these types is used to tell TypeScript what type a variable or function parameter is supposed to be.

You can express much more complex types in TypeScript: arrays, objects, functions and much more. We'll cover these in later chapters.

### Type Inference

TypeScript gives you the ability to annotate almost any value, variable or function in your code. You might be thinking “wait, do I need to annotate everything? That's a lot of extra code.”

As it turns out, TypeScript can infer a lot from the context that your code is run.

#### Variables Don't Always Need Annotations

Let's look again at our variable annotation example, but drop the annotations:

```ts twoslash
let albumTitle = "Midnights";
let isReleased = true;
let trackCount = 13;
```

We didn't add the annotations, but TypeScript isn't complaining. What's going on?

Try hovering your cursor over each variable.

```ts twoslash
// hovering over each variable name

let albumTitle: string;
let isReleased: boolean;
let trackCount: number;
```

Even though they aren't annotated, TypeScript is still picking up the type that they're each supposed to be. This is TypeScript inferring the type of the variable from usage.

It behaves as if we'd annotated it, warning us if we try to assign it a different type from what it was assigned originally:

```ts twoslash
// @errors: 2322

let isReleased = true;

isReleased = "yes";
```

And also giving us autocomplete on the variable:

```ts
albumTitle.toUpper; // shows `toUpperCase` in autocomplete
```

This is an extremely powerful part of TypeScript. It means that you can mostly _not_ annotate variables and still have your IDE know what type things are.

#### Function Parameters Always Need Annotations

But type inference can't work everywhere. Let's see what happens if we remove the type annotations from the `logAlbumInfo` function's parameters:

```ts twoslash
// @errors: 7006
const logAlbumInfo = (
  title,

  trackCount,

  isReleased,
) => {
  // rest of function body
};
```

On its own, TypeScript isn't able to infer the types of the parameters, so it shows an error under each parameter name.

This is because functions are very different to variables. TypeScript can see what value is assigned to which variable, so it can make a good guess about the type.

But TypeScript can't tell from a function parameter alone what type it's supposed to be. When you don't annotate it, it defaults the type to `any` - a scary, unsafe type.

It also can't detect it from usage. If we had an 'add' function that took two parameters, TypeScript wouldn't be able to tell that they were supposed to be numbers:

```ts twoslash
// @errors: 7006
function add(a, b) {
  return a + b;
}
```

`a` and `b` could be strings, booleans, or anything else. TypeScript can't know from the function body what type they're supposed to be.

So, when you're declaring a named function, their parameters always need annotations in TypeScript.

### The `any` Type

The error we encountered in the 'Function Parameters Always Need Annotations' section was pretty scary:

```
Parameter 'title' implicitly has an 'any' type.
```

When TypeScript doesn't know what type something is, it assigns it the `any` type.

This type breaks TypeScript's type system. It turns off type safety on the thing it's assigned to.

This means that anything can be assigned to it, any property on it can be accessed/assigned to, and it can be called like a function.

```ts twoslash
let anyVariable: any = "This can be anything!";

anyVariable(); // no error

anyVariable.deep.property.access; // no error
```

The code above will error at runtime, but TypeScript isn't giving us a warning!

So, using `any` can be used to turn off errors in TypeScript. It can be a useful escape hatch for when a type is too complex to describe.

But over-using `any` defeats the purpose of using TypeScript, so it's best to avoid using it whenever possible– whether implicitly or explicitly.

### Exercises

#### Exercise 1: Basic Types with Function Parameters

Let's start with an `add` function which takes two boolean parameters `a` and `b` and returns `a + b`:

```ts twoslash
// @errors: 2365
export const add = (a: boolean, b: boolean) => {
  return a + b;
};
```

A `result` variable is created by calling the `add` function. The `result` variable is then checked to see if it is equal to a `number`:

```ts twoslash
// @errors: 2365 2345 2344
import { Expect, Equal } from "@total-typescript/helpers";

export const add = (a: boolean, b: boolean) => {
  return a + b;
};

// ---cut---
const result = add(1, 2);

type test = Expect<Equal<typeof result, number>>;
```

Currently, there are a few errors in the code that are marked by red squiggly lines.

The first is on the `return` line of the `add` function, where we have `a + b`:

```
Operator '+' cannot be applied to types 'boolean' and 'boolean'
```

There's also an error below the `1` argument in the `add` function call:

```
Argument of type 'number' is not assignable to parameter of type 'boolean'
```

Finally, we can see that our `test` result has an error because the `result` is currently typed as `any`, which is not equal to `number`.

Your challenge is to consider how we can change the types to make the errors go away, and to ensure that `result` is a `number`. You can hover over `result` to check it.

<Exercise title="Exercise 1: Basic Types with Function Parameters" filePath="/src/015-essential-types-and-annotations/020-basic-types-with-function-parameters.problem.ts" resourceId="1fZdJK1AI9JNeRElmqAd9N"></Exercise>

#### Exercise 2: Annotating Empty Parameters

Here we have a `concatTwoStrings` function that is similar in shape to the `add` function. It takes two parameters, `a` and `b`, and returns a string.

```ts twoslash
// @errors: 7006
const concatTwoStrings = (a, b) => {
  return [a, b].join(" ");
};
```

There are currently errors on the `a` and `b` parameters, which have not been annotated with types.

The `result` of calling `concatTwoStrings` with `"Hello"` and `"World"` and checking if it is a `string` does not show any errors:

```ts twoslash
// @errors: 7006
import { Expect, Equal } from "@total-typescript/helpers";

const concatTwoStrings = (a, b) => {
  return [a, b].join(" ");
};

// ---cut---
const result = concatTwoStrings("Hello", "World");

type test = Expect<Equal<typeof result, string>>;
```

Your job is to add some function paramater annotations to the `concatTwoStrings` function to make the errors go away.

<Exercise title="Exercise 2: Annotating Empty Parameters" filePath="/src/015-essential-types-and-annotations/021-annotating-empty-parameters.problem.ts" resourceId="1fZdJK1AI9JNeRElmqAdKe"></Exercise>

#### Exercise 3: The Basic Types

As we've seen, TypeScript will show errors when types don't match.

This set of examples shows us the basic types that TypeScript gives us to describe JavaScript:

```ts twoslash
// @errors: 2322
export let example1: string = "Hello World!";
export let example2: string = 42;
export let example3: string = true;
export let example4: string = Symbol();
export let example5: string = 123n;
```

Note that the colon `:` is used to annotate the type of each variable, just like it was for typing the function parameters.

You'll also notice there are several errors.

Hovering over each of the underlined variables will display any associated error messages.

For example, hovering over `example2` will show:

```
Type 'number' is not assignable to type 'string'.
```

The type error for `example3` tells us:

```
Type 'boolean' is not assignable to type 'string'.
```

Change the types of the annotations on each variable to make the errors go away.

<Exercise title="Exercise 3: The Basic Types" filePath="/src/015-essential-types-and-annotations/022-all-types.problem.ts" resourceId="NMpTvrI4rUCyVa4GVzY1iN"></Exercise>

#### Exercise 4: The `any` Type

Here is a function called `handleFormData` that accepts an `e` typed as `any`. The function prevents the default form submission behavior, then creates an object from the form data and returns it:

```ts
const handleFormData = (e: any) => {
  e.preventDefault();

  const data = new FormData(e.terget);

  const value = Object.fromEntries(data.entries());

  return value;
};
```

Here is a test for the function that creates a form, sets the `innerHTML` to add an input, and then manually submits the form. When it submits, we expect the value to equal the value that was in our form that we grafted in there:

```ts
it("Should handle a form submit", () => {
  const form = document.createElement("form");

  form.innerHTML = `
<input name="name" value="John Doe"></Exercise>
`;

  form.onsubmit = (e) => {
    const value = handleFormData(e);

    expect(value).toEqual({ name: "John Doe" });
  };

  form.requestSubmit();

  expect.assertions(1);
});
```

Note that this isn't the normal way you would test a form, but it provides a way to test the example `handleFormData` function more extensively.

In the code's current state, there are no red squiggly lines present.

However, when running the test with Vitest we get an error similar to the following:

```
This error originated in "any.problem.ts" test file. It doesn't mean the error was thrown inside the file itself, but while it was running.

The latest test that might've caused the error is "Should handle a form submit". It might mean one of the following:

- The error was thrown, while Vitest was running this test.

- This was the last recorded test before the error was thrown, if error originated after test finished its execution.
```

Why is this error happening? Why isn't TypeScript giving us an error here?

I'll give you a clue. I've hidden a nasty typo in there. Can you fix it?

<Exercise title="Exercise 4: The `any` Type" filePath="/src/015-essential-types-and-annotations/032.5-any.problem.ts" resourceId="1fZdJK1AI9JNeRElmqAeU3"></Exercise>

#### Solution 1: Basic Types with Function Parameters

Common sense tells us that the `boolean`s in the `add` function should be replaced with some sort of `number` type.

If you are coming from another language, you might be tempted to try using `int` or `float`, but TypeScript only has the `number` type:

```ts twoslash
function add(a: number, b: number) {
  return a + b;
}
```

Making this change resolves the errors, and also gives us some other bonuses.

If we try calling the `add` function with a string instead of a number, we'd get an error that type `string` is not assignable to type `number`:

```ts twoslash
// @errors: 2345
function add(a: number, b: number) {
  return a + b;
}

// ---cut---
add("something", 2);
```

Not only that, but the result of our function is now inferred for us:

```ts twoslash
function add(a: number, b: number) {
  return a + b;
}

// ---cut---
const result = add(1, 2);
//    ^?
```

So TypeScript can not only infer variables, but also the return types of functions.

#### Solution 2: Annotating Empty Parameters

As we know, function parameters always need annotations in TypeScript.

So, let's update the function declaration parameters so that `a` and `b` are both specified as `string`:

```ts twoslash
const concatTwoStrings = (a: string, b: string) => {
  return [a, b].join(" ");
};
```

This change fixes the errors.

For a bonus point, what type will the return type be inferred as?

```ts twoslash
const concatTwoStrings = (a: string, b: string) => {
  return [a, b].join(" ");
};

// ---cut---
const result = concatTwoStrings("Hello", "World");
//    ^?
```

#### Solution 3: Updating Basic Types

Each of the examples represents the TypeScript's basic types, and would be annotated as follows:

```ts twoslash
let example1: string = "Hello World!";
let example2: number = 42;
let example3: boolean = true;
let example4: symbol = Symbol();
let example5: bigint = 123n;
```

We've already seen `string`, `number`, and `boolean`. The `symbol` type is used for `Symbol`s which are used to ensure property keys are unique. The `bigint` type is used for numbers that are too large for the `number` type.

However, in practice you mostly won't annotate variables like this. If we remove the explicit type annotations, there won't be any errors at all:

```ts twoslash
let example1 = "Hello World!";
let example2 = 42;
let example3 = true;
let example4 = Symbol();
let example5 = 123n;
```

These basic types are very useful to know, even if you don't always need them for your variable declarations.

#### Solution 4: The `any` Type

In this case, using `any` did not help us at all. In fact, `any` annotations seem to actually turn off type checking!

With the `any` type, we're free to do anything we want to the variable, and TypeScript will not prevent it.

Using `any` also disables useful features like autocompletion, which can help you avoid typos.

That's right-- the error in the above code was caused by a typo of `e.terget` instead of `e.target` when creating the `FormData`!

```ts
const handleFormData = (e: any) => {
  e.preventDefault();

  const data = new FormData(e.terget); // e.terget! Whoops!

  const value = Object.fromEntries(data.entries());

  return value;
};
```

If `e` had been properly typed, this error would have been caught by TypeScript right away. We'll come back to this example in the future to see the proper typing.

Using `any` may seem like a quick fix when you have trouble figuring out how to properly type something, but it can come back to bite you later.

## Object Literal Types

Now that we've done some exploration with basic types, let's move on to object types.

Object types are used to describe the shape of objects. Each property of an object can have its own type annotation.

When defining an object type, we use curly braces to contain the properties and their types:

```ts twoslash
const talkToAnimal = (animal: { name: string; type: string; age: number }) => {
  // rest of function body
};
```

This curly braces syntax is called an object literal type.

### Optional Object Properties

We can use `?` operator to mark the `age` property as optional:

```ts twoslash
const talkToAnimal = (animal: { name: string; type: string; age?: number }) => {
  // rest of function body
};
```

One cool thing about type annotations with object literals is that they provide auto-completion for the property names while you're typing.

For instance, when calling `talkToAnimal`, it will provide you with an auto-complete dropdown with suggestions for the `name`, `type`, and `age` properties.

This feature can save you a lot of time, and also helps to avoid typos in a situation when you have several properties with similar names.

### Exercises

#### Exercise 1: Object Literal Types

Here we have a `concatName` function that accepts a `user` object with `first` and `last` keys:

```ts twoslash
// @errors: 7006
const concatName = (user) => {
  return `${user.first} ${user.last}`;
};
```

The test expects that the full name should be returned, and it is passing:

```ts
it("should return the full name", () => {
  const result = concatName({
    first: "John",
    last: "Doe",
  });

  type test = Expect<Equal<typeof result, string>>;

  expect(result).toEqual("John Doe");
});
```

However, there is a familiar error on the `user` parameter in the `concatName` function:

```
Parameter 'user' implicitly has an 'any' type.
```

We can tell from the `concatName` function body that it expects `user.first` and `user.last` to be strings.

How could we type the `user` parameter to ensure that it has these properties and that they are of the correct type?

<Exercise title="Exercise 1: Object Literal Types" filePath="/src/015-essential-types-and-annotations/025-object-literal-types.problem.ts" resourceId="1fZdJK1AI9JNeRElmqAdzz"></Exercise>

#### Exercise 2: Optional Property Types

Here's a version of the `concatName` function that has been updated to return just the first name if a last name wasn't provided:

```ts twoslash
const concatName = (user: { first: string; last: string }) => {
  if (!user.last) {
    return user.first;
  }

  return `${user.first} ${user.last}`;
};
```

Like before, TypeScript gives us an error when testing that the function returns only the first name when no last name is provided passes:

```ts twoslash
// @errors: 2345
const concatName = (user: { first: string; last: string }) => {
  if (!user.last) {
    return user.first;
  }

  return `${user.first} ${user.last}`;
};

// ---cut---
const result = concatName({
  first: "John",
});
```

The error tells us that we are missing a property, but the error is incorrect. We _do_ want to support objects that only include a `first` property. In other words, `last` needs to be optional.

How would you update this function to fix the errors?

<Exercise title="Exercise 2: Optional Property Types" filePath="/src/015-essential-types-and-annotations/026-optional-property-types.problem.ts" resourceId="1fZdJK1AI9JNeRElmqAeIm"></Exercise>

#### Solution 1: Object Literal Types

In order to annotate the `user` parameter as an object, we can use the curly brace syntax `{}`.

Let's start by annotating the `user` parameter as an empty object:

```ts twoslash
// @errors: 2339
const concatName = (user: {}) => {
  return `${user.first} ${user.last}`;
};
```

The errors change. This is progress, of a kind. The errors now show up under `.first` and `.last` in the function return.

In order to fix these errors, we need to add the `first` and `last` properties to the type annotation.

```ts twoslash
const concatName = (user: { first: string; last: string }) => {
  return `${user.first} ${user.last}`;
};
```

Now TypeScript knows that both the `first` and `last` properties of `user` are strings, and the test passes.

#### Solution 2: Optional Property Types

Similar to when we set a function parameter as optional, we can use the `?` to specify that an object's property is optional.

As seen in a previous exercise, we can add a question mark to function parameters to make them optional:

```ts twoslash
function concatName(user: { first: string; last?: string }) {
  // implementation
}
```

Adding `?:` indicates to TypeScript that the property doesn't need to be present.

If we hover over the `last` property inside of the function body, we'll see that the `last` property is `string | undefined`:

```
// hovering over `user.last`

(property) last?: string | undefined
```

This means it's `string` OR `undefined`. This is a useful feature of TypeScript that we'll see more of in the future.

## Type Aliases

So far, we've been declaring all of our types inline. This is fine for these simple examples, but in a real application we're going to have types which repeat a lot across our app.

These might be users, products, or other domain-specific types. We don't want to have to repeat the same type definition in every file that needs it.

This is where the `type` keyword comes in. It allows us to define a type once and use it in multiple places.

```ts twoslash
type Animal = {
  name: string;
  type: string;
  age?: number;
};
```

This is what's called a type alias. It's a way to give a name to a type, and then use that name wherever we need to use that type.

To create a new variable with the `Animal` type, we'll add it as a type annotation after the variable name:

```ts twoslash
type Animal = {
  name: string;
  type: string;
  age?: number;
};

// ---cut---
let pet: Animal = {
  name: "Karma",
  type: "cat",
};
```

We can also use the `Animal` type alias in place of the object type annotation in a function:

```ts twoslash
type Animal = {
  name: string;
  type: string;
  age?: number;
};

// ---cut---
const getAnimalDescription = (animal: Animal) => {
  // implementation
};
```

And call the function with our `pet` variable:

```ts
const desc = getAnimalDescription(pet);
```

Type aliases can be objects, but they can also use basic types:

```ts
type Id = string | number;
```

We'll look at this syntax later, but it's basically saying that an `Id` can be either a `string` or a `number`.

Using a type alias is a great way to ensure there's a single source of truth for a type definition, which makes it easier to make changes in the future.

### Sharing Types Across Modules

Type aliases can be created in their own `.ts` files and imported into the files where you need them. This is useful when sharing types in multiple places, or when a type definition gets too large:

```ts
// In shared-types.ts

export type Animal = {
  width: number;
  height: number;
};

// In index.ts

import { Animal } from "./shared-types";
```

As a convention, you can even create your own `.types.ts` files. This can help to keep your type definitions separate from your other code.

### Exercises

#### Exercise 1: The `type` Keyword

Here's some code that uses the same type in multiple places:

```ts twoslash
const getRectangleArea = (rectangle: { width: number; height: number }) => {
  return rectangle.width * rectangle.height;
};

const getRectanglePerimeter = (rectangle: {
  width: number;
  height: number;
}) => {
  return 2 * (rectangle.width + rectangle.height);
};
```

The `getRectangleArea` and `getRectanglePerimeter` functions both take in a `rectangle` object with `width` and `height` properties.

Tests for each function pass as expected:

```ts
it("should return the area of a rectangle", () => {
  const result = getRectangleArea({
    width: 10,
    height: 20,
  });

  type test = Expect<Equal<typeof result, number>>;

  expect(result).toEqual(200);
});

it("should return the perimeter of a rectangle", () => {
  const result = getRectanglePerimeter({
    width: 10,
    height: 20,
  });

  type test = Expect<Equal<typeof result, number>>;

  expect(result).toEqual(60);
});
```

Even though everything is working as expected, there's an opportunity for refactoring to clean things up.

How could you use the `type` keyword to make this code more readable?

<Exercise title="Exercise 1: The `type` Keyword" filePath="/src/015-essential-types-and-annotations/027-type-keyword.problem.ts" resourceId="jUJqrXCHRph0Z4Fs6Ll3za"></Exercise>

#### Solution 1: The `type` Keyword

You can use the `type` keyword to create a `Rectangle` type with `width` and `height` properties:

```ts twoslash
type Rectangle = {
  width: number;
  height: number;
};
```

With the type alias created, we can update the `getRectangleArea` and `getRectanglePerimeter` functions to use the `Rectangle` type:

```ts twoslash
type Rectangle = {
  width: number;
  height: number;
};

// ---cut---
const getRectangleArea = (rectangle: Rectangle) => {
  return rectangle.width * rectangle.height;
};

const getRectanglePerimeter = (rectangle: Rectangle) => {
  return 2 * (rectangle.width + rectangle.height);
};
```

This makes the code a lot more concise, and gives us a single source of truth for the `Rectangle` type.

## Arrays and Tuples

### Arrays

You can also describe the types of arrays in TypeScript. There are two different syntaxes for doing this.

The first option is the square bracket syntax. This syntax is similar to the type annotations we've made so far, but with the addition of two square brackets at the end to indicate an array.

```ts twoslash
let albums: string[] = [
  "Rubber Soul",
  "Revolver",
  "Sgt. Pepper's Lonely Hearts Club Band",
];

let dates: number[] = [1965, 1966, 1967];
```

The second option is to explicitly use the `Array` type with angle brackets containing the type of data the array will hold:

```ts twoslash
let albums: Array<string> = [
  "Rubber Soul",
  "Revolver",
  "Sgt. Pepper's Lonely Hearts Club Band",
];
```

Both of these syntaxes are equivalent, but the square bracket syntax is a bit more concise when creating arrays. It's also the way that TypeScript presents error messages. Keep the angle bracket syntax in mind, though– we'll see more examples of it later on.

#### Arrays Of Objects

When specifying an array's type, you can use any built-in types, inline types, or type aliases:

```ts twoslash
type Album = {
  artist: string;
  title: string;
  year: number;
};

let selectedDiscography: Album[] = [
  {
    artist: "The Beatles",
    title: "Rubber Soul",
    year: 1965,
  },
  {
    artist: "The Beatles",
    title: "Revolver",
    year: 1966,
  },
];
```

And if you try to update the array with an item that doesn't match the type, TypeScript will give you an error:

```ts twoslash
// @errors: 2353
type Album = {
  artist: string;
  title: string;
  year: number;
};

let selectedDiscography: Album[] = [
  {
    artist: "The Beatles",
    title: "Rubber Soul",
    year: 1965,
  },
  {
    artist: "The Beatles",
    title: "Revolver",
    year: 1966,
  },
];

// ---cut---
selectedDiscography.push({ name: "Karma", type: "cat" });
```

### Tuples

Tuples let you specify an array with a fixed number of elements, where each element has its own type.

Creating a tuple is similar to an array's square bracket syntax - except the square brackets contain the types instead of abutting the variable name:

```ts twoslash
// Tuple
let album: [string, number] = ["Rubber Soul", 1965];

// Array
let albums: string[] = [
  "Rubber Soul",
  "Revolver",
  "Sgt. Pepper's Lonely Hearts Club Band",
];
```

Tuples are useful for grouping related information together without having to create a new type.

For example, if we wanted to group an album with its play count, we could do something like this:

```ts twoslash
type Album = {
  artist: string;
  title: string;
  year: number;
};

// ---cut---
let albumWithPlayCount: [Album, number] = [
  {
    artist: "The Beatles",
    title: "Revolver",
    year: 1965,
  },
  10000,
];
```

#### Named Tuples

To add more clarity to the tuple, names for each of the types can be added inside of the square brackets:

```ts twoslash
type Album = {
  artist: string;
  title: string;
  year: number;
};

// ---cut---
type MyTuple = [album: Album, playCount: number];
```

This can be helpful when you have a tuple with a lot of elements, or when you want to make the code more readable.

### Exercises

#### Exercise 1: Array Type

Consider the following shopping cart code:

```ts twoslash
// @errors: 2353
type ShoppingCart = {
  userId: string;
};

const processCart = (cart: ShoppingCart) => {
  // Do something with the cart in here
};

processCart({
  userId: "user123",
  items: ["item1", "item2", "item3"],
});
```

We have a type alias for `ShoppingCart` that currently has a `userId` property of type `string`.

The `processCart` function takes in a `cart` parameter of type `ShoppingCart`. Its implementation doesn't matter at this point.

What does matter is that when we call `processCart`, we are passing in an object with a `userId` and an `items` property that is an array of strings.

There is an error underneath `items` that reads:

```
Argument of type '{ userId: string; items: string[]; }' is not assignable to parameter of type 'ShoppingCart'.

Object literal may only specify known properties, and 'items' does not exist in type 'ShoppingCart'.
```

As the error message points out, there is not currently a property called `items` on the `ShoppingCart` type.

How would you fix this error?

<Exercise title="Exercise 1: Array Type" filePath="/src/015-essential-types-and-annotations/028-arrays.problem.ts" resourceId="jUJqrXCHRph0Z4Fs6Ll3za"></Exercise>

#### Exercise 2: Arrays of Objects

Consider this `processRecipe` function which takes in a `Recipe` type:

```ts twoslash
// @errors: 2353
type Recipe = {
  title: string;
  instructions: string;
};

const processRecipe = (recipe: Recipe) => {
  // Do something with the recipe in here
};

processRecipe({
  title: "Chocolate Chip Cookies",
  ingredients: [
    { name: "Flour", quantity: "2 cups" },
    { name: "Sugar", quantity: "1 cup" },
  ],
  instructions: "...",
});
```

The function is called with an object containing `title`, `instructions`, and `ingredients` properties, but there are currently errors because the `Recipe` type doesn't currently have an `ingredients` property:

```
Argument of type '{title: string; ingredients: { name: string; quantity: string; }[]; instructions: string; }' is not assignable to parameter of type 'Recipe'.

Object literal may only specify known properties, and 'ingredients' does not exist in type 'Recipe'.
```

By combining what you've seen with typing object properties and working with arrays, how would you specify ingredients for the `Recipe` type?

<Exercise title="Exercise 2: Arrays of Objects" filePath="/src/015-essential-types-and-annotations/029-arrays-of-objects.problem.ts" resourceId="YgFRxBViy44CfW0H2dToDx"></Exercise>

#### Exercise 3: Tuples

Here we have a `setRange` function that takes in an array of numbers:

```ts twoslash
// @errors: 2344
import { Expect, Equal } from "@total-typescript/helpers";

// @noUncheckedIndexedAccess: true

// ---cut---
const setRange = (range: Array<number>) => {
  const x = range[0];
  const y = range[1];

  // Do something with x and y in here
  // x and y should both be numbers!

  type tests = [
    Expect<Equal<typeof x, number>>,
    Expect<Equal<typeof y, number>>,
  ];
};
```

Inside the function, we grab the first element of the array and assign it to `x`, and we grab the second element of the array and assign it to `y`.

There are two tests inside the `setRange` function that are currently failing.

Using the `// @ts-expect-error` directive, we find there are a couple more errors that need fixing. Recall that this directive tells TypeScript we know there will be an error on the next line, so ignore it. However, if we say we expect an error but there isn't one, we will get the red squiggly lines on the actual `//@ts-expect-error` line.

```ts twoslash
// @errors: 2578
import { Expect, Equal } from "@total-typescript/helpers";

// @noUncheckedIndexedAccess: true

// ---cut---
const setRange = (range: Array<number>) => {
  const x = range[0];
  const y = range[1];
};

// ---cut---
// @ts-expect-error too few arguments
setRange([0]);

// @ts-expect-error too many arguments
setRange([0, 10, 20]);
```

The code for the `setRange` function needs an updated type annotation to specify that it only accepts a tuple of two numbers.

<Exercise title="Exercise 3: Tuples" filePath="/src/015-essential-types-and-annotations/031-tuples.problem.ts" resourceId="YgFRxBViy44CfW0H2dTomV"></Exercise>

#### Exercise 4: Optional Members of Tuples

This `goToLocation` function takes in an array of coordinates. Each coordinate has a `latitude` and `longitude`, which are both numbers, as well as an optional `elevation` which is also a number:

```ts twoslash
// @errors: 2344
import { Expect, Equal } from "@total-typescript/helpers";

// ---cut---
const goToLocation = (coordinates: Array<number>) => {
  const latitude = coordinates[0];
  const longitude = coordinates[1];
  const elevation = coordinates[2];

  // Do something with latitude, longitude, and elevation in here

  type tests = [
    Expect<Equal<typeof latitude, number>>,
    Expect<Equal<typeof longitude, number>>,
    Expect<Equal<typeof elevation, number | undefined>>,
  ];
};
```

Your challenge is to update the type annotation for the `coordinates` parameter to specify that it should be a tuple of three numbers, where the third number is optional.

<Exercise title="Exercise 4: Optional Members of Tuples" filePath="/src/015-essential-types-and-annotations/032-optional-members-of-tuples.problem.ts" resourceId="jUJqrXCHRph0Z4Fs6Ll7aP"></Exercise>

#### Solution 1: Array Type

For the `ShoppingCart` example, defining an array of `item` strings would looks like this when using the square bracket syntax:

```ts twoslash
type ShoppingCart = {
  userId: string;
  items: string[];
};
```

With this in place, we must pass in `items` as an array. A single string or other type would result in a type error.

The other syntax is to explicitly write `Array` and pass it a type inside the angle brackets:

```ts twoslash
type ShoppingCart = {
  userId: string;
  items: Array<string>;
};
```

#### Solution 2: Arrays of Objects

There are a few different ways to express an array of objects.

One approach would be to create a new `Ingredient` type that we can use to represent the objects in the array:

```ts twoslash
type Ingredient = {
  name: string;
  quantity: string;
};
```

Then the `Recipe` type can be updated to include an `ingredients` property of type `Ingredient[]`:

```ts twoslash
type Ingredient = {
  name: string;
  quantity: string;
};

// ---cut---
type Recipe = {
  title: string;
  instructions: string;
  ingredients: Ingredient[];
};
```

This solution reads nicely, fixes the errors, and helps to create a mental map of our domain model.

As seen previously, using the `Array<Ingredient>` syntax would also work:

```ts
type Recipe = {
  title: string;
  instructions: string;
  ingredients: Array<Ingredient>;
};
```

It's also possible to specify the `ingredients` property as an inline object literal on the `Recipe` type using the square brackets:

```ts
type Recipe = {
  title: string;
  instructions: string;
  ingredients: {
    name: string;
    quantity: string;
  }[];
};
```

Or using `Array<>`:

```ts
type Recipe = {
  title: string;
  instructions: string;
  ingredients: Array<{
    name: string;
    quantity: string;
  }>;
};
```

The inline approaches are useful, but I prefer extracting them out to a new type. This means that if another part of your application needs to use the `Ingredient` type, it can.

#### Solution 3: Tuples

In this case, we would update the `setRange` function to use the tuple syntax instead of the array syntax:

```ts
const setRange = (range: [number, number]) => {
  // rest of function body
};
```

If you want to add more clarity to the tuple, you can add names for each of the types:

```ts
const setRange = (range: [x: number, y: number]) => {
  // rest of function body
};
```

#### Solution 4: Optional Members of Tuples

A good start would be to change the `coordinates` parameter to a tuple of `[number, number, number | undefined]`:

```tsx
const goToLocation = (coordinates: [number, number, number | undefined]) => {};
```

The problem here is that while the third member of the tuple is able to be a number or `undefined`, the function still is expecting something to be passed in. It's not a good solution to have to pass in `undefined` manually.

Using a named tuple in combination with the optional operator `?` is a better solution:

```tsx
const goToLocation = (
  coordinates: [latitude: number, longitude: number, elevation?: number],
) => {};
```

The values are clear, and using the `?` operator specifies the `elevation` is an optional number. It almost looks like an object, but it's still a tuple.

Alternatively, if you don't want to use named tuples, you can use the `?` operator after the definition:

```tsx
const goToLocation = (coordinates: [number, number, number?]) => {};
```

## Passing Types To Functions

Let's take a quick look back at the `Array` type we saw earlier.

```ts
Array<string>;
```

This type describes an array of strings. To make that happen, we're passing a type (`string`) as an argument to another type (`Array`).

There are lots of other types that can receive types, like `Promise<string>`, `Record<string, string>`, and others. In each of them, we use the angle brackets to pass a type to another type.

But we can also use that syntax to pass types to functions.

### Passing Types To `Set`

A `Set` is a JavaScript feature that represents a collection of unique values.

To create a `Set`, use the `new` keyword and call `Set`:

```ts twoslash
const formats = new Set();
//    ^?
```

If we hover over the `formats` variable, we can see that it is typed as `Set<unknown>`.

That's because the `Set` doesn't know what type it's supposed to be! We haven't passed it any values, so it defaults to an `unknown` type.

One way to have TypeScript know what type we want the `Set` to hold would be to pass in some initial values:

```ts twoslash
const formats = new Set(["CD", "DVD"]);
//    ^?
```

In this case, since we specified two strings when creating the `Set`, TypeScript knows that `formats` is a `Set` of strings.

But it's not always the case that we know exactly what values we want to pass to a `Set` when we create it. We might want to create an empty `Set` that we know will hold strings later on.

For this, we can pass a type to `Set` using the angle brackets syntax:

```ts
const formats = new Set<string>();
```

Now, `formats` understands that it's a set of strings, and adding anything other than a string will fail:

```ts twoslash
// @errors: 2345
const formats = new Set<string>();

// ---cut---
formats.add("Digital");

formats.add(8);
```

This is a really important thing to understand in TypeScript. You can pass types, as well as values, to functions.

### Not All Functions Can Receive Types

Most functions in TypeScript _can't_ receive types.

For example, let's look at `document.getElementById` that comes in from the DOM typings.

A common example where you might want to pass a type is when calling `document.getElementById`. Here we're trying to get an audio element:

```ts twoslash
const audioElement = document.getElementById("player");
```

We know that `audioElement` is going to be a `HTMLAudioElement`, so it seems like we should be able to pass it to `document.getElementById`:

```ts twoslash
// @errors: 2558
const audioElement = document.getElementById<HTMLAudioElement>("player");
```

But unfortunately, we can't. We get an error saying that `.getElementById` expects zero type arguments.

We can see whether a function can receive type arguments by hovering over it. Let's try hovering `.getElementById`:

```ts
// hovering over .getElementById shows:
(method) Document.getElementById(elementId: string): HTMLElement | null
```

Notice that `.getElementById` contains no angle brackets (`<>`) in its hover, which is why we can't pass a type to it.

Let's contrast it with a function that _can_ receive type arguments, like `document.querySelector`:

```ts
const audioElement = document.querySelector("#player");

// hovering over .querySelector shows:
(method) ParentNode.querySelector<Element>(selectors: string): Element | null
```

This type definition shows us that `.querySelector` has some angle brackets before the parentheses. Inside of the brackets is the default value inside them - in this case, `Element`.

So, to fix our code above we could replace `.getElementById` with `.querySelector` and use the `#player` selector to find the audio element:

```ts
const audioElement = document.querySelector<HTMLAudioElement>("#player");
```

And everything works.

So, to tell whether a function can receive a type argument, hover it and check whether it has any angle brackets.

### Exercises

#### Exercise 1: Passing Types to Map

Here we are creating a `Map`, a JavaScript feature which represents a dictionary.

In this case we want to pass in a number for the key, and an object for the value:

```ts twoslash
// @errors: 2578
const userMap = new Map();

userMap.set(1, { name: "Max", age: 30 });

userMap.set(2, { name: "Manuel", age: 31 });

// @ts-expect-error
userMap.set("3", { name: "Anna", age: 29 });

// @ts-expect-error
userMap.set(3, "123");
```

There are red lines on the `@ts-expect-error` directives because currently any type of key and value is allowed in the `Map`.

```ts
// hovering over Map shows:
var Map: MapConstructor

new () => Map<any, any> (+3 overloads)
```

How would we type the `userMap` so the key must be a number and the value is an object with `name` and `age` properties?

<Exercise title="Exercise 1: Passing Types to Map" filePath="/src/015-essential-types-and-annotations/036-pass-types-to-map.problem.ts" resourceId="YgFRxBViy44CfW0H2dTq1H"></Exercise>

#### Exercise 2: `JSON.parse()` Can't Receive Type Arguments

Consider the following code, which uses `JSON.parse` to parse some JSON:

```ts twoslash
// @errors: 2558
const parsedData = JSON.parse<{
  name: string;
  age: number;
}>('{"name": "Alice", "age": 30}');
```

There is currently an error under the type argument for `JSON.parse`.

A test that checks the type of `parsedData` is currently failing, since it is typed as `any` instead of the expected type:

```ts twoslash
// @errors: 2344
import { Expect, Equal } from "@total-typescript/helpers";

declare const parsedData: any;

// ---cut---
type test = Expect<
  Equal<
    typeof parsedData,
    {
      name: string;
      age: number;
    }
  >
>;
```

We've tried to pass a type argument to the `JSON.parse` function. But it doesn't appear to be working in this case.

The test errors tell us that the type of `parsed` is not what we expect. The properties `name` and `age` are not being recognized.

Why this is happening? What would be an different way to correct these type errors?

<Exercise title="Exercise 2: `JSON.parse()` Can't Receive Type Arguments" filePath="/src/015-essential-types-and-annotations/037-json-parse-cant-receive-type-arguments.problem.ts" resourceId="1fZdJK1AI9JNeRElmqAfD9"></Exercise>

#### Solution 1: Passing Types to Map

There are a few different ways to solve this problem, but we'll start with the most straightforward one.

The first thing to do is to create a `User` type:

```ts
type User = {
  name: string;
  age: number;
};
```

Following the patterns we've seen so far, we can pass `number` and `User` as the types for the `Map`:

```ts
const userMap = new Map<number, User>();
```

That's right - some functions can receive _multiple_ type arguments. In this case, the `Map` constructor can receive two types: one for the key, and one for the value.

With this change, the errors go away, and we can no longer pass in incorrect types into the `userMap.set` function.

You can also express the `User` type inline:

```ts
const userMap = new Map<number, { name: string; age: number }>();
```

#### Solution 2: `JSON.parse()` Can't Receive Type Arguments

Let's look a bit closer at the error message we get when passing a type argument to `JSON.parse`:

```
Expected 0 type arguments, but got 1.
```

This message indicates that TypeScript is not expecting anything inside the angle braces when calling `JSON.parse`. To resolve this error, we can remove the angle braces:

```ts
const parsedData = JSON.parse('{"name": "Alice", "age": 30}');
```

Now that `.parse` is receiving the correct number of type arguments, TypeScript is happy.

However, we want our parsed data to have the correct type. Hovering over `JSON.parse`, we can see its type definition:

```ts
JSON.parse(text: string, reviver?: ((this: any, key: string, value: any) => any)  undefined): any
```

It always returns `any`, which is a bit of a problem.

To get around this issue, we can give `parsedData` a variable type annotation with `name: string` and `age: number`:

```ts
const parsedData: {
  name: string;
  age: number;
} = JSON.parse('{"name": "Alice", "age": 30}');
```

Now we have `parsedData` typed as we want it to be.

The reason this works is because `any` disables type checking. So, we can assign it any type we want to. We could assign it something that doesn't make sense, like `number`, and TypeScript wouldn't complain:

```ts
const parsedData: number = JSON.parse('{"name": "Alice", "age": 30}');
```

So, this is more 'type faith' than 'type safe'. We are hoping that `parsedData` is the type we expect it to be. This relies on us keeping the type annotation up to date with the actual data.

## Typing Functions

### Optional Parameters

For cases where a function parameter is optional, we can add the `?` operator before the `:`.

Say we wanted to add an optional `releaseDate` parameter to the `logAlbumInfo` function. We could do so like this:

```ts
const logAlbumInfo = (
  title: string,
  trackCount: number,
  isReleased: boolean,
  releaseDate?: string,
) => {
  // rest of function body
};
```

Now we can call `logAlbumInfo` and include a release date string, or leave it out:

```ts
logAlbumInfo("Midnights", 13, true, "2022-10-21");

logAlbumInfo("American Beauty", 10, true);
```

Hovering over the optional `releaseDate` parameter in VS Code will show us that it is now typed as `string | undefined`.

We'll discuss the `|` symbol more later, but this means that the parameter could either be a `string` or `undefined`. It would be acceptable to literally pass `undefined` as a second argument, or it can be omitted all together.

### Default Parameters

In addition to marking parameters as optional, you can set default values for parameters by using the `=` operator.

For example, we could set the `format` to default to `"CD"` if no format is provided:

```ts
const logAlbumInfo = (
  title: string,
  trackCount: number,
  isReleased: boolean,
  format: string = "CD",
) => {
  // rest of function body
};
```

The annotation of `: string` can also be omitted:

```ts
const logAlbumInfo = (
  title: string,
  trackCount: number,
  isReleased: boolean,
  format = "CD",
) => {
  // rest of function body
};
```

Since it can infer the type of the `format` parameter from the value provided. This is another nice example of type inference.

### Function Return Types

In addition to setting parameter types, we can also set the return type of a function.

The return type of a function can be annotated by placing a `:` and the type after the closing parentheses of the parameter list. For the `logAlbumInfo` function, we can specify that the function will return a string:

```ts
const logAlbumInfo = (
  title: string,
  trackCount: number,
  isReleased: boolean,
): string => {
  // rest of function body
};
```

If the value returned from a function doesn't match the type that was specified, TypeScript will show an error.

```ts twoslash
// @errors: 2322
const logAlbumInfo = (
  title: string,
  trackCount: number,
  isReleased: boolean,
): string => {
  return 123;
};
```

Return types are useful for when you want to ensure that a function returns a specific type of value.

### Rest Parameters

Just like in JavaScript, TypeScript supports rest parameters by using the `...` syntax for the final parameter. This allows you to pass in any number of arguments to a function.

For example, this `printAlbumFormats` is set up to accept an `album` and any number of `formats`:

```ts
function getAlbumFormats(album: Album, ...formats: string[]) {
  return `${album.title} is available in the following formats: ${formats.join(
    ", ",
  )}`;
}
```

Declaring the parameter with the `...formats` syntax combined with an array of strings lets us pass in any number of strings to the function:

```ts
getAlbumFormats(
  { artist: "Radiohead", title: "OK Computer", year: 1997 },
  "CD",
  "LP",
  "Cassette",
);
```

Or even by spreading in an array of strings:

```ts
const albumFormats = ["CD", "LP", "Cassette"];

getAlbumFormats(
  { artist: "Radiohead", title: "OK Computer", year: 1997 },
  ...albumFormats,
);
```

As an alternative, we can use the `Array<>` syntax instead.

```ts
function getAlbumFormats(album: Album, ...formats: Array<string>) {
  // function body
}
```

### Function Types

We've used type annotations to specify the types of function parameters, but we can also use TypeScript to describe the types of functions themselves.

We can do this using this syntax:

```ts
type Mapper = (item: string) => number;
```

This is a type alias for a function that takes in a `string` and returns a `number`.

We could then use this to describe a callback function passed to another function:

```ts
const mapOverItems = (items: string[], map: Mapper) => {
  return items.map(map);
};
```

Or, declare it inline:

```ts
const mapOverItems = (items: string[], map: (item: string) => number) => {
  return items.map(map);
};
```

This lets us pass a function to `mapOverItems` that changes the value of the items in the array.

```ts
const arrayOfNumbers = mapOverItems(["1", "2", "3"], (item) => {
  return parseInt(item) * 100;
});
```

Function types are as flexible as function definitions. You can declare multiple parameters, rest parameters, and optional parameters.

```ts
// Optional parameters
type WithOptional = (index?: number) => number;

// Rest parameters
type WithRest = (...rest: string[]) => number;

// Multiple parameters
type WithMultiple = (first: string, second: string) => number;
```

### The `void` Type

Some functions don't return anything. They perform some kind of action, but they don't produce a value.

A great example is a `console.log`:

```ts
const logResult = console.log("Hello!");
```

What type do you expect `logResult` to be? In JavaScript, the value is `undefined`. If we were to `console.log(logResult)`, that's what we'd see in the console.

But TypeScript has a special type for these situations - where a function's return value should be deliberately ignored. It's called `void`.

If we hover over `.log` in `console.log`, we'll see that it returns `void`:

```
(method) Console.log(...data: any[]): void
```

So, `logResult` is also `void`.

This is TypeScript's way of saying "ignore the result of this function call".

### Typing Async Functions

We've looked at how to strongly type what a function returns, via a return type:

```ts
const getUser = (id: string): User => {
  // function body
};
```

But what about when the function is asynchronous?

```ts twoslash
// @errors: 1064 2355
type User = {
  id: string;
  name: string;
};
// ---cut---
const getUser = async (id: string): User => {
  // function body
};
```

Fortunately, TypeScript's error message is helpful here. It's telling us that the return type of an async function must be a `Promise`.

So, we can pass `User` to a `Promise`:

```ts
const getUser = async (id: string): Promise<User> => {
  const user = await db.users.get(id);

  return user;
};
```

Now, our function must return a `Promise` that resolves to a `User`.

### Exercises

#### Exercise 1: Optional Function Parameters

Here we have a `concatName` function, whose implementation takes in two `string` parameters `first` and `last`.

If there's no `last` name passed, the return would be just the `first` name. Otherwise, it would return `first` concatenated with `last`:

```ts
const concatName = (first: string, last: string) => {
  if (!last) {
    return first;
  }

  return `${first} ${last}`;
};
```

When calling `concatName` with a first and last name, the function works as expected without errors:

```ts
const result = concatName("John", "Doe");
```

However, when calling `concatName` with just a first name, we get an error:

```ts twoslash
// @errors: 2554
const concatName = (first: string, last: string) => {
  if (!last) {
    return first;
  }

  return `${first} ${last}`;
};
// ---cut---
const result2 = concatName("John");
```

Try to use an optional parameter annotation to fix the error.

<Exercise title="Exercise 1: Optional Function Parameters" filePath="/src/015-essential-types-and-annotations/023-optional-function-parameters.problem.ts" resourceId="1fZdJK1AI9JNeRElmqAdVv"></Exercise>

#### Exercise 2: Default Function Parameters

Here we have the same `concatName` function as before, where the `last` name is optional:

```ts twoslash
const concatName = (first: string, last?: string) => {
  if (!last) {
    return first;
  }

  return `${first} ${last}`;
};
```

We also have a couple of tests. This test checks that the function returns the full name when passed a first and last name:

```ts
it("should return the full name", () => {
  const result = concatName("John", "Doe");

  type test = Expect<Equal<typeof result, string>>;

  expect(result).toEqual("John Doe");
});
```

However, the second test expects that when `concatName` is called with just a first name as an argument, the function should use `Pocock` as the default last name:

```ts
it("should return the first name", () => {
  const result = concatName("John");

  type test = Expect<Equal<typeof result, string>>;

  expect(result).toEqual("John Pocock");
});
```

This test currently fails, with the output from `vitest` indicating the error is on the `expect` line:

```
AssertionError: expected 'John' to deeply equal 'John Pocock'

- Expected

+ Received

— John Pocock

+ John

expect(result).toEqual("John Pocock");
```

Update the `concatName` function to use `Pocock` as the default last name if one is not provided.

<Exercise title="Exercise 2: Default Function Parameters" filePath="/src/015-essential-types-and-annotations/024-default-function-parameters.problem.ts" resourceId="1fZdJK1AI9JNeRElmqAdoi"></Exercise>

#### Exercise 3: Rest Parameters

Here we have a `concatenate` function that takes in a variable number of strings:

```ts twoslash
// @errors: 7019
export function concatenate(...strings) {
  return strings.join("");
}
```

The test passes, but there's an error on the `...strings` rest parameter.

How would you update the rest parameter to specify that it should be an array of strings?

<Exercise title="Exercise 3: Rest Parameters" filePath="/src/015-essential-types-and-annotations/030-rest-parameters.problem.ts" resourceId="jUJqrXCHRph0Z4Fs6Ll6T5"></Exercise>

#### Exercise 4: Function Types

Here, we have a `modifyUser` function that takes in an array of `users`, an `id` of the user that we want to change, and a `makeChange` function that makes that change:

```ts twoslash
// @errors: 7006
type User = {
  id: string;
  name: string;
};

const modifyUser = (user: User[], id: string, makeChange) => {
  return user.map((u) => {
    if (u.id === id) {
      return makeChange(u);
    }

    return u;
  });
};
```

Currently there is an error under `makeChange`.

Here's an example of how this function would be called:

```ts twoslash
// @errors: 7006
type User = {
  id: string;
  name: string;
};

const modifyUser = (user: User[], id: string, makeChange) => {
  return user.map((u) => {
    if (u.id === id) {
      return makeChange(u);
    }

    return u;
  });
};

// ---cut---
const users: User[] = [
  { id: "1", name: "John" },
  { id: "2", name: "Jane" },
];

modifyUser(users, "1", (user) => {
  return { ...user, name: "Waqas" };
});
```

In the above example, the `user` parameter to the error function also has the "implicit `any`" error.

The `modifyUser` type annotation for the `makeChange` function to be updated. It should return a modified user. For example, we should not be able to return a `name` of `123`, because in the `User` type, `name` is a `string`:

```ts
modifyUser(
  users,
  "1",
  // @ts-expect-error
  (user) => {
    return { ...user, name: 123 };
  },
);
```

How would you type `makeChange` as a function takes in a `User` and returns a `User`?

<Exercise title="Exercise 4: Function Types" filePath="/src/015-essential-types-and-annotations/033-function-types.problem.ts" resourceId="1fZdJK1AI9JNeRElmqAeqb"></Exercise>

#### Exercise 5: Functions Returning `void`

Here we explore a classic web development example.

We have an `addClickEventListener` function that takes in a listener function and adds it to the document:

```ts twoslash
// @errors: 7006
const addClickEventListener = (listener) => {
  document.addEventListener("click", listener);
};

addClickEventListener(() => {
  console.log("Clicked!");
});
```

Currently there is an error under `listener` because it doesn't have a type signature.

We're also _not_ getting an error when we pass an incorrect value to `addClickEventListener`.

```ts twoslash
// @errors: 7006 2578
const addClickEventListener = (listener) => {
  document.addEventListener("click", listener);
};

// ---cut---
addClickEventListener(
  // @ts-expect-error
  "abc",
);
```

This is triggering our `@ts-expect-error` directive.

How should `addClickEventListener` be typed so that each error is resolved?

<Exercise title="Exercise 5: Functions Returning `void`" filePath="/src/015-essential-types-and-annotations/034-functions-returning-void.problem.ts" resourceId="1fZdJK1AI9JNeRElmqAf1s"></Exercise>

#### Exercise 6: `void` vs `undefined`

We've got a function that accepts a callback and calls it. The callback doesn't return anything, so we've typed it as `() => undefined`:

```ts
const acceptsCallback = (callback: () => undefined) => {
  callback();
};
```

But we're getting an error when we try to pass in `returnString`, a function that _does_ return something:

```ts twoslash
// @errors: 2345
const acceptsCallback = (callback: () => undefined) => {
  callback();
};

// ---cut---
const returnString = () => {
  return "Hello!";
};

acceptsCallback(returnString);
```

Why is this happening? Can we alter the type of `acceptsCallback` to fix this error?

<Exercise title="Exercise 6: `void` vs `undefined`" filePath="/src/015-essential-types-and-annotations/034.5-void-vs-undefined.problem.ts"></Exercise>

#### Exercise 7: Typing Async Functions

This `fetchData` function awaits the `response` from a call to `fetch`, then gets the `data` by calling `response.json()`:

```ts
async function fetchData() {
  const response = await fetch("https://api.example.com/data");

  const data = await response.json();

  return data;
}
```

There are a couple of things worth noting here.

Hovering over `response`, we can see that it has a type of `Response`, which is a globally available type:

```ts
// hovering over response
const response: Response;
```

When hovering over `response.json()`, we can see that it returns a `Promise<any>`:

```ts
// hovering over response.json()

const response.json(): Promise<any>
```

If we were to remove the `await` keyword from the call to `fetch`, the return type would also become `Promise<any>`:

```ts
const response = fetch("https://api.example.com/data");

// hovering over response shows

const response: Promise<any>;
```

Consider this `example` and its test:

```ts twoslash
// @errors: 2344
import { Expect, Equal } from "@total-typescript/helpers";

async function fetchData() {
  const response = await fetch("https://api.example.com/data");

  const data = await response.json();

  return data;
}

// ---cut---
const example = async () => {
  const data = await fetchData();

  type test = Expect<Equal<typeof data, number>>;
};
```

The test is currently failing because `data` is typed as `any` instead of `number`.

How can we type `data` as a number without changing the calls to `fetch` or `response.json()`?

There are two possible solutions here.

<Exercise title="Exercise 7: Typing Async Functions" filePath="/src/015-essential-types-and-annotations/038-type-async-functions.problem.ts" resourceId="1fZdJK1AI9JNeRElmqAfhD"></Exercise>

#### Solution 1: Optional Function Parameters

By adding a question mark `?` to the end of a parameter, it will be marked as optional:

```ts
function concatName(first: string, last?: string) {
  // ...implementation
}
```

#### Solution 2: Default Function Parameters

To add a default parameter in TypeScript, we would use the `=` syntax that is also used in JavaScript.

In this case, we will update `last` to default to "Pocock" if no value is provided:

```ts twoslash
// @errors: 1015
export const concatName = (first: string, last?: string = "Pocock") => {
  return `${first} ${last}`;
};
```

While this passes our runtime tests, it actually fails in TypeScript.

This is because TypeScript doesn't allow us to have both an optional parameter and a default value. The optionality is already implied by the default value.

To fix the error, we can remove the question mark from the `last` parameter:

```ts
export const concatName = (first: string, last = "Pocock") => {
  return `${first} ${last}`;
};
```

#### Solution 3: Rest Parameters

When using rest parameters, all of the arguments passed to the function will be collected into an array. This means that the `strings` parameter can be typed as an array of strings:

```ts
export function concatenate(...strings: string[]) {
  return strings.join("");
}
```

Or, of course, using the `Array<>` syntax:

```ts
export function concatenate(...strings: Array<string>) {
  return strings.join("");
}
```

#### Solution 4: Function Types

Let's start by annotating the `makeChange` parameter to be a function. For now, we'll specify that it returns `any`:

```ts twoslash
// @errors: 2554
type User = {
  id: string;
  name: string;
};

// ---cut---
const modifyUser = (user: User[], id: string, makeChange: () => any) => {
  return user.map((u) => {
    if (u.id === id) {
      return makeChange(u);
    }

    return u;
  });
};
```

With this first change in place, we get an error under `u` when calling `makeChange` since we said that `makeChange` takes in no arguments.

This tells us we need to add a parameter to the `makeChange` function type.

In this case, we will specify that `user` is of type `User`.

```ts
const modifyUser = (
  user: User[],
  id: string,
  makeChange: (user: User) => any,
) => {
  // function body
};
```

This is pretty good, but we also need to make sure our `makeChange` function returns a `User`:

```ts
const modifyUser = (
  user: User[],
  id: string,
  makeChange: (user: User) => User,
) => {
  // function body
};
```

Now the errors are resolved, and we have autocompletion for the `User` properties when writing a `makeChange` function.

Optionally, we can clean up the code a bit by creating a type alias for the `makeChange` function type:

```ts
type MakeChangeFunc = (user: User) => User;

const modifyUser = (user: User[], id: string, makeChange: MakeChangeFunc) => {
  // function body
};
```

Both techniques behave the same, but if you need to reuse the `makeChange` function type, a type alias is the way to go.

#### Solution 5: Functions Returning `void`

Let's start by annotating the `listener` parameter to be a function. For now, we'll specify that it returns a string:

```ts
const addClickEventListener = (listener: () => string) => {
  document.addEventListener("click", listener);
};
```

The problem is that we now have an error when we call `addClickEventListener` with a function that returns nothing:

```ts twoslash
// @errors: 2345
const addClickEventListener = (listener: () => string) => {
  document.addEventListener("click", listener);
};

// ---cut---
addClickEventListener(() => {
  console.log("Clicked!");
});
```

The error message tells us that the `listener` function is returning `void`, which is not assignable to `string`.

This suggests that instead of typing the `listener` parameter as a function that returns a string, we should type it as a function that returns `void`:

```ts
const addClickEventListener = (listener: () => void) => {
  document.addEventListener("click", listener);
};
```

This is a great way to tell TypeScript that we don't care about the return value of the `listener` function.

#### Solution 6: `void` vs `undefined`

The solution is to change the of `callback` to `() => void`:

```ts
const acceptsCallback = (callback: () => void) => {
  callback();
};
```

Now we can pass in `returnString` without any issues. This is because `returnString` returns a `string`, and `void` tells TypeScript to ignore the return value when comparing them.

So if you really don't care about the result of a function, you should type it as `() => void`.

#### Solution 7: Typing Async Functions

You might be tempted to try passing a type argument to `fetch`, similar to how you would with `Map` or `Set`.

However, hovering over `fetch`, we can see that it doesn't accept type arguments:

```ts
// @noErrors
const response = fetch<number>("https://api.example.com/data");
//               ^?
```

We also can't add a type annotation to `response.json()` because as it doesn't accept type arguments either:

```ts twoslash
// @errors: 2558
const response = await fetch("https://api.example.com/data");

// ---cut---
const data: number = await response.json<number>();
```

One thing that will work is to specify that `data` is a `number`:

```ts
const response = await fetch("https://api.example.com/data");

// ---cut---
const data: number = await response.json();
```

This works because `data` was `any` before, and `await response.json()` returns `any`. So now we're putting `any` into a slot that requires a `number`.

However, the best way to solve this problem is to add a return type to the function. In this case, it should be a `number`:

```ts twoslash
// @errors: 1064
async function fetchData(): number {
  // function body

  return 123;
}
```

Now `data` is typed as a `number`, except we have an error under our return type annotation.

So, we should change the return type to `Promise<number>`:

```ts twoslash
async function fetchData(): Promise<number> {
  const response = await fetch("https://api.example.com/data");

  const data = await response.json();

  return data;
}
```

By wrapping the `number` inside of `Promise<>`, we make sure that the `data` is awaited before the type is figured out.


--- CHAPTER ---

In this section, we're going to see how TypeScript can help when a value is one of many possible types. We'll first look at declaring those types using union types, then we'll see how TypeScript can narrow down the type of a value based on your runtime code.

## Unions and Literals

### Union Types

A union type is TypeScript's way of saying that a value can be "either this type or that type".

This situation comes up in JavaScript all the time. Imagine you have a value that is a `string` on Tuesdays, but `null` the rest of the time:

```ts twoslash
const message = Date.now() % 2 === 0 ? "Hello Tuesdays!" : null;
//    ^?
```

If we hover over `message`, we can see that TypeScript has inferred its type as `string | null`.

This is a union type. It means that `message` can be either a `string` or `null`.

#### Declaring Union Types

We can declare our own union types.

For example, you might have an `id` that could be either a `string` or a `number`:

```ts twoslash
const logId = (id: string | number) => {
  console.log(id);
};
```

This means that `logId` can accept either a `string` or a `number` as an argument, but not a `boolean`:

```ts twoslash
// @errors: 2345
const logId = (id: string | number) => {
  console.log(id);
};
// ---cut---
logId("abc");

logId(123);

logId(true);
```

To create a union type, the `|` operator is used to separate the types. Each type of the union is called a 'member' of the union.

Union types also work when creating your own type aliases. For example, we can refactor our earlier definition into a type alias:

```typescript
type Id = number | string;

function logId(id: Id) {
  console.log(id);
}
```

Union types can contain many different types - they don't all have to be primitives, or don't need to be related in any way. When they get particularly large, you can use this syntax (with the `|` before the first member of the union) to make it more readable:

```typescript
type AllSortsOfStuff =
  | string
  | number
  | boolean
  | object
  | null
  | {
      name: string;
      age: number;
    };
```

Union types can be used in many different ways, and they're a powerful tool for creating flexible type definitions.

### Literal Types

Just as TypeScript allows us to create union types from multiple types, it also allows us to create types which represent a specific primitive value. These are called literal types.

Literal types can be used to represent strings, numbers, or booleans that have specific values.

```typescript
type YesOrNo = "yes" | "no";
type StatusCode = 200 | 404 | 500;
type TrueOrFalse = true | false;
```

In the `YesOrNo` type, the `|` operator is used to create a union of the string literals `"yes"` and `"no"`. This means that a value of type `YesOrNo` can only be one of these two strings.

This feature is what powers the autocomplete we've seen in functions like `document.addEventListener`:

```typescript
document.addEventListener(
  // DOMContentLoaded, mouseover, etc.
  "click",
  () => {},
);
```

The first argument to `addEventListener` is a union of string literals, which is why we get autocompletion for the different event types.

### Combining Unions With Unions

What happens when we make a union of two union types? They combine together to make one big union.

For example, we can create `DigitalFormat` and `PhysicalFormat` types that contain a union of literal values:

```tsx
type DigitalFormat = "MP3" | "FLAC";

type PhysicalFormat = "LP" | "CD" | "Cassette";
```

We could then specify `AlbumFormat` as a union of `DigitalFormat` and `PhysicalFormat`:

```tsx
type AlbumFormat = DigitalFormat | PhysicalFormat;
```

Now, we can use the `DigitalFormat` type for functions that handle digital formats, and the `AnalogFormat` type for functions that handle analog formats. The `AlbumFormat` type can be used for functions that handle all cases.

This way, we can ensure that each function only handles the cases it's supposed to handle, and TypeScript will throw an error if we try to pass an incorrect format to a function.

```ts twoslash
// @errors: 2345
type PhysicalFormat = "LP" | "CD" | "Cassette";
// ---cut---
const getAlbumFormats = (format: PhysicalFormat) => {
  // function body
};

getAlbumFormats("MP3");
```

### Exercises

#### Exercise 1: `string` or `null`

Here we have a function called `getUsername` that takes in a `username` string. If the `username` is not equal to `null`, we return a new interpolated string. Otherwise, we return `"Guest"`:

```typescript
function getUsername(username: string) {
  if (username !== null) {
    return `User: ${username}`;
  } else {
    return "Guest";
  }
}
```

In the first test, we call `getUsername` and pass in a string of "Alice" which passes as expected. However, in the second test, we have a red squiggly line under `null` when passing it into `getUsername`:

```ts twoslash
// @errors: 2345
import { Equal, Expect } from "@total-typescript/helpers";

function getUsername(username: string) {
  if (username !== null) {
    return `User: ${username}`;
  } else {
    return "Guest";
  }
}

// ---cut---
const result = getUsername("Alice");

type test = Expect<Equal<typeof result, string>>;

const result2 = getUsername(null);

type test2 = Expect<Equal<typeof result2, string>>;
```

Normally we wouldn't explicitly call the `getUsername` function with `null`, but in this case it's important that we handle `null` values. For example, we might be getting the `username` from a user record in a database, and the user might or might not have a name depending on how they signed up.

Currently, the `username` parameter only accepts a `string` type, and the check for `null` isn't doing anything. Update the function parameter's type so the errors are resolved and the function can handle `null` .

<Exercise title="Exercise 1: `string` or `null`" filePath="/src/018-unions-and-narrowing/053-introduction-to-unions.problem.ts"></Exercise>

#### Exercise 2: Restricting Function Parameters

Here we have a `move` function that takes in a `direction` of type string, and a `distance` of type number:

```tsx
function move(direction: string, distance: number) {
  // Move the specified distance in the given direction
}
```

The implementation of the function is not important, but the idea is that we want to be able to move either up, down, left, or right.

Here's what calling the `move` function might look like:

```typescript
move("up", 10);

move("left", 5);
```

To test this function, we have some `@ts-expect-error` directives that tell TypeScript we expect the following lines to throw an error.

However, since the `move` function currently takes in a `string` for the `direction` parameter, we can pass in any string we want, even if it's not a valid direction. There is also a test where we expect that passing `20` as a distance won't work, but it's being accepted as well.

This leads to TypeScript drawing red squiggly lines under the `@ts-expect-error` directives:

```ts twoslash
// @errors: 2578
function move(direction: string, distance: number) {
  // Move the specified distance in the given direction
}
// ---cut---
move(
  // @ts-expect-error - "up-right" is not a valid direction
  "up-right",
  10,
);

move(
  // @ts-expect-error - "down-left" is not a valid direction
  "down-left",
  20,
);
```

Your challenge is to update the `move` function so that it only accepts the strings `"up"`, `"down"`, `"left"`, and `"right"`. This way, TypeScript will throw an error when we try to pass in any other string.

<Exercise title="Exercise 2: Restricting Function Parameters" filePath="/src/018-unions-and-narrowing/054-literal-types.problem.ts"></Exercise>

#### Solution 1: `string` or `null`

The solution is to update the `username` parameter to be a union of `string` and `null`:

```typescript
function getUsername(username: string | null) {
  // function body
}
```

With this change, the `getUsername` function will now accept `null` as a valid value for the `username` parameter, and the errors will be resolved.

#### Solution 2: Restricting Function Parameters

In order to restrict what the `direction` can be, we can use a union type of literal values (in this case strings).

Here's what this looks like:

```typescript
function move(direction: "up" | "down" | "left" | "right", distance: number) {
  // Move the specified distance in the given direction
}
```

With this change, we now have autocomplete for the possible `direction` values.

To clean things up a bit, we can create a new type alias called `Direction` and update the parameter accordingly:

```typescript
type Direction = "up" | "down" | "left" | "right";

function move(direction: Direction, distance: number) {
  // Move the specified distance in the given direction
}
```

## Narrowing

### Wider vs Narrower Types

Some types are wider versions of other types. For example, `string` is wider than the literal string `"small"`. This is because `string` can be any string, while `"small"` can only be the string `"small"`.

In reverse, we might say that `"small"` is a 'narrower' type than `string`. It's a more specific version of a string. `404` is a narrower type than `number`, and `true` is a narrower type than `boolean`.

This is only true of types which have some kind of shared relationship. For example, `"small"` is not a narrower version of `number` - because `"small"` itself is not a number.

In TypeScript, the narrower version of a type can always take the place of the wider version.

For example, if a function accepts a `string`, we can pass in `"small"`:

```typescript
const logSize = (size: string) => {
  console.log(size.toUpperCase());
};

logSize("small");
```

But if a function accepts `"small"`, we can't pass any random `string`:

```ts twoslash
// @errors: 2345
const recordOfSizes = {
  small: "small",
  large: "large",
};

const logSize = (size: "small" | "large") => {
  console.log(recordOfSizes[size]);
};

logSize("medium");
```

If you're familiar with the concept of 'subtypes' and 'supertypes' in set theory, this is a similar idea. `"small"` is a subtype of `string` (it is more specific), and `string` is a supertype of `"small"`.

### Unions Are Wider Than Their Members

A union type is a wider type than its members. For example, `string | number` is wider than `string` or `number` on their own.

This means that we can pass a `string` or a `number` to a function that accepts `string | number`:

```typescript
function logId(id: string | number) {
  console.log(id);
}

logId("abc");
logId(123);
```

However, this doesn't work in reverse. We can't pass `string | number` to a function that only accepts `string`.

For example, if we changed this `logId` function to only accept a `number`, TypeScript would throw an error when we try to pass `string | number` to it:

```ts twoslash
// @errors: 2345
function logId(id: number) {
  console.log(`The id is ${id}`);
}

type User = {
  id: string | number;
};

const user: User = {
  id: 123,
};

logId(user.id);
```

Hovering over `user.id` shows:

```
Argument of type 'string | number' is not assignable to parameter of type 'number'.
  Type 'string' is not assignable to type 'number'.
```

So, it's important to think of a union type as a wider type than its members.

### What is Narrowing?

Narrowing in TypeScript lets us take a wider type and make it narrower using runtime code.

This can be useful when we want to do different things based on the type of a value. For example, we might want to handle a `string` differently to a `number`, or `"small"` differently to `"large"`.

### Narrowing with `typeof`

One way we can narrow down the type of a value is to use the `typeof` operator, combined with an `if` statement.

Consider a function `getAlbumYear` that takes in a parameter `year`, which can either be a `string` or `number`. Here's how we could use the `typeof` operator to narrow down the type of `year`:

```typescript
const getAlbumYear = (year: string | number) => {
  if (typeof year === "string") {
    console.log(`The album was released in ${year.toUppercase()}.`); // `year` is string
  } else if (typeof year === "number") {
    console.log(`The album was released in ${year.toFixed(0)}.`); // `year` is number
  }
};
```

It looks straightforward, but there are some important things to realize about what's happening behind the scenes.

Scoping plays a big role in narrowing. In the first `if` block, TypeScript understands that `year` is a `string` because we've used the `typeof` operator to check its type. In the `else if` block, TypeScript understands that `year` is a `number` because we've used the `typeof` operator to check its type.

<!-- ILLUSTRATION HERE? -->

This lets us call `toUpperCase` on `year` when it's a `string`, and `toFixed` on `year` when it's a `number`.

However, anywhere outside of the conditional block the type of `year` is still the union `string | number`. This is because narrowing only applies within the block's scope.

For the sale of illustration, if we add a `boolean` to the `year` union, the first `if` block will still end up with a type of `string`, but the `else` block will end up with a type of `number | boolean`:

```typescript
const getAlbumYear = (year: string | number | boolean) => {
  if (typeof year === "string") {
    console.log(`The album was released in ${year}.`); // `year` is string
  } else if (typeof year === "number") {
    console.log(`The album was released in ${year}.`); // `year` is number | boolean
  }

  console.log(year); // `year` is string | number | boolean
};
```

This is a powerful example of how TypeScript can read your runtime code and use it to narrow down the type of a value.

### Other Ways to Narrow

The `typeof` operator is just one way to narrow types.

TypeScript can use other conditional operators like `&&` and `||`, and will take the truthiness into account for coercing the boolean value. It's also possible to use other operators like `instanceof` and `in` for checking object properties. You can even throw errors or use early returns to narrow types.

We'll take a closer look at these in the following exercises.

### Exercises

#### Exercise 1: Narrowing with `if` Statements

Here we have a function called `validateUsername` that takes in either a `string` or `null`, and will always return a `boolean`:

```ts twoslash
// @errors: 18047
function validateUsername(username: string | null): boolean {
  return username.length > 5;

  return false;
}
```

Tests for checking the length of the username pass as expected:

```typescript
it("should return true for valid usernames", () => {
  expect(validateUsername("Matt1234")).toBe(true);

  expect(validateUsername("Alice")).toBe(false);

  expect(validateUsername("Bob")).toBe(false);
});
```

However, we have an error underneath `username` inside of the function body, because it could possibly be `null` and we are trying to access a property off of it.

```typescript
it("Should return false for null", () => {
  expect(validateUsername(null)).toBe(false);
});
```

Your task is to rewrite the `validateUsername` function to add narrowing so that the `null` case is handled and the tests all pass.

<Exercise title="Exercise 1: Narrowing with `if` Statements" filePath="/src/018-unions-and-narrowing/059-narrowing-with-if-statements.problem.ts"></Exercise>

#### Exercise 2: Throwing Errors to Narrow

Here we have a line of code that uses `document.getElementById` to fetch an HTML element, which can return either an `HTMLElement` or `null`:

```typescript
const appElement = document.getElementById("app");
```

Currently, a test to see if the `appElement` is an `HTMLElement` fails:

```ts twoslash
// @errors: 2344
import { Equal, Expect } from "@total-typescript/helpers";

const appElement = document.getElementById("app");

// ---cut---
type Test = Expect<Equal<typeof appElement, HTMLElement>>;
```

Your task is to use `throw` to narrow down the type of `appElement` before it's checked by the test.

<Exercise title="Exercise 2: Throwing Errors to Narrow" filePath="/src/018-unions-and-narrowing/062-throwing-errors-to-narrow.problem.ts"></Exercise>

#### Exercise 3: Using `in` to Narrow

Here we have a `handleResponse` function that takes in a type of `APIResponse`, which is a union of two types of objects.

The goal of the `handleResponse` function is to check whether the provided object has a `data` property. If it does, the function should return the `id` property. If not, it should throw an `Error` with the message from the `error` property.

```tsx
type APIResponse =
  | {
      data: {
        id: string;
      };
    }
  | {
      error: string;
    };

const handleResponse = (response: APIResponse) => {
  // How do we check if 'data' is in the response?

  if (true) {
    return response.data.id;
  } else {
    throw new Error(response.error);
  }
};
```

Currently, there are several errors being thrown as seen in the following tests.

The first error is `Property 'data' does not exist on type 'APIResponse'`

```tsx
test("passes the test even with the error", () => {
  // there is no error in runtime

  expect(() =>
    HandleResponseOrThrowError({
      error: "Invalid argument",
    }),
  ).not.toThrowError();

  // but the data is returned, instead of an error.

  expect(
    HandleResponseOrThrowError({
      error: "Invalid argument",
    }),
  ).toEqual("Should this be 'Error'?");
});
```

Then we have the inverse error, where `Property 'error' does not exist on type 'APIResponse'`:

```
Property data does not exist on type 'APIResponse'.
```

Your challenge is to find the correct syntax for narrowing down the types within the `handleResponse` function's `if` condition.

The changes should happen inside of the function without modifying any other parts of the code.

<Exercise title="Exercise 3: Using `in` to Narrow" filePath="/src/018-unions-and-narrowing/064-narrowing-with-in-statements.problem.ts"></Exercise>

#### Solution 1: Narrowing with `if` Statements

There are several different ways to validate the username length.

##### Option 1: Check Truthiness

We could use an `if` statement to check if `username` is truthy. If it does, we can return `username.length > 5`, otherwise we can return `false`:

```typescript
function validateUsername(username: string | null): boolean {
  // Rewrite this function to make the error go away

  if (username) {
    return username.length > 5;
  }

  return false;
}
```

There is a catch to this piece of logic. If `username` is an empty string, it will return `false` because an empty string is falsy. This happens to match the behavior we want for this exercise - but it's important to bear that in mind.

##### Option 2: Check if `typeof username` is `"string"`

We could use `typeof` to check if the username is a string:

```typescript
function validateUsername(username: string | null): boolean {
  if (typeof username === "string") {
    return username.length > 5;
  }

  return false;
}
```

This avoids the issue with empty strings.

##### Option 3: Check if `typeof username` is not `"string"`

Similar to the above, we could check if `typeof username !== "string"`.

In this case, if `username` is not a string, we know it's `null` and could return `false` right away. Otherwise, we'd return the check for length being greater than 5:

```typescript
function validateUsername(username: string | null | undefined): boolean {
  if (typeof username !== "string") {
    return false;
  }

  return username.length > 5;
}
```

This shows that TypeScript understands the _reverse_ of a check. Very smart.

##### Option 4: Check if `typeof username` is `"object"`

A odd JavaScript quirk is that the type of `null` is equal to `"object"`.

TypeScript knows this, so we can actually use it to our advantage. We can check if `username` is an object, and if it is, we can return `false`:

```typescript
function validateUsername(username: string | null): boolean {
  if (typeof username === "object") {
    return false;
  }

  return username.length > 5;
}
```

##### Option 5: Extract the check into its own variable

Finally, for readability and reusability purposes you could store the check in its own variable `isUsernameOK`.

Here's what this would look like:

```typescript
function validateUsername(username: string | null): boolean {
  const isUsernameOK = typeof username === "string";

  if (isUsernameOK) {
    return username.length > 5;
  }

  return false;
}
```

TypeScript is smart enough to understand that the value of `isUsernameOK` corresponds to whether `username` is a string or not. Very smart.

All of the above options use `if` statements to perform checks by narrowing types by using `typeof`.

No matter which option you go with, remember that you can always use an `if` statement to narrow your type and add code to the case that the condition passes.

#### Solution 2: Throwing Errors to Narrow

The issue with this code is that `document.getElementById` returns `null | HTMLElement`. But we want to make sure that `appElement` is an `HTMLElement` before we use it.

We are pretty sure that `appElement` exists. If it doesn't exist, we probably want to crash the app early so that we can get an informative error about what's gone wrong.

So, we can add an `if` statement that checks if `appElement` is falsy, then throws an error:

```typescript
if (!appElement) {
  throw new Error("Could not find app element");
}
```

By adding this error condition, we can be sure that we will never reach any subsequent code if `appElement` is `null`.

If we hover over `appElement` after the `if` statement, we can see that TypeScript now knows that `appElement` is an `HTMLElement` - it's no longer `null`. This means our test also now passes:

```ts twoslash
import { Equal, Expect } from "@total-typescript/helpers";

const appElement = document.getElementById("app");

if (!appElement) {
  throw new Error("Could not find app element");
}

// ---cut---
console.log(appElement);
//          ^?

type Test = Expect<Equal<typeof appElement, HTMLElement>>; // passes
```

Throwing errors like this can help you identify issues at runtime. In this specific case, it narrows down the code _outside_ of the immediate `if` statement scope. Amazing.

#### Solution 3: Using `in` to Narrow

Your first instinct will be to check if `response.data` is truthy.

```ts twoslash
// @errors: 2339
type APIResponse =
  | {
      data: {
        id: string;
      };
    }
  | {
      error: string;
    };

// ---cut---
const handleResponse = (response: APIResponse) => {
  if (response.data) {
    return response.data.id;
  } else {
    throw new Error(response.error);
  }
};
```

But you'll get an error. This is because `response.data` is only available on one of the members of the union. TypeScript doesn't know that `response` is the one with `data` on it.

##### Option 1: Changing the Type

It may be tempting to change the `APIResponse` type to add `.data` to both branches:

```tsx
type APIResponse =
  | {
      data: {
        id: string;
      };
    }
  | {
      data?: undefined;
      error: string;
    };
```

This is certainly one way to handle it. But there is a built-in way to do it.

##### Option 2: Using `in`

We can use an `in` operator to check if a specific key exists on `response`.

In this example, it would check for the key `data`:

```ts twoslash
type APIResponse =
  | {
      data: {
        id: string;
      };
    }
  | {
      error: string;
    };

// ---cut---
const handleResponse = (response: APIResponse) => {
  if ("data" in response) {
    return response.data.id;
  } else {
    throw new Error(response.error);
  }
};
```

If the `response` isn't the one with `data` on it, then it must be the one with `error`, so we can throw an `Error` with the error message.

You can check this out by hovering over `.data` and `.error` in each of the branches of the `if` statement. TypeScript will show you that it knows the type of `response` in each case.

Using `in` here gives us a great way to narrow down objects that might have different keys from one another.

## `unknown` and `never`

Let's pause for a moment to introduce a couple more types that play an important role in TypeScript, particularly when we talk about 'wide' and 'narrow' types.

### The Widest Type: `unknown`

TypeScript's widest type is `unknown`. It represents something that we don't know what it is.

If you imagine a scale whether the widest types are at the top and the narrowest types are at the bottom, `unknown` is at the top. All other types like strings, numbers, booleans, null, undefined, and their respective literals are assignable to `unknown`, as seen in its assignability chart:

<img src="https://res.cloudinary.com/total-typescript/image/upload/v1706814781/065-introduction-to-unknown.explainer_ohm9pd.png">

Consider this example function `fn` that takes in an `input` parameter of type `unknown`:

```ts twoslash
const fn = (input: unknown) => {};

// Anything is assignable to unknown!
fn("hello");
fn(42);
fn(true);
fn({});
fn([]);
fn(() => {});
```

All of the above function calls are valid because `unknown` is assignable to any other type

The `unknown` type is the preferred choice when you want to represent something that's truly unknown in JavaScript. For example, it is extremely useful when you have things coming into your application from outside sources, like input from a form or a call to a webhook.

#### What's the Difference Between `unknown` and `any`?

You might be wondering what the difference is between `unknown` and `any`. They're both wide types, but there's a key difference.

`any` doesn't really fit into our definition of 'wide' and 'narrow' types. It breaks the type system. It's not really a type at all - it's a way of opting out of TypeScript's type checking.

`any` can be assigned to anything, and anything can be assigned to `any`. `any` is both narrower and wider than every other type.

`unknown`, on the other hand, is part of TypeScript's type system. It's wider than every other type, so it can't be assigned to anything.

```ts twoslash
// @errors: 18046
const handleWebhookInput = (input: unknown) => {
  input.toUppercase();
};

const handleWebhookInputWithAny = (input: any) => {
  // no error
  input.toUppercase();
};
```

This means that `unknown` is a safe type, but `any` is not. `unknown` means "I don't know what this is", while `any` means "I don't care what this is".

### The Narrowest Type: `never`

If `unknown` is the widest type in TypeScript, `never` is the narrowest.

`never` represents something that will _never_ happen. It's the very bottom of the type hierarchy.

You'll rarely use a `never` type annotation yourself. Instead, it'll pop up in error messages and hovers - often when narrowing.

But first, let's look at a simple example of a `never` type:

#### `never` vs `void`

Let's consider a function that never returns anything:

```typescript
const getNever = () => {
  // This function never returns!
};
```

When hovering this function, TypeScript will infer that it returns `void`, indicating that it essentially returns nothing.

```typescript
// hovering over `getNever` shows:

const getNever: () => void;
```

However, if we throw an error inside of the function, the function will _never_ return:

```typescript
const getNever = () => {
  throw new Error("This function never returns");
};
```

With this change, TypeScript will infer that the function's type is `never`:

```typescript
// hovering over `getNever` shows:

const getNever: () => never;
```

The `never` type represents something that can never happen.

There are some weird implications for the `never` type.

You cannot assign anything to `never`, except for `never` itself.

```ts twoslash
// @errors: 2345
const getNever = () => {
  throw new Error("This function never returns");
};
// ---cut---
const fn = (input: never) => {};

fn("hello");
fn(42);
fn(true);
fn({});
fn([]);
fn(() => {});

// no error here, since we're assigning `never` to `never`

fn(getNever());
```

However, you can assign `never` to anything:

```typescript
const str: string = getNever();

const num: number = getNever();

const bool: boolean = getNever();

const arr: string[] = getNever();
```

This behavior looks extremely odd at first - but we'll see later why it's useful.

Let's update our chart to include `never`:

![assignability chart with never](https://res.cloudinary.com/total-typescript/image/upload/v1706814786/067-introduction-to-never.explainer_ktradt.png)

This gives us pretty much the full picture of TypeScript's type hierarchy.

### Exercises

#### Exercise 1: Narrowing Errors with `instanceof`

In TypeScript, one of the most common places you'll encounter the `unknown` type is when using a `try...catch` statement to handle potentially dangerous code. Let's consider an example:

```ts twoslash
// @errors: 18046
const somethingDangerous = () => {
  if (Math.random() > 0.5) {
    throw new Error("Something went wrong");
  }

  return "all good";
};

try {
  somethingDangerous();
} catch (error) {
  if (true) {
    console.error(error.message);
  }
}
```

In the code snippet above, we have a function called `somethingDangerous` that has a 50/50 chance of either throwing an error.

Notice that the `error` variable in the `catch` clause is typed as `unknown`.

Now let's say we want to log the error using `console.error()` only if the error contains a `message` attribute. We know that errors typically come with a `message` attribute, like in the following example:

```typescript
const error = new Error("Some error message");

console.log(error.message);
```

Your task is to update the `if` statement to have the proper condition to check if the `error` has a message attribute before logging it. Check the title of the exercise to get a hint... And remember, `Error` is a class.

<Exercise title="Exercise 1: Narrowing Errors with `instanceof`" filePath="/src/018-unions-and-narrowing/065.5-narrowing-with-instanceof-statements.problem.ts"></Exercise>

#### Exercise 2: Narrowing `unknown` to a Value

Here we have a `parseValue` function that takes in a `value` of type `unknown`:

```ts twoslash
// @errors: 18046
const parseValue = (value: unknown) => {
  if (true) {
    return value.data.id;
  }

  throw new Error("Parsing error!");
};
```

The goal of this function is to return the `id` property of the `data` property of the `value` object. If the `value` object doesn't have a `data` property, then it should throw an error.

Here are some tests for the function that show us the amount of narrowing that needs to be done inside of the `parseValue` function:

```typescript
it("Should handle a { data: { id: string } }", () => {
  const result = parseValue({
    data: {
      id: "123",
    },
  });

  type test = Expect<Equal<typeof result, string>>;

  expect(result).toBe("123");
});

it("Should error when anything else is passed in", () => {
  expect(() => parseValue("123")).toThrow("Parsing error!");

  expect(() => parseValue(123)).toThrow("Parsing error!");
});
```

Your challenge is to modify the `parseValue` function so that the tests pass and the errors go away. I want you to challenge yourself to do this _only_ by narrowing the type of `value` inside of the function. No changes to the types. This will require a very large `if` statement!

<Exercise title="Exercise 2: Narrowing `unknown` to a Value" filePath="/src/018-unions-and-narrowing/066-narrowing-unknown-to-a-value.problem.ts"></Exercise>

#### Exercise 3: Reusable Type Guards

Let's imagine that we have two functions which both take in a `value` of type `unknown`, and attempt to parse that value to an array of strings.

Here's the first function, which joins an array of names together into a single string:

```typescript
const joinNames = (value: unknown) => {
  if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
    return value.join(" ");
  }

  throw new Error("Parsing error!");
};
```

And here's the second function, which maps over the array of names and adds a prefix to each one:

```typescript
const createSections = (value: unknown) => {
  if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
    return value.map((item) => `Section: ${item}`);
  }

  throw new Error("Parsing error!");
};
```

Both functions have the same conditional check:

```ts
if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
```

This is a great opportunity to create a reusable type guard.

All the tests are currently passing. Your job is to try to refactor the two functions to use a reusable type guard, and remove the duplicated code. As it turns out, TypeScript makes this a lot easier than you expect.

<Exercise title="Exercise 3: Reusable Type Guards" filePath="/src/018-unions-and-narrowing/072.5-reusable-type-guards.problem.ts"></Exercise>

#### Solution 1: Narrowing Errors with `instanceof`

The way to solve this challenge is to narrow the `error` using the `instanceof` operator.

Where we check the error message, we'll check if `error` is an instance of the class `Error`:

```typescript
if (error instanceof Error) {
  console.log(error.message);
}
```

The `instanceof` operator covers other classes which inherit from the `Error` class as well, such as `TypeError`.

In this case, we're logging the error message to the console - but this could be used to display something different in our applications, or to log the error to an external service.

Even though it works in this particular example for all kinds of `Error`s, it won't cover us for the strange case where someone throws a non-`Error` object.

```typescript
throw "This is not an error!";
```

To be more safe from these edge cases, it's a good idea to include an `else` block that would throw the `error` variable like so:

```typescript
if (error instanceof Error) {
  console.log(error.message);
} else {
  throw error;
}
```

Using this technique, we can handle the error in a safe way and avoid any potential runtime errors.

#### Solution 2: Narrowing `unknown` to a Value

Here's our starting point:

```ts twoslash
// @errors: 18046
const parseValue = (value: unknown) => {
  if (true) {
    return value.data.id;
  }

  throw new Error("Parsing error!");
};
```

To fix the error, we'll need to narrow the type using conditional checks. Let's take it step-by-step.

First, we'll check if the type of `value` is an `object` by replacing the `true` with a type check:

```ts twoslash
// @errors: 18047 2339
const parseValue = (value: unknown) => {
  if (typeof value === "object") {
    return value.data.id;
  }

  throw new Error("Parsing error!");
};
```

Then we'll check if the `value` argument has a `data` attribute using the `in` operator:

```ts twoslash
// @errors: 18047 18046
const parseValue = (value: unknown) => {
  if (typeof value === "object" && "data" in value) {
    return value.data.id;
  }

  throw new Error("Parsing error!");
};
```

With this change, TypeScript is complaining that `value` is possibly `null`. This is because, of course, `typeof null` is `"object"`. Thanks, JavaScript!

To fix this, we can add `&& value` to our first condition to make sure it isn't `null`:

```ts twoslash
// @errors: 18046
const parseValue = (value: unknown) => {
  if (typeof value === "object" && value && "data" in value) {
    return value.data.id;
  }

  throw new Error("Parsing error!");
};
```

Now our condition check is passing, but we're still getting an error on `value.data` being typed as `unknown`.

What we need to do now is to narrow the type of `value.data` to an `object` and make sure that it isn't `null`. At this point we'll also add specify a return type of `string` to avoid returning an `unknown` type:

```ts twoslash
// @errors: 2339
const parseValue = (value: unknown): string => {
  if (
    typeof value === "object" &&
    value !== null &&
    "data" in value &&
    typeof value.data === "object" &&
    value.data !== null
  ) {
    return value.data.id;
  }

  throw new Error("Parsing error!");
};
```

Finally, we'll add a check to ensure that the `id` is a string. If not, TypeScript will throw an error:

```typescript
const parseValue = (value: unknown): string => {
  if (
    typeof value === "object" &&
    value !== null &&
    "data" in value &&
    typeof value.data === "object" &&
    value.data !== null &&
    "id" in value.data &&
    typeof value.data.id === "string"
  ) {
    return value.data.id;
  }

  throw new Error("Parsing error!");
};
```

Now when we hover over `parseValue`, we can see that it takes in an `unknown` input and always returns a `string`:

```typescript
// hovering over `parseValue` shows:

const parseValue: (value: unknown) => string;
```

Thanks to this huge conditional, our tests pass, and our error messages are gone!

This is usually _not_ how you'd want to write your code. It's a bit of a mess. You could use a library like [Zod](https://zod.dev) to do this with a much nicer API. But it's a great way to understand how `unknown` and narrowing work in TypeScript.

#### Solution 3: Reusable Type Guards

The first step is to create a function called `isArrayOfStrings` that captures the conditional check:

```typescript
const isArrayOfStrings = (value) => {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
};
```

We haven't given `value` a type here - `unknown` makes sense, because it could be anything.

Now we can refactor the two functions to use this type guard:

```typescript
const joinNames = (value: unknown) => {
  if (isArrayOfStrings(value)) {
    return value.join(" ");
  }

  throw new Error("Parsing error!");
};

const createSections = (value: unknown) => {
  if (isArrayOfStrings(value)) {
    return value.map((item) => `Section: ${item}`);
  }

  throw new Error("Parsing error!");
};
```

Incredibly, this is all TypeScript needs to be able to narrow the type of `value` inside of the `if` statement. It's smart enough to understand that `isArrayOfStrings` being called on `value` ensures that `value` is an array of strings.

We can observe this by hovering over `isArrayOfStrings`:

```typescript
// hovering over `isArrayOfStrings` shows:
const isArrayOfStrings: (value: unknown) => value is string[];
```

This return type we're seeing is a type predicate. It's a way of saying "if this function returns `true`, then the type of the value is `string[]`".

We'll look at authoring our own type predicates in one of the later chapters in the book - but it's very useful that TypeScript infers its own.

## Discriminated Unions

In this section we'll look at a common pattern TypeScript developers use to structure their code. It's called a 'discriminated union'.

To understand what a discriminated union is, let's first look at the problem it solves.

### The Problem: The Bag Of Optionals

Let's imagine we are modelling a data fetch. We have a `State` type with a `status` property which can be in one of three states: `loading`, `success`, or `error`.

```typescript
type State = {
  status: "loading" | "success" | "error";
};
```

This is useful, but we also need to capture some extra data. The data coming back from the fetch, or the error message if the fetch fails.

We could add an `error` and `data` property to the `State` type:

```typescript
type State = {
  status: "loading" | "success" | "error";
  error?: string;
  data?: string;
};
```

And let's imagine we have a `renderUI` function that returns a string based on the input.

```ts twoslash
// @errors: 18048
type State = {
  status: "loading" | "success" | "error";
  error?: string;
  data?: string;
};
// ---cut---
const renderUI = (state: State) => {
  if (state.status === "loading") {
    return "Loading...";
  }

  if (state.status === "error") {
    return `Error: ${state.error.toUpperCase()}`;
  }

  if (state.status === "success") {
    return `Data: ${state.data}`;
  }
};
```

This all looks good, except for the error we're getting on `state.error`. TypeScript is telling us that `state.error` could be `undefined`, and we can't call `toUpperCase` on `undefined`.

This is because we've declared our `State` type in an incorrect way. We've made it so the `error` and `data` properties are _not related to the statuses where they occur_. In other words, it's possible to create types which will never happen in our app:

```typescript
const state: State = {
  status: "loading",
  error: "This is an error", // should not happen on "loading!"
  data: "This is data", // should not happen on "loading!"
};
```

I'd describe this type as a "bag of optionals". It's a type that's too loose. We need to tighten it up so that `error` can only happen on `error`, and `data` can only happen on `success`.

### The Solution: Discriminated Unions

The solution is to turn our `State` type into a discriminated union.

A discriminated union is a type that has a common property, the 'discriminant', which is a literal type that is unique to each member of the union.

In our case, the `status` property is the discriminant.

Let's take each status and separate them into separate object literals:

```typescript
type State =
  | {
      status: "loading";
    }
  | {
      status: "error";
    }
  | {
      status: "success";
    };
```

Now, we can associate the `error` and `data` properties with the `error` and `success` statuses respectively:

```typescript
type State =
  | {
      status: "loading";
    }
  | {
      status: "error";
      error: string;
    }
  | {
      status: "success";
      data: string;
    };
```

Now, if we hover over `state.error` in the `renderUI` function, we can see that TypeScript knows that `state.error` is a `string`:

```ts twoslash
type State =
  | {
      status: "loading";
    }
  | {
      status: "error";
      error: string;
    }
  | {
      status: "success";
      data: string;
    };

// ---cut---
const renderUI = (state: State) => {
  if (state.status === "loading") {
    return "Loading...";
  }

  if (state.status === "error") {
    return `Error: ${state.error.toUpperCase()}`;
    //                     ^?
  }

  if (state.status === "success") {
    return `Data: ${state.data}`;
  }
};
```

This is due to TypeScript's narrowing - it knows that `state.status` is `"error"`, so it knows that `state.error` is a `string` inside of the `if` block.

To clean up our original type, we could use a type alias for each of the statuses:

```typescript
type LoadingState = {
  status: "loading";
};

type ErrorState = {
  status: "error";
  error: string;
};

type SuccessState = {
  status: "success";
  data: string;
};

type State = LoadingState | ErrorState | SuccessState;
```

So if you're noticing that your types are resembling 'bags of optionals', it's a good idea to consider using a discriminated union.

### Exercises

#### Exercise 1: Destructuring a Discriminated Union

Consider a discriminated union called `Shape` that is made up of two types: `Circle` and `Square`. Both types have a `kind` property that acts as the discriminant.

```tsx
type Circle = {
  kind: "circle";
  radius: number;
};

type Square = {
  kind: "square";
  sideLength: number;
};

type Shape = Circle | Square;
```

This `calculateArea` function destructures the `kind`, `radius`, and `sideLength` properties from the `Shape` that is passed in, and calculates the area of the shape accordingly:

```ts twoslash
// @errors: 2339
type Circle = {
  kind: "circle";
  radius: number;
};

type Square = {
  kind: "square";
  sideLength: number;
};

type Shape = Circle | Square;

// ---cut---
function calculateArea({ kind, radius, sideLength }: Shape) {
  if (kind === "circle") {
    return Math.PI * radius * radius;
  } else {
    return sideLength * sideLength;
  }
}
```

However, TypeScript is showing us errors below `'radius'` and `'sideLength'`.

Your task is to update the implementation of the `calculateArea` function so that destructuring properties from the passed in `Shape` works without errors. Hint: the examples I showed in the chapter _didn't_ use destructuring, but some destructuring is possible.

<Exercise title="Exercise 1: Destructuring a Discriminated Union" filePath="/src/018-unions-and-narrowing/075-destructuring-a-discriminated-union.problem.ts"></Exercise>

#### Exercise 2: Narrowing a Discriminated Union with a Switch Statement

Here we have our `calculateArea` function from the previous exercise, but without any destructuring.

```typescript
function calculateArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius * shape.radius;
  } else {
    return shape.sideLength * shape.sideLength;
  }
}
```

Your challenge is to refactor this function to use a `switch` statement instead of the `if/else` statement. The `switch` statement should be used to narrow the type of `shape` and calculate the area accordingly.

<Exercise title="Exercise 2: Narrowing a Discriminated Union with a Switch Statement" filePath="/src/018-unions-and-narrowing/076-narrowing-a-discriminated-union-with-a-switch-statement.problem.ts"></Exercise>

#### Exercise 3: Discriminated Tuples

Here we have a `fetchData` function that returns a promise that resolves to an `APIResponse` tuple that consists of two elements.

The first element is a string that indicates the type of the response. The second element can be either an array of `User` objects in the case of successful data retrieval, or a string in the event of an error:

```ts
type APIResponse = [string, User[] | string];
```

Here's what the `fetchData` function looks like:

```typescript
async function fetchData(): Promise<APIResponse> {
  try {
    const response = await fetch("https://api.example.com/data");

    if (!response.ok) {
      return [
        "error",
        // Imagine some improved error handling here
        "An error occurred",
      ];
    }

    const data = await response.json();

    return ["success", data];
  } catch (error) {
    return ["error", "An error occurred"];
  }
}
```

However, as seen in the tests below, the `APIResponse` type currently will allow for other combinations that aren't what we want. For example, it would allow for passing an error message when data is being returned:

```ts twoslash
// @errors: 2344
import { Equal, Expect } from "@total-typescript/helpers";

type User = {
  id: number;
  name: string;
};

type APIResponse = [string, User[] | string];

async function fetchData(): Promise<APIResponse> {
  try {
    const response = await fetch("https://api.example.com/data");

    if (!response.ok) {
      return [
        "error",
        // Imagine some improved error handling here
        "An error occurred",
      ];
    }

    const data = await response.json();

    return ["success", data];
  } catch (error) {
    return ["error", "An error occurred"];
  }
}
// ---cut---
async function exampleFunc() {
  const [status, value] = await fetchData();

  if (status === "success") {
    console.log(value);

    type test = Expect<Equal<typeof value, User[]>>;
  } else {
    console.error(value);

    type test = Expect<Equal<typeof value, string>>;
  }
}
```

The problem stems from the `APIResponse` type being a "bag of optionals".

The `APIResponse` type needs to be updated so that there are two possible combinations for the returned tuple:

If the first element is `"error"` then the second element should be the error message.

If the first element is `"success"`, then the second element should be an array of `User` objects.

Your challenge is to redefine the `APIResponse` type to be a discriminated tuple that only allows for the specific combinations for the `success` and `error` states defined above.

<Exercise title="Exercise 3: Discriminated Tuples" filePath="/src/018-unions-and-narrowing/078-destructuring-a-discriminated-tuple.problem.ts"></Exercise>

#### Exercise 4: Handling Defaults with a Discriminated Union

We're back with our `calculateArea` function:

```typescript
function calculateArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius * shape.radius;
  } else {
    return shape.sideLength * shape.sideLength;
  }
}
```

Until now, the test cases have involved checking if the `kind` of the `Shape` is a `circle` or a `square`, then calculating the area accordingly.

However, a new test case has been added for a situation where no `kind` has been passed into the function:

```ts twoslash
// @errors: 2345
import { Equal, Expect } from "@total-typescript/helpers";
import { it, expect } from "vitest";

type Circle = {
  kind: "circle";
  radius: number;
};

type Square = {
  kind: "square";
  sideLength: number;
};

type Shape = Circle | Square;

function calculateArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius * shape.radius;
  } else {
    return shape.sideLength * shape.sideLength;
  }
}

// ---cut---
it("Should calculate the area of a circle when no kind is passed", () => {
  const result = calculateArea({
    radius: 5,
  });

  expect(result).toBe(78.53981633974483);

  type test = Expect<Equal<typeof result, number>>;
});
```

TypeScript is showing errors under `radius` in the test:

The test expects that if a `kind` isn't passed in, the shape should be treated as a circle. However, the current implementation doesn't account for this.

Your challenge is to:

1. Make updates to the `Shape` discriminated union that will allow for us to omit `kind`.
2. Make adjustments to the `calculateArea` function to ensure that TypeScript's type narrowing works properly within the function.

<Exercise title="Exercise 4: Handling Defaults with a Discriminated Union" filePath="/src/018-unions-and-narrowing/080-adding-defaults-to-discriminated-union.problem.ts"></Exercise>

#### Solution 1: Destructuring a Discriminated Union

Before we look at the working solution, let's look at an attempt that doesn't work out.

##### A Non-Working Attempt at Destructuring Parameters

Since we know that `kind` is present in all branches of the discriminated union, we can try using the rest parameter syntax to bring along the other properties:

```typescript
function calculateArea({ kind, ...shape }: Shape) {
  // rest of function
}
```

Then inside of the conditional branches, we can specify the `kind` and destructure from the `shape` object:

```ts twoslash
// @errors: 2339
type Circle = {
  kind: "circle";
  radius: number;
};

type Square = {
  kind: "square";
  sideLength: number;
};

type Shape = Circle | Square;
// ---cut---
function calculateArea({ kind, ...shape }: Shape) {
  if (kind === "circle") {
    const { radius } = shape;

    return Math.PI * radius * radius;
  } else {
    const { sideLength } = shape;

    return sideLength * sideLength;
  }
}
```

However, this approach doesn't work because the `kind` property has been separated from the rest of the shape. As a result, TypeScript can't track the relationship between `kind` and the other properties of `shape`. Both `radius` and `sideLength` have error messages below them.

TypeScript gives us these errors because it still cannot guarantee properties in the function parameters since it doesn't know yet whether it's dealing with a `Circle` or a `Square`.

##### The Working Destructuring Solution

Instead of doing the destructuring at the function parameter level, we instead will revert the function parameter back to `shape`:

```typescript
function calculateArea(shape: Shape) {
  // rest of function
}
```

...and move the destructuring to take place inside of the conditional branches:

```ts
function calculateArea(shape: Shape) {
  if (shape.kind === "circle") {
    const { radius } = shape;

    return Math.PI * radius * radius;
  } else {
    const { sideLength } = shape;

    return sideLength * sideLength;
  }
}
```

Now within the `if` condition, TypeScript can recognize that `shape` is indeed a `Circle` and allows us to safely access the `radius` property. A similar approach is taken for the `Square` in the `else` condition.

This approach works because TypeScript can track the relationship between `kind` and the other properties of `shape` when the destructuring takes place inside of the conditional branches.

In general, I prefer to avoid destructuring when working with discriminated unions. But if you want to, do it _inside_ of the conditional branches.

#### Solution 2: Narrowing a Discriminated Union with a Switch Statement

The first step is to clear out the `calculateArea` function and add the `switch` keyword and specify `shape.kind` as our switch condition:

```typescript
function calculateArea(shape: Shape) {
  switch (shape.kind) {
    case "circle": {
      return Math.PI * shape.radius * shape.radius;
    }
    case "square": {
      return shape.sideLength * shape.sideLength;
    }
    // Potential additional cases for more shapes
  }
}
```

As a nice bonus, TypeScript offers us autocomplete on the cases for the `switch` statement. This is a great way to ensure that we're handling all of the cases for our discriminated union.

##### Not Accounting for All Cases

As an experiment, comment out the case where the `kind` is `square`:

```typescript
function calculateArea(shape: Shape) {
  switch (shape.kind) {
    case "circle": {
      return Math.PI * shape.radius * shape.radius;
    }
    // case "square": {
    //   return shape.sideLength * shape.sideLength;
    // }
    // Potential additional cases for more shapes
  }
}
```

Now when we hover over the function, we see that the return type is `number | undefined`. This is because TypeScript is smart enough to know that if we don't return a value for the `square` case, the output will be `undefined` for any `square` shape.

```typescript
// hovering over `calculateArea` shows
function calculateArea(shape: Shape): number | undefined;
```

Switch statements work great with discriminated unions!

#### Solution 3: Destructuring a Discriminated Union of Tuples

When you're done, your `APIResponse` type should look like this:

```typescript
type APIResponse = ["error", string] | ["success", User[]];
```

We've created two possible combinations for the `APIResponse` type. An error state, and a success state. And instead of objects, we've used tuples.

You might be thinking - where's the discriminant? It's the first element of the tuple. This is what's called a discriminated tuple.

And with this update to the `APIResponse` type, the errors have gone away!

##### Understanding Tuple Relationships

Inside of the `exampleFunc` function, we use array destructuring to pull out the `status` and `value` from the `APIResponse` tuple:

```typescript
const [status, value] = await fetchData();
```

Even though the `status` and `value` variables are separate, TypeScript keeps track of the relationships behind them. If `status` is checked and is equal to `"success"`, TypeScript can narrow down `value` to be of the `User[]` type automatically:

```typescript
// hovering over `status` shows
const status: "error" | "success";
```

Note that this intelligent behavior is specific to discriminated tuples, and won't work with discriminated objects - as we saw in our previous exercise.

#### Solution 4: Handling Defaults with a Discriminated Union

Before we look at the working solution, let's take a look at a couple of approaches that don't quite work out.

##### Attempt 1: Creating an `OptionalCircle` Type

One possible first step is to create an `OptionalCircle` type by discarding the `kind` property:

```typescript
type OptionalCircle = {
  radius: number;
};
```

Then we would update the `Shape` type to include the new type:

```typescript
type Shape = Circle | OptionalCircle | Square;
```

This solution appears to work initially since it resolves the error in the radius test case.

However, this approach brings back errors inside of the `calculateArea` function because the discriminated union is broken since not every member has a `kind` property.

```typescript
function calculateArea(shape: Shape) {
  if (shape.kind === "circle") {
    // error on shape.kind
    return Math.PI * shape.radius * shape.radius;
  } else {
    return shape.sideLength * shape.sideLength;
  }
}
```

##### Attempt 2: Updating the `Circle` Type

Rather than developing a new type, we could modify the `Circle` type to make the `kind` property optional:

```typescript
type Circle = {
  kind?: "circle";
  radius: number;
};

type Square = {
  kind: "square";
  sideLength: number;
};

type Shape = Circle | Square;
```

This modification allows us to distinguish between circles and squares. The discriminated union remains intact while also accommodating the optional case where `kind` is not specified.

However, there is now a new error inside of the `calculateArea` function:

```ts twoslash
// @errors: 2339
type Circle = {
  kind?: "circle";
  radius: number;
};

type Square = {
  kind: "square";
  sideLength: number;
};

type Shape = Circle | Square;

// ---cut---
function calculateArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius * shape.radius;
  } else {
    return shape.sideLength * shape.sideLength;
  }
}
```

The error tells us that TypeScript is no longer able to narrow down the type of `shape` to a `Square` because we're not checking to see if `shape.kind` is `undefined`.

##### Fixing the New Error

It would be possible to fix this error by adding additional checks for the `kind`, but instead we could just swap how our conditional checks work.

We'll check for a `square` first, then fall back to a `circle`:

```typescript
if (shape.kind === "square") {
  return shape.sideLength * shape.sideLength;
} else {
  return Math.PI * shape.radius * shape.radius;
}
```

By inspecting `square` first, all shape cases that aren't squares default to circles. The circle is treated as optional, which preserves our discriminated union and keeps the function flexible.

Sometimes, just flipping the runtime logic makes TypeScript happy!


--- CHAPTER ---

So far, we've looked at object types only in the context of 'object literals', defined using `{}` with type aliases.

But TypeScript has many tools available that let you be more expressive with object types. You can model inheritance, create new object types from existing ones, and use dynamic keys.

## Extending Objects

Let's start our investigation by looking at how to build object types from _other object types_ in TypeScript.

### Intersection Types

An intersection type lets us combine multiple object types into a single type. It uses the `&` operator. You can think of it like the reverse of the `|` operator. Instead of representing an "or" relationship between types, the `&` operator signifies an "and" relationship.

Using the intersection operator `&` combines multiple separate types into a single type.

Consider these types for `Album` and `SalesData`:

```typescript
type Album = {
  title: string;
  artist: string;
  releaseYear: number;
};

type SalesData = {
  unitsSold: number;
  revenue: number;
};
```

On their own, each type represents a distinct set of properties. While the `SalesData` type on its own could be used to represent sales data for any product, using the `&` operator to create an intersection type allows us to combine the two types into a single type that represents an album's sales data:

```typescript
type AlbumSales = Album & SalesData;
```

The `AlbumSales` type now requires objects to include all of the properties from both `AlbumDetails` and `SalesData`:

```typescript
const wishYouWereHereSales: AlbumSales = {
  title: "Wish You Were Here",
  artist: "Pink Floyd",
  releaseYear: 1975
  unitsSold: 13000000,
  revenue: 65000000,
};
```

If the contract of the `AlbumSales` type isn't fulfilled when creating a new object, TypeScript will raise an error.

It's also possible to intersect more than two types:

```typescript
type AlbumSales = Album & SalesData & { genre: string };
```

This is a useful method for creating new types from existing ones.

#### Intersection Types With Primitives

It's worth noting that intersection types can also be used with primitives, like `string` and `number` - though it often produces odd results.

For instance, let's try intersecting `string` and `number`:

```typescript
type StringAndNumber = string & number;
```

What type do you think `StringAndNumber` is? It's actually `never`. This is because `string` and `number` have innate properties that can't be combined together.

This also happens when you intersect two object types with an incompatible property:

```ts twoslash
type User1 = {
  age: number;
};

type User2 = {
  age: string;
};

type User = User1 & User2;
//   ^?
```

In this case, the `age` property resolves to `never` because it's impossible for a single property to be both a `number` and a `string`.

### Interfaces

So far, we've been only using the `type` keyword to define object types. Experienced TypeScript programmers will likely be tearing their hair out thinking "Why aren't we talking about interfaces?!".

Interfaces are one of TypeScript's most famous features. They shipped with the very first versions of TypeScript and are considered a core part of the language.

Interfaces let you declare object types using a slightly different syntax to `type`. Let's compare the syntax:

```typescript
type Album = {
  title: string;
  artist: string;
  releaseYear: number;
};

interface Album {
  title: string;
  artist: string;
  releaseYear: number;
}
```

They're largely identical, except for the keyword and an equals sign. But it's a common mistake to think of them as interchangeable. They're not.

They have quite different capabilities, which we'll explore in this section.

### `interface extends`

One of `interface`'s most powerful features is its ability to extend other interfaces. This allows you to create new interfaces that inherit properties from existing ones.

In this example, we have a base `Album` interface that will be extended into `StudioAlbum` and `LiveAlbum` interfaces that allow us to provide more specific details about an album:

```typescript
interface Album {
  title: string;
  artist: string;
  releaseYear: number;
}

interface StudioAlbum extends Album {
  studio: string;
  producer: string;
}

interface LiveAlbum extends Album {
  concertVenue: string;
  concertDate: Date;
}
```

This structure allows us to create more specific album representations with a clear inheritance relationship:

```typescript
const americanBeauty: StudioAlbum = {
  title: "American Beauty",
  artist: "Grateful Dead",
  releaseYear: 1970,
  studio: "Wally Heider Studios",
  producer: "Grateful Dead and Stephen Barncard",
};

const oneFromTheVault: LiveAlbum = {
  title: "One from the Vault",
  artist: "Grateful Dead",
  releaseYear: 1991,
  concertVenue: "Great American Music Hall",
  concertDate: new Date("1975-08-13"),
};
```

Just as adding additional `&` operators add to an intersection, it's also possible for an interface to extend multiple other interfaces by separating them with commas:

```typescript
interface BoxSet extends StudioAlbum, LiveAlbum {
  numberOfDiscs: number;
}
```

### Intersections vs `interface extends`

We've now covered two separate TypeScript syntaxes for extending object types: `&` and `interface extends`. So, which is better?

You should choose `interface extends` for two reasons.

#### Better Errors When Merging Incompatible Types

We saw earlier that when you intersect two object types with an incompatible property, TypeScript will resolve the property to `never`:

```typescript
type User1 = {
  age: number;
};

type User2 = {
  age: string;
};

type User = User1 & User2;
```

When using `interface extends`, TypeScript will raise an error when you try to extend an interface with an incompatible property:

```ts twoslash
// @errors: 2430
interface User1 {
  age: number;
}

interface User extends User1 {
  age: string;
}
```

This is very different because it actually sources an error. With intersections, TypeScript will only raise an error when you try to access the `age` property, not when you define it.

So, `interface extends` is better for catching errors when building out your types.

#### Better TypeScript Performance

When you're working in TypeScript, the performance of your types should be at the back of your mind. In large projects, how you define your types can have a big impact on how fast your IDE feels, and how long it takes for `tsc` to check your code.

`interface extends` is much better for TypeScript performance than intersections. With intersections, the intersection is recomputed every time it's used. This can be slow, especially when you're working with complex types.

Interfaces are faster. TypeScript can cache the resulting type of an interface based on its name. So if you use `interface extends`, TypeScript only has to compute the type once, and then it can reused it every time you use the interface.

#### Conclusion

`interface extends` is better for catching errors and for TypeScript performance. This doesn't mean you need to define all your object types using `interface` - we'll get to that later. But if you need to make one object type extend another, you should use `interface extends` where possible.

### Types vs Interfaces

Now we know how good `interface extends` is for extending object types, a natural question arises. Should we use `interface` for all our types by default?

Let's look at a few comparison points between types and interfaces.

#### Types Can be Anything

Type aliases are a lot more flexible than interfaces. A `type` can represent anything – union types, object types, intersection types, and more.

```typescript
type Union = string | number;
```

When we declare a type alias, we're just giving a name (or alias) to an existing type.

On the other hand, an `interface` can only represent object types (and functions, which we'll look at much later).

#### Declaration Merging

Interfaces in TypeScript have an odd property. When multiple interfaces with the same name in the same scope are created, TypeScript automatically merges them. This is known as declaration merging.

Here's an example of an `Album` interface with properties for the `title` and `artist`:

```typescript
interface Album {
  title: string;
  artist: string;
}
```

But let's imagine that, in the same file, you accidentally declare another `Album` interface with properties for the `releaseYear` and `genres`:

```typescript
interface Album {
  title: string;
  artist: string;
}

interface Album {
  releaseYear: number;
  genres: string[];
}
```

TypeScript automatically merges these two declarations into a single interface that includes all of the properties from both declarations:

```typescript
// Under the hood:
interface Album {
  title: string;
  artist: string;
  releaseYear: number;
  genres: string[];
}
```

This is very different from `type`, which would give you an error if you tried to declare the same type twice:

```ts twoslash
// @errors: 2300
type Album = {
  title: string;
  artist: string;
};

type Album = {
  releaseYear: number;
  genres: string[];
};
```

Coming from a JavaScript point of view, this behavior of interfaces feels pretty weird. I have lost hours of my life to having two interfaces with the same name in the same 2,000+ line file. It's there for a good reason - that we'll explore in a later chapter - but it's a bit of a gotcha.

Declaration merging, and its somewhat unexpected behavior, makes me a little wary of using interfaces.

#### Conclusion

So, should you use `type` or `interface` for declaring simple object types?

I tend to default to `type` unless I need to use `interface extends`. This is because `type` is more flexible and doesn't declaration merge unexpectedly.

But, it's a close call. I wouldn't blame you for going the opposite way. Many folks coming from a more object-oriented background will prefer `interface` because it's more familiar to them from other languages.

### Exercises

#### Exercise 1: Create an Intersection Type

Here we have a `User` type and a `Product` type, both with some common properties like `id` and `createdAt`:

```typescript
type User = {
  id: string;
  createdAt: Date;
  name: string;
  email: string;
};

type Product = {
  id: string;
  createdAt: Date;
  name: string;
  price: number;
};
```

Your task is to create a new `BaseEntity` type that includes the `id` and `createdAt` properties. Then, use the `&` operator to create `User` and `Product` types that intersect with `BaseEntity`.

<Exercise title="Exercise 1: Create an Intersection Type" filePath="/src/020-objects/081-extend-object-using-intersections.problem.ts"></Exercise>

#### Exercise 2: Extending Interfaces

After the previous exercise, you'll have a `BaseEntity` type along with `User` and `Product` types that intersect with it.

This time, your task is to refactor the types to be interfaces, and use the `extends` keyword to extend the `BaseEntity` type. For extra credit, try creating and extending multiple smaller interfaces.

<Exercise title="Exercise 2: Extending Interfaces" filePath="/src/020-objects/082-extend-object-using-interfaces.problem.ts"></Exercise>

#### Solution 1: Create an Intersection Type

To solve this challenge, we'll create a new `BaseEntity` type with the common properties:

```typescript
type BaseEntity = {
  id: string;
  createdAt: Date;
};
```

Once the `BaseEntity` type is created, we can intersect it with the `User` and `Product` types:

```typescript
type User = {
  id: string;
  createdAt: Date;
  name: string;
  email: string;
} & BaseEntity;

type Product = {
  id: string;
  createdAt: Date;
  name: string;
  price: number;
} & BaseEntity;
```

Then, we can remove the common properties from `User` and `Product`:

```typescript
type User = {
  name: string;
  email: string;
} & BaseEntity;

type Product = {
  name: string;
  price: number;
} & BaseEntity;
```

Now `User` and `Product` have exactly the same behavior that they did before, but with less duplicated code.

#### Solution 2: Extending Interfaces

Instead of using the `type` keyword, the `BaseEntity`, `User`, and `Product`, can be declared as interfaces. Remember, interfaces do not use an equals sign like `type` does:

```typescript
interface BaseEntity {
  id: string;
  createdAt: Date;
}

interface User {
  name: string;
  email: string;
}

interface Product {
  name: string;
  price: number;
}
```

Once the interfaces are created, we can use the `extends` keyword to extend the `BaseEntity` interface:

```typescript
interface User extends BaseEntity {
  name: string;
  email: string;
}

interface Product extends BaseEntity {
  name: string;
  price: number;
}
```

For the extra credit, we can take this further by creating `WithId` and `WithCreatedAt` interfaces that represent objects with an `id` and `createdAt` property. Then, we can have `User` and `Product` extend from these interfaces by adding commas:

```typescript
interface WithId {
  id: string;
}

interface WithCreatedAt {
  createdAt: Date;
}

interface User extends WithId, WithCreatedAt {
  name: string;
  email: string;
}

interface Product extends WithId, WithCreatedAt {
  name: string;
  price: number;
}
```

We've now refactored our intersections to use `interface extends` - our TypeScript compiler will thank us.

## Dynamic Object Keys

When using objects, it's common that we won't always know the exact keys that will be used.

In JavaScript, we can start with an empty object and add keys and values to it dynamically:

```typescript
// JavaScript Example
const albumAwards = {};

albumAwards.Grammy = true;
albumAwards.MercuryPrize = false;
albumAwards.Billboard = true;
```

However, when we try to add keys dynamically to an object in TypeScript, we'll get errors:

```ts twoslash
// @errors: 2339
// TypeScript Example
const albumAwards = {};

albumAwards.Grammy = true;
albumAwards.MercuryPrize = false;
albumAwards.Billboard = true;
```

This can feel unhelpful. You might think that TypeScript, based on its ability to narrow our code, should be able to figure out that we're adding keys to an object.

In this case, TypeScript prefers to be conservative. It's not going to let you add keys to an object that it doesn't know about. This is because TypeScript is trying to prevent you from making a mistake.

We need to tell TypeScript that we want to be able to dynamically add keys. Let's look at some ways to do this.

### Index Signatures for Dynamic Keys

Let's take another look at the code above.

```ts twoslash
// @errors: 2339
const albumAwards = {};

albumAwards.Grammy = true;
```

The technical term for what we're doing here is 'indexing'. We're indexing into `albumAwards` with a string key, `Grammy`, and assigning it a value.

To support this behavior, we want to tell TypeScript that whenever we try to index into `albumAwards` with a string, we should expect a boolean value.

To do that, we can use an 'index signature'.

Here's how we would specify an index signature for the `albumAwards` object.

```typescript
const albumAwards: {
  [index: string]: boolean;
} = {};

albumAwards.Grammy = true;
albumAwards.MercuryPrize = false;
albumAwards.Billboard = true;
```

The `[index: string]: boolean` syntax is an index signature. It tells TypeScript that `albumAwards` can have any string key, and the value will always be a boolean.

We can choose any name for the `index`. It's just a description.

```typescript
const albumAwards: {
  [iCanBeAnything: string]: boolean;
} = {};
```

The same syntax can also be used with types and interfaces:

```typescript
interface AlbumAwards {
  [index: string]: boolean;
}

const beyonceAwards: AlbumAwards = {
  Grammy: true,
  Billboard: true,
};
```

Index signatures are one way to handle dynamic keys. But there's a utility type that some argue is even better.

### Using a Record Type for Dynamic Keys

The `Record` utility type is another option for supporting dynamic keys.

Here's how we would use `Record` for the `albumAwards` object, where the key will be a string and the value will be a boolean:

```typescript
const albumAwards: Record<string, boolean> = {};

albumAwards.Grammy = true;
```

The first type argument is the key, and the second type argument is the value. This is a more concise way to achieve a similar result as an index signature.

`Record` can also support a union type as keys, but an index signature can't:

```ts twoslash
// @errors: 1337
const albumAwards1: Record<"Grammy" | "MercuryPrize" | "Billboard", boolean> = {
  Grammy: true,
  MercuryPrize: false,
  Billboard: true,
};

const albumAwards2: {
  [index: "Grammy" | "MercuryPrize" | "Billboard"]: boolean;
} = {
  Grammy: true,
  MercuryPrize: false,
  Billboard: true,
};
```

Index signatures can't use literal types, but `Record` can. We'll look at why this is when we explore mapped types in a later chapter.

The `Record` type helper is a repeatable pattern that's easy to read and understand, and is a bit more flexible than an index signature. It's my go-to for dynamic keys.

### Combining Known and Dynamic Keys

In many cases there will be a base set of keys we know we want to include, but we also want to allow for additional keys to be added dynamically.

For example, say we are working with a base set of awards we know were nominations, but we don't know what other awards are in play. We can use the `Record` type to define a base set of awards and then use an intersection to extend it with an index signature for additional awards:

```typescript
type BaseAwards = "Grammy" | "MercuryPrize" | "Billboard";

type ExtendedAlbumAwards = Record<BaseAwards, boolean> & {
  [award: string]: boolean;
};

const extendedNominations: ExtendedAlbumAwards = {
  Grammy: true,
  MercuryPrize: false,
  Billboard: true, // Additional awards can be dynamically added
  "American Music Awards": true,
};
```

This technique would also work when using an interface and the `extends` keyword:

```typescript
interface BaseAwards {
  Grammy: boolean;
  MercuryPrize: boolean;
  Billboard: boolean;
}

interface ExtendedAlbumAwards extends BaseAwards {
  [award: string]: boolean;
}
```

This version is preferable because, in general, `interface extends` is preferable to intersections.

Being able to support both default and dynamic keys in our data structures allows a lot of flexibility to adapt to changing requirements in your applications.

### `PropertyKey`

A useful type to know about when working with dynamic keys is `PropertyKey`.

The `PropertyKey` type is a global type that represents the set of all possible keys that can be used on an object, including string, number, and symbol. You can find its type definition inside of TypeScript's ES5 type definitions file:

```typescript
// inside lib.es5.d.ts
declare type PropertyKey = string | number | symbol;
```

Because `PropertyKey` works with all possible keys, it's great for working with dynamic keys where you aren't sure what the type of the key will be.

For example, when using an index signature you could set the key type to `PropertyKey` in order to allow for any valid key type:

```typescript
type Album = {
  [key: PropertyKey]: string;
};
```

### `object`

Similar to `string`, `number`, and `boolean`, `object` is a global type in TypeScript.

It represents more types than you might expect. Instead of representing only objects like `{}` or `new Object()`, `object` represents any non-primitive type. This includes arrays, functions, and objects.

So a function like this:

```typescript
function acceptAllNonPrimitives(obj: object) {}
```

Would accept any non-primitive value:

```typescript
acceptAllNonPrimitives({});
acceptAllNonPrimitives([]);
acceptAllNonPrimitives(() => {});
```

But error on primitives:

```ts twoslash
// @errors: 2345
function acceptAllNonPrimitives(obj: object) {}

// ---cut---
acceptAllNonPrimitives(1);
acceptAllNonPrimitives("hello");
acceptAllNonPrimitives(true);
```

This means that the `object` type is rarely useful by itself. Using `Record` is usually a better choice. For instance, if you want to accept any object type, you can use `Record<string, unknown>`.

### Exercises

#### Exercise 1: Use an Index Signature for Dynamic Keys

Here we have an object called `scores`, and we are trying to assign several different properties to it:

```ts twoslash
// @errors: 2339
const scores = {};

scores.math = 95;
scores.english = 90;
scores.science = 85;
```

Your task is to give `scores` a type annotation to support the dynamic subject keys. There are three ways: an inline index signature, a type, an interface, or a `Record`.

<Exercise title="Exercise 1: Use an Index Signature for Dynamic Keys" filePath="/src/020-objects/084-index-signatures.problem.ts"></Exercise>

#### Exercise 2: Default Properties with Dynamic Keys

Here, we're trying to model a situation where we want some required keys - `math`, `english`, and `science` - on our scores object.

But we also want to add dynamic properties. In this case, `athletics`, `french`, and `spanish`:

```ts twoslash
// @errors: 2578 2339
interface Scores {}

// @ts-expect-error science should be provided
const scores: Scores = {
  math: 95,
  english: 90,
};

scores.athletics = 100;
scores.french = 75;
scores.spanish = 70;
```

The definition of scores should be erroring, because `science` is missing - but it's not, because our definition of `Scores` is currently an empty object.

Your task is to update the `Scores` interface to specify default keys for `math`, `english`, and `science` while allowing for any other subject to be added. Once you've updated the type correctly, the red squiggly line below `@ts-expect-error` will go away because `science` will be required but missing. See if you can use `interface extends` to achieve this.

<Exercise title="Exercise 2: Default Properties with Dynamic Keys" filePath="/src/020-objects/085-index-signatures-with-defined-keys.problem.ts"></Exercise>

#### Exercise 3: Restricting Object Keys With Records

Here we have a `configurations` object, typed as `Configurations` which is currently unknown.

The object holds keys for `development`, `production`, and `staging`, and each respective key is associated with configuration details such as `apiBaseUrl` and `timeout`.

There is also a `notAllowed` key, which is decorated with a `@ts-expect-error` comment. But currently, this is not erroring in TypeScript as expected.

```ts twoslash
// @errors: 2578
type Environment = "development" | "production" | "staging";

type Configurations = unknown;

const configurations: Configurations = {
  development: {
    apiBaseUrl: "http://localhost:8080",
    timeout: 5000,
  },
  production: {
    apiBaseUrl: "https://api.example.com",
    timeout: 10000,
  },
  staging: {
    apiBaseUrl: "https://staging.example.com",
    timeout: 8000,
  },
  // @ts-expect-error
  notAllowed: {
    apiBaseUrl: "https://staging.example.com",
    timeout: 8000,
  },
};
```

Update the `Configurations` type so that only the keys from `Environment` are allowed on the `configurations` object. Once you've updated the type correctly, the red squiggly line below `@ts-expect-error` will go away because `notAllowed` will be disallowed properly.

<Exercise title="Exercise 3: Restricting Object Keys With Records" filePath="/src/020-objects/087-record-type-with-union-as-keys.problem.ts"></Exercise>

#### Exercise 4: Dynamic Key Support

Consider this `hasKey` function that accepts an object and a key, then calls `object.hasOwnProperty` on that object:

```typescript
const hasKey = (obj: object, key: string) => {
  return obj.hasOwnProperty(key);
};
```

There are several test cases for this function:

The first test case checks that it works on string keys, which doesn't present any issues. As anticipated, `hasKey(obj, "foo")` would return true and `hasKey(obj, "bar")` would return false:

```typescript
it("Should work on string keys", () => {
  const obj = {
    foo: "bar",
  };

  expect(hasKey(obj, "foo")).toBe(true);
  expect(hasKey(obj, "bar")).toBe(false);
});
```

A test case that checks for numeric keys does have issues because the function is expecting a string key:

```ts twoslash
// @errors: 2345

const hasKey = (obj: object, key: string) => {
  return obj.hasOwnProperty(key);
};

// ---cut---
const obj = {
  1: "bar",
};
```

Because an object can also have a symbol as a key, there is also a test for that case. It currently has type errors for `fooSymbol` and `barSymbol` when calling `hasKey`:

```ts twoslash
// @lib: dom,es2023,dom.iterable
// @errors: 2345
const hasKey = (obj: object, key: string) => {
  return obj.hasOwnProperty(key);
};

// ---cut---
const fooSymbol = Symbol("foo");
const barSymbol = Symbol("bar");

const obj = {
  [fooSymbol]: "bar",
};
```

Your task is to update the `hasKey` function so that all of these tests pass. Try to be as concise as possible!

<Exercise title="Exercise 4: Dynamic Key Support" filePath="/src/020-objects/086-property-key-type.problem.ts"></Exercise>

#### Solution 1: Use an Index Signature for Dynamic Keys

Here are the three solutions:

You can use an inline index signature:

```typescript
const scores: {
  [key: string]: number;
} = {};
```

Or an interface:

```typescript
interface Scores {
  [key: string]: number;
}
```

Or a type:

```typescript
type Scores = {
  [key: string]: number;
};
```

Or finally, a record:

```typescript
const scores: Record<string, number> = {};
```

#### Solution 2: Default Properties with Dynamic Keys

Here's how to add an index signature to the `Scores` interface to support dynamic keys along with the required keys:

```typescript
interface Scores {
  [subject: string]: number;
  math: number;
  english: number;
  science: number;
}
```

Creating a `RequiredScores` interface and extending it looks like this:

```typescript
interface RequiredScores {
  math: number;
  english: number;
  science: number;
}

interface Scores extends RequiredScores {
  [key: string]: number;
}
```

These two are functionally equivalent, except for the fact that you get access to the `RequiredScores` interface if you need to use that seprately.

#### Solution 3: Restricting Object Keys

##### A Failed First Attempt at Using Record

We know that the values of the `Configurations` object will be `apiBaseUrl`, which is a string, and `timeout`, which is a number.

It may be tempting to use a Record to set the key as a string and the value an object with the properties `apiBaseUrl` and `timeout`:

```typescript
type Configurations = Record<
  string,
  {
    apiBaseUrl: string;
    timeout: number;
  }
>;
```

However, having the key as `string` still allows for the `notAllowed` key to be added to the object. We need to make the keys dependent on the `Environment` type.

##### The Correct Approach

Instead, we can specify the `key` as `Environment` inside the Record:

```typescript
type Configurations = Record<
  Environment,
  {
    apiBaseUrl: string;
    timeout: number;
  }
>;
```

Now TypeScript will throw an error when the object includes a key that doesn't exist in `Environment`, like `notAllowed`.

#### Solution 4: Dynamic Key Support

The obvious answer is to change the `key`'s type to `string | number | symbol`:

```typescript
const hasKey = (obj: object, key: string | number | symbol) => {
  return obj.hasOwnProperty(key);
};
```

However, there's a much more succinct solution.

Hovering over `hasOwnProperty` shows us the type definition:

```typescript
(method) Object.hasOwnProperty(v: PropertyKey): boolean
```

Recall that the `PropertyKey` type represents every possible value a key can have. This means we can use it as the type for the key parameter:

```typescript
const hasKey = (obj: object, key: PropertyKey) => {
  return obj.hasOwnProperty(key);
};
```

Beautiful.

## Reducing Duplication with Utility Types

When working with object types in TypeScript, you'll often find yourself in situations where your object types share common properties. This can lead to a lot of duplicated code.

We've seen how using `interface extends` can help us model inheritance, but TypeScript also gives us tools to directly manipulate object types. With its built-in utility types, we can remove properties from types, make them optional, and more.

### `Partial`

The Partial utility type lets you create a new object type from an existing one, except all of its properties are optional.

Consider an Album interface that contains detailed information about an album:

```typescript
interface Album {
  id: number;
  title: string;
  artist: string;
  releaseYear: number;
  genre: string;
}
```

When we want to update an album's information, we might not have all the information at once. For example, it can be difficult to decide what genre to assign to an album before it's released.

Using the `Partial` utility type and passing in `Album`, we can create a type that allows us to update any subset of an album's properties:

```typescript
type PartialAlbum = Partial<Album>;
```

Now we have a `PartialAlbum` type where `id`, `title`, `artist`, `releaseYear`, and `genre` are all optional.

This means we can create a function which only receives a subset of the album's properties:

```typescript
const updateAlbum = (album: PartialAlbum) => {
  // ...
};

updateAlbum({ title: "Geogaddi", artist: "Boards of Canada" });
```

### `Required`

On the opposite side of `Partial` is the `Required` type, which makes sure all of the properties of a given object type are required.

This `Album` interface has the `releaseYear` and `genre` properties marked as optional:

```typescript
interface Album {
  title: string;
  artist: string;
  releaseYear?: number;
  genre?: string;
}
```

We can use the `Required` utility type to create a new `RequiredAlbum` type:

```typescript
type RequiredAlbum = Required<Album>;
```

With `RequiredAlbum`, all of the original `Album` properties become required, and omitting any of them would result in an error:

```typescript
const doubleCup: RequiredAlbum = {
  title: "Double Cup",
  artist: "DJ Rashad",
  releaseYear: 2013,
  genre: "Juke",
};
```

#### Required with Nested Properties

An important thing to note is that both `Required` and `Partial` only work one level deep. For example, if the `Album`'s `genre` contained nested properties, `Required<Album>` would not make the children required:

```ts twoslash
type Album = {
  title: string;
  artist: string;
  releaseYear?: number;
  genre?: {
    parentGenre?: string;
    subGenre?: string;
  };
};

type RequiredAlbum = Required<Album>;
//   ^?
```

If you find yourself in a situation where you need a deeply Required type, check out the type-fest library by Sindre Sorhus.

### `Pick`

The Pick utility type allows you to create a new object type by picking certain properties from an existing object.

For example, say we want to create a new type that only includes the `title` and `artist` properties from the `Album` type:

```typescript
type AlbumData = Pick<Album, "title" | "artist">;
```

This results in `AlbumData` being a type that only includes the `title` and `artist` properties.

This is extremely useful when you want to have one object that relies on the shape of another object. We'll explore this more in the chapter on deriving types from other types.

### `Omit`

The Omit helper type is kind of like the opposite of Pick. It allows you to create a new type by excluding a subset of properties from an existing type.

For example, we could use Omit to create the same `AlbumData` type we created with Pick, but this time by excluding the `id`, `releaseYear` and `genre` properties:

```typescript
type AlbumData = Omit<Album, "id" | "releaseYear" | "genre">;
```

A common use case is to create a type without `id`, for situations where the `id` has not yet been assigned:

```typescript
type AlbumData = Omit<Album, "id">;
```

This means that as `Album` gains more properties, they will flow down to `AlbumData` too.

On the surface, using Omit is straightforward, but there is a small quirk to be aware of.

#### Omit is Looser than Pick

When using Omit, you are able to exclude properties that don't exist on an object type.

For example, creating an `AlbumWithoutProducer` type with our `Album` type would not result in an error, even though `producer` doesn't exist on `Album`:

```typescript
type Album = {
  id: string;
  title: string;
  artist: string;
  releaseYear: number;
  genre: string;
};

type AlbumWithoutProducer = Omit<Album, "producer">;
```

If we tried to create an `AlbumWithOnlyProducer` type using Pick, we would get an error because `producer` doesn't exist on `Album`:

```ts twoslash
// @errors: 2344
type Album = {
  id: string;
  title: string;
  artist: string;
  releaseYear: number;
  genre: string;
};

type AlbumWithoutProducer = Omit<Album, "producer">;

// ---cut---
type AlbumWithOnlyProducer = Pick<Album, "producer">;
```

Why do these two utility types behave differently?

When the TypeScript team was originally implementing Omit, they were faced with a decision to create a strict or loose version of Omit. The strict version would only permit the omission of valid keys (`id`, `title`, `artist`, `releaseYear`, `genre`), whereas the loose version wouldn't have this constraint.

At the time, it was a more popular idea in the community to implement a loose version, so that's the one they went with. Given that global types in TypeScript are globally available and don't require an import statement, the looser version is seen as a safer choice, as it is more compatible and less likely to cause unforeseen errors.

While it is possible to create a strict version of Omit, the loose version should be sufficient for most cases. Just keep an eye out, since it may error in ways you don't expect.

We'll implement a strict version of Omit later in this book.

For more insights into the decisions behind Omit, refer to the TypeScript team's original [discussion](https://github.com/microsoft/TypeScript/issues/30455) and [pull request](https://github.com/microsoft/TypeScript/pull/30552) adding `Omit`, and their [final note](https://github.com/microsoft/TypeScript/issues/30825#issuecomment-523668235) on the topic.

### Omit And Pick Don't Work Well With Union Types

`Omit` and `Pick` have some odd behaviour when used with union types. Let's look at an example to see what I mean.

Consider a scenario where we have three interface types for `Album`, `CollectorEdition`, and `DigitalRelease`:

```typescript
type Album = {
  id: string;
  title: string;
  genre: string;
};

type CollectorEdition = {
  id: string;
  title: string;
  limitedEditionFeatures: string[];
};

type DigitalRelease = {
  id: string;
  title: string;
  digitalFormat: string;
};
```

These types share two common properties - `id` and `title` - but each also has unique attributes. The `Album` type includes `genre`, the `CollectorEdition` includes `limitedEditionFeatures`, and `DigitalRelease` has `digitalFormat`:

After creating a `MusicProduct` type that is a union of these three types, say we want to create a `MusicProductWithoutId` type, mirroring the structure of `MusicProduct` but excluding the `id` field:

```typescript
type MusicProduct = Album | CollectorEdition | DigitalRelease;

type MusicProductWithoutId = Omit<MusicProduct, "id">;
```

You might assume that `MusicProductWithoutId` would be a union of the three types minus the `id` field. However, what we get instead is a simplified object type containing only `title` – the other properties that were shared across all types, without `id`.

```typescript
// Expected:
type MusicProductWithoutId =
  | Omit<Album, "id">
  | Omit<CollectorEdition, "id">
  | Omit<DigitalRelease, "id">;

// Actual:
type MusicProductWithoutId = {
  title: string;
};
```

This is particularly annoying given that `Partial` and `Required` work as expected with union types:

```typescript
type PartialMusicProduct = Partial<MusicProduct>;

// Hovering over PartialMusicProduct shows:
type PartialMusicProduct =
  | Partial<Album>
  | Partial<CollectorEdition>
  | Partial<DigitalRelease>;
```

This stems from how `Omit` processes union types. Rather than iterating over each union member, it amalgamates them into a single structure it can understand.

The technical reason for this is that `Omit` and `Pick` are not distributive. This means that when you use them with a union type, they don't operate individually on each union member.

#### The `DistributiveOmit` and `DistributivePick` Types

In order to address this, we can create a `DistributiveOmit` type. It's defined similarly to Omit but operates individually on each union member. Note the inclusion of `PropertyKey` in the type definition to allow for any valid key type:

```typescript
type DistributiveOmit<T, K extends PropertyKey> = T extends any
  ? Omit<T, K>
  : never;
```

When we apply `DistributiveOmit` to our `MusicProduct` type, we get the anticipated result: a union of `Album`, `CollectorEdition`, and `DigitalRelease` with the `id` field omitted:

```typescript
type MusicProductWithoutId = DistributiveOmit<MusicProduct, "id">;

// Hovering over MusicProductWithoutId shows:
type MusicProductWithoutId =
  | Omit<Album, "id">
  | Omit<CollectorEdition, "id">
  | Omit<DigitalRelease, "id">;
```

Structurally, this is the same as:

```typescript
type MusicProductWithoutId =
  | {
      title: string;
      genre: string;
    }
  | {
      title: string;
      limitedEditionFeatures: string[];
    }
  | {
      title: string;
      digitalFormat: string;
    };
```

In situations where you need to use Omit with union types, using a distributive version will give you a much more predictable result.

For completeness, the `DistributivePick` type can be defined in a similar way:

```typescript
type DistributivePick<T, K extends PropertyKey> = T extends any
  ? Pick<T, K>
  : never;
```

### Exercises

#### Exercise 1: Expecting Certain Properties

In this exercise, we have a `fetchUser` function that uses `fetch` to access an endpoint named `APIUser` and it return a `Promise<User>`:

```ts twoslash
// @errors: 2344
import { Expect, Equal } from "@total-typescript/helpers";

// ---cut---
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const fetchUser = async (): Promise<User> => {
  const response = await fetch("/api/user");
  const user = await response.json();
  return user;
};

const example = async () => {
  const user = await fetchUser();

  type test = Expect<Equal<typeof user, { name: string; email: string }>>;
};
```

Since we're in an asynchronous function, we do want to use a `Promise`, but there's a problem with this `User` type.

In the `example` function that calls `fetchUser`, we're only expecting to receive the `name` and `email` fields. These fields are only part of what exists in the `User` interface.

Your task is to update the typing so that only the `name` and `email` fields are expected to be returned from `fetchUser`.

You can use the helper types we've looked at to accomplish this, but for extra practice try using just interfaces.

<Exercise title="Exercise 1: Expecting Certain Properties" filePath="/src/020-objects/089-pick-type-helper.problem.ts"></Exercise>

#### Exercise 2: Updating a Product

Here we have a function `updateProduct` that takes two arguments: an `id`, and a `productInfo` object derived from the `Product` type, excluding the `id` field.

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const updateProduct = (id: number, productInfo: Product) => {
  // Do something with the productInfo
};
```

The twist here is that during a product update, we might not want to modify all of its properties at the same time. Because of this, not all properties have to be passed into the function.

This means we have several different test scenarios. For example, update just the name, just the price, or just the description. Combinations like updating the name and the price or the name and the description are also tested.

```ts twoslash
// @errors: 2345
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const updateProduct = (id: number, productInfo: Product) => {
  // Do something with the productInfo
};

// ---cut---
updateProduct(1, {
  name: "Book",
});

updateProduct(1, {
  price: 12.99,
});
```

Your challenge is to modify the `productInfo` parameter to reflect these requirements. The `id` should remain absent from `productInfo`, but we also want all other properties in `productInfo` to be optional.

<Exercise title="Exercise 2: Updating a Product" filePath="/src/020-objects/091-omit-type-helper.problem.ts"></Exercise>

#### Solution 1: Expecting Certain Properties

There are quite a few ways to solve this problem. Here are a few examples:

##### Using Pick

Using the Pick utility type, we can create a new type that only includes the `name` and `email` properties from the `User` interface:

```typescript
type PickedUser = Pick<User, "name" | "email">;
```

Then the `fetchUser` function can be updated to return a `Promise` of `PickedUser`:

```typescript
const fetchUser = async (): Promise<PickedUser> => {
  ...
```

##### Using Omit

The Omit utility type can also be used to create a new type that excludes the `id` and `role` properties from the `User` interface:

```typescript
type OmittedUser = Omit<User, "id" | "role">;
```

Then the `fetchUser` function can be updated to return a `Promise` of `OmittedUser`:

```typescript
const fetchUser = async (): Promise<OmittedUser> => {
  ...
```

##### Extending an Interface

We could create an interface `NameAndEmail` that contains a `name` and `email` property, along with updating the `User` interface to remove those properties in favor of extending them:

```typescript
interface NameAndEmail {
  name: string;
  email: string;
}

interface User extends NameAndEmail {
  id: string;
  role: string;
}
```

Then the `fetchUser` function could return a `Promise` of `NameAndEmail`:

```typescript
const fetchUser = async (): Promise<NameAndEmail> => {
  // ...
};
```

`Omit` will mean that the object grows as the source object grows. `Pick` and `interface extends` will mean that the object will stay the same size. So depending on requirements, you can choose the best approach.

#### Solution 2: Updating a Product

Using a _combination_ of `Omit` and `Partial` will allow us to create a type that excludes the `id` field from `Product` and makes all other properties optional.

In this case, wrapping `Omit<Product, "id">` in `Partial` will remove the `id` while making all of the remaining properties optional:

```typescript
const updateProduct = (
  id: number,
  productInfo: Partial<Omit<Product, "id">>,
) => {
  // Do something with the productInfo
};
```


--- CHAPTER ---

In our chapter on unions and narrowing, we explored how TypeScript can infer types from the logical flow of our code. In this chapter, we'll see how mutability - whether a value can be changed or not - can affect type inference.

## Mutability and Inference

### Variable Declaration and Type Inference

How you declare your variables in TypeScript affects whether or not they can be changed.

#### How TypeScript Infers `let`

When using the `let` keyword, the variable is _mutable_ and can be reassigned.

Consider this `AlbumGenre` type: a union of literal values representing possible genres for an album:

```ts twoslash
type AlbumGenre = "rock" | "country" | "electronic";
```

Using `let`, we can declare a variable `albumGenre` and assign it the value `"rock"`. Then we can attempt to pass `albumGenre` to a function that expects an `AlbumGenre`:

```ts twoslash
// @errors: 2345
type AlbumGenre = "rock" | "country" | "electronic";

// ---cut---
let albumGenre = "rock";

const handleGenre = (genre: AlbumGenre) => {
  // ...
};

handleGenre(albumGenre);
```

Because `let` was used when declaring the variable, TypeScript understands that the value can later be changed. In this case, it infers `albumGenre` as a `string` rather than the specific literal type `"rock"`. In our code, we could do this:

```ts twoslash
let albumGenre = "rock";

// ---cut---
albumGenre = "country";
```

Therefore, it will infer a wider type in order to accommodate the variable being reassigned.

We can fix the error above by assigning a specific type to the `let`:

```ts twoslash
// @errors: 2345
type AlbumGenre = "rock" | "country" | "electronic";

// ---cut---
let albumGenre: AlbumGenre = "rock";

const handleGenre = (genre: AlbumGenre) => {
  // ...
};

handleGenre(albumGenre); // no more error
```

Now, `albumGenre` _can_ be reassigned, but only to a value that is a member of the `AlbumGenre` union. So, it will no longer show an error when passed to `handleGenre`.

But there's another interesting solution.

#### How TypeScript Infers `const`

When using `const`, the variable is _immutable_ and cannot be reassigned. When we change the variable declaration to use `const`, TypeScript will infer the type more narrowly:

```ts twoslash
// @errors: 2345
type AlbumGenre = "rock" | "country" | "electronic";

// ---cut---
const albumGenre = "rock";

const handleGenre = (genre: AlbumGenre) => {
  // ...
};

handleGenre(albumGenre); // No error
```

There is no longer an error in the assignment, and hovering over `albumGenre` inside of the `albumDetails` object shows that TypeScript has inferred it as the literal type `"rock"`.

If we try to change the value of `albumGenre` after declaring it as `const`, TypeScript will show an error:

```ts twoslash
// @errors: 2588
type AlbumGenre = "rock" | "country" | "electronic";

const albumGenre = "rock";

// ---cut---
albumGenre = "country";
```

TypeScript is mirroring JavaScript's treatment of const in order to prevent possible runtime errors. When you declare a variable with `const`, TypeScript infers it as the literal type you specified.

So, TypeScript uses how JavaScript works to its advantage. This will often encourage you to use `const` over `let` when declaring variables, as it's a little stricter.

### Object Property Inference

The picture with `const` and `let` becomes a bit more complicated when it comes to object properties.

Objects are mutable in JavaScript, meaning their properties can be changed after they are created.

For this example, we have an `AlbumAttributes` type that includes a `status` property with a union of literal values representing possible album statuses:

```typescript
type AlbumAttributes = {
  status: "new-release" | "on-sale" | "staff-pick";
};
```

Say we had an `updateStatus` function that takes an `AlbumAttributes` object:

```ts twoslash
// @errors: 2345
type AlbumAttributes = {
  status: "new-release" | "on-sale" | "staff-pick";
};
// ---cut---
const updateStatus = (attributes: AlbumAttributes) => {
  // ...
};

const albumAttributes = {
  status: "on-sale",
};

updateStatus(albumAttributes);
```

TypeScript gives us an error below `albumAttributes` inside of the `updateStatus` function call, with messages similar to what we saw before.

This is happening because TypeScript has inferred the `status` property as a `string` rather than the specific literal type `"on-sale"`. Similar to with `let`, TypeScript understands that the property could later be reassigned:

```typescript
albumAttributes.status = "new-release";
```

This is true even though the `albumAttributes` object was declared with `const`. We get the error when calling `updateStatus` because `status: string` can't be passed to a function that expects `status: "new-release" | "on-sale" | "staff-pick"`. TypeScript is trying to protect us from potential runtime errors.

Let's look at a couple of ways to fix this issue.

#### Using an Inline Object

One approach is to inline the object when calling the `updateStatus` function instead of declaring it separately:

```typescript
updateStatus({
  status: "on-sale",
}); // No error
```

When inlining the object, TypeScript knows that there is no way that `status` could be changed before it is passed into the function, so it infers it more narrowly.

#### Adding a Type to the Object

Another option is to explicitly declare the type of the `albumAttributes` object to be `AlbumAttributes`:

```typescript
const albumAttributes: AlbumAttributes = {
  status: "on-sale",
};

updateStatus(albumAttributes); // No error
```

This works similarly to how it did with the `let`. While `albumAttributes.status` can still be reassigned, it can only be reassigned to a valid value:

```typescript
albumAttributes.status = "new-release"; // No error
```

This behaviour works the same for all object-like structures, including arrays and tuples. We'll examine those later in the exercises.

### Readonly Object Properties

In JavaScript, as we've seen, object properties are mutable by default. But TypeScript lets us be more specific about whether or not a property of an object can be mutated.

To make a property read-only (not writable), you can use the `readonly` modifier:

Consider this `Album` interface, where the `title` and `artist` are marked as `readonly`:

```typescript
interface Album {
  readonly title: string;
  readonly artist: string;
  status?: "new-release" | "on-sale" | "staff-pick";
  genre?: string[];
}
```

Once an `Album` object is created, its `title` and `artist` properties are locked in and cannot be changed. However, the optional `status` and `genre` properties can still be modified.

Note that this only occurs on the _type_ level. At runtime, the properties are still mutable. TypeScript is just helping us catch potential errors.

#### The `Readonly` Type Helper

If you want to specify that _all_ properties of an object should be read-only, TypeScript provides a type helper called `Readonly`.

To use it, you simply wrap the object type with `Readonly`.

Here's an example of using `Readonly` to create an `Album` object:

```typescript
const readOnlyWhiteAlbum: Readonly<Album> = {
  title: "The Beatles (White Album)",
  artist: "The Beatles",
  status: "staff-pick",
};
```

Because the `readOnlyWhiteAlbum` object was created using the `Readonly` type helper, none of the properties can be modified:

```ts twoslash
// @errors: 2540
type Album = {
  title: string;
  artist: string;
  status?: "new-release" | "on-sale" | "staff-pick";
  genre?: string[];
};

const readOnlyWhiteAlbum: Readonly<Album> = {
  title: "The Beatles (White Album)",
  artist: "The Beatles",
  status: "staff-pick",
};
// ---cut---
readOnlyWhiteAlbum.genre = ["rock", "pop", "unclassifiable"];
```

Note that like many of TypeScript's type helpers, the immutability enforced by `Readonly` only operates on the first level. It won't make properties read-only recursively.

### Readonly Arrays

As with object properties, arrays and tuples can also be made immutable by using the `readonly` modifier.

Here's how the `readonly` modifier can be used to create a read-only array of genres. Once the array is created, its contents cannot be modified:

```typescript
const readOnlyGenres: readonly string[] = ["rock", "pop", "unclassifiable"];
```

Similar to the `Array` syntax, TypeScript also offers a `ReadonlyArray` type helper that functions in the same way to using the above syntax:

```typescript
const readOnlyGenres: ReadonlyArray<string> = ["rock", "pop", "unclassifiable"];
```

Both of these approaches are functionally the same. Hovering over the `readOnlyGenres` variable shows that TypeScript has inferred it as a read-only array:

```typescript
// hovering over `readOnlyGenres` shows:
const readOnlyGenres: readonly string[];
```

Readonly arrays disallow the use of array methods that cause mutations, such as `push` and `pop`:

```ts twoslash
// @errors: 2339
const readOnlyGenres: readonly string[] = ["rock", "pop", "unclassifiable"];

// ---cut---
readOnlyGenres.push("experimental");
```

However, methods like `map` and `reduce` will still work, as they create a copy of the array and do not mutate the original.

```ts twoslash
// @errors: 2339
const readOnlyGenres: readonly string[] = ["rock", "pop", "unclassifiable"];

// ---cut---
const uppercaseGenres = readOnlyGenres.map((genre) => genre.toUpperCase()); // No error

readOnlyGenres.push("experimental");
```

Note that, just like the `readonly` for object properties, this doesn't affect the runtime behavior of the array. It's just a way to help catch potential errors.

#### How Read-Only and Mutable Arrays Work Together

To help drive the concept home, let's see how read-only and mutable arrays work together.

Here are two `printGenre` functions that are functionally identical, except `printGenresReadOnly` takes a read-only array of genres as a parameter whereas `printGenresMutable` takes a mutable array:

```typescript
function printGenresReadOnly(genres: readonly string[]) {
  // ...
}

function printGenresMutable(genres: string[]) {
  // ...
}
```

When we create a mutable array of genres, it can be passed as an argument to both of these functions without error:

```typescript
const mutableGenres = ["rock", "pop", "unclassifiable"];

printGenresReadOnly(mutableGenres);
printGenresMutable(mutableGenres);
```

This works because specifying `readonly` on the `printGenresReadOnly` function parameter only guarantees that it won't alter the array's content. Thus, it doesn't matter if we pass a mutable array because it won't be changed.

However, the reverse is not true.

If we declare a read-only array, we can only pass it to `printGenresReadOnly`. Attempting to pass it to `printGenresMutable` will yield an error:

```ts twoslash
// @errors: 2345
function printGenresReadOnly(genres: readonly string[]) {
  // ...
}

function printGenresMutable(genres: string[]) {
  // ...
}

// ---cut---
const readOnlyGenres: readonly string[] = ["rock", "pop", "unclassifiable"];

printGenresReadOnly(readOnlyGenres);
printGenresMutable(readOnlyGenres);
```

This is because we might be mutating the array inside of `printGenresMutable`. If we passed a read-only array.

Essentially, read-only arrays can only be assigned to other read-only types. This can spread virally throughout your application: if a function deep down the call stack expects a `readonly` array, then that array must remain `readonly` throughout. But doing so brings benefits. It ensures that the array won't be mutated in any manner as it moves down the stack. Very useful.

The takeaway here is that even though you can assign mutable arrays to read-only arrays, you cannot assign read-only arrays to mutable arrays.

### Exercises

#### Exercise 1: Inference with an Array of Objects

Here we have a `modifyButtons` function that takes in an array of objects with `type` properties that are either `"button"`, `"submit"`, or `"reset"`.

When attempting to call `modifyButtons` with an array of objects that seem to meet the contract, TypeScript gives us an error:

```ts twoslash
// @errors: 2345
type ButtonAttributes = {
  type: "button" | "submit" | "reset";
};

const modifyButtons = (attributes: ButtonAttributes[]) => {};

const buttonsToChange = [
  {
    type: "button",
  },
  {
    type: "submit",
  },
];

modifyButtons(buttonsToChange);
```

Your task is to determine why this error shows up, then resolve it.

<Exercise title="Exercise 1: Inference with an Array of Objects" filePath="/src/028-mutability/098-object-property-inference.problem.ts"></Exercise>

#### Exercise 2: Avoiding Array Mutation

This `printNames` function accepts an array of `name` strings and logs them to the console. However, there are also non-working `@ts-expect-error` comments that should not allow for names to be added or changed:

```ts twoslash
// @errors: 2578
function printNames(names: string[]) {
  for (const name of names) {
    console.log(name);
  }

  // @ts-expect-error
  names.push("John");

  // @ts-expect-error
  names[0] = "Billy";
}
```

Your task is to update the type of the `names` parameter so that the array cannot be mutated. There are two ways to solve this problem.

<Exercise title="Exercise 2: Avoiding Array Mutation" filePath="/src/028-mutability/103-readonly-arrays.problem.ts"></Exercise>

#### Exercise 3: An Unsafe Tuple

Here we have a `dangerousFunction` which accepts an array of numbers as an argument:

```typescript
const dangerousFunction = (arrayOfNumbers: number[]) => {
  arrayOfNumbers.pop();
  arrayOfNumbers.pop();
};
```

Additionally, we've defined a variable `myHouse` which is a tuple representing a `Coordinate`:

```typescript
type Coordinate = [number, number];
const myHouse: Coordinate = [0, 0];
```

Our tuple `myHouse` contains two elements, and the `dangerousFunction` is structured to pop two elements from the given array.

Given that `pop` removes the last element from an array, calling `dangerousFunction` with `myHouse` will remove its contents.

Currently, TypeScript does not alert us to this potential issue, as seen by the error line under `@ts-expect-error`:

```ts twoslash
// @errors: 2578
type Coordinate = [number, number];
const myHouse: Coordinate = [0, 0];

const dangerousFunction = (arrayOfNumbers: number[]) => {
  arrayOfNumbers.pop();
  arrayOfNumbers.pop();
};

// ---cut---
dangerousFunction(
  // @ts-expect-error
  myHouse,
);
```

Your task is to adjust the type of `Coordinate` such that TypeScript triggers an error when we attempt to pass `myHouse` into `dangerousFunction`.

Note that you should only change `Coordinate`, and leave the function untouched.

<Exercise title="Exercise 3: An Unsafe Tuple" filePath="/src/028-mutability/104.5-fixing-unsafe-tuples.problem.ts"></Exercise>

#### Solution 1: Inference with an Array of Objects

Hovering over the `buttonsToChange` variable shows us that it is being inferred as an array of objects with a `type` property of type `string`:

```typescript
// hovering over buttonsToChange shows:
const buttonsToChange: {
  type: string;
}[];
```

This inference is happening because our array is mutable. We could change the type of the first element in the array to something different:

```typescript
buttonsToChange[0].type = "something strange";
```

This wider type is incompatible with the `ButtonAttributes` type, which expects the `type` property to be one of `"button"`, `"submit"`, or `"reset"`.

The fix here is to specify that `buttonsToChange` is an array of `ButtonAttributes`:

```typescript
type ButtonAttributes = {
  type: "button" | "submit" | "reset";
};

const modifyButton = (attributes: ButtonAttributes[]) => {};

const buttonsToChange: ButtonAttributes[] = [
  {
    type: "button",
  },
  {
    type: "submit",
  },
];

modifyButtons(buttonsToChange); // No error
```

Or, we could pass the array directly to the `modifyButtons` function:

```typescript
modifyButtons([
  {
    type: "button",
  },
  {
    type: "submit",
  },
]); // No error
```

By doing this, TypeScript will infer the `type` property more narrowly, and the error will go away.

#### Solution 2: Avoiding Array Mutation

Here are a couple ways to solve this problem.

##### Option 1: Add the `readonly` Keyword

The first approach solution is to add the `readonly` keyword before the `string[]` array. It applies to the entire `string[]` array, converting it into a read-only array:

```typescript
function printNames(names: readonly string[]) {
  ...
}
```

With this setup, TypeScript won't allow you to add items with `.push()` or perform any other modifications on the array.

##### Option 2: Use the `ReadonlyArray` Type Helper

Alternatively, you could use the `ReadonlyArray` type helper:

```typescript
function printNames(names: ReadonlyArray<string>) {
  ...
}
```

Regardless of which of these two methods you use, TypeScript will still display `readonly string[]` when hovering over the `names` parameter:

```typescript
// hovering over `names` shows:
(parameter) names: readonly string[]
```

Both work equally well at preventing the array from being modified.

#### Solution 3: An Unsafe Tuple

The best way to prevent unwanted changes to the `Coordinate` tuple is to make it a `readonly` tuple:

```typescript
type Coordinate = readonly [number, number];
```

Now, `dangerousFunction` throws a TypeScript error when we try to pass `myHouse` to it:

```ts twoslash
// @errors: 2345
type Coordinate = readonly [number, number];
const myHouse: Coordinate = [0, 0];

// ---cut---
const dangerousFunction = (arrayOfNumbers: number[]) => {
  arrayOfNumbers.pop();
  arrayOfNumbers.pop();
};

dangerousFunction(myHouse);
```

We get an error because the function's signature expects a modifiable array of numbers, but `myHouse` is a read-only tuple. TypeScript is protecting us against unwanted changes.

It's a good practice to use `readonly` tuples as much as possible to avoid problems like the one in this exercise.

## Deep Immutability with `as const`

We've seen so far that objects and arrays are mutable in JavaScript. This leads to their properties being inferred _widely_ by TypeScript.

We can get around this by giving the property a type annotation. But it still doesn't infer the literal type of the property.

```typescript
const albumAttributes: AlbumAttributes = {
  status: "on-sale",
};

// hovering over albumAttributes shows:
const albumAttributes: {
  status: "new-release" | "on-sale" | "staff-pick";
};
```

Instead of `albumAttributes.status` being inferred as `"on-sale"`, it's inferred as `"new-release" | "on-sale" | "staff-pick"`.

One way we could get TypeScript to infer it properly would be to somehow mark the entire object, and all its properties, as immutable. This would tell TypeScript that the object and its properties can't be changed, so it would be free to infer the literal types of the properties.

This is where the `as const` assertion comes in. We can use it to mark an object and all of its properties as constants, meaning that they can't be changed once they are created.

```typescript
const albumAttributes = {
  status: "on-sale",
} as const;

// hovering over albumAttributes shows:
const albumAttributes: {
  readonly status: "on-sale";
};
```

The `as const` assertion has made the entire object deeply read-only, including all of its properties. This means that `albumAttributes.status` is now inferred as the literal type `"on-sale"`.

Attempting to change the `status` property will result in an error:

```ts twoslash
// @errors: 2540
const albumAttributes = {
  status: "on-sale",
} as const;

// ---cut---
albumAttributes.status = "new-release";
```

This makes `as const` ideal for large config objects that you don't expect to change.

Just like the `readonly` modifier, `as const` only affects the type level. At runtime, the object and its properties are still mutable.

### `as const` vs Variable Annotation

You might be wondering what would happen if we combined `as const` with a variable annotation. How would it be inferred?

```typescript
const albumAttributes: AlbumAttributes = {
  status: "on-sale",
} as const;
```

You can think of this code as a competition between two forces: the `as const` assertion operating on the value, and the annotation operating on the variable.

When you have a competition like this, the variable annotation wins. The variable _owns_ the value, and forgets whatever the explicit value was before.

This means, curiously, that the `status` property is inferred as being mutable:

```typescript
albumAttributes.status = "new-release"; // No error
```

The `as const` assertion is being overridden by the variable annotation. Not fun.

We'll explore this interaction between variables and values further in our chapter on annotations and assertions.

### Comparing `as const` with `Object.freeze`

In JavaScript, the `Object.freeze` method is a way to create immutable objects at runtime. There are some significant differences between `Object.freeze` and `as const`.

For this example, we'll create a `shelfLocations` object that uses `Object.freeze`:

```typescript
const shelfLocations = Object.freeze({
  entrance: {
    status: "on-sale",
  },
  frontCounter: {
    status: "staff-pick",
  },
  endCap: {
    status: "new-release",
  },
});
```

Hovering over `shelfLocations` shows that the object has the `Readonly` modifier applied to it:

```typescript
// hovering over shelfLocations shows:
const shelfLocations: Readonly<{
  entrance: {
    status: string;
  };
  frontCounter: {
    status: string;
  };
  endCap: {
    status: string;
  };
}>;
```

Recall that the `Readonly` modifier only works on the _first level_ of an object. If we try to modify the `frontCounter` property, TypeScript will throw an error:

```ts twoslash
// @errors: 2540
const shelfLocations = Object.freeze({
  entrance: {
    status: "on-sale",
  },
  frontCounter: {
    status: "staff-pick",
  },
  endCap: {
    status: "new-release",
  },
});

// ---cut---
shelfLocations.frontCounter = {
  status: "new-release",
};
```

However, we are able to change the nested `status` property of a specific location:

```typescript
shelfLocations.entrance.status = "new-release";
```

This is in line with how `Object.freeze` works in JavaScript. It only makes the object and its properties read-only at the first level. It doesn't make the entire object deeply read-only.

Using `as const` makes the entire object deeply read-only, including all nested properties:

```ts twoslash
const shelfLocations = {
  entrance: {
    status: "on-sale",
  },
  frontCounter: {
    status: "staff-pick",
  },
  endCap: {
    status: "new-release",
  },
} as const;

console.log(shelfLocations);
//          ^?
```

Of course, this is just a type-level annotation. `Object.freeze` gives you runtime immutability, while `as const` gives you type-level immutability. I actually prefer the latter - doing less work at runtime is always a good thing.

So while both `as const` and `Object.freeze` will enforce immutability, `as const` is the more convenient and efficient choice. Unless you specifically need the top level of an object to be frozen at runtime, you should stick with `as const`.

### Exercises

#### Exercise 1: Returning A Tuple From A Function

In this exercise, we are dealing with an async function named `fetchData` that fetches data from a URL and returns a result.

Whether the function succeeds or fails, it returns a tuple. The first member of the tuple contains an error message if the fetch operation fails, and the second member contains the fetched data if the operation is successful.

Here's how the function is currently implemented:

```typescript
const fetchData = async () => {
  const result = await fetch("/");

  if (!result.ok) {
    return [new Error("Could not fetch data.")];
  }

  const data = await result.json();

  return [undefined, data];
};
```

Here's an async `example` function that uses `fetchData` and includes a couple of test cases:

```ts twoslash
// @errors: 2344
import { Equal, Expect } from "@total-typescript/helpers";

const fetchData = async () => {
  const result = await fetch("/");

  if (!result.ok) {
    return [new Error("Could not fetch data.")];
  }

  const data = await result.json();

  return [undefined, data];
};
// ---cut---
const example = async () => {
  const [error, data] = await fetchData();

  type Tests = [
    Expect<Equal<typeof error, Error | undefined>>,
    Expect<Equal<typeof data, any>>,
  ];
};
```

Currently, both members of the tuple are inferred as `any`, which isn't ideal.

```typescript
const [error, data] = await fetchData();

// hovering over error and data shows:
const error: any;
const data: any;
```

Your challenge is to modify the `fetchData` function implementation so that TypeScript infers a Promise with a tuple for its return type.

Depending on whether or not the fetch operation is successful, the tuple should contain either an error message or a pair of `undefined` and the data fetched.

Hint: There are two possible approaches to solve this challenge. One way would be to define an explicit return type for the function. Alternatively, you could attempt to add or change type annotations for the `return` values within the function.

<Exercise title="Exercise 1: Returning A Tuple From A Function" filePath="/src/028-mutability/106-as-const-to-make-functions-infer-a-tuple.problem.ts"></Exercise>

#### Exercise 2: Inferring Literal Values In Arrays

Let's revisit a previous exercise and evolve our solution.

The `modifyButtons` function accepts an array of objects with a `type` property:

```ts twoslash
// @errors: 2345
type ButtonAttributes = {
  type: "button" | "submit" | "reset";
};

const modifyButtons = (attributes: ButtonAttributes[]) => {};

const buttonsToChange = [
  {
    type: "button",
  },
  {
    type: "submit",
  },
];

modifyButtons(buttonsToChange);
```

Previously, the error was solved by updating `buttonsToChange` to be specified as an array of `ButtonAttributes`:

```typescript
const buttonsToChange: ButtonAttributes[] = [
  {
    type: "button",
  },
  {
    type: "submit",
  },
];
```

This time, your challenge is to solve the error by finding a different solution. Specifically, you should modify the `buttonsToChange` array so that TypeScript infers the literal type of the `type` property.

You should not alter the `ButtonAttributes` type definition or the `modifyButtons` function.

<Exercise title="Exercise 2: Inferring Literal Values In Arrays" filePath="/src/028-mutability/107-as-const-can-make-strings-infer-as-their-literals-in-objects.explainer.ts"></Exercise>

#### Solution 1: Returning A Tuple From A Function

As mentioned, there are two different solutions to this challenge.

##### Option 1: Defining a Return Type

The first solution is to define a return type for the `fetchData` function.

Inside the `Promise` type, a tuple is defined with either `Error` or `undefined` as the first member, and an optional `any` as the second member:

```typescript
const fetchData = async (): Promise<[Error | undefined, any?]> => {
  ...
```

This technique works perfectly well.

##### Option 2: Using `as const`

Instead of specifying a return type, the second solution is to use `as const` on the return values:

```typescript
import { Equal, Expect } from "@total-typescript/helpers";

const fetchData = async () => {
  const result = await fetch("/");

  if (!result.ok) {
    return [new Error("Could not fetch data.")] as const; // added as const here
  }

  const data = await result.json();

  return [undefined, data] as const; // added as const here
};
```

With these changes in place, when we check the return type of `fetchData` in the `example` function, we can see that `error` is inferred as `Error | undefined`, and `data` is `any`:

```typescript
const example = async () => {
  const [error, data] = await fetchData();

  // ...
};

// hovering over error shows:
const error: Error | undefined;

// hovering over data shows:
const data: any;
```

In the case of this challenge, without `as const`, TypeScript is making two mistakes. Firstly, it's inferring each of the returned arrays as _arrays_, not tuples. This is TypeScript's default behaviour:

```typescript
const data = await result.json();

const result = [undefined, data];

// hovering over result shows:
const result: any[];
```

We can also see that when `undefined` is placed into an array with `any`, TypeScript infers the array as `any[]`. This is TypeScript's second mistake - collapsing our `undefined` value so it all but disappears.

However, by using `as const`, TypeScript correctly infers the return value as a tuple (`Promise<[string | undefined, any]>`). This is a great example of how `as const` can help TypeScript give us the best type inference possible.

#### Solution 2: Inferring Literal Values In Arrays

Let's look at some different options for solving this challenge.

##### Option 1: Annotate the Entire Array

The `as const` assertion can be used to solve this problem. By annotating the entire array with `as const`, TypeScript will infer the literal type of the `type` property:

```typescript
const buttonsToChange = [
  {
    type: "button",
  },
  {
    type: "submit",
  },
] as const;
```

Hovering over `buttonsToChange` shows that TypeScript has inferred the `type` property as a literal type, and `modifyButtons` will no longer show an error when `buttonsToChange` is passed to it:

```typescript
// hovering over buttonsToChange shows:
const buttonsToChange: readonly [
  {
    readonly type: "button";
  },
  {
    readonly type: "submit";
  },
];
```

##### Option 2: Annotate the members of the array

Another way to solve this problem is to annotate each member of the array with `as const`:

```typescript
const buttonsToChange = [
  {
    type: "button",
  } as const,
  {
    type: "submit",
  } as const,
];
```

Hovering over `buttonsToChange` shows something interesting. Each object is now inferred as `readonly`, but the array itself is not:

```typescript
// hovering over buttonsToChange shows:
const buttonsToChange: (
  | {
      readonly type: "button";
    }
  | {
      readonly type: "submit";
    }
)[];
```

The `buttonsToChange` array is also no longer being inferred as a tuple with a fixed length, so we can modify it by pushing new objects to it:

```typescript
buttonsToChange.push({
  type: "button",
});
```

This behavior stems from tagging the individual members of the array with `as const`, instead of the entire array.

However, this inference is good enough to satisfy `modifyButtons`, because it matches the `ButtonAttributes` type.

##### Option 3: `as const` on strings

The last solution we'll look at is using `as const` on the string literals to infer the literal type:

```typescript
const buttonsToChange = [
  {
    type: "button" as const,
  },
  {
    type: "submit" as const,
  },
];
```

Now when we hover over `buttonsToChange` we've lost the `readonly` modifier, because `as const` is only being targeted at the string inside of the object, not the object itself:

```typescript
// hovering over buttonsToChange shows:
const buttonsToChange: (
  | {
      type: "button";
    }
  | {
      type: "submit";
    }
)[];
```

But again, this is still typed strongly enough to satisfy `modifyButtons`.

When using `as const` like this acts like a hint to TypeScript that it should infer a literal type where it wouldn't otherwise. This can be occasionally useful for when you want to allow mutation, but still want to infer a literal type.


--- CHAPTER ---

Classes are a JavaScript feature that help you encapsulate data and behavior into a single unit. They are a fundamental part of object-oriented programming and are used to create objects that have properties and methods.

You can use the `class` keyword to define a class, and then create instances of that class using the `new` keyword. TypeScript adds a layer of static type checking to classes, which can help you catch errors and enforce structure in your code.

Let's build a class from scratch and see how it works.

## Creating a Class

To create a class, you use the `class` keyword followed by the name of the class. Similar to types and interfaces, the convention is to have the name in PascalCase, which means the first letter of each word in the name is capitalized.

We'll start creating the `Album` class in a similar way to how a type or interface is created:

```ts twoslash
// @errors: 2564
class Album {
  title: string;
  artist: string;
  releaseYear: number;
}
```

At this point, even though it looks like a type or interface, TypeScript gives an error for each property in the class.
How do we fix this?

### Adding a Constructor

In order to fix these errors, we need to add a `constructor` to the class. The `constructor` is a special method that runs when a new instance of the class is created. It's where you can set up the initial state of the object.

To start, we'll add a constructor that assigns values for the properties of the `Album` class:

```typescript
class Album {
  title: string;
  artist: string;
  releaseYear: number;

  constructor() {
    this.title = "Loop Finding Jazz Records";
    this.artist = "Jan Jelinek";
    this.releaseYear = 2001;
  }
}
```

Now, when we create a new instance of the `Album` class, we can access the properties and values we've set in the constructor:

```typescript
const loopFindingJazzRecords = new Album();

console.log(loopFindingJazzRecords.title); // Output: Loop Finding Jazz Records
```

The `new` keyword creates a new instance of the `Album` class, and the constructor sets the initial values of our class's properties. In this case, because the properties are hardcoded, every instance of the `Album` class will have the same values.

#### You Don't Always Need To Type Class Properties

As we'll see, TypeScript can do some really smart inference with classes. It's able to infer the types of the properties from where we assign them in the constructor, so we can actually drop some of the type annotations:

```typescript
class Album {
  title;
  artist;
  releaseYear;

  constructor() {
    this.title = "Loop Finding Jazz Records";
    this.artist = "Jan Jelinek";
    this.releaseYear = 2001;
  }
}
```

However, it's common to see the types specified in the class body as well since they act as a form of documentation for the class that's quick to read.

### Adding Arguments to the Constructor

We can use the constructor to declare arguments for the class. This allows us to pass in values when creating a new instance of the class.

Update the constructor to accept an `opts` argument that includes the properties of the `Album` class:

```typescript
// inside the Album class
constructor(opts: { title: string; artist: string; releaseYear: number }) {
 // ...
}
```

Then inside of the body of the constructor, we'll use assign `this.title`, `this.artist`, and `this.releaseYear` to the values of the `opts` argument.

```typescript
// inside the Album class
constructor(opts: { title: string; artist: string; releaseYear: number }) {
  this.title = opts.title;
  this.artist = opts.artist;
  this.releaseYear = opts.releaseYear;
}
```

The `this` keyword refers to the instance of the class, and it's used to access the properties and methods of the class.

Now, when we create a new instance of the `Album` class, we can pass an object with the properties we want to set.

```typescript
const loopFindingJazzRecords = new Album({
  title: "Loop Finding Jazz Records",
  artist: "Jan Jelinek",
  releaseYear: 2001,
});

console.log(loopFindingJazzRecords.title); // Output: Loop Finding Jazz Records
```

### Using a Class as a Type

An interesting property of classes in TypeScript is that they can be used as types for variables and function parameters. The syntax is similar to how you would use any other type or interface.

In this case, we'll use the `Album` class to type the `album` parameter of a `printAlbumInfo` function:

```typescript
function printAlbumInfo(album: Album) {
  console.log(
    `${album.title} by ${album.artist}, released in ${album.releaseYear}.`,
  );
}
```

We can then call the function and pass in an instance of the `Album` class:

```typescript
printAlbumInfo(sixtyNineLoveSongsAlbum);

// Output: 69 Love Songs by The Magnetic Fields, released in 1999.
```

While using a class as a type is possible, it's a much more common pattern to require classes to implement a specific interface.

## Properties in Classes

Now that we've seen how to create a class and create new instances of it, let's look a bit closer at how properties work.

### Class Property Initializers

You can set default values for properties directly in the class body. These are called class property initializers.

```typescript
class Album {
  title = "Unknown Album";
  artist = "Unknown Artist";
  releaseYear = 0;
}
```

You can combine them with type annotations:

```typescript
class Album {
  title: string = "Unknown Album";
  artist: string = "Unknown Artist";
  releaseYear: number = 0;
}
```

Importantly, class property initializers are resolved _before_ the constructor is called. This means you can override the default values by assigning a different value in the constructor:

```typescript
class User {
  name = "Unknown User";

  constructor() {
    this.name = "Matt Pocock";
  }
}

const user = new User();

console.log(user.name); // Output: Matt Pocock
```

### `readonly` Class Properties

As we've seen with types and interfaces, the `readonly` keyword can be used to make a property immutable. This means that once the property is set, it cannot be changed:

```typescript
class Album {
  readonly title: string;
  readonly artist: string;
  readonly releaseYear: number;
}
```

### Optional Class Properties

We can also mark properties as optional in the same way as objects, using the `?:` annotation:

```typescript
class Album {
  title?: string;
  artist?: string;
  releaseYear?: number;
}
```

As we can see from the lack of errors above, this also means they don't need to be set in the constructor.

### `public` and `private` properties

The `public` and `private` keywords are used to control the visibility and accessibility of class properties.

By default, properties are `public`, which means that they can be accessed from outside the class.

If we want to restrict access to certain properties, we can mark them as `private`. This means that they can only be accessed from within the class itself.

For example, say we want to add a `rating` property to the album class that will only be used inside of the class:

```typescript
class Album {
  private rating = 0;
}
```

Now if we try to access the `rating` property from outside of the class, TypeScript will give us an error:

```ts twoslash
// @errors: 2341
class Album {
  private rating = 0;
}

const loopFindingJazzRecords = new Album();
// ---cut---
console.log(loopFindingJazzRecords.rating);
```

However, this doesn't actually prevent it from being accessed at runtime - `private` is just a compile-time annotation. You could suppress the error using a `@ts-ignore` (which we'll look at later) and still access the property:

```typescript
// @ts-ignore
console.log(loopFindingJazzRecords.rating); // Output: 0
```

#### Runtime Private Properties

To get the same behavior at runtime, you can also use the `#` prefix to mark a property as private:

```typescript
class Album {
  #rating = 0;
}
```

The `#` syntax behaves the same as `private`, but it's a newer feature that's part of the ECMAScript standard. This means that it can be used in JavaScript as well as TypeScript.

Attempting to access a `#`-prefixed property from outside of the class will result in a syntax error:

```ts twoslash
// @errors: 18013
class Album {
  #rating = 0;
}

const loopFindingJazzRecords = new Album();
// ---cut---
console.log(loopFindingJazzRecords.#rating); // SyntaxError
```

Attempting to cheat by accessing it with a dynamic string will return `undefined` - and still give a TypeScript error.

```ts twoslash
// @errors: 7053
class Album {
  #rating = 0;
}

const loopFindingJazzRecords = new Album();

// ---cut---
console.log(loopFindingJazzRecords["#rating"]); // Output: undefined
```

So, if you want to ensure that a property is truly private, you should use the `#` syntax.

## Class Methods

Along with properties, classes can also contain methods. These functions help express the behaviors of a class and can be used to interact with both public and private properties.

### Implementing Class Methods

Let's add a `printAlbumInfo` method to the `Album` class that will log the album's title, artist, and release year.

There are a couple of techniques for adding methods to a class.

The first is to follow the same pattern as the constructor and directly add the method to the class body:

```typescript
// inside of the Album class
printAlbumInfo() {
  console.log(`${this.title} by ${this.artist}, released in ${this.releaseYear}.`);
}
```

Another option is to use an arrow function to define the method:

```typescript
// inside of the Album class
printAlbumInfo = () => {
  console.log(
    `${this.title} by ${this.artist}, released in ${this.releaseYear}.`,
  );
};
```

Once the `printAlbumInfo` method has been added, we can call it to log the album's information:

```typescript
loopFindingJazzRecords.printAlbumInfo();

// Output: Loop Finding Jazz Records by Jan Jelinek, released in 2001.
```

#### Arrow Functions or Class Methods?

Arrow functions and class methods do differ in their behavior. The difference is the way that `this` is handled.

This is runtime JavaScript behavior, so slightly outside the scope of this book. But in the interest of helpfulness, here's an example:

```typescript
class MyClass {
  location = "Class";

  arrow = () => {
    console.log("arrow", this);
  };

  method() {
    console.log("method", this);
  }
}

const myObj = {
  location: "Object",
  arrow: new MyClass().arrow,
  method: new MyClass().method,
};

myObj.arrow(); // { location: 'Class' }
myObj.method(); // { location: 'Object' }
```

In the `arrow` method, `this` is bound to the instance of the class where it was defined. In the `method` method, `this` is bound to the object where it was called.

This can be a bit of a gotcha when working with classes, whether in JavaScript or TypeScript.

## Class Inheritance

Similar to how we can extend types and interfaces, we can also extend classes in TypeScript. This allows you to create a hierarchy of classes that can inherit properties and methods from one another, making your code more organized and reusable.

For this example, we'll go back to our basic `Album` class that will act as our base class:

```typescript
class Album {
  title: string;
  artist: string;
  releaseYear: number;

  constructor(opts: { title: string; artist: string; releaseYear: number }) {
    this.title = title;
    this.artist = artist;
    this.releaseYear = releaseYear;
  }

  displayInfo() {
    console.log(
      `${this.title} by ${this.artist}, released in ${this.releaseYear}.`,
    );
  }
}
```

The goal is to create a `SpecialEditionAlbum` class that extends the `Album` class and adds a `bonusTracks` property.

### Extending a Class

The first step is to use the `extends` keyword to create the `SpecialEditionAlbum` class:

```typescript
class SpecialEditionAlbum extends Album {}
```

Once the `extends` keyword is added, any new properties or methods added to the `SpecialEditionAlbum` class will be in addition to what it inherits from the `Album` class. For example, we can add a `bonusTracks` property to the `SpecialEditionAlbum` class:

```typescript
class SpecialEditionAlbum extends Album {
  bonusTracks: string[];
}
```

Next, we need to add a constructor that includes all of the properties from the `Album` class as well as the `bonusTracks` property. There are a couple of important things to note about the constructor when extending a class.

First, the arguments to the constructor should match the shape used in the parent class. In this case, that's an `opts` object with the properties of the `Album` class along with the new `bonusTracks` property.

Second, we need to include a call to `super()`. This is a special method that calls the constructor of the parent class and sets up the properties it defines. This is crucial to ensure that the base properties are initialized properly. We'll pass in `opts` to the `super()` method and then set the `bonusTracks` property:

```typescript
class SpecialEditionAlbum extends Album {
  bonusTracks: string[];

  constructor(opts: {
    title: string;
    artist: string;
    releaseYear: number;
    bonusTracks: string[];
  }) {
    super(opts);
    this.bonusTracks = opts.bonusTracks;
  }
}
```

Now that we have the `SpecialEditionAlbum` class set up, we can create a new instance similarly to how we would with the `Album` class:

```typescript
const plasticOnoBandSpecialEdition = new SpecialEditionAlbum({
  title: "Plastic Ono Band",
  artist: "John Lennon",
  releaseYear: 2000,
  bonusTracks: ["Power to the People", "Do the Oz"],
});
```

This pattern can be used to add more methods, properties, and behavior to the `SpecialEditionAlbum` class, while still maintaining the properties and methods of the `Album` class.

### `protected` Properties

In addition to `public` and `private`, there's a third visibility modifier called `protected`. This is similar to `private`, but it allows the property to be accessed from within classes that extend the class.

For example, if we wanted to make the `title` property of the `Album` class `protected`, we could do so like this:

```typescript
class Album {
  protected title: string;
  // ...
}
```

Now, the `title` property can be accessed from within the `SpecialEditionAlbum` class, and not from outside the class.

### Safe Overrides With `override`

You can run into trouble when extending classes if you try to override a method in a subclass. Let's say our `Album` class implements a `displayInfo` method:

```typescript
class Album {
  // ...
  displayInfo() {
    console.log(
      `${this.title} by ${this.artist}, released in ${this.releaseYear}.`,
    );
  }
}
```

And our `SpecialEditionAlbum` class also implements a `displayInfo` method:

```typescript
class SpecialEditionAlbum extends Album {
  // ...
  displayInfo() {
    console.log(
      `${this.title} by ${this.artist}, released in ${this.releaseYear}.`,
    );
    console.log(`Bonus tracks: ${this.bonusTracks.join(", ")}`);
  }
}
```

This overrides the `displayInfo` method from the `Album` class, adding an extra log for the bonus tracks.

But what happens if we change the `displayInfo` method in `Album` to `displayAlbumInfo`? `SpecialEditionAlbum` won't automatically get updated, and its override will no longer work.

To prevent this, you can use the `override` keyword in the subclass to indicate that you're intentionally overriding a method from the parent class:

```typescript
class SpecialEditionAlbum extends Album {
  // ...
  override displayInfo() {
    console.log(
      `${this.title} by ${this.artist}, released in ${this.releaseYear}.`,
    );
    console.log(`Bonus tracks: ${this.bonusTracks.join(", ")}`);
  }
}
```

Now, if the `displayInfo` method in the `Album` class is changed, TypeScript will give an error in the `SpecialEditionAlbum` class, letting you know that the method is no longer being overridden.

You can also enforce this by setting `noImplicitOverride` to `true` in your `tsconfig.json` file. This will force you to always specify `override` when you're overriding a method:

```json
{
  "compilerOptions": {
    "noImplicitOverride": true
  }
}
```

### The `implements` Keyword

There are some situations where you want to enforce that a class adheres to a specific structure. To do that, you can use the `implements` keyword.

The `SpecialEditionAlbum` class we created in the previous example adds a `bonusTracks` property to the `Album` class, but there is no `trackList` property for the regular `Album` class.

Let's create an interface to enforce that any class that implements it must have a `trackList` property.

We'll call the interface `IAlbum`, and include properties for the `title`, `artist`, `releaseYear`, and `trackList` properties:

```typescript
interface IAlbum {
  title: string;
  artist: string;
  releaseYear: number;
  trackList: string[];
}
```

Note that the `I` prefix is used to indicate an interface, while a `T` indicates a type. It isn't required to use these prefixes, but it's a common convention called Hungarian Notation and makes it more clear what the interface will be used for when reading the code. I don't recommend doing this for all your interfaces and types - only when they conflict with a class of the same name.

With the interface created, we can use the `implements` keyword to associate it with the `Album` class.

```ts twoslash
// @errors: 2420
interface IAlbum {
  title: string;
  artist: string;
  releaseYear: number;
  trackList: string[];
}

// ---cut---
class Album implements IAlbum {
  title: string;
  artist: string;
  releaseYear: number;

  constructor(opts: { title: string; artist: string; releaseYear: number }) {
    this.title = opts.title;
    this.artist = opts.artist;
    this.releaseYear = opts.releaseYear;
  }
}
```

Because the `trackList` property is missing from the `Album` class, TypeScript now gives us an error. In order to fix it, the `trackList` property needs to be added to the `Album` class. Once the property is added, we could update the interface or set up getters and setters accordingly:

```typescript
class Album implements IAlbum {
  title: string;
  artist: string;
  releaseYear: number;
  trackList: string[];

  constructor(opts: {
    title: string;
    artist: string;
    releaseYear: number;
    trackList: string[];
  }) {
    this.title = opts.title;
    this.artist = opts.artist;
    this.releaseYear = opts.releaseYear;
    this.trackList = opts.trackList;
  }

  // ...
}
```

This lets us define a contract for the `Album` class that enforces the structure of the class and helps catch errors early.

### Abstract Classes

Another pattern you can use for defining base classes is the `abstract` keyword. Abstract classes blur the line between types and runtime. You can declare an abstract class like this:

```typescript
abstract class AlbumBase {}
```

You can then define methods and behavior on it, like a regular class:

```typescript
abstract class AlbumBase {
  title: string;
  artist: string;
  releaseYear: number;
  trackList: string[] = [];

  constructor(opts: { title: string; artist: string; releaseYear: number }) {
    this.title = opts.title;
    this.artist = opts.artist;
    this.releaseYear = opts.releaseYear;
  }

  addTrack(track: string) {
    this.trackList.push(track);
  }
}
```

But if you try to create an instance of the `AlbumBase` class, TypeScript will give you an error:

```ts twoslash
// @errors: 2511
abstract class AlbumBase {
  title: string;
  artist: string;
  releaseYear: number;
  trackList: string[] = [];

  constructor(opts: { title: string; artist: string; releaseYear: number }) {
    this.title = opts.title;
    this.artist = opts.artist;
    this.releaseYear = opts.releaseYear;
  }

  addTrack(track: string) {
    this.trackList.push(track);
  }
}

// ---cut---
const albumBase = new AlbumBase({
  title: "Unknown Album",
  artist: "Unknown Artist",
  releaseYear: 0,
});
```

Instead, you'd need to create a class that extends the `AlbumBase` class:

```typescript
class Album extends AlbumBase {
  // any extra functionality you want
}

const album = new Album({
  title: "Unknown Album",
  artist: "Unknown Artist",
  releaseYear: 0,
});
```

You'll notice that this idea is similar to implementing inferfaces - except that abstract classes can also include implementation details.

This means you can blur the line a little between types and runtime. You can define a type contract for a class, but make it more reusable.

#### Abstract Methods

On our abstract class, we can use the `abstract` keyword before a method to indicate that it must be implemented by any class that extends the abstract class:

```typescript
abstract class AlbumBase {
  // ...other properties and methods

  abstract addReview(author: string, review: string): void;
}
```

Now, any class that extends `AlbumBase` must implement the `addReview` method:

```typescript
class Album extends AlbumBase {
  // ...other properties and methods

  addReview(author: string, review: string) {
    // ...implementation
  }
}
```

This gives us another tool for expressing the structure of our classes and ensuring that they adhere to a specific contract.

## Exercises

### Exercise 1: Creating a Class

Here we have a class called `CanvasNode` that currently functions identically to an empty object:

```typescript
class CanvasNode {}
```

Inside of a test case, we instantiate the class by calling `new CanvasNode()`.

However, have some errors since we expect it to house two properties, specifically `x` and `y`, each with a default value of `0`:

```ts twoslash
// @errors: 2339
import { it, expect } from "vitest";

class CanvasNode {}

// ---cut---
it("Should store some basic properties", () => {
  const canvasNode = new CanvasNode();

  expect(canvasNode.x).toEqual(0);
  expect(canvasNode.y).toEqual(0);

  // @ts-expect-error Property is readonly
  canvasNode.x = 10;

  // @ts-expect-error Property is readonly
  canvasNode.y = 20;
});
```

As seen from the `@ts-expect-error` directives, we also expect these properties to be readonly.

Your challenge is to implement the `CanvasNode` class to satisfy these requirements. For extra practice, solve the challenge with and without the use of a constructor.

<Exercise title="Exercise 1: Creating a Class" filePath="/src/030-classes/108-understand-classes.problem.ts"></Exercise>

### Exercise 2: Implementing Class Methods

In this exercise, we've simplified our `CanvasNode` class so that it no longer has read-only properties:

```typescript
class CanvasNode {
  x = 0;
  y = 0;
}
```

There is a test case for being able to move the `CanvasNode` object to a new location:

```ts twoslash
// @errors: 2339
import { it, expect } from "vitest";
class CanvasNode {
  x = 0;
  y = 0;
}
// ---cut---
it("Should be able to move to a new location", () => {
  const canvasNode = new CanvasNode();

  expect(canvasNode.x).toEqual(0);
  expect(canvasNode.y).toEqual(0);

  canvasNode.move(10, 20);

  expect(canvasNode.x).toEqual(10);
  expect(canvasNode.y).toEqual(20);
});
```

Currently, there is an error under the `move` method call because the `CanvasNode` class does not have a `move` method.

Your task is to add a `move` method to the `CanvasNode` class that will update the `x` and `y` properties to the new location.

<Exercise title="Exercise 2: Implementing Class Methods" filePath="/src/030-classes/109-class-methods.problem.ts"></Exercise>

### Exercise 3: Implement a Getter

Let's continue working with the `CanvasNode` class, which now has a constructor that accepts an optional argument, renamed to `position`. This `position` is an object that replaces the individual `x` and `y` we had before:

```typescript
class CanvasNode {
  x: number;
  y: number;

  constructor(position?: { x: number; y: number }) {
    this.x = position?.x ?? 0;
    this.y = position?.y ?? 0;
  }

  move(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
```

In these test cases, there are errors accessing the `position` property since it is not currently a property of the `CanvasNode` class:

```ts twoslash
// @errors: 2339
import { it, expect } from "vitest";

class CanvasNode {
  x: number;
  y: number;

  constructor(position?: { x: number; y: number }) {
    this.x = position?.x ?? 0;
    this.y = position?.y ?? 0;
  }

  move(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

// ---cut---
it("Should be able to move", () => {
  const canvasNode = new CanvasNode();

  expect(canvasNode.position).toEqual({ x: 0, y: 0 });

  canvasNode.move(10, 20);

  expect(canvasNode.position).toEqual({ x: 10, y: 20 });
});

it("Should be able to receive an initial position", () => {
  const canvasNode = new CanvasNode({
    x: 10,
    y: 20,
  });

  expect(canvasNode.position).toEqual({ x: 10, y: 20 });
});
```

Your task is to update the `CanvasNode` class to include a `position` getter that will allow for the test cases to pass.

<Exercise title="Exercise 3: Implement a Getter" filePath="/src/030-classes/111-getters.problem.ts"></Exercise>

### Exercise 4: Implement a Setter

The `CanvasNode` class has been updated so that `x` and `y` are now private properties:

```typescript
class CanvasNode {
  #x: number;
  #y: number;

  constructor(position?: { x: number; y: number }) {
    this.#x = position?.x ?? 0;
    this.#y = position?.y ?? 0;
  }

  // your `position` getter method here

  // move method as before
}
```

The `#` in front of the `x` and `y` properties means they are `readonly` and can't be modified directly outside of the class. In addition, when a getter is present without a setter, its property will also be treated as `readonly`, as seen in this test case:

```ts twoslash
// @errors: 2540
declare const canvasNode: {
  readonly position: { x: number; y: number };
};

// ---cut---
canvasNode.position = { x: 10, y: 20 };
```

Your task is to write a setter for the `position` property that will allow for the test case to pass.

<Exercise title="Exercise 4: Implement a Setter" filePath="/src/030-classes/113-setters.problem.ts"></Exercise>

### Exercise 5: Extending a Class

Here we have a more complex version of the `CanvasNode` class.

In addition to the `x` and `y` properties, the class now has a `viewMode` property that is typed as `ViewMode` which can be set to `hidden`, `visible`, or `selected`:

```typescript
type ViewMode = "hidden" | "visible" | "selected";

class CanvasNode {
  x = 0;
  y = 0;
  viewMode: ViewMode = "visible";

  constructor(options?: { x: number; y: number; viewMode?: ViewMode }) {
    this.x = options?.x ?? 0;
    this.y = options?.y ?? 0;
    this.viewMode = options?.viewMode ?? "visible";
  }

  /* getter, setter, and move methods as before */
```

Imagine if our application had a `Shape` class that only needed the `x` and `y` properties and the ability to move around. It wouldn't need the `viewMode` property or the logic related to it.

Your task is to refactor the `CanvasNode` class to split the `x` and `y` properties into a separate class called `Shape`. Then, the `CanvasNode` class should extend the `Shape` class, adding the `viewMode` property and the logic related to it.

If you like, you can use an `abstract` class to define `Shape`.

<Exercise title="Exercise 5: Extending a Class" filePath="/src/030-classes/114-extending-other-classes.problem.ts"></Exercise>

### Solution 1: Creating a Class

Here's an example of a `CanvasNode` class with a constructor that meets the requirements:

```typescript
class CanvasNode {
  readonly x: number;
  readonly y: number;

  constructor() {
    this.x = 0;
    this.y = 0;
  }
}
```

Without a constructor, the `CanvasNode` class can be implemented by assigning the properties directly:

```typescript
class CanvasNode {
  readonly x = 0;
  readonly y = 0;
}
```

### Solution 2: Implementing Class Methods

The `move` method can be implemented either as a regular method or as an arrow function:

Here's the regular method:

```typescript
class CanvasNode {
  x = 0;
  y = 0;

  move(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
```

And the arrow function:

```typescript
class CanvasNode {
  x = 0;
  y = 0;

  move = (x: number, y: number) => {
    this.x = x;
    this.y = y;
  };
}
```

As discussed in a previous section, it's safer to use the arrow function to avoid issues with `this`.

### Solution 3: Implement a Getter

Here's how the `CanvasNode` class can be updated to include a getter for the `position` property:

```typescript
class CanvasNode {
  x: number;
  y: number;

  constructor(position?: { x: number; y: number }) {
    this.x = position?.x ?? 0;
    this.y = position?.y ?? 0;
  }

  move(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get position() {
    return { x: this.x, y: this.y };
  }
}
```

With the getter in place, the test cases will pass.

Remember, when using a getter, you can access the property as if it were a regular property on the class instance:

```typescript
const canvasNode = new CanvasNode();
console.log(canvasNode.position.x); // 0
console.log(canvasNode.position.y); // 0
```

### Solution 4: Implement a Setter

Here's how a `position` setter can be added to the `CanvasNode` class:

```typescript
class CanvasNode {
  // inside the CanvasNode class
  set position(pos) {
    this.x = pos.x;
    this.y = pos.y;
  }
}
```

Note that we don't have to add a type to the `pos` parameter since TypeScript is smart enough to infer it based on the getter's return type.

### Solution 5: Extending a Class

The new `Shape` class would look very similar to the original `CanvasNode` class:

```typescript
class Shape {
  #x: number;
  #y: number;

  constructor(options?: { x: number; y: number }) {
    this.#x = options?.x ?? 0;
    this.#y = options?.y ?? 0;
  }

  // position getter and setter methods

  move(x: number, y: number) {
    this.#x = x;
    this.#y = y;
  }
}
```

The `CanvasNode` class would then extend the `Shape` class and add the `viewMode` property. The constructor would also be updated to accept the `viewMode` and call `super()` to pass the `x` and `y` properties to the `Shape` class:

```typescript
class CanvasNode extends Shape {
  #viewMode: ViewMode;

  constructor(options?: { x: number; y: number; viewMode?: ViewMode }) {
    super(options);
    this.#viewMode = options?.viewMode ?? "visible";
  }
}
```


--- CHAPTER ---

Based on what I've told you so far, you might be thinking of TypeScript as just "JavaScript with types". JavaScript handles the runtime code, and TypeScript describes it with types.

But TypeScript actually has a few runtime features that don't exist in JavaScript. These features are compiled into JavaScript, but they are not part of the JavaScript language itself.

In this chapter we'll look at several of these TypeScript-only features, including parameter properties, enums and namespaces. Along the way, we'll discuss benefits and trade-offs, as well as when you might want to stick with JavaScript.

## Class Parameter Properties

One TypeScript feature that doesn't exist in JavaScript is class parameter properties. These allow you to declare and initialize class members directly from the constructor parameters.

Consider this `Rating` class:

```typescript
class Rating {
  constructor(public value: number, private max: number) {}
}
```

That the constructor includes `public` before the `value` parameter and `private` before the `max` parameter. In JavaScript, this compiles down to code which assigns the parameters to properties on the class:

```typescript
class Rating {
  constructor(value, max) {
    this.value = value;
    this.max = max;
  }
}
```

Compared to handling the assignment manually, this saves a lot of code and keeps the class definition concise.

But unlike other TypeScript features, the outputted JavaScript is not a direct representation of the TypeScript code. This can make it difficult to understand what's happening if you're not familiar with the feature.

## Enums

You can use the `enum` keyword to define a set of named constants. These can be used as types or values.

Enums were added in the very first version of TypeScript, but they haven't yet been added to JavaScript. This means it's a TypeScript-only runtime feature. And, as we'll see, it comes with some quirky behavior.

A good use case for enums is when there are a limited set of related values that aren't expected to change.

### Numeric Enums

Numeric enums group together a set of related members and automatically assigns them numeric values starting from 0. For example, consider this `AlbumStatus` enum:

```typescript
enum AlbumStatus {
  NewRelease,
  OnSale,
  StaffPick,
}
```

In this case, `AlbumStatus.NewRelease` would be 0, `AlbumStatus.OnSale` would be 1, and so on.

To use the `AlbumStatus` as a type, we could use its name:

```typescript
function logStatus(genre: AlbumStatus) {
  console.log(genre); // 0
}
```

Now, `logStatus` can only receive values from the `AlbumStatus` enum object.

```typescript
logStatus(AlbumStatus.NewRelease);
```

#### Numeric Enums with Explicit Values

You can also assign specific values to each member of the enum. For example, if you wanted to assign the value 1 to `NewRelease`, 2 to `OnSale`, and 3 to `StaffPick`, you could do so like this:

```typescript
enum AlbumStatus {
  NewRelease = 1,
  OnSale = 2,
  StaffPick = 3,
}
```

Now, `AlbumStatus.NewRelease` would be 1, `AlbumStatus.OnSale` would be 2, and so on.

#### Auto-incrementing Numeric Enums

If you choose to only assign _some_ numeric values to the enum, TypeScript will automatically increment the rest of the values from the last assigned value. For example, if you only assign a value to `NewRelease`, `OnSale` and `StaffPick` will be 2 and 3 respectively.

```typescript
enum AlbumStatus {
  NewRelease = 1,
  OnSale,
  StaffPick,
}
```

### String Enums

String enums allow you to assign string values to each member of the enum. For example:

```typescript
enum AlbumStatus {
  NewRelease = "NEW_RELEASE",
  OnSale = "ON_SALE",
  StaffPick = "STAFF_PICK",
}
```

The same `logStatus` function from above would now log the string value instead of the number.

```typescript
function logStatus(genre: AlbumStatus) {
  console.log(genre); // "NEW_RELEASE"
}

logStatus(AlbumStatus.NewRelease);
```

### Enums Are Strange

There is no equivalent syntax in JavaScript to the `enum` keyword. So, TypeScript gets to make up the rules for how enums work. This means they have some slightly odd behavior.

#### How Numeric Enums Transpile

The way enums are converted into JavaScript code can feel slightly unexpected.

For example, the enum `AlbumStatus`:

```typescript
enum AlbumStatus {
  NewRelease,
  OnSale,
  StaffPick,
}
```

Would be transpiled into the following JavaScript:

```javascript
var AlbumStatus;
(function (AlbumStatus) {
  AlbumStatus[(AlbumStatus["NewRelease"] = 0)] = "NewRelease";
  AlbumStatus[(AlbumStatus["OnSale"] = 1)] = "OnSale";
  AlbumStatus[(AlbumStatus["StaffPick"] = 2)] = "StaffPick";
})(AlbumStatus || (AlbumStatus = {}));
```

This rather opaque piece of JavaScript does several things in one go. It creates an object with properties for each enum value, and it also creates a reverse mapping of the values to the keys.

The result would then be similar to the following:

```javascript
var AlbumStatus = {
  0: "NewRelease",
  1: "OnSale",
  2: "StaffPick",
  NewRelease: 0,
  OnSale: 1,
  StaffPick: 2,
};
```

This reverse mapping means that there are more keys available on an enum than you might expect. So, performing an `Object.keys` call on an enum will return both the keys and the values.

```typescript
console.log(Object.keys(AlbumStatus)); // ["0", "1", "2", "NewRelease", "OnSale", "StaffPick"]
```

This can be a real gotcha if you're not expecting it.

#### How String Enums Transpile

String enums don't have the same behavior as numeric enums. When you specify string values, the transpiled JavaScript is much simpler:

```typescript
enum AlbumStatus {
  NewRelease = "NEW_RELEASE",
  OnSale = "ON_SALE",
  StaffPick = "STAFF_PICK",
}
```

```javascript
var AlbumStatus;
(function (AlbumStatus) {
  AlbumStatus["NewRelease"] = "NEW_RELEASE";
  AlbumStatus["OnSale"] = "ON_SALE";
  AlbumStatus["StaffPick"] = "STAFF_PICK";
})(AlbumStatus || (AlbumStatus = {}));
```

Now, there is no reverse mapping, and the object only contains the enum values. An `Object.keys` call will only return the keys, as you might expect.

```typescript
console.log(Object.keys(AlbumStatus)); // ["NewRelease", "OnSale", "StaffPick"]
```

This difference between numeric and string enums feels inconsistent, and it can be a source of confusion.

#### Numeric Enums Behave Like Union Types

Another odd feature of enums is that string enums and numeric enums behave differently when used as types.

Let's redefine our `logStatus` function with a numeric enum:

```typescript
enum AlbumStatus {
  NewRelease = 0,
  OnSale = 1,
  StaffPick = 2,
}

function logStatus(genre: AlbumStatus) {
  console.log(genre);
}
```

Now, we can call `logStatus` with a member of the enum:

```typescript
logStatus(AlbumStatus.NewRelease);
```

But we can also call it with a plain number:

```typescript
logStatus(0);
```

If we call it with a number that isn't a member of the enum, TypeScript will report an error:

```ts twoslash
// @errors: 2345
enum AlbumStatus {
  NewRelease = 0,
  OnSale = 1,
  StaffPick = 2,
}

function logStatus(genre: AlbumStatus) {
  console.log(genre);
}

// ---cut---
logStatus(3);
```

This is different from string enums, which only allow the enum members to be used as types:

```ts twoslash
// @errors: 2345
enum AlbumStatus {
  NewRelease = "NEW_RELEASE",
  OnSale = "ON_SALE",
  StaffPick = "STAFF_PICK",
}

function logStatus(genre: AlbumStatus) {
  console.log(genre);
}

logStatus(AlbumStatus.NewRelease);
logStatus("NEW_RELEASE");
```

The way string enums behave feels more natural - it matches how enums work in other languages like C# and Java.

But the fact that they're not consistent with numeric enums can be a source of confusion.

In fact, string enums are unique in TypeScript because they're compared _nominally_. All other types in TypeScript are compared _structurally_, meaning that two types are considered the same if they have the same structure. But string enums are compared based on their name (nominally), not their structure.

This means that two string enums with the same members are considered different types if they have different names:

```ts twoslash
// @errors: 2345
enum AlbumStatus {
  NewRelease = "NEW_RELEASE",
  OnSale = "ON_SALE",
  StaffPick = "STAFF_PICK",
}
function logStatus(genre: AlbumStatus) {
  console.log(genre);
}

// ---cut---
enum AlbumStatus2 {
  NewRelease = "NEW_RELEASE",
  OnSale = "ON_SALE",
  StaffPick = "STAFF_PICK",
}

logStatus(AlbumStatus2.NewRelease);
```

For those of us used to structural typing, this can be a bit of a surprise. But to developers used to enums in other languages, string enums will feel the most natural.

#### `const` Enums

A `const` enum is declared similarly to the other enums, but with the `const` keyword first:

```typescript
const enum AlbumStatus {
  NewRelease = "NEW_RELEASE",
  OnSale = "ON_SALE",
  StaffPick = "STAFF_PICK",
}
```

You can use `const` enums to declare numeric or string enums - they have the same behavior as regular enums.

The major difference is that `const` enums disappear when the TypeScript is transpiled to JavaScript. Instead of creating an object with the enum's values, the transpiled JavaScript will use the enum's values directly.

For instance, if an array is created that accesses the enum's values, the transpiled JavaScript will end up with those values:

```typescript
let albumStatuses = [
  AlbumStatus.NewRelease,
  AlbumStatus.OnSale,
  AlbumStatus.StaffPick,
];

// the above transpiles to:
let albumStatuses = ["NEW_RELEASE", "ON_SALE", "STAFF_PICK"];
```

`const` enums do have some limitations, especially when declared in declaration files (which we'll cover later). The TypeScript team actually recommends avoiding `const` enums in your library code because they can behave unpredictably for consumers of your library.

### Should You Use Enums?

Enums are a useful feature, but they have some quirks that can make them difficult to work with.

There are some alternatives to enums that you might want to consider, such as plain union types. But my preferred alternative uses some syntax we haven't covered yet.

We'll discuss whether you should use enums in general in the section on `as const`, in chapter 10.

## Namespaces

Namespaces were an early feature of TypeScript that tried to solve a big problem in JavaScript at the time - the lack of a module system. They were introduced before ES6 modules were standardized, and they were TypeScript's attempt to organize your code.

Namespaces let you specify closures where you can export functions and types. This allows you to use names that wouldn't conflict with other things declared in the global scope.

Consider a scenario where we are building a TypeScript application to manage a music collection. There could be functions to add an album, calculate sales, and generate reports. Using namespaces, we can group these functions logically:

```typescript
namespace RecordStoreUtils {
  export namespace Album {
    export interface Album {
      title: string;
      artist: string;
      year: number;
    }
  }

  export function addAlbum(title: string, artist: string, year: number) {
    // Implementation to add an album to the collection
  }

  export namespace Sales {
    export function recordSale(
      albumTitle: string,
      quantity: number,
      price: number,
    ) {
      // Implementation to record an album sale
    }

    export function calculateTotalSales(albumTitle: string): number {
      // Implementation to calculate total sales for an album
      return 0; // Placeholder return
    }
  }
}
```

In this example, `AlbumCollection` is the main namespace, with `Sales` as a nested namespace. This structure helps in organizing the code by functionality and makes it clear which part of the application each function pertains to.

The stuff inside of the `AlbumCollection` can be used as values or types:

```typescript
const odelay: AlbumCollection.Album.Album = {
  title: "Odelay!",
  artist: "Beck",
  year: 1996,
};

AlbumCollection.Sales.recordSale("Odelay!", 1, 10.99);
```

### How Namespaces Compile

Namespaces compile into relatively simple JavaScript. For instance, a simpler version of the `RecordStoreUtils` namespace...

```typescript
namespace RecordStoreUtils {
  export function addAlbum(title: string, artist: string, year: number) {
    // Implementation to add an album to the collection
  }
}
```

...would be transpiled into the following JavaScript:

```javascript
var RecordStoreUtils;
(function (RecordStoreUtils) {
  function addAlbum(title, artist, year) {
    // Implementation to add an album to the collection
  }
  RecordStoreUtils.addAlbum = addAlbum;
})(RecordStoreUtils || (RecordStoreUtils = {}));
```

Similarly to an enum, this code creates an object with properties for each function and type in the namespace. This means that the namespace can be accessed as an object, and its properties can be accessed as methods or properties.

### Merging Namespaces

Just like interfaces, namespaces can be merged through declaration merging. This allows you to combine two or more separate declarations into a single definition.

Here we have two declarations of `RecordStoreUtils`– one with an `Album` namespace and another with a `Sales` namespace:

```typescript
namespace RecordStoreUtils {
  export namespace Album {
    export interface Album {
      title: string;
      artist: string;
      year: number;
    }
  }
}

namespace RecordStoreUtils {
  export namespace Sales {
    export function recordSale(
      albumTitle: string,
      quantity: number,
      price: number,
    ) {
      // Implementation to record an album sale
    }

    export function calculateTotalSales(albumTitle: string): number {
      // Implementation to calculate total sales for an album
      return 0; // Placeholder return
    }
  }
}
```

Because namespaces support declaration merging, the two declarations are automatically combined into a single `RecordStoreUtils` namespace. Both the `Album` and `Sales` namespaces can be accessed as before:

```typescript
const loaded: RecordStoreUtils.Album.Album = {
  title: "Loaded",
  artist: "The Velvet Underground",
  year: 1970,
};

RecordStoreUtils.Sales.calculateTotalSales("Loaded");
```

#### Merging Interfaces within Namespaces

It's also possible for interfaces within namespaces to be merged. If we had two different `RecordStoreUtils` each with their own `Album` interface, TypeScript would automatically merge them into a single `Album` interface that includes all the properties:

```typescript
namespace RecordStoreUtils {
  export interface Album {
    title: string;
    artist: string;
    year: number;
  }
}

namespace RecordStoreUtils {
  export interface Album {
    genre: string[];
    recordLabel: string;
  }
}

const madvillainy: RecordStoreUtils.Album = {
  title: "Madvillainy",
  artist: "Madvillain",
  year: 2004,
  genre: ["Hip Hop", "Experimental"],
  recordLabel: "Stones Throw",
};
```

This information will become crucial later when we look at the namespace's key use case: globally scoped types.

### Should You Use Namespaces?

Imagine ES modules, with `import` and `export`, never existed. In this world, everything you declare is in the global scope. You'd have to be careful about naming things, and you'd have to come up with a way to organize your code.

This is the world that TypeScript was born into. Module systems like CommonJS (`require`) and ES Modules (`import`, `export`) weren't popular yet. So, namespaces were a crucial way to avoid naming conflicts and organize your code.

But now that ES modules are widely supported, you should use them over namespaces. Namespaces have very little relevance in modern TypeScript code, with some exceptions which we'll explore in our chapter on global scopes.

## When to Prefer ES vs. TS

In this chapter we've looked at several TypeScript-only features. These features have two things in common. First, they don't exist in JavaScript. Second, they are _old_.

In 2010, when TypeScript was being built, JavaScript was seen as a problematic language that needed fixing. Enums, namespaces and class parameter properties were added in an atmosphere where new runtime additions to JavaScript were seen as a good thing.

But now, JavaScript itself is in a much healthier place. The TC39 committee, the body that decides what features get added to JavaScript, is more active and efficient. New features are being added to the language every year, and the language is evolving rapidly.

The TypeScript team themselves now see their role very differently. Instead of adding new features to TypeScript, they cleave to JavaScript as closely as possible. Daniel Rosenwasser, the program manager for TypeScript, is co-chair of the TC39 committee.

The right way to think about TypeScript today is as "JavaScript with types".

Given this attitude, it's clear how we should treat these TypeScript-only features: as relics of the past. If enums, namespaces and class parameter properties were proposed today, they would not even be considered.

But the question remains: should you use them? TypeScript will likely never stop supporting these features. To do so would break too much existing code. So, they're safe to continue using.

But I prefer writing code in the spirit of the language I'm using. Writing "JavaScript with types" keeps the relationship between TypeScript and JavaScript crystal-clear.

However, this is my personal preference. If you're working on a large codebase that already uses these features, it is _not_ worth the effort to remove them. Reaching a decision as a team and staying consistent are the keys.


--- CHAPTER ---

One of the most common pieces of advice for writing maintainable code is to "Keep code DRY", or more explicitly, "Don't Repeat Yourself".

One way to do this in JavaScript is to take repeating code and capture it in functions or variables. These variables and functions can be reused, composed and combined in different ways to create new functionality.

In TypeScript, we can apply this same principle to types.

In this section, we're going to look at deriving types from other types. This lets us reduce repetition in our code, and create a single source of truth for our types.

This allows us to make changes in one type, and have those changes propagate throughout our application without needing to manually update every instance.

We'll even look at how we can derive types from _values_, so that our types always represent the runtime behavior of our application.

## Derived Types

A derived type is a type which relies on, or inherits from, a structure of another type. We can create derived types using some of the tools we've used so far.

We could use `interface extends` to make one interface inherit from another:

```typescript
interface Album {
  title: string;
  artist: string;
  releaseYear: number;
}

interface AlbumDetails extends Album {
  genre: string;
}
```

`AlbumDetails` inherits all of the properties of `Album`. This means that any changes to `Album` will trickle down to `AlbumDetails`. `AlbumDetails` is derived from `Album`.

Another example is a union type.

```typescript
type Triangle = {
  type: "triangle";
  sideLength: number;
};

type Rectangle = {
  type: "rectangle";
  width: number;
  height: number;
};

type Shape = Triangle | Rectangle;
```

A derived type represents a relationship. That relationship is one-way. `Shape` can't go back and modify `Triangle` or `Rectangle`. But any changes to `Triangle` and `Rectangle` will ripple through to `Shape`.

When well-designed, derived types can create huge gains in productivity. We can make changes in one place and have them propagate throughout our application. This is a powerful way to keep our code DRY and to leverage TypeScript's type system to its fullest.

This has tradeoffs. We can think of deriving as a kind of coupling. If we change a type that other types depend on, we need to be aware of the impact of that change. We'll discuss deriving vs decoupling in more detail at the end of the chapter.

But for now, let's look at some of the tools TypeScript provides for deriving types.

## The `keyof` Operator

The `keyof` operator allows you to extract the keys from an object type into a union type.

Starting with our familiar `Album` type:

```typescript
interface Album {
  title: string;
  artist: string;
  releaseYear: number;
}
```

We can use `keyof Album` and end up with a union of the `"title"`, `"artist"`, and `"releaseYear"` keys:

```typescript
type AlbumKeys = keyof Album; // "title" | "artist" | "releaseYear"
```

Since `keyof` tracks the keys from a source, any changes made to the type will automatically be reflected in the `AlbumKeys` type.

```typescript
interface Album {
  title: string;
  artist: string;
  releaseYear: number;
  genre: string; // added 'genre'
}

type AlbumKeys = keyof Album; // "title" | "artist" | "releaseYear" | "genre"
```

The `AlbumKeys` type can then be used to help ensure a key being used to access a value in an `Album` is valid as seen in this function:

```typescript
function getAlbumDetails(album: Album, key: AlbumKeys) {
  return album[key];
}
```

If the key passed to `getAlbumDetails` is not a valid key of `Album`, TypeScript will show an error:

```ts twoslash
// @errors: 2345
function getAlbumDetails(album: Album, key: AlbumKeys) {
  return album[key];
}

interface Album {
  title: string;
  artist: string;
  releaseYear: number;
  genre: string; // added 'genre'
}

type AlbumKeys = keyof Album; // "title" | "artist" | "releaseYear" | "genre"

const album: Album = {
  title: "Kind of Blue",
  artist: "Miles Davis",
  releaseYear: 1959,
  genre: "Jazz",
};

// ---cut---
getAlbumDetails(album, "producer");
```

`keyof` is an important building block when creating new types from existing types. We'll see later how we can use it with `as const` to build our own type-safe enums.

## The `typeof` Operator

The `typeof` operator allows you to extract a type from a value.

Say we have an `albumSales` object containing a few album title keys and some sales statistics:

```typescript
const albumSales = {
  "Kind of Blue": 5000000,
  "A Love Supreme": 1000000,
  "Mingus Ah Um": 3000000,
};
```

We can use `typeof` to extract the type of `albumSales`, which will turn it into a type with the original keys as strings and their inferred types as values:

```ts twoslash
const albumSales = {
  "Kind of Blue": 5000000,
  "A Love Supreme": 1000000,
  "Mingus Ah Um": 3000000,
};

// ---cut---
type AlbumSalesType = typeof albumSales;
//   ^?
```

Now that we have the `AlbumSalesType` type, we can create _another_ derived type from it. For example, we can use `keyof` to extract the keys from the `albumSales` object:

```typescript
type AlbumTitles = keyof AlbumSalesType; // "Kind of Blue" | "A Love Supreme" | "Mingus Ah Um"
```

A common pattern is to combine `keyof` and `typeof` to create a new type from an existing object type's keys and values:

```typescript
type AlbumTitles = keyof typeof albumSales;
```

We could use this in a function to ensure that the `title` parameter is a valid key of `albumSales`, perhaps to look up the sales for a specific album:

```typescript
function getSales(title: AlbumTitles) {
  return albumSales[title];
}
```

It's worth noting that `typeof` is not the same as the `typeof` operator used at runtime. TypeScript can tell the difference based on whether it's used in a type context or a value context:

```ts twoslash
const albumSales = {
  "Kind of Blue": 5000000,
  "A Love Supreme": 1000000,
  "Mingus Ah Um": 3000000,
};

// ---cut---
// Runtime typeof
const albumSalesType = typeof albumSales; // "object"

// Type typeof
type AlbumSalesType = typeof albumSales;
//   ^?
```

Use the `typeof` keyword whenever you need to extract types based on runtime values, including objects, functions, classes, and more. It's a powerful tool for deriving types from values, and it's a key building block for other patterns that we'll explore later.

### You Can't Create Runtime Types from Values

We've seen that `typeof` can create types from runtime values, but it's important to note that there is no way to create a value from a type.

In other words, there is no `valueof` operator:

```ts
type Album = {
  title: string;
  artist: string;
  releaseYear: number;
};

const album = valueof Album; // Does not work!
```

TypeScript's types disappear at runtime, so there's no built-in way to create a value from a type. In other words, you can move from the 'value world' to the 'type world', but not the other way around.

## Indexed Access Types

Indexed access types in TypeScript allow you to access a property of another type. This is similar to how you would access the value of a property in an object at runtime, but instead operates at the type level.

For example, we could use an indexed access type to extract the type of the `title` property from `AlbumDetails`:

```typescript
interface Album {
  title: string;
  artist: string;
  releaseYear: number;
}
```

If we try to use dot notation to access the `title` property from the `Album` type, TypeScript will throw an error:

```ts twoslash
// @errors: 2713
interface Album {
  title: string;
  artist: string;
  releaseYear: number;
}

// ---cut---
type AlbumTitle = Album.title;
```

In this case, the error message has a helpful suggestion: use `Album["title"]` to access the type of the `title` property in the `Album` type:

```ts twoslash
interface Album {
  title: string;
  artist: string;
  releaseYear: number;
}

// ---cut---
type AlbumTitle = Album["title"];
//   ^?
```

Using this indexed access syntax, the `AlbumTitle` type is equivalent to `string`, because that's the type of the `title` property in the `Album` interface.

This same approach can be used to extract types from a tuple, where the index is used to access the type of a specific element in the tuple:

```typescript
type AlbumTuple = [string, string, number];
type AlbumTitle = AlbumTuple[0];
```

Once again, the `AlbumTitle` will be a `string` type, because that's the type of the first element in the `AlbumTuple`.

### Chaining Multiple Indexed Access Types

Indexed access types can be chained together to access nested properties. This is useful when working with complex types that have nested structures.

For example, we could use indexed access types to extract the type of the `name` property from the `artist` property in the `Album` type:

```typescript
interface Album {
  title: string;
  artist: {
    name: string;
  };
}

type ArtistName = Album["artist"]["name"];
```

In this case, the `ArtistName` type will be equivalent to `string`, because that's the type of the `name` property in the `artist` object.

### Passing a Union to an Indexed Access Type

If you want to access multiple properties from a type, you might be tempted to create a union type containing multiple indexed accesses:

```typescript
type Album = {
  title: string;
  isSingle: boolean;
  releaseYear: number;
};

type AlbumPropertyTypes =
  | Album["title"]
  | Album["isSingle"]
  | Album["releaseYear"];
```

This will work, but you can do one better - you can pass a union type to an indexed access type directly:

```ts twoslash
type Album = {
  title: string;
  isSingle: boolean;
  releaseYear: number;
};
// ---cut---
type AlbumPropertyTypes = Album["title" | "isSingle" | "releaseYear"];
//   ^?
```

This is a more concise way to achieve the same result.

#### Get An Object's Values With `keyof`

In fact, you may have noticed that we have another opportunity to reduce repetition here. We can use `keyof` to extract the keys from the `Album` type and use them as the union type:

```ts twoslash
type Album = {
  title: string;
  isSingle: boolean;
  releaseYear: number;
};
// ---cut---
type AlbumPropertyTypes = Album[keyof Album];
//   ^?
```

This is a great pattern to use when you want to extract all of the values from an object type. `keyof Obj` will give you a union of all the _keys_ in `Obj`, and `Obj[keyof Obj]` will give you a union of all the _values_ in `Obj`.

## Using `as const` For JavaScript-Style Enums

In our chapter on TypeScript-only features, we looked at the `enum` keyword. We saw that `enum` is a powerful way to create a set of named constants, but it has some downsides.

We now have all the tools available to us to see an alternative approach to creating enum-like structures in TypeScript.

First, let's use the `as const` assertion we saw in the chapter on mutability. This forces an object to be treated as read-only, and infers literal types for its properties:

```typescript
const albumTypes = {
  CD: "cd",
  VINYL: "vinyl",
  DIGITAL: "digital",
} as const;
```

We can now _derive_ the types we need from `albumTypes` using `keyof` and `typeof`. For instance, we can grab the keys using `keyof`:

```typescript
type UppercaseAlbumType = keyof typeof albumTypes; // "CD" | "VINYL" | "DIGITAL"
```

We can also grab the values using `Obj[keyof Obj]`:

```typescript
type AlbumType = (typeof albumTypes)[keyof typeof albumTypes]; // "cd" | "vinyl" | "digital"
```

We can now use our `AlbumType` type to ensure that a function only accepts one of the values from `albumTypes`:

```typescript
function getAlbumType(type: AlbumType) {
  // ...
}
```

This approach is sometimes called a "POJO", or "Plain Old JavaScript Object". While it takes a bit of TypeScript magic to get the types set up, the result is simple to understand and easy to work with.

Let's now compare this to the `enum` approach.

### Enums Require You To Pass The Enum Value

Our `getAlbumType` function behaves differently than if it accepted an `enum`. Because `AlbumType` is just a union of strings, we can pass a raw string to `getAlbumType`. But if we pass the incorrect string, TypeScript will show an error:

```ts twoslash
// @errors: 2345
function getAlbumType(type: AlbumType) {
  // ...
}

const albumTypes = {
  CD: "cd",
  VINYL: "vinyl",
  DIGITAL: "digital",
} as const;

type AlbumType = (typeof albumTypes)[keyof typeof albumTypes]; // "cd" | "vinyl" | "digital"

// ---cut---
getAlbumType(albumTypes.CD); // no error
getAlbumType("vinyl"); // no error
getAlbumType("cassette");
```

This is a tradeoff. With `enum`, you have to pass the enum value, which is more explicit. With our `as const` approach, you can pass a raw string. This can make refactoring a little harder.

### Enums Have To Be Imported

Another downside of `enum` is that they have to be imported into the module you're in to use them:

```typescript
import { AlbumType } from "./enums";

getAlbumType(AlbumType.CD);
```

With our `as const` approach, we don't need to import anything. We can pass the raw string:

```typescript
getAlbumType("cd");
```

Fans of enums will argue that importing the enum is a good thing, because it makes it clear where the enum is coming from and makes refactoring easier.

### Enums Are Nominal

One of the biggest differences between `enum` and our `as const` approach is that `enum` is _nominal_, while our `as const` approach is _structural_.

This means that with `enum`, the type is based on the name of the enum. This means that enums with the same values that come from different enums are not compatible:

```ts twoslash
// @errors: 2345
function getAlbumType(type: AlbumType) {
  // ...
}

// ---cut---
enum AlbumType {
  CD = "cd",
  VINYL = "vinyl",
  DIGITAL = "digital",
}

enum MediaType {
  CD = "cd",
  VINYL = "vinyl",
  DIGITAL = "digital",
}

getAlbumType(AlbumType.CD);
getAlbumType(MediaType.CD);
```

If you're used to enums from other languages, this is probably what you expect. But for developers used to JavaScript, this can be surprising.

With a POJO, where the value comes from doesn't matter. If two POJOs have the same values, they are compatible:

```typescript
const albumTypes = {
  CD: "cd",
  VINYL: "vinyl",
  DIGITAL: "digital",
} as const;

const mediaTypes = {
  CD: "cd",
  VINYL: "vinyl",
  DIGITAL: "digital",
} as const;

getAlbumType(albumTypes.CD); // no error
getAlbumType(mediaTypes.CD); // no error
```

This is a tradeoff. Nominal typing can be more explicit and help catch bugs, but it can also be more restrictive and harder to work with.

### Which Approach Should You Use?

The `enum` approach is more explicit and can help you refactor your code. It's also more familiar to developers coming from other languages.

The `as const` approach is more flexible and easier to work with. It's also more familiar to JavaScript developers.

In general, if you're working with a team that's used to `enum`, you should use `enum`. But if I were starting a project today, I would use `as const` instead of enums.

## Exercises

### Exercise 1: Reduce Key Repetition

Here we have an interface named `FormValues`:

```typescript
interface FormValues {
  name: string;
  email: string;
  password: string;
}
```

This `inputs` variable is typed as a Record that specifies a key of either `name`, `email`, or `password` and a value that is an object with an `initialValue` and `label` properties that are both strings:

```typescript
const inputs: Record<
  "name" | "email" | "password", // change me!
  {
    initialValue: string;
    label: string;
  }
> = {
  name: {
    initialValue: "",
    label: "Name",
  },
  email: {
    initialValue: "",
    label: "Email",
  },
  password: {
    initialValue: "",
    label: "Password",
  },
};
```

Notice there is a lot of duplication here. Both the `FormValues` interface and `inputs` Record contain `name`, `email`, and `password`.

Your task is to modify the `inputs` Record so its keys are derived from the `FormValues` interface.

<Exercise title="Exercise 1: Reduce Key Repetition" filePath="/src/040-deriving-types-from-values/125-keyof.problem.ts" resourceId="YgFRxBViy44CfW0H6uOLyz"></Exercise>

### Exercise 2: Derive a Type from a Value

Here, we have an object named `configurations` that comprises a set of deployment environments for `development`, `production`, and `staging`.

Each environment has its own url and timeout settings:

```typescript
const configurations = {
  development: {
    apiBaseUrl: "http://localhost:8080",
    timeout: 5000,
  },
  production: {
    apiBaseUrl: "https://api.example.com",
    timeout: 10000,
  },
  staging: {
    apiBaseUrl: "https://staging.example.com",
    timeout: 8000,
  },
};
```

An `Environment` type has been declared as follows:

```typescript
type Environment = "development" | "production" | "staging";
```

We want to use the `Environment` type across our application. However, the `configurations` object should be used as the source of truth.

Your task is to update the `Environment` type so that it is derived from the `configurations` object.

<Exercise title="Exercise 2: Derive a Type from a Value" filePath="/src/040-deriving-types-from-values/126-typeof-keyword.problem.ts" resourceId="YgFRxBViy44CfW0H6uOMPr"></Exercise>

### Exercise 3: Accessing Specific Values

Here we have an `programModeEnumMap` object that keeps different groupings in sync. There is also a `ProgramModeMap` type that uses `typeof` to represent the entire enum mapping:

```typescript
export const programModeEnumMap = {
  GROUP: "group",
  ANNOUNCEMENT: "announcement",
  ONE_ON_ONE: "1on1",
  SELF_DIRECTED: "selfDirected",
  PLANNED_ONE_ON_ONE: "planned1on1",
  PLANNED_SELF_DIRECTED: "plannedSelfDirected",
} as const;

type ProgramModeMap = typeof programModeEnumMap;
```

The goal is to have a `Group` type that is always in sync with the `ProgramModeEnumMap`'s `group` value. Currently it is typed as `unknown`:

```ts twoslash
// @errors: 2344
import { Equal, Expect } from "@total-typescript/helpers";
// ---cut---
type Group = unknown;

type test = Expect<Equal<Group, "group">>;
```

Your task is to find the proper way to type `Group` so the test passes as expected.

<Exercise title="Exercise 3: Accessing Specific Values" filePath="/src/040-deriving-types-from-values/135-indexed-access-types.problem.ts" resourceId="5EnWog8KD1gKEzaFObJmOY"></Exercise>

### Exercise 4: Unions with Indexed Access Types

This exercise starts with the same `programModeEnumMap` and `ProgramModeMap` as the previous exercise:

```ts twoslash
// @errors: 2344
import { Equal, Expect } from "@total-typescript/helpers";
// ---cut---
export const programModeEnumMap = {
  GROUP: "group",
  ANNOUNCEMENT: "announcement",
  ONE_ON_ONE: "1on1",
  SELF_DIRECTED: "selfDirected",
  PLANNED_ONE_ON_ONE: "planned1on1",
  PLANNED_SELF_DIRECTED: "plannedSelfDirected",
} as const;

type ProgramModeMap = typeof programModeEnumMap;

type PlannedPrograms = unknown;

type test = Expect<
  Equal<PlannedPrograms, "planned1on1" | "plannedSelfDirected">
>;
```

This time, your challenge is to update the `PlannedPrograms` type to use an indexed access type to extract a union of the `ProgramModeMap` values that included "`planned`".

<Exercise title="Exercise 4: Unions with Indexed Access Types" filePath="/src/040-deriving-types-from-values/136-pass-unions-to-indexed-access-types.problem.ts" resourceId="5EnWog8KD1gKEzaFObJmhp"></Exercise>

### Exercise 5: Extract a Union of All Values

We're back with the `programModeEnumMap` and `ProgramModeMap` type:

```typescript
export const programModeEnumMap = {
  GROUP: "group",
  ANNOUNCEMENT: "announcement",
  ONE_ON_ONE: "1on1",
  SELF_DIRECTED: "selfDirected",
  PLANNED_ONE_ON_ONE: "planned1on1",
  PLANNED_SELF_DIRECTED: "plannedSelfDirected",
} as const;

type ProgramModeMap = typeof programModeEnumMap;
```

This time we're interested in extracting all of the values from the `programModeEnumMap` object:

```typescript
import { Equal, Expect } from "@total-typescript/helpers";
// ---cut---
type AllPrograms = unknown;

type test = Expect<
  Equal<
    AllPrograms,
    | "group"
    | "announcement"
    | "1on1"
    | "selfDirected"
    | "planned1on1"
    | "plannedSelfDirected"
  >
>;
```

Using what you've learned so far, your task is to update the `AllPrograms` type to use an indexed access type to create a union of all the values from the `programModeEnumMap` object.

<Exercise title="Exercise 5: Extract a Union of All Values" filePath="/src/040-deriving-types-from-values/137-pass-keyof-into-an-indexed-access-type.problem.ts" resourceId="VtQChjOYAJCkX9MVx78MCb"></Exercise>

### Exercise 6: Create a Union from an `as const` Array

Here's an array of `programModes` wrapped in an `as const`:

```typescript
export const programModes = [
  "group",
  "announcement",
  "1on1",
  "selfDirected",
  "planned1on1",
  "plannedSelfDirected",
] as const;
```

A test has been written to check if an `AllPrograms` type is a union of all the values in the `programModes` array:

```typescript
import { Equal, Expect } from "@total-typescript/helpers";
type AllPrograms = unknown;
// ---cut---

type test = Expect<
  Equal<
    AllPrograms,
    | "group"
    | "announcement"
    | "1on1"
    | "selfDirected"
    | "planned1on1"
    | "plannedSelfDirected"
  >
>;
```

Your task is to determine how to create the `AllPrograms` type in order for the test to pass as expected.

Note that just using `keyof` and `typeof` in an approach similar to the previous exercise's solution won't quite work to solve this one! This is tricky to find - but as a hint: you can pass primitive types to indexed access types.

<Exercise title="Exercise 6: Create a Union from an `as const` Array" filePath="/src/040-deriving-types-from-values/138-create-a-union-from-an-as-const-array.problem.ts" resourceId="AhnoaCs5v1qlRT7GjJoi5Y"></Exercise>

### Solution 1: Reduce Key Repetition

The solution is to use `keyof` to extract the keys from the `FormValues` interface and use them as the keys for the `inputs` Record:

```typescript
const inputs: Record<
  keyof FormValues, // "name" | "email" | "password"
  {
    initialValue: string;
    label: string;
  } = {
    // object as before
  };
```

Now, if the `FormValues` interface changes, the `inputs` Record will automatically be updated to reflect those changes. `inputs` is derived from `FormValues`.

### Solution 2: Derive a Type from a Value

The solution is to use the `typeof` keyword in combination with `keyof` to create the `Environment` type.

You could use them together in a single line:

```typescript
type Environment = keyof typeof configurations;
```

Or you could first create a type from the `configurations` object and then update `Environment` to use `keyof` to extract the names of the keys:

```ts twoslash
const configurations = {
  development: {
    apiBaseUrl: "http://localhost:8080",
    timeout: 5000,
  },
  production: {
    apiBaseUrl: "https://api.example.com",
    timeout: 10000,
  },
  staging: {
    apiBaseUrl: "https://staging.example.com",
    timeout: 8000,
  },
};
// ---cut---
type Configurations = typeof configurations;
//   ^?

type Environment = keyof Configurations;
//   ^?
```

### Solution 3: Accessing Specific Values

Using an indexed access type, we can access the `GROUP` property from the `ProgramModeMap` type:

```ts twoslash
export const programModeEnumMap = {
  GROUP: "group",
  ANNOUNCEMENT: "announcement",
  ONE_ON_ONE: "1on1",
  SELF_DIRECTED: "selfDirected",
  PLANNED_ONE_ON_ONE: "planned1on1",
  PLANNED_SELF_DIRECTED: "plannedSelfDirected",
} as const;

type ProgramModeMap = typeof programModeEnumMap;

// ---cut---
type Group = ProgramModeMap["GROUP"];
//   ^?
```

With this change, the `Group` type will be in sync with the `ProgramModeEnumMap`'s `group` value. This means our test will pass as expected.

### Solution 4: Unions with Indexed Access Types

In order to create the `PlannedPrograms` type, we can use an indexed access type to extract a union of the `ProgramModeMap` values that include "`planned`":

```typescript
type Key = "PLANNED_ONE_ON_ONE" | "PLANNED_SELF_DIRECTED";
type PlannedPrograms = ProgramModeMap[Key];
```

With this change, the `PlannedPrograms` type will be a union of `planned1on1` and `plannedSelfDirected`, which means our test will pass as expected.

### Solution 5: Extract a Union of All Values

Using `keyof` and `typeof` together is the solution to this problem.

The most condensed solution looks like this:

```typescript
type AllPrograms = (typeof programModeEnumMap)[keyof typeof programModeEnumMap];
```

Using an intermediate type, you could first use `typeof programModeEnumMap` to create a type from the `programModeEnumMap` object, then use `keyof` to extract the keys:

```ts twoslash
export const programModeEnumMap = {
  GROUP: "group",
  ANNOUNCEMENT: "announcement",
  ONE_ON_ONE: "1on1",
  SELF_DIRECTED: "selfDirected",
  PLANNED_ONE_ON_ONE: "planned1on1",
  PLANNED_SELF_DIRECTED: "plannedSelfDirected",
} as const;

// ---cut---
type ProgramModeMap = typeof programModeEnumMap;
type AllPrograms = ProgramModeMap[keyof ProgramModeMap];
//   ^?
```

Either solution results in a union of all values from the `programModeEnumMap` object, which means our test will pass as expected.

### Solution 6: Create a Union from an `as const` Array

When using `typeof` and `keyof` with indexed access type, we can extract all of the values, but we also get some unexpected values like a `6` and an `IterableIterator` function:

```ts twoslash
export const programModes = [
  "group",
  "announcement",
  "1on1",
  "selfDirected",
  "planned1on1",
  "plannedSelfDirected",
] as const;

// ---cut---
type AllPrograms = (typeof programModes)[keyof typeof programModes];
//   ^?
```

The additional stuff being extracted causes the test to fail because it is only expecting the original values instead of numbers and functions.

Recall that we can access the first element using `programModes[0]`, the second element using `programModes[1]`, and so on. This means that we could use a union of all possible index values to extract the values from the `programModes` array:

```typescript
type AllPrograms = (typeof programModes)[0 | 1 | 2 | 3 | 4 | 5];
```

This solution makes the test pass, but it doesn't scale well. If the `programModes` array were to change, we would need to update the `AllPrograms` type manually.

Instead, we can use the `number` type as the argument to the indexed access type to represent all possible index values:

```typescript
type AllPrograms = (typeof programModes)[number];
```

Now new items can be added to the `programModes` array without needing to update the `AllPrograms` type manually. This solution makes the test pass as expected, and is a great pattern to apply in your own projects.

## Deriving Types From Functions

So far, we've only looked at deriving types from objects and arrays. But deriving types from functions can help solve some common problems in TypeScript.

### `Parameters`

The `Parameters` utility type extracts the parameters from a given function type and returns them as a tuple.

For example, this `sellAlbum` function takes in an `Album`, a `price`, and a `quantity`, then returns a number representing the total price:

```typescript
function sellAlbum(album: Album, price: number, quantity: number) {
  return price * quantity;
}
```

Using the `Parameters` utility type, we can extract the parameters from the `sellAlbum` function and assign them to a new type:

```ts twoslash
type Album = {
  title: string;
  artist: string;
  releaseYear: number;
};

function sellAlbum(album: Album, price: number, quantity: number) {
  return price * quantity;
}
// ---cut---
type SellAlbumParams = Parameters<typeof sellAlbum>;
//   ^?
```

Note that we need to use `typeof` to create a type from the `sellAlbum` function. Passing `sellAlbum` directly to `Parameters` won't work on its own because `sellAlbum` is a value instead of a type:

```ts twoslash
// @errors: 2749
type Album = {
  title: string;
  artist: string;
  releaseYear: number;
};
function sellAlbum(album: Album, price: number, quantity: number) {
  return price * quantity;
}
// ---cut---
type SellAlbumParams = Parameters<sellAlbum>;
```

This `SellAlbumParams` type is a tuple type that holds the `Album`, `price`, and `quantity` parameters from the `sellAlbum` function.

If we need to access a specific parameter from the `SellAlbumParams` type, we can use indexed access types:

```typescript
type Price = SellAlbumParams[1]; // number
```

### `ReturnType`

The `ReturnType` utility type extracts the return type from a given function:

```ts twoslash
type Album = {
  title: string;
  artist: string;
  releaseYear: number;
};
function sellAlbum(album: Album, price: number, quantity: number) {
  return price * quantity;
}
// ---cut---
type SellAlbumReturn = ReturnType<typeof sellAlbum>;
//   ^?
```

In this case, the `SellAlbumReturn` type is a number, which derived from the `sellAlbum` function.

### `Awaited`

Earlier in the book, we used the `Promise` type when working with asynchronous code.

The `Awaited` utility type is used to unwrap the `Promise` type and provide the type of the resolved value. Think of it as a shortcut similar to using `await` or `.then()` methods.

This can be particularly useful for deriving the return types of `async` functions.

To use it, you would pass a `Promise` type to `Awaited` and it would return the type of the resolved value:

```typescript
type AlbumPromise = Promise<Album>;

type AlbumResolved = Awaited<AlbumPromise>;
```

### Why Derive Types From Functions?

Being able to derive types from functions might not seem very useful at first. After all, if we control the functions then we can just write the types ourselves, and reuse them as needed:

```typescript
type Album = {
  title: string;
  artist: string;
  releaseYear: number;
};

const sellAlbum = (album: Album, price: number, quantity: number) => {
  return price * quantity;
};
```

There's no reason to use `Parameters` or `ReturnType` on `sellAlbum`, since we defined the `Album` type and the return type ourselves.

But what about functions you don't control?

A common example is a third-party library. A library might export a function that you can use, but might not export the accompanying types. An example I recently came across was a type from the library `@monaco-editor/react`.

```tsx
import { Editor } from "@monaco-editor/react";

// This is JSX component, for our purposes equivalent to...
<Editor
  onMount={(editor) => {
    // ...
  }}
/>;

// ...calling the function directly with an object
Editor({
  onMount: (editor) => {
    // ...
  },
});
```

In this case, I wanted to know the type of `editor` so I could reuse it in a function elsewhere. But the `@monaco-editor/react` library didn't export its type.

First, I extracted the type of the object the component expected:

```typescript
type EditorProps = Parameters<typeof Editor>[0];
```

Then, I used an indexed access type to extract the type of the `onMount` property:

```typescript
type OnMount = EditorProps["onMount"];
```

Finally, I extracted the first parameter from the `OnMount` type to get the type of `editor`:

```typescript
type Editor = Parameters<OnMount>[0];
```

This allowed me to reuse the `Editor` type in a function elsewhere in my code.

By combining indexed access types with TypeScript's utility types, you can work around the limitations of third-party libraries and ensure that your types stay in sync with the functions you're using.

## Exercises

### Exercise 7: A Single Source of Truth

Here we have a `makeQuery` function that takes two parameters: a `url` and an optional `opts` object.

```typescript
const makeQuery = (
  url: string,
  opts?: {
    method?: string;
    headers?: {
      [key: string]: string;
    };
    body?: string;
  },
) => {};
```

We want to specify these parameters as a tuple called `MakeQueryParameters` where the first argument of the tuple would be the string, and the second member would be the optional `opts` object.

Manually specifying the `MakeQueryParameters` would look something like this:

```typescript
type MakeQueryParameters = [
  string,
  {
    method?: string;
    headers?: {
      [key: string]: string;
    };
    body?: string;
  }?,
];
```

In addition to being a bit annoying to write and read, the other problem with the above is that we now have two sources of truth: one is the `MakeQueryParameters` type, and the other is in the `makeQuery` function.

Your task is to use a utility type to fix this problem.

<Exercise title="Exercise 7: A Single Source of Truth" filePath="/src/040-deriving-types-from-values/132-parameters-type-helper.problem.ts" resourceId="YgFRxBViy44CfW0H6uOO1f"></Exercise>

### Exercise 8: Typing Based on Return Value

Say we're working with a `createUser` function from a third-party library:

```typescript
const createUser = (id: string) => {
  return {
    id,
    name: "John Doe",
    email: "example@email.com",
  };
};
```

For the sake of this exercise, assume we don't know the implementation of the function.

The goal is to create a `User` type that represents the return type of the `createUser` function. A test has been written to check if the `User` type is a match:

```ts twoslash
// @errors: 2344
import { Equal, Expect } from "@total-typescript/helpers";
// ---cut---
type User = unknown;

type test = Expect<
  Equal<
    User,
    {
      id: string;
      name: string;
      email: string;
    }
  >
>;
```

Your task is to update the `User` type so the test passes as expected.

<Exercise title="Exercise 8: Typing Based on Return Value" filePath="/src/040-deriving-types-from-values/133-return-type.problem.ts" resourceId="YgFRxBViy44CfW0H6uOPRx"></Exercise>

### Exercise 9: Unwrapping a Promise

This time the `createUser` function from the third-party library is asynchronous:

```ts twoslash
// @errors: 2344 2304
import { Equal, Expect } from "@total-typescript/helpers";
// ---cut---
const fetchUser = async (id: string) => {
  return {
    id,
    name: "John Doe",
    email: "example@email.com",
  };
};

type test = Expect<
  Equal<
    User,
    {
      id: string;
      name: string;
      email: string;
    }
  >
>;
```

Like before, assume that you do not have access to the implementation of the `fetchUser` function.

Your task is to update the `User` type so the test passes as expected.

<Exercise title="Exercise 9: Unwrapping a Promise" filePath="/src/040-deriving-types-from-values/134-awaited-type-helper.problem.ts" resourceId="AhnoaCs5v1qlRT7GjJofuY"></Exercise>

### Solution 7: A Single Source of Truth

The `Parameters` utility type is key to this solution, but there is an additional step to follow.

Passing `makeQuery` directly to `Parameters` won't work on its own because `makeQuery` is a value instead of a type:

```ts twoslash
// @errors: 2749
const makeQuery = (
  url: string,
  opts?: {
    method?: string;
    headers?: {
      [key: string]: string;
    };
    body?: string;
  },
) => {};
// ---cut---
type MakeQueryParameters = Parameters<makeQuery>;
```

As the error message suggests, we need to use `typeof` to create a type from the `makeQuery` function, then pass that type to `Parameters`:

```ts twoslash
const makeQuery = (
  url: string,
  opts?: {
    method?: string;
    headers?: {
      [key: string]: string;
    };
    body?: string;
  },
) => {};
// ---cut---
type MakeQueryParameters = Parameters<typeof makeQuery>;
//   ^?
```

We now have `MakeQueryParameters` representing a tuple where the first member is a `url` string, and the second is the optional `opts` object.

Indexing into the type would allow us to create an `Opts` type that represents the `opts` object:

```typescript
type Opts = MakeQueryParameters[1];
```

### Solution 8: Typing Based on Return Value

Using the `ReturnType` utility type, we can extract the return type from the `createUser` function and assign it to a new type. Remember that since `createUser` is a value, we need to use `typeof` to create a type from it:

```ts twoslash
const createUser = (id: string) => {
  return {
    id,
    name: "John Doe",
    email: "example@email.com",
  };
};

// ---cut---
type User = ReturnType<typeof createUser>;
//   ^?
```

This `User` type is a match for the expected type, which means our test will pass as expected.

### Solution 9: Unwrapping a Promise

When using the `ReturnType` utility type with an async function, the resulting type will be wrapped in a `Promise`:

```ts twoslash
const fetchUser = async (id: string) => {
  return {
    id,
    name: "John Doe",
    email: "example@email.com",
  };
};

// ---cut---
type User = ReturnType<typeof fetchUser>;
//   ^?
```

In order to unwrap the `Promise` type and provide the type of the resolved value, we can use the `Awaited` utility type:

```typescript
type User = Awaited<ReturnType<typeof fetchUser>>;
```

Like before, the `User` type is now a match for the expected type, which means our test will pass as expected.

It would also be possible to create intermediate types, but combining operators and type derivation gives us a more succinct solution.

## Transforming Derived Types

In the previous section we looked at how to derive types from functions you don't control. Sometimes, you'll also need to do the same with _types_ you don't control.

### `Exclude`

The `Exclude` utility type is used to remove types from a union. Let's imagine that we have a union of different states our album can be in:

```typescript
type AlbumState =
  | {
      type: "released";
      releaseDate: string;
    }
  | {
      type: "recording";
      studio: string;
    }
  | {
      type: "mixing";
      engineer: string;
    };
```

We want to create a type that represents the states that are not "released". We can use the `Exclude` utility type to achieve this:

```ts twoslash
type AlbumState =
  | {
      type: "released";
      releaseDate: string;
    }
  | {
      type: "recording";
      studio: string;
    }
  | {
      type: "mixing";
      engineer: string;
    };

// ---cut---
type UnreleasedState = Exclude<AlbumState, { type: "released" }>;
//   ^?
```

In this case, the `UnreleasedState` type is a union of the `recording` and `mixing` states, which are the states that are not "released". `Exclude` filters out any member of the union with a `type` of `released`.

We could have done it by checking for a `releaseDate` property instead:

```typescript
type UnreleasedState = Exclude<AlbumState, { releaseDate: string }>;
```

This is because `Exclude` works by pattern matching. It will remove any type from the union that matches the pattern you provide.

This means we can use it to remove all strings from a union:

```ts twoslash
type Example = "a" | "b" | 1 | 2;

type Numbers = Exclude<Example, string>;
//   ^?
```

### `NonNullable`

`NonNullable` is used to remove `null` and `undefined` from a type. This can be useful when extracting a type from a partial object:

```ts twoslash
type Album = {
  artist?: {
    name: string;
  };
};

type Artist = NonNullable<Album["artist"]>;
//   ^?
```

This operates similarly to `Exclude`:

```typescript
type Artist = Exclude<Album["artist"], null | undefined>;
```

But `NonNullable` is more explicit and easier to read.

### `Extract`

`Extract` is the opposite of `Exclude`. It's used to extract types from a union. For example, we can use `Extract` to extract the `recording` state from the `AlbumState` type:

```ts twoslash
type AlbumState =
  | {
      type: "released";
      releaseDate: string;
    }
  | {
      type: "recording";
      studio: string;
    }
  | {
      type: "mixing";
      engineer: string;
    };

// ---cut---
type RecordingState = Extract<AlbumState, { type: "recording" }>;
//   ^?
```

This is useful when you want to extract a specific type from a union you don't control.

Similarly to `Exclude`, `Extract` works by pattern matching. It will extract any type from the union that matches the pattern you provide.

This means that, to reverse our `Extract` example earlier, we can use it to extract all strings from a union:

```ts twoslash
type Example = "a" | "b" | 1 | 2 | true | false;

type Strings = Extract<Example, string>;
//   ^?
```

It's worth noting the similarities between `Exclude`/`Extract` and `Omit/Pick`. A common mistake is to think that you can `Pick` from a union, or use `Exclude` on an object. Here's a little table to help you remember:

| Name      | Used On | Action              | Example                     |
| --------- | ------- | ------------------- | --------------------------- |
| `Exclude` | Unions  | Excludes members    | `Exclude<'a' \| 1, string>` |
| `Extract` | Unions  | Extracts members    | `Extract<'a' \| 1, string>` |
| `Omit`    | Objects | Excludes properties | `Omit<UserObj, 'id'>`       |
| `Pick`    | Objects | Extracts properties | `Pick<UserObj, 'id'>`       |

## Deriving vs Decoupling

Thanks to the tools in these chapters, we now know how to derive types from all sorts of sources: functions, objects and types. But there's a tradeoff to consider when deriving types: coupling.

When you derive a type from a source, you're coupling the derived type to that source. If you derive a type from another derived type, this can create long chains of coupling throughout your app that can be hard to manage.

### When Decoupling Makes Sense

Let's imagine we have a `User` type in a `db.ts` file:

```typescript
export type User = {
  id: string;
  name: string;
  imageUrl: string;
  email: string;
};
```

We'll say for this example that we're using a component-based framework like React, Vue or Svelte. We have a `AvatarImage` component that renders an image of the user. We could pass in the `User` type directly:

```tsx
import { User } from "./db";

export const AvatarImage = (props: { user: User }) => {
  return <img src={props.user.imageUrl} alt={props.user.name} />;
};
```

But as it turns out, we're only using the `imageUrl` and `name` properties from the `User` type. It's a good idea to make your functions and components only require the data they need to run. This helps prevent you from passing around unnecessary data.

Let's try deriving. We'll create a new type called `AvatarImageProps` that only includes the properties we need:

```tsx
import { User } from "./db";

type AvatarImageProps = Pick<User, "imageUrl" | "name">;
```

But let's think for a moment. We've now coupled the `AvatarImageProps` type to the `User` type. `AvatarImageProps` now not only depends on the shape of `User`, but its _existence_ in the `db.ts` file. This means if we ever move the location of the `User` type, or split it into separate interfaces, we'll need to think about `AvatarImageProps`.

Let's try the other way around. Instead of deriving `AvatarImageProps` from `User`, we'll decouple them. We'll create a new type which just has the properties we need:

```tsx
type AvatarImageProps = {
  imageUrl: string;
  name: string;
};
```

Now, `AvatarImageProps` is decoupled from `User`. We can move `User` around, split it into separate interfaces, or even delete it, and `AvatarImageProps` will be unaffected.

In this particular case, decoupling feels like the right choice. This is because `User` and `AvatarImage` are separate concerns. `User` is a data type, while `AvatarImage` is a UI component. They have different responsibilities and different reasons to change. By decoupling them, `AvatarImage` becomes more portable and easier to maintain.

What can make decoupling a difficult decision is that deriving can make you feel 'clever'. `Pick` tempts us because it uses a more advanced feature of TypeScript, which makes us feel good for applying the knowledge we've gained. But often, it's smarter to do the simple thing, and keep your types decoupled.

### When Deriving Makes Sense

Deriving makes most sense when the code you're coupling shares a common concern. The examples in this chapter are good examples of this. Our `as const` object, for instance:

```typescript
const albumTypes = {
  CD: "cd",
  VINYL: "vinyl",
  DIGITAL: "digital",
} as const;

type AlbumType = (typeof albumTypes)[keyof typeof albumTypes];
```

Here, `AlbumType` is derived from `albumTypes`. If we were to decouple it, we'd have to maintain two closely related sources of truth:

```typescript
type AlbumType = "cd" | "vinyl" | "digital";
```

Because both `AlbumType` and `albumTypes` are closely related, deriving `AlbumType` from `albumTypes` makes sense.

Another example is when one type is directly related to another. For instance, our `User` type might have a `UserWithoutId` type derived from it:

```typescript
type User = {
  id: string;
  name: string;
  imageUrl: string;
  email: string;
};

type UserWithoutId = Omit<User, "id">;

const updateUser = (id: string, user: UserWithoutId) => {
  // ...
};
```

Again, these concerns are closely related. Decoupling them would make our code harder to maintain and introduce more busywork into our codebase.

The decision to derive or decouple is all about reducing your future workload.

Are the two types so related that updates to one will need to ripple to the other? Derive.

Are they so unrelated that coupling them could result in more work down the line? Decouple.


--- CHAPTER ---

Throughout this book, we've been using relatively simple type annotations. We've had a look at variable annotations, which help TypeScript know what type a variable should be:

```typescript
let name: string;

name = "Waqas";
```

We've also seen how to type function parameters and return types:

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

These annotations are instructions to TypeScript to tell it what type something should be. If we return a `number` from our `greet` function, TypeScript will show an error. We've told TypeScript that we're returning a `string`, so it expects a `string`.

But there are times when we _don't_ want to follow this pattern. Sometimes, we want to let TypeScript figure it out on its own.

And sometimes, we want to lie to TypeScript.

In this chapter, we'll look at more ways to communicate with TypeScript's compiler via annotations and assertions.

## Annotating Variables vs Values

There's a difference in TypeScript between annotating _variables_ and _values_. The way they conflict can be confusing.

### When You Annotate A Variable, The Variable Wins

Let's look again at the variable annotation we've seen throughout this book.

In this example, we're declaring a variable `config` and annotating it as a `Record` with a string key and a `Color` value:

```typescript
type Color =
  | string
  | {
      r: number;
      g: number;
      b: number;
    };

const config: Record<string, Color> = {
  foreground: { r: 255, g: 255, b: 255 },
  background: { r: 0, g: 0, b: 0 },
  border: "transparent",
};
```

Here, we're annotating a variable. We're saying that `config` is a `Record` with a string key and a `Color` value. This is useful, because if we specify a `Color` that doesn't match the type, TypeScript will show an error:

```ts twoslash
// @errors: 2353
type Color =
  | string
  | {
      r: number;
      g: number;
      b: number;
    };

// ---cut---
const config: Record<string, Color> = {
  border: { incorrect: 0, g: 0, b: 0 },
};
```

But there's a problem with this approach. If we try to access any of the keys, TypeScript gets confused:

```ts twoslash
// @errors: 2339
type Color =
  | string
  | {
      r: number;
      g: number;
      b: number;
    };

const config: Record<string, Color> = {};

// ---cut---
config.foreground.r;
```

Firstly, it doesn't know that foreground is defined on the object. Secondly, it doesn't know whether foreground is the `string` version of the `Color` type or the object version.

This is because we've told TypeScript that `config` is a `Record` with a any number of string keys. We annotated the variable, but the actual _value_ got discarded. This is an important point - when you annotate a variable, TypeScript will:

1. Ensure that the value passed to the variable matches the annotation.
2. Forget about the value's type.

This has some benefits - we can add new keys to `config` and TypeScript won't complain:

```typescript
config.primary = "red";
```

But this isn't really what we want - this is a config object that shouldn't be changed.

### With No Annotation, The Value Wins

One way to get around this would be to drop the variable annotation.

```typescript
const config = {
  foreground: { r: 255, g: 255, b: 255 },
  background: { r: 0, g: 0, b: 0 },
  border: "transparent",
};
```

Because there's no variable annotation, `config` is inferred as the type of the value provided.

But now we've lost the ability to check that the `Color` type is correct. We can add a `number` to the `foreground` key and TypeScript won't complain:

```typescript
const config = {
  foreground: 123,
};
```

So it seems we're at an impasse. We both want to infer the type of the value, but also constrain it to be a certain shape.

### Annotating Values With `satisfies`

The `satisfies` operator is a way to tell TypeScript that a value must satisfy certain criteria, but still allow TypeScript to infer the type.

Let's use it to make sure our `config` object has the right shape:

```typescript
const config = {
  foreground: { r: 255, g: 255, b: 255 },
  background: { r: 0, g: 0, b: 0 },
  border: "transparent",
} satisfies Record<string, Color>;
```

Now, we get the best of both worlds. This means we can access the keys without any issues:

```typescript
config.foreground.r;

config.border.toUpperCase();
```

But we've also told TypeScript that `config` must be a `Record` with a string key and a `Color` value. If we try to add a key that doesn't match this shape, TypeScript will show an error:

```ts twoslash
// @errors: 2322
type Color =
  | string
  | {
      r: number;
      g: number;
      b: number;
    };

// ---cut---
const config = {
  primary: 123,
} satisfies Record<string, Color>;
```

Of course, we have now lost the ability to add new keys to `config` without TypeScript complaining:

```ts twoslash
// @errors: 2339
type Color =
  | string
  | {
      r: number;
      g: number;
      b: number;
    };

const config = {} satisfies Record<string, Color>;
// ---cut---
config.somethingNew = "red";
```

Because TypeScript is now inferring `config` as _just_ an object with a fixed set of keys.

Let's recap:

- When you use a variable annotation, the variable's type wins.
- When you don't use a variable annotation, the value's type wins.
- When you use `satisfies`, you can tell TypeScript that a value must satisfy certain criteria, but still allow TypeScript to infer the type.

#### Narrowing Values With `satisfies`

A common misconception about `satisfies` is that it doesn't affect the type of the value. This is not quite true - in certain situations, `satisfies` does help narrow down a value to a certain type.

Let's take this example:

```tsx
const album = {
  format: "Vinyl",
};
```

Here, we have an `album` object with a `format` key. As we know from our chapter on mutability, TypeScript will infer `album.format` as `string`. We want to make sure that the `format` is one of three values: `CD`, `Vinyl`, or `Digital`.

We could give it a variable annotation:

```tsx
type Album = {
  format: "CD" | "Vinyl" | "Digital";
};

const album: Album = {
  format: "Vinyl",
};
```

But now, `album.format` is `"CD" | "Vinyl" | "Digital"`. This might be a problem if we want to pass it to a function that only accepts `"Vinyl"`.

Instead, we can use `satisfies`:

```typescript
const album = {
  format: "Vinyl",
} satisfies Album;
```

Now, `album.format` is inferred as `"Vinyl"`, because we've told TypeScript that `album` satisfies the `Album` type. So, `satisfies` is narrowing down the value of `album.format` to a specific type.

## Assertions: Forcing The Type Of Values

Sometimes, the way TypeScript infers types isn't quite what we want. We can use assertions in TypeScript to force values to be inferred as a certain type.

### The `as` Assertion

The `as` assertion is a way to tell TypeScript that you know more about a value than it does. It's a way to override TypeScript's type inference and tell it to treat a value as a different type.

Let's look at an example.

Imagine that you're building a web page that has some information in the search query string of the URL.

You happen to know that the user can't navigate to this page without passing `?id=some-id` to the URL.

```ts twoslash
const searchParams = new URLSearchParams(window.location.search);

const id = searchParams.get("id");
//    ^?
```

But TypeScript doesn't know that the `id` will always be a string. It thinks that `id` could be a string or `null`.

So, let's force it. We can use `as` on the result of `searchParams.get("id")` to tell TypeScript that we know it will always be a string:

```ts twoslash
const searchParams = new URLSearchParams(window.location.search);
// ---cut---
const id = searchParams.get("id") as string;
//    ^?
```

Now TypeScript knows that `id` will always be a string, and we can use it as such.

This `as` is a little unsafe! If `id` is somehow not actually passed in the URL, it will be `null` at runtime but `string` at compile time. This means if we called `.toUpperCase()` on `id`, we'd crash our app.

But it's useful in cases where we truly know more than TypeScript can about the behavior of our code.

#### An Alternative Syntax

As an alternative to `as`, you can prefix the value with the type wrapped in angle brackets:

```typescript
const id = <string>searchParams.get("id");
```

This is less common than `as`, but behaves exactly the same way. `as` is more common, so it's better to use that.

#### The Limits of `as`

`as` has some limits on how it can be used. It can't be used to convert between unrelated types.

Consider this example where `as` is used to assert that a string should be treated as a number:

```ts twoslash
// @errors: 2352
const albumSales = "Heroes" as number;
```

TypeScript realizes that even though we're using `as`, we might have made a mistake. The error message is telling us that a string and a number don't share any common properties, but if we really want to go through with it, we could double up on the `as` assertions to first assert the string as `unknown` and then as a `number`:

```tsx
const albumSales = "Heroes" as unknown as number; // no error
```

When using `as` to assert as `unknown as number`, the red squiggly line goes away but that doesn't mean the operation is safe. There's just no way to convert `"Heroes"` into a number that would make sense.

The same behavior applies to other types as well.

In this example, an `Album` interface and a `SalesData` interface don't share any common properties:

```ts twoslash
// @errors: 2352
interface Album {
  title: string;
  artist: string;
  releaseYear: number;
}

interface SalesData {
  sales: number;
  certification: string;
}

const paulsBoutique: Album = {
  title: "Paul's Boutique",
  artist: "Beastie Boys",
  releaseYear: 1989,
};

const paulsBoutiqueSales = paulsBoutique as SalesData;
```

Again, TypeScript shows us the warning about the lack of common properties.

So, `as` does have some built-in safeguards. But by using `as unknown as X`, you can easily bypass them. And because `as` does nothing at runtime, it's a convenient way to lie to TypeScript about the type of a value.

### The Non-null Assertion

Another assertion we can use is the non-null assertion, which is specified by using the `!` operator. This provides a quick way to tell TypeScript that a value is not `null` or `undefined`.

Heading back to our `searchParams` example from earlier, we can use the non-null assertion to tell TypeScript that `id` will never be `null`:

```typescript
const searchParams = new URLSearchParams(window.location.search);

const id = searchParams.get("id")!;
```

This forces TypeScript to treat `id` as a string, even though it could be `null` at runtime. It's the equivalent of using `as string`, but is a little more convenient.

You can also use it when accessing a property which may or may not be defined:

```typescript
type User = {
  name: string;
  profile?: {
    bio: string;
  };
};

const logUserBio = (user: User) => {
  console.log(user.profile!.bio);
};
```

Or, when calling a function that might not be defined:

```typescript
type Logger = {
  log?: (message: string) => void;
};

const main = (logger: Logger) => {
  logger.log!("Hello, world!");
};
```

Each of these fails at runtime if the value is not defined. But it's a convenient lie to TypeScript that we're sure it will be.

The non-null assertion, like other assertions, is a dangerous tool. It's particularly nasty because it's one character long, so easier to miss than `as`.

For fun, I like to use at least three or four in a row to make sure developers know that what they're doing is dangerous:

```typescript
// Yes, this syntax is legal
const id = searchParams.get("id")!!!!;
```

## Error Suppression Directives

Assertions are not the only ways we can lie to TypeScript. There are several comment directives that can be used to suppress errors.

### `@ts-expect-error`

Throughout the book's exercises we've seen several examples of `@ts-expect-error`. This directive gives us a way to tell TypeScript that we expect an error to occur on the next line of code.

In this example, we're creating an error by passing a string into a function that expects a number.

```typescript
function addOne(num: number) {
  return num + 1;
}

// @ts-expect-error
const result = addOne("one");
```

But the error doesn't show up in the editor, because we told TypeScript to expect it.

However, if we pass a number into the function, the error will show up:

```ts twoslash
// @errors: 2578
function addOne(num: number) {
  return num + 1;
}

// ---cut---
// @ts-expect-error
const result = addOne(1);
```

So, TypeScript expects every `@ts-expect-error` directive to be _used_ - to be followed by an error.

Frustratingly, `@ts-expect-error` doesn't let you expect a specific error, but only that an error will occur.

### `@ts-ignore`

The `@ts-ignore` directive behaves a bit differently than `@ts-expect-error`. Instead of _expecting_ an error, it _ignores_ any errors that do occur.

Going back to our `addOne` example, we can use `@ts-ignore` to ignore the error that occurs when passing a string into the function:

```typescript
// @ts-ignore
const result = addOne("one");
```

But if we later fix the error, `@ts-ignore` won't tell us that it's unused:

```typescript
// @ts-ignore
const result = addOne(1); // No errors here!
```

In general, `@ts-expect-error` is more useful than `@ts-ignore`, because it tells you when you've fixed the error. This means you can get a warning to remove the directive.

### `@ts-nocheck`

Finally, The `@ts-nocheck` directive will completely remove type checking for a file.

To use it, add the directive at the top of your file:

```tsx
// @ts-nocheck
```

With all checking disabled, TypeScript won't show you any errors, but it also won't be able to protect you from any runtime issues that might show up when you run your code.

Generally speaking, you shouldn't use `@ts-nocheck`. I've personally lost hours of my life to working in large files where I didn't notice that `@ts-nocheck` was at the top.

### Suppressing Errors Vs `as any`

There's one tool in a TypeScript developers' toolkit that _also_ suppresses errors, but isn't a comment directive - `as any`.

`as any` is an extremely powerful tool because it combines a lie to TypeScript (`as`) with a type that disables all type checking (`any`).

This means that you can use it to suppress nearly any error. Our example above? No problem:

```typescript
const result = addOne({} as any);
```

`as any` turns the empty object into `any`, which disables all type checking. This means that `addOne` will happily accept it.

#### `as any` vs Error Suppression Directives

When there's a choice with how to suppress an error, I prefer using `as any`. Error suppression directives are too broad - they target the entire line of code. This can lead to accidentally suppressing errors that you didn't mean to:

```typescript
// @ts-ignore
const result = addone("one");
```

Here, we're calling `addone` instead of `addOne`. The error suppression directive will suppress the error, but it will also suppress any other errors that might occur on that line.

Using `as any` instead is more precise:

```ts twoslash
// @errors: 2552
const addOne = (num: number) => num + 1;
// ---cut---
const result = addone("one" as any);
```

Now, you'll only suppress the error that you intended to.

## When To Suppress Errors

Each of the error suppression tools we've looked at is a way of basically telling TypeScript to "keep quiet". TypeScript doesn't attempt to limit how often you try to silence it. It's perfectly possible that every time you encounter an error, you could suppress it with `@ts-ignore` or `as any`.

Taking this approach limits how useful TypeScript can be. Your code will compile, but you will likely get many more runtime errors.

But there are times when suppressing errors is a good idea. Let's explore a few different scenarios.

### When You Know More Than TypeScript

The important thing to remember about TypeScript is that really, you're writing JavaScript.

This disconnect between compile time and runtime means that types _can sometimes be wrong_. This can mean you know more about the runtime code than TypeScript does.

This can happen when third-party libraries don't have good type definitions, or when you're working with a complex pattern that TypeScript struggles to understand.

Error suppression directives exist for this reason. They let you patch over the differences that sometimes crop up between TypeScript and the JavaScript it produces.

But this feeling of superiority over TypeScript can be dangerous. So, let's compare it to a very similar feeling:

### When TypeScript Is Being "Dumb"

Some patterns lend themselves better to being typed than others. More dynamic patterns can be harder for TypeScript to understand, and will lead you to suppressing more errors.

A simple example is constructing an object. In JavaScript, there's no real difference between these two patterns:

```ts twoslash
// @errors: 2339
// Static
const obj = {
  a: 1,
  b: 2,
};

// Dynamic
const obj2 = {};

obj2.a = 1;
obj2.b = 2;
```

In the first, we construct an object by passing in the keys and values. In the second, we construct an empty object and add the keys and values later. The first pattern is static, the second is dynamic.

But in TypeScript, the first pattern is much easier to work with. TypeScript can infer the type of `obj` as `{ a: number, b: number }`. But it can't infer the type of `obj2` - it's just an empty object. In fact, you'll get errors when you try to do this.

But if you're used to constructing your objects in a dynamic way, this can be frustrating. You know that `obj2` will have an `a` and a `b` key, but TypeScript doesn't.

In these cases, it's tempting to bend the rules a little by using an `as` to tell TypeScript that you know what you're doing:

```typescript
const obj2 = {} as { a: number; b: number };

obj2.a = 1;
obj2.b = 2;
```

This is subtly different from the first scenario, where you know more than TypeScript does. In this case, there's a simple runtime refactor you can make to make TypeScript happy and avoid suppressing errors.

The more experienced you are with TypeScript, the more often you'll be able to spot these patterns. You'll be able to spot the times when TypeScript lacks crucial information, requiring an `as`, or when the patterns you're using aren't letting TypeScript do its job properly.

So if you're tempted to suppress an error, see if there's a way you can refactor your code to a pattern that TypeScript understands better. After all, it's easier to swim with the current than against it.

### When You Don't Understand The Error

Let's say you've been coding for a few hours. An unread Slack message notification is blinking at you. The feature is all but finished, except for some types you need to add. You've got a call in 20 minutes. And then TypeScript shows an error that you don't understand.

TypeScript errors can be extremely hard to read. They can be long, multi-layered, and filled with references to types you've never heard of.

It's at this moment that TypeScript can feel its most frustrating. It's enough to turn many developers off TypeScript for good.

So, you suppress the error. You add a `@ts-ignore` or an `as any` and move on.

Weeks later, a bug gets reported. You end up back in the same area of the codebase. And you track the error down to the exact line you suppressed.

The time you save by suppressing errors will, eventually, come back to bite you. You're not saving time, but borrowing it.

It's this situation, when you don't understand the error, that I'd recommend sticking it out. TypeScript is attempting to communicate with you. Try refactoring your runtime code. Use all the tools mentioned in the IDE Superpowers chapter to investigate the types the errors mention.

Think of the time you invest in fixing TypeScript errors as an investment in yourself. You're both fixing potential bugs in the future, and levelling up your own understanding.

## Exercises

### Exercise 2: Provide Additional Info to TypeScript

This `handleFormData` function accepts an argument `e` typed as `SubmitEvent`, which is a global type from the DOM typings that is emitted when a form is submitted.

Within the function we use the method `e.preventDefault()`, available on `SubmitEvent`, to stop the form from its default submission action. Then we attempt to create a new `FormData` object, `data`, with `e.target`:

```ts twoslash
// @lib: dom,es2023,dom.iterable
// @errors: 2345
const handleFormData = (e: SubmitEvent) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const value = Object.fromEntries(data.entries());
  return value;
};
```

At runtime, this code works flawlessly. However, at the type level, TypeScript shows an error under `e.target`. Your task is to provide TypeScript with additional information in order to resolve the error.

<Exercise title="Exercise 2: Provide Additional Info to TypeScript" filePath="/src/045-annotations-and-assertions/141-as-and-as-any.problem.ts"></Exercise>

### Exercise 4: Solving Issues with Assertions

Here we'll revisit a previous exercise, but solve it in a different way.

The `findUsersByName` function takes in some `searchParams` as its first argument, where `name` is an optional string property. The second argument is `users`, which is an array of objects with `id` and `name` properties:

```ts twoslash
// @errors: 2345
const findUsersByName = (
  searchParams: { name?: string },
  users: {
    id: string;
    name: string;
  }[],
) => {
  if (searchParams.name) {
    return users.filter((user) => user.name.includes(searchParams.name));
  }

  return users;
};
```

If `searchParams.name` is defined, we want to filter the `users` array using this `name`. Your challenge is to adjust the code so that the error disappears.

Previously we solved this challenge by extracting `searchParams.name` into a const variable and performing the check against that.

However, this time you need to solve it two different ways: Once with `as` and once with non-null assertion.

Note that this is slightly less safe than the previous solution, but it's still a good technique to learn.

<Exercise title="Exercise 4: Solving Issues with Assertions" filePath="/src/045-annotations-and-assertions/143.5-non-null-assertions.problem.ts"></Exercise>

### Exercise 6: Enforcing Valid Configuration

We're back to the `configurations` object that includes `development`, `production`, and `staging`. Each of these members contains specific settings relevant to its environment:

```ts twoslash
// @errors: 2578
const configurations = {
  development: {
    apiBaseUrl: "http://localhost:8080",
    timeout: 5000,
  },
  production: {
    apiBaseUrl: "https://api.example.com",
    timeout: 10000,
  },
  staging: {
    apiBaseUrl: "https://staging.example.com",
    timeout: 8000,
    // @ts-expect-error
    notAllowed: true,
  },
};
```

We also have an `Environment` type along with a passing test case that checks if `Environment` is equal to `"development" | "production" | "staging"`:

```ts
type Environment = keyof typeof configurations;

type test = Expect<
  Equal<Environment, "development" | "production" | "staging">
>;
```

Even though the test case passes, we have an error in the `staging` object inside of `configurations`. We're expecting an error on `notAllowed: true`, but the `@ts-expect-error` directive is not working because TypeScript is not recognizing that `notAllowed` is not allowed.

Your task is to determine an appropriate way to annotate our `configurations` object to retain accurate `Environment` inference from it while simultaneously throwing an error for members that are not allowed. Hint: Consider using a helper type that allows you to specify a data shape.

<Exercise title="Exercise 6: Enforcing Valid Configuration" filePath="/src/045-annotations-and-assertions/146.5-typeof-keyof-and-satisfies-keyword.problem.ts"></Exercise>

### Exercise 7: Variable Annotation vs. `as` vs. `satisfies`

In this exercise, we are going to examine three different types of setups in TypeScript: variable annotations, `as`, and `satisfies`.

The first scenario consists of declaring a `const obj` as an empty object and then applying the keys `a` and `b` to it. Using `as Record<string, number>`, we're expecting the type of `obj` or `a` to be a number:

```typescript
const obj = {} as Record<string, number>;
obj.a = 1;
obj.b = 2;

type test = Expect<Equal<typeof obj.a, number>>;
```

Second, we have a `menuConfig` object that is assigned a Record type with `string` as the keys. The `menuConfig` is expected to have either an object containing `label` and `link` properties or an object with a `label` and `children` properties which include arrays of objects that have `label` and `link`:

```ts twoslash
// @errors: 2339
import { Equal, Expect } from "@total-typescript/helpers";

// ---cut---
const menuConfig: Record<
  string,
  | {
      label: string;
      link: string;
    }
  | {
      label: string;
      children: {
        label: string;
        link: string;
      }[];
    }
> = {
  home: {
    label: "Home",
    link: "/home",
  },
  services: {
    label: "Services",
    children: [
      {
        label: "Consulting",
        link: "/services/consulting",
      },
      {
        label: "Development",
        link: "/services/development",
      },
    ],
  },
};
type tests = [
  Expect<Equal<typeof menuConfig.home.label, string>>,
  Expect<
    Equal<
      typeof menuConfig.services.children,
      {
        label: string;
        link: string;
      }[]
    >
  >,
];
```

In the third scenario, we're trying to use `satisfies` with `document.getElementById('app')` and `HTMLElement`, but it's resulting in errors:

```ts twoslash
// @errors: 1360 2344
import { Equal, Expect } from "@total-typescript/helpers";
// ---cut---
// Third Scenario
const element = document.getElementById("app") satisfies HTMLElement;

type test3 = Expect<Equal<typeof element, HTMLElement>>;
```

Your job is to rearrange the annotations to correct these issues.

At the end of this exercise, you should have used `as`, variable annotations, and `satisfies` once each.

<Exercise title="Exercise 7: Variable Annotation vs. `as` vs. `satisfies`" filePath="/src/045-annotations-and-assertions/147-satisfies-vs-as-vs-variable-annotations.problem.ts"></Exercise>

### Exercise 8: Create a Deeply Read-Only Object

Here we have a `routes` object:

```ts twoslash
// @errors: 2578
const routes = {
  "/": {
    component: "Home",
  },
  "/about": {
    component: "About",
    // @ts-expect-error
    search: "?foo=bar",
  },
};

// @ts-expect-error
routes["/"].component = "About";
```

When adding a `search` field under the `/about` key, it should raise an error, but it currently doesn't. We also expect that once the `routes` object is created, it should not be able to be modified. For example, assigning `About` to the `Home component` should cause an error, but the `@ts-expect-error` directive tells us there is no problem.

Inside of the tests we expect that accessing properties of the `routes` object should return `Home` and `About` instead of interpreting these as literals, but those are both currently failing:

```ts twoslash
// @errors: 2344
import { Equal, Expect } from "@total-typescript/helpers";
const routes = {
  "/": {
    component: "Home",
  },
  "/about": {
    component: "About",
    search: "?foo=bar",
  },
};

// ---cut---
type tests = [
  Expect<Equal<(typeof routes)["/"]["component"], "Home">>,
  Expect<Equal<(typeof routes)["/about"]["component"], "About">>,
];
```

Your task is to update the `routes` object typing so that all errors are resolved. This will require you to use `satisfies` as well as another annotation that ensures the object is deeply read-only.

<Exercise title="Exercise 8: Create a Deeply Read-Only Object" filePath="/src/045-annotations-and-assertions/148-satisfies-with-as-const.problem.ts"></Exercise>

### Solution 2: Provide Additional Info to TypeScript

The error we encountered in this challenge was that the `EventTarget | null` type was incompatible with the required parameter of type `HTMLFormElement`. The problem stems from the fact that these types don't match, and `null` is not permitted:

```ts twoslash
// @lib: dom,es2023,dom.iterable
// @errors: 2345
const handleFormData = (e: SubmitEvent) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const value = Object.fromEntries(data.entries());
  return value;
};
```

First and foremost, it's necessary to ensure `e.target` is not null.

#### Using `as`

We can use the `as` keyword to recast `e.target` to a specific type.

However, if we recast it as `EventTarget`, an error will continue to occur:

```ts twoslash
// @lib: dom,es2023,dom.iterable
// @errors: 2345
const handleFormData = (e: SubmitEvent) => {
  e.preventDefault();
  const data = new FormData(e.target as EventTarget);
  const value = Object.fromEntries(data.entries());
  return value;
};
```

Since we know that the code works at runtime and has tests covering it, we can force `e.target` to be of type `HTMLFormElement`:

```typescript
const data = new FormData(e.target as HTMLFormElement);
```

Optionally, we can create a new variable, `target`, and assign the casted value to it:

```typescript
const target = e.target as HTMLFormElement;
const data = new FormData(target);
```

Either way, this change resolves the error and `target` is now inferred as an `HTMLFormElement` and the code functions as expected.

#### Using `as any`

A quicker solution would be to use `as any` for the `e.target` variable, to tell TypeScript that we don't care about the type of the variable:

```typescript
const data = new FormData(e.target as any);
```

While using `as any` can get us past the error message more quickly, it does have its drawbacks.

For example, we wouldn't be able to leverage autocompletion or have type checking for other `e.target` properties that would come from the `HTMLFormElement` type.

When faced with a situation like this, it's better to use the most specific `as` assertion you can. This communicates that you have a clear understanding of what `e.target` is not only to TypeScript, but to other developers who might read your code.

### Solution 4: Solving Issues with Assertions

Inside the `findUsersByName` function, TypeScript is complaining about `searchParams.name` because of a strange reason.

Imagine if `searchParams.name` was a getter that returned `string` or `undefined` at random:

```typescript
const searchParams = {
  get name() {
    return Math.random() > 0.5 ? "John" : undefined;
  },
};
```

Now, TypeScript can't be sure that `searchParams.name` will always be a `string`. This is why it's complaining inside the `filter` function.

This is why we were previously able to solve this problem by extracting `searchParams.name` into a constant variable and performing the check against that - this guarantees that the name will be a string.

However, this time we will solve it differently.

Currently, `searchParams.name` is typed as `string | undefined`. We want to tell TypeScript that we know more than it does, and that we know that `searchParams.name` will never be `undefined` inside the `filter` callback.

```ts twoslash
// @errors: 2345
const findUsersByName = (
  searchParams: { name?: string },
  users: {
    id: string;
    name: string;
  }[],
) => {
  if (searchParams.name) {
    return users.filter((user) => user.name.includes(searchParams.name));
  }
  return users;
};
```

#### Adding `as string`

One way to solve this is to add `as string` to `searchParams.name`:

```ts twoslash
const findUsersByName = (
  searchParams: { name?: string },
  users: {
    id: string;
    name: string;
  }[],
) => {
  if (searchParams.name) {
    return users.filter((user) =>
      user.name.includes(searchParams.name as string),
    );
  }
  return users;
};
```

This removes `undefined` and it's now just a `string`.

#### Adding a Non-null Assertion

Another way to solve this is to add a non-null assertion to `searchParams.name`. This is done by adding a `!` postfix operator to the property we are trying to access:

```ts twoslash
const findUsersByName = (
  searchParams: { name?: string },
  users: {
    id: string;
    name: string;
  }[],
) => {
  if (searchParams.name) {
    return users.filter((user) => user.name.includes(searchParams.name!));
  }
  return users;
};
```

The `!` operater tells TypeScript to remove any `null` or `undefined` types from the variable. This would leave us with just `string`.

Both of these solutions will remove the error and allow the code to work as expected. But neither protect us against the insidious `get` function that returns `string | undefined` at random.

Since this is a pretty rare case, we might even say TypeScript is being a bit over-protective here. So, an assertion feels like the right choice.

### Solution 6: Enforcing Valid Configuration

The first step is to determine the structure of our `configurations` object.

In this case, it makes sense for it to be a `Record` where the keys will be `string` and the values will be an object with `apiBaseUrl` and `timeout` properties.

```typescript
const configurations: Record<
  string,
  {
    apiBaseUrl: string;
    timeout: number
  }
> = {
  ...
```

This change makes the `@ts-expect-error` directive work as expected, but we now have an error related to the `Environment` type not being inferred correctly:

```ts twoslash
// @errors: 2344
import { Equal, Expect } from "@total-typescript/helpers";

const configurations: Record<
  string,
  {
    apiBaseUrl: string;
    timeout: number;
  }
> = {
  development: {
    apiBaseUrl: "http://localhost:8080",
    timeout: 5000,
  },
  production: {
    apiBaseUrl: "https://api.example.com",
    timeout: 10000,
  },
  staging: {
    apiBaseUrl: "https://staging.example.com",
    timeout: 8000,
    // @ts-expect-error
    notAllowed: true,
  },
};

// ---cut---
type Environment = keyof typeof configurations;
//   ^?

type test = Expect<
  Equal<Environment, "development" | "production" | "staging">
>;
```

We need to make sure that `configurations` is still being inferred as its type, while also type checking the thing being passed to it.

This is the perfect application for the `satisfies` keyword.

Instead of annotating the `configurations` object as a `Record`, we'll instead use the `satisfies` keyword for the type constraint:

```typescript
const configurations = {
  development: {
    apiBaseUrl: "http://localhost:8080",
    timeout: 5000,
  },
  production: {
    apiBaseUrl: "https://api.example.com",
    timeout: 10000,
  },
  staging: {
    apiBaseUrl: "https://staging.example.com",
    timeout: 8000,
    // @ts-expect-error
    notAllowed: true,
  },
} satisfies Record<
  string,
  {
    apiBaseUrl: string;
    timeout: number;
  }
>;
```

This allows us to specify that the values we pass to our configuration object must adhere to the criteria defined in the type, while still allowing the type system to infer the correct types for our development, production, and staging environments.

### Solution 7: Variable Annotation vs. `as` vs. `satisfies`

Let's work through the solutions for `satisfies`, `as`, and variable annotations.

#### When to Use `satisfies`

For the first scenario that uses a `Record`, the `satisfies` keyword won't work because we can't add dynamic members to an empty object.

```ts twoslash
// @errors: 2339
const obj = {} satisfies Record<string, number>;

obj.a = 1;
```

In the second scenario with the `menuConfig` object, we started with errors about `menuConfig.home` and `menuConfig.services` not existing on both members.

This is a clue that we need to use `satisfies` to make sure a value is checked without changing the inference:

```typescript
const menuConfig = {
  home: {
    label: "Home",
    link: "/home",
  },
  services: {
    label: "Services",
    children: [
      {
        label: "Consulting",
        link: "/services/consulting",
      },
      {
        label: "Development",
        link: "/services/development",
      },
    ],
  },
} satisfies Record<
  string,
  | {
      label: string;
      link: string;
    }
  | {
      label: string;
      children: {
        label: string;
        link: string;
      }[];
    }
>;
```

With this use of `satisfies`, the tests pass as expected.

Just to check the third scenario, `satisfies` doesn't work with `document.getElementById("app")` because it's inferred as `HTMLElement | null`:

```ts twoslash
// @errors: 1360
const element = document.getElementById("app") satisfies HTMLElement;
```

#### When to Use `as`

If we try to use variable annotation in the third example, we get the same error as with `satisfies`:

```ts twoslash
// @errors: 2322
const element: HTMLElement = document.getElementById("app");
```

By process of elimination, `as` is the correct choice for this scenario:

```typescript
const element = document.getElementById("app") as HTMLElement;
```

With this change, `element` is inferred as `HTMLElement`.

#### Using Variable Annotations

This takes us to the first scenario, where using variable annotations is the correct choice:

```typescript
const obj: Record<string, number> = {};
```

Note that we could use `as` here, but it's less safe and may lead to complications as we're forcing a value to be of a certain type. A variable annotation simply denotes a variable as that certain type and checks anything that's passed to it, which is the more correct, safer approach.

Generally when you do have a choice between `as` or a variable annotation, opt for the variable annotation.

#### The Big Takeaway

The key takeaway in this exercise is to grasp the mental model for when to use `as`, `satisfies`, and variable annotations:

Use `as` when you want to tell TypeScript that you know more than it does.

Use `satisfies` when you want to make sure a value is checked without changing the inference on that value.

The rest of the time, use variable annotations.

### Solution 8: Create a Deeply Read-Only Object

We started with an `@ts-expect-error` directive inside of `routes` that was not working as expected.

Because we wanted a configuration object to be in a certain shape while still being able to access certain pieces of it, this was a perfect use case for `satisfies`.

At the end of the `routes` object, add a `satisfies` that will be a `Record` of `string` and an object with a `component` property that is a `string`:

```tsx
const routes = {
  "/": {
    component: "Home",
  },
  "/about": {
    component: "About",
    // @ts-expect-error
    search: "?foo=bar",
  },
} satisfies Record<
  string,
  {
    component: string;
  }
>;
```

This change solves the issue of the `@ts-expect-error` directive inside of the `routes` object, but we still have an error related to the `routes` object not being read-only.

To address this, we need to apply `as const` to the `routes` object. This will make `routes` read-only and add the necessary immutability.

If we try adding `as const` after the `satisfies`, we'll get the following error:

```ts twoslash
// @errors: 1355
const routes = {
  // ...contents
} satisfies Record<
  string,
  {
    component: string;
  }
> as const;
```

In other words, `as const` can only be applied to a value and not a type.

The correct way to use `as const` is to put it before the `satisfies`:

```tsx
const routes = {
  // routes as before
} as const satisfies Record<
  string,
  {
    component: string;
  }
>;
```

Now our tests pass expected.

This setup of combining `as const` and `satisfies` is ideal when you need a particular shape for a configuration object while enforcing immutability.


--- CHAPTER ---

We've now got a good understanding of most of TypeScript's features. Let's take it to the next level. By exploring some of the more unusual and lesser-known parts of TypeScript, we'll gain a deeper understanding of how it works.

## The Evolving `any` Type

While most of the time we want to have our types remain static, it is possible to create variables that can dynamically change their type like in JavaScript. This can be done with a technique called the "evolving `any`" which takes advantage of how variables are declared and inferred when no type is specified.

To start, use `let` to declare the variable without a type, and TypeScript will infer it as `any`:

```ts twoslash
let myVar;
//  ^?
```

Now the `myVar` variable will take on the inferred type of whatever is assigned to it.

For example, we can assign it a number then call number methods like `toExponential()` on it. Later, we could change it to a string and convert it to all caps:

```tsx
myVar = 659457206512;

console.log(myVar.toExponential()); // logs "6.59457206512e+11"

myVar = "mf doom";

console.log(myVar.toUpperCase()); // logs "MF DOOM"
```

This is like an advanced form of narrowing, where the type of the variable is narrowed based on the value assigned to it.

### Evolving `any` Arrays

This technique of using the evolving `any` also works with arrays. When you declare an array without a specific type, you can push various types of elements to it:

```ts twoslash
const evolvingArray = [];

evolvingArray.push("abc");

const elem = evolvingArray[0];
//    ^?

evolvingArray.push(123);

const elem2 = evolvingArray[1];
//    ^?
```

Even without specifying types, TypeScript is incredibly smart about picking up on your actions and the behavior you're pushing to evolving `any` types.

## Excess Property Warnings

A deeply confusing part of TypeScript is how it handles excess properties in objects. In many situations, TypeScript won't show errors you might expect when working with objects.

Let's create an `Album` interface that includes `title` and `releaseYear` properties:

```tsx
interface Album {
  title: string;
  releaseYear: number;
}
```

Here we create an untyped `rubberSoul` object that includes an excess `label` property:

```tsx
const rubberSoul = {
  title: "Rubber Soul",
  releaseYear: 1965,
  label: "Parlophone",
};
```

Now if we create a `processAlbum` function that accepts an `Album` and logs it, we can pass in the `rubberSoul` object without any issues:

```tsx
const processAlbum = (album: Album) => console.log(album);

processAlbum(rubberSoul); // No error!
```

This seems strange! We would expect TypeScript to show an error for the excess `label` property, but it doesn't.

Even more strangely, when we pass the object _inline_, we do get an error:

```ts twoslash
// @errors: 2353
type Album = {
  title: string;
  releaseYear: number;
};
const processAlbum = (album: Album) => console.log(album);

// ---cut---
processAlbum({
  title: "Rubber Soul",
  releaseYear: 1965,
  label: "Parlophone",
});
```

Why the different behavior?

### No Excess Property Checks On Variables

In the first example, we assigned the album to a variable, then passed the variable into our function. In this situation, TypeScript won't check for excess properties.

The reason is that we might be using that variable in other places where the excess property is needed. TypeScript doesn't want to get in the way of that.

But when we inline the object, TypeScript knows that we're not going to use it elsewhere, so it checks for excess properties.

This can make you _think_ that TypeScript cares about excess properties - but it doesn't. It only checks for them in certain situations.

This behavior can be frustrating when you misspell the names of an optional parameter. Imagine you misspell `timeout` as `timeOut`:

```typescript
const myFetch = (options: { url: string; timeout?: number }) => {
  // Implementation
};

const options = {
  url: "/",
  timeOut: 1000,
};

myFetch(options); // No error!
```

In this case, TypeScript won't show an error, and you won't get the runtime behavior you expect. The only way to source the error would be to provide a type annotation for the `options` object:

```ts twoslash
// @errors: 2561
const options: { timeout?: number } = {
  timeOut: 1000,
};
```

Now, we're comparing an inline object to a type, and TypeScript will check for excess properties.

### No Excess Property Checks When Comparing Functions

Another situation where TypeScript won't check for excess properties is when comparing functions.

Let's imagine we have a `remapAlbums` function that itself accepts a function:

```tsx
const remapAlbums = (albums: Album[], remap: (album: Album) => Album) => {
  return albums.map(remap);
};
```

This function takes an array of `Album`s and a function that remaps each `Album`. This can be used to change the properties of each `Album` in the array.

We can call it like this to increment the `releaseYear` of each album by one:

```tsx
const newAlbums = remapAlbums(albums, (album) => ({
  ...album,
  releaseYear: album.releaseYear + 1,
}));
```

But as it turns out, we can pass an excess property to the return type of the function without TypeScript complaining:

```tsx
const newAlbums = remapAlbums(albums, (album) => ({
  ...album,
  releaseYear: album.releaseYear + 1,
  strangeProperty: "This is strange",
}));
```

Now, our `newAlbums` array will have an excess `strangeProperty` property on each `Album` object, without TypeScript even knowing about it. It thinks that the return type of the function is `Album[]`, but it's actually `(Album & { strangeProperty: string })[]`.

The way we'd get this 'working' is to add a return type annotation to our inline function:

```ts twoslash
// @errors: 2353
type Album = {
  title: string;
  releaseYear: number;
};

const remapAlbums = (albums: Album[], remap: (album: Album) => Album) => {
  return albums.map(remap);
};

const albums: Album[] = [
  { title: "Rubber Soul", releaseYear: 1965 },
  { title: "Revolver", releaseYear: 1966 },
  { title: "Sgt. Pepper's Lonely Hearts Club Band", releaseYear: 1967 },
];

// ---cut---
const newAlbums = remapAlbums(
  albums,
  (album): Album => ({
    ...album,
    releaseYear: album.releaseYear + 1,
    strangeProperty: "This is strange",
  }),
);
```

This will cause TypeScript to show an error for the excess `strangeProperty` property.

This works because in this situation, we're comparing an inline object (the value we're returning) directly to a type. TypeScript will check for excess properties in this case.

Without a return type annotation, TypeScript ends up trying to compare two functions, and it doesn't really mind if a function returns too many properties.

### Open vs Closed Object Types

TypeScript, by default, treats all objects as _open_. At any time, it expects that other properties might be present on objects.

Other languages, like Flow, treat objects as _closed_ by default. Flow is Meta's internal type system, and by default requires objects to be exact (their term for 'closed').

```js
function method(obj: { foo: string }) {
  /* ... */
}

method({ foo: "test", bar: 42 }); // Error!
```

You can opt in to open (or inexact) objects in Flow with a `...` syntax:

```js
function method(obj: { foo: string, ... }) {
  /* ... */
}

method({ foo: "test", bar: 42 }); // No more error!
```

But Flow recommends you use closed objects by default. They think that, especially when working with spread operators, it's better to err on the side of caution.

### Why Does TypeScript Treat Objects As Open?

Open objects more closely reflect how JavaScript actually works. Any type system for JavaScript - a very dynamic language - has to be relatively cautious about how 'safe' it can truly be.

So, TypeScript's decision to treat objects as open by default is a reflection of the language it's trying to type. It also more closely reflects how objects work in other languages.

The issue is that the excess properties warning can often make you think TypeScript uses closed objects.

But really, the excess properties warning is more like a courtesy. It's only used in cases where the object can't be modified elsewhere.

## Object Keys Are Loosely Typed

A consequence of TypeScript having open object types is that iterating over the keys of an object can be frustrating.

In JavaScript, calling `Object.keys` with an object will return an array of strings representing the keys.

```ts twoslash
const yetiSeason = {
  title: "Yeti Season",
  artist: "El Michels Affair",
  releaseYear: 2021,
};

const keys = Object.keys(yetiSeason);
//    ^?
```

In theory, you can then use those keys to access the values of the object:

```ts twoslash
// @errors: 7053
const yetiSeason = {
  title: "Yeti Season",
  artist: "El Michels Affair",
  releaseYear: 2021,
};

const keys = Object.keys(yetiSeason);
// ---cut---
keys.forEach((key) => {
  console.log(yetiSeason[key]); // Red squiggly line under key
});
```

But we're getting an error. TypeScript is telling us that we can't use `string` to access the properties of `yetiSeason`.

The only way this would work would be if `key` was typed as `'title' | 'artist' | 'releaseYear'`. In other words, as `keyof typeof yetiSeason`. But it's not - it's typed as `string`.

The reason for this comes back to `Object.keys` - it returns `string[]`, not `(keyof typeof obj)[]`.

```ts twoslash
// @errors: 2304
const keys = Object.keys(yetiSeason);
//     ^?
```

By the way, the same behavior happens with `for ... in` loops:

```ts twoslash
// @errors: 7053
const yetiSeason = {
  title: "Yeti Season",
  artist: "El Michels Affair",
  releaseYear: 2021,
};

const keys = Object.keys(yetiSeason);

// ---cut---
for (const key in yetiSeason) {
  console.log(yetiSeason[key]);
}
```

This is a consequence of TypeScript's open object types. TypeScript can't know the exact keys of an object at compile time, so it has to assume that there are unspecified keys on every object. The safest thing for it to do is, when you're enumerating the keys of an object, to treat them all as `string`.

We'll look at a few ways to work around this in the exercises below.

## The Empty Object Type

Another consequence of open object types is that the empty object type `{}` doesn't behave the way you might expect.

To set the stage, let's revisit the type assignability chart:

![type assignability chart](https://res.cloudinary.com/total-typescript/image/upload/v1708622408/150-empty-object-type.solution.1_htrfmv.png)

At the top of the chart is the `unknown` type, which can accept all other types. At the bottom is the `never` type, which no other type can be assigned to, but the `never` type itself can be assigned to any other type.

Between the `never` and `unknown` types is a universe of types. The empty object type `{}` has a unique place in this universe. Instead of representing an empty object, as you might imagine, it actually represents _anything that isn't `null` or `undefined`_.

This means that it can accept a number of other types: string, number, boolean, function, symbol, and objects containing properties.

All of the following are valid assignments:

```typescript
const coverArtist: {} = "Guy-Manuel De Homem-Christo";
const upcCode: {} = 724384260910;

const submit = (homework: {}) => console.log(homework);
submit("Oh Yeah");
```

However, trying to call `submit` with `null` or `undefined` will result in a TypeScript error:

```ts twoslash
// @errors: 2345
const submit = (homework: {}) => console.log(homework);
// ---cut---
submit(null);
```

This might feel a bit strange. But it makes sense when you remember that TypeScript's objects are _open_. Imagine our success function actually took an object containing `message`. TypeScript would be happy if we passed it an excess property:

```tsx
const success = (response: { message: string }) =>
  console.log(response.message);

const messageWithExtra = { message: "Success!", extra: "This is extra" };

success(messageWithExtra); // No Error!
```

An empty object is really the 'most open' object. Strings, numbers, booleans can all be considered objects in JavaScript. They each have properties, and methods. So TypeScript is happy to assign them to an empty object type.

The only things in JavaScript that don't have properties are `null` and `undefined`. Attempting to access a property on either of these will result in a runtime error. So, they don't fit the definition of an object in TypeScript.

When you consider this, the empty object type `{}` is a rather elegant solution to the problem of representing anything that isn't `null` or `undefined`.

## The Type and Value Worlds

For the most part, TypeScript can be separated into two syntatical spaces: the type world and the value world. These two worlds can live side-by-side in the same line of code:

```tsx
const myNumber: number = 42;
//    ^^^^^^^^  ^^^^^^   ^^
//    value     type     value
```

This can be confusing, especially because TypeScript likes to reuse the same keywords across both worlds:

```tsx
if (typeof key === "string" && (key as keyof typeof obj)) {
  //^^^^^^^^^^^^^^^^^^^^^^          ^^^^^^^^^^^^^^^^^^^
  //value                           type
}
```

But TypeScript treats this boundary very strictly. For instance, you can't use a type in the value world:

```ts twoslash
// @errors: 2693
const processAlbum = (album: Album) => console.log(album);
// ---cut---
type Album = {
  title: string;
  artist: string;
};

processAlbum(Album);
```

As you can see, `Album` doesn't even exist in the value world, so TypeScript shows an error when we try to use it as one.

Another common example is trying to pass a value directly to a type:

```ts twoslash
// @errors: 2749
const processAlbum = (album: Album) => console.log(album);

// ---cut---
type Album = ReturnType<processAlbum>;
```

In this case, TypeScript suggests using `typeof processAlbum` instead of `processAlbum` to fix the error.

These boundaries are very clear - except in a few cases. Some entities can exist in both the type and value worlds.

### Classes

Consider this `Song` class that uses the shortcut of declaring properties in the constructor:

```tsx
class Song {
  title: string;
  artist: string;

  constructor(title: string, artist: string) {
    this.title = title;
    this.artist = artist;
  }
}
```

We can use the `Song` class as a type, for instance to type a function's parameter:

```tsx
const playSong = (song: Song) =>
  console.log(`Playing ${song.title} by ${song.artist}`);
```

This type refers to an _instance_ of the `Song` class, not the class itself:

```ts twoslash
// @errors: 2345
class Song {
  title: string;
  artist: string;

  constructor(title: string, artist: string) {
    this.title = title;
    this.artist = artist;
  }
}

const playSong = (song: Song) =>
  console.log(`Playing ${song.title} by ${song.artist}`);

// ---cut---
const song1 = new Song("Song 1", "Artist 1");

playSong(song1);

playSong(Song);
```

In this case, TypeScript shows an error when we try to pass the `Song` class itself to the `playSong` function. This is because `Song` is a class, and not an instance of the class.

So, classes exist in both the type and value worlds, and represent an instance of the class when used as a type.

### Enums

Enums can also cross between worlds.

Consider this `AlbumStatus` enum, and a function that determines whether a discount is available:

```tsx
enum AlbumStatus {
  NewRelease = 0,
  OnSale = 1,
  StaffPick = 2,
  Clearance = 3,
}

function logAlbumStatus(status: AlbumStatus) {
  if (status === AlbumStatus.NewRelease) {
    console.log("No discount available.");
  } else {
    console.log("Discounted price available.");
  }
}
```

You could use `typeof AlbumStatus` to refer to the entire structure of the enum itself:

```typescript
function logAlbumStatus(status: typeof AlbumStatus) {
  // ...implementation
}
```

But then you'd need to pass in a structure matching the enum to the function:

```typescript
logAlbumStatus({
  NewRelease: 0,
  OnSale: 1,
  StaffPick: 2,
  Clearance: 3,
});
```

When used as a type, enums refer to the members of the enum, not the entire enum itself.

### The `this` Keyword

The `this` keyword can also cross between the type and value worlds.

To illustrate, we'll work with this `Song` class that has a slightly different implementation than the one we saw earlier:

```typescript
class Song {
  playCount: number;

  constructor(title: string) {
    this.playCount = 0;
  }

  play(): this {
    this.playCount += 1;
    return this;
  }
}
```

Inside of the `play` method, `this.playCount` uses `this` as a value, to access the `this.playCount` property, but also as a type, to type the return value of the method.

When the `play` method returns `this`, in the type world it signifies that the method returns an instance of the current class.

This means that we can create a new `Song` instance and chain multiple calls to the `play` method:

```tsx
const earworm = new Song("Mambo No. 5", "Lou Bega").play().play().play();
```

`this` is a rare case where `this` and `typeof this` are the same thing. We could replace the `this` return type with `typeof this` and the code would still work the same way:

```typescript
class Song {
  // ...implementation

  play(): typeof this {
    this.playCount += 1;
    return this;
  }
}
```

Both point to the current instance of the class.

### Naming Types & Values the Same

Finally, it's possible to name types and values the same thing. This can be useful when you want to use a type as a value, or a value as a type.

Consider this `Track` object that has been created as a constant, and note the capital "T":

```tsx
export const Track = {
  play: (title: string) => {
    console.log(`Playing: ${title}`);
  },
  pause: () => {
    console.log("Song paused");
  },
  stop: () => {
    console.log("Song stopped");
  },
};
```

Next, we'll create a `Track` type that mirrors the `Track` constant:

```tsx
export type Track = typeof Track;
```

We now have two entities being exported with the same name: one is a value, and the other is a type. This allows `Track` to serve as both when we go to use it.

Pretending we are in a different file, we can import `Track` and use it in a function that only plays "Mambo No. 5":

```tsx
import { Track } from "./other-file";

const mamboNumberFivePlayer = (track: Track) => {
  track.play("Mambo No. 5");
};

mamboNumberFivePlayer(Track);
```

Here, we've used `Track` as a type to type the `track` parameter, and as a value to pass into the `mamboNumberFivePlayer` function.

Hovering over `Track` shows us that it is both a type and a value:

```tsx
// hovering over { Track } shows:

(alias) type Track = {
  play: (title: string) => void;
  pause: () => void;
  stop: () => void;
}

(alias) const Track = {
  play: (title: string) => void;
  pause: () => void;
  stop: () => void;
}
```

As we can see, TypeScript has aliased `Track` to both the type and the value. This means it's available in both worlds.

A simple example would be to assert `Track as Track`:

```tsx
console.log(Track as Track);
//          ^^^^^    ^^^^^
//          value    type
```

TypeScript can seamlessly switch between the two, and this can be quite useful when you want to reuse types as values, or values as types.

This double-duty functionality can prove quite useful, especially when you have things that feel like types that you want to reuse elsewhere in your code.

## `this` in Functions

We've seen how `this` can be used in classes to refer to the current instance of the class. But `this` can also be used in functions and objects.

### `this` with `function`

Here we have an object representing an album that includes a `sellAlbum` function written with the `function` keyword:

```tsx
const solidAir = {
  title: "Solid Air",
  artist: "John Martyn",
  sales: 40000,
  price: 12.99,
  sellAlbum: function () {
    this.sales++;
    console.log(`${this.title} has sold ${this.sales} copies.`);
  },
};
```

Note that inside of the `sellAlbum` function, `this` is used to access the `sales` and `title` properties of the `album` object.

When we call the `sellAlbum` function, it will increment the `sales` property and log the expected message:

```tsx
album.sellAlbum(); // logs "Solid Air has sold 40001 copies."
```

This works because when declaring a function with the `function` keyword, `this` will always refer to the object that the function is a part of. Even when the function implementation is written outside of the object, `this` will still refer to the object when the function is called:

```tsx
function sellAlbum() {
  this.sales++;
  console.log(`${this.title} has sold ${this.sales} copies.`);
}

const album = {
  title: "Solid Air",
  artist: "John Martyn",
  sales: 40000,
  price: 12.99,
  sellAlbum,
};
```

While the `sellAlbum` function works, currently the `this.title` and `this.sales` properties are typed as any. So we need to find some way to type `this` in our function:

Fortunately, we can type `this` as a parameter in the function signature:

```tsx
function sellAlbum(this: { title: string; sales: number }) {
  this.sales++;
  console.log(`${this.title} has sold ${this.sales} copies.`);
}
```

Note that `this` is not a parameter that needs to be passed in when calling the function. It just refers to the object that the function is a part of.

Now, we can pass the `sellAlbum` function to the `album` object:

```tsx
const album = {
  sellAlbum,
};
```

The type checking works in an odd way here - instead of checking `this` immediately, it checks it when the function is called:

```ts twoslash
// @errors: 2684
function sellAlbum(this: { title: string; sales: number }) {
  this.sales++;
  console.log(`${this.title} has sold ${this.sales} copies.`);
}

const album = {
  sellAlbum,
};

// ---cut---
album.sellAlbum();
```

We can fix this by adding the `title` and `sales` properties to the `album` object:

```tsx
const album = {
  title: "Solid Air",
  sales: 40000,
  sellAlbum,
};
```

Now when we call the `sellAlbum` function, TypeScript will know that `this` refers to an object with a `title` property of type `string` and a `sales` property of type `number`.

### Arrow Functions

Arrow functions, unlike, `function` keyword functions, can't be annotated with a `this` parameter:

```ts twoslash
// @errors: 2730
const sellAlbum = (this: { title: string; sales: number }) => {
  // implementation
};
```

This is because arrow functions can't inherit `this` from the scope where they're called. Instead, they inherit `this` from the scope where they're _defined_. This means they can only access `this` when defined inside classes.

## Function Assignability

Let's dive deeper into how functions are compared in TypeScript.

### Comparing Function Parameters

When checking if a function is assignable to another function, not all function parameters need to be implemented. This can be a little surprising.

Imagine that we're building a `handlePlayer` function. This function listens to a music player and calls a user-defined callback when certain events occur. It should be able to accept a callback that has a single parameter for a `filename`:

```typescript
handlePlayer((filename: string) => console.log(`Playing ${filename}`));
```

It should also handle a callback with a `filename` and `volume`:

```tsx
handlePlayer((filename: string, volume: number) =>
  console.log(`Playing ${filename} at volume ${volume}`),
);
```

Finally, it should be able to handle a callback with a `filename`, `volume`, and `bassBoost`:

```tsx
handlePlayer((filename: string, volume: number, bassBoost: boolean) => {
  console.log(`Playing ${filename} at volume ${volume} with bass boost on!`);
});
```

It might be tempting to type `CallbackType` as a union of the three different function types:

```tsx
type CallbackType =
  | ((filename: string) => void)
  | ((filename: string, volume: number) => void)
  | ((filename: string, volume: number, bassBoost: boolean) => void);

const handlePlayer = (callback: CallbackType) => {
  // implementation
};
```

However, this would result in an implicit `any` error when calling `handlePlayer` with both the single and double parameter callbacks:

```ts twoslash
// @errors: 7006
type CallbackType =
  | ((filename: string) => void)
  | ((filename: string, volume: number) => void)
  | ((filename: string, volume: number, bassBoost: boolean) => void);

const handlePlayer = (callback: CallbackType) => {
  // implementation
};
// ---cut---
handlePlayer((filename) => console.log(`Playing ${filename}`));

handlePlayer((filename, volume) =>
  console.log(`Playing ${filename} at volume ${volume}`),
);

handlePlayer((filename, volume, bassBoost) => {
  console.log(`Playing ${filename} at volume ${volume} with bass boost on!`);
}); // no errors
```

This union of functions obviously isn't working. There's a simpler solution.

You can actually remove the first two members of the union and only include the member with all three parameters:

```tsx
type CallbackType = (
  filename: string,
  volume: number,
  bassBoost: boolean,
) => void;
```

Once this change has been made, the implicit `any` errors with the other two callback versions will disappear.

```typescript
handlePlayer((filename) => console.log(`Playing ${filename}`)); // No error

handlePlayer((filename, volume) =>
  console.log(`Playing ${filename} at volume ${volume}`),
); // No error
```

This might seem weird at first - surely these functions are under-specified?

Let's break it down. The callback passed to `handlePlayer` will be called with three arguments. If the callback only accepts one or two arguments, this is fine! No runtime bugs will be caused by the callback ignoring the arguments.

If the callback accepts more arguments than are passed, TypeScript would show an error:

```ts twoslash
// @errors: 2345 7006
type CallbackType = (
  filename: string,
  volume: number,
  bassBoost: boolean,
) => void;

const handlePlayer = (callback: CallbackType) => {
  // implementation
};

// ---cut---
handlePlayer((filename, volume, bassBoost, extra) => {
  console.log(`Playing ${filename} at volume ${volume} with bass boost on!`);
});
```

Since `extra` will never be passed to the callback, TypeScript shows an error.

But again, implementing fewer parameters than expected is fine. To further illustrate, we can see this concept in action when calling `map` on an array:

```tsx
["macarena.mp3", "scatman.wma", "cotton-eye-joe.ogg"].map((file) =>
  file.toUpperCase(),
);
```

`.map` is always called with three arguments: the current element, the index, and the full array. But we don't have to use all of them. In this case, we only care about the `file` parameter.

So, just because a function can receive a certain number of parameters doesn't mean it has to use them all in its implementation.

### Unions of Functions

When creating a union of functions, TypeScript will do something that might be unexpected. It will create an intersection of the parameters.

Consider this `formatterFunctions` object:

```tsx
const formatterFunctions = {
  title: (album: { title: string }) => `Title: ${album.title}`,
  artist: (album: { artist: string }) => `Artist: ${album.artist}`,
  releaseYear: (album: { releaseYear: number }) =>
    `Release Year: ${album.releaseYear}`,
};
```

Each function in the `formatterFunctions` object accepts an `album` object with a specific property and returns a string.

Now, let's create a `getAlbumInfo` function that accepts an `album` object and a `key` that will be used to call the appropriate function from the `formatterFunctions` object:

```tsx
const getAlbumInfo = (album: any, key: keyof typeof formatterFunctions) => {
  const functionToCall = formatterFunctions[key];

  return functionToCall(album);
};
```

We've annotated `album` as `any` for now, but let's take a moment to think: what should it be annotated with?

We can get a clue by hovering over `functionToCall`:

```tsx
// hovering over functionToCall shows:
const functionToCall:
  | ((album: { title: string }) => string)
  | ((album: { artist: string }) => string)
  | ((album: { releaseYear: number }) => string);
```

`functionToCall` is being inferred as a union of the three different functions from the `formatterFunctions` object.

Surely, this means we should call it with a union of the three different types of `album` objects, right?

```ts twoslash
// @errors: 2345
const formatterFunctions = {
  title: (album: { title: string }) => `Title: ${album.title}`,
  artist: (album: { artist: string }) => `Artist: ${album.artist}`,
  releaseYear: (album: { releaseYear: number }) =>
    `Release Year: ${album.releaseYear}`,
};
// ---cut---
const getAlbumInfo = (
  album: { title: string } | { artist: string } | { releaseYear: number },
  key: keyof typeof formatterFunctions,
) => {
  const functionToCall = formatterFunctions[key];

  return functionToCall(album);
};
```

We can see where we've gone wrong from the error. Instead of needing to be called with a union of the three different types of `album` objects, `functionToCall` actually needs to be called with an _intersection_ of them.

This makes sense. In order to satisfy every function, we need to provide an object that has all three properties: `title`, `artist`, and `releaseYear`. If we miss off one of the properties, we'll fail to satisfy one of the functions.

So, we can provide a type that is an intersection of the three different types of `album` objects:

```tsx
const getAlbumInfo = (
  album: { title: string } & { artist: string } & { releaseYear: number },
  key: keyof typeof formatterFunctions,
) => {
  const functionToCall = formatterFunctions[key];

  return functionToCall(album);
};
```

Which can itself be simplified to a single object type:

```tsx
const getAlbumInfo = (
  album: { title: string; artist: string; releaseYear: number },
  key: keyof typeof formatterFunctions,
) => {
  const functionToCall = formatterFunctions[key];

  return functionToCall(album);
};
```

Now, when we call `getAlbumInfo`, TypeScript will know that `album` is an object with a `title`, `artist`, and `releaseYear` property.

```tsx
const formatted = getAlbumInfo(
  {
    title: "Solid Air",
    artist: "John Martyn",
    releaseYear: 1973,
  },
  "title",
);
```

This situation is relatively easy to resolve because each parameter is compatible with the others. But when dealing with incompatible parameters, things can get a bit more complicated. We'll investigate that more in the exercises.

## Exercises

### Exercise 1: Accept Anything Except `null` and `undefined`

Here we have a function `acceptAnythingExceptNullOrUndefined` that hasn't been assigned a type annotation yet:

```ts twoslash
// @errors: 7006
const acceptAnythingExceptNullOrUndefined = (input) => {};
```

This function can be called with a variety of inputs: strings, numbers, boolean expressions, symbols, objects, arrays, functions, regex, and an `Error` class instance:

```typescript
acceptAnythingExceptNullOrUndefined("hello");
acceptAnythingExceptNullOrUndefined(42);
acceptAnythingExceptNullOrUndefined(true);
acceptAnythingExceptNullOrUndefined(Symbol("foo"));
acceptAnythingExceptNullOrUndefined({});
acceptAnythingExceptNullOrUndefined([]);
acceptAnythingExceptNullOrUndefined(() => {});
acceptAnythingExceptNullOrUndefined(/foo/);
acceptAnythingExceptNullOrUndefined(new Error("foo"));
```

None of these inputs should throw an error.

However, as the name of the function suggests, if we pass `null` or `undefined` to the function, we want it to throw an error.

```ts twoslash
// @errors: 2578
const acceptAnythingExceptNullOrUndefined = (input: any) => {};
// ---cut---
acceptAnythingExceptNullOrUndefined(
  // @ts-expect-error
  null,
);
acceptAnythingExceptNullOrUndefined(
  // @ts-expect-error
  undefined,
);
```

Your task is to add a type annotation to the `acceptAnythingExceptNullOrUndefined` function that will allow it to accept any value except `null` or `undefined`.

<Exercise title="Exercise 1: Accept Anything Except `null` and `undefined`" filePath="/src/050-the-weird-parts/150-empty-object-type.problem.ts" resourceId="NMpTvrI4rUCyVa4GW2ViSR"></Exercise>

### Exercise 2: Detecting Excess Properties in an Object

In this exercise, we're dealing with an `options` object along `FetchOptions` interface which specifies `url`, `method`, `headers`, and `body`:

```ts twoslash
// @errors: 2578
interface FetchOptions {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

const options = {
  url: "/",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  // @ts-expect-error
  search: new URLSearchParams({
    limit: "10",
  }),
};
```

Note that the `options` object has an excess property `search` which is not specified in the `FetchOptions` interface, along with a `@ts-expect-error` directive that currently isn't working.

There is also a `myFetch` function which accepts a `FetchOptions` typed object as its argument that doesn't have any errors when called with the `options` object:

```typescript
const myFetch = async (options: FetchOptions) => {};

myFetch(options);
```

Your challenge is to determine why the `@ts-expect-error` directive isn't working, and restructure the code so that it does. Try to solve it multiple ways!

<Exercise title="Exercise 2: Detecting Excess Properties in an Object" filePath="/src/050-the-weird-parts/152-excess-properties-warnings.problem.ts" resourceId="PUZfccUL9g0ocvr45qbRoQ"></Exercise>

### Exercise 3: Detecting Excess Properties in a Function

Here's another exercise where TypeScript does not trigger access property warnings where we might expect.

Here we have a `User` interface with `id` and `name` properties, and a `users` array containing two user objects, "Waqas" and "Zain".

```typescript
interface User {
  id: number;
  name: string;
}

const users = [
  {
    name: "Waqas",
  },
  {
    name: "Zain",
  },
];
```

A `usersWithIds` variable is typed as an array of `User`s. A `map()` function is used to spread the user into a newly created object, with an `id` and an `age` of 30:

```ts twoslash
// @errors: 2578
interface User {
  id: number;
  name: string;
}

const users = [
  {
    name: "Waqas",
  },
  {
    name: "Zain",
  },
];

// ---cut---
const usersWithIds: User[] = users.map((user, index) => ({
  ...user,
  id: index,
  // @ts-expect-error
  age: 30,
}));
```

Despite TypeScript not expecting an `age` on `User`, it doesn't show an error, and at runtime the object will indeed contain an `age` property.

Your task is to determine why TypeScript isn't raising an error in this case, and find two different solutions to make it error appropriately when an unexpected property is added.

<Exercise title="Exercise 3: Detecting Excess Properties in a Function" filePath="/src/050-the-weird-parts/153-excess-properties-warnings-in-functions.problem.ts" resourceId="PUZfccUL9g0ocvr45qbS8Y"></Exercise>

### Exercise 4: Iterating over Objects

Consider an interface `User` with properties `id` and `name`, and a `printUser` function that accepts a `User` as its argument:

```typescript
interface User {
  id: number;
  name: string;
}

function printUser(user: User) {}
```

Inside a test setup, we want to call the `printUser` function with an `id` of `1` and a `name` of "Waqas". The expectation is that the spy on `console.log` will first be called with `1` and then with "Waqas":

```typescript
it("Should log all the keys of the user", () => {
  const consoleSpy = vitest.spyOn(console, "log");

  printUser({
    id: 1,
    name: "Waqas",
  });

  expect(consoleSpy).toHaveBeenCalledWith(1);
  expect(consoleSpy).toHaveBeenCalledWith("Waqas");
});
```

Your task is to implement the `printUser` function so that the test case passes as expected.

Obviously, you could manually log the properties inside of the `printUser` function, but the goal here is to iterate over every property of the object.

Try to solve this exercise with a `for` loop for one solution, and `Object.keys().forEach()` for another. For extra credit, try widening the type of the function parameter beyond `User` for a third solution.

Remember, `Object.keys()` is typed to always return an array of strings.

<Exercise title="Exercise 4: Iterating over Objects" filePath="/src/050-the-weird-parts/154.6-iterating-over-objects.problem.ts" resourceId="PUZfccUL9g0ocvr45qbSW2"></Exercise>

### Exercise 5: Function Parameter Comparisons

Here we have a `listenToEvent` function that takes a callback that can handle a varying number of parameters based on how it's called. Currently the `CallbackType` is set to `unknown`:

```typescript
type Event = "click" | "hover" | "scroll";

type CallbackType = unknown;

const listenToEvent = (callback: CallbackType) => {};
```

For example, we might want to call `listenToEvent` and pass a function that accepts no parameters - in this case, there's no need to worry about arguments at all:

```typescript
listenToEvent(() => {});
```

Alternatively, we could pass a function that expects a single parameter, `event`:

```ts twoslash
// @errors: 7006 2344
import { Equal, Expect } from "@total-typescript/helpers";

type Event = "click" | "hover" | "scroll";

type CallbackType = unknown;

const listenToEvent = (callback: CallbackType) => {};

// ---cut---
listenToEvent((event) => {
  type tests = [Expect<Equal<typeof event, Event>>];
});
```

Stepping up in complexity, we could call it with an `event`, `x`, and `y`:

```ts twoslash
// @errors: 7006 2344
import { Equal, Expect } from "@total-typescript/helpers";

type Event = "click" | "hover" | "scroll";

type CallbackType = unknown;

const listenToEvent = (callback: CallbackType) => {};

// ---cut---
listenToEvent((event, x, y) => {
  type tests = [
    Expect<Equal<typeof event, Event>>,
    Expect<Equal<typeof x, number>>,
    Expect<Equal<typeof y, number>>,
  ];
});
```

Finally, the function could take parameters `event`, `x`, `y`, and `screenID`:

```ts twoslash
// @errors: 7006 2344
import { Equal, Expect } from "@total-typescript/helpers";

type Event = "click" | "hover" | "scroll";

type CallbackType = unknown;

const listenToEvent = (callback: CallbackType) => {};

// ---cut---
listenToEvent((event, x, y, screenId) => {
  type tests = [
    Expect<Equal<typeof event, Event>>,
    Expect<Equal<typeof x, number>>,
    Expect<Equal<typeof y, number>>,
    Expect<Equal<typeof screenId, number>>,
  ];
});
```

In almost every case, TypeScript is giving us errors.

Your task is to update the `CallbackType` to ensure that it can handle all of these cases.

<Exercise title="Exercise 5: Function Parameter Comparisons" filePath="/src/050-the-weird-parts/155-function-parameter-comparisons.problem.ts" resourceId="jUJqrXCHRph0Z4Fs6VxI9r"></Exercise>

### Exercise 6: Unions of Functions with Object Params

Here we are working with two functions: `logId` and `logName`. The `logId` function logs an `id` from an object to the console, while `logName` does the same with a `name`:

These functions are grouped into an array called `loggers`:

```typescript
const logId = (obj: { id: string }) => {
  console.log(obj.id);
};

const logName = (obj: { name: string }) => {
  console.log(obj.name);
};

const loggers = [logId, logName];
```

Inside a `logAll` function, a currently untyped object is passed as a parameter. Each logger function from the `loggers` array is then invoked with this object:

```ts twoslash
// @errors: 7006
const logId = (obj: { id: string }) => {
  console.log(obj.id);
};

const logName = (obj: { name: string }) => {
  console.log(obj.name);
};

const loggers = [logId, logName];

// ---cut---
const logAll = (obj) => {
  loggers.forEach((func) => func(obj));
};
```

Your task is to determine how to type the `obj` parameter to the `logAll` function. Look closely at the type signatures for the individual logger functions to understand what type this object should be.

<Exercise title="Exercise 6: Unions of Functions with Object Params" filePath="/src/050-the-weird-parts/156-unions-of-functions-with-object-params.problem.ts" resourceId="NMpTvrI4rUCyVa4GW2ViZX"></Exercise>

### Exercise 7: Union of Functions With Incompatible Parameters

Here we're working with an object called `objOfFunctions`, which contains functions keyed by `string`, `number`, or `boolean`. Each key has an associated function to process an input of that type:

```typescript
const objOfFunctions = {
  string: (input: string) => input.toUpperCase(),
  number: (input: number) => input.toFixed(2),
  boolean: (input: boolean) => (input ? "true" : "false"),
};
```

A `format` function accepts an input that can either be a `string`, `number`, or `boolean`. From this input, it extracts the type via the regular `typeof` operator, but it asserts the operator to `string`, `number`, or `boolean`.

Here's how it looks:

```ts twoslash
// @errors: 2345
const objOfFunctions = {
  string: (input: string) => input.toUpperCase(),
  number: (input: number) => input.toFixed(2),
  boolean: (input: boolean) => (input ? "true" : "false"),
};

// ---cut---
const format = (input: string | number | boolean) => {
  // 'typeof' isn't smart enough to know that
  // it can only be 'string', 'number', or 'boolean',
  // so we need to use 'as'
  const inputType = typeof input as "string" | "number" | "boolean";
  const formatter = objOfFunctions[inputType];

  return formatter(input);
};
```

The `formatter` which is extracted from `objOfFunctions` ends up typed as a union of functions. This happens because it can be any one of the functions that take either a `string`, `number`, or `boolean`:

```tsx
// hovering over formatter shows:
const formatter:
  | ((input: string) => string)
  | ((input: number) => string)
  | ((input: boolean) => "true" | "false");
```

Currently there's an error on `input` in the return statement of the `format` function. Your challenge is to resolve this error on the type level, even though the code works at runtime. Try to use an assertion for one solution, and a type guard for another.

A useful tidbit - `any` is not assignable to `never`.

<Exercise title="Exercise 7: Union of Functions With Incompatible Parameters" filePath="/src/050-the-weird-parts/157-unions-of-functions.problem.ts" resourceId="Mcr8ILwjCSlKdfKEBg8upM"></Exercise>

### Solution 1: Accept Anything Except `null` and `undefined`

The solution is to add an empty object annotation to the `input` parameter:

```typescript
const acceptAnythingExceptNullOrUndefined = (input: {}) => {};
```

Since the `input` parameter is typed as an empty object, it will accept any value except `null` or `undefined`.

### Solution 2: Detecting Excess Properties in an Object

We aren't seeing an error in the starting point of the exercise because TypeScript's objects are open, not closed. The `options` object has all of the required properties of the `FetchOptions` interface, so TypeScript considers it to be assignable to `FetchOptions` and doesn't care that additional properties were added.

Let's look at a few ways to make the excess property error work as expected:

#### Option 1: Add a Type Annotation

Adding a type annotation to the `options` object will result in an error for the excess property:

```typescript
const options: FetchOptions = {
  url: "/",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  // @ts-expect-error
  search: new URLSearchParams({
    limit: "10",
  }),
};
```

This triggers the excess property error because TypeScript is comparing an object literal to a type directly.

#### Option 2: Use the `satisfies` Keyword

Another way to trigger excess property checking is to add the `satisfies` keyword at the end of the variable declaration:

```tsx
const options = {
  url: "/",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  // @ts-expect-error
  search: new URLSearchParams({
    limit: "10",
  }),
} satisfies FetchOptions;
```

This works for the same reason.

#### Option 3: Inline the Variable

Finally, TypeScript will also check for excess properties if the variable is inlined into the function call:

```typescript
const myFetch = async (options: FetchOptions) => {};

myFetch({
  url: "/",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  // @ts-expect-error
  search: new URLSearchParams({
    limit: "10",
  }),
});
```

In this case, TypeScript will provide an error because it knows that `search` is not part of the `FetchOptions` interface.

Open objects turn out to be more useful than they may initially seem. If excess property checking was performed all the time, as is the case with Flow, it could be a hassle since you'd have to remove the `search` manually before passing it to fetch.

### Solution 3: Detecting Excess Properties in a Function

There are two solutions that we'll look at for this exercise.

#### Option 1: Give the Mapping Function A Return Type

The first way to solve this issue is to annotate the map function.

In this case, the mapping function will take in a `user` that is an object with a `name` string, and an `index` which will be a number.

Then for the return type, we'll specify that it must return a `User` object.

```tsx
const usersWithIds: User[] = users.map(
  (user, index): User => ({
    ...user,
    id: index,
    // @ts-expect-error
    age: 30,
  }),
);
```

With this setup, there will be an error on `age` because it is not part of the `User` type.

#### Option 2: Use `satisfies`

For this solution, we'll use the `satisfies` keyword to ensure that the object returned from the map function satisfies the `User` type:

```tsx
const usersWithIds: User[] = users.map(
  (user, index) =>
    ({
      ...user,
      id: index,
      // @ts-expect-error
      age: 30,
    } satisfies User),
);
```

TypeScript's excess property checks can sometimes lead to unexpected behavior, especially when dealing with function returns. To avoid this issue, always declare the types for variables that may contain excess properties or indicate the expected return types in your functions.

### Solution 4: Iterating over Objects

Let's look at both looping approaches for the `printUser` function.

#### Option 1: Using `Object.keys().forEach()`

The first approach is to use `Object.keys().forEach()` to iterate over the object keys. Inside the `forEach` callback, we'll access the value of the key by using the `key` variable:

```ts twoslash
// @errors: 7053
type User = {
  id: number;
  name: string;
};
// ---cut---
function printUser(user: User) {
  Object.keys(user).forEach((key) => {
    console.log(user[key]);
  });
}
```

This change will have the test case passing, but TypeScript raises a type error on `user[key]`.

The issue is that the `User` interface doesn't have an index signature. In order to get around the type error without modifying the `User` interface, we can use a type assertion on `key` to tell TypeScript that it is of type `keyof User`:

```tsx
console.log(user[key as keyof User]);
```

The `keyof User` will be a union of the property names, such as `id` or `name`. And by using `as`, we are telling TypeScript that `key` is a like a more precise string.

With this change, the error goes away - but our code is a little less safe. If our object has an unexpected key, we might get some odd behavior.

#### Option 2: Using a `for` Loop

The `for` loop approach is similar to the `Object.keys().forEach()` approach. We can use a `for` loop and pass in an object instead of a `user`:

```tsx
function printUser(user: User) {
  for (const key in user) {
    console.log(user[key as keyof typeof user]);
  }
}
```

Like before, we need to use `keyof typeof` because of how TypeScript handles excess property checking.

#### Option 3: Widening the Type

Another approach is to widen the type inside the `printUser` function. In this case, we'll specify that the `user` being passed in is a `Record` with a `string` key and an `unknown` value.

In this case, the object being passed in doesn't have to be a `user` since we're just going to be mapping over every key that it receives:

```tsx
function printUser(obj: Record<string, unknown>) {
  Object.keys(obj).forEach((key) => {
    console.log(obj[key]);
  });
}
```

This works on both the runtime and type levels without error.

#### Option 4: `Object.values`

Another way to iterate over the object is to use `Object.values`:

```tsx
function printUser(user: User) {
  Object.values(user).forEach(console.log);
}
```

This approach avoids the whole issue with the keys, because `Object.values` will return an array of the values of the object. When this option is available, it's a nice way to avoid needing to deal with issue of loosely typed keys.

When it comes to iterating over object keys, there are two main choices for handling this issue: you can either make the key access slightly unsafe via `as keyof typeof`, or you can make the type that's being indexed into looser. Both approaches will work, so it's up to you to decide which one is best for your use case.

### Solution 5: Function Parameter Comparisons

The solution is to type `CallbackType` as a function that specifies each of the possible parameters:

```tsx
type CallbackType = (
  event: Event,
  x: number,
  y: number,
  screenId: number,
) => void;
```

Recall that when implementing a function, it doesn't have to pay attention to every argument that has been passed in. However, it can't use a parameter that doesn't exist in its definition.

By typing `CallbackType` with each of the possible parameters, the test cases will pass regardless of how many parameters are passed in.

### Solution 6: Unions of Functions with Object Params

Hovering over the `loggers.forEach()`, we can see that `func` is a union between two different types of functions:

```ts
const logAll = (obj) => {
  loggers.forEach((func) => func(obj));
};

// Hovering over forEach shows:

(parameter) func: ((obj: {
  id: string;
}) => void) | ((obj: {
  name: string;
}) => void)
```

One function takes in an `id` string, and the other takes in a `name` string.

This makes sense because when we call the array, we don't know which one we're getting at which time.

We can use an intersection type with objects for `id` and `name`:

```tsx
const logAll = (obj: { id: string } & { name: string }) => {
  loggers.forEach((func) => func(obj));
};
```

Alternatively, we could just pass in a regular object with `id` string and `name` string properties. As we've seen, having an extra property won't cause runtime issues and TypeScript won't complain about it:

```tsx
const logAll = (obj: { id: string; name: string }) => {
  loggers.forEach((func) => func(obj));
};
```

In both cases, the result is `func` being a function that contains all of the possibilities of things being passed into it:

```tsx
// hovering over func shows:
(parameter) func: (obj: {
    id: string;
} & {
    name: string;
}) => void
```

This behavior makes sense, and this pattern is useful when working with functions that have varied requirements.

### Solution 7: Union of Functions With Incompatible Parameters

Hovering over the `formatter` function shows us that its `input` is typed as `never` because it's a union of incompatible types:

```tsx
// hovering over formatter shows:
const formatter: (input: never) => string;
```

In order to fix the type-level issue, we can use the `as never` assertion to tell TypeScript that `input` is of type `never`:

```tsx
// inside the format function
return formatter(input as never);
```

This is a little unsafe, but we know from the runtime behavior that `input` will always be a `string`, `number`, or `boolean`.

Funnily enough, `as any` won't work here because `any` is not assignable to `never`:

```ts twoslash
// @errors: 2345
const objOfFunctions = {
  string: (input: string) => input.toUpperCase(),
  number: (input: number) => input.toFixed(2),
  boolean: (input: boolean) => (input ? "true" : "false"),
};

// ---cut---
const format = (input: string | number | boolean) => {
  const inputType = typeof input as "string" | "number" | "boolean";
  const formatter = objOfFunctions[inputType];

  return formatter(input as any);
};
```

Another way to solve this issue is to give up on our union of functions by narrowing down the type of `input` before calling `formatter`:

```tsx
const format = (input: string | number | boolean) => {
  if (typeof input === "string") {
    return objOfFunctions.string(input);
  } else if (typeof input === "number") {
    return objOfFunctions.number(input);
  } else {
    return objOfFunctions.boolean(input);
  }
};
```

This solution is more verbose and won't compile down as nicely as `as never`, but it will fix the error as expected.


--- CHAPTER ---

In this chapter, we'll be diving deeper into modules. First, we'll look at how TypeScript understands global scope by looking at the distinction between 'modules' and 'scripts'. Second, we'll look at declaration files - `.d.ts files` - and introduce the `declare` keyword.

## Understanding Modules and Scripts

TypeScript has two ways of understanding what a `.ts` file is. It can be treated either as a module, containing imports and exports, or a script, which executes in the global scope.

### Modules Have Local Scope

A module is an isolated piece of code which can be imported to other modules as needed. Modules have their own scope, meaning that variables, functions, and types defined within a module are not accessible from other files unless they are explicitly exported.

Consider this `constants.ts` module that defines a `DEFAULT_VOLUME` constant:

```typescript
const DEFAULT_VOLUME = 90;
```

Without being imported, the `DEFAULT_VOLUME` constant is not accessible from other files:

```ts twoslash
// @errors: 2304
// inside of index.ts
console.log(DEFAULT_VOLUME);
```

In order to use the `DEFAULT_VOLUME` constant in the `index.ts` file, it must be imported from the `constants.ts` module:

```typescript
// inside of index.ts
import { DEFAULT_VOLUME } from "./constants";

console.log(DEFAULT_VOLUME); // 90
```

TypeScript has a built-in understanding of modules and, by default, will treat any file that contains an `import` or `export` statement as a module.

### Scripts Have Global Scope

Scripts, on the other hand, execute in the global scope. Any variables, functions, or types defined in a script file are accessible from anywhere in the project without the need for explicit imports. This behavior is similar to traditional JavaScript, where scripts are included in HTML files and executed in the global scope.

If a file does not contain any `import` or `export` statements, TypeScript will treat it as a script. If we remove the `export` keyword from the `DEFAULT_VOLUME` constant in the `constants.ts` file, it will be treated as a script:

```typescript
// inside of constants.ts
const DEFAULT_VOLUME = 90;
```

Now, we no longer need to import the `DEFAULT_VOLUME` constant in the `index.ts` file:

```ts twoslash
declare const DEFAULT_VOLUME: 90;
// ---cut---
// inside of index.ts

console.log(DEFAULT_VOLUME);
//          ^?
```

This behavior might be surprising to you - let's figure out why TypeScript does this.

### TypeScript Has To Guess

TypeScript is, at this point, pretty old. It's actually older than `import` and `export` statements being part of JavaScript. When TypeScript was first created, it was mostly used to create _scripts_, not modules.

So TypeScript's default behavior is to _guess_ whether your file is supposed to be treated like a module or script. As we've seen, it does this by looking for `import` and `export` statements.

But whether your code is treated like a module or a script is not actually decided by TypeScript - it's decided by the environment in which the code executes.

Even in the browser, you can opt in to using modules by adding the `type="module"` attribute to your script tag:

```html
<script type="module" src="index.js"></script>
```

This means your JavaScript file will be treated as a module. But remove the `type="module"` attribute, and your JavaScript file will be treated as a script.

So, TypeScript's default is relatively sensible, seeing as it can't know how your code will be executed.

But these days, 99% of the code you'll be writing will be in modules. So this automatic detection can lead to frustrating situations:

### "Cannot redeclare block-scoped variable"

Let's imagine you create a new TypeScript file, `utils.ts`, and add a `name` constant:

```ts twoslash
// @errors: 2451
// @moduleDetection: auto
const name = "Alice";
```

You'll be greeted with a surprising error. This error is telling you that you can't declare `name`, because it's already been declared.

A curious way to fix this is to add an empty export statement at the end of the file:

```typescript
const name = "Alice";

export {};
```

The error disappears. Why?

Let's use what we've already learned to figure this out. We don't have any `import` or `export` statements in `utils.ts`, so TypeScript treats it as a script. This means that `name` is declared in the global scope.

It turns out that in the DOM, there is already a global variable called [`name`](https://developer.mozilla.org/en-US/docs/Web/API/Window/name). This lets you set targets for hyperlinks and forms. So when TypeScript sees `name` in a script, it gives you an error because it thinks you're trying to redeclare the global `name` variable.

By adding the `export {}` statement, you're telling TypeScript that `utils.ts` is a module, and `name` is now scoped to the module, not the global scope.

This accidental collision is a good example of why it's a good idea to treat all your files as modules. Fortunately, TypeScript gives us a way to do it.

### Forcing Modules With `moduleDetection`

The `moduleDetection` setting determines how functions and variables are scoped in your project. There are three different options available: `auto`, `force`, and `legacy`.

By default, it's set to `auto` which corresponds to the behavior we've seen above. The `force` setting will treat all files as modules, regardless of the presence of `import` or `export` statements. `legacy` can be safely ignored, as it's only used for compatibility with older versions of TypeScript.

Updating `tsconfig.json` to specify `moduleDetection` to `force` is straightforward:

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...other options...
    "moduleDetection": "force"
  }
}
```

After this change, all files in the project will be treated as modules, and you will need to use `import` and `export` statements to access functions and variables across files. This helps align your development environment more closely with real-world scenarios while reducing unexpected errors.

## Declaration Files

Declaration files are files in TypeScript which have a special extension: `.d.ts`. These files are used for two main purposes in TypeScript: describing JavaScript code, and adding types to the global scope. We'll explore both below.

### Declaration Files Describe JavaScript

Let's say part of our codebase is written in JavaScript, and we want to keep it that way. We have a `musicPlayer.js` file that exports a `playTrack` function:

```javascript
// musicPlayer.js

export const playTrack = (track) => {
  // Complicated logic to play the track...
  console.log(`Playing: ${track.title}`);
};
```

If we try to import this file into a TypeScript file, we'll get an error:

```ts twoslash
// @errors: 2307
// inside of app.ts

import { playTrack } from "./musicPlayer";
```

This error occurs because TypeScript doesn't have any type information for the `musicPlayer.js` file. To fix this, we can create a declaration file with the same name as the JavaScript file, but with a `.d.ts` extension:

```typescript
// musicPlayer.d.ts
export function playTrack(track: {
  title: string;
  artist: string;
  duration: number;
}): void;
```

It's important to notice that this file doesn't contain any implementation code. It only describes the types of the functions and variables in the JavaScript file.

Now, when we import the `musicPlayer.js` file into a TypeScript file, the error will be resolved, and we can use the `playTrack` function as expected:

```typescript
// inside of app.ts

import { playTrack } from "./musicPlayer";

const track = {
  title: "Otha Fish",
  artist: "The Pharcyde",
  duration: 322,
};

playTrack(track);
```

Types and interfaces can also be declared and exported in declaration files:

```tsx
// inside of musicPlayer.d.ts
export interface Track {
  title: string;
  artist: string;
  duration: number;
}

export function playTrack(track: Track): void;
```

Just like in `.ts` files, these can also be imported and used in other TypeScript files:

```tsx
// inside of app.ts

import { Track, playTrack } from "./musicPlayer";
```

It's important to note that declaration files are not checked against the JavaScript files they describe. We can very easily make a mistake in our declaration file, such as changing `playTrack` to `playTRACK`, and TypeScript won't complain.

So, describing JavaScript files by hand can be error-prone - and not usually recommended.

### Declaration Files Can Add To The Global Scope

Just like regular TypeScript files, declaration files can be treated as either modules or scripts based on whether or not the `export` keyword is used. In the example above, `musicPlayer.d.ts` is treated as a module because it includes the `export` keyword.

This means that without an `export`, declaration files can be used to add types to the global scope. Even setting `moduleDetection` to `force` won't change this behavior - `moduleDetection` is always set to `auto` for `.d.ts` files.

For example, we could create an `Album` type that we want to be used across the entire project:

```tsx
// inside of global.d.ts

type Album = {
  title: string;
  artist: string;
  releaseDate: string;
};
```

Now, the `Album` type is available globally and can be used in any TypeScript file without needing to import it. We'll discuss whether this is a good idea later in this chapter.

### Declaration Files Can't Contain Implementations

What would happen if we tried to write normal TypeScript inside our `.d.ts` file?

```ts
export function playTrack(track: {
  title: string;
  artist: string;
  duration: number;
}) {
  // red squiggly line under {
  console.log(`Playing: ${track.title}`);
}

// Hovering over the error shows:
// An implementation cannot be declared in ambient contexts.
```

We get an error! TypeScript doesn't allow us to include any implementation code inside a declaration file. Declaration files completely disappear at runtime, so they can't contain any code that would be executed.

#### What Is An "Ambient Context"?

The phrase 'ambient' might be confusing. TypeScript uses it to mean ['without implementation'](https://github.com/Microsoft/TypeScript-Handbook/issues/180#issuecomment-195446760). Since declaration files can't contain implementations, everything inside is considered 'ambient'. We'll dive deeper into this in the next section.

## The `declare` Keyword

The `declare` keyword lets you define ambient values in TypeScript. It can be used to declare variables, define a global scope with `declare global` or augment module types with `declare module`.

### `declare const/var/let/function`

`declare` can be used to define values which don't have an implementation. This can be useful in a variety of ways. Let's look at how it can help with typing.

#### Typing Global Variables

Let's say we have a global variable `MUSIC_API`. This isn't defined in our code, but it's available in the environment via a script tag:

```html
<script src="/music-api.js"></script>
```

This variable is available anywhere in our codebase. So, let's put it in a declaration file.

We can create a `musicApi.d.ts` file and declare the `MUSIC_API` variable:

```typescript
// inside musicApi.d.ts

type Album = {
  title: string;
  artist: string;
  releaseDate: string;
};

declare const ALBUM_API: {
  getAlbumInfo(upc: string): Promise<Album>;
  searchAlbums(query: string): Promise<Album[]>;
};
```

Because we haven't included any imports or exports, this file is treated as a script. This means that the `ALBUM_API` variable is now available globally in our project.

#### Scoping Global Variables To One File

What if we want to limit the scope of `MUSIC_API` to a single file, `musicUtils.ts`? We can actually move the `declare const` statement inside the file:

```typescript
// inside musicUtils.ts

type Album = {
  title: string;
  artist: string;
  releaseDate: string;
};

declare const ALBUM_API: {
  getAlbumInfo(upc: string): Promise<Album>;
  searchAlbums(query: string): Promise<Album[]>;
};

export function getAlbumTitle(upc: string) {
  return ALBUM_API.getAlbumInfo(upc).then((album) => album.title);
}
```

Now, `ALBUM_API` is only available in the `musicUtils.ts` file. `declare` defines the value within the scope it's currently in. So, because we're now inside a module (due to the `export` statement), `ALBUM_API` is scoped to this module.

#### `declare const`, `declare var`, `declare let`, `declare function`

You might have noticed that we used `declare const` in the examples above. But you can also use `declare var`, `declare let`, and `declare function`. They all do the same thing - declare a value without an implementation.

Here are some examples of the syntax:

```typescript
declare const MY_CONSTANT: number;
declare var MY_VARIABLE: string;
declare let MY_LET: boolean;
declare function myFunction(): void;
```

### `declare global`

`declare global` lets you add things to the global scope from within modules. This can be useful when you want to colocate global types with the code that uses them.

To do this, we can wrap our `declare const` statement in a `declare global` block:

```ts twoslash
// @errors: 1038
type Album = {
  title: string;
  artist: string;
  releaseDate: string;
};

// ---cut---
// inside musicUtils.ts
declare global {
  declare const ALBUM_API: {
    getAlbumInfo(upc: string): Promise<Album>;
    searchAlbums(query: string): Promise<Album[]>;
  };
}
```

This almost works, except for the error. We can't use `declare` inside an ambient context: the `declare global` block is already ambient. So, we can remove the `declare` keyword:

```typescript
// inside musicUtils.ts

declare global {
  const ALBUM_API: {
    getAlbumInfo(upc: string): Promise<Album>;
    searchAlbums(query: string): Promise<Album[]>;
  };
}
```

Now the `ALBUM_API` variable has been put into the global scope.

### `declare module`

There are some situations where you need to declare types for a module that either doesn't have type definitions or is not included in the project directly.

In these cases, you can use the `declare module` syntax to define types for the module.

For example, say we are working with a `duration-utils` module that doesn't have type definitions.

The first step would be to create a new file named `duration-utils.d.ts`. Then at the top of the file, the `declare module` syntax is used to define the types for the module:

```typescript
declare module "duration-utils" {
  export function formatDuration(seconds: number): string;
}
```

We use `export` to define what is being exported from the module.

Like before, we are not including any implementation code in the `.d.ts` file – it's just the types that are being declared.

Once the `duration-utils.d.ts` file is created, the module can be imported and used as usual:

```typescript
import { formatDuration, parseTrackData } from "duration-utils";

const formattedTime = formatDuration(309);
```

Just like normal declaration files, the types you add are not checked against the actual module - so it's important to keep them up to date.

### Module Augmentation vs Module Overriding

When using `declare module`, you can either augment an existing module or override it completely. Augmenting a module means appending new types to an existing module. Overriding a module means replacing the existing types with new ones.

Choosing which you're doing depends on whether you're inside a module or a script.

#### Inside a Module, `declare module` Augments

If you're inside a module, `declare module` will augment the targeted module. For instance, you can add a new type to the `express` module:

```typescript
// inside express.d.ts
declare module "express" {
  export interface MyType {
    hello: string;
  }
}

export {}; // Adding an export turns this .d.ts file into a module
```

Now, across our project, we can import `MyType` from the `express` module:

```typescript
// anywhere.ts
import { MyType } from "express";
```

We don't need to put this in a declaration file. We can get exactly the same behavior by changing `express.d.ts` to `express.ts`.

This example is a little bit silly - there's no real use case for adding your own type to a module. But we'll see later that augmenting the types of modules can be extremely useful.

#### Inside a Script, `declare module` Overrides

Let's go back to our `express.d.ts` file. If we remove the `export {}` statement, it will be treated as a script:

```typescript
// inside express.d.ts

declare module "express" {
  export interface MyType {
    hello: string;
  }
}
```

Now, we've completely overridden the `express` module. This means that the `express` module no longer has any exports except for `MyType`:

```ts
// anywhere.ts
import { Express } from "express"; // red squiggly line under "Express"
```

Just like module augmentation, we can get the same behavior by changing `express.d.ts` to `express.ts` (if `moduleDetection` is set to `auto`).

So, just the presence or absence of an `export` statement can radically change the behavior of `declare module`.

Overriding is occasionally useful when you want to completely replace the types of a module, perhaps when a third-party library has incorrect types.

## Declaration Files You Don't Control

You might think that declaration files are a relatively niche feature of TypeScript. But in every project you create, you're likely using hundreds of declaration files. They either ship with libraries, or come bundled with TypeScript itself.

### TypeScript's Types

Whenever you use TypeScript, you're also using JavaScript. JavaScript has many built-in constants, functions and objects that TypeScript needs to know about. A classic example are the array methods.

```ts
const numbers = [1, 2, 3];

numbers.map((n) => n * 2);
```

Let's step back for a minute. How does TypeScript know that `.map` exists on an array? How does it know that `.map` exists, but `.transform` doesn't? Where is this defined?

As it turns out, TypeScript ships with a bunch of declaration files that describe the JavaScript environment. We can do a 'go to definition' on `.map` to see where that is:

```ts
// inside lib.es5.d.ts

interface Array<T> {
  // ... other methods ...
  map<U>(
    callbackfn: (value: T, index: number, array: T[]) => U,
    thisArg?: any,
  ): U[];
}
```

We've ended up in a file called `lib.es5.d.ts`. This file is part of TypeScript, and describes what JavaScript looked like in ES5, a version of JavaScript from 2009. This is when `.map` was introduced to JavaScript.

Another example would be `.replaceAll` on strings:

```ts
const str = "hello world";

str.replaceAll("hello", "goodbye");
```

Doing a 'go to definition' on `.replaceAll` will take you to a file called `lib.es2021.string.d.ts`. This file describes the string methods that were introduced in ES2021.

Looking at the code in `node_modules/typescript/lib`, you'll see dozens of declaration files that describe the JavaScript environment.

Understanding how to navigate these declaration files can be very useful for fixing type errors. Take a few minutes to explore what's in `lib.es5.d.ts` by using 'go to definition' to navigate around.

#### Choosing Your JavaScript Version With `lib`

The `lib` setting in `tsconfig.json` lets you choose which `.d.ts` files are included in your project. Choosing `es2022` will give you all the JavaScript features up to ES2022. Choosing `es5` will give you all the features up to ES5.

```json
{
  "compilerOptions": {
    "lib": ["es2022"]
  }
}
```

By default, this inherits from the `target` setting, which we'll look at in the chapter on configuring TypeScript.

#### DOM Types

Another set of declaration files that ship with TypeScript are the DOM types. These describe the browser environment, and include types for `document`, `window`, and all the other browser globals.

```ts
document.querySelector("h1");
```

If you do a 'go to definition' on `document`, you'll end up in a file called `lib.dom.d.ts`.

```ts
declare var document: Document;
```

This file declares the `document` variable as type `Document`, using the `declare` keyword we saw earlier.

To include these in your project, you can specify them in the `lib` setting, along with the JavaScript version:

```json
{
  "compilerOptions": {
    "lib": ["es2022", "dom", "dom.iterable"]
  }
}
```

`dom.iterable` includes the types for the iterable DOM collections, like `NodeList`.

If you don't specify `lib`, TypeScript will include `dom` by default alongside the JavaScript version chosen in `target`:

```json
{
  "compilerOptions": {
    "target": "es2022"
    // "lib": ["es2022", "dom", "dom.iterable"] is implied
  }
}
```

Just like the JavaScript versions, you can use 'go to definition' to explore the DOM types and see what's available. At the time of writing, it's over 28,000 lines long - but understanding what's in there over a period of time can be very useful.

#### Which DOM Types Get Included?

Different browsers support different features. A quick browse of [caniuse.com](https://caniuse.com/) will show how patchy browser support can be for certain features.

But TypeScript only ships one set of DOM types. So how does it know what to include?

TypeScript's policy is that if a feature is supported in two major browsers, it's included in the DOM types. This is a good balance between including everything and including nothing.

### Types That Ship With Libraries

When you install a library with npm, you're downloading JavaScript to your file system. To make that JavaScript work with TypeScript, authors will often include declaration files alongside them.

For example, we'll look at Zod – a popular library that allows for validating data at runtime.

After running the installation command `pnpm i zod`, a new `zod` subdirectory will be created inside of `node_modules`. Inside, you'll find a `package.json` file with a `types` key that points to the type definitions for the library:

```tsx
// inside node_modules/zod/package.json
{
  "types": "index.d.ts",
  // other keys...
}
```

Inside of `index.d.ts` are the type definitions for the `zod` library:

```tsx
// inside node_modules/zod/index.d.ts
import * as z from "./external";
export * from "./external";
export { z };
export default z;
```

Additionally, every `.js` file inside of the `lib` folder has a corresponding `.d.ts` file that contains the type definitions for the JavaScript code.

Just like the DOM types, you can use 'go to definition' to explore the types that ship with libraries. Understanding these types can help you use the library more effectively.

### DefinitelyTyped

Not every library bundles `.d.ts` files alongside the JavaScript you download. This was a big issue in TypeScript's early days, when most open source packages weren't written in TypeScript.

The [`DefinitelyTyped` GitHub repository](https://github.com/DefinitelyTyped/DefinitelyTyped) was built to house high-quality type definitions for numerous popular JavaScript libraries that didn't ship definitions of their own. It's now one of the largest open source repositories on GitHub.

By installing a package with `@types/*` and your library as a dev dependency, you can add type definitions that TypeScript will be able to use immediately.

For example, say you're using the `diff` library to check for the difference between two strings:

```tsx
import Diff from "diff"; // red squiggly line under "diff"

const message1 = "Now playing: 'Run Run Run'";
const message2 = "Now playing: 'Bye Bye Bye'";

const differences = Diff.diffChars(message1, message2);
```

TypeScript reports an error underneath the `import` statement because it can't find type definitions, even though the library is installed over 40 million times a week from NPM:

```txt
hovering over "diff" shows:
Could not find a declaration file for module 'diff'. Try `npm install --save-dev @types/diff` if it exists or add a new declaration (.d.ts) file containing `declare module 'diff';`
```

Since we're using `pnpm` instead of `npm`, our installation command looks like this:

```bash
pnpm i -D @types/diff
```

Once the type definitions from DefinitelyTyped are installed, TypeScript will recognize the `diff` library and provide type checking and autocompletion for it:

```tsx
// hovering over differences shows:
const differences: Diff.Change[];
```

This is a great solution for libraries that haven't been updated in a while, or for more commonly-used libraries (like, say, React) that don't ship with type definitions.

### `skipLibCheck`

As we've seen, your project can contain hundreds of declaration files. By default, TypeScript considers these files as part of your project. So, it checks them for type errors every single time.

This can result in extremely frustrating situations where a type error in a third-party library can prevent your project from compiling.

To avoid this, TypeScript has a `skipLibCheck` setting. When set to `true`, TypeScript will skip checking declaration files for type errors.

```json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

This is a must-have in any TypeScript project because of the sheer number of declaration files that are included. Adding this setting speeds up compilation and prevents unnecessary errors.

#### The Downsides of `skipLibCheck`

`skipLibCheck` comes with one enormous downside, though. It doesn't just skip declaration files in `node_modules` - it skips _all_ declaration files.

This means that if you make a mistake authoring a declaration file, TypeScript won't catch it. This can lead to bugs that are difficult to track down.

This is one of my main gripes with TypeScript - `skipLibCheck` is a must-have, because of the danger of incorrect third-party declaration files. But it also makes authoring your own declaration files much harder.

## Authoring Declaration Files

Now we know how to use declaration files, and their downsides (thanks to `skipLibCheck`), let's look at their use cases.

### Augmenting Global Types

The most common use for declaration files is describing the global scope of your project. We've seen how you can use `declare const` in a script file to add a global variable.

You can also use declaration merging, a feature we saw earlier, to append to existing interfaces and namespaces.

As a reminder, declaration merging is when you define a type or interface with the same name as an existing type or interface. TypeScript will merge the two together.

This means that any interface declared in a declaration file is fair game for augmentation. For example, `lib.dom.d.ts` contains a `Document` interface. Let's imagine we want to add a `foo` property to it.

We can create a `global.d.ts` file and declare a new `Document` interface:

```tsx
// inside global.d.ts

interface Document {
  foo: string;
}
```

This declaration file is being treated as a script, so the `Document` interface merges with the existing one.

Now, across our project, the `Document` interface will have a `foo` property:

```tsx
// inside app.ts

document.foo = "hello"; // No error!
```

This can be extremely useful for describing JavaScript globals that TypeScript doesn't know about.

We'll see more examples of these in the exercises section.

### Typing Non-JavaScript Files

In some environments like Webpack, it's possible to import files like images that will end up being incorporated into the bundle with a string identifier.

Consider this example where several `.png` images are imported. TypeScript doesn't typically recognize PNG files as modules, so it reports an error underneath each import statement:

```ts twoslash
// @errors: 2307
import pngUrl1 from "./example1.png";
import pngUrl2 from "./example2.png";
```

The `declare module` syntax can help. We can use it to declare types for non-JavaScript files.

To add support for the `.png` imports, create a new file `png.d.ts`. Inside of the file, we'll start with `declare module` but since we can't use relative module names, we'll use a wildcard `*` to match any `*.png` file. Inside of the declaration, we'll say that `png` is a string and export it as the default:

```tsx
// inside png.d.ts
declare module "*.png" {
  const png: string;

  export default png;
}
```

With the `png.d.ts` file in place, TypeScript will recognize the imported `.png` files as strings without reporting any errors.

### Should You Store Your Types In Declaration Files?

A common misconception among TypeScript developers is that declaration files are where you store your types. You'd create a `types.d.ts` file:

```tsx
// types.d.ts
export type Example = string;
```

Then you'd import this file in your TypeScript files:

```tsx
// index.ts
import { Example } from "./types";

const myFunction = (example: Example) => {
  console.log(example);
};
```

This is a relatively natural thing to get wrong. A 'declaration file'? Sounds like where you put your type declarations.

But this is a bad idea. `skipLibCheck` will ignore these files, meaning you won't get type checking on them. This means that you should use as few declaration files as possible to mitigate the risk of bugs.

Instead, put your types in regular TypeScript files.

### Is Using Global Types A Good Idea?

Across your project, you'll end up with several commonly-used types. For example, you might have a `User` type that's used in many different files.

One option is to put these into the global scope to avoid importing them everywhere. This can be done by using a `.d.ts` file as a script, or using `declare global` in a `.ts` file.

However, I don't recommend you do this. Polluting the global scope with types can turn your project into a mess of implicit dependencies. It can be hard to know where a type is coming from, and can make refactoring difficult.

As your project grows, you'll get naming conflicts between types. Two different parts of your system might define a `User` type, leading to confusion.

Instead, I recommend you import types explicitly. This makes it clear where a type is coming from, makes your system more portable, and makes refactoring easier.

## Exercises

### Exercise 1: Typing a JavaScript Module

Consider this `example.js` JavaScript file that exports `myFunc`:

```javascript
// example.js
export const myFunc = () => {
  return "Hello World!";
};
```

The `myFunc` function is then imported inside of a TypeScript `index.ts` file:

```tsx
// index.ts
import { myFunc } from "./example"; // red squiggly line under ./example

myFunc();
```

However, there is an error in the import statement because TypeScript expects a declaration file for this JavaScript module:

```tsx
// hovering over the error shows:
Could not find a declaration file for module './example'.
```

Your task is to create a declaration file for the `example.js` file.

<Exercise title="Exercise 1: Typing a JavaScript Module" filePath="/src/060-modules-scripts-and-declaration-files/164-declaration-files-can-be-used-to-type-js-files.problem"></Exercise>

### Exercise 2: Ambient Context

Consider a variable called `state` that is returned from a global `DEBUG.getState()` function:

```tsx
const state = DEBUG.getState(); // red squiggly line under DEBUG

type test = Expect<Equal<typeof state, { id: string }>>;
```

Here, `DEBUG` acts like a global variable. In our hypothetical project, `DEBUG` is only referenced in this file and is introduced into the global scope by an external script that we don't have control over.

Currently, there is an error below `DEBUG` because TypeScript cannot resolve the type of `state` returned by `DEBUG.getState()`.

As seen in the test, we expect `state` to be an object with an `id` of type `string`, but TypeScript currently interprets it as `any`:

```tsx
// hovering over state shows:
const state: any;
```

Your task is to specify that `DEBUG` is available in this module (and this module only) without needing to provide its implementation. This will help TypeScript understand the type of `state` and provide the expected type checking.

<Exercise title="Exercise 2: Ambient Context" filePath="/src/060-modules-scripts-and-declaration-files/166-ambient-context-and-declare-const.problem"></Exercise>

### Exercise 3: Modifying `window`

Let's imagine now that we want our `DEBUG` object to only be accessible through the `window` object:

```ts twoslash
// @errors: 2339
import { Equal, Expect } from "@total-typescript/helpers";
// ---cut---
// inside index.ts

const state = window.DEBUG.getState(); // red squiggly line under DEBUG

type test = Expect<Equal<typeof state, { id: string }>>;
```

We expect `state` to be an object with an `id` string property, but it is currently typed as `any`.

There's also an error on `DEBUG` that tells us TypeScript doesn't see the `DEBUG` type.

Your task is to specify that `DEBUG` is available on the `window` object. This will help TypeScript understand the type of `state` and provide the expected type checking.

<Exercise title="Exercise 3: Modifying `window`" filePath="/src/065-types-you-dont-control/174.5-modifying-window.problem"></Exercise>

### Exercise 4: Modifying `process.env`

Node.js introduces a global entity called `process`, which includes several properties that are typed with `@types/node`.

The `env` property is an object encapsulating all the environment variables that have been incorporated into the current running process. This can come in handy for feature flagging or for pinpointing different APIs across various environments.

Here's an example of using an `envVariable`, along with a test that checks to see if it is a string:

```ts twoslash
// @errors: 2344
import { Equal, Expect } from "@total-typescript/helpers";

declare const process: {
  env: Record<string, string | undefined>;
};

// ---cut---
const envVariable = process.env.MY_ENV_VAR;

type test = Expect<Equal<typeof envVariable, string>>;
```

TypeScript isn't aware of the `MY_ENV_VAR` environment variable, so it can't be certain that it will be a string. Thus, the `Equal` test fails because `envVariable` is typed as `string | undefined` instead of just `string`.

Your task is to determine how to specify the `MY_ENV_VAR` environment variable as a string in the global scope. This will be slightly different than the solution for modifying `window` in the first exercise.

Here are a couple of hints to help you out:

Inside of `@types/node` from DefinitelyTyped, the `ProcessEnv` interface is responsible for environment variables. It can be found inside of the `NodeJS` namespace. You might need to revisit previous chapters to refresh your memory on declaration merging of types and namespaces in order to solve this exercise.

<Exercise title="Exercise 4: Modifying `process.env`" filePath="/src/065-types-you-dont-control/175.5-modifying-process-env.problem"></Exercise>

### Solution 1: Typing a JavaScript Module

The solution is to create a declaration file alongside the JavaScript file with a matching name. In this case, the declaration file should be named `example.d.ts`. Inside of the declaration file, we declare the `myFunc` function with its type signature:

```tsx
// example.d.ts
export function myFunc(): string;

export {};
```

With `example.d.ts` in place, the import statement in `index.ts` will no longer show an error.

### Solution 2: Ambient Context

The first step is to use `declare const` to simulate a global variable within the local scope of the module. We'll start by declaring `DEBUG` as an empty object:

```tsx
declare const DEBUG: {};
```

Now that we've typed `DEBUG`, the error message has moved to be under `getState()`:

```ts twoslash
// @errors: 2339
import { Equal, Expect } from "@total-typescript/helpers";
declare const DEBUG: {};
// ---cut---
const state = DEBUG.getState();

type test = Expect<Equal<typeof state, { id: string }>>;
```

Referencing the test, we can see the `DEBUG` needs a `getState` property that returns an object with an `id` of type `string`. We can update the `DEBUG` object to reflect this:

```tsx
declare const DEBUG: {
  getState: () => {
    id: string;
  };
};
```

With this change, our errors have been resolved!

### Solution 3: Modifying `window`

The first thing we'll do is create a new `window.d.ts` declaration file in the `src` directory. We need this file to be treated as a script in order to access the global scope, so we will not include the `export` keyword.

Inside the file, we'll create a new `interface` named `Window` that extends the built-in `Window` interface in `lib.dom.d.ts`. This will allow us to add new properties to the `Window` interface. In this case, the `DEBUG` property with the `getState` method:

```tsx
// window.d.ts
interface Window {
  DEBUG: {
    getState: () => {
      id: string;
    };
  };
}
```

With this change, the errors have been resolved.

#### Alternative Solution

An alternative solution would be to use `declare global` with the interface directly in the `index.ts` file:

```tsx
// index.ts
const state = window.DEBUG.getState();

type test = Expect<Equal<typeof state, { id: string }>>;

declare global {
  interface Window {
    DEBUG: {
      getState: () => {
        id: string;
      };
    };
  }
}
```

Either approach will work, but often keeping the global types in a separate file can make them easier to find.

### Solution 4: Modifying `process.env`

There are two options for modifying the global scope in TypeScript: using `declare global` or creating a `.d.ts` declaration file.

For this solution, we'll create a `process.d.ts` file in the `src` directory. It doesn't matter what we call it, but `process.d.ts` indicates that we're modifying the `process` object.

Since we know that `ProcessEnv` is inside of the `NodeJS` namespace, we'll use `declare namespace` to add our own properties to the `ProcessEnv` interface.

In this case, we'll declare a namespace `NodeJS` that contains an interface `ProcessEnv`. Inside will be our property `MY_ENV_VAR` of type `string`:

```tsx
// src/process.d.ts

declare namespace NodeJS {
  interface ProcessEnv {
    MY_ENV_VAR: string;
  }
}
```

With this new file in place, we can see that `MY_ENV_VAR` is now recognized as a string in `index.ts`. The error is resolved, and we have autocompletion support for the variable.

Remember, just because the error is resolved, it doesn't mean that `MY_ENV_VAR` will actually be a string at runtime. This update is merely a contract we're setting up with TypeScript. We still need to make sure that this contract is respected in our runtime environment.


--- CHAPTER ---

We've dipped into TypeScript's `tsconfig.json` configuration file a few times in this book. Let's take a deeper look. We won't cover every option in `tsconfig.json` - many of them are old and rarely used - but we'll cover the most important ones.

## Recommended Configuration

To start, here's a recommended base `tsconfig.json` configuration with options appropriate for most applications you're building:

```json
{
  "compilerOptions": {
    /* Base Options: */
    "skipLibCheck": true,
    "target": "es2022",
    "esModuleInterop": true,
    "allowJs": true,
    "resolveJsonModule": true,
    "moduleDetection": "force",
    "isolatedModules": true,
    "strict": true,
    "noUncheckedIndexedAccess": true
}
```

Here's what each setting does:

- `skipLibCheck`: Skips type checking of declaration files, which improves compilation speed. We covered this in the previous chapter.
- `target`: Specifies the ECMAScript target version for the compiled JavaScript code. Targeting `es2022` provides access to some relatively recent JavaScript features - but by the time you read this book, you might want to target a newer version.
- `esModuleInterop`: Enables better compatibility between CommonJS and ES modules.
- `allowJs`: Allows JavaScript files to be imported into the TypeScript project.
- `resolveJsonModule`: Allows JSON files to be imported into your TypeScript project.
- `moduleDetection`: The `force` option tells TypeScript to treat all `.ts` files as a module, instead of a script. We covered this in the previous chapter.
- `isolatedModules`: Ensures that each file can be independently transpiled without relying on information from other files.
- `strict`: Enables a set of strict type checking options that catch more errors and generally promote better code quality.
- `noUncheckedIndexedAccess`: Enforces stricter type checking for indexed access operations, catching potential runtime errors.

Once these base options are set, there are several more to add depending on the type of project you're working on.

### Additional Configuration Options

After setting the base `tsconfig.json` settings, there are several questions to ask yourself to determine which additional options to include.

**Are you transpiling your code with TypeScript?**
If yes, set `module` to `NodeNext`.

**Are you building for a library?**
If you're building for a library, set `declaration` to `true`. If you're building for a library in a monorepo, set `composite` to `true` and `declarationMap` to `true`.

**Are you not transpiling with TypeScript?**
If you're using a different tool to transpile your code, such as ESbuild or Babel, set `module` to `Preserve`, and `noEmit` to `true`.

**Does your code run in the DOM?**
If yes, set `lib` to `["dom", "dom.iterable", "es2022"]`. If not, set it to `["es2022"]`.

### The Complete Base Configuration

Based on your answers to the above questions, here's how the complete `tsconfig.json` file would look:

```json
{
  "compilerOptions": {
    /* Base Options: */
    "skipLibCheck": true,
    "target": "es2022",
    "esModuleInterop": true,
    "allowJs": true,
    "resolveJsonModule": true,
    "moduleDetection": "force",
    "isolatedModules": true,

    /* Strictness */
    "strict": true,
    "noUncheckedIndexedAccess": true,

    /* If transpiling with tsc: */
    "module": "NodeNext",
    "outDir": "dist",
    "sourceMap": true,
    "verbatimModuleSyntax": true,

    /* AND if you're building for a library: */
    "declaration": true,

    /* AND if you're building for a library in a monorepo: */
    "composite": true,
    "declarationMap": true,

    /* If NOT transpiling with tsc: */
    "module": "Preserve",
    "noEmit": true,

    /* If your code runs in the DOM: */
    "lib": ["es2022", "dom", "dom.iterable"],

    /* If your code doesn't run in the DOM: */
    "lib": ["es2022"]
  }
}
```

Now that we understand the lay of the land, let's take a look at each of these options in more detail.

## Base Options

### `target`

The `target` option specifies the ECMAScript version that TypeScript should target when generating JavaScript code.

For example, setting `target` to `ES5` will attempt to transform your code to be compatible with ECMAScript 5.

Language features like optional chaining and nullish coalescing, which were introduced later than ES5, are still available:

```tsx
// Optional chaining
const search = input?.search;

// Nullish coalescing
const defaultedSearch = search ?? "Hello";
```

But when they are turned into JavaScript, they'll be transformed into code that works in ES5 environments:

```javascript
// Optional chaining
var search = input === null || input === void 0 ? void 0 : input.search;
// Nullish coalescing
var defaultedSearch = search !== null && search !== void 0 ? search : "Hello";
```

#### `target` Doesn't Polyfill

While `target` can transpile newer syntaxes into older environments, it won't do the same with API's that don't exist in the target environment.

For example, if you're targeting a version of JavaScript that doesn't support `.replaceAll` on strings, TypeScript won't polyfill it for you:

```tsx
const str = "Hello, world!";

str.replaceAll("Hello,", "Goodbye, cruel");
```

This code will error in your target environment, because `target` won't transform it for you. If you need to support older environments, you'll need to find your own polyfills. You configure the environment your code executes in with `lib`, as we saw in a previous chapter.

If you're not sure what to specify for `target`, keep it up to date with the version you have specified in `lib`.

### `esModuleInterop`

`esModuleInterop` is an old flag, released in 2018. It helps with interoperability between CommonJS and ES modules. At the time, TypeScript had deviated slightly from commonly-used tools like Babel in how it handled wildcard imports and default exports. `esModuleInterop` brought TypeScript in line with these tools.

You can read the [release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#support-for-import-d-from-cjs-from-commonjs-modules-with---esmoduleinterop) for more details. Suffice to say, when you're building an application, `esModuleInterop` should always be turned on. There's even a proposal to make it the default in TypeScript 6.0.

### `isolatedModules`

`isolatedModules` prevents some TypeScript language features that single-file transpilers can't handle.

Sometimes you'll be using other tools than `tsc` to turn your TypeScript into JavaScript. These tools, like `esbuild`, `babel` or `swc`, can't handle all TypeScript features. `isolatedModules` disables these features, making it easier to use these tools.

Consider this example of an `AlbumFormat` enum that has been created with `declare const`:

```ts twoslash
// @errors: 2748
// @isolatedModules: true
declare const enum AlbumFormat {
  CD,
  Vinyl,
  Digital,
}

const largestPhysicalSize = AlbumFormat.Vinyl;
```

Recall that the `declare` keyword will place `const enum` in an ambient context, which means that it would be erased at runtime.

When `isolatedModules` is disabled, this code will compile without any errors.

However, when `isolatedModules` is enabled, the `AlbumFormat` enum will not be erased and TypeScript will raise an error.

This is because only `tsc` has enough context to understand what value `AlbumFormat.Vinyl` should have. TypeScript checks your entire project at once, and stores the values for `AlbumFormat` in memory.

When using a single-file transpiler like `esbuild`, it doesn't have this context, so it can't know what `AlbumFormat.Vinyl` should be. So, `isolatedModules` is a way to make sure you're not using TypeScript features that can be difficult to transpile.

`isolatedModules` is a sensible default because it makes your code more portable if you ever need to switch to a different transpiler. It disables so few patterns that it's worth always turning on.

## Strictness

### `strict`

The `strict` option in `tsconfig.json` acts as shorthand for enabling several different type checking options all at once, including catching potential `null` or `undefined` issues and stronger checks for function parameters, among others.

Setting `strict` to `false` makes TypeScript behave in ways which are much less safe. Without `strict`, TypeScript will allow you to assign `null` to a variable that is supposed to be a string:

```tsx
let name: string = null; // no error
```

With `strict` enabled, TypeScript will, of course, catch this error.

In fact, I've written this entire book on the premise that you have `strict` enabled in your codebase. It's the baseline for all modern TypeScript apps.

#### Should You Start With `strict: false`?

One argument you often hear for turning `strict` off is that it's a good on-ramp for beginners. You can get a project up and running faster without having to worry about all the strictness rules.

However, I don't think this is a good idea. A lot of prominent TypeScript libraries, like `zod`, `trpc`, `@redux/toolkit` and `xstate`, won't behave how you expect when `strict` is off. Most community resources, like StackOverflow and React TypeScript Cheatsheet, assume you have `strict` enabled.

Not only that, but a project that starts with `strict: false` is likely to stay that way. On a mature codebase, it can be very time-consuming to turn `strict` on and fix all of the errors.

So, I consider `strict: false` a fork of TypeScript. It means you can't work with many libraries, makes seeking help harder, and leads to more runtime errors.

### `noUncheckedIndexedAccess`

One strictness rule which isn't part of `strict` is `noUncheckedIndexedAccess`. When enabled, it helps catch potential runtime errors by detecting cases where accessing an array or object index might return `undefined`.

Consider this example of a `VinylSingle` interface with an array of `tracks`:

```typescript
interface VinylSingle {
  title: string;
  artist: string;
  tracks: string[];
}

const egoMirror: VinylSingle = {
  title: "Ego / Mirror",
  artist: "Burial / Four Tet / Thom Yorke",
  tracks: ["Ego", "Mirror"],
};
```

To accessing the b-side of `egoMirror`, we would index into its `tracks` like this:

```typescript
const bSide = egoMirror.tracks[1];
console.log(bSide.toUpperCase()); // 'MIRROR'
```

Without `noUncheckedIndexedAccess` enabled in `tsconfig.json`, TypeScript assumes that indexing will always return a valid value, even if the index is out of bounds.

Trying to access a non-existent fourth track would not raise an error in VS Code, but it does result in a runtime error:

```typescript
const nonExistentTrack = egoMirror.tracks[3];
console.log(nonExistentTrack.toUpperCase()); // no error in VS Code

// However, running the code results in a runtime error:
// TypeError: Cannot read property 'toUpperCase' of undefined
```

By setting `noUncheckedIndexedAccess` to `true`, TypeScript will infer the type of every indexed access to be `T | undefined` instead of just `T`. In this case, every entry in `egoMirror.tracks` would be of type `string | undefined`:

```ts twoslash
// @noUncheckedIndexedAccess: true
interface VinylSingle {
  title: string;
  artist: string;
  tracks: string[];
}

const egoMirror: VinylSingle = {
  title: "Ego / Mirror",
  artist: "Burial / Four Tet / Thom Yorke",
  tracks: ["Ego", "Mirror"],
};

// ---cut---
const ego = egoMirror.tracks[0];
//    ^?
const mirror = egoMirror.tracks[1];
const nonExistentTrack = egoMirror.tracks[3];
```

However, because the types of each of the tracks are now `string | undefined`, we have errors when attempting to call `toUpperCase` even for the valid tracks:

```ts twoslash
// @errors: 18048
// @noUncheckedIndexedAccess: true
interface VinylSingle {
  title: string;
  artist: string;
  tracks: string[];
}

const egoMirror: VinylSingle = {
  title: "Ego / Mirror",
  artist: "Burial / Four Tet / Thom Yorke",
  tracks: ["Ego", "Mirror"],
};

const ego = egoMirror.tracks[0];
// ---cut---
console.log(ego.toUpperCase());
```

This means that we have to handle the possibility of `undefined` values when accessing array or object indices.

So `noUncheckedIndexedAccess` makes TypeScript more strict, but at the cost of having to handle `undefined` values more carefully.

Usually, this is a good trade-off, as it helps catch potential runtime errors early in the development process. But I wouldn't blame you if you end up turning it off in some cases.

### Other Strictness Options

I tend to configure my `tsconfig.json` no stricter than `strict` and `noUncheckedIndexedAccess`. If you want to go further, there are several other strictness options you can enable:

- `allowUnreachableCode`: Errors when unreachable code is detected, like code after a `return` statement.
- `exactOptionalPropertyTypes`: Requires that optional properties are exactly the type they're declared as, instead of allowing `undefined`.
- `noFallthroughCasesInSwitch`: Ensures that any non-empty `case` block in a `switch` statement ends with a `break`, `return`, or `throw` statement.
- `noImplicitOverride`: Requires that `override` is used when overriding a method from a base class.
- `noImplicitReturns`: Ensures that every code path in a function returns a value.
- `noPropertyAccessFromIndexSignature`: Forces you to use `example['access']` when accessing a property on an object with an index signature.
- `noUnusedLocals`: Errors when a local variable is declared but never used.
- `noUnusedParameters`: Errors when a function parameter is declared but never used.

## The Two Choices For `module`

The `module` setting in `tsconfig.json` specifies how TypeScript should treat your imports and exports. There are two main choices: `NodeNext` and `Preserve`.

- When you want to transpile your TypeScript code with the TypeScript compiler, choose `NodeNext`.
- When you're using an external bundler like Webpack or Parcel, choose `Preserve`.

### `NodeNext`

If you are transpiling your TypeScript code using the TypeScript compiler, you should choose `module: "NodeNext"` in your `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "module": "NodeNext"
  }
}
```

`module: "NodeNext"` also implies `moduleResolution: "NodeNext"`, so I'll discuss their behavior together.

When using `NodeNext`, TypeScript emulates Node's module resolution behavior, which includes support for features like `package.json`'s `"exports"` field. Code emitted using `module: NodeNext` will be able to be run in a Node.js environment without any additional processing.

One thing you'll notice when using `module: NodeNext` is that you'll need to use `.js` extensions when importing TypeScript files:

```typescript
// Importing from album.ts
import { Album } from "./album.js";
```

This can feel strange at first, but it's necessary because TypeScript doesn't transform your imports. This is how the import will look when it's transpiled to JavaScript - and TypeScript prefers for the code you write to match the code you'll run.

#### `Node16`

`NodeNext` is a shorthand for 'the most up-to-date Node.js module behavior'. If you prefer to pin your TypeScript to a specific Node version, you can use `Node16` instead:

```json
{
  "compilerOptions": {
    "module": "Node16"
  }
}
```

At the time of writing, Node.js 16 is now end-of-life, but each Node version after it copied its module resolution behavior. This may change in the future, so it's worth checking the TypeScript documentation for the most up-to-date information - or sticking to `NodeNext`.

### `Preserve`

If you're using a bundler like Webpack, Rollup, or Parcel to transpile your TypeScript code, you should choose `module: "Preserve"` in your `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "module": "Preserve"
  }
}
```

This implies `moduleResolution: "Bundler"`, which I'll discuss together.

When using `Preserve`, TypeScript assumes that the bundler will handle module resolution. This means that you don't have to include `.js` extensions when importing TypeScript files:

```typescript
// Importing from album.ts
import { Album } from "./album";
```

This is because the bundler will take care of resolving the file paths and extensions for you.

This means that if you're using an external bundler or transpiler, you should use `module: "Preserve"` in your `tsconfig.json` file. This is also true if you're using a frontend framework like Next.js, Remix, Vite, or SvelteKit - it will handle the bundling for you.

## Importing Types With `import type`

When you're importing types from other files, TypeScript has some choices to make. Let's say you're importing a type of `Album` from `album.ts`:

```typescript
// index.ts

import { Album } from "./album";
```

What should the emitted JavaScript look like? We're only importing a type, which disappears at runtime. Should the import remain, but with the type removed?

```javascript
// index.js

import {} from "./album";
```

Or should the import be removed entirely?

These decisions matter, because modules can contain effects which run when they're first imported. For instance, `album.ts` might call a `console.log` statement:

```typescript
// album.ts

export interface Album {
  title: string;
  artist: string;
  year: number;
}

console.log("Imported album.ts");
```

Now, if TypeScript removes (or, as they say in the TypeScript docs, elides) the import, the `console.log` statement won't run. This can be surprising if you're not expecting it.

The way TypeScript resolves this is with the `import type` syntax. If you're importing a type and you don't want the import to be emitted in the JavaScript, you can use `import type`:

```typescript
// index.ts

import type { Album } from "./album";
```

Now, only the type information is imported, and the import is removed from the emitted JavaScript:

```javascript
// index.js

// No import statement
```

### `import type { X }` vs `import { type X }`

You can combine `import` and `type` in two ways. You can either mark the entire line as a type import:

```typescript
import type { Album } from "./album";
```

Or, if you want to combine runtime imports with type imports, you can mark the type itself as a type import:

```typescript
import { type Album, createAlbum } from "./album";
```

In this case, `createAlbum` will be imported as a runtime import, and `Album` will be imported as a type import.

In both cases, it's clear what will be removed from the emitted JavaScript. The first line will remove the entire import, and the second line will remove only the type import.

### `verbatimModuleSyntax` Enforces `import type`

TypeScript has gone through various iterations of configuration options to support this behavior. `importsNotUsedAsValues` and `preserveValueImports` both tried to solve the problem. But since TypeScript 5.0, `verbatimModuleSyntax` is the recommended way to enforce `import type`.

The behavior described above, where imports are elided if they're only used for types, is what happens when `verbatimModuleSyntax` is set to `true`.

## ESM and CommonJS

There are two ways to modularize your code in TypeScript: ECMAScript Modules (ESM) and CommonJS (CJS). These two module systems operate slightly differently, and they don't always work together cleanly.

ES Modules use `import` and `export` statements:

```typescript
import { createAlbum } from "./album";

export { createAlbum };
```

CommonJS uses `require` and `module.exports`:

```typescript
const { createAlbum } = require("./album");

module.exports = { createAlbum };
```

Understanding the interoperability issues between ESM and CJS is a little beyond the scope of this book. Instead, we'll look at how to set up TypeScript to make working with both module systems as easy as possible.

### How Does TypeScript Know What Module System To Emit?

Imagine we have our `album.ts` file that exports a `createAlbum` function:

```typescript
// album.ts

export function createAlbum(
  title: string,
  artist: string,
  year: number,
): Album {
  return { title, artist, year };
}
```

When this file is turned into JavaScript, should it emit `CJS` or `ESM` syntax?

```javascript
// ESM

export function createAlbum(title, artist, year) {
  return { title, artist, year };
}
```

```javascript
// CJS

function createAlbum(title, artist, year) {
  return { title, artist, year };
}

module.exports = {
  createAlbum,
};
```

The way this is decided is via `module`. You can hardcode this by choosing some older options. `module: CommonJS` will always emit CommonJS syntax, and `module: ESNext` will always emit ESM syntax.

But if you're using TypeScript to transpile your code, I recommend using `module: NodeNext`. This has several complex rules built-in for understanding whether to emit CJS or ESM:

The first way we can influence how TypeScript emits your modules with `module: NodeNext` is by using `.cts` and `.mts` extensions.

If we change `album.ts` to `album.cts`, TypeScript will emit CommonJS syntax, and the emitted file extension will be `.cjs`.

If we change `album.ts` to `album.mts`, TypeScript will emit ESM syntax, and the emitted file extension will be `.mjs`.

If we keep `album.ts` the same, TypeScript will look up the directories for the closest `package.json` file. If the `type` field is set to `module`, TypeScript will emit ESM syntax. If it's set to `commonjs` (or unset, matching Node's behavior), TypeScript will emit CJS syntax.

| File Extension | Emitted File Extension | Emitted Module System               |
| -------------- | ---------------------- | ----------------------------------- |
| `album.mts`    | `album.mjs`            | ESM                                 |
| `album.cts`    | `album.cjs`            | CJS                                 |
| `album.ts`     | `album.js`             | Depends on `type` in `package.json` |

### `verbatimModuleSyntax` With ESM and CommonJS

`verbatimModuleSyntax` can help you be more explicit about which module system you're using. If you set `verbatimModuleSyntax` to `true`, TypeScript will error if you try to use `require` in an ESM file, or `import` in a CJS file.

For example, consider this file `hello.cts` that uses the `export default` syntax:

```ts twoslash
// @errors: 1286
// @verbatimModuleSyntax: true
// @module: NodeNext
// @moduleResolution: NodeNext
// @filename hello.cts

// hello.cts
const hello = () => {
  console.log("Hello!");
};

export { hello };
```

When `verbatimModuleSyntax` is enabled, TypeScript will show an error under the `export default` line that tells us we're mixing the syntaxes together.

In order to fix the issue, we need to use the `export =` syntax instead:

```tsx
// hello.cts

const hello = () => {
  console.log("Hello!");
};
export = { hello };
```

This will compile down to `module.exports = { hello }` in the emitted JavaScript.

The warnings will show when trying to use an ESM import as well:

```ts twoslash
// @errors: 1286
// @verbatimModuleSyntax: true
// @module: NodeNext
// @moduleResolution: NodeNext
// @filename hello.cts

import { z } from "zod";
```

Here, the fix is to use `require` instead of `import`:

```tsx
import zod = require("zod");

const z = zod.z;
```

Note that this syntax combines `import` and `require` in a curious way - this is a TypeScript-specific syntax that gives you autocomplete in CommonJS modules.

`verbatimModuleSyntax` is a great way to catch these issues early, and to make sure you're using the right module system in the correct files. It pairs very well with `module: NodeNext`.

## `noEmit`

The `noEmit` option in `tsconfig.json` tells TypeScript not to emit any JavaScript files when transpiling your TypeScript code.

```json
{
  "compilerOptions": {
    "noEmit": true
  }
}
```

This pairs well with `module: "Preserve"` - in both cases, you're telling TypeScript that an external tool will handle the transpilation for you.

TypeScript's default for this option is `false` - so if you're finding that running `tsc` emits JavaScript files when you don't want it to, set `noEmit` to `true`.

## Source Maps

TypeScript can generate source maps which link your compiled JavaScript code back to your original TypeScript code. You can enable them by setting `sourceMap` to `true` in your `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

When you run your code with Node, you can add the flag `--enable-source-maps`:

```bash
node --enable-source-maps dist/index.js
```

Now, when an error occurs in your compiled JavaScript code, the stack trace will point to the original TypeScript file.

## Transpiling Code for Library Use

A very common way of using TypeScript is to build a library that others can use in their projects. When building a library, there are a few additional settings you should consider in your `tsconfig.json` file.

### `outDir`

The `outDir` option in `tsconfig.json` specifies the directory where TypeScript should output the transpiled JavaScript files.

When building a library, it's common to set `outDir` to a `dist` directory in the root of your project:

```json
{
  "compilerOptions": {
    "outDir": "dist"
  }
}
```

This can be combined with `rootDir` to specify the root directory of your TypeScript files:

```json
{
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  }
}
```

Now, a file at `src/index.ts` will be transpiled to `dist/index.js`.

### Creating Declaration Files

We've already discussed how `.d.ts` declaration files are used to provide type information for JavaScript code, but so far we've only created them manually.

By setting `"declaration": true` in your `tsconfig.json` file, TypeScript will automatically generate `.d.ts` files and save them alongside your compiled JavaScript files.

```json
{
  "compilerOptions": {
    "declaration": true
  }
}
```

For example, consider this `album.ts` file:

```typescript
// inside album.ts

export interface Album {
  title: string;
  artist: string;
  year: number;
}

export function createAlbum(
  title: string,
  artist: string,
  year: number,
): Album {
  return { title, artist, year };
}
```

After running the TypeScript compiler with the `declaration` option enabled, it will generate an `album.js` and `album.d.ts` file in the project's `dist` directory.

Here's the declaration file code with the type information:

```typescript
// album.d.ts

export interface Album {
  title: string;
  artist: string;
  year: number;
}

export declare function createAlbum(
  title: string,
  artist: string,
  year: number,
): Album;
```

And the `album.js` file transpiled from TypeScript:

```javascript
// album.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAlbum = void 0;
function createAlbum(title, artist, year) {
  return { title, artist, year };
}
exports.createAlbum = createAlbum;
```

Now, anyone who uses your library will have access to the type information in the `.d.ts` files.

### Declaration Maps

One common use case for libraries is inside monorepos. A monorepo is a collection of libraries, each with their own `package.json`, that can be shared across different applications. This means that you'll often be developing the library and the application that uses it side-by-side.

For example, a monorepo might look like this:

```
monorepo
  ├── apps
  │   └── my-app
  │       └── package.json
  └── packages
      └── my-library
          └── package.json
```

However, if you're working on code inside `my-app` that imports from `my-library`, you'll be working with the compiled JavaScript code, not the TypeScript source code. This means that when you `CMD + click` on an import, you'll be taken to the `.d.ts` file instead of the original TypeScript source.

This is where declaration maps come in. They provide a mapping between the generated `.d.ts` and the original `.ts` source files.

In order to create them, the `declarationMap` setting should be added to your `tsconfig.json` file, as well as the `sourceMap` setting:

```json
{
  "compilerOptions": {
    "declarationMap": true,
    "sourceMap": true
  }
}
```

With this option in place, the TypeScript compiler will generate `.d.ts.map` files alongside the `.d.ts` files. Now, when you `CMD + click` on an import in `my-app`, you'll be taken to the original TypeScript source file in `my-library`.

This is less useful when your library is on `npm`, unless you also ship your source files - but that's a little outside the scope of this book. In a monorepo, however, declaration maps are a great quality-of-life improvement.

## `jsx`

TypeScript has built-in support for transpiling JSX syntax, which is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. In TypeScript, these need to be written in files with a `.tsx` extension:

```tsx
// Component.tsx
const Component = () => {
  return <div />;
};
```

The `jsx` option tells TypeScript how to handle JSX syntax, and has five possible values. The most common are `preserve`, `react`, and `react-jsx`. Here's what each of them does:

- `preserve`: Keeps JSX syntax as-is.
- `react`: Transforms JSX into `React.createElement` calls. Useful for React 16 and earlier.
- `react-jsx`: Transforms JSX into `_jsx` calls, and automatically imports from `react/jsx-runtime`. Useful for React 17 and later.

## Managing Multiple TypeScript Configurations

As projects grow in size and complexity, it's common to have different environments or targets within the same project.

For example, your single repo might include both a client-side application and a server-side API, each with different requirements and configurations.

This means you might want different `tsconfig.json` settings for different parts of your project. In this section, we'll look at how multiple `tsconfig.json` files can be composed together.

### How TypeScript Finds `tsconfig.json`

In a project with multiple `tsconfig.json` files, your IDE will need to know which one to use for each file. It determines which `tsconfig.json` to use by looking for the closest one to the current `.ts` file in question.

For example, given this file structure:

```
project
  ├── client
  │   └── tsconfig.json
  ├── server
  │   └── tsconfig.json
  └── tsconfig.json
```

A file inside the `client` directory will use the `client/tsconfig.json` file, while a file inside the `server` directory will use the `server/tsconfig.json` file. Anything inside the `project` directory that isn't in `client` or `server` will use the `tsconfig.json` file in the root of the project.

This means that `client/tsconfig.json` can contain settings specific to the client-side application, such as adding the `dom` types:

```json
{
  "compilerOptions": {
    // ...other options
    "lib": ["es2022", "dom", "dom.iterable"]
  }
}
```

But `server/tsconfig.json` can contain settings specific to the server-side application, such as removing the `dom` types:

```json
{
  "compilerOptions": {
    // ...other options
    "lib": ["es2022"]
  }
}
```

#### Globals with Multiple `tsconfig.json` Files

A useful feature of having multiple `tsconfig.json` files is that globals are tied to a single configuration file.

For example, say a declaration file `server.d.ts` in the `server` directory has a global declaration for a `ONLY_ON_SERVER` variable. This variable will only be available in files that are part of the `server` configuration:

```tsx
// inside server/server.d.ts
declare const ONLY_ON_SERVER: string;
```

Trying to use `ONLY_ON_SERVER` in a file that's part of the `client` configuration will result in an error:

```ts twoslash
// @errors: 2304
// inside client/index.ts
console.log(ONLY_ON_SERVER);
```

This feature is useful when dealing with environment-specific variables or globals that come from testing tools like Jest or Cypress, and avoids polluting the global scope.

### Extending Configurations

When you have multiple `tsconfig.json` files, it's common to have shared settings between them:

```tsx
// client/tsconfig.json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "Preserve",
    "esModuleInterop": true,
    "noEmit": true,
    "strict": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "lib": [
      "es2022",
      "dom",
      "dom.iterable"
    ],
    "jsx": "react-jsx",
  }
}

// server/tsconfig.json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "Preserve",
    "esModuleInterop": true,
    "noEmit": true,
    "strict": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "lib": [
      "es2022"
    ]
  },
}
```

Instead of repeating the same settings in both `client/tsconfig.json` and `server/tsconfig.json`, we can create a new `tsconfig.base.json` file that can be extended from.

The common settings can be moved to `tsconfig.base.json`:

```tsx
// tsconfig.base.json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "Preserve",
    "esModuleInterop": true,
    "noEmit": true,
    "strict": true,
    "skipLibCheck": true,
    "isolatedModules": true
  }
}
```

Then, the `client/tsconfig.json` would extend the base configuration with the `extends` option that points to the `tsconfig.base.json` file:

```tsx
// client/tsconfig.json
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "lib": [
      "es2022",
      "dom",
      "dom.Iterable"
    ],
    "jsx": "react-jsx"
  }
}
```

The `server/tsconfig.json` would do the same:

```tsx
// server/tsconfig.json
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "lib": [
      "es2022"
    ]
  }
}
```

This approach is particularly useful for monorepos, where many different `tsconfig.json` files might need to reference the same base configuration.

Any changes to the base configuration will be automatically inherited by the `client` and `server` configurations. However, it's important to note that using `extends` will only copy over `compilerOptions` from the base configuration, and not other settings like `include` or `exclude` (which are used to specify which files to include or exclude from compilation).

```json
{
  "compilerOptions": {}, // Will be inherited by 'extends'
  "include": [], // Will NOT be inherited by 'extends'
  "exclude": [] // Will NOT be inherited by 'extends'
}
```

### `--project`

Now we have a set of `tsconfig.json` files that are organized and share common settings. This works OK in the IDE, which automatically detects which `tsconfig.json` file to use based on the file's location.

But what if we want to run a command that checks the entire project at once?

To do this, we'd need to run `tsc` using the `--project` flag and point it to each `tsconfig.json` file:

```bash
tsc --project ./client/tsconfig.json
tsc --project ./server/tsconfig.json
```

This can work OK for a small amount of configurations, but it can quickly become unwieldy as the number of configurations grows.

### Project References

To simplify this process, TypeScript has a feature called project references. This allows you to specify a list of projects that depend on each other, and TypeScript will build them in the correct order.

You can configure a single `tsconfig.json` file at the root of the project that references the `client` and `server` configurations:

```tsx
// tsconfig.json
{
  "references": [
    {
      "path": "./client/tsconfig.json"
    },
    {
      "path": "./server/tsconfig.json"
    }
  ],
  "files": []
}
```

Note that there is also an empty `files` array in the configuration above. This is to prevent the root `tsconfig.json` from checking any files itself - it just references the other configurations.

Next, we need to add the `composite` option to the `tsconfig.base.json` file. This option tells TypeScript that `client` and `server` are child project configurations that needs to be run with project references:

```tsx
// tsconfig.base.json
{
  "compilerOptions": {
    // ...other options
    "composite": true
  },
}
```

Now, from the root, we can run `tsc` with the `-b` flag to run each of the projects:

```bash
tsc -b
```

The `-b` flag tells TypeScript to run the project references. This will typecheck and build the `client` and `server` configurations in the correct order.

When we run this for the first time, some `.tsbuildinfo` files will be created in the `client` and `server` directories. These files are used by TypeScript to cache information about the project, and speed up subsequent builds.

So, to sum up:

- Project references allow you to run several `tsconfig.json` files in a single `tsc` command.
- Each sub-configuration should have `composite: true` in its `tsconfig.json` file.
- The root `tsconfig.json` file should have a `references` array that points to each sub-configuration, and `files: []` to prevent it from checking any files itself.
- Run `tsc -b` from the root to build all the configurations.
- Each `tsconfig.json` will have its own global scope, and globals will not be shared between configurations.
- `.tsbuildinfo` files will be created in each sub-configuration to speed up subsequent builds.

Project references can be used in all sorts of ways to manage complex TypeScript projects. They're especially useful when you only want globals to affect a certain part of your project, like types from the `dom` or test frameworks which add functions to the global scope.


--- CHAPTER ---

As you build out your TypeScript applications, you're going to notice something. The way you design your types will significantly change how easy your application is to maintain.

Your types are more than just a way to catch errors at compile time. They help reflect and communicate the business logic they represent.

We've seen syntax like `interface extends` and type helpers like `Pick` and `Omit`. We understand the benefits and trade-offs of deriving types from other types. In this chapter, we'll dive deeper into designing your types in TypeScript.

We'll add several more techniques for composing and transforming types. We'll work with generic types, which can turn your types into 'type functions'. We'll also introduce template literal types for defining and enforcing specific string formats, as well as mapped types for deriving the shape of one type from another.

## Generic Types

Generic types let you turn a type into a 'type function' which can receive arguments. We've seen generic types before, like `Pick` and `Omit`. These types take in a type and a key, and return a new type based on that key:

```tsx
type Example = Pick<{ a: string; b: number }, "a">;
```

Now, we're going to be creating our own generic types. These are most useful for reducing repetition in your code.

Consider these `StreamingPlaylist` and `StreamingAlbum` types, which share similar structures:

```tsx
type StreamingPlaylist =
  | {
      status: "available";
      content: {
        id: number;
        name: string;
        tracks: string[];
      };
    }
  | {
      status: "unavailable";
      reason: string;
    };

type StreamingAlbum =
  | {
      status: "available";
      content: {
        id: number;
        title: string;
        artist: string;
        tracks: string[];
      };
    }
  | {
      status: "unavailable";
      reason: string;
    };
```

Both of these types represent a streaming resource that is either available with specific content or unavailable with a reason for its unavailability.

The primary difference lies in the structure of the `content` object: the `StreamingPlaylist` type has a `name` property, while the `StreamingAlbum` type has a `title` and `artist` property. Despite this difference, the overall structure of the types is the same.

In order to reduce repetition, we can create a generic type called `ResourceStatus` that can represent both `StreamingPlaylist` and `StreamingAlbum`.

To create a generic type, we use a _type parameter_ that declares what type of arguments the type must receive.

To specify the parameter, we use the angle bracket syntax that will look familiar from working with the various type helpers we've seen earlier in the book:

```tsx
type ResourceStatus<TContent> = unknown;
```

Our `ResourceStatus` type will take in a type parameter of `TContent`, which will represent the shape of the `content` object that is specific to each resource. For now, we'll set the resolved type to `unknown`.

Often type parameters are named with single-letter names like `T`, `K`, or `V`, but you can name them anything you like.

Now we've declared `ResourceStatus` as a generic type, we can pass it a _type argument_.

Let's create an `Example` type, and provide an object type as the type argument for `TContent`:

```tsx
type Example = ResourceStatus<{
  id: string;
  name: string;
  tracks: string[];
}>;
```

Just like with `Pick` and `Omit`, the type argument is passed in as an argument to the generic type.

But what type will `Example` be?

```tsx
// hovering over Example shows
type Example = unknown;
```

We set the result of `ResourceStatus` to be `unknown`. Why is this happening? We can get a clue by hovering over the `TContent` parameter in the `ResourceStatus` type:

```tsx
type ResourceStatus<TContent> = unknown;

// hovering over TContent shows:
// Type 'TContent' is declared but its value is never read.
```

We're not _using_ the `TContent` parameter. We're just returning `unknown`, no matter what is passed in. So, the `Example` type is also `unknown`.

So, let's use it. Let's update the `ResourceStatus` type to match the structure of the `StreamingPlaylist` and `StreamingAlbum` types, with the bit we want to be dynamic replaced with the `TContent` type parameter:

```tsx
type ResourceStatus<TContent> =
  | {
      status: "available";
      content: TContent;
    }
  | {
      status: "unavailable";
      reason: string;
    };
```

We can now redefine `StreamingPlaylist` and `StreamingAlbum` to use it:

```tsx
type StreamingPlaylist = ResourceStatus<{
  id: number;
  name: string;
  tracks: string[];
}>;

type StreamingAlbum = ResourceStatus<{
  id: number;
  title: string;
  artist: string;
  tracks: string[];
}>;
```

Now if we hover over `StreamingPlaylist`, we will see that it has the same structure as it did originally, but it's now defined with the `ResourceStatus` type without having to manually provide the additional properties:

```tsx
// hovering over StreamingPlaylist shows:

type StreamingPlaylist =
  | {
      status: "unavailable";
      reason: string;
    }
  | {
      status: "available";
      content: {
        id: number;
        name: string;
        tracks: string[];
      };
    };
```

`ResourceStatus` is now a generic type. It's a kind of type function, which means it's useful in all the ways runtime functions are useful. We can use generic types to capture repeated patterns in our types, and make our types more flexible and reusable.

### Multiple Type Parameters

Generic types can accept multiple type parameters, allowing for even more flexibility.

We could expand the `ResourceStatus` type to include a second type parameter that represents metadata that accompanies the resource:

```tsx
type ResourceStatus<TContent, TMetadata> =
  | {
      status: "available";
      content: TContent;
      metadata: TMetadata;
    }
  | {
      status: "unavailable";
      reason: string;
    };
```

Now we can define the `StreamingPlaylist` and `StreamingAlbum` types, we can include metadata specific to each resource:

```tsx
type StreamingPlaylist = ResourceStatus<
  {
    id: number;
    name: string;
    tracks: string[];
  },
  {
    creator: string;
    artwork: string;
    dateUpdated: Date;
  }
>;

type StreamingAlbum = ResourceStatus<
  {
    id: number;
    title: string;
    artist: string;
    tracks: string[];
  },
  {
    recordLabel: string;
    upc: string;
    yearOfRelease: number;
  }
>;
```

Like before, each type maintains the same structure defined in `ResourceStatus`, but with its own content and metadata.

You can use as many type parameters as you need in a generic type. But just like with functions, the more parameters you have, the more complex your types can become.

### All Type Arguments Must Be Provided

What happens if we don't pass a type argument to a generic type? Let's try it with the `ResourceStatus` type:

```ts twoslash
// @errors: 2314
type ResourceStatus<TContent, TMetadata> =
  | {
      status: "available";
      content: TContent;
      metadata: TMetadata;
    }
  | {
      status: "unavailable";
      reason: string;
    };
// ---cut---
type Example = ResourceStatus;
```

TypeScript shows an error that tells us that `ResourceStatus` requires two type arguments. This is because by default, all generic types _require_ their type arguments to be passed in, just like runtime functions.

### Default Type Parameters

In some cases, you may want to provide default types for generic type parameters. Like with functions, you can use the `=` to assign a default value.

By setting `TMetadata`'s default value to an empty object, we can essentially make `TMetadata` optional:

```tsx
type ResourceStatus<TContent, TMetadata = {}> =
  | {
      status: "available";
      content: TContent;
      metadata: TMetadata;
    }
  | {
      status: "unavailable";
      reason: string;
    };
```

Now, we can create a `StreamingPlaylist` type without providing a `TMetadata` type argument:

```tsx
type StreamingPlaylist = ResourceStatus<{
  id: number;
  name: string;
  tracks: string[];
}>;
```

If we hover over it, we'll see that it's typed as expected, with `metadata` being an empty object:

```tsx
type StreamingPlaylist =
  | {
      status: "unavailable";
      reason: string;
    }
  | {
      status: "available";
      content: {
        id: number;
        name: string;
        tracks: string[];
      };
      metadata: {};
    };
```

Defaults can help make your generic types more flexible and easier to use.

### Type Parameter Constraints

To set constraints on type parameters, we can use the `extends` keyword.

We can force the `TMetadata` type parameter to be an object while still defaulting to an empty object:

```tsx
type ResourceStatus<TContent, TMetadata extends object = {}> = // ...
```

There's also an opportunity to provide a constraint for the `TContent` type parameter.

Both of the `StreamingPlaylist` and `StreamingAlbum` types have an `id` property in their `content` objects. This would be a good candidate for a constraint.

We can create a `HasId` type that enforces the presence of an `id` property:

```tsx
type HasId = {
  id: number;
};

type ResourceStatus<TContent extends HasId, TMetadata extends object = {}> =
  | {
      status: "available";
      content: TContent;
      metadata: TMetadata;
    }
  | {
      status: "unavailable";
      reason: string;
    };
```

With these changes in place, it is now required that the `TContent` type parameter must include an `id` property. The `TMetadata` type parameter is optional, but if it is provided it must be an object.

When we try to create a type with `ResourceStatus` that doesn't have an `id` property, TypeScript will raise an error that tells us exactly what's wrong:

```ts twoslash
// @errors: 2344
type HasId = {
  id: number;
};

type ResourceStatus<TContent extends HasId, TMetadata extends object = {}> =
  | {
      status: "available";
      content: TContent;
      metadata: TMetadata;
    }
  | {
      status: "unavailable";
      reason: string;
    };

// ---cut---
type StreamingPlaylist = ResourceStatus<
  {
    name: string;
    tracks: string[];
  },
  {
    creator: string;
    artwork: string;
    dateUpdated: Date;
  }
>;
```

Once the `id` property is added to the `TContent` type parameter, the error will go away.

#### Constraints Describe Required Properties

Note that these constraints we're providing here are just descriptions for properties the object must contain. We can pass `name` and `tracks` into `TContent` as long as it has an `id` property.

In other words, these constraints are _open_, not _closed_. You won't get excess property warnings here. Any excess properties you pass in will be added to the type.

#### `extends`, `extends`, `extends`

By now, we've seen `extends` used in a few different contexts:

- In generic types, to set constraints on type parameters
- In classes, to extend another class
- In interfaces, to extend another interface

There is even another use for `extends` - conditional types, which we'll look at later in this chapter.

One of TypeScript's annoying habits is that it tends to reuse the same keywords in different contexts. So it's important to understand that `extends` means different things in different places.

## Template Literal Types in TypeScript

Similar to how template literals in JavaScript allow you to interpolate values into strings, template literal types in TypeScript can be used to interpolate other types into string types.

For example, let's create a `PngFile` type that represents a string that ends with ".png":

```tsx
type PngFile = `${string}.png`;
```

Now when we type a new variable as `PngFile`, it must end with ".png":

```tsx
let myImage: PngFile = "my-image.png"; // OK
```

When a string does not match the pattern defined in the `PngFile` type, TypeScript will raise an error:

```ts twoslash
// @errors: 2322
type PngFile = `${string}.png`;

// ---cut---
let myImage: PngFile = "my-image.jpg";
```

Enforce specific string formats with template literal types can be useful in your applications.

### Combining Template Literal Types with Union Types

Template literal types become even more powerful when combined with union types. By passing a union to a template literal type, you can generate a type that represents all possible combinations of the union.

For example, let's imagine we have a set of colors each with possible shades from `100` to `900`:

```tsx
type ColorShade = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type Color = "red" | "blue" | "green";
```

If we want a combination of all possible colors and shades, we can use a template literal type to generate a new type:

```tsx
type ColorPalette = `${Color}-${ColorShade}`;
```

Now, `ColorPalette` will represent all possible combinations of colors and shades:

```tsx
let myColor: ColorPalette = "red-500"; // OK
let myColor2: ColorPalette = "blue-900"; // OK
```

That's 27 possible combinations - three colors times nine shades.

If you have any kind of string pattern you want to enforce in your application, from routes to URI's to hex codes, template literal types can help.

### Transforming String Types

TypeScript even has several built-in utility types for transforming string types. For example, `Uppercase` and `Lowercase` can be used to convert a string to uppercase or lowercase:

```ts twoslash
type UppercaseHello = Uppercase<"hello">;
//   ^?
type LowercaseHELLO = Lowercase<"HELLO">;
//   ^?
```

The `Capitalize` type can be used to capitalize the first letter of a string:

```ts twoslash
type CapitalizeMatt = Capitalize<"matt">;
//   ^?
```

The `Uncapitalize` type can be used to lowercase the first letter of a string:

```ts twoslash
type UncapitalizePHD = Uncapitalize<"PHD">;
//   ^?
```

These utility types are occasionally useful for transforming string types in your applications, and prove how flexible TypeScript's type system can be.

## Conditional Types

You can use conditional types in TypeScript to create if/else logic in your types. This is mostly useful in a library setting when working with really complex code, but I'll show you a simple example in case you ever run into it.

Let's imagine we create a `ToArray` generic type that converts a type to an array type:

```tsx
type ToArray<T> = T[];
```

This is fine, except when we pass in a type that's already an array. If we do, we'll get an array of arrays:

```ts twoslash
type ToArray<T> = T[];
// ---cut---
type Example = ToArray<string>;
//   ^?

type Example2 = ToArray<string[]>;
//   ^?
```

We actually want `Example2` to end up as `string[]` too. So, we'll need to check if `T` is already an array, and if it is, we'll return `T` instead of `T[]`.

We can use a conditional type to do that. This uses a ternary operator, similar to JavaScript:

```tsx
type ToArray<T> = T extends any[] ? T : T[];
```

This will look pretty scary the first time you see it, but let's break it down.

```tsx
type ToArray<T> = T extends any[] ? T : T[];
//                ^^^^^^^^^^^^^^^   ^   ^^^
//                condition       true/false
```

### The Condition

The 'condition' in a conditional type is the part before the `?`. In this case, it's `T extends any[]`.

```tsx
type ToArray<T> = T extends any[] ? T : T[];
//                ^^^^^^^^^^^^^^^
//                   condition
```

This checks if `T` can be assigned to `any[]`. To make sense of this check, imagine it like a function:

```tsx
const toArray = (t: any[]) => {
  // implementation
};
```

What could be passed to this function? Only arrays:

```ts twoslash
// @errors: 2345
const toArray = (t: any[]) => {
  // implementation
};

// ---cut---
toArray([1, 2, 3]); // OK
toArray("hello");
```

`T extends any[]` checks if `T` could be passed to a function expecting `any[]`. If we wanted to check if `T` was a string, we'd use `T extends string`.

### 'True' and 'False'

```tsx
type ToArray<T> = T extends any[] ? T : T[];
//                                  ^   ^^^
//                                 true/false
```

If the condition is true, it resolves to the 'true' part, just like a normal ternary. If it's false, it resolves to the 'false' part.

In this case, if `T` is an array, it resolves to `T`. If it's not, it resolves to `T[]`.

This means that our examples above now work as expected:

```ts twoslash
type ToArray<T> = T extends any[] ? T : T[];

// ---cut---
type Example = ToArray<string>;
//   ^?

type Example2 = ToArray<string[]>;
//   ^?
```

Conditional types turn TypeScript's type system into a full programming language. They're incredibly powerful, but they can also be incredibly complex. You'll rarely need them in application code, but they can perform wonders in library code.

## Mapped Types

Mapped types in TypeScript allow you to create a new object type based on an existing type by iterating over its keys and values. This can let you be extremely expressive when creating new object types.

Consider this `Album` interface:

```tsx
interface Album {
  name: string;
  artist: string;
  songs: string[];
}
```

Imagine we want to create a new type that makes all the properties optional and nullable. If it were only optional, we could use `Partial`, but we want to end up with a type that looks like this:

```tsx
type AlbumWithNullable = {
  name?: string | null;
  artist?: string | null;
  songs?: string[] | null;
};
```

Let's start by, instead of repeating the properties, using a mapped type:

```tsx
type AlbumWithNullable = {
  [K in keyof Album]: K;
};
```

This will look similar to an index signature, but instead of `[k: string]`, we use `[K in keyof Album]`. This will iterate over each key in `Album`, and create a property in the object with that key. `K` is a name we've chosen: you can choose any name you like.

In this case, we're then using `K` as the value of the property, too. This is not what we want eventually, but it's a good start:

```tsx
// Hovering over AlbumWithNullable shows:
type AlbumWithNullable = {
  name: "name";
  artist: "artist";
  songs: "songs";
};
```

We can see that `K` represents the _currently iterated key_. This means we can use it to get the type of the original `Album` property using an indexed access type:

```tsx
type AlbumWithNullable = {
  [K in keyof Album]: Album[K];
};

// Hovering over AlbumWithNullable shows:
type AlbumWithNullable = {
  name: string;
  artist: string;
  songs: string[];
};
```

Wonderful - we've now recreated the object type of `Album`. Now we can add `| null` to each property:

```tsx
type AlbumWithNullable = {
  [K in keyof Album]: Album[K] | null;
};

// Hovering over AlbumWithNullable shows:
type AlbumWithNullable = {
  name: string | null;
  artist: string | null;
  songs: string[] | null;
};
```

This is almost there, we just need to make each property optional. We can do this by adding a `?` after the key:

```tsx
type AlbumWithNullable = {
  [K in keyof Album]?: Album[K] | null;
};

// Hovering over AlbumWithNullable shows:
type AlbumWithNullable = {
  name?: string | null;
  artist?: string | null;
  songs?: string[] | null;
};
```

Now, we have a new type that is derived from the `Album` type, but with all properties optional and nullable.

In the spirit of designing our types properly, we should make this behavior reusable by wrapping it in a generic type, `Nullable<T>`:

```tsx
type Nullable<T> = {
  [K in keyof T]?: T[K] | null;
};

type AlbumWithNullable = Nullable<Album>;
```

Mapped types are an extremely useful method for transforming object types, and have many different uses in application code.

### Key Remapping with `as`

In the previous example, we didn't need to change the key of the object we were iterating over. But what if we did?

Let's say we want to create a new type that has the same properties as `Album`, but with the key names uppercased. We could try using `Uppercase` on `keyof Album`:

```ts twoslash
// @errors: 2536
interface Album {
  name: string;
  artist: string;
  songs: string[];
}

// ---cut---
type AlbumWithUppercaseKeys = {
  [K in Uppercase<keyof Album>]: Album[K];
};
```

But this doesn't work. We can't use `K` to index `Album` because `K` has already been transformed to its uppercase version. Instead, we need to find a way to keep `K` the same as before, while using the uppercase version of `K` for the key.

We can do this by using the `as` keyword to remap the key:

```tsx
type AlbumWithUppercaseKeys = {
  [K in keyof Album as Uppercase<K>]: Album[K];
};

// Hovering over AlbumWithUppercaseKeys shows:
type AlbumWithUppercaseKeys = {
  NAME: string;
  ARTIST: string;
  SONGS: string[];
};
```

`as` allows us to remap the key while keeping the original key accessible in the loop. This isn't like when we use `as` for a type assertion - it's a completely different use of the keyword.

### Using Mapped Types with Union Types

Mapped types don't always have to use `keyof` to iterate over an object. They can also map over a union of potential property keys for the object.

For example, we can create an `Example` type that is a union of 'a', 'b', and 'c':

```tsx
type Example = "a" | "b" | "c";
```

Then, we can create a `MappedExample` type that maps over `Example` and returns the same values:

```tsx
type MappedExample = {
  [E in Example]: E;
};

// hovering over MappedExample shows:
type MappedExample = {
  a: "a";
  b: "b";
  c: "c";
};
```

This chapter should give you a good understanding of advanced methods for designing your types in TypeScript. By using generic types, template literal types, conditional types, and mapped types, you can create expressive and reusable types that reflect the business logic of your application.

## Exercises

### Exercise 1: Create a `DataShape` Type Helper

Consider the types `UserDataShape` and `PostDataShape`:

```tsx
type ErrorShape = {
  error: {
    message: string;
  };
};

type UserDataShape =
  | {
      data: {
        id: string;
        name: string;
        email: string;
      };
    }
  | ErrorShape;

type PostDataShape =
  | {
      data: {
        id: string;
        title: string;
        body: string;
      };
    }
  | ErrorShape;
```

Looking at these types, they both share a consistent pattern. Both `UserDataShape` and `PostDataShape` possess a `data` object and an `error` shape, with the `error` shape being identical in both. The only difference between the two is the `data` object, which holds different properties for each type.

Your task is to create a generic `DataShape` type to reduce duplication in the `UserDataShape` and `PostDataShape` types.

<Exercise title="Exercise 1: Create a `DataShape` Type Helper" filePath="/src/083-designing-your-types/204-intro-to-generic-types.problem.ts"></Exercise>

### Exercise 2: Typing `PromiseFunc`

This `PromiseFunc` type represents a function that returns a promise:

```tsx
type PromiseFunc = (input: any) => Promise<any>;
```

Provided here are two example tests that use the `PromiseFunc` type with different inputs that currently have errors:

```ts twoslash
// @errors: 2315
import { Equal, Expect } from "@total-typescript/helpers";
type PromiseFunc = (input: any) => Promise<any>;

// ---cut---
type Example1 = PromiseFunc<string, string>;

type test1 = Expect<Equal<Example1, (input: string) => Promise<string>>>;

type Example2 = PromiseFunc<boolean, number>;

type test2 = Expect<Equal<Example2, (input: boolean) => Promise<number>>>;
```

The error messages inform us that the `PromiseFunc` type is not generic. We're also expecting the `PromiseFunc` type to take in two type arguments: the input type and the return type of the promise.

Your task is to update `PromiseFunc` so that both of the tests pass without errors.

<Exercise title="Exercise 2: Typing `PromiseFunc`" filePath="/src/083-designing-your-types/205-multiple-type-parameters.problem.ts"></Exercise>

### Exercise 3: Working with the `Result` Type

Let's say we have a `Result` type that can either be a success or an error:

```tsx
type Result<TResult, TError> =
  | {
      success: true;
      data: TResult;
    }
  | {
      success: false;
      error: TError;
    };
```

We also have the `createRandomNumber` function that returns a `Result` type:

```ts twoslash
// @errors: 2314
type Result<TResult, TError> =
  | {
      success: true;
      data: TResult;
    }
  | {
      success: false;
      error: TError;
    };
// ---cut---
const createRandomNumber = (): Result<number> => {
  const num = Math.random();

  if (num > 0.5) {
    return {
      success: true,
      data: 123,
    };
  }

  return {
    success: false,
    error: new Error("Something went wrong"),
  };
};
```

Because there's only a `number` being sent as a type argument, we have an error message. We're only specifying the number because it can be a bit of a hassle to always specify both the `success` and `error` types whenever we use the `Result` type.

It would be easier if we could designate `Error` type as the default type for `Result`'s `TError`, since that's what most errors will be typed as.

Your task is to adjust the `Result` type so that `TError` defaults to type `Error`.

<Exercise title="Exercise 3: Working with the `Result` Type" filePath="/src/083-designing-your-types/207-default-type-parameters.problem.ts"></Exercise>

### Exercise 4: Constraining the `Result` Type

After updating the `Result` type to have a default type for `TError`, it would be a good idea to add a constraint on the shape of what's being passed in.

Here are some examples of using the `Result` type:

```ts twoslash
// @errors: 2578
type Result<TResult, TError = Error> =
  | {
      success: true;
      data: TResult;
    }
  | {
      success: false;
      error: TError;
    };

// ---cut---
type BadExample = Result<
  { id: string },
  // @ts-expect-error Should be an object with a message property
  string
>;

type GoodExample = Result<{ id: string }, TypeError>;
type GoodExample2 = Result<{ id: string }, { message: string; code: number }>;
type GoodExample3 = Result<{ id: string }, { message: string }>;
type GoodExample4 = Result<{ id: string }>;
```

The `GoodExample`s should pass without errors, but the `BadExample` should raise an error because the `TError` type is not an object with a `message` property. Currently, this isn't the case as seen by the error under the `@ts-expect-error` directive.

Your task is to add a constraint to the `Result` type that ensures the `BadExample` test raises an error, while the `GoodExample`s pass without errors.

<Exercise title="Exercise 4: Constraining the `Result` Type" filePath="/src/083-designing-your-types/208-type-parameter-constraints.problem.ts"></Exercise>

### Exercise 5: A Stricter `Omit` Type

Earlier in the book, we worked with the `Omit` type helper, which allows you to create a new type that omits specific properties from an existing type.

Interestingly, the `Omit` helper also lets you try to omit keys that don't exist in the type you're trying to omit from.

In this example, we're trying to omit the property `b` from a type that only has the property `a`:

```tsx
type Example = Omit<{ a: string }, "b">;
```

Since `b` isn't a part of the type, you might anticipate TypeScript would show an error, but it doesn't.

Instead, we want to implement a `StrictOmit` type that only accepts keys that exist in the provided type. Otherwise, an error should be shown.

Here's the start of `StrictOmit`, which currently has an error under `K`:

```ts twoslash
// @errors: 2344
type StrictOmit<T, K> = Omit<T, K>;
```

Currently, the `StrictOmit` type behaves the same as a regular `Omit` as evidenced by this failing `@ts-expect-error` directive:

```ts twoslash
// @errors: 2344 2578
type StrictOmit<T, K> = Omit<T, K>;
// ---cut---
type ShouldFail = StrictOmit<
  { a: string },
  // @ts-expect-error
  "b"
>;
```

Your task is to update `StrictOmit` so that it only accepts keys that exist in the provided type `T`. If a non-valid key `K` is passed, TypeScript should return an error.

Here are some tests to show how `StrictOmit` should behave:

```tsx
type tests = [
  Expect<Equal<StrictOmit<{ a: string; b: number }, "b">, { a: string }>>,
  Expect<Equal<StrictOmit<{ a: string; b: number }, "b" | "a">, {}>>,
  Expect<
    Equal<StrictOmit<{ a: string; b: number }, never>, { a: string; b: number }>
  >,
];
```

You'll need to remember `keyof` and how to constraint type parameters to complete this exercise.

<Exercise title="Exercise 5: A Stricter `Omit` Type" filePath="/src/083-designing-your-types/209-tighter-version-of-omit.problem.ts"></Exercise>

### Exercise 6: Route Matching

Here we have a `route` typed as `AbsoluteRoute`:

```tsx
type AbsoluteRoute = string;

const goToRoute = (route: AbsoluteRoute) => {
  // ...
};
```

We're expecting that the `AbsoluteRoute` will represent any string that has a forward slash at the start of it. For example, we'd expect the following strings to be valid `route`s:

```tsx
goToRoute("/home");
goToRoute("/about");
goToRoute("/contact");
```

However, if we attempt passing a string that doesn't start with a forward slash there currently is not an error:

```ts twoslash
// @errors: 2578
type AbsoluteRoute = string;

const goToRoute = (route: AbsoluteRoute) => {
  // ...
};
// ---cut---
goToRoute(
  // @ts-expect-error
  "somewhere",
);
```

Because `AbsoluteRoute` is currently typed as `string`, TypeScript fails to flag this as an error.

Your task is to refine the `AbsoluteRoute` type to accurately expect that strings begin with a forward slash.

<Exercise title="Exercise 6: Route Matching" filePath="/src/083-designing-your-types/210-template-literal-types.problem.ts"></Exercise>

### Exercise 7: Sandwich Permutations

In this exercise, we want to build a `Sandwich` type.

This `Sandwich` is expected to encompass all possible combinations of three types of bread (`"rye"`, `"brown"`, `"white"`) and three types of filling (`"cheese"`, `"ham"`, `"salami"`):

```tsx
type BreadType = "rye" | "brown" | "white";

type Filling = "cheese" | "ham" | "salami";

type Sandwich = unknown;
```

As seen in the test, there are several possible combinations of bread and filling:

```tsx
type tests = [
  Expect<
    Equal<
      Sandwich,
      | "rye sandwich with cheese"
      | "rye sandwich with ham"
      | "rye sandwich with salami"
      | "brown sandwich with cheese"
      | "brown sandwich with ham"
      | "brown sandwich with salami"
      | "white sandwich with cheese"
      | "white sandwich with ham"
      | "white sandwich with salami"
    >
  >,
];
```

Your task is to use a template literal type to define the `Sandwich` type. This can be done in just one line of code!

<Exercise title="Exercise 7: Sandwich Permutations" filePath="/src/083-designing-your-types/211-passing-unions-to-template-literal-types.problem.ts"></Exercise>

### Exercise 8: Attribute Getters

Here we have an `Attributes` interface, that contains a `firstName`, `lastName`, and `age`:

```tsx
interface Attributes {
  firstName: string;
  lastName: string;
  age: number;
}
```

Following that, we have `AttributeGetters` which is currently typed as `unknown`:

```tsx
type AttributeGetters = unknown;
```

As seen in the tests, we expect `AttributeGetters` to be an object composed of functions. When invoked, each of these functions should return a value matching the key from the `Attributes` interface:

```ts twoslash
// @errors: 2344
import { Equal, Expect } from "@total-typescript/helpers";

interface Attributes {
  firstName: string;
  lastName: string;
  age: number;
}

type AttributeGetters = unknown;
// ---cut---
type tests = [
  Expect<
    Equal<
      AttributeGetters,
      {
        firstName: () => string;
        lastName: () => string;
        age: () => number;
      }
    >
  >,
];
```

Your task is to define the `AttributeGetters` type so that it matches the expected output. To do this, you'll need to iterate over each key in `Attributes` and produce a function as a value which then returns the value of that key.

<Exercise title="Exercise 8: Attribute Getters" filePath="/src/083-designing-your-types/212-mapped-types.problem.ts"></Exercise>

### Exercise 9: Renaming Keys in a Mapped Type

After creating the `AttributeGetters` type in the previous exercise, it would be nice to rename the keys to be more descriptive.

Here's a test case for `AttributeGetters` that currently has an error:

```tsx
type tests = [
  Expect<
    Equal<
      AttributeGetters,
      {
        getFirstName: () => string;
        getLastName: () => string;
        getAge: () => number;
      }
    >
  >,
];
```

Your challenge is to adjust the `AttributeGetters` type to remap the keys as specified. You'll need to use the `as` keyword, template literals, as well as TypeScript's built-in `Capitalize<string>` type helper.

<Exercise title="Exercise 9: Renaming Keys in a Mapped Type" filePath="/src/083-designing-your-types/213-as-in-mapped-types.problem.ts"></Exercise>

### Solution 1: Create a `DataShape` Type Helper

Here's how a generic `DataShape` type would look:

```tsx
type DataShape<TData> =
  | {
      data: TData;
    }
  | ErrorShape;
```

With this type defined, the `UserDataShape` and `PostDataShape` types can be updated to use it:

```tsx
type UserDataShape = DataShape<{
  id: string;
  name: string;
  email: string;
}>;

type PostDataShape = DataShape<{
  id: string;
  title: string;
  body: string;
}>;
```

### Solution 2: Typing `PromiseFunc`

The first thing we need to do is make `PromiseFunc` generic by adding type parameters to it.

In this case, since we want it to have two parameters we call them `TInput` and `TOutput` and separate them with a comma:

```tsx
type PromiseFunc<TInput, TOutput> = (input: any) => Promise<any>;
```

Next, we need to replace the `any` types with the type parameters.

In this case, the `input` will use the `TInput` type, and the `Promise` will use the `TOutput` type:

```tsx
type PromiseFunc<TInput, TOutput> = (input: TInput) => Promise<TOutput>;
```

With these changes in place, the errors go away and the tests pass because `PromiseFunc` is now a generic type. Any type passed as `TInput` will serve as the input type, and any type passed as `TOutput` will act as the output type of the Promise.

### Solution 3: Working with the `Result` Type

Similar to other times you set default values, the solution is to use an equals sign.

In this case, we'll add the `=` after the `TError` type parameter, and then specify `Error` as the default type:

```tsx
type Result<TResult, TError = Error> =
  | {
      success: true;
      data: TResult;
    }
  | {
      success: false;
      error: TError;
    };
```

`Result` types are a great way to ensure errors are handled properly. For instance, `result` here must be checked for success before accessing the `data` property:

```tsx
const result = createRandomNumber();

if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error.message);
}
```

This pattern can be a great alternative to `try...catch` blocks in JavaScript.

### Solution 4: Constraining the `Result` Type

We want to set a constraint on `TError` to ensure that it is an object with a `message` string property, while also retaining `Error` as the default type for `TError`.

To do this, we'll use the `extends` keyword for `TError` and specify the object with a `message` property as the constraint:

```tsx
type Result<TResult, TError extends { message: string } = Error> =
  | {
      success: true;
      data: TResult;
    }
  | {
      success: false;
      error: TError;
    };
```

Now if we remove the `@ts-expect-error` directive from `BadExample`, we will get an error under `string`:

```ts twoslash
// @errors: 2344
type Result<TResult, TError extends { message: string } = Error> =
  | {
      success: true;
      data: TResult;
    }
  | {
      success: false;
      error: TError;
    };

// ---cut---
type BadExample = Result<{ id: string }, string>;
```

The behavior of constraining type parameters and adding defaults is similar to runtime parameters. However, unlike runtime arguments, you can add additional properties and still satisfy the constraint:

```tsx
type GoodExample2 = Result<{ id: string }, { message: string; code: number }>;
```

A runtime argument constraint would be limited only containing a `message` string property without any additional properties, so the above wouldn't work the same way.

### Solution 5: A Stricter `Omit` Type

Here's the starting point of the `StrictOmit` type and the `ShouldFail` example that we need to fix:

```ts twoslash
// @errors: 2344 2578
type StrictOmit<T, K> = Omit<T, K>;

type ShouldFail = StrictOmit<
  { a: string },
  // @ts-expect-error
  "b"
>;
```

Our goal is to update `StrictOmit` so that it only accepts keys that exist in the provided type `T`. If a non-valid key `K` is passed, TypeScript should return an error.

Since the `ShouldFail` type has a key of `a`, we'll start by updating the `StrictOmit`'s `K` to extend `a`:

```tsx
type StrictOmit<T, K extends "a"> = Omit<T, K>;
```

Removing the `@ts-expect-error` directive from `ShouldFail` will now show an error under `"b"`:

```ts twoslash
// @errors: 2344
type StrictOmit<T, K extends "a"> = Omit<T, K>;
// ---cut---
type ShouldFail = StrictOmit<{ a: string }, "b">;
```

This shows us that the `ShouldFail` type is failing as expected.

However, we want to make this more dynamic by specifying that `K` will extend any key in the object `T` that is passed in.

We can do this by changing the constraint from `"a"` to `keyof T`:

```tsx
type StrictOmit<T, K extends keyof T> = Omit<T, K>;
```

Now in the `StrictOmit` type, `K` is bound to extend the keys of `T`. This imposes a limitation on the type parameter `K` that it must belong to the keys of `T`.

With this change, all of the tests pass as expected with any keys that are passed in:

```tsx
type tests = [
  Expect<Equal<StrictOmit<{ a: string; b: number }, "b">, { a: string }>>,
  Expect<Equal<StrictOmit<{ a: string; b: number }, "b" | "a">, {}>>,
  Expect<
    Equal<StrictOmit<{ a: string; b: number }, never>, { a: string; b: number }>
  >,
];
```

### Solution 6: Route Matching

In order to specify that `AbsoluteRoute` is a string that begins with a forward slash, we'll use a template literal type.

Here's how we could create a type that represents a string that begins with a forward slash, followed by either "home", "about", or "contact":

```tsx
type AbsoluteRoute = `/${"home" | "about" | "contact"}`;
```

With this setup our tests would pass, but we'd be limited to only those three routes.

Instead, we want to allow for any string that begins with a forward slash.

To do this, we can just use the `string` type inside of the template literal:

```tsx
type AbsoluteRoute = `/${string}`;
```

With this change, the `somewhere` string will cause an error since it does not begin with a forward slash:

```tsx
goToRoute(
  // @ts-expect-error
  "somewhere",
);
```

### Solution 7: Sandwich Permutations

Following the pattern of the tests, we can see that the desired results are named:

```
bread "sandwich with" filling
```

That means we should pass the `BreadType` and `Filling` unions to the `Sandwich` template literal with the string `"sandwich with"` in between:

```tsx
type BreadType = "rye" | "brown" | "white";
type Filling = "cheese" | "ham" | "salami";
type Sandwich = `${BreadType} sandwich with ${Filling}`;
```

TypeScript generates all the possible combinations, leading to the type `Sandwich` being:

```tsx
| "rye sandwich with cheese"
| "rye sandwich with ham"
| "rye sandwich with salami"
| "brown sandwich with cheese"
| "brown sandwich with ham"
| "brown sandwich with salami"
| "white sandwich with cheese"
| "white sandwich with ham"
| "white sandwich with salami"
```

### Solution 8: Attribute Getters

Our challenge is to derive the shape of `AttributeGetters` based on the `Attributes` interface:

```tsx
interface Attributes {
  firstName: string;
  lastName: string;
  age: number;
}
```

To do this, we'll use a mapped type. We'll start by using `[K in keyof Attributes]` to iterate over each key in `Attributes`. Then, we'll create a new property for each key, which will be a function that returns the type of the corresponding property in `Attributes`:

```tsx
type AttributeGetters = {
  [K in keyof Attributes]: () => Attributes[K];
};
```

The `Attributes[K]` part is the key to solving this challenge. It allows us to index into the `Attributes` object and return the actual values of each key.

With this approach, we get the expected output and all tests pass as expected:

```tsx
type tests = [
  Expect<
    Equal<
      AttributeGetters,
      {
        firstName: () => string;
        lastName: () => string;
        age: () => number;
      }
    >
  >,
];
```

### Solution 9: Renaming Keys in a Mapped Type

Our goal is to create a new mapped type, `AttributeGetters`, that changes each key in `Attributes` into a new key that begins with "get" and capitalizes the original key. For example, `firstName` would become `getFirstName`.

Before we get to the solution, let's look at an incorrect approach.

#### The Incorrect Approach

It might be tempting to think that you should transform `keyof Attributes` before it even gets to the mapped type.

To do this, we'd creating a `NewAttributeKeys` type and setting it to a template literal with `keyof Attributes` inside of it added to `get`:

```tsx
type NewAttributeKeys = `get${keyof Attributes}`;
```

However, hovering over `NewAttributeKeys` shows that it's not quite right:

```tsx
// hovering over NewAttributeKeys shows:
type NewAttributeKeys = "getfirstName" | "getlastName" | "getage";
```

Adding the global `Capitalize` helper results in the keys being formatted correctly:

```tsx
type NewAttributeKeys = `get${Capitalize<keyof Attributes>}`;
```

Since we have formatted keys, we can now use `NewAttributeKeys` in the map type:

```ts twoslash
// @errors: 2536
interface Attributes {
  firstName: string;
  lastName: string;
  age: number;
}
type NewAttributeKeys = `get${Capitalize<keyof Attributes>}`;

// ---cut---
type AttributeGetters = {
  [K in NewAttributeKeys]: () => Attributes[K];
};
```

However, we have a problem. We can't use `K` to index `Attributes` because each `K` has changed and no longer exists on `Attributes`.

We need to maintain access to the original key inside the mapped type.

#### The Correct Approach

In order to maintain access to the original key, we can use the `as` keyword.

Instead of using the `NewAttributeKeys` type we tried before, we can update the map type to use `keyof Attributes as` followed by the transformation we want to make:

```tsx
type AttributeGetters = {
  [K in keyof Attributes as `get${Capitalize<K>}`]: () => Attributes[K];
};
```

We now iterate over each key `K` in `Attributes`, and use it in a template literal type that prefixes "get" and capitalizes the original key. Then the value paired with each new key is a function that returns the type of the original key in `Attributes`.

Now when we hover over the `AttributeGetters` type, we see that it's correct and the tests pass as expected:

```tsx
// hovering over AttributeGetters shows:
type AttributeGetters = {
  getFirstName: () => string;
  getLastName: () => string;
  getAge: () => number;
};
```


--- CHAPTER ---

It's commonly thought that there are two levels of TypeScript complexity.

On one end, you have library development. Here, you take advantage of many of TypeScript's most arcane and powerful features. You'll need conditional types, mapped types, generics, and much more to create a library that's flexible enough to be used in a variety of scenarios.

On the other end, you have application development. Here, you're mostly concerned with making sure your code is type-safe. You want to make sure your types reflect what's happening in your application. Any complex types are housed in libraries you use. You'll need to know your way around TypeScript, but you won't need to use its advanced features much.

This is the rule of thumb most of the TypeScript community use. "It's too complex for application code". "You'll only need it in libraries". But there's a third level that's often overlooked: the `/utils` folder.

If your application gets big enough, you'll start capturing common patterns in a set of reusable functions. These functions, like `groupBy`, `debounce`, and `retry`, might be used hundreds of times across a large application. They're like mini-libraries within the scope of your application.

Understanding how to build these types of functions can save your team a lot of time. Capturing common patterns means your code becomes easier to maintain, and faster to build.

In this chapter we'll cover how to build these functions. We'll start with generic functions, then head to type predicates, assertion functions, and function overloads.

## Generic Functions

We've seen that in TypeScript, functions can receive not just values as arguments, but types too. Here, we're passing a _value_ and a _type_ to `new Set()`:

```typescript
const set = new Set<number>([1, 2, 3]);
//                 ^^^^^^^^ ^^^^^^^^^
//                 type     value
```

We pass the type in the angle brackets, and the value in the parentheses. This is because `new Set()` is a generic function. A function that can't receive types is a regular function, like `JSON.parse`:

```ts twoslash
// @errors: 2558
const obj = JSON.parse<{ hello: string }>('{"hello": "world"}');
```

Here, TypeScript is telling us that `JSON.parse` doesn't accept type arguments, because it's not generic.

### What Makes A Function Generic?

A function is generic if it declares a type parameter. Here's a generic function that takes a type parameter `T`:

```typescript
function identity<T>(arg: T): T {
  //                 ^^^ Type parameter
  return arg;
}
```

We can use the function keyword, or use arrow function syntax:

```typescript
const identity = <T>(arg: T): T => arg;
```

We can even declare a generic function as a type:

```typescript
type Identity = <T>(arg: T) => T;

const identity: Identity = (arg) => arg;
```

Now, we can pass a type argument to `identity`:

```typescript
identity<number>(42);
```

#### Generic Function Type Alias vs Generic Type

It's very important not to confuse the syntax for a generic type with the syntax for a type alias for a generic function. They look very similar to the untrained eye. Here's the difference:

```typescript
// Type alias for a generic function
type Identity = <T>(arg: T) => T;
//              ^^^
//              Type parameter belongs to the function

// Generic type
type Identity<T> = (arg: T) => T;
//           ^^^
//           Type parameter belongs to the type
```

It's all about the position of the type parameter. If it's attached to the type's name, it's a generic type. If it's attached to the function's parentheses, it's a type alias for a generic function.

### What Happens When We Don't Pass In A Type Argument?

When we looked at generic types, we saw that TypeScript _requires_ you to pass in all type arguments when you use a generic type:

```ts twoslash
// @errors: 2314
type StringArray = Array<string>;

type AnyArray = Array;
```

This is not true of generic functions. If you don't pass a type argument to a generic function, TypeScript won't complain:

```typescript
function identity<T>(arg: T): T {
  return arg;
}

const result = identity(42); // No error!
```

Why is this? Well, it's the feature of generic functions that make them my favourite TypeScript tool. If you don't pass a type argument, TypeScript will attempt to _infer_ it from the function's runtime arguments.

Our `identity` function above simply takes in an argument and returns it. We've referenced the type parameter in the runtime parameter: `arg: T`. This means that if we don't pass in a type argument, `T` will be inferred from the type of `arg`.

So, `result` will be typed as `42`:

```ts twoslash
function identity<T>(arg: T): T {
  return arg;
}
// ---cut---
const result = identity(42);
//    ^?
```

This means that every time the function is called, it can potentially return a different type:

```ts twoslash
function identity<T>(arg: T): T {
  return arg;
}
// ---cut---
const result1 = identity("hello");
//    ^?

const result2 = identity({ hello: "world" });
//    ^?

const result3 = identity([1, 2, 3]);
//    ^?
```

This ability means that your functions can understand what types they're working with, and alter their suggestions and errors accordingly. It's TypeScript at its most powerful and flexible.

### Specified Types Beat Inferred Types

Let's go back to specifying type arguments instead of inferring them. What happens if your type argument you pass conflicts with the runtime argument?

Let's try it with our `identity` function:

```ts twoslash
// @errors: 2345
function identity<T>(arg: T): T {
  return arg;
}
// ---cut---
const result = identity<string>(42);
```

Here, TypeScript is telling us that `42` is not a `string`. This is because we've explicitly told TypeScript that `T` should be a `string`, which conflicts with the runtime argument.

Passing type arguments is an instruction to TypeScript override inference. If you pass in a type argument, TypeScript will use it as the source of truth. If you don't, TypeScript will use the type of the runtime argument as the source of truth.

### There Is No Such Thing As 'A Generic'

A quick note on terminology here. TypeScript 'generics' has a reputation for being difficult to understand. I think a large part of that is based on how people use the word 'generic'.

A lot of people think of a 'generic' as a part of TypeScript. They think of it like a noun. If you ask someone "where's the 'generic' in this piece of code?":

```typescript
const identity = <T>(arg: T) => arg;
```

They will probably point to the `<T>`. Others might describe the code below as "passing a 'generic' to `Set`":

```typescript
const set = new Set<number>([1, 2, 3]);
```

This terminology gets very confusing. Instead, I prefer to split them into different terms:

- Type Parameter: The `<T>` in `identity<T>`.
- Type Argument: The `number` passed to `Set<number>`.
- Generic Class/Function/Type: A class, function or type that declares a type parameter.

When you break generics down into these terms, it becomes much easier to understand.

### The Problem Generic Functions Solve

Let's put what we've learned into practice.

Consider this function called `getFirstElement` that takes an array and returns the first element:

```typescript
const getFirstElement = (arr: any[]) => {
  return arr[0];
};
```

This function is dangerous. Because it takes an array of `any`, it means that the thing we get back from `getFirstElement` is also `any`:

```ts twoslash
const getFirstElement = (arr: any[]) => {
  return arr[0];
};

// ---cut---
const first = getFirstElement([1, 2, 3]);
//    ^?
```

As we've seen, `any` can cause havoc in your code. Anyone who uses this function will be unwittingly opting out of TypeScript's type safety. So, how can we fix this?

We need TypeScript to understand the type of the array we're passing in, and use it to type what's returned. We need to make `getFirstElement` generic:

To do this, we'll add a type parameter `TMember` before the function's parameter list, then use `TMember[]` as the type for the array:

```typescript
const getFirstElement = <TMember>(arr: TMember[]) => {
  return arr[0];
};
```

Just like generic functions, it's common to prefix your type parameters with `T` to differentiate them from normal types.

Now when we call `getFirstElement`, TypeScript will infer the type of `` based on the argument we pass in:

```ts twoslash
const getFirstElement = <TMember>(arr: TMember[]) => {
  return arr[0];
};
// ---cut---
const firstNumber = getFirstElement([1, 2, 3]);
//    ^?
const firstString = getFirstElement(["a", "b", "c"]);
//    ^?
```

Now, we've made `getFirstElement` type-safe. The type of the array we pass in is the type of the thing we get back.

### Debugging The Inferred Type Of Generic Functions

When you're working with generic functions, it can be hard to know what type TypeScript has inferred. However, with a carefully-placed hover, you can find out.

When we call the `getFirstElement` function, we can hover over the function name to see what TypeScript has inferred:

```ts twoslash
const getFirstElement = <TMember>(arr: TMember[]) => {
  return arr[0];
};
// ---cut---
const first = getFirstElement([1, 2, 3]);
//            ^?
```

We can see that within the angle brackets, TypeScript has inferred that `TMember` is `number`, because we passed in an array of numbers.

This can be useful when you have more complex functions with multiple type parameters to debug. I often find myself creating temporary function calls in the same file to see what TypeScript has inferred.

### Type Parameter Defaults

Just like generic types, you can set default values for type parameters in generic functions. This can be useful when runtime arguments to the function are optional:

```typescript
const createSet = <T = string>(arr?: T[]) => {
  return new Set(arr);
};
```

Here, we set the default type of `T` to `string`. This means that if we don't pass in a type argument, TypeScript will assume `T` is `string`:

```ts twoslash
const createSet = <T = string>(arr?: T[]) => {
  return new Set(arr);
};
// ---cut---
const defaultSet = createSet();
//    ^?
```

The default doesn't impose a constraint on the type of `T`. This means we can still pass in any type we want:

```ts twoslash
const createSet = <T = string>(arr?: T[]) => {
  return new Set(arr);
};
// ---cut---
const numberSet = createSet<number>([1, 2, 3]);
//    ^?
```

If we don't specify a default, and TypeScript can't infer the type from the runtime arguments, it will default to `unknown`:

```ts twoslash
const createSet = <T>(arr?: T[]) => {
  return new Set(arr);
};

const unknownSet = createSet();
//    ^?
```

Here, we've removed the default type of `T`, and TypeScript has defaulted to `unknown`.

### Constraining Type Parameters

You can also add constraints to type parameters in generic functions. This can be useful when you want to ensure that a type has certain properties.

Let's imagine a `removeId` function that takes an object and removes the `id` property:

```ts twoslash
// @errors: 2339
const removeId = <TObj>(obj: TObj) => {
  const { id, ...rest } = obj;
  return rest;
};
```

Our `TObj` type parameter, when used without a constraint, is treated as `unknown`. This means that TypeScript doesn't know if `id` exists on `obj`.

To fix this, we can add a constraint to `TObj` that ensures it has an `id` property:

```typescript
const removeId = <TObj extends { id: unknown }>(obj: TObj) => {
  const { id, ...rest } = obj;
  return rest;
};
```

Now, when we use `removeId`, TypeScript will error if we don't pass in an object with an `id` property:

```ts twoslash
// @errors: 2353
const removeId = <TObj extends { id: unknown }>(obj: TObj) => {
  const { id, ...rest } = obj;
  return rest;
};
// ---cut---
const result = removeId({ name: "Alice" });
```

But if we pass in an object with an `id` property, TypeScript will know that `id` has been removed:

```ts twoslash
const removeId = <TObj extends { id: unknown }>(obj: TObj) => {
  const { id, ...rest } = obj;
  return rest;
};
// ---cut---
const result = removeId({ id: 1, name: "Alice" });
//    ^?
```

Note how clever TypeScript is being here. Even though we didn't specify a return type for `removeId`, TypeScript has inferred that `result` is an object with all the properties of the input object, except `id`.

## Type Predicates

We were introduced to type predicates way back in chapter 5, when we looked at narrowing. They're used to capture reusable logic that narrows the type of a variable.

For example, say we want to ensure that a variable is an `Album` before we try accessing its properties or passing it to a function that requires an `Album`.

We can write an `isAlbum` function that takes in an input, and checks for all the required properties.

```typescript
function isAlbum(input: unknown) {
  return (
    typeof input === "object" &&
    input !== null &&
    "id" in input &&
    "title" in input &&
    "artist" in input &&
    "year" in input
  );
}
```

If we hover over `isAlbum`, we can see a rather ugly type signature:

```typescript
// hovering over isAlbum shows:
function isAlbum(
  input: unknown,
): input is object &
  Record<"id", unknown> &
  Record<"title", unknown> &
  Record<"artist", unknown> &
  Record<"year", unknown>;
```

This is technically correct: a big intersection between an `object` and a bunch of `Record`s. But it's not very helpful.

When we try to use `isAlbum` to narrow the type of a value, TypeScript won't infer it correctly:

```ts twoslash
// @errors: 18046
function isAlbum(input: unknown) {
  return (
    typeof input === "object" &&
    input !== null &&
    "id" in input &&
    "title" in input &&
    "artist" in input &&
    "year" in input
  );
}

// ---cut---
const run = (maybeAlbum: unknown) => {
  if (isAlbum(maybeAlbum)) {
    maybeAlbum.name.toUpperCase();
  }
};
```

To fix this, we'd need to add even more checks to `isAlbum` to ensure we're checking the types of all the properties:

```typescript
function isAlbum(input: unknown) {
  return (
    typeof input === "object" &&
    input !== null &&
    "id" in input &&
    "title" in input &&
    "artist" in input &&
    "year" in input &&
    typeof input.id === "number" &&
    typeof input.title === "string" &&
    typeof input.artist === "string" &&
    typeof input.year === "number"
  );
}
```

But at this point, something frustrating happens - TypeScript _stops_ inferring the return value of the function. We can see this by hovering over `isAlbum`:

```typescript
// hovering over isAlbum shows:
function isAlbum(input: unknown): boolean;
```

This is because TypeScript's type predicate inference has limits - it can only process a certain level of complexity.

Not only that, but our code is now _extremely_ defensive. We're checking the existence _and_ type of every property. This is a lot of boilerplate, and might not be necessary. In fact, code like this should probably be encapsulated in a library like [Zod](https://zod.dev/).

### Writing Your Own Type Predicates

To solve this, we can manually annotate our `isAlbum` function with a type predicate:

```typescript
function isAlbum(input: unknown): input is Album {
  return (
    typeof input === "object" &&
    input !== null &&
    "id" in input &&
    "title" in input &&
    "artist" in input &&
    "year" in input
  );
}
```

This annotation tells TypeScript that when `isAlbum` returns `true`, the type of the value has been narrowed to `Album`.

Now, when we use `isAlbum`, TypeScript will infer it correctly:

```typescript
const run = (maybeAlbum: unknown) => {
  if (isAlbum(maybeAlbum)) {
    maybeAlbum.name.toUpperCase(); // No error!
  }
};
```

This can ensure that you get the same type behavior from complex type guards.

### Type Predicates Can be Unsafe

Authoring your own type predicates can be a little dangerous. TypeScript doesn't track if the type predicate's runtime behavior matches the type predicate's type signature.

```typescript
function isNumber(input: unknown): input is number {
  return typeof input === "string";
}
```

In this case, TypeScript _thinks_ that `isNumber` checks if something is a number. But in fact, it checks if something is a string! There are no guarantees that the runtime behavior of the function matches the type signature.

This is a common pitfall when working with type predicates - it's important to consider them about as unsafe as `as` and `!`.

## Assertion Functions

Assertion functions look similar to type predicates, but they're used slightly differently. Instead of returning a boolean to indicate whether a value is of a certain type, assertion functions throw an error if the value isn't of the expected type.

Here's how we could rework the `isAlbum` type predicate to be an `assertIsItem` assertion function:

```typescript
function assertIsAlbum(input: unknown): asserts input is Album {
  if (
    typeof input === "object" &&
    input !== null &&
    "id" in input &&
    "title" in input &&
    "artist" in input &&
    "year" in input
  ) {
    throw new Error("Not an Album!");
  }
}
```

The `assertIsAlbum` function takes in a `input` of type `unknown` and asserts that it is an `Album` using the `asserts input is Album` syntax.

This means that the narrowing is more aggressive. Instead of checking within an `if` statement, the function call itself is enough to assert that the `input` is an `Album`.

```ts twoslash
type Album = {
  id: number;
  title: string;
  artist: string;
  year: number;
};

function assertIsAlbum(input: unknown): asserts input is Album {
  if (
    typeof input === "object" &&
    input !== null &&
    "id" in input &&
    "title" in input &&
    "artist" in input &&
    "year" in input
  ) {
    throw new Error("Not an Album!");
  }
}
// ---cut---
function getAlbumTitle(item: unknown) {
  console.log(item);
  //          ^?

  assertIsAlbum(item);

  console.log(item.title);
  //          ^?
}
```

Assertion functions can be useful when you want to ensure that a value is of a certain type before proceeding with further operations.

### Assertion Functions Can Lie

Just like type predicates, assertion functions can be misused. If the assertion function doesn't accurately reflect the type being checked, it can lead to runtime errors.

For example, if the `assertIsAlbum` function doesn't check for all the required properties of an `Album`, it can lead to unexpected behavior:

```typescript
function assertIsAlbum(input: unknown): asserts input is Album {
  if (typeof input === "object") {
    throw new Error("Not an Album!");
  }
}

let item = null;

assertIsAlbum(item);

item.title;
// ^?
```

In this case, the `assertIsAlbum` function doesn't check for the required properties of an `Album` - it just checks if `typeof input` is `"object"`. This means we've left ourselves open to a stray `null`. The famous JavaScript quirk where `typeof null === 'object'` will cause a runtime error when we try to access the `title` property.

## Function Overloads

Function overloads provide a way to define multiple function signatures for a single function implementation. In other words, you can define different ways to call a function, each with its own set of parameters and return types. It's an interesting technique for creating a flexible API that can handle different use cases while maintaining type safety.

To demonstrate how function overloads work, we'll create a `searchMusic` function that allows for different ways to perform a search based on the provided arguments.

### Defining Overloads

To define function overloads, the same function definition is written multiple times with different parameter and return types. Each definition is called an overload signature, and is separated by semicolons. You'll also need to use the `function` keyword each time.

For the `searchMusic` example, we want to allow users to search by providing an artist, genre and year. But for legacy reasons, we want them to be able to pass them as a single object or as separate arguments.

Here's how we could define these function overload signatures. The first signature takes in three separate arguments, while the second signature takes in a single object with the properties:

```ts twoslash
// @errors: 2391
function searchMusic(artist: string, genre: string, year: number): void;
function searchMusic(criteria: {
  artist: string;
  genre: string;
  year: number;
}): void;
```

But we're getting an error. We've declared some ways this function should be declared, but we haven't provided the implementation yet.

### The Implementation Signature

The implementation signature is the actual function declaration that contains the actual logic for the function. It is written below the overload signatures, and must be compatible with all the defined overloads.

In this case, the implementation signature will take in a parameter called `queryOrCriteria` that can be either a `string` or an object with the specified properties. Inside the function, we'll check the type of `queryOrCriteria` and perform the appropriate search logic based on the provided arguments:

```typescript
function searchMusic(artist: string, genre: string, year: number): void;
function searchMusic(criteria: {
  artist: string;
  genre: string;
  year: number;
}): void;
function searchMusic(
  artistOrCriteria: string | { artist: string; genre: string; year: number },
  genre?: string,
  year?: number,
): void {
  if (typeof artistOrCriteria === "string") {
    // Search with separate arguments
    search(artistOrCriteria, genre, year);
  } else {
    // Search with object
    search(
      artistOrCriteria.artist,
      artistOrCriteria.genre,
      artistOrCriteria.year,
    );
  }
}
```

Now we can call the `searchMusic` function with the different arguments defined in the overloads:

```typescript
searchMusic("King Gizzard and the Lizard Wizard", "Psychedelic Rock", 2021);
searchMusic({
  artist: "Tame Impala",
  genre: "Psychedelic Rock",
  year: 2015,
});
```

However, TypeScript will warn us if we attempt to pass in an argument that doesn't match any of the defined overloads:

```ts twoslash
// @errors: 2575
function searchMusic(artist: string, genre: string, year: number): void;
function searchMusic(criteria: {
  artist: string;
  genre: string;
  year: number;
}): void;
function searchMusic(
  artistOrCriteria: string | { artist: string; genre: string; year: number },
  genre?: string,
  year?: number,
): void {}
// ---cut---
searchMusic(
  {
    artist: "Tame Impala",
    genre: "Psychedelic Rock",
    year: 2015,
  },
  "Psychedelic Rock",
);
```

This error shows us that we're trying to call `searchMusic` with two arguments, but the overloads only expect one or three arguments.

### Function Overloads vs Unions

Function overloads can be useful when you have multiple call signatures spread over different sets of arguments. In the example above, we can either call the function with one argument, or three.

When you have the same number of arguments but different types, you should use a union type instead of function overloads. For example, if you want to allow the user to search by either artist name or criteria object, you could use a union type:

```typescript
function searchMusic(
  query: string | { artist: string; genre: string; year: number },
): void {
  if (typeof query === "string") {
    // Search by artist
    searchByArtist(query);
  } else {
    // Search by all
    search(query.artist, query.genre, query.year);
  }
}
```

This uses far fewer lines of code than defining two overloads and an implementation.

## Exercises

### Exercise 1: Make a Function Generic

Here we have a function `createStringMap`. The purpose of this function is to generate a `Map` with keys as strings and values of the type passed in as arguments:

```typescript
const createStringMap = () => {
  return new Map();
};
```

As it currently stands, we get back a `Map<any, any>`. However, the goal is to make this function generic so that we can pass in a type argument to define the type of the values in the `Map`.

For example, if we pass in `number` as the type argument, the function should return a `Map` with values of type `number`:

```ts twoslash
// @errors: 2558 2578
const createStringMap = () => {
  return new Map();
};
// ---cut---
const numberMap = createStringMap<number>();

numberMap.set("foo", 123);
```

Likewise, if we pass in an object type, the function should return a `Map` with values of that type:

```ts twoslash
// @errors: 2558 2578
const createStringMap = () => {
  return new Map();
};
// ---cut---
const objMap = createStringMap<{ a: number }>();

objMap.set("foo", { a: 123 });

objMap.set(
  "bar",
  // @ts-expect-error
  { b: 123 },
);
```

The function should also default to `unknown` if no type is provided:

```ts twoslash
// @errors: 2344
import { Equal, Expect } from "@total-typescript/helpers";
const createStringMap = () => {
  return new Map();
};
// ---cut---
const unknownMap = createStringMap();

type test = Expect<Equal<typeof unknownMap, Map<string, unknown>>>;
```

Your task is to transform `createStringMap` into a generic function capable of accepting a type argument to describe the values of Map. Make sure it functions as expected for the provided test cases.

<Exercise title="Exercise 1: Make a Function Generic" filePath="/src/085-the-utils-folder/215-generic-functions-without-inference.problem.ts"></Exercise>

### Exercise 2: Default Type Arguments

After making the `createStringMap` function generic in Exercise 1, calling it without a type argument defaults to values being typed as `unknown`:

```typescript
const stringMap = createStringMap();

// hovering over stringMap shows:
const stringMap: Map<string, unknown>;
```

Your goal is to add a default type argument to the `createStringMap` function so that it defaults to `string` if no type argument is provided. Note that you will still be able to override the default type by providing a type argument when calling the function.

<Exercise title="Exercise 2: Default Type Arguments" filePath="/src/085-the-utils-folder/216-type-parameter-defaults-in-generic-functions.problem.ts"></Exercise>

### Exercise 3: Inference in Generic Functions

Consider this `uniqueArray` function:

```typescript
const uniqueArray = (arr: any[]) => {
  return Array.from(new Set(arr));
};
```

The function accepts an array as an argument, then converts it to a `Set`, then returns it as a new array. This is a common pattern for when you want to have unique values inside your array.

While this function operates effectively at runtime, it lacks type safety. It transforms any array passed in into `any[]`.

```ts twoslash
// @errors: 2344
import { Equal, Expect } from "@total-typescript/helpers";
import { it, expect } from "vitest";
const uniqueArray = (arr: any[]) => {
  return Array.from(new Set(arr));
};
// ---cut---
it("returns an array of unique values", () => {
  const result = uniqueArray([1, 1, 2, 3, 4, 4, 5]);

  type test = Expect<Equal<typeof result, number[]>>;

  expect(result).toEqual([1, 2, 3, 4, 5]);
});

it("should work on strings", () => {
  const result = uniqueArray(["a", "b", "b", "c", "c", "c"]);

  type test = Expect<Equal<typeof result, string[]>>;

  expect(result).toEqual(["a", "b", "c"]);
});
```

Your task is to boost the type safety of the `uniqueArray` function by making it generic.

Note that in the tests, we do not explicitly provide type arguments when invoking the function. TypeScript should be able to infer the type from the argument.

Adjust the function and insert the necessary type annotations to ensure that the `result` type in both tests is inferred as `number[]` and `string[]`, respectively.

<Exercise title="Exercise 3: Inference in Generic Functions" filePath="/src/085-the-utils-folder/217-generic-functions-with-inference.problem.ts"></Exercise>

### Exercise 4: Type Parameter Constraints

Consider this function `addCodeToError`, which accepts a type parameter `TError` and returns an object with a `code` property:

```ts twoslash
// @errors: 2339
const UNKNOWN_CODE = 8000;

const addCodeToError = <TError>(error: TError) => {
  return {
    ...error,
    code: error.code ?? UNKNOWN_CODE,
  };
};
```

If the incoming error doesn't include a `code`, the function assigns a default `UNKNOWN_CODE`. Currently there is an error under the `code` property.

Currently, there are no constraints on `TError`, which can be of any type. This leads to errors in our tests:

```ts twoslash
// @errors: 2344
import { Equal, Expect } from "@total-typescript/helpers";
import { it, expect } from "vitest";

const UNKNOWN_CODE = 8000;

const addCodeToError = <TError>(error: TError) => {
  return {
    ...error,
    code: (error as any).code ?? UNKNOWN_CODE,
  };
};
// ---cut---
it("Should accept a standard error", () => {
  const errorWithCode = addCodeToError(new Error("Oh dear!"));

  type test1 = Expect<Equal<typeof errorWithCode, Error & { code: number }>>;

  console.log(errorWithCode.message);

  type test2 = Expect<Equal<typeof errorWithCode.message, string>>;
});

it("Should accept a custom error", () => {
  const customErrorWithCode = addCodeToError({
    message: "Oh no!",
    code: 123,
    filepath: "/",
  });

  type test3 = Expect<
    Equal<
      typeof customErrorWithCode,
      {
        message: string;
        code: number;
        filepath: string;
      } & {
        code: number;
      }
    >
  >;

  type test4 = Expect<Equal<typeof customErrorWithCode.message, string>>;
});
```

Your task is to update the `addCodeToError` type signature to enforce the required constraints so that `TError` is required to have a `message` property and can optionally have a `code` property.

<Exercise title="Exercise 4: Type Parameter Constraints" filePath="/src/085-the-utils-folder/216-type-parameter-defaults-in-generic-functions.problem.ts"></Exercise>

### Exercise 5: Combining Generic Types and Functions

Here we have `safeFunction`, which accepts a function `func` typed as `PromiseFunc` that returns a function itself. However, if `func` encounters an error, it is caught and returned instead:

```typescript
type PromiseFunc = () => Promise<any>;

const safeFunction = (func: PromiseFunc) => async () => {
  try {
    const result = await func();
    return result;
  } catch (e) {
    if (e instanceof Error) {
      return e;
    }
    throw e;
  }
};
```

In short, the thing that we get back from `safeFunction` should either be the thing that's returned from `func` or an `Error`.

However, there are some issues with the current type definitions.

The `PromiseFunc` type is currently set to always return `Promise<any>`. This means that the function returned by `safeFunction` is supposed to return either the result of `func` or an `Error`, but at the moment, it's just returning `Promise<any>`.

There are several tests that are failing due to these issues:

```ts twoslash
// @errors: 2344
import { Equal, Expect } from "@total-typescript/helpers";
import { it, expect } from "vitest";

type PromiseFunc = () => Promise<any>;

const safeFunction = (func: PromiseFunc) => async () => {
  try {
    const result = await func();
    return result;
  } catch (e) {
    if (e instanceof Error) {
      return e;
    }
    throw e;
  }
};

// ---cut---
it("should return an error if the function throws", async () => {
  const func = safeFunction(async () => {
    if (Math.random() > 0.5) {
      throw new Error("Something went wrong");
    }
    return 123;
  });

  type test1 = Expect<Equal<typeof func, () => Promise<Error | number>>>;

  const result = await func();

  type test2 = Expect<Equal<typeof result, Error | number>>;
});

it("should return the result if the function succeeds", async () => {
  const func = safeFunction(() => {
    return Promise.resolve(`Hello!`);
  });

  type test1 = Expect<Equal<typeof func, () => Promise<string | Error>>>;

  const result = await func();

  type test2 = Expect<Equal<typeof result, string | Error>>;

  expect(result).toEqual("Hello!");
});
```

Your task is to update `safeFunction` to have a generic type parameter, and update `PromiseFunc` to not return `Promise<any>`. This will require you to combine generic types and functions to ensure that the tests pass successfully.

<Exercise title="Exercise 5: Combining Generic Types and Functions" filePath="/src/085-the-utils-folder/219-combining-generic-types-with-generic-functions.problem.ts"></Exercise>

### Exercise 6: Multiple Type Arguments in a Generic Function

After making the `safeFunction` generic in Exercise 5, it's been updated to allow for passing arguments:

```typescript
const safeFunction =
  <TResult>(func: PromiseFunc<TResult>) =>
  async (...args: any[]) => {
    //   ^^^^^^^^^^^^^^ Now can receive args!
    try {
      const result = await func(...args);
      return result;
    } catch (e) {
      if (e instanceof Error) {
        return e;
      }
      throw e;
    }
  };
```

Now that the function being passed into `safeFunction` can receive arguments, the function we get back should _also_ contain those arguments and require you to pass them in.

However, as seen in the tests, this isn't working:

```ts twoslash
// @errors: 2344
import { Equal, Expect } from "@total-typescript/helpers";
import { it, expect } from "vitest";

type PromiseFunc<T> = (...args: any[]) => Promise<T>;

const safeFunction =
  <TResult>(func: PromiseFunc<TResult>) =>
  async (...args: any[]) => {
    //   ^^^^^^^^^^^^^^ Now can receive args!
    try {
      const result = await func(...args);
      return result;
    } catch (e) {
      if (e instanceof Error) {
        return e;
      }
      throw e;
    }
  };
// ---cut---
it("should return the result if the function succeeds", async () => {
  const func = safeFunction((name: string) => {
    return Promise.resolve(`hello ${name}`);
  });

  type test1 = Expect<
    Equal<typeof func, (name: string) => Promise<Error | string>>
  >;
});
```

For example, in the above test the `name` isn't being inferred as a parameter of the function returned by `safeFunction`. Instead, it's actually saying that we can pass in as many arguments as we want to into the function, which isn't correct.

```typescript
// hovering over func shows:
const func: (...args: any[]) => Promise<string | Error>;
```

Your task is to add a second type parameter to `PromiseFunc` and `safeFunction` to infer the argument types accurately.

As seen in the tests, there are cases where no parameters are necessary, and others where a single parameter is needed:

```ts twoslash
// @errors: 2344
import { Equal, Expect } from "@total-typescript/helpers";
import { it, expect } from "vitest";

type PromiseFunc<T> = (...args: any[]) => Promise<T>;

const safeFunction =
  <TResult>(func: PromiseFunc<TResult>) =>
  async (...args: any[]) => {
    try {
      const result = await func(...args);
      return result;
    } catch (e) {
      if (e instanceof Error) {
        return e;
      }
      throw e;
    }
  };
// ---cut---
it("should return an error if the function throws", async () => {
  const func = safeFunction(async () => {
    if (Math.random() > 0.5) {
      throw new Error("Something went wrong");
    }
    return 123;
  });

  type test1 = Expect<Equal<typeof func, () => Promise<Error | number>>>;

  const result = await func();

  type test2 = Expect<Equal<typeof result, Error | number>>;
});

it("should return the result if the function succeeds", async () => {
  const func = safeFunction((name: string) => {
    return Promise.resolve(`hello ${name}`);
  });

  type test1 = Expect<
    Equal<typeof func, (name: string) => Promise<Error | string>>
  >;

  const result = await func("world");

  type test2 = Expect<Equal<typeof result, string | Error>>;

  expect(result).toEqual("hello world");
});
```

Update the types of the function and the generic type, and make these tests pass successfully.

<Exercise title="Exercise 6: Multiple Type Arguments in a Generic Function" filePath="/src/085-the-utils-folder/220-multiple-type-arguments-in-generic-functions.problem.ts"></Exercise>

### Exercise 8: Assertion Functions

This exercise starts with an interface `User`, which has properties `id` and `name`. Then we have an interface `AdminUser`, which extends `User`, inheriting all its properties and adding a `roles` string array property:

```typescript
interface User {
  id: string;
  name: string;
}

interface AdminUser extends User {
  roles: string[];
}
```

The function `assertIsAdminUser` accepts either a `User` or `AdminUser` object as an argument. If the `roles` property isn't present in the argument, the function throws an error:

```typescript
function assertIsAdminUser(user: User | AdminUser) {
  if (!("roles" in user)) {
    throw new Error("User is not an admin");
  }
}
```

This function's purpose is to verify we are able to access properties that are specific to the `AdminUser`, such as `roles`.

In the `handleRequest` function, we call `assertIsAdminUser` and expect the type of `user` to be narrowed down to `AdminUser`.

But as seen in this test case, it doesn't work as expected:

```ts twoslash
// @errors: 2344 2339
import { Equal, Expect } from "@total-typescript/helpers";

interface User {
  id: string;
  name: string;
}

interface AdminUser extends User {
  roles: string[];
}

function assertIsAdminUser(user: User | AdminUser) {
  if (!("roles" in user)) {
    throw new Error("User is not an admin");
  }
}

// ---cut---
const handleRequest = (user: User | AdminUser) => {
  type test1 = Expect<Equal<typeof user, User | AdminUser>>;

  assertIsAdminUser(user);

  type test2 = Expect<Equal<typeof user, AdminUser>>;

  user.roles;
};
```

The `user` type is `User | AdminUser` before `assertIsAdminUser` is called, but it doesn't get narrowed down to just `AdminUser` after the function is called. This means we can't access the `roles` property.

Your task is to update the `assertIsAdminUser` function with the proper type assertion so that the `user` is identified as an `AdminUser` after the function is called.

<Exercise title="Exercise 8: Assertion Functions" filePath="/src/085-the-utils-folder/222-assertion-functions.problem.ts"></Exercise>

### Solution 1: Make a Function Generic

The first thing we'll do to make this function generic is to add a type parameter `T`:

```typescript
const createStringMap = <T>() => {
  return new Map();
};
```

With this change, our `createStringMap` function can now handle a type argument `T`.

The error has disappeared from the `numberMap` variable, but the function is still returning a `Map<any, any>`:

```typescript
const numberMap = createStringMap<number>();

// hovering over createStringMap shows:
const createStringMap: <number>() => Map<any, any>;
```

We need to specify the types for the map entries.

Since we know that the keys will always be strings, we'll set the first type argument of `Map` to `string`. For the values, we'll use our type parameter `T`:

```typescript
const createStringMap = <T>() => {
  return new Map<string, T>();
};
```

Now the function can correctly type the map's values.

If we don't pass in a type argument, the function will default to `unknown`:

```typescript
const objMap = createStringMap();

// hovering over objMap shows:
const objMap: Map<string, unknown>;
```

Through these steps, we've successfully transformed `createStringMap` from a regular function into a generic function capable of receiving type arguments.

### Solution 2: Default Type Arguments

The syntax for setting default types for generic functions is the same as for generic types:

```typescript
const createStringMap = <T = string>() => {
  return new Map<string, T>();
};
```

By using the `T = string` syntax, we tell the function that if no type argument is supplied, it should default to `string`.

Now when we call `createStringMap()` without a type argument, we end up with a `Map` where both keys and values are `string`:

```typescript
const stringMap = createStringMap();

// hovering over stringMap shows:
const stringMap: Map<string, string>;
```

If we attempt to assign a number as a value, TypeScript gives us an error because it expects a string:

```ts twoslash
// @errors: 2345
const createStringMap = <T = string>() => {
  return new Map<string, T>();
};

const stringMap = createStringMap();

// ---cut---
stringMap.set("bar", 123);
```

However, we can still override the default type by providing a type argument when calling the function:

```typescript
const numberMap = createStringMap<number>();
numberMap.set("foo", 123);
```

In the above code, `numberMap` will result in a `Map` with `string` keys and `number` values, and TypeScript will give an error if we try assigning a non-number value:

```typescript
numberMap.set(
  "bar",
  // @ts-expect-error
  true,
);
```

### Solution 3: Inference in Generic Functions

The first step is to add a type parameter onto `uniqueArray`. This turns `uniqueArray` into a generic function that can receive type arguments:

```typescript
const uniqueArray = <T>(arr: any[]) => {
  return Array.from(new Set(arr));
};
```

Now when we hover over a call to `uniqueArray`, we can see that it is inferring the type as `unknown`:

```ts twoslash
const uniqueArray = <T>(arr: any[]) => {
  return Array.from(new Set(arr));
};

// ---cut---
const result = uniqueArray([1, 1, 2, 3, 4, 4, 5]);
//             ^?
```

This is because we haven't passed any type arguments to it. If there's no type argument and no default, it defaults to unknown.

We want the type argument to be inferred as a number because we know that the thing we're getting back is an array of numbers.

So what we'll do is add a return type of `T[]` to the function:

```typescript
const uniqueArray = <T>(arr: any[]): T[] => {
  return Array.from(new Set(arr));
};
```

Now the result of `uniqueArray` is inferred as an `unknown` array:

```ts twoslash
const uniqueArray = <T>(arr: any[]): T[] => {
  return Array.from(new Set(arr));
};

// ---cut---
const result = uniqueArray([1, 1, 2, 3, 4, 4, 5]);
//    ^?
```

Again, the reason for this is that we haven't passed any type arguments to it. If there's no type argument and no default, it defaults to unknown.

If we add a `<number>` type argument to the call, the `result` will now be inferred as a number array:

```ts twoslash
const uniqueArray = <T>(arr: any[]): T[] => {
  return Array.from(new Set(arr));
};
// ---cut---
const result = uniqueArray<number>([1, 1, 2, 3, 4, 4, 5]);
//       ^?
```

However, at this point there's no relationship between the things we're passing in and the thing we're getting out. Adding a type argument to the call returns an array of that type, but the `arr` parameter in the function itself is still typed as `any[]`.

What we need to do is tell TypeScript that the type of the `arr` parameter is the same type as what is passed in.

To do this, we'll replace `arr: any[]` with `arr: T[]`:

```typescript
const uniqueArray = <T>(arr: T[]): T[] => {
  ...
```

The function's return type is an array of `T`, where `T` represents the type of elements in the array supplied to the function.

Thus, TypeScript can infer the return type as `number[]` for an input array of numbers, or `string[]` for an input array of strings, even without explicit return type annotations. As we can see, the tests pass successfully:

```typescript
// number test
const result = uniqueArray([1, 1, 2, 3, 4, 4, 5]);

type test = Expect<Equal<typeof result, number[]>>;

// string test
const result = uniqueArray(["a", "b", "b", "c", "c", "c"]);

type test = Expect<Equal<typeof result, string[]>>;
```

If you explicitly pass a type argument, TypeScript will use it. If you don't, TypeScript attempts to infer it from the runtime arguments.

### Solution 4: Type Parameter Constraints

The syntax to add constraints is the same as what we saw for generic types.

We need to use the `extends` keyword to add constraints to the generic type parameter `TError`. The object passed in is required to have a `message` property of type `string`, and can optionally have a `code` of type `number`:

```typescript
const UNKNOWN_CODE = 8000;

const addCodeToError = <TError extends { message: string; code?: number }>(
  error: TError,
) => {
  return {
    ...error,
    code: error.code ?? UNKNOWN_CODE,
  };
};
```

This change ensures that `addCodeToError` must be called with an object that includes a `message` string property. TypeScript also knows that `code` could either be a number or `undefined`. If `code` is absent, it will default to `UNKNOWN_CODE`.

These constraints make our tests pass, including the case where we pass in an extra `filepath` property. This is because using `extends` in generics does not restrict you to only passing in the properties defined in the constraint.

### Solution 5: Combining Generic Types and Functions

Here's the starting point of our `safeFunction`:

```typescript
type PromiseFunc = () => Promise<any>;

const safeFunction = (func: PromiseFunc) => async () => {
  try {
    const result = await func();
    return result;
  } catch (e) {
    if (e instanceof Error) {
      return e;
    }
    throw e;
  }
};
```

The first thing we'll do is update the `PromiseFunc` type to be a generic type. We'll call the type parameter `TResult` to represent the type of the value returned by the promise, and and it to the return type of the function:

```typescript
type PromiseFunc<TResult> = () => Promise<TResult>;
```

With this update, we now need to update the `PromiseFunc` in the `safeFunction` to include the type argument:

```typescript
const safeFunction =
  <TResult>(func: PromiseFunc<TResult>) =>
  async () => {
    try {
      const result = await func();
      return result;
    } catch (e) {
      if (e instanceof Error) {
        return e;
      }
      throw e;
    }
  };
```

With these changes in place, when we hover over the `safeFunction` call in the first test, we can see that the type argument is inferred as `number` as expected:

```typescript
it("should return an error if the function throws", async () => {
  const func = safeFunction(async () => {
    if (Math.random() > 0.5) {
      throw new Error("Something went wrong");
    }
    return 123;
  });
  ...

// hovering over safeFunction shows:
const safeFunction: <number>(func: PromiseFunc<number>) => Promise<() => Promise<number | Error>>
```

The other tests pass as well.

Whatever we pass into `safeFunction` will be inferred as the type argument for `PromiseFunc`. This is because the type argument is being inferred _inside_ the generic function.

This combination of generic functions and generic types can make your generic functions a lot easier to read.

### Solution 6: Multiple Type Arguments in a Generic Function

Here's how `PromiseFunc` is currently defined:

```typescript
type PromiseFunc<TResult> = (...args: any[]) => Promise<TResult>;
```

The first thing to do is figure out the types of the arguments being passed in. Currently, they're set to one value, but they need to be different based on the type of function being passed in.

Instead of having `args` be of type `any[]`, we want to spread in all of the `args` and capture the entire array.

To do this, we'll update the type to be `TArgs`. Since `args` needs to be an array, we'll say that `TArgs extends any[]`. Note that this doesn't mean that `TArgs` will be typed as `any`, but rather that it will accept any kind of array:

```typescript
type PromiseFunc<TArgs extends any[], TResult> = (
  ...args: TArgs
) => Promise<TResult>;
```

You might have tried this with `unknown[]` - but `any[]` is the only thing that works in this scenario.

Now we need to update the `safeFunction` so that it has the same arguments as `PromiseFunc`. To do this, we'll add `TArgs` to its type parameters.

Note that we also need to update the args for the `async` function to be of type `TArgs`:

```typescript
const safeFunction =
  <TArgs extends any[], TResult>(func: PromiseFunc<TArgs, TResult>) =>
  async (...args: TArgs) => {
    try {
      const result = await func(...args);
      return result;
    } catch (e) {
      ...
```

This change is necessary in order to make sure the function returned by `safeFunction` has the same typed arguments as the original function.

With these changes, all of our tests pass as expected.

### Solution 8: Assertion Functions

The solution is to add a type annotation onto the return type of `assertIsAdminUser`.

If it was a type predicate, we would say `user is AdminUser`:

```ts twoslash
// @errors: 2355
type User = {
  id: string;
  name: string;
};
type AdminUser = {
  id: string;
  name: string;
  roles: string[];
};

// ---cut---
function assertIsAdminUser(user: User): user is AdminUser {
  if (!("roles" in user)) {
    throw new Error("User is not an admin");
  }
}
```

However, this leads to an error. We get this error because `assertIsAdminUser` is returning `void`, which is different from a type predicate that requires you to return a Boolean.

Instead, we need to add the `asserts` keyword to the return type:

```typescript
function assertIsAdminUser(user: User | AdminUser): asserts user is AdminUser {
  if (!("roles" in user)) {
    throw new Error("User is not an admin");
  }
}
```

By adding the `asserts` keyword, just by the fact that `assertIsAdminUser` is called we can assert that the user is an `AdminUser`. We don't need to put it inside an `if` statement or anywhere else.

With the `asserts` change in place, the `user` type is narrowed down to `AdminUser` after `assertIsAdminUser` is called and the test passes as expected:

```typescript
const handleRequest = (user: User | AdminUser) => {
  type test1 = Expect<Equal<typeof user, User | AdminUser>>;

  assertIsAdminUser(user);

  type test2 = Expect<Equal<typeof user, AdminUser>>;

  user.roles;
};

// hovering over roles shows:
user: AdminUser;
```
