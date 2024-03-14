import { APIError } from '../error/APIError.js';

// on va créer des générateurs de middleware
// les cas étant divers et variés (validation du body, de params ou de query, schémas multiples etc.)
// on appellera la bonne fonction en lui passant le schéma de validation

export function validate(schema, subKey = null){

    return (request, _ , next) => {

        // si on précise une clé, seule cette clé sera validée
        const data = (subKey) ? request.body[subKey] : request.body;
        
        const { error } = new APIError(schema.validate(data),400);

        if (error) {
            next(error);
            return;
        }

        next();
    };
    
};