// backend/controllers/userController.js
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const config = require('../config/config.js');  // Charge la config de la base de données

// Crée la connexion à la base de données
const connection = mysql.createConnection(config);

// Récupérer tous les utilisateurs
exports.getUsers = (req, res) => {
    const query = 'SELECT id_utilisateur as id, nom as name, email FROM Utilisateur';
    connection.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).send({ error: 'Error fetching users.' });
        }
        res.send(result);
    });
};

// Ajouter un utilisateur
exports.createUser = (req, res) => {
    const { name, email } = req.body;
    // Définir un mot de passe par défaut et le rôle 'user'
    const defaultPassword = 'defaultPassword123';
    const role = 'user';

    bcrypt.hash(defaultPassword, 10, (err, hash) => {
        if (err) {
            return res.status(500).send({ error: 'Error hashing password.' });
        }
        const query = 'INSERT INTO Utilisateur (email, password_hash, nom, role) VALUES (?, ?, ?, ?)';
        connection.query(query, [email, hash, name, role], (err, result) => {
            if (err) {
                console.error('Error creating user:', err);
                return res.status(500).send({ error: 'Error creating user.' });
            }
            res.status(201).send({ message: 'User created successfully!' });
        });
    });
};
