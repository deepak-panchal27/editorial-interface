# Editorial Interface - Frontend

Welcome to the Editorial Interface project! This repository contains frontend applications for managing editorial content.

## Frontend

The frontend is built using React.js and Material-UI. It provides a user-friendly interface for creating, editing, and managing editorial content.

## Features

- **Pagination**: Allows users to navigate through multiple pages of blog posts.
- **Responsive Design**: Ensures optimal viewing experience across various devices.
- **Loading Indicators**: Provides visual feedback during data fetching operations.
- **Error Handling**: Gracefully handles errors during data fetching and socket connection.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Material-UI**: React component library for creating responsive designs.
- **React Router**: Declarative routing library for React applications.
- **clean-webpack-plugin**: A webpack plugin to clean the output directory before building.
- **html-webpack-plugin**: Simplifies creation of HTML files to serve webpack bundles.

### Build Tools
- **Webpack**: A powerful module bundler for JavaScript applications, used to compile and bundle the React application.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/deepak-panchal27/editorial-interface.git
    ```

2. Navigate to the project directory:
    ```bash
    cd frontend
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

To build the project in development mode, run:
```bash
npm run build:dev
```

To start the project in development mode, run:
```bash
npm run serve:dev

#This will build the project for development using webpack and serve the project for development.
```

### Accessing the Application
Once the frontend is running, you can access the application at [http://localhost:3002](http://localhost:3002)

## Usage

- Users can view live blog posts on the homepage.
- Pagination controls allow users to navigate through multiple pages of blog posts.
- Clicking on a blog post redirects users to the detailed view.

## Contributors
- [Deepak Panchal](https://github.com/deepak-panchal27)

Feel free to explore the codebase and contribute to make this Editorial Interface even better!

## Acknowledgements

- Special thanks to the developers of React, Material-UI, and React Router.