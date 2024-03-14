require('dotenv').config();
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pool = require('./pgPool.js');


const app = express();
const port = process.env.PORT || 3080;

// Configuration de Multer pour gérer le téléchargement de fichiers
const upload = multer({ dest: 'uploads/' });

// Définir le dossier des vues
app.set('views', path.join(__dirname, 'views'));

// Utiliser le moteur de modèle pour servir les fichiers HTML
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Servir les fichiers statiques dans le dossier public (CSS, JavaScript, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Définir une route pour servir votre page d'accueil (index.html)
app.get('/', (req, res) => {
  res.render('index'); // 'index' correspond au nom de votre fichier HTML sans l'extension
});

// Définir une route pour gérer le téléchargement de fichiers
//!!après single 'fichier' doit être le même nom que <input type="file" name="fichier">
app.post('/upload', upload.single('fichier'), (req, res) => {
    // Si le fichier est présent, vous pouvez accéder à ses informations via req.file
    const nomFichier = req.body.nomFichier; // Récupérer le nom dynamique du fichier depuis le champ de texte
    console.log("nomFichier", nomFichier);
  
    if (!req.file) {
      return res.status(400).send('Aucun fichier n\'a été téléchargé.');
    }
  
    const ancienChemin = req.file.path; // Chemin du fichier téléchargé
    const extension = req.file.originalname.split('.').pop(); // Extraire l'extension du fichier téléchargé
  
    let nouveauChemin; // Déclarer la variable en dehors de la structure if, sinon pas reconnu en dehors de if
  
    if (nomFichier) {
      nouveauChemin = `uploads/${nomFichier}.${extension}`; // Nouveau chemin avec le nom spécifié par l'utilisateur
    } else {
      nouveauChemin = ancienChemin;
    }
  
    // Renommer le fichier avec le nom spécifié par l'utilisateur
    fs.rename(ancienChemin, nouveauChemin, (err) => {
      if (err) {
        console.error('Erreur lors du renommage du fichier :', err);
        return res.status(500).send('Erreur lors du renommage du fichier.');
      }
  
      // Fichier renommé avec succès
      res.send('Fichier téléchargé avec succès.');
  
      // Insérer le chemin du fichier renommé en base de données PostgreSQL
    //   avec comme valeur dans chemin nouveauChemin
    //   const valeurs = [nouveauChemin];
  
     
  
    });
  });
  
  // Démarrer le serveur
  app.listen(port, () => {
    console.log(`Le serveur est démarré sur le port ${port}`);
  });