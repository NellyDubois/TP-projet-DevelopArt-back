import Joi from 'joi';

// le mot de passe doit avoir une longueur entre 8 et 12 caractères, et qu'il contient au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial parmi @$!%*?&
export const signinSchema =  Joi.object({
    email: Joi.string().pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/)
}).required().length(2);

//Définition du schéma de validation pour la création d'un nouvel artiste
export const signupShema =  Joi.object({
    path : Joi.string().required(), // path est une clé obligatoire et doit être une chaîne de caractères
    lastname : Joi.string().required(),
    firstname : Joi.string().required(),
    //l'email (obligatoire) doit commencer par une ou plusieurs lettres, chiffres, points, traits de soulignement ou tirets , Suivi du caractère @ Suivi par une ou plusieurs lettres, chiffres, points ou tirets, Suivi d'un point, Suivi par au moins deux lettres (le domaine de niveau supérieur)
    email : Joi.string().pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
    // le mot de passe (obligatoire) doit avoir une longueur entre 8 et 12 caractères, et qu'il contient au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial parmi @$!%*?&
    password : Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/).required(),
    //la date de naissance (obligatoire) doit être une date valide, et doit être comprise entre le 01/01/1900 et la date actuelle
    birthdate : Joi.date().min('1900-01-01').max('now').required(),    
    biography : Joi.string(),
    type : Joi.string(),
    street_no : Joi.string(),
    street_name : Joi.string(),
    //le code postal doit commencer par 0 et suivi d'un chiffre entre 1 et 9, suivi de trois chiffres supplémentaires
    //OU commencer par un chiffre entre 1 et 8 suivi de 4 chiffres supplémentaires
    //OU commencer par 9 suivi d'un chiffre entre 0 et 5 suivi de trois chiffres supplémentaires
    //OU commencer par 97 suivi d'un chiffre entre 1 et 8 suivi de deux chiffres supplémentaires
    //OU commencer par 98 suivi d'un chiffre entre 0 et 4 ou 6 à 9 suivi de deux chiffres supplémentaires
    zipcode : Joi.string().pattern(/^0[1-9]\d{3}$|^[1-8]\d{4}$|^9[0-5]\d{3}$|^97[1-8]\d{2}$|^98[046-9]\d{2}$/),
    city : Joi.string(),
    //le téléphone doit commencer par 0 ou +33 suivi d'un chiffre entre 1 et 9, suivi de 8 chiffres supplémentaires,avec éventuellement des espaces ou des tirets entre les chiffres.
    phone : Joi.string().pattern(/^(0|\+33)[ -]?[1-9]([ -]?[0-9]){8}$/),
    facebook : Joi.string(),
    insta : Joi.string(),
    twitter : Joi.string(),
    youtube : Joi.string(),
    //le rôle 1 correspond à l'artiste
    role_id : Joi.number().required()
});

export const updateArtistSchema = Joi.object({
    path: Joi.string(),
    lastname : Joi.string().max(50),
    firstname : Joi.string().max(50),
    email : Joi.string().pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    password : Joi.string().pattern(/^[a-zA-Z0-9!?*_%]{8,12}$/),
    birthdate : Joi.date().min('1900-01-01').max('now'),
    biography : Joi.string(),
    type : Joi.string().max(50),
    street_no : Joi.string().max(20),
    street_name : Joi.string().max(100),
    zipcode : Joi.string().pattern(/^0[1-9]\d{3}$|^[1-8]\d{4}$|^9[0-5]\d{3}$|^97[1-8]\d{2}$|^98[046-9]\d{2}$/),
    city : Joi.string().max(50),
    phone : Joi.string().pattern(/^(0|\+33)[ -]?[1-9]([ -]?[0-9]){8}$/),
    facebook : Joi.string().uri(),
    insta : Joi.string(),
    twitter : Joi.string(),
    youtube : Joi.string()
})