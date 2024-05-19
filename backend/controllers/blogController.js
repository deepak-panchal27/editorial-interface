const Blog = require('../models/Blog');

// Get all blogs
const getAllBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await Blog.paginate({}, { page, limit, populate: 'posts', sortBy: 'createdAt:desc' });

    if (result.totalResults === 0) {
      return res.status(404).json({ status: 'error', message: 'No blogs found!' });
    }

    res.status(200).json({ status: 'success', message: 'Blogs retrieved successfully!', data: result });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Get all published blogs
const getPublishedBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await Blog.paginate({ isPublished: true }, { page, limit, populate: 'posts', sortBy: 'createdAt:desc' });

    if (result.totalResults === 0) {
      return res.status(404).json({ status: 'error', message: 'No blogs found!' });
    }

    res.status(200).json({ status: 'success', message: 'Blogs retrieved successfully!', data: result });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Create a new blog
const createBlog = async (req, res, next) => {
  const { name } = req.body;

  try {
    const newBlog = new Blog({ name });
    await newBlog.save();
    res.status(201).json({ status: 'success', message: 'Blog created successfully!', data: newBlog });
  } catch (err) {
    next(err);
  }
};

// Delete a blog
const deleteBlog = async (req, res, next) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ status: 'error', message: 'Blog not found!' });
    }

    await Blog.findByIdAndDelete(blogId);
    res.status(200).json({ status: 'success', message: 'Blog deleted successfully!' });

    const io = req.app.get('io');
    io.emit('deleteBlog', blogId);
  } catch (err) {
    next(err);
  }
};

// Toggle publish status of a blog
const togglePublishBlog = async (req, res, next) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ status: 'error', message: 'Blog not found!' });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.status(200).json({ status: 'success', message: 'Publish status toggled successfully!', data: blog });

    const io = req.app.get('io');
    io.emit('publishBlog', blog);
  } catch (err) {
    next(err);
  }
};

// Get details of a blog
const getBlogDetails = async (req, res, next) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId).populate('posts');
    if (!blog) {
      return res.status(404).json({ status: 'error', message: 'Blog not found!' });
    }

    res.status(200).json({ status: 'success', message: 'Blog details retrieved successfully!', data: blog });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  deleteBlog,
  togglePublishBlog,
  getBlogDetails,
  getPublishedBlogs
};
