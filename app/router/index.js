//le router index.js est le point d'entrée de tous les routeurs
import { Router } from 'express';

import userController from "../controller/user.js";

// Import des schémas
import { signinSchema,signupShema } from '../service/validation/schema.js';

// Import du middleware de validation
import { validate } from '../service/validation/validate.js';

// Import de multer pour le téléchargement des images
import multer from 'multer';

// Import de path pour gérer les chemins de fichiers
import path from 'path';

//permet de vérifier le rôle pour distinguer l'artiste des visiteurs de son site
import { isArtist } from "../service/security.js";

//import des controllers
import artistController from '../controller/artist.js';
import categoryController from '../controller/category.js';
import artworkController from '../controller/artwork.js';
import configurationController from '../controller/configuration.js';
import contactController from '../controller/contact.js';

//import du middleware de gestion des erreurs
import errorHandler from "../service/error/errorHandler.js";

// Import du middleware pour enregistrer les détails des requêtes entrantes
import requestLogger from '../service/error/requestLogger.js';

// Création du routeur
const router = Router();

// Middleware pour enregistrer les détails des requêtes entrantes
router.use(requestLogger);

// Configuration de Multer
//On crée une nouvelle instance de stockage pour Multer. Le stockage est configuré pour enregistrer les fichiers sur le disque.
const storage = multer.diskStorage({
    destination: function (req, file, cb) { //Cette ligne définit la fonction de destination où seront enregistrés les fichiers téléchargés. La fonction prend trois paramètres : req (la demande HTTP), file (le fichier téléchargé) et cb (une fonction de rappel).
      cb(null, 'public/upload'); // Cette ligne utilise la fonction de rappel cb pour indiquer à Multer où enregistrer le fichier. Le premier argument de cb est null, ce qui signifie qu'il n'y a pas d'erreur. Le deuxième argument est le chemin du répertoire de destination.
    },
    filename: function (req, file, cb) { //Cette ligne définit la fonction pour générer le nom de fichier. Elle prend également trois paramètres : req (la demande HTTP), file (le fichier téléchargé) et cb (une fonction de rappel).
      const extension = path.extname(file.originalname); // Cette ligne utilise la méthode extname du module path pour obtenir l'extension du fichier téléchargé.
      const originalname = path.basename(file.originalname, extension); // Cette ligne utilise la méthode basename du module path pour obtenir le nom original du fichier sans l'extension.
      cb(null, originalname + extension); // Cette ligne utilise la fonction de rappel cb pour renvoyer le nouveau nom de fichier. Le premier argument de cb est null, ce qui signifie qu'il n'y a pas d'erreur. Le deuxième argument est le nouveau nom de fichier, qui est composé du nom original du fichier,  et de l'extension.
    }
  });
  
  // Configurer Multer avec le stockage personnalisé défini au-dessus
   const upload = multer({ storage: storage });

//pour créer de nouveaux artistes
/**
    * POST /signup
    * @summary Add one user
    * @tags User    
    * @return {User} 200 - Success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Account not found - application/json
 */
router.post("/signup",validate(signupShema),userController.signup);

/**
 * @typedef {object} Identifiers
 * @property {string} email.required - The email
 * @property {string} password.required - The password
 */
//pour gérer l'authentification des artistes
/**
    * POST /signin
    * @summary Check user
    * @tags User 
    * @param {Identifiers} request.body.required - Identifiers for signin
    * @return {User} 200 - Success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Category not found - application/json
 */
router.post("/signin",validate(signinSchema),userController.signin);

// Toutes les routes qui nécessitent une authentification passent par le middleware isArtist: si l'artiste s'est connecté avec
//son email et password alors il a un token qui doit être passé dans le header des requêtes qui nécessitent des droits:
// par exemple, afficher la page de configuration, modifier les données de config, de l'artiste,...

// Toutes les routes qui commencent par /:artiste_id/oeuvres
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
router.get("/:artiste_id(\\d+)/oeuvres/:oeuvre_id(\\d+)", artworkController.getArtworkByArtistAndId);

/**
 * @typedef {object} NewArtwork 
 * @property {string} artwork_name.required - name of the artwork
 * @property {string} description - description of the artwork
 * @property {number} production_year.required - date of production 
 * @property {string} technique - technique used
 * @property {number} width.required - width
 * @property {number} height.required - height
 * @property {string} media - media used
 * @property {boolean} framing - framing
 * @property {string} quote - quote
 * @property {string} path.required - path to the artwork
 * @property {string} orientation - orientation 
 * @property {number} position.required - position in the gallery
 * @property {boolean} homepage_flag.required - homepage flag
 * @property {string} category_names - categories of the artwork
 * @property {string} file.required - The file of the artwork
*/

// Route pour la récupération une oeuvre d'un artiste
/**
    * PATCH /{artiste_id}/oeuvres/{oeuvre_id}
    * @summary Update one artwork
    * @tags Artwork
    * @param {number} artiste_id.path.required - artist identifier
    * @param {number} oeuvre_id.path.required - artwork identifier     
    * @param {NewArtwork} request.body.required - Artwork informations to modify
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
    * @param {NewArtwork} request.body.required - NewArtwork informations
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
    * @param {Configuration} request.body.required - Configuration to modify
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

/**
 * @typedef {object} NewCategory
 * @property {string} name.required - The name
 * @property {string} description - The description
 * @property {string} color.required - The color
 */

// Route pour créer les catégories d'un artiste
/**
    * POST /{artiste_id}/categories
    * @summary Add a new category
    * @tags Category
    * @param {number} artiste_id.path.required - artist identifier     
    * @param {NewCategory} request.body.required - New category informations
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
    * @param {NewCategory} request.body.required - Category informations
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
 * @property {string} artwork_name.required - name of the artwork
 * @property {string} description - description of the artwork
 * @property {number} production_year.required - date of production 
 * @property {string} technique - technique used
 * @property {number} width.required - width
 * @property {number} height.required - height
 * @property {string} media - media used
 * @property {boolean} framing - framing
 * @property {string} quote - quote
 * @property {string} path.required - path to the artwork
 * @property {string} orientation - orientation 
 * @property {number} position.required - position in the gallery
 * @property {boolean} homepage_flag.required - homepage flag
 * @property {string} category_names - categories of the artwork
 * @property {string} file.required - The file of the artwork
*/
/**
    * POST /{artiste_id}/oeuvres/telechargement-oeuvre
    * @summary Download artwork and its informations
    * @tags Download
    * @param {number} artiste_id.path.required - artist identifier 
    * @param {Download} request.body.required - Artwork details with file
    * @return {DownloadOK} 200 - Success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Category not found - application/json
 */
router.post('/:artiste_id(\\d+)/oeuvres/telechargement-oeuvre', upload.single('fichier'),artworkController.uploadArtworkByArtistId);

// Route pour envoyer un email à l'artiste depuis le formulaire contact
/**
 * @typedef {object} Contact
 * @property {string} firstname.required - firstname 
 * @property {string} lastname.required - lastname
 * @property {string} phone - phone
 * @property {string} email.required - email
 * @property {string} story.required - story
 * @property {string} objectEmail - object of the email
 */
/**
    * POST /{artiste_id}/envoyer-email
    * @summary Send an e-mail to the artist from the contact form
    * @tags Contact
    * @param {number} artiste_id.path.required - artist identifier
    * @param {Contact} request.body.required - Sender and content of the email
    * @return {Contact} 200 - Success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Contact not found - application/json
 */
router.post("/:artiste_id(\\d+)/envoyer-email", contactController.sendEmail);

//Route de gestion des erreurs
router.use(errorHandler);


export default router;