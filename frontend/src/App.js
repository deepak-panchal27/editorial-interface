import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LiveBlogList from './components/LiveBlogList';
import BlogDetails from './components/BlogDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LiveBlogList />} />
        <Route path="/blog/:blogId" element={<BlogDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
