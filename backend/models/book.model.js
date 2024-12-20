// backend/models/bookModel.js
const mysql = require('mysql2');
const config = require('../config/config.js');  // Charge la config de la base de données

const connection = mysql.createConnection(config);

class Book {
    constructor(titre, auteur, categorie, annee_publication, nombre_exemplaires, isAvailable) {
        this.titre = titre;
        this.auteur = auteur;
        this.categorie = categorie;
        this.annee_publication = annee_publication;
        this.nombre_exemplaires = nombre_exemplaires;
        this.isAvailable = isAvailable;
    }

    // Sauvegarder un livre dans la base de données
    save() {
        const query = 'INSERT INTO Livre (titre, auteur, categorie, annee_publication, nombre_exemplaires, isAvailable) VALUES (?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            connection.query(query, [this.titre, this.auteur, this.categorie, this.annee_publication, this.nombre_exemplaires, this.isAvailable], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Trouver tous les livres
    static findAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Livre';
            connection.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Book;
