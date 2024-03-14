import jwt from 'jsonwebtoken';

export default {
    /**
     * Génération du token JWT
     * @param {Object} user - données de l'utilisateur
     * @returns {string} token JWT généré
     */
    encode(user){        
        //Génération du token JWT: on ne garde que user.id dans le payload jwt.sign pour des questions de sécurité
        const token= jwt.sign(user.id, process.env.JWT_SECRET );
        console.log("TOKEN : ",token);
        return token;
    },
    /**
     * Déchiffrage d'un token JWT
     * @param {*} token - Token JWT à déchiffrer
     * @returns {Object} - Résultat du déchiffrage et erreur éventuelle
     */
    decode(token){
        let result;
        let error;
        try{
            //on récupère le token envoyé par la requête
            //le token passe par les headers http et pas par le body qui n'existe que pour les post
            //on vérifie le token en utiliant la clé secrète JWT
            result = jwt.verify(token,process.env.JWT_SECRET);
        }
        catch(err){
            error = new Error("erreur d'authentification");
        }
        return {result,error};
    }
};