
const express = require('express');
const router = express.Router();
const Blog = require('../models/BlogModels');
const {getUsers,login,register,getUserById, addUser, updateUser, deleteUser,getUserByName,updateUserName,deleteUserName} = require('../Controllers/UserController');
const verifyToken =require('../Controllers/verifyToken');
// Creer une route pour visualsier les users
router.get('/', getUsers);
// Creer une route pour registrer user
router.post('/register', register);
// Creer une route pour login user
router.post('/login', login);

// Creer une route pour visualsier les users avec ID
router.get('/:id', getUserById);

// Creer une route pour visualsier les users avec Titre
router.get('/name/:name', getUserByName);

// Creer une route pour ajouter des utilisateurs
router.post('/addUser',addUser);

// Creer une route pour suprimer des User par id
router.delete('/delete/id/:id', deleteUser);

// Creer une route pour suprimer des User par nom
router.delete('/delete/name/:name', deleteUserName);

// Creer une route pour modifier des User par ID
router.patch('/update/id/:id',updateUser);

// Creer une route pour modifier des User par nom
router.patch('/update/name/:name', updateUserName);


module.exports = router;
