require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// Initialisation de l'application
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration des fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Connexion à la base de données
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Fonction pour initialiser la base de données
async function initializeDatabase() {
    const tables = [
        `CREATE TABLE IF NOT EXISTS Utilisateur (
            id_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            nom VARCHAR(100) NOT NULL,
            role ENUM('admin', 'user') NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS Livre (
            id_livre INT AUTO_INCREMENT PRIMARY KEY,
            titre VARCHAR(255) NOT NULL,
            auteur VARCHAR(255) NOT NULL,
            categorie VARCHAR(100),
            annee_publication INT,
            nombre_exemplaires INT NOT NULL,
            isAvailable BOOLEAN DEFAULT 1
        )`,
        `CREATE TABLE IF NOT EXISTS Emprunt (
            id_emprunt INT AUTO_INCREMENT PRIMARY KEY,
            id_utilisateur INT NOT NULL,
            id_livre INT NOT NULL,
            date_emprunt DATE NOT NULL,
            date_retour_attendue DATE NOT NULL,
            statut ENUM('en cours', 'retourné', 'en retard') NOT NULL,
            FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id_utilisateur) ON DELETE CASCADE,
            FOREIGN KEY (id_livre) REFERENCES Livre(id_livre) ON DELETE CASCADE
        )`,
        `CREATE TABLE IF NOT EXISTS Retour (
            id_retour INT AUTO_INCREMENT PRIMARY KEY,
            id_emprunt INT NOT NULL,
            date_retour_effective DATE NOT NULL,
            penalite DECIMAL(10, 2),
            FOREIGN KEY (id_emprunt) REFERENCES Emprunt(id_emprunt) ON DELETE CASCADE
        )`
    ];

    for (const table of tables) {
        try {
            await connection.promise().query(table);
            console.log('Table created successfully');
        } catch (error) {
            console.error('Error creating table:', error);
            throw error;
        }
    }
}

connection.connect(async error => {
    if (error) throw error;
    console.log('Successfully connected to the database.');
    
    try {
        await initializeDatabase();
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
});

// Middleware pour logger les requêtes
app.use((req, res, next) => {
    const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    fs.appendFileSync(path.join(__dirname, 'access.log'), log);
    next();
});

// Routes
const userRoutes = require('./routes/user.routes');
const borrowRoutes = require('./routes/borrow.routes');
const bookRoutes = require('./routes/book.routes');
app.use('/api/users', userRoutes);
app.use('/api/borrow', borrowRoutes);
app.use('/api/books', bookRoutes);

// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});



// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
