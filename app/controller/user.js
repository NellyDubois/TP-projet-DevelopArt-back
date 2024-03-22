import { manageResponse } from "../utils/controllerUtils.js";
import userDatamapper from "../datamapper/user.js";
import jwt from "../service/jwt.js";
// import logger from '../service/error/logger.js';

import { APIError } from "../service/error/APIError.js";

import { encodePassword, passwordMatch } from "../service/security.js";

export default {
    /**
     * Méthode pour l'authentification de l'utilisateur.
     * @async
     * @param {object} req - requête.
     * @param {object} res - réponse.
     * @param {Function} next - prochain middleware.
     * @returns {object} - Renvoie les données de l'utilisateur connecté.
     */
    async signin(req, res, next) {                
        //le login inclut l'email et le mot de passe du formulaire de connexion
        const login = req.body;
        // Récupération du user en BDD via son email
        let { error, result } = await userDatamapper.checkUser(login);

        //Si l'utilisateur n'est pas trouvé dans la BDD, on envoie le message "Les identifiants sont incorrects"
        if (result && result.check_user === null) {
            error = new APIError("Les identifiants sont incorrects", 401);
            //logger.info(`Les identifiants sont incorrects`);
            next(error);
        }

        //si l'utilisateur existe dans la BDD
       else{
            //on récupère les données de l'utilisateur
            const user=result.check_user;
        
            // Comparaison du mot de passe retourné par la BDD et celui fourni via le formulaire
            //le booléen isPasswordMatch=true si le mdp est le bon
            const isPasswordMatch = await passwordMatch(login.password, user.password);

            //si l'utilisateur existe et que le mot de passe est correct,
            //on génère un token JWT et on l'attribue au user
            if (user && isPasswordMatch) {
                const token = jwt.encode(user);
                user.token = token;
                
            //on ne garde que quelques données de l'utilisateur
            const userDataFront = {
                user_id: user.id,
                token: user.token,
                firstname: user.firstname
            };

            // Journalisation de la connexion de l'utilisateur
            // logger.info(`L'artiste ${user.firstname} s'est connecté.`);
            
            //envoi de l'id, du prénom et du token de l'utilisateur
            res.json(userDataFront);

        } else {
            //échec d'authentification: message d'erreur 401 non autorisé
            error = new APIError("Les identifiants sont incorrects", 401);
            // logger.info(`Les identifiants de ${user.firstname} sont incorrects`);
            next(error);
        }
    }
    },

     
    //!dans un premier temps, ce sera le super admin qui créera les comptes des artistes
    /**
     * Méthode pour la création d'un nouvel artiste.
     * @async
     * @param {object} req - requête.
     * @param {object} res - réponse.
     * @param {Function} next - prochain middleware.
     * @returns {object} - Renvoie les données de l'artiste ajouté.
     */
    async signup(req, res, next) {
        // Récupération des données de l'artiste à partir du body de la requête HTTP
        const artist = req.body;

        // Chiffrement du mot de passe
        artist.password = await encodePassword(artist.password);

        // Appel de la méthode addUser du datamapper pour ajouter l'artiste à la base de données
        const {error,result} = await userDatamapper.addUser(artist);

        // Si une erreur est retournée, on la transmet au middleware suivant
        if(error){
             next(error);
         }
        //Si l'artiste est ajouté avec succès à la base de données, cette ligne envoie une réponse JSON contenant les données de l'artiste ajouté au client. 
        else{
            res.json(result);
        }
    },

    /**
     * Récupère les informations de l'utilisateur actuel à partir du token JWT.
     * @async
     * @param {object} req - Requête.
     * @param {object} res - Réponse.
     * @param {Function} next - Prochain middleware.
     * @returns {object} - Renvoie les informations de l'utilisateur actuel.
     */
    async getCurrentUser(req, res, next) {
        // Récupération du token
        const token = req.get("Authorization");
        // Vérification du token
        const user = jwt.decode(token);    
        // Récupère les données de l'utilisateur dans la base de données en utilisant l'identifiant de l'utilisateur extrait du token JWT.
        const { error, result } = await userDatamapper.getUser(user.id);
        // Extrait les données de l'utilisateur à partir du résultat de la fonction getUser dans le datamapper
        const userBDD = result.get_user;
        manageResponse(res, userBDD, error, next);
    }    
};