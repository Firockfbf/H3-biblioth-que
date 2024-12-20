select CREATE TABLE Utilisateur (
    id_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    role ENUM('admin', 'user') NOT NULL
);

CREATE TABLE Livre (
    id_livre INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    auteur VARCHAR(255) NOT NULL,
    categorie VARCHAR(100),
    annee_publication INT,
    nombre_exemplaires INT NOT NULL,
    isAvailable BOOLEAN DEFAULT 1
);

CREATE TABLE Emprunt (
    id_emprunt INT AUTO_INCREMENT PRIMARY KEY,
    id_utilisateur INT NOT NULL,
    id_livre INT NOT NULL,
    date_emprunt DATE NOT NULL,
    date_retour_attendue DATE NOT NULL,
    statut ENUM('en cours', 'retourné', 'en retard') NOT NULL,
    FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id_utilisateur) ON DELETE CASCADE,
    FOREIGN KEY (id_livre) REFERENCES Livre(id_livre) ON DELETE CASCADE
);

CREATE TABLE Retour (
    id_retour INT AUTO_INCREMENT PRIMARY KEY,
    id_emprunt INT NOT NULL,
    date_retour_effective DATE NOT NULL,
    penalite DECIMAL(10, 2),
    FOREIGN KEY (id_emprunt) REFERENCES Emprunt(id_emprunt) ON DELETE CASCADE
);
