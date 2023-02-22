let Comment = require('../models/CommentModels');

// Create controller pour voir tout les Commentaires
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({});
    res.status(200).json({
      success: true,
      count: comments.length,
      comments
    });
  } catch (err) {
    res.status(500).send(err);
  }
};


exports.getRecentComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 }).limit(3);
    if (!comments) {
      return res.status(404).json({ message: 'No comments found' });
    }
    res.status(200).json({
      success: true,
      comments
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Creer un controller pour visualsier Comment par id
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({
      success: true,
      comment
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Creer un controller pour visualsier Comment par id
exports.getCommentByPostId = async (req, res) => {
  try {
    const comments = await Comment.find({post: req.params.id});
    if (!comments.length) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({
      success: true,
      comments
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};


exports.getCommentByUserId = async (req, res) => {
  try {
    const comments = await Comment.find({author: req.params.id});
    if (!comments.length) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({
      success: true,
      comments
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};



// Create controller pour ajouter un autre Comment
exports.addComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(200).json({
      created: true,
      comment
    });
  } catch (err) {
    console.log(err); // log the error message to see if it provides any additional information
    res.status(500).send(err);
  }

};
  
  // Create controller pour modifier un Comment par son id
  exports.updateComment = async (req, res) => {
    try {
      const comment = await Comment.findByIdAndUpdate(req.params.id, req.body);
      res.json({
        updated: true,
        comment }
      );
    } catch (err) {
      res.status(500).send(err);
    }
  };
  

  // Create controller pour supprimer un Comment par son id
  exports.deleteComment = async (req, res) => {
  try {
  const comment = await Comment.findByIdAndDelete(req.params.id);
  if (!comment) {
  return res.status(404).json({ message: 'Comment not found' });
  }
  res.status(200).json({
  deleted: true,
  comment
  });
  } catch (err) {
  res.status(500).send(err);
  }
  };
