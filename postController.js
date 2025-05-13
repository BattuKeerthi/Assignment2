const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (req, res) => {
    const { title, body, image } = req.body;
    const post = new Post({ title, body, image, user: req.user.id });
    await post.save();
    res.status(201).json({ status: 'post created', post });
};

exports.getPosts = async (req, res) => {
    const posts = await Post.find().populate('user', 'name email');
    res.json({ status: 'success', posts });
};

exports.updatePost = async (req, res) => {
    const { title, body, image } = req.body;
    const post = req.post;

    if (title) post.title = title;
    if (body) post.body = body;
    if (image) post.image = image;

    await post.save();
    res.json({ status: 'success', post });
};

exports.deletePost = async (req, res) => {
    await req.post.remove();
    res.json({ status: 'Successfully deleted' });
};
