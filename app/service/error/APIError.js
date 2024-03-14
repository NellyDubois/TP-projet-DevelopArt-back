/**
* @typedef {object} ApiError
* @property {string} status - Status
* @property {number} statusCode - HTTP Status code
* @property {string} message - Error message
*/

/**
 * Classe représentant une erreur spécifique dans le contexte de notre API web
 * pour représenter les erreurs liées aux requêtes HTTP.
 * @extends Error
 */
export class APIError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.status = status;
    }
}