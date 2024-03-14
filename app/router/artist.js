import { Router } from 'express';

import userController from "../controller/user.js";

// Import des schémas
import { signinSchema,signupShema } from '../service/validation/schema.js';

// Middleware de validation
import { validate } from '../service/validation/validate.js';

import multer from 'multer';
import path from 'path';

// Import du middleware de gestion des erreurs

import errorHandler from "../service/error/errorHandler.js";

import artistRouter from "./artistRouter.js";

const router = Router();










import { Router } from 'express';

const router = Router();












import artworkController from './controllers/artworkController';









//pemet de vérifier le rôle pour distinguer l'artiste des
//visiteurs de son site
import { isArtist } from "../service/security.js";

import artistController from '../controller/artist.js';
import categoryController from '../controller/category.js';

import artworkController from '../controller/artwork.js';

import configurationController from '../controller/configuration.js';

import contactController from '../controller/contact.js';


// Route pour la récupération une oeuvre d'un artiste
/**
    * GET /{artiste_id}/oeuvres/{oeuvre_id}
    * @summary Get one artwork
    * @tags Artwork
    * @param {number} artiste_id.path.required - artist identifier
    * @param {number} oeuvre_id.path.required - artwork identifier
    * @return {Artwork} 200 - Success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Artwork not found - application/json
 */
router.get("/oeuvres/:oeuvre_id(\\d+)", artworkController.getArtworkByArtistAndId);


// Route pour modifier une oeuvre d'un artiste
/**
    * PATCH /{artiste_id}/oeuvres/{oeuvre_id}
    * @summary Update one artwork
    * @tags Artwork
    * @param {number} artiste_id.path.required - artist identifier
    * @param {number} oeuvre_id.path.required - artwork identifier
    * @return {Artwork} 200 - Success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Artwork not found - application/json
 */
router.patch("/:artiste_id(\\d+)/oeuvres/:oeuvre_id(\\d+)", isArtist,artworkController.modifyArtworkByArtistAndId);

// Route pour supprimer une oeuvre d'un artiste
/**
    * DELETE /{artiste_id}/oeuvres/{oeuvre_id}
    * @summary Delete one artwork
    * @tags Artwork
    * @param {number} artiste_id.path.required - artist identifier
    * @param {number} oeuvre_id.path.required - artwork identifier
    * @return {Artwork} 200 - Success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Artwork not found - application/json
 */
router.delete('/:artiste_id(\\d+)/oeuvres/:oeuvre_id(\\d+)', isArtist,artworkController.deleteArtworkByArtistAndId);

// Route pour la récupération de toutes les oeuvres d'un artiste
/**
    * GET /{artiste_id}/oeuvres
    * @summary Get all artworks
    * @tags Artwork
    * @param {number} artiste_id.path.required - artist identifier
    * @return {Artwork} 200 - Success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Artwork not found - application/json
 */
router.get("/:artiste_id(\\d+)/oeuvres", artworkController.getArworksByArtistId);

// Route pour la récupération des oeuvres pour la home page d'un artiste
/**
    * GET /{artiste_id}/oeuvres-homePage
    * @summary Get homepage artworks
    * @tags Artwork
    * @param {number} artiste_id.path.required - artist identifier
    * @return {Artwork} 200 - Success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Artwork not found - application/json
 */
router.get("/:artiste_id(\\d+)/oeuvres-homePage", artworkController.getArtworksForHomePage);

// Route pour ajouter des oeuvres d'un artiste
/**
    * POST /{artiste_id}/oeuvres
    * @summary Add a new artwork
    * @tags Artwork
    * @param {number} artiste_id.path.required - artist identifier
    * @return {Artwork} 200 - Success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Artwork not found - application/json
 */
router.post("/:artiste_id(\\d+)/oeuvres", isArtist,artworkController.addArtworkByArtistId);

// Route pour récupérer la configuration d'un artiste
/**
    * GET /{artiste_id}/configuration
    * @summary Get the artist configuration
    * @tags Configuration
    * @param {number} artiste_id.path.required - artist identifier
    * @return {Configuration} 200 - Success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Configuration not found - application/json
 */
router.get("/:artiste_id(\\d+)/configuration",configurationController.getConfigurationByArtistId);

// Route pour modifier la configuration d'un artiste
/**
    * PATCH /{artiste_id}/configuration
    * @summary Update the artist configuration
    * @tags Configuration
    * @param {number} artiste_id.path.required - artist identifier
    * @return {Configuration} 200 - Success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Configuration not found - application/json
 */
router.patch("/:artiste_id(\\d+)/configuration",isArtist,configurationController.updateConfigurationByArtistId);

// Route pour récupérer les informations d'un artiste
/**
    * GET /{artiste_id}
    * @summary Get the artist informations
    * @tags Artist
    * @param {number} artiste_id.path.required - artist identifier
    * @return {Artist} 200 - Success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Artist not found - application/json
 */
router.get("/:artiste_id(\\d+)", artistController.getArtistById);

// Route pour modifier les informations d'un artiste
/**
    * PATCH /{artiste_id}
    * @summary Update the artist informations
    * @tags Artist
    * @param {number} artiste_id.path.required - artist identifier
    * @return {Artist} 200 - Success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Artist not found - application/json
 */
router.patch("/:artiste_id(\\d+)", isArtist, artistController.updateArtistById);

// Toutes les routes qui commencent par /:artiste_id/categories
// Routes GET
// Route pour récupérer les catégories d'un artiste et toutes les oeuvres de chaque catégorie
/**
    * GET /{artiste_id}/categories/oeuvres
    * @summary Get all categories with all the artworks
    * @tags Category
    * @param {number} artiste_id.path.required - artist identifier
    * @return {Category} 200 - Success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Category not found - application/json
 */
router.get("/:artiste_id(\\d+)/categories/oeuvres", categoryController.getCategoriesByArtistId);
// Route pour récupérer les noms de catégories d'un artiste 
/**
    * GET /{artiste_id}/categories
    * @summary Get categories names by artist id
    * @tags Category
    * @param {number} artiste_id.path.required - artist identifier
    * @return {Category} 200 - Success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Category not found - application/json
 */
router.get("/:artiste_id(\\d+)/categories", categoryController.getCategoriesNamesByArtistId);
// Route pour récupérer les oeuvres d'une catégorie d'un artiste
/**
    * GET /{artiste_id}/categories/{categorie_id}
    * @summary Get one category
    * @tags Category
    * @param {number} artiste_id.path.required - artist identifier
    * @param {number} categorie_id.path.required - category identifier
    * @return {Category} 200 - Success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Category not found - application/json
 */
router.get("/:artiste_id(\\d+)/categories/:categorie_id(\\d+)", categoryController.getCategoryByArtistAndId);

// Route POST
// Route pour créer les catégories d'un artiste
/**
    * POST /{artiste_id}/categories
    * @summary Add a new category
    * @tags Category
    * @param {number} artiste_id.path.required - artist identifier
    * @return {Category} 200 - Success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Category not found - application/json
 */
router.post("/:artiste_id(\\d+)/categories", isArtist,categoryController.addCategoryByArtistId);

// Route PATCH
// Route pour modifier une catégorie d'un artiste
/**
    * PATCH /{artiste_id}/categories/{categorie_id}
    * @summary Update the category informations
    * @tags Category
    * @param {number} artiste_id.path.required - artist identifier
    * @param {number} categorie_id.path.required - category identifier
    * @return {Category} 200 - Success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Category not found - application/json
 */
router.patch("/:artiste_id(\\d+)/categories/:categorie_id(\\d+)", isArtist,categoryController.updateCategoryByArtistAndId);

// Route DELETE
// Route pour supprimer une catégorie d'un artiste
/**
    * DELETE /{artiste_id}/categories/{categorie_id}
    * @summary Delete one category
    * @tags Category
    * @param {number} artiste_id.path.required - artist identifier
    * @param {number} categorie_id.path.required - category identifier
    * @return {Category} 200 - Success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Category not found - application/json
 */
router.delete("/:artiste_id(\\d+)/categories/:categorie_id(\\d+)", isArtist,categoryController.deleteCategoryByArtistAndId);

//Route pour le téléchargement des images et des informations liées à l'oeuvre téléchargée
/**
 * @typedef {object} Download
 */
/**
    * POST /{artiste_id}/oeuvres/telechargement-oeuvre
    * @summary Download artwork and its informations
    * @tags Download
    * @param {number} artiste_id.path.required - artist identifier
    * @return {Download} 200 - Success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Category not found - application/json
 */
router.post('/:artiste_id(\\d+)/oeuvres/telechargement-oeuvre', upload.single('fichier'),artworkController.uploadArtworkByArtistId);

// Route pour envoyer un email à l'artiste depuis le formulaire contact
/**
 * @typedef {object} Contact
 */
/**
    * POST /{artiste_id}/envoyer-email
    * @summary Send an e-mail to the artist from the contact form
    * @tags Contact
    * @param {number} artiste_id.path.required - artist identifier
    * @return {Contact} 200 - Success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Contact not found - application/json
 */
router.post("/:artiste_id(\\d+)/envoyer-email", contactController.sendEmail);

export default router;