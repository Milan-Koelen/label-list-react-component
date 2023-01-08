## README

This code is a React component that allows the user to create a list of tags and store them in the URL. It uses the `useState` hook from the `react` library to manage the state of the list of tags and the input field for adding new tags.

The component takes in a `props` object with the following properties:
- `solid` (optional): a boolean value indicating whether the tags should have a solid background color (Default = `false`)
- `color` (optional): a string representing the color of the tags (Default = `grey-200`)
- `param`: a string representing the URL parameter that stores the list of tags
- `title` (optional): a string representing the title of the tag list (Ommit if no title wanted)

The component has the following functions:
- `TagList`: the main component function that returns JSX to render the tag list. It uses the `useState` hook to initialize the state of the `items` array with the list of tags stored in the URL and the `input` string with an empty string.
- `addItem`: a function that takes in a new tag as an input and adds it to the `items` array if it is not already in the array or if it is an empty string. It then updates the URL with the updated list of tags.
- `handleInput`: a function that takes in an event object and updates the `input` state with the value of the input field. It also listens for the `Enter` key press and calls the `addItem` function with the current `input` value.
- `removeTag`: a function that takes in a tag as an input and removes it from the `items` array. It then updates the URL with the updated list of tags.

The component also includes a form element with an input field and a submit button that allows the user to add new tags to the list. The tags are displayed in a list element as clickable elements that call the `removeTag` function when clicked. The component also applies various styles to the tags and the form elements using class names from a `css` file.


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

<!-- ### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information. -->
