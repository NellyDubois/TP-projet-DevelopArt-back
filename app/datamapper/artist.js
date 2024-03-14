import { executeRequest, executeRequestWithSingleResult } from "../utils/pgUtils.js";

/**
 * @typedef {object} Artist
 * @property {number} artist_id.required - Identifiant unique Pk de la table
 * @property {string} path.required - chemin de la photo de l'artiste
 * @property {string} lastname.required - nom de famille
 * @property {string} firstname.required - prénom
 * @property {string} email.required - email
 * @property {string} password.required - mot de passe
 * @property {string} biography - biographie
 * @property {string} birthdate - date de naissance
 * @property {string} type.required - type d'artiste
 * @property {string} street_no - numéro de rue
 * @property {string} street_name - nom de rue
 * @property {string} zipcode - code postal
 * @property {string} city - ville
 * @property {string} phone - numéro de téléphone
 * @property {string} facebook - lien facebook
 * @property {string} insta - lien instagram
 * @property {string} twitter - lien twitter
 * @property {string} youtube - lien youtube
 */

export default {
    /**
    * @async
    * @param {object} artist_id - id de l'artiste à récupérer
    * @returns {object} réponse de la base de donnée
    */
    async getArtistById(artist_id) {
        // Requête SQL pour récupérer les informations de l'artiste par son id
        // get_artist_by_id($1) est une fonction sql
        const sqlQuery = "SELECT * FROM get_artist_by_id($1);";
        const values = [artist_id];

        return await executeRequestWithSingleResult(sqlQuery, values);
    },

    /**
     * 
     * @param {integer} artiste_id - id de l'artiste
     * @param {string} path - chemin de la photo de l'artiste
     * @param {string} lastname - nom de famille
     * @param {string} firstname - prénom
     * @param {string} email - email
     * @param {string} password - mot de passe
     * @param {string} biography - biographie
     * @param {string} birthdate - date de naissance
     * @param {string} type - type d'artiste
     * @param {string} street_no - numéro de rue
     * @param {string} street_name - nom de rue
     * @param {string} zipcode - code postal
     * @param {string} city - ville
     * @param {string} phone - numéro de téléphone
     * @param {string} facebook - lien facebook
     * @param {string} insta - lien instagram
     * @param {string} twitter - lien twitter
     * @param {string} youtube - lien youtube
     * @returns 
     */
    async updateArtistById(artiste_id, path, lastname, firstname, email, password, biography, birthdate, type, street_no, street_name, zipcode, city, phone, facebook, insta, twitter, youtube) {
        // Requête SQL pour modifier les informations d'un artiste
        const sqlQuery = "SELECT * FROM update_artist($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18);";
        const values = [artiste_id, path, lastname, firstname, email, password, biography, birthdate, type, street_no, street_name, zipcode, city, phone, facebook, insta, twitter, youtube];
        console.log("sqlQuery",sqlQuery);
        console.log("values",values);
        return await executeRequest(sqlQuery, values);
    }
};