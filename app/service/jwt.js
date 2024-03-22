import jwt from 'jsonwebtoken';

// Import du logger Winston pour enregistrer les logs
import logger from './error/logger.js';

export default {
    /**
     * Génération du token JWT
     * @param {Object} user - données de l'utilisateur
     * @returns {string} token JWT généré
     */
    encode(user){        
        //Génération du token JWT: on ne garde que user.id dans le payload jwt.sign pour des questions de sécurité
        try {
            const token= jwt.sign(user.id, process.env.JWT_SECRET );
            //on retourne le token
            return token;
        } catch (error) {
            logger.error(`Erreur lors de la génération du token JWT : ${error.message}`);
            throw error;
        }
    },
    /**
     * Déchiffrage d'un token JWT
     * @param {*} token - Token JWT à déchiffrer
     * @returns {Object} - Résultat du déchiffrage et erreur éventuelle
     */
    decode(token){
        //Initialisation des variables result et error
        let result;
        let error;
        //on essaie de déchiffrer le token
        try{
            //on récupère le token envoyé par la requête
            //le token passe par les headers http et pas par le body qui n'existe que pour les post
            //on vérifie le token en utiliant la clé secrète JWT
            result = jwt.verify(token,process.env.JWT_SECRET);
        }
        //si on a une erreur
        catch(err){
            logger.error(`Erreur lors du décodage du token JWT : ${error.message}`);
            error = new Error("erreur d'authentification");
        }
        //on retourne le résultat ou l'erreur
        return {result,error};
    }
};