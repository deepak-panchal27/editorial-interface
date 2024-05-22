import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Switch, Container, CircularProgress, Snackbar, Box } from '@mui/material';
import { getAllBlogs, createBlog, deleteBlog, publishBlog } from './services/blogService';
import DeleteIcon from '@mui/icons-material/Delete';
import './LiveBlogList.css';

const LiveBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogName, setBlogName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: 0, totalResults: 0 });

  const fetchBlogs = async ({ page, limit }) => {
    setIsLoading(true);
    try {
      const data = await getAllBlogs({ page, limit });
      if (data.status === 'error') {
        setError(data.message);
      } else {
        setBlogs(data.data.results);
        setPagination((prevPagination) => ({
          ...prevPagination,
          totalPages: data.data.totalPages,
          totalResults: data.data.totalResults,
        }));
      }
    } catch (error) {
      setError('Error fetching live blogs');
      console.error('Error fetching live blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(pagination);
  }, [pagination.page]);

  const handleCreateBlog = () => {
    setError('');
    setIsCreating(true);
  };

  const handleCreate = async () => {
    try {
      if (!blogName) {
        setError('Please enter blog name');
        return;
      }
      const data = await createBlog({ name: blogName });
      if (data.status === 'error') {
        setError(data.message);
      } else {
        setBlogName('');
        setIsCreating(false);
        setError('');
        setSuccessMessage(data.message);
        setSnackbarOpen(true);
        fetchBlogs(pagination);
      }
    } catch (error) {
      setError('Failed to create blog');
      console.error('Error creating blog:', error);
    }
  };

  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (!confirmDelete) return;

    try {
      const data = await deleteBlog(blogId);
      if (data.status === 'error') {
        setError(data.message);
      } else {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
        setSuccessMessage(data.message);
        setSnackbarOpen(true);
        fetchBlogs(pagination);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handlePublishToggle = async (blogId, publishStatus) => {
    try {
      const data = await publishBlog(blogId);
      if (data.status === 'error') {
        setError(data.message);
      } else {
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog.id === blogId ? { ...blog, isPublished: !publishStatus } : blog
          )
        );
        setSuccessMessage(data.message);
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage !== pagination.page) {
      setPagination((prevPagination) => ({ ...prevPagination, page: newPage }));
    }
  };

  const renderPaginationButtons = () => {
    if (isCreating || pagination.totalPages === 0) return null;
  
    return (
      <Box display="flex" alignItems="center" justifyContent="space-between" marginTop={2}>
        <Box>
          {pagination.page > 1 && (
            <Button onClick={() => handlePageChange(pagination.page - 1)} variant="outlined">
              Previous Page
            </Button>
          )}
        </Box>
        <Typography variant="body1">
          Page {pagination.page} of {pagination.totalPages}
        </Typography>
        <Box>
          {pagination.page < pagination.totalPages && (
            <Button onClick={() => handlePageChange(pagination.page + 1)} variant="outlined">
              Next Page
            </Button>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Button variant="contained" color="primary" onClick={handleCreateBlog}>
          Create New Blog
        </Button>
      </Box>
      {isCreating && (
        <Box display="flex" flexDirection="column" alignItems="center">
          <TextField
            label="Enter Blog Name"
            value={blogName}
            onChange={(e) => setBlogName(e.target.value)}
            variant="outlined"
            margin="normal"
            required
          />
          <Button variant="contained" color="primary" onClick={handleCreate}>Create</Button>
        </Box>
      )}
      {!isCreating && blogs.length > 0 && (
        <Typography variant="h5" component="div">
          List of Live Blogs
        </Typography>
      )}
      {isLoading && <CircularProgress />}
      {successMessage && (
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
      )}
      {!isCreating && (
        <List>
          {blogs.map((blog) => (
            <ListItem key={blog.id}>
              <ListItemText primary={<Link to={`/blog/${blog.id}`}>{blog.name}</Link>} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(blog.id)}>
                  <DeleteIcon />
                </IconButton>
                <Switch
                  edge="end"
                  onChange={() => handlePublishToggle(blog.id, blog.isPublished)}
                  checked={blog.isPublished}
                  color="primary"
                  inputProps={{ 'aria-label': 'toggle publish' }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      {renderPaginationButtons()}
    </Container>
  );
};

export default LiveBlogList;
