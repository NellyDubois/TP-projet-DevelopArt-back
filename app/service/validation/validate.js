//Import de la classe APIError pour générer des erreurs personnalisées
import { APIError } from '../error/APIError.js';

// Import du logger Winston pour enregistrer les logs
import logger from '../error/logger.js';

//fonction validate est un middleware utilisé dans Express pour valider les données des requêtes entrantes en fonction d'un schéma spécifié
//la fonction a 2 paramètres : le schéma de validation des données et subKey clé optionnellle sur laquelle on veut valider les données
export function validate(schema, subKey = null) {
    //retourne une fonction middleware, qui est ensuite utilisée pour valider les données des requêtes entrantes.
    return (request, _, next) => {
        
        // si on précise une clé, seule cette clé sera validée, sinon on valide tout le body
        const data = (subKey) ? request.body[subKey] : request.body;
        
        //Les données extraites sont validées par rapport au schéma spécifié à l'aide de la méthode validate du schéma Joi
        const { error: validationError } = schema.validate(data);

        //Si une erreur de validation est détectée, une instance d'APIError est créée avec le message d'erreur de validation, et cette erreur est transmise au middleware suivant.
        if (validationError) {
            logger.error(`Erreur de validation : ${validationError.message}`);
            const error = new APIError(validationError.message, 400);
            next(error);
            return;
        }
        //Si aucune erreur de validation n'est détectée, le contrôle est passé au middleware suivant grâce à l'appel à la fonction next().
        next();
    };
};