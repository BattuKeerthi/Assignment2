const express = require('express');
const router = express.Router();
const {
    createPost,
    getPosts,
    updatePost,
    deletePost
} = require('../controllers/postController');

const { auth, authorizePostOwner } = require('../middleware/authMiddleware');

router.get('/posts', auth, getPosts);
router.post('/posts', auth, createPost);
router.put('/posts/:postId', auth, authorizePostOwner, updatePost);
router.delete('/posts/:postId', auth, authorizePostOwner, deletePost);

module.exports = router;