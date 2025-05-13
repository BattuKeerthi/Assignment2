const jwt = require('jsonwebtoken');
const Post = require('../models/Post');

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ status: 'unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ status: 'invalid token' });
    }
};

const authorizePostOwner = async (req, res, next) => {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ status: 'Post not found' });

    if (post.user.toString() !== req.user.id) {
        return res.status(403).json({ status: 'forbidden' });
    }

    req.post = post;
    next();
};

module.exports = { auth, authorizePostOwner };