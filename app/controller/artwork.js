import artworkDatamapper from "../datamapper/artwork.js";
import { manageResponse } from "../utils/controllerUtils.js";

import 'dotenv/config';

import fs from 'fs';

const artworkController = {
    // Récupération des oeuvres d'un artiste par l'id de l'artiste
    async getArworksByArtistId(req, res, next) {
        const id=req.params.artiste_id;
        const { result, error } = await artworkDatamapper.getArworksByArtistId(req.params.artiste_id);
        manageResponse(res, result, error, next);
    },
  
    async getArtworksForHomePage(req, res, next) {
        const id=req.params.artiste_id;
        const { result, error } = await artworkDatamapper.getArtworksForHomePage(req.params.artiste_id);
        manageResponse(res, result, error, next);
    },

    // Récupération des détails d'une oeuvre par l'id de l'artiste et l'id de l'oeuvre
    async getArtworkByArtistAndId(req, res, next) {
        // Appel de la fonction du DataMapper pour récupérer les détails de l'oeuvre et stockage du résultat ou de l'erreur
        const { result, error } = await artworkDatamapper.getArtworkByArtistAndId(req.params.artiste_id,req.params.oeuvre_id);
        // Gestion de la réponse avec la fonction utilitaire manageResponse 
        //Si une erreur est détectée, la fonction manageResponse passe l'erreur au middleware de gestion des erreurs d'Express en utilisant next(error). Sinon, elle envoie les données dans la réponse au format JSON en utilisant res.json(result).
        manageResponse(res, result, error, next);
    },

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

        try {
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
        } catch (error) {
            // Passer l'erreur au gestionnaire d'erreurs suivant
            next(error);
        }
    },


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

        try {
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
        } catch (error) {
            // Passer l'erreur au gestionnaire d'erreurs suivant
            next(error);
        }
    },

    async deleteArtworkByArtistAndId(req, res, next) {
        // Récupérer les paramètres de la requête
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

    //pour télécharger une oeuvre: image + informations
    async uploadArtworkByArtistId(req, res, next) {
        // Récupérer les paramètres de la requête
        const artist_id = req.params.artiste_id;        
                  
        // Vérifier si un fichier a été téléchargé
            if (!req.file) {
            return res.status(400).send('Aucun fichier n\'a été téléchargé.');
        }

        const path=`${process.env.BASE_URL_BACK}/upload/${req.file.filename}`;
              
        // Récupérer le nom du fichier depuis req.file.originalname
        const nomFichier = req.file.originalname;

        // Récupérer les données saisies dans le formulaire
        const { name, description, production_year, technique, width, height, media, framing, quote, orientation, position, homepage_flag, category_names} = req.body;
        
        try {
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
                } catch (error) {
                    // Passer l'erreur au gestionnaire d'erreurs suivant
                    next(error);
                }


    }
};

export default artworkController;