const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  embedCode: { type: String },
  scrapedData: { type: String },
  socialMediaType: { type: String, enum: ['facebook', 'twitter', 'none'], default: 'none' },
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
},{
  timestamps: true,
});

postSchema.plugin(toJSON);
postSchema.plugin(paginate);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
