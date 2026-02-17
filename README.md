# CherryOS

CherryOS is a React-based operating system interface designed to provide a modern, responsive user experience with a focus on accessibility and performance.

## Project Structure

This project was bootstrapped with Create React App and includes:

- React 18 with Hooks
- TypeScript support
- Responsive design with CSS modules
- Testing with Jest and React Testing Library
- GitHub Actions for CI/CD

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

## GitHub Actions Workflows

This project uses GitHub Actions for continuous integration and deployment:

1. **ci-cd.yml** - Runs tests and builds the application on every push and pull request to the main branch
2. **publish.yml** - Publishes the package to both NPM and GitHub Packages when a new release is created

## Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).