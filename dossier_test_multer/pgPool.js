// Récupération du module pg
const { Pool } = require('pg');

// Création d'une instance de pool
const pool = new Pool();

// Connexion à la base de données via le pool
pool.connect();

// Export de l'instance de pool pour une utilisation ultérieure
module.exports = pool;