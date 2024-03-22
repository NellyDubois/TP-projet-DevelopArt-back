import configurationDatamapper from "../datamapper/configuration.js";
import { manageResponse } from "../utils/controllerUtils.js";

// Définition du contrôleur pour la configuration(personnalisation)
const configurationController = {
    /**
     * Méthode pour récupérer la configuration par l'id de l'artiste.
     * @async
     * @param {object} req - requête.
     * @param {object} res - réponse.
     * @param {Function} next - prochain middleware.
     * @returns {object} - Renvoie les données de la configuration de l'artiste.
     */
    async getConfigurationByArtistId(req, res, next) {              
        const { result, error } = await configurationDatamapper.getConfigurationByArtistId(req.params.artiste_id);
        manageResponse(res, result, error, next);
    },    
    /**
     * Méthode pour mettre à jour de la configuration par l'id de l'artiste
     * @async
     * @param {object} req - requête.
     * @param {object} res - réponse.
     * @param {Function} next - prochain middleware.
     * @returns {object} - Renvoie les données de l'artiste ajouté.
     */
    async updateConfigurationByArtistId(req, res, next) {
        const artist_id=req.params.artiste_id;
        //Récupération de la personnalisation rensignée par l'artiste dans le formulaire
        const {font_type, background_color,background_color_nav, cursor, font_color, layout,banner, logo, facebook_flag, insta_flag, twitter_flag, youtube_flag}=req.body;
        //Mise à jour de la configuration dans la base de données
        const { result, error } = await configurationDatamapper.updateConfigurationByArtistId(artist_id, font_type, background_color,background_color_nav, cursor, font_color, layout, banner, logo, facebook_flag, insta_flag, twitter_flag, youtube_flag);
        manageResponse(res, result, error, next);
    }
    
};

export default configurationController;