import categoryDatamapper from "../datamapper/category.js";
import { manageResponse } from "../utils/controllerUtils.js";

const categoryController = {
    // Récupération de toutes les catégories par l'id de l'artiste
    async getCategoriesByArtistId(req, res, next) {
        const { result, error } = await categoryDatamapper.getCategoriesByArtistId(req.params.artiste_id);

        manageResponse(res, result, error, next);
    },
    async getCategoriesNamesByArtistId(req, res, next) {
        const { result, error } = await categoryDatamapper.getCategoriesNamesByArtistId(req.params.artiste_id);

        manageResponse(res, result, error, next);
    },
    // Récupération d'une catégorie par son id et par l'id de l'artiste
    async getCategoryByArtistAndId(req, res, next) {
        console.log("controller req.params.artiste_id", "req.params.categorie_id");
        console.log(req.params.artiste_id, req.params.categorie_id);
        const { result, error } = await categoryDatamapper.getCategoryByArtistAndId(req.params.artiste_id, req.params.categorie_id);

        manageResponse(res, result, error, next);
    },
    // Ajout d'une nouvelle catégorie
    async addCategoryByArtistId(req, res, next) {
        const artist_id = req.params.artiste_id;

        const {name, description, color} = req.body

        const { result, error } = await categoryDatamapper.addCategoryByArtistId(artist_id, name, description, color);

        manageResponse(res, result, error, next);
    },
    // Modification des informations d'une catégorie
    async updateCategoryByArtistAndId(req, res, next) {
        // Récupérer les paramètres de la requête
        const artist_id = req.params.artiste_id;
        
        const category_id = req.params.categorie_id;

        const {name, description, color} = req.body;
        console.log("name",name);
        console.log("description",description);
        console.log("color",color);
        console.log("artist_id",artist_id);
        console.log("category_id",category_id);
        

        const { result, error } = await categoryDatamapper.updateCategoryByArtistAndId(artist_id, category_id, name, description, color);

        manageResponse(res, result, error, next)

    },
    // Suppression d'une catégorie par son id et par l'id de l'artiste
    async deleteCategoryByArtistAndId(req, res, next) {
        const { result, error } = await categoryDatamapper.deleteCategoryByArtistAndId(req.params.artiste_id, req.params.categorie_id);

        manageResponse(res, result, error, next);
    },
}

export default categoryController;