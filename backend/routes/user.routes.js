// backend/routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.Controller.js'); 

// Route pour récupérer tous les utilisateurs
router.get('/', userController.getUsers);

// Route pour ajouter un nouvel utilisateur
router.post('/', userController.createUser);

module.exports = router;
