const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const blogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  isPublished: { type: Boolean, default: false },
},{
  timestamps: true,
});

blogSchema.plugin(toJSON);
blogSchema.plugin(paginate);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
