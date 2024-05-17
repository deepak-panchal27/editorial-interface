const errorHandler = (err, req, res, next) => {
  if (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  } else {
    next();
  }
};

module.exports = errorHandler;
