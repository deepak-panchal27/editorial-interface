const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const morgan = require('./config/morgan');
const logger = require('./config/logger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL;

if (process.env.NODE_ENV !== 'development') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// Security middleware
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression middleware
app.use(compression());

// CORS middleware
app.use(cors());
app.options('*', cors());

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Connected to MongoDB');
    server = app.listen(PORT, () => {
      logger.info(`Listening to port ${PORT}`);
    });
  })
  .catch(err => {
    logger.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
const routes = require('./config/routes');
app.use('/api/v1', routes);


app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use(errorHandler);

// Error handling
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      mongoose.connection.close(() => {
        logger.info('MongoDB connection closed');
      });
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error('Unexpected error:', error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
