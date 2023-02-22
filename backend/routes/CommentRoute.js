
const express = require('express');
const router = express.Router();
const Blog = require('../models/BlogModels');
const {getComments, getCommentById, addComment, updateComment,getRecentComments, deleteComment,getCommentByPostId,getCommentByUserId } = require('../Controllers/CommentController');
const verifyToken =require('../Controllers/verifyToken');

// Creer une route pour visualsier les comments
router.get('/', getComments);

// Creer une route pour visualsier les comments avec ID
router.get('/id/:id', getCommentById);

// Creer une route pour ajouter un comment
//router.post('/addComment', addComment);

// Creer une route pour voir les comment d'un post par son id
router.get('/post/id/:id', getCommentByPostId);

// Creer une route pour voir les recents comment
router.get('/recent', getRecentComments);

// Creer une route pour voir les comment d'un users sur tout les postes par son id
router.get('/user/id/:id', getCommentByUserId);

// Creer une route pour  modifier un comment par son id
router.patch('/update/id/:id', updateComment);

// Creer une route pour supprimer un comment par son id
router.delete('/delete/id/:id', deleteComment);

module.exports = router;





