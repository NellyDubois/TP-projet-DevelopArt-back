// Import du logger Winston pour enregistrer les logs
import logger from './logger.js';

// Middleware pour enregistrer les détails des requêtes entrantes dans le journal de logs
const requestLogger = (req, res, next) => {
    // Enregistrer les détails de la requête dans les logs
    logger.info(`Requête ${req.method} ${req.originalUrl} - IP: ${req.ip}`);
    next(); // Passer au middleware suivant
};

export default requestLogger;