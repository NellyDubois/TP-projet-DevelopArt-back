import artistDatamapper from "../datamapper/artist.js";
import { manageResponse } from "../utils/controllerUtils.js";

// Définition du contrôleur pour les artistes
const artistController = {    
    /**
     * Récupère les informations d'un artiste à partir de son id.
     * @async
     * @param {object} req - Requête.
     * @param {object} res - Réponse.
     * @param {Function} next - Prochain middleware.
     * @returns {object} - Renvoie les informations de l'artiste.
     */
    async getArtistById(req, res, next) {
        const { result, error } = await artistDatamapper.getArtistById(req.params.artiste_id);
                manageResponse(res, result, error, next);
    },
    /**
     * Méthode pour la mise à jour des informations d'un artiste.
     * @async
     * @param {object} req - requête.
     * @param {object} res - réponse.
     * @param {Function} next - prochain middleware.
     * @returns {object} - Renvoie un message de confirmation de la mise à jour des informations de l'artiste.
     */
    async updateArtistById(req, res, next) {
        // Récupération de l'id de l'artiste
        const artiste_id = req.params.artiste_id;
        // Récupération des données de l'artiste
        const { path, lastname, firstname, email, password, biography, birthdate, type, street_no, street_name, zipcode, city, phone, facebook, insta, twitter, youtube} = req.body;
        // Mise à jour des informations de l'artiste dans la base de données   
        const { result, error } = await artistDatamapper.updateArtistById(artiste_id, path, lastname, firstname, email, password, biography, birthdate, type, street_no, street_name, zipcode, city, phone, facebook, insta, twitter, youtube);
        manageResponse(res, result, error, next);
    }
};

export default artistController;