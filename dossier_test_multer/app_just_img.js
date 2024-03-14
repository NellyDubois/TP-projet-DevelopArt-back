require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3080;

// Configuration de Multer pour gérer le téléchargement de fichiers
const upload = multer({ dest: 'upload/' });

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
  const nomFichier = req.file.originalname; // Récupérer le nom du fichier depuis req.file.originalname
  console.log("nomFichier", nomFichier);

  if (!req.file) {
    console.log("Aucun fichier n'a été téléchargé.");
    return res.status(400).send('Aucun fichier n\'a été téléchargé.');
  }

  
  // Définir le nouveau chemin avec le nom spécifié par l'utilisateur
  // const nouveauChemin = `uploads/${nomFichier}`;

  // // Renommer le fichier avec le nom spécifié
  // fs.rename(req.file.path, nouveauChemin, (err) => {
  //   if (err) {
  //     console.error('Erreur lors du renommage du fichier :', err);
  //     return res.status(500).send('Erreur lors du renommage du fichier.');
  //   }
    
  //   // Fichier renommé avec succès
  //   console.log(`Le fichier ${nomFichier} a été téléchargé avec succès et stocké sous le nom ${nouveauChemin}.`);
  //   res.send(`Le fichier ${nomFichier} a été téléchargé avec succès et stocké sous le nom ${nouveauChemin}.`);
  //}
  //);
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Le serveur est démarré sur le port ${port}`);
});