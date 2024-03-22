// Import du module 'dotenv' pour charger les variables d'environnement depuis le fichier .env
import 'dotenv/config';

// Import du framework Express pour créer le serveur web
import express from "express";

//Import du module CORS (Cross-Origin Resource Sharing)
import cors from "cors";

// Mise en place d'OpenAPI (Swagger)
import apiDocs from "./app/service/apiDocs.js";

// Import des routeurs depuis le point d'entrée du dossier des routes index
import router from "./app/router/index.js";

// Création de l'application Express
const app = express();

// Import du logger Winston pour enregistrer les logs (vesrion différente en prod et en dev)
import logger from './app/service/error/logger.js';

// Fonction pour formater la date et l'heure actuelles
const getCurrentDateTime = () => {
    const currentDate = new Date();
    return currentDate.toISOString();
};

// Configuration des options CORS pour autoriser les requêtes provenant de l'URL du serveur frontend
const corsOptions = {
    origin: [`${process.env.BASE_URL_FRONT}`,`${process.env.BASE_URL_FRONT_2}`],
    //optionsSuccessStatus: 200 // code succès 200 plutôt que 204 à cause de navigateurs comme IE11
};

// Les CORS permettent de bloquer des requêtes qui arrivent depuis d'autres URL
// on autorise explicitement les requêtes provenant de l'URL du serveur frontend à accéder à l'API backend
app.use(cors(corsOptions));

// Initialisation d'OpenAPI (swagger)
apiDocs(app);

// autorise la réception de données provenant de formulaires
app.use(express.urlencoded({extended:true}));

// pour servir les ressources statiques (images des bannières, cursors, logos et oeuvres) depuis le dossier 'public'
app.use(express.static('public'));

// Middleware pour autoriser Express à parser les données au format JSON
app.use(express.json());

// Middleware pour utiliser les routeurs 
app.use(router);

// Pour inclure l'horodatage dans les journaux de log
logger.info(`[${getCurrentDateTime()}] - Démarrage du serveur Express.`);

// Définition du port sur lequel le serveur va écouter (dans fichier .env) ou le port 3000 par défaut
const PORT = process.env.PORT || 3000;

// Lancement du serveur Express et écoute sur le port 
app.listen(PORT,()=>{
    console.log(`Listening http://localhost:${PORT}`);
});