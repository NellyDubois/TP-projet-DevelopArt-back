//on utilise pool pour se connecter à la BDD postgreSQL 
//afin d'éviter les embouteillages éventuels de requêtes avec client

//Récupération du module pg
import pkg from 'pg';

// import de la classe "Pool" du module "pg" et assignation à la variable "Pool". 
//cette déstructuration permet d'utiliser directement la classe "Pool" sans avoir à utiliser "pkg.Pool" à chaque fois.
const {Pool} = pkg;

// Création d'une instance de pool
const pool = new Pool({
    connectionString: process.env.PG_URL
    });

// Connexion à la base de données via le pool
pool.connect();

// Export de l'instance de pool pour une utilisation ultérieure
export default pool;