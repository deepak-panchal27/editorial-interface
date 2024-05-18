# Editorial Interface

Welcome to the Editorial Interface project! This repository contains both the backend and frontend applications for managing editorial content.

## Backend

The backend is built using Node.js, Express.js, and MongoDB. It provides RESTful API endpoints for managing blogs and posts for editors.

### Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- Cloudinary
- Axios
- Cheerio
- Compression
- CORS
- Dotenv
- Express-mongo-sanitize
- Helmet
- Multer
- XSS-clean

## Frontend

The frontend is built using React.js and Material-UI. It provides a user-friendly interface for creating, editing, and managing editorial content.

### Technologies Used
- React.js
- Material-UI
- Fetch (for API requests)

### Build Tools
- **Webpack**: A powerful module bundler for JavaScript applications, used to compile and bundle the React application.

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/deepak-panchal27/editorial-interface.git
    ```

2. Navigate to the project directory:
    ```bash
    cd editorial-interface
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

To start the development server, run:
```bash
npm start

#this will start both backend and frontend
```

### Accessing the Application
Once both the backend and frontend are running, you can access the application at 
Backend - [http://localhost:3001](http://localhost:3001) and Frontend - [http://localhost:3002](http://localhost:3002)

### Folder Structure
- `backend`: Contains the backend Node.js application files.
- `frontend`: Contains the frontend React.js application files.
- `README.md`: Project documentation.

```bash
editorial-interface
│   README.md
│   package.json
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── server.js
│   ├── .env
│   └── package.json
│   
│
└── frontend
    ├── public
    ├── src
    │   ├── components
    │   │   ├── services
    │   │       └── api.js
    │   ├── App.js
    │   └── index.js
    ├── package.json

```

## Contributors
- [Deepak Panchal](https://github.com/deepak-panchal27)

Feel free to explore the codebase and contribute to make this Editorial Interface even better!