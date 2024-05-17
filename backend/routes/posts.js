const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { validateObjectId, validateRequestBody } = require('../middlewares/validationMiddleware');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/:blogId', upload.single('image'), validateRequestBody(['title', 'description', 'embedCode', 'link']), validateObjectId('blogId'), postController.createPost);
router.put('/:postId', upload.single('image'), validateRequestBody(['title', 'description', 'embedCode', 'link']), validateObjectId('postId'), postController.editPost);
router.delete('/:postId', validateObjectId('postId'), postController.deletePost);

module.exports = router;
