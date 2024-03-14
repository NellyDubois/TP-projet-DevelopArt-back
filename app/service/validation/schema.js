import Joi from 'joi';

// le mot de passe doit avoir une longueur entre 8 et 12 caractères, et qu'il contient au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial parmi @$!%*?&
export const signinSchema =  Joi.object({
    email: Joi.string().pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/)
}).required().length(2);

export const signupShema =  Joi.object({
    path : Joi.string().required(),
    lastname : Joi.string().required(),
    firstname : Joi.string().required(),
    email : Joi.string().pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
    password : Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/).required(),
    birthdate : Joi.date().min('1900-01-01').max('now').required(),
    biography : Joi.string(),
    type : Joi.string(),
    street_no : Joi.string(),
    street_name : Joi.string(),
    zipcode : Joi.string().pattern(/^0[1-9]\d{3}$|^[1-8]\d{4}$|^9[0-5]\d{3}$|^97[1-8]\d{2}$|^98[046-9]\d{2}$/),
    city : Joi.string(),
    phone : Joi.string().pattern(/^(0|\+33)[ -]?[1-9]([ -]?[0-9]){8}$/),
    facebook : Joi.string(),
    insta : Joi.string(),
    twitter : Joi.string(),
    youtube : Joi.string()
}).required();

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