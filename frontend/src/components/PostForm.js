import React, { useState } from 'react';
import './PostForm.css';

const PostForm = ({ post, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [description, setDescription] = useState(post?.description || '');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(post?.imageUrl || '');
  const [embedCode, setEmbedCode] = useState(post?.embedCode || '');
  const scrapedData = post ? JSON.parse(post.scrapedData) : null;
  const [link, setLink] = useState(scrapedData ? scrapedData.url : '');

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    if (link && link.trim() !== '') {
      const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!link.match(linkRegex)) {
        alert('Please enter a valid link URL');
        isValid = false;
      }
    }

    if (embedCode && embedCode.trim() !== '') {
      const embedRegex = /<iframe.*src="https:\/\/www\.facebook\.com.*<\/iframe>|<blockquote.*class="twitter-tweet".*<\/blockquote>/;
      if (!embedCode.match(embedRegex)) {
        alert('Please enter a valid embed code for Facebook or Twitter');
        isValid = false;
      }
    }

    if (isValid) {
      const postData = { title, description, image, embedCode, link };
      onSubmit(postData);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <label htmlFor="file">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {previewImage && <img src={previewImage} alt="Preview" className="image-preview" />}
        <label htmlFor="embedCode">Embed Code (Facebook/Twitter)</label>
        <textarea
          placeholder="Embed Code (Facebook/Twitter)"
          value={embedCode}
          onChange={(e) => setEmbedCode(e.target.value)}
          className="embed-code-input"
        ></textarea>
        <label htmlFor="scrapedData">Link URL</label>
        <input
          type="text"
          placeholder="Link URL"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button type="submit">{post ? 'Update Post' : 'Create Post'}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default PostForm;
