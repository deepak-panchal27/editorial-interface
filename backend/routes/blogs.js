const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { validateObjectId, validateRequestBody } = require('../middlewares/validationMiddleware');

router.get('/published', blogController.getPublishedBlogs);

router.route('/')
  .get(blogController.getAllBlogs)
  .post(validateRequestBody(['name']), blogController.createBlog);

router.route('/:blogId')
  .get(validateObjectId('blogId'), blogController.getBlogDetails)
  .delete(validateObjectId('blogId'), blogController.deleteBlog);

router.post('/:blogId/publish', validateObjectId('blogId'), blogController.togglePublishBlog);

module.exports = router;
