-- Création des tables
BEGIN;

DROP TABLE IF EXISTS "artwork", "category", "artist", "artist_details", "configuration", "artwork_has_category", "role";

-- Le mot de passe doit contenir :
-- au moins une lettre minuscule [a-z]
-- au moins une lettre majuscule [A-Z]
-- au moins un chiffre [\d]
-- au moins un caractère spécial [ascii]
-- entre 8 et 72 caractères ( pour le hash ) {8,72}
CREATE DOMAIN domain_password AS text
CHECK(
    VALUE ~ '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\x00-\x7F])[A-Za-z\d\x00-\x7F]{8,72}$' 
);

CREATE DOMAIN domain_birthdate AS date
CHECK(
    VALUE>= '1900-01-01' AND VALUE <= now()
);

CREATE DOMAIN domain_mail AS text
CHECK(
    VALUE ~ '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
);

-- Ajout de contrainte de vérification pour respecter les règles des codes postaux français
CREATE DOMAIN domain_zipcode AS text
CHECK(
    VALUE ~ '^0[1-9]\d{3}$' -- code postaux (métropole) de 01 à 09
    OR VALUE ~ '^[1-8]\d{4}$' -- code postaux (métropole) de 10 à 89
    OR VALUE ~ '^9[0-5]\d{3}$' -- code postaux (métropole) de 90 à 95
    OR VALUE ~ '^97[1-8]\d{2}$' -- DOM
    OR VALUE ~ '^98[046-9]\d{2}$' -- TOM + monaco
);

-- Ajout de contrainte de vérification pour respecter les règles de numéro de téléphone français
CREATE DOMAIN domain_phone AS text
CHECK(
    VALUE ~ '^(0|\+33)[ -]?[1-9]([ -]?[0-9]){8}$'
);

-- Table: role
CREATE TABLE role
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Table: artist
CREATE TABLE artist
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    path text NOT NULL,
    lastname text NOT NULL,
    firstname text NOT NULL,
    email domain_mail NOT NULL UNIQUE,
    password domain_password NOT NULL,
    biography text,
    role_id int REFERENCES role(id) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Table artist_details
CREATE TABLE artist_details
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    birthdate domain_birthdate,
    type text NOT NULL,
    street_no text,
    street_name text,
    zipcode domain_zipcode,
    city text,
    phone domain_phone,
    facebook text,
    insta text,
    twitter text,
    youtube text,
    artist_id int REFERENCES artist(id) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Table: configuration
CREATE TABLE configuration
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    font_type text DEFAULT 'Impact',
    background_color text DEFAULT '#2DE31E',
    background_color_nav text DEFAULT '#000000',
    cursor text DEFAULT 'default',
    font_color text DEFAULT '#FFFFFF',
    layout integer DEFAULT 1,
    banner text DEFAULT '#000000',
    logo text DEFAULT 'Develop''Art',
    facebook_flag boolean DEFAULT false,
    insta_flag boolean DEFAULT false,
    twitter_flag boolean DEFAULT false,
    youtube_flag boolean DEFAULT false,
    artist_id int REFERENCES artist(id) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Table: artwork
CREATE TABLE artwork
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    description text,
    production_year date,
    technique text,
    width integer,
    height integer,
    media text,
    framing boolean,
    quote text,
    path text NOT NULL,
    orientation text,
    "position" integer NOT NULL,
    homepage_flag boolean NOT NULL,
    artist_id int REFERENCES artist(id) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Table: category
CREATE TABLE category
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    description text,
    color text NOT NULL,
    artist_id int NOT NULL REFERENCES artist(id),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Table: artwork_has_category
CREATE TABLE artwork_has_category
(
    artwork_id int NOT NULL REFERENCES artwork(id) ON DELETE CASCADE,
    category_id int NOT NULL REFERENCES category(id) ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

COMMIT;