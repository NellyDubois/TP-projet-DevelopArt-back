require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Pool } = require('pg');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3080;

// Middleware pour gérer les sessions
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));


// Configuration de Multer pour gérer le téléchargement de fichiers
const upload = multer({ dest: 'upload/image' });

const pool = new Pool();

// Définir le dossier des vues
app.set('views', path.join(__dirname, 'views'));

// Utiliser le moteur de modèle pour servir les fichiers HTML
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Servir les fichiers statiques dans le dossier public (CSS, JavaScript, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Définir une route pour servir votre page d'accueil (index.html)
app.get('/', (req, res) => {
  // Récupérer le message de succès de la session s'il existe
  const successMessage = req.session.successMessage;
  // Effacer le message de succès de la session pour qu'il ne soit affiché qu'une seule fois
  req.session.successMessage = null;

  // Rendre la page d'accueil et passer le message de succès à la vue
  res.render('index', { successMessage: successMessage });
});

// Définir une route pour gérer le téléchargement de fichiers
//!!après single 'fichier' doit être le même nom que <input type="file" name="fichier">
// Définir une route pour gérer le téléchargement de fichiers
app.post('/upload/image', upload.single('fichier'), (req, res) => {
  // Si le fichier est présent, vous pouvez accéder à ses informations via req.file
  // Récupérer le chemin de l'image téléchargée
 
  const fichier = req.file;
  console.log("fichier", fichier);
  const imagePath = fichier.path;
  console.log("image path", imagePath);
  req.session.imageInfo=imagePath;
  // console.log("req.session.imageInfo",req.session.imageInfo);
  // req.session.successMessage = 'Le téléchargement de l\'image s\'est bien passé.';
  // console.log("req.session.successMessage",req.session.successMessage);
  // Rediriger vers la page d'accueil avec le chemin de l'image conservé
  req.session.returnTo = req.originalUrl;

  // Envoyer le chemin de l'image en réponse au client
  res.redirect('/');
});

// Endpoint pour le deuxième formulaire (informations sur l'image)
app.post('/upload/info', (req, res) => {
  // Récupérer le chemin de l'image depuis les paramètres de requête
  const path = req.session.imageInfo;
  console.log("image path 2",path);
  console.log("req.body 2",req.body);
  const artist_id=1;

  // Récupérer les données saisies dans le formulaire
  const { name, description, production_year, technique, width, height, media, framing, quote, orientation, position, homepage_flag} = req.body;

  // Insérer les données dans la base de données
  // pool.query('INSERT INTO artwork (name, description, production_year, technique, width, height, media, framing, quote, path, orientation, position, homepage_flag, artist_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)', 
  // [name, description, production_year, technique, width, height, media, framing, quote, path, orientation, position, homepage_flag, artist_id], (error, results) => {
  //   if (error) {
  //     throw error;
  //   }

    console.log('Données enregistrées en base de données avec succès.');
    //Répondre à la requête
    res.send('Informations sur l\'image enregistrées avec succès.');
  // });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Le serveur est démarré sur le port ${port}`);
});