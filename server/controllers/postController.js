const Post = require("../models/post");



exports.getAllPosts = async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  res.json(posts);
};

exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
};

exports.createPost = async (req, res) => {
  // req.user set by protect middleware
  const { title, content } = req.body;
  const post = await Post.create({ title, content, author: req.user.id });
  res.status(201).json(post);
};

exports.updatePost = async (req, res) => {
  const updated = await Post.findByIdAndUpdate(req.params.id, { title: req.body.title, content: req.body.content }, { new: true });
  res.json(updated);
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
