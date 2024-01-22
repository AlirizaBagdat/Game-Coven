const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Create a comment
router.post('/', async (req, res) => {
  try {
    const { description, user_id, review_id } = req.body;

    // Create a new comment
    const comment = await Comment.create({
      description,
      user_id,
      review_id
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Read all comments
router.get('/', async (req, res) => {
  try {
    // Retrieve all comments
    const comments = await Comment.findAll();

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Read a single comment
router.get('/:id', async (req, res) => {
  try {
    const commentId = req.params.id;

    // Find the comment with the given ID
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a comment
router.put('/:id', async (req, res) => {
  try {
    const commentId = req.params.id;
    const { description } = req.body;

    // Find the comment with the given ID
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Update the comment's description
    comment.description = description;
    await comment.save();

    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
  try {
    const commentId = req.params.id;

    // Find the comment with the given ID
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Delete the comment
    await comment.destroy();

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;