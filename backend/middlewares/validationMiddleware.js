const mongoose = require('mongoose');

const validateObjectId = (paramName) => (req, res, next) => {
    const paramValue = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(paramValue)) {
        return res.status(400).json({ status: 'error', message: `Invalid ${paramName} format` });
    }

    next();
};

const validateRequestBody = (requiredKeys) => (req, res, next) => {
    const requestBodyKeys = Object.keys(req.body);

    const missingKeys = requiredKeys.filter(key => !requestBodyKeys.includes(key));

    if (missingKeys.length > 0) {
        return res.status(400).json({ status: 'error', message: `Missing required keys: ${missingKeys.join(', ')}` });
    }

    next();
};

module.exports = {
    validateObjectId,
    validateRequestBody
};
