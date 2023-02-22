let Blog = require('../models/BlogModels');

// Create controller pour voir tout les blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getRecentBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(3);
    if (!blogs) {
      return res.status(404).json({ message: 'Blogs not found' });
    }
    res.status(200).json({
      success: true,
      blogs
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
// Creer un controller pour visualsier blog par id
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({
      success: true,
      blog
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

//Creer un controller pour visualsier blog par le titre
exports.getBlogByTitle = async (req, res) => {

    try {
      const { title } = req.query;
      const blogs = await Blog.find({ title: { $regex: title, $options: 'i' } });
      if (!blogs.length) {
        return res.status(404).json({ message: 'No blogs found with the given title' });
      }
      res.status(200).json({
        success: true,
        blogs
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };
  

//Creer un controller pour visualsier blog par le titre
exports.getBlogByUser = async (req, res) => {
  try {
    const blog = await Blog.findOne({ author: req.params.id});
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({
      success: true,
      blog
    });
  } catch (err) {
    res.status(500).send(err);
  }
};


exports.getComment = async (req, res) => {
  try {
    const blog = await Blog.findOne({ title: req.params.title }).populate('comments');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({
       success: true,
       blog: blog.comments
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
// Create controller pour ajouter un autre blog
exports.addBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(200).json({
      created: true,
      blog
    });
  } catch (err) {
    console.log(err); // log the error message to see if it provides any additional information
    res.status(500).send(err);
  }
};

exports.addComment = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(200).json({
      created: true,
      blog
    });
  } catch (err) {
    console.log(err); // log the error message to see if it provides any additional information
    res.status(500).send(err);
  }
};
  
  // Create controller pour modifier un blog par son id
  exports.updateBlog = async (req, res) => {
    try {
      const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
      res.json({
        updated: true,
        blog }
      );
    } catch (err) {
      res.status(500).send(err);
    }
  };
  

  // Create controller pour supprimer un blog par son id
  exports.deleteBlog = async (req, res) => {
  try {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) {
  return res.status(404).json({ message: 'Blog not found' });
  }
  res.status(200).json({
  deleted: true,
  blog
  });
  } catch (err) {
  res.status(500).send(err);
  }
  };