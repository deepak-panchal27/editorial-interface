# Editorial Interface

Welcome to the Editorial Interface project! This repository contains both the backend and frontend applications for managing editorial content.

## Backend

The backend is built using Node.js, Express.js, and MongoDB. It provides RESTful API endpoints for managing blogs and posts for editors.

### Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- Axios (for external API requests)
- Helmet (for security headers)
- Multer (for file uploads)
- Express Mongo Sanitize (for sanitizing MongoDB queries)
- Cors (for Cross-Origin Resource Sharing)
- Dotenv (for environment variables)

## Frontend

The frontend is built using React.js and Material-UI. It provides a user-friendly interface for creating, editing, and managing editorial content.

### Technologies Used
- React.js
- Material-UI
- Fetch (for API requests)

### Installation
1. Navigate to the `editorial-interface` directory.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the backend and frontend development server.

### Accessing the Application
Once both the backend and frontend are running, you can access the application at [http://localhost:3002](http://localhost:3002).

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