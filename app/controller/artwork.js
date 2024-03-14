import artworkDatamapper from "../datamapper/artwork.js";
import { manageResponse } from "../utils/controllerUtils.js";

import 'dotenv/config';

import fs from 'fs';

const artworkController = {
    // Récupération des oeuvres d'un artiste par l'id de l'artiste
    async getArworksByArtistId(req, res, next) {
        const id=req.params.artiste_id;
        console.log(id);
        const { result, error } = await artworkDatamapper.getArworksByArtistId(req.params.artiste_id);
        
        manageResponse(res, result, error, next);
    },
  
    async getArtworksForHomePage(req, res, next) {
        const id=req.params.artiste_id;
        console.log(id);
        const { result, error } = await artworkDatamapper.getArtworksForHomePage(req.params.artiste_id);
    
        manageResponse(res, result, error, next);
    },

    async getArtworkByArtistAndId(req, res, next) {
        console.log("je passe par getArtworkByArtistAndId")
        const parametres=req.params;
        console.log("parametres",parametres);
        const artist_id=req.params.artiste_id;
        console.log(artist_id);
        const oeuvre_id=req.params.oeuvre_id;
        console.log(oeuvre_id);
        const { result, error } = await artworkDatamapper.getArtworkByArtistAndId(req.params.artiste_id,req.params.oeuvre_id);
        
        manageResponse(res, result, error, next);
    },

    async addArtworkByArtistId(req, res, next) {
        // Récupérer les paramètres de la requête
        const artist_id = req.params.artiste_id;
        console.log("artist_id",artist_id);
        
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
        console.log("artist_id",artist_id);

        const artwork_id = req.params.oeuvre_id;
        console.log("artwork_id",artwork_id);
        
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
        console.log("artist_id",artist_id);

        const artwork_id = req.params.oeuvre_id;
        console.log("artwork_id",artwork_id);
                
        console.log("artwork_id,artist_id",artwork_id,artist_id);
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
            console.log("artist_id",artist_id);
        
            //fichier téléchargé: oeuvre nom "suite de chiffres et lettres"
            console.log("req.file",req.file);  
                        
                       
            // Vérifier si un fichier a été téléchargé
             if (!req.file) {
                console.log("Aucun fichier n'a été téléchargé.");
                return res.status(400).send('Aucun fichier n\'a été téléchargé.');
            }
            
            
            // const p = req.file.path;
            // const path=`${process.env.BASE_URL_BACK}/${p}`;
            // console.log("path", path);

            const path=`${process.env.BASE_URL_BACK}/upload/${req.file.filename}`;
            console.log("path", path);

              
            // Récupérer le nom du fichier depuis req.file.originalname
            const nomFichier = req.file.originalname;
            console.log("nomFichier", nomFichier);


        // Récupérer les données saisies dans le formulaire
        const { name, description, production_year, technique, width, height, media, framing, quote, orientation, position, homepage_flag, category_names} = req.body;
        console.log("req.body",req.body);

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