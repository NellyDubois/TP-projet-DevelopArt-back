//!test KO car Error: SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string


import { executeRequestWithSingleResult } from "../utils/pgUtils.js";
import pool from "../service/pgPool.js";

async function getUser(id){
    //get_user est une fonction
    const sqlQuery = "SELECT * FROM get_user_with_details($1);";
    const values = [id];
    const response = await pool.query(sqlQuery,values);
    result = response.rows[0];
};

getUser(1);