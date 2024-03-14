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
     */
    async signin(req, res, next) {
                
        //le login inclut l'email et le mot de passe du formulaire de connexion
        const login = req.body;
        console.log("login=>",login);

        // Récupération du user en BDD via son email
        let { error, result } = await userDatamapper.checkUser(login);
        console.log("result datamapper",result);
        console.log("error datamapper",error);

        //Si l'utilisateur n'est pas trouvé dans la BDD, on envoie le message Utilisateur non trouvé
        if (result && result.check_user === null) {
            // error = "Utilisateur non trouvé";
            // console.log("new error",error);
            // res.json("Utilisateur non trouvé");

            error = new APIError("Les identifiants sont incorrects", 401);
            // logger.info(`Les identifiants sont incorrects`);
            next(error);
        }

        //si l'utilisateur existe dans la BDD
       else{

            const user=result.check_user;
            console.log("user=>",user);
            
            console.log("login.password",login.password);

            console.log("user.password",user.password);
        
            // Comparaison du mot de passe retourné par la BDD et celui fourni via le formulaire
            //le booléen isPasswordMatch=true si le mdp est le bon
            const isPasswordMatch = await passwordMatch(login.password, user.password);
            console.log("isPasswordMatch",isPasswordMatch);

        //si l'utilisateur existe et que le mot de passe est correct,
        //on génère un token JWT et on l'attribue au user
        if (user && isPasswordMatch) {
            console.log("user condition",user);
            const token = jwt.encode(user);
            console.log("token",token);
            user.token = token;
            
            //on ne garde que quelques données de l'utilisateur
            const userDataFront = {
                user_id: user.id,
                token: user.token,
                firstname: user.firstname
            };

            // Journalisation de la connexion de l'utilisateur
            // logger.info(`L'artiste ${user.firstname} s'est connecté.`);
            

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
    async signup(req, res, next) {
        const artist = req.body;
        console.log("artist signup",artist);

        // Chiffrement du mot de passe
        artist.password = await encodePassword(artist.password);
        // console.log("pwd hashe",artist.password);

        const {error,result} = await userDatamapper.addUser(artist);

        if(error){
             next(error);
         }
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
     */
    async getCurrentUser(req, res, next) {
        // Récupération du token
        const token = req.get("Authorization");
        // Vérification du token
        const user = jwt.decode(token);

        // console.log(user);

        // Récupère les données de l'utilisateur dans la base de données en utilisant l'identifiant de l'utilisateur extrait du token JWT.
        const { error, result } = await userDatamapper.getUser(user.id);

        // Extrait les données de l'utilisateur à partir du résultat de la fonction getUser dans le datamapper
        const userBDD = result.get_user;

        manageResponse(res, userBDD, error, next);
    }
    
};