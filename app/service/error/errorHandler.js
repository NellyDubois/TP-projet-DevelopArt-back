// Import du module debug pour le débogage
import debug from "debug";
debug("error:API");

// Import du logger personnalisé
import logger from './logger.js';

// Import de la classe APIError depuis le fichier APIError.js
import { APIError } from "./APIError.js";

// Middleware de gestion des erreurs Express
// https://expressjs.com/en/guide/error-handling.html
const errorHandler = (error, _, response, next) => {
    // Affichage du message d'erreur via le module debug
    debug('errorHandler', error);
    // Affichage du message d'erreur dans la console
    
    // Enregistrement du message d'erreur dans les logs avec le logger personnalisé
    logger.log('error', error.message);

    // Gestion des différentes erreurs
    if (error instanceof APIError) {
        // Si l'erreur est une instance de APIError
        // Retourne une réponse JSON adaptée selon l'environnement
        if (process.env.NODE_ENV === 'development') {
            return response.status(error.status).json({ status: 'error', message: error.message, stack: error.stack });
        }
        return response.status(error.status).json({ status: 'error', message: error.message });
    }

    // Si l'erreur n'est pas une instance de APIError
    // Retourne une réponse JSON adaptée selon l'environnement
    if (process.env.NODE_ENV === 'development') {
        return response.status(500).json({ status: 'error', message: error.message, stack: error.stack });
    }
    return response.status(500).json({ status: 'error', message: 'Internal server error' });
};

// Export du middleware errorHandler
export default errorHandler;