-- Suppression de l'existant
DROP DATABASE IF EXISTS developart;
DROP ROLE IF EXISTS admin_developart;
DROP ROLE IF EXISTS api_developart;

-- Création du compte qui va utiliser la BDD
CREATE USER admin_developart WITH PASSWORD 'ib8jbz33';
CREATE USER api_developart WITH PASSWORD 'api_developart';

-- Création de la BDD
CREATE DATABASE developart OWNER admin_developart;
