# Digiterra Data visualization Task

This project is built with React.js (Bootstrapped with Create React App).

## Features

- [x] All main metrics got from broker and represented in real-time
- ### Extra Features
  - [x] Dark theme support (from system theme, saved locally if customized)
  - [x] User online status and broker connection status
  - [x] Theme responsive toast for alerts
  - [ ] It would be really great to add drag-and-drop feature to board components (Couldn't implement it for now with the given deadline.)

## Main Used Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [React Js](https://reactjs.org/docs) as Js Framework
- [Tailwind Css](https://tailwindcss.com/) for styling
- [Prettier](https://prettier.io/) - for code formatting.
- [Charts Js](https://react-chartjs-2.js.org/) - as Js charting library.
- [MQTT.js](https://www.npmjs.com/package/mqtt) - as MQTT client library.
- [React Hot Toast](https://react-hot-toast.com/) - as notification library (error alerts).

## Project directory structure

Main folder structure

```
📂 public
  📂 favicons
  📄 index.html
  📄 robots.txt
  
📂 src
  📂 assets
    📂 icons
    📂 images
  📂 components
    ...📄 {component}.tsx
  📂 data
      📂 models
        ...📄 {model}.ts
      📂 services
        ...📄 {service}.ts
  📂 styles
    📄 globals.scss
  📄 App.tsx
  📄 index.tsx

```

## Scripts

Run the app in the development mode from [http://localhost:3000](http://localhost:3000) :

`npm start`

Launch the test runner in interactive watch mode :

`npm test`

Builds the app for production to the `build` folder

`npm run build`

Eject the project

`npm run eject`

