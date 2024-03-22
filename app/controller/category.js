import categoryDatamapper from "../datamapper/category.js";
import { manageResponse } from "../utils/controllerUtils.js";

// Définition du contrôleur pour les catégories
const categoryController = {    
    /**
     * Méthode pour récupérer toutes les catégories par l'id de l'artiste.
     * @async
     * @param {object} req - requête.
     * @param {object} res - réponse.
     * @param {Function} next - prochain middleware.
     * @returns {object} - Renvoie les données des catégories de l'artiste.
     */
    async getCategoriesByArtistId(req, res, next) {
        const { result, error } = await categoryDatamapper.getCategoriesByArtistId(req.params.artiste_id);
        manageResponse(res, result, error, next);
    },
    /**
     * Méthode pour récupérer tous les noms catégories par l'id de l'artiste (juste les noms sans les autres informations telles que les oeuvres))
     * @async
     * @param {object} req - requête.
     * @param {object} res - réponse.
     * @param {Function} next - prochain middleware.
     * @returns {object} - Renvoie les noms des catégories de l'artiste.
     */
    async getCategoriesNamesByArtistId(req, res, next) {
        const { result, error } = await categoryDatamapper.getCategoriesNamesByArtistId(req.params.artiste_id);
        manageResponse(res, result, error, next);
    },
    /**
     * Méthode pour récupérer une catégorie par son id et par l'id de l'artiste.
     * @async
     * @param {object} req - requête.
     * @param {object} res - réponse.
     * @param {Function} next - prochain middleware.
     * @returns {object} - Renvoie les données de la catégorie de l'artiste.
    */
    async getCategoryByArtistAndId(req, res, next) {
        const { result, error } = await categoryDatamapper.getCategoryByArtistAndId(req.params.artiste_id, req.params.categorie_id);
        manageResponse(res, result, error, next);
    },
    /**
     * Méthode pour ajouter une catégorie par l'id de l'artiste.
     * @async
     * @param {object} req - requête.
     * @param {object} res - réponse.
     * @param {Function} next - prochain middleware.
     * @returns {object} - Renvoie les données de la catégorie ajoutée.
     */
    async addCategoryByArtistId(req, res, next) {
        const artist_id = req.params.artiste_id;
        const {name, description, color} = req.body
        const { result, error } = await categoryDatamapper.addCategoryByArtistId(artist_id, name, description, color);
        manageResponse(res, result, error, next);
    },
    /**
     * Méthode pour mettre à jour une catégorie par son id et par l'id de l'artiste.
     * @async
     * @param {object} req - requête.
     * @param {object} res - réponse.
     * @param {Function} next - prochain middleware.
     * @returns {object} - Renvoie un message de confirmation de la mise à jour de la catégorie.
    */
    async updateCategoryByArtistAndId(req, res, next) {
        // Récupérer les paramètres de la requête
        const artist_id = req.params.artiste_id;
        const category_id = req.params.categorie_id;
        const {name, description, color} = req.body;
        const { result, error } = await categoryDatamapper.updateCategoryByArtistAndId(artist_id, category_id, name, description, color);
        manageResponse(res, result, error, next)
    },
    /**
     * Méthode pour supprimer une catégorie par son id et par l'id de l'artiste.
     * @async
     * @param {object} req - requête.
     * @param {object} res - réponse.
     * @param {Function} next - prochain middleware.
     * @returns {object} - Renvoie un message de confirmation de la suppression de la catégorie.
     */
    async deleteCategoryByArtistAndId(req, res, next) {
        const { result, error } = await categoryDatamapper.deleteCategoryByArtistAndId(req.params.artiste_id, req.params.categorie_id);
        manageResponse(res, result, error, next);
    },
}

export default categoryController;