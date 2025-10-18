import API from "./Api";

export const fetchPosts = () => API.get("/posts");
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost = (payload) => API.post("/posts", payload);
export const updatePost = (id, payload) => API.put(`/posts/${id}`, payload);
export const deletePost = (id) => API.delete(`/posts/${id}`);
