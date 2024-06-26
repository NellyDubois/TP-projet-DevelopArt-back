// Import du logger Winston pour enregistrer les logs
import logger from '../service/error/logger.js';

/**
 * Fonction utilisée pour renvoyer une réponse en vérifiant s'il y a une erreur.
 * @param {*} res - Objet de réponse d'Express
 * @param {*} result - Données à transmettre dans la réponse
 * @param {*} error - Erreur éventuelle survenue lors de la requête
 * @param {*} next - Middleware permettant de déclencher le système de gestion d'erreur d'Express.
 */
export function manageResponse(res, result, error, next) {
    if (error) {
        // Si une erreur est survenue, l'enregistrer dans les logs
        logger.error(`Une erreur s'est produite : ${error.message}`);
        // S'il y a une erreur, la passer au middleware de gestion des erreurs d'Express
        next(error);
    } else {
        // Sinon, envoyer les données dans la réponse au format JSON
        res.json(result);
    }
}