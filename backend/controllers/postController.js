const Post = require('../models/Post');
const Blog = require('../models/Blog');
const axios = require('axios');
const cheerio = require('cheerio');
const cloudinaryUtils = require('../services/cloudinaryService');

const determineSocialMediaType = (embedCode) => {
  if (embedCode.includes('facebook.com')) {
    return 'facebook';
  } else if (embedCode.includes('twitter-tweet')) {
    return 'twitter';
  }
  return null;
};

const scrapeMetaData = async (url) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const metadata = {
      url: url,
      title: $('head title').text(),
      description: $('meta[name="description"]').attr('content'),
      keywords: $('meta[name="keywords"]').attr('content'),
      ogTitle: $('meta[property="og:title"]').attr('content'),
      ogDescription: $('meta[property="og:description"]').attr('content'),
      ogImage: $('meta[property="og:image"]').attr('content'),
      twitterTitle: $('meta[name="twitter:title"]').attr('content'),
      twitterDescription: $('meta[name="twitter:description"]').attr('content'),
      twitterImage: $('meta[name="twitter:image"]').attr('content'),
      canonicalUrl: $('link[rel="canonical"]').attr('href'),
      author: $('meta[name="author"]').attr('content'),
      publishDate: $('meta[property="article:published_time"]').attr('content'),
    };
    return JSON.stringify(metadata);
  } catch (error) {
    console.error('Failed to scrape metadata:', error);
    return null;
  }
};

const createPost = async (req, res, next) => {
  try {
    const { title, description, embedCode, link } = req.body;
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found!' });
    }

    const imageUrl = req.file ? await cloudinaryUtils.uploadImageToCloudinary(req.file.path) : null
    const socialMediaType = embedCode ? determineSocialMediaType(embedCode) : null;
    const scrapedData = link ? await scrapeMetaData(link) : null;
    const newPost = new Post({ title, description, imageUrl, embedCode, scrapedData, socialMediaType, blogId });
    await newPost.save();

    blog.posts.push(newPost._id);
    await blog.save();

    res.status(201).json({ status: 'success', message: 'Post created successfully!', data: newPost });
  } catch (err) {
    next(err);
  }
};

const editPost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found!' });
    }

    const { title, description, embedCode, link } = req.body;

    const imageUrl = req.file ? await cloudinaryUtils.uploadImageToCloudinary(req.file.path) : null
    const socialMediaType = embedCode ? determineSocialMediaType(embedCode) : null;
    const scrapedData = link ? await scrapeMetaData(link) : null;

    post.set({
      title,
      description,
      imageUrl,
      embedCode,
      scrapedData,
      socialMediaType,
    });

    const updatedPost = await post.save();
    res.json({ status: 'success', message: 'Post updated successfully!', data: updatedPost });
  } catch (err) {
    next(err);
  }
};


const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ status: 'success', message: 'Post deleted successfully!' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPost,
  editPost,
  deletePost
};