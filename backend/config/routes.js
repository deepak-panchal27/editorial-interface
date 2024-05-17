const express = require('express');
const router = express.Router();
const blogRoutes = require('../routes/blogs');
const postRoutes = require('../routes/posts');

router.use('/blogs', blogRoutes);
router.use('/posts', postRoutes);

module.exports = router;
