const mysql = require('mysql2');
const config = require('../config/config.js/config');

const connection = mysql.createConnection(config);

const User = {
    getAll: function(callback) {
        connection.query('SELECT * FROM Utilisateur', callback);
    },
    getById: function(id, callback) {
        connection.query('SELECT * FROM Utilisateur WHERE id_utilisateur = ?', [id], callback);
    },
    create: function(user, callback) {
        connection.query('INSERT INTO Utilisateur SET ?', user, callback);
    },
    update: function(id, user, callback) {
        connection.query('UPDATE Utilisateur SET ? WHERE id_utilisateur = ?', [user, id], callback);
    },
    delete: function(id, callback) {
        connection.query('DELETE FROM Utilisateur WHERE id_utilisateur = ?', [id], callback);
    }
};

module.exports = User;
