# Editorial Interface - Backend RESTful API / Real-time communication

## Description
This project is a backend built using Node.js, Express.js, and MongoDB. It provides RESTful API endpoints for managing blogs and posts for editors, along with real-time communication capabilities using Socket.IO.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- Socket.io
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

## Installation Steps

Clone the repository:

```bash
git clone https://github.com/deepak-panchal27/editorial-interface.git
cd backend
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)
- [Validation](#validation)
- [Custom Mongoose Plugins](#custom-mongoose-plugins)

## Features

- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Validation**: Request data validation
- **Error handling**: Centralized error handling mechanism
- **DB connection first and gracefull shutdown**: First MongoDB is connected and then Express App is started. Also implemented gracefull shutdown of Express App.
- **Real-Time updates**: [Socket.IO](https://github.com/socketio/socket.io) is used for real-time communication in this project. It allows clients to receive instant updates for new blogs/posts and edits made by other users.
- **Image uploading**: Image is uploaded to [Cloudinary](https://cloudinary.com/) and its path is saved in MongoDB.
- **Link scraping**: Link scraping using [Axios](https://github.com/axios/axios) and [Cheerio](https://github.com/cheeriojs/cheerio)
- **Process management**: advanced production process management using [PM2](https://pm2.keymetrics.io)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv)
- **Security**: Set security HTTP headers using [helmet](https://helmetjs.github.io)
- **Santizing**: Sanitize request data against xss and query injection
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)

## Commands

Running locally:

```bash
npm i
npm start
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=mongodb://localhost:27017/editorial-interface

```

## Project Structure

```
backend\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--middlewares\    # Centralized Error handling and validation middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--uploads\        # Uploaded images
 |--server.js        # App entry point
```

## API Documentation

Server will start running on `http://localhost:3001/`.

### API Endpoints

List of available routes:

**Blog routes**:\
`GET /api/v1/blogs` - getAllBlogs\
`POST /api/v1/blogs` - createBlog\
`GET /api/v1/blogs/:blogId` - getBlogDetails\
`DELETE /api/v1/blogs/:blogId` - deleteBlog\
`POST /api/v1/blogs/:blogId/publish` - toogleBlog\
`POST /api/v1/blogs/published` - getPublishedBlogs

**Post routes**:\
`POST /api/v1/posts/:blogId` - createPost\
`POST /api/v1/posts/:postId` - updatePost\
`DELETE /api/v1/posts/:postId` - deletePost

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`).

The error handling middleware sends an error response, which has the following format:

```json
{
  "code": 404,
  "message": "Not found"
}
```

## Validation

Request data is validated using custom validation in middleware folder.

```javascript
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { validateObjectId, validateRequestBody } = require('../middlewares/validationMiddleware');

router.route('/')
  .get(blogController.getAllBlogs)
  .post(validateRequestBody(['name']), blogController.createBlog);

router.route('/:blogId')
  .get(validateObjectId('blogId'), blogController.getBlogDetails)
  .delete(validateObjectId('blogId'), blogController.deleteBlog);
```

## Logging

Import the logger from `/config/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending order from most important to least important):

```javascript
const logger = require('<path to src>/config/logger');

logger.error('message'); // level 0
logger.warn('message'); // level 1
logger.info('message'); // level 2
logger.http('message'); // level 3
logger.verbose('message'); // level 4
logger.debug('message'); // level 5
```

In development mode, log messages of all severity levels will be printed to the console.

In production mode, only `info`, `warn`, and `error` logs will be printed to the console.\
It is up to the server (or process manager) to actually read them from the console and store them in log files.\
This app uses pm2 in production mode, which is already configured to store the logs in log files.

Note: API request information (request url, response code, timestamp, etc.) are also automatically logged (using [morgan](https://github.com/expressjs/morgan)).

## Custom Mongoose Plugins

The app also contains 2 custom mongoose plugins that you can attach to any mongoose model schema. You can find the plugins in `/models/plugins`.

```javascript
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const blogSchema = new mongoose.Schema(
  {
    /* schema definition here */
  },
  { timestamps: true }
);

blogSchema.plugin(toJSON);
blogSchema.plugin(paginate);
```

### toJSON

The toJSON plugin applies the following changes in the toJSON transform call:

- removes \_\_v, createdAt, updatedAt, and any schema path that has private: true
- replaces \_id with id

### paginate

The paginate plugin adds the `paginate` static method to the mongoose schema.

## Contributors
- [Deepak Panchal](https://github.com/deepak-panchal27)

Feel free to explore the codebase and contribute to make this Editorial Interface even better!