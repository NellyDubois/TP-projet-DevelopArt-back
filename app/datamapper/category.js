import { executeRequest, executeRequestWithSingleResult } from "../utils/pgUtils.js";

/**
 * @typedef {object} Category
 * @property {number} artist_id.required - Identifiant unique Pk de la table artist
 * @property {number} category_id.required - Identifiant unique Pk de la table category
 * @property {string} name.required - nom de la catégorie
 * @property {string} description - description de la catégorie
 * @property {string} color.required - couleur de la catégorie
 */

export default {
    /**
     * @async
     * @param {object} id - id de l'artiste à récupérer
     * @returns {object} réponse de la base de donnée
     */
    async getCategoriesByArtistId(artist_id) {
        // Requête SQL pour récupérer toutes les catégories et leurs oeuvres associées
        // get_all_categories est une fonction sql
        const sqlQuery = "SELECT * FROM get_categories_by_artist_id($1);";
        const values = [artist_id];
       
        return await executeRequest(sqlQuery, values);
    },
    async getCategoriesNamesByArtistId(artist_id) {
        // Requête SQL pour récupérer toutes les catégories et leurs oeuvres associées
        // get_all_categories est une fonction sql
        const sqlQuery = "SELECT * FROM get_categories_names_by_artist_id($1);";
        const values = [artist_id];
     
       
        return await executeRequest(sqlQuery, values);
    },

    /**
     * @async
     * @param {object} artist_id - id de l'artiste à récupérer
     * @param {object} category_id - id de la catégorie à récupérer
     * @returns {object} réponse de la base de donnée
     */
    async getCategoryByArtistAndId(artist_id, category_id) {
        // Requête SQL pour récupérer une catégorie par son id et l'id d'un artiste
        // get_category_by_artist_and_id($1, $2) est une fonction sql
        const sqlQuery = "SELECT * FROM get_category_by_artist_id($1,$2);";
        const values = [artist_id, category_id];
        

        return await executeRequest(sqlQuery, values);
    },

    /**
     * @async
     * @param {object} artist_id - id de l'artiste à récupérer
     * @returns 
     */
    async addCategoryByArtistId(artist_id, name, description, color) {
        // Requête SQL pour créer une nouvelle catégorie à partir de l'id d'un artiste
        // add_category_by_artist_id($1) est une fonction sql
        const sqlQuery = "SELECT * FROM add_category_by_artist_id($1, $2, $3, $4);";
        const values = [artist_id, name, description, color];
        
        return await executeRequestWithSingleResult(sqlQuery, values);
    },
    /**
     * 
     * @param {integer} artist_id - id de l'artiste
     * @param {string} category_id - id de la catégorie
     * @param {string} name - nom de la catégorie
     * @param {string} description - description de la catégorie
     * @param {string} color - couleur de la catégorie
     * @returns 
     */
    async updateCategoryByArtistAndId(artist_id, category_id, name, description, color) {
        // Requête SQL pour modifier les informations d'une catégorie par son id, à partir de l'id d'un artiste
        // update_category_by_artist_id($1, $2) est une fonction sql
        const sqlQuery = "SELECT * FROM update_category_by_artist_id($1, $2, $3, $4, $5);";
        const values = [artist_id, category_id, name, description, color];
       

        return await executeRequestWithSingleResult(sqlQuery, values);

    },
    async deleteCategoryByArtistAndId(artist_id, category_id) {
        // Requête SQL pour supprimer une catégorie à partir de l'id d'un artiste
        const sqlQuery = "SELECT * FROM delete_category_by_artist_id($1, $2);";
        const values = [artist_id, category_id];

        return await executeRequestWithSingleResult(sqlQuery, values);
    }
};