import pool from "../service/pgPool.js";

/**
 * Fonction générique qui exécute une requête SQL et retourne toutes les lignes résultantes.
 * @param {string} sqlQuery - Requête SQL à exécuter.
 * @param {array} values - Valeurs à injecter dans la requête SQL.
 * @returns {object} - Résultats (result) de la requête ou error.
 */
export async function executeRequest(sqlQuery,values){
    let result;
    let error;

    try{ // Exécution de la requête SQL avec les valeurs et récupération des résultats dans result
        const response = await pool.query(sqlQuery,values);
        result = response.rows;
    }
    catch(err){ // Capture les erreurs survenues lors de l'exécution de la requête
        error = err;
    }

    console.log("result execute",result)
    return {result,error};
}

/**
 * Fonction générique qui exécute une requête SQL et retourne uniquement la première ligne de résultats.
 * @param {string} sqlQuery - Requête SQL à exécuter.
 * @param {array} values - Valeurs à injecter dans la requête SQL.
 * @returns {object} - Première ligne de résultat de la requête (result) ou une erreur.
 */
export async function executeRequestWithSingleResult(sqlQuery,values){
    let result;
    let error;

    try{
        const response = await pool.query(sqlQuery,values);
        result = response.rows[0];
    }
    catch(err){
        error = err;
    }

    return {result,error};
}