// backend/controllers/bookController.js
const mysql = require('mysql2');
const config = require('../config/config.js');  // Charge la config de la base de données

const connection = mysql.createConnection(config);

// Récupérer tous les livres
exports.getBooks = (req, res) => {
    const query = 'SELECT * FROM Livre';
    connection.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching books:', err);
            return res.status(500).send({ error: 'Error fetching books.' });
        }
        res.send(result);
    });
};

// Ajouter un livre
exports.createBook = (req, res) => {
    const { titre, auteur, categorie, annee_publication, nombre_exemplaires } = req.body;
    const query = 'INSERT INTO Livre (titre, auteur, categorie, annee_publication, nombre_exemplaires, isAvailable) VALUES (?, ?, ?, ?, ?, true)';
    connection.query(query, [titre, auteur, categorie, annee_publication, nombre_exemplaires], (err, result) => {
        if (err) {
            console.error('Error adding book:', err);
            return res.status(500).send({ error: 'Error adding book.' });
        }
        res.status(201).send({ message: 'Book added successfully!' });
    });
};

// Mettre à jour la disponibilité d'un livre
exports.updateBookAvailability = (req, res) => {
    const { id_livre } = req.params;
    const { isAvailable } = req.body;
    const query = 'UPDATE Livre SET isAvailable = ? WHERE id_livre = ?';
    connection.query(query, [isAvailable, id_livre], (err, result) => {
        if (err) {
            console.error('Error updating book availability:', err);
            return res.status(500).send({ error: 'Error updating book availability.' });
        }
        res.send({ message: 'Book availability updated!' });
    });
};
