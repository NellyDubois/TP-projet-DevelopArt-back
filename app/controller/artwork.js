import artworkDatamapper from "../datamapper/artwork.js";
import { manageResponse } from "../utils/controllerUtils.js";

import 'dotenv/config';

// Définition du contrôleur pour les oeuvres
const artworkController = {
    /**
     * Méthode pour récupérer toutes les oeuvres par l'id de l'artiste.
     * @async
     * @param {object} req - requête.
     * @param {object} res - réponse.
     * @param {Function} next - prochain middleware.
     * @returns {object} - Renvoie les données des oeuvres de l'artiste.
     */
    async getArworksByArtistId(req, res, next) {
        const { result, error } = await artworkDatamapper.getArworksByArtistId(req.params.artiste_id);
        manageResponse(res, result, error, next);
    },
    /**
     * Méthode pour récupérer les oeuvres pour la page d'accueil par l'id de l'artiste.
     * @async
     * @param {object} req - requête.
     * @param {object} res - réponse.
     * @param {Function} next - prochain middleware.
     * @returns {object} - Renvoie les données des oeuvres pour la page d'accueil de l'artiste.
     */
    async getArtworksForHomePage(req, res, next) {
        const { result, error } = await artworkDatamapper.getArtworksForHomePage(req.params.artiste_id);
        manageResponse(res, result, error, next);
    },
    /**
     * Méthode pour récupérer une oeuvre par son id et par l'id de l'artiste.
     * @async
     * @param {object} req - requête.
     * @param {object} res - réponse.
     * @param {Function} next - prochain middleware.
     * @returns {object} - Renvoie les données de l'oeuvre de l'artiste.
     */
    async getArtworkByArtistAndId(req, res, next) {
        // Appel de la fonction du DataMapper pour récupérer les détails de l'oeuvre et stockage du résultat ou de l'erreur
        const { result, error } = await artworkDatamapper.getArtworkByArtistAndId(req.params.artiste_id,req.params.oeuvre_id);
        // Gestion de la réponse avec la fonction utilitaire manageResponse 
        //Si une erreur est détectée, la fonction manageResponse passe l'erreur au middleware de gestion des erreurs d'Express en utilisant next(error). Sinon, elle envoie les données dans la réponse au format JSON en utilisant res.json(result).
        manageResponse(res, result, error, next);
    },
    /**
     * Méthode pour ajouter une oeuvre par l'id de l'artiste.
     * @async
     * @param {object} req - requête.
     * @param {object} res - réponse.
     * @param {Function} next - prochain middleware.
     * @returns {object} - Renvoie les données de l'oeuvre ajoutée.
     */
    async addArtworkByArtistId(req, res, next) {
        // Récupérer les paramètres de la requête
        const artist_id = req.params.artiste_id;
        // Récupérer les données de l'oeuvre à partir du corps de la requête
        const {
            name,
            description,
            production_year,
            technique,
            width,
            height,
            media,
            framing,
            quote,
            path,
            orientation,
            position,
            homepage_flag,
            category_names
        } = req.body;

        // Appeler la fonction du DataMapper pour ajouter l'oeuvre
        const { result, error } = await artworkDatamapper.addArtworkByArtistId(
            artist_id,
            name,
            description,
            production_year,
            technique,
            width,
            height,
            media,
            framing,
            quote,
            path,
            orientation,
            position,
            homepage_flag,
            category_names
        );

        // Gérer la réponse
        manageResponse(res, result, error, next);
        
    },
    
    /**
     * Méthode pour mettre à jour une oeuvre par son id et par l'id de l'artiste.
     * @async
     * @param {object} req - requête.
     * @param {object} res - réponse.
     * @param {Function} next - prochain middleware.
     * @returns {object} - Renvoie un message de confirmation de la mise à jour de l'oeuvre.
     */
    async modifyArtworkByArtistAndId(req, res, next) {
        // Récupérer les paramètres de la requête
        const artist_id = req.params.artiste_id;
        const artwork_id = req.params.oeuvre_id;

        // Récupérer les données de l'oeuvre à partir du corps de la requête
        const {
            name,
            description,
            production_year,
            technique,
            width,
            height,
            media,
            framing,
            quote,
            path,
            orientation,
            position,
            homepage_flag,
            categories
        } = req.body;

        // Appeler la fonction du DataMapper pour ajouter l'oeuvre
        const { result, error } = await artworkDatamapper.modifyArtworkByArtistAndId(
            artist_id,
            artwork_id,
            name,
            description,
            production_year,
            technique,
            width,
            height,
            media,
            framing,
            quote,
            path,
            orientation,
            position,
            homepage_flag,
            categories
        );

        // Gérer la réponse
        manageResponse(res, result, error, next);
    },
    /**
     * Méthode pour supprimer une oeuvre par son id et par l'id de l'artiste.
     * @async
     * @param {object} req - requête.
     * @param {object} res - réponse.
     * @param {Function} next - prochain middleware.
     * @returns {object} - Renvoie un message de confirmation de la suppression de l'oeuvre.
     */
    async deleteArtworkByArtistAndId(req, res, next) {
        // Récupérer les paramètres de la requête id de l'artiste et id de l'oeuvre
        const artist_id = req.params.artiste_id;
        const artwork_id = req.params.oeuvre_id;
        // Appeler la fonction du DataMapper pour ajouter l'oeuvre
        const result = await artworkDatamapper.deleteArtworkByArtistAndId(artwork_id,artist_id);
        if (result) {
            res.status(200).json({ message: 'L\'œuvre a été supprimée avec succès.' });
        } else {
            res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression de l\'œuvre.' });
        }
    },

    /**
     * Méthode pour télécharger une oeuvre par son id et par l'id de l'artiste.
     * @async
     * @param {object} req - requête.
     * @param {object} res - réponse.
     * @param {Function} next - prochain middleware.
     * @returns {object} - Renvoie un message de téléchargement de l'oeuvre.
     */
    async uploadArtworkByArtistId(req, res, next) {
        // Récupérer les paramètres de la requête
        const artist_id = req.params.artiste_id;        
                  
        // Vérifier si un fichier a été téléchargé
            if (!req.file) {
            return res.status(400).send('Aucun fichier n\'a été téléchargé.');
        }
        
        // Récupérer le nom du fichier depuis req.file.originalname et stocker le chemin d'accès dans la variable path
        const path=`/upload/${req.file.filename}`;

        // Récupérer les données saisies dans le formulaire
        const { name, description, production_year, technique, width, height, media, framing, quote, orientation, position, homepage_flag, category_names} = req.body;
        
        // Appeler la fonction du DataMapper pour ajouter l'oeuvre
        const { result, error } = await artworkDatamapper.addArtworkByArtistId(
            artist_id,
            name,
            description,
            production_year,
            technique,
            width,
            height,
            media,
            framing,
            quote,
            path,
            orientation,
            position,
            homepage_flag,
            category_names
        );
            
        // Gérer la réponse
        manageResponse(res, result, error, next);             
    }
};

export default artworkController;