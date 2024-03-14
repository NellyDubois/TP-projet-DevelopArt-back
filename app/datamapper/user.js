//Le module pool importé est utilisé pour gérer un pool de connexions à la base de données PostgreSQL,
//évite les potentiels embouteillages de requêtes liés à l'utilisation de client
import pool from "../service/pgPool.js";

import { executeRequestWithSingleResult } from "../utils/pgUtils.js";

/**
 * @typedef {object} User 
 * @property {string} login - informations de connexion de l'utilisateur : email + mot de passe
 * @property {string} artist - informations de l'artiste à ajouter
 * @property {number} id - id de l'utilisateur à récupérer
 */

export default {
    /**
     * Vérifie si un utilisateur existe dans la base de données.
     * @async
     * @param {object} login - informations de connexion de l'utilisateur: email + mot de passe
     * @returns {object} user ou error - utilisateur trouvé avec son id, son firstname et son token
     */
    async checkUser(login) {                 
        
        //on cherche si un utilisateur avec l'email login.email existe dans la table "artist"
        // équivalent avec une fonction sql de const sqlQuery="SELECT * FROM artist WHERE artist.email=$1"; avec une fonction pgpsql
        const sqlQuery = "SELECT * FROM check_user($1);";
        // console.log("sqlQuery",sqlQuery);
        const values = [login];
        // console.log("values",values);
        return await executeRequestWithSingleResult(sqlQuery,values);        
        }
    ,
    /**
     * Ajoute un nouvel utilisateur à la base de données.
     * @async
     * @param {object} artist - informations de l'artiste à ajouter.
     * @returns {object} - réponse de la base de données
     */
    async addUser(artist){

        // la requête SQL pour insérer un nouvel utilisateur est préparée
        //add_user($1) est une fonction sql
        const sqlQuery = "SELECT * FROM add_user($1);";
        console.log(sqlQuery);
        const values = [artist];
        console.log("values=>",values);
        
        return await executeRequestWithSingleResult(sqlQuery,values);

    },

     /**
     * Récupère un utilisateur de la base de données en fonction de son ID.
     * @async
     * @param {number} id - L'ID de l'utilisateur à récupérer.
     * @returns {object} - Utilisateur récupéré.
     */
     async getUser(id){
        const id_user=Number(id);
        //get_user est une fonction
        const sqlQuery = "SELECT * FROM get_user($1);";
        const values = [id_user];
        return await executeRequestWithSingleResult(sqlQuery,values);
    }

};