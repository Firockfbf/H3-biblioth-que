// backend/routes/book.routes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Route pour récupérer tous les livres
router.get('/', bookController.getBooks);

// Route pour ajouter un livre
router.post('/', bookController.createBook);

// Route pour mettre à jour la disponibilité d'un livre
router.put('/:id_livre', bookController.updateBookAvailability);

module.exports = router;
