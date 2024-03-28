// Importation du module bcrypt pour le hachage des mots de passe
import bcrypt from 'bcrypt';

// Importation de la classe APIError qui permet de définir le message d'erreur à afficher et le statut HTTP à renvoyer en réponse à la requête.
import { APIError } from './error/APIError.js';

import jwt from "../service/jwt.js";

/**
 * Middleware pour vérifier si l'utilisateur est un artiste et s'il a donc le droit d'accéder aux pages de configuration
 * @param {*} req - Requête HTTP
 * @param {*} res - Réponse HTTP
 * @param {*} next - Fonction de rappel pour passer au middleware suivant
 */
export function isArtist(req, res, next) {

    // Récupération du header Authorization de la requête
    const authorizationHeader = req.get("Authorization");

    // Vérification de l'existence du header Authorization
    if (authorizationHeader !== null && authorizationHeader !== undefined) {
        // Vérification du format du header Authorization
        if (authorizationHeader.split(" ")[0] !== "Bearer") {
            next(new APIError("Accès non autorisé",401));
        }
        //on extrait le token du header en enlevant Bearer
        const token = authorizationHeader.split(" ")[1];
    
        // Vérification du token
        const { result, error } = jwt.decode(token);

        //on transforme result en nombre
        const resultNr=Number(result.id);

        // Vérification de l'existence du résultat
        if (resultNr) {            
            // Vérification du rôle de l'utilisateur: artiste=1 ou simple visiteur?
            if (resultNr === 1) { 
                next(); // L'utilisateur est un artiste, passer au middleware suivant
            }
            else { 
                // L'utilisateur n'est pas un artiste, renvoyer une erreur 401(accès non autorisé)
                next(new APIError("Accès non autorisé",401));
            }
        }
        else {
            next(new APIError("Accès non autorisé",401));
        }
    }
    else {
        next(new APIError("Accès non autorisé",401));
    }
}

/**
 * Fonction asynchrone pour hasher un mot de passe avec bcrypt
 * @param {string} password - Mot de passe à encoder
 * @returns {Promise<string>} - Mot de passe encodé
 */
export async function encodePassword(password){
    return await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));
}

/**
 * Fonction asynchrone pour vérifier si un mot de passe correspond à son hachage
 * @param {string} password - Mot de passe à vérifier
 * @param {string} passwordHash - Hashage du mot de passe à comparer
 * @returns {Promise<boolean>} - Renvoie true si le mot de passe correspond à son hachage, sinon false
 */
export async function passwordMatch(password,passwordHash){
    return await bcrypt.compare(password, passwordHash);
}
