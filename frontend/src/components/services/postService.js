import { putWithFormData, postWithFormData, deleteRequest } from './api';

const createPost = async (blogId, postData) => {
  return postWithFormData(`/posts/${blogId}`, postData);
};

const updatePost = async (postId, postData) => {
    return putWithFormData(`/posts/${postId}`, postData);
}

const deletePost = async (postId) => {
    return deleteRequest(`/posts/${postId}`);
};

export { createPost, updatePost, deletePost };
