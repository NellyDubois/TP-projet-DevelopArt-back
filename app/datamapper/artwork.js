import { executeRequest, executeRequestWithSingleResult} from "../utils/pgUtils.js";

/**
 * @typedef {object} Artwork
 * @property {number} artist_id.required - Identifiant unique Pk de la table artist
 * @property {number} artwork_id.required - Identifiant unique Pk de la table artwork
 * @property {string} artwork_name.required - nom de l'oeuvre
 * @property {string} description - description de l'oeuvre
 * @property {number} production_year - date de production de l'oeuvre
 * @property {string} technique - technique utilisée
 * @property {number} width - largeur
 * @property {number} height - hauteur
 * @property {string} media - support d'impression
 * @property {boolean} framing - encadrement
 * @property {string} quote - citation
 * @property {string} path.required - chemin de l'image
 * @property {string} orientation - orientation ( paysage, portrait )
 * @property {number} position.required - position sur la galerie
 * @property {boolean} homepage_flag.required - visible sur la homepage ou non
 */

export default {
    /**
    * @async
    * @param {object} id - id de l'artiste dont on veut récupérer les oeuvres
    * @returns {Promise<object>} réponse de la base de donnée
    */
    async getArworksByArtistId(artiste_id) {
        // Requête SQL pour récupérer les oeuvres de l'artiste par l'id de l'artiste
        // get_artworks_by_artist_id($1) est une fonction sql
        const sqlQuery = "SELECT * FROM get_artworks_by_artist_id($1)";
        const values = [artiste_id];

        return await executeRequest(sqlQuery, values);
    },

    async getArtworksForHomePage(artiste_id) {
        // Requête SQL pour récupérer les oeuvres de l'artiste par l'id de l'artiste
        // get_artworks_by_artist_id($1) est une fonction sql
        const sqlQuery = "SELECT * FROM get_artworks_for_home_page($1)";
        const values = [artiste_id];

        return await executeRequest(sqlQuery, values);
    },   

    /**
    * @async
    * @param {number} artist_id - ID de l'artiste
    * @param {number} artwork_id - ID de l'oeuvre
    * @returns {Promise<object>} Réponse de la base de données
    */
    async getArtworkByArtistAndId(artist_id,artwork_id) {
        // Requête SQL pour récupérer les détails d'une oeuvre par son id et l'id de l'artiste
        // get_artwork_by_artist_and_id($1,$2) est une fonction sql
        const sqlQuery = "SELECT * FROM get_artwork_by_artist_and_id($1,$2)";
        const values = [artist_id,artwork_id];

        return await executeRequestWithSingleResult(sqlQuery, values);
    },

    async addArtworkByArtistId(artist_id, artwork_name, description, production_year, technique, width, height, media, framing, quote, path, orientation, position, homepage_flag,category_names) {
        // Requête SQL pour ajouter une oeuvre à la galerie de l'artiste
        const sqlQuery = "SELECT * FROM add_artwork_by_artist_id($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,$15)";
        console.log("sqlQuery",sqlQuery);
        const values = [artist_id, artwork_name, description, production_year, technique, width, height, media, framing, quote, path, orientation, position, homepage_flag,category_names];
        console.log("values",values);
        return await executeRequestWithSingleResult(sqlQuery, values);
    },

    async modifyArtworkByArtistAndId(artist_id, artwork_id,artwork_name, description, production_year, technique, width, height, media, framing, quote, path, orientation, position, homepage_flag,category_names) {
        // Requête SQL pour modifier une oeuvre à la galerie de l'artiste et la date de mise à jour
        const sqlQuery = "SELECT * FROM modify_artwork_by_id_and_artist_id($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,$16)";
        console.log("sqlQuery",sqlQuery);
        const values = [artist_id, artwork_id,artwork_name, description, production_year, technique, width, height, media, framing, quote, path, orientation, position, homepage_flag,category_names];
        console.log("values",values);
        return await executeRequestWithSingleResult(sqlQuery, values);
    },

    async deleteArtworkByArtistAndId(artwork_id,artist_id){
        const sqlQuery = "SELECT * FROM delete_artwork_by_id_and_artist_id($1, $2)";
        console.log("sqlQuery datamapper",sqlQuery);
        const values = [artwork_id, artist_id];
        console.log("values",values);
        return executeRequestWithSingleResult(sqlQuery, values);
    }

};



