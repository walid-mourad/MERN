
const express = require('express');
const router = express.Router();
const Blog = require('../models/BlogModels');
const { getBlogs, getBlogById, addBlog,addComment, updateBlog, deleteBlog,getBlogByTitle,getRecentBlogs,getBlogByUser } = require('../Controllers/BlogController');
const verifyToken =require('../Controllers/verifyToken');
// Creer une route pour visualsier les blogs
router.get('/', getBlogs);

// Creer une route pour visualsier les blogs avec ID
router.get('/id/:id', getBlogById);

// Creer une route pour visualsier 3 blogs avec ID
router.get('/recent',getRecentBlogs);

// Creer une route pour visualsier 3 blogs avec ID
router.get('/user/id/:id', getBlogByUser);

// Creer une route pour visualsier les blogs avec Titre
router.get('/titre', getBlogByTitle);



// Creer une route pour ajouter un blog
router.post('/addBlog',addBlog);
//add comment to the blog
router.post('/addComment',addComment);

// Creer une route pour  modifier un blog par son id
router.patch('/update/id/:id', updateBlog);

// Creer une route pour supprimer un blog par son id
router.delete('/delete/id/:id', deleteBlog);

module.exports = router;
