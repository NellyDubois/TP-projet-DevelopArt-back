import expressJSDocSwagger from "express-jsdoc-swagger";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const options = {
    info: {
        version: '1.0.0',
        title: "Develop'Art",
        description: "Galerie personnalisable pour artistes",
    },
    baseDir: __dirname,
    // On analyse tous les fichiers du projet
    filesPattern: ['../router/*.js', './error/*.js', '../datamapper/*.js', '../controller/*.js'],
    // URL où sera disponible la page de documentation
    swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE,
    // Activation de la documentation à travers une route de l'API
    exposeApiDocs: true,
    apiDocsPath: '/',
};
/**
 * 
 * @param {object} app - Express application
 * @returns {object} Express JSDoc Swagger middleware that create web documentation
 */
export default (app) => expressJSDocSwagger(app)(options);