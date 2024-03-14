//Configuration du module npm Winston pour la journalisation des logs

// Import des modules nécessaires depuis Winston
import { addColors, format as _format, transports as _transports, createLogger } from 'winston';

// Définition des niveaux de gravité des logs et de leur ordre
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Fonction pour déterminer le niveau de log en fonction de l'environnement (développement ou production)
const level = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return isDevelopment ? 'debug' : 'http';
};

// Définition des couleurs associées à chaque niveau de log
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'blue',
  debug: 'white',
};

// Ajout des couleurs définies aux niveaux de log
addColors(colors);

// Définition du format des logs
const format = _format.combine(
  _format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss:ms' }), // Ajoute un timestamp au format spécifié
  _format.colorize({ all: true }), // Colorise les logs selon leur niveau
  _format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`), // Formatage du message de log
);

// Définition des transports pour l'enregistrement des logs
const transports = [
  // new winston.transports.Console(),
  new _transports.File({
    filename: 'app/logs/all.log', // Enregistre tous les logs dans ce fichier
  }),
  new _transports.File({
    filename: 'app/logs/error.log', // Enregistre les logs d'erreur dans ce fichier
        level: 'error', // Spécifie le niveau de gravité pour ce transport
  }),

];

// Création du logger avec la configuration définie
const logger = createLogger({
  level: level(), // Niveau de gravité global des logs
  levels, // Niveaux de gravité définis
  format, // Format des logs
  transports, // Transports pour l'enregistrement des logs
});

export default logger;