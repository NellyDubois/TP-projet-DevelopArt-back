import artistDatamapper from "../datamapper/artist.js";
import { manageResponse } from "../utils/controllerUtils.js";

import { APIError } from "../service/error/APIError.js";

const artistController = {
    // Récupération d'un artiste par son id
    async getArtistById(req, res, next) {
        const { result, error } = await artistDatamapper.getArtistById(req.params.artiste_id);
        
        manageResponse(res, result, error, next);
    },


    // Modification des informations d'un artiste dans la table artist et artist_details, par son id
    async updateArtistById(req, res, next) {

        const artiste_id = req.params.artiste_id;
        const { path, lastname, firstname, email, password, biography, birthdate, type, street_no, street_name, zipcode, city, phone, facebook, insta, twitter, youtube} = req.body;
           
        const { result, error } = await artistDatamapper.updateArtistById(artiste_id, path, lastname, firstname, email, password, biography, birthdate, type, street_no, street_name, zipcode, city, phone, facebook, insta, twitter, youtube);
        // res.status(200).json({ message: "Informations de l'artiste mises à jour avec succès." });
        
        manageResponse(res, result, error, next);
    }
};

export default artistController;