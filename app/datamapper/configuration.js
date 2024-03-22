import { executeRequestWithSingleResult} from "../utils/pgUtils.js";

/**
 * @typedef {object} Configuration
 * @property {number} artiste_id.required - Identifiant unique Pk de la table artist
 * @property {string} font_type - Nouveau type de police
 * @property {string} background_color - Nouvelle couleur de fond
 * @property {string} background_color_nav - Nouvelle couleur de fond de la barre de navigation
 * @property {string} cursor - Nouveau curseur
 * @property {string} font_color - Nouvelle couleur de police
 * @property {number} layout - Nouveau layout
 * @property {string} banner - Nouvelle bannière
 * @property {string} logo - Nouveau logo
 * @property {boolean} facebook_flag - Nouvelle valeur du drapeau Facebook
 * @property {boolean} insta_flag - Nouvelle valeur du drapeau Instagram
 * @property {boolean} twitter_flag - Nouvelle valeur du drapeau Twitter
 * @property {boolean} youtube_flag - Nouvelle valeur du drapeau YouTube
 */

export default {

    /**
    * @async
    * @param {integer} artiste_id - ID de l'artiste de la configuration à récupérer
    * @returns {Promise<object>} Réponse de la base de données
    */
    async getConfigurationByArtistId(artiste_id) {
        // Requête SQL pour récupérer la configuration de l'artiste par l'id de l'artiste
        // get_configuration_by_artist_id($1) est une fonction sql
        const sqlQuery = "SELECT * FROM get_configuration_by_artist_id($1)";
        const values = [artiste_id];
        return await executeRequestWithSingleResult(sqlQuery, values);
    },

    
    /**
    * @async
    * @param {integer} artiste_id - ID de l'artiste de la configuration à mettre à jour
    * @param {string} font_type - Nouveau type de police
    * @param {string} background_color - Nouvelle couleur de fond    
    * @param {string} background_color_nav - Nouvelle couleur de fond de la barre de navigation
    * @param {string} cursor - Nouveau curseur
    * @param {string} font_color - Nouvelle couleur de police
    * @param {integer} layout - Nouveau layout
    * @param {string} banner - Nouvelle bannière
    * @param {string} logo - Nouveau logo
    * @param {boolean} facebook_flag - Nouvelle valeur du drapeau Facebook
    * @param {boolean} insta_flag - Nouvelle valeur du drapeau Instagram
    * @param {boolean} twitter_flag - Nouvelle valeur du drapeau Twitter
    * @param {boolean} youtube_flag - Nouvelle valeur du drapeau YouTube
    * @returns {Promise<void>} Réponse de la base de données
    */
    async updateConfigurationByArtistId(artiste_id, font_type, background_color,background_color_nav, cursor, font_color, layout, banner, logo, facebook_flag, insta_flag, twitter_flag, youtube_flag) {
        // Requête SQL pour mettre à jour la configuration de l'artiste par son ID
        const sqlQuery = "SELECT update_configuration_by_artist_id($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)";
        const values = [artiste_id, font_type, background_color,background_color_nav, cursor, font_color, layout, banner, logo, facebook_flag, insta_flag, twitter_flag, youtube_flag];

        return await executeRequestWithSingleResult
        (sqlQuery, values);
    }
};
