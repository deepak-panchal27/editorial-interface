import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Box, Snackbar } from '@mui/material';
import { createPost, updatePost, deletePost } from './services/postService';
import { getBlogDetails } from './services/blogService';
import { useParams } from 'react-router-dom';
import PostForm from './PostForm';

const BlogDetails = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const data = await getBlogDetails(blogId);
        if (data.status === 'error') {
          setError(data.message);
        } else {
          setBlog(data.data);
          setPosts(data.data.posts);
        }
      } catch (error) {
        setError('Error fetching blog details');
        console.error('Error fetching blog details:', error);
      }
    };

    fetchBlogDetails();
  }, [blogId]);

  const handleCreatePost = async (postData) => {
    try {
      const formData = new FormData();
      formData.append('title', postData.title);
      formData.append('description', postData.description);
      formData.append('image', postData.image);
      formData.append('embedCode', postData.embedCode);
      formData.append('link', postData.link);

      const data = await createPost(blogId, formData);
      if (data.status === 'error') {
        setError(data.message);
      } else {
        setShowCreateForm(false);
        setSuccessMessage(data.message);
        setSnackbarOpen(true);
        fetchPosts();
      }
    } catch (error) {
      setError('Failed to create post');
      console.error('Error creating post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    try {
      const data = await deletePost(postId);
      if (data.status === 'error') {
        setError(data.message);
      } else {
        setShowCreateForm(false);
        setSuccessMessage(data.message);
        setSnackbarOpen(true);
        fetchPosts();
      }
    } catch (error) {
      setError('Error deleting post');
      console.error('Error deleting post:', error);
    }
  };

  const handleEditPost = (post) => {
    setShowCreateForm(false);
    setSelectedPost(post);
    setShowEditForm(true);
  };

  const fetchPosts = async () => {
    try {
      const data = await getBlogDetails(blogId);
      if (data.status === 'error') {
        setError(data.message);
      } else {
        setPosts(data.data.posts);
      }
    } catch (error) {
      setError('Error fetching posts');
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [blogId]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleUpdatePost = async (postId, updatedData) => {
    try {
      const formData = new FormData();
      formData.append('title', updatedData.title);
      formData.append('description', updatedData.description);
      formData.append('image', updatedData.image);
      formData.append('embedCode', updatedData.embedCode);
      formData.append('link', updatedData.link);

      const data = await updatePost(postId, formData);
      if (data.status === 'error') {
        setError(data.message);
      } else {
        setShowEditForm(false);
        setSuccessMessage(data.message);
        setSnackbarOpen(true);
        fetchPosts();
      }
    } catch (error) {
      setError('Error updating post');
      console.error('Error updating post:', error);
    }
  };

  return (
    <Box p={3}>
      {blog && (
        <div>
          <Typography variant="h3" gutterBottom>{blog.name}</Typography>
          <Button variant="contained" color="primary" onClick={() => setShowCreateForm(true)}>Create a New Post</Button>
          {posts && posts.length > 0 && <Typography variant="h4" gutterBottom>Posts</Typography>}
          <Grid container spacing={2}>
            {posts && posts.length > 0 && posts.map((post) => (
              <Grid item key={post.id} xs={12} sm={6} md={4}>
                <Box p={2} border={1}>
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography variant="body2">{post.description}</Typography>
                  <Button variant="outlined" color="primary" onClick={() => handleEditPost(post)}>Edit</Button>
                  <Button variant="outlined" color="error" onClick={() => handleDeletePost(post.id)}>Delete</Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
      {showCreateForm && <PostForm onSubmit={handleCreatePost} onCancel={() => setShowCreateForm(false)} />}
      {showEditForm && selectedPost && (
        <PostForm
          post={selectedPost}
          onSubmit={(updatedData) => handleUpdatePost(selectedPost.id, updatedData)}
          onCancel={() => setShowEditForm(false)}
        />
      )}
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={successMessage}
        action={
          <Button color="inherit" size="small" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      />
    </Box>
  );
};

export default BlogDetails;
