-- Fonctions SQL: créer une nouvelle fonction dans la base de données ou remplacer une fonction existante si elle a le même nom.
-- l'utilisation de fonctions SQL offre une manière structurée, sécurisée et optimisée de gérer la logique métier dans une base de données PostgreSQL.


BEGIN;

-- Cette fonction plpgsql recherche un utilisateur dans la table "artist" en fonction de son adresse e-mail.
-- Si l'utilisateur est trouvé, ses données sont renvoyées au format JSON.
-- Sinon, la fonction renvoie NULL.
CREATE OR REPLACE FUNCTION check_user(u json) RETURNS json AS $$
DECLARE
	-- Déclaration des variables
	user_found json;
BEGIN
	-- Construction de l'objet JSON à partir des données de l'utilisateur trouvé
    -- par exemple 'id' est le nom de la clé dans l'objet JSON
    -- et id est valeur de la colonne "id" dans la table de base de données
	SELECT json_build_object(
        'id',id,
        'path', path,
        'lastname', lastname,
        'firstname', firstname,
        'email', email,
        'password', password,
        'biography', biography,
        'role_id', role_id
	) INTO user_found
	FROM "artist"
	WHERE email = u->>'email';
    --recherche des enregistrements où la valeur de la colonne "email" dans la table correspond à la valeur de la clé "email" dans l'objet JSON passé en tant que premier paramètre de la requête.
	
	-- Vérifier si un utilisateur a été trouvé
	IF user_found IS NOT NULL THEN
		-- Retourner les données de l'utilisateur
		RETURN user_found;
	ELSE
		-- Retourner null si aucun utilisateur n'a été trouvé
		RETURN null;
	END IF;
END;
--Cela indique que la fonction est écrite en langage PL/pgSQL qui est une extension de PostgreSQL qui permet d'écrire des fonctions stockées avec des fonctionnalités avancées telles que des boucles, des conditions, des transactions, etc. 
-- Lorsqu'une fonction est définie avec SECURITY DEFINER, elle est exécutée avec les privilèges de son propriétaire plutôt qu'avec ceux de l'utilisateur qui l'appelle. Cela peut être utile pour accorder des privilèges spécifiques à des utilisateurs sans leur donner directement accès à certaines tables ou fonctions sensibles.
$$ LANGUAGE plpgsql SECURITY DEFINER;



-- Cette fonction SQL insère un nouvel utilisateur dans la table "artist" avec les données fournies au format JSON.
-- Elle retourne les données de l'utilisateur nouvellement ajouté.
-- u est le nom du paramètre de la fonction qui doit être de type json
CREATE OR REPLACE FUNCTION add_user(u json) RETURNS artist AS $$
DECLARE
    new_artist artist;
BEGIN
    -- Insertion dans la table "artist"
    INSERT INTO "artist"
    (path, lastname, firstname, email, password, biography, role_id, created_at)
    VALUES
    (
        u->>'path',
        u->>'lastname',
        u->>'firstname',
        u->>'email',
        u->>'password',
        u->>'biography',
        (u->>'role_id')::integer,
        NOW() -- Ajout de la date et heure actuelles
    )
    RETURNING * INTO new_artist;

    -- Insertion dans la table "artist_details"
    INSERT INTO "artist_details"
    (birthdate, type, street_no, street_name, zipcode, city, phone, facebook, insta, twitter, youtube, artist_id, created_at)
    VALUES
    (
        (u->>'birthdate')::date,
        u->>'type',
        u->>'street_no',
        u->>'street_name',
        u->>'zipcode',
        u->>'city',
        u->>'phone',
        u->>'facebook',
        u->>'insta',
        u->>'twitter',
        u->>'youtube',
        new_artist.id,
        NOW() -- Ajout de la date et heure actuelles
    )
    ;
 -- Sélection des données de l'artiste avec les détails
    -- SELECT a.*, ad.*
    -- INTO new_artist2
    -- FROM "artist" a
    -- INNER JOIN "artist_details" ad ON a.id = ad.artist_id
    -- WHERE a.id = new_artist.id;
    
    RETURN new_artist;
    
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Cette fonction SQL récupère un utilisateur de la table "artist" en fonction de son ID.
CREATE OR REPLACE FUNCTION get_user(artist_id int) RETURNS "artist" AS $$
	SELECT * FROM "artist" WHERE id=artist_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- Récupération de toutes les informations d'un artiste ( table artist et artist_details ) par son id
CREATE OR REPLACE FUNCTION get_artist_by_id(int) RETURNS table 
(
    artistid int, 
    path text, 
    lastname text, 
    firstname text, 
    email text, 
    password text, 
    biography text, 
    role_id int, 
    created_at timestamptz, 
    updated_at timestamptz, 
    artist_detailsid int, 
    birthdate date, 
    type text, 
    street_no text, 
    street_name name, 
    zipcode text, 
    city text, 
    phone text, 
    facebook text, 
    insta text, 
    twitter text, 
    youtube text, 
    artist_id int, 
    created_atdetails timestamptz, 
    updated_atdetails timestamptz
) AS $$
    SELECT * FROM artist
    LEFT JOIN artist_details on artist.id = artist_details.id
    WHERE artist.id = $1
$$ LANGUAGE sql SECURITY DEFINER;

-- Modification des informations d'un artiste dans la table artist et la table artist_details
-- La fonction COALESCE est utilisée pour chaque colonne mise à jour. Elle prend comme arguments la nouvelle valeur fournie dans la requête (par exemple, path_param) et la valeur existante dans la base de données (par exemple, "path"). Si la nouvelle valeur est nulle, la fonction COALESCE renvoie la valeur existante, sinon elle renvoie la nouvelle valeur.
CREATE OR REPLACE FUNCTION update_artist(
    artist_id_param int,
    path_param text,
    lastname_param text,
    firstname_param text,
    email_param text,
    password_param text,
    biography_param text,
    birthdate_param date,
    type_param text,
    street_no_param text,
    street_name_param text,
    zipcode_param text,
    city_param text,
    phone_param text,
    facebook_param text,
    insta_param text,
    twitter_param text,
    youtube_param text
) 
RETURNS json AS $$
DECLARE 
    updated_artist json;
    updated_artist_id int;
BEGIN
    -- Mise à jour des informations dans la table artist
    UPDATE artist 
    SET 
        "path" = COALESCE(path_param, "path"),
        "lastname" = COALESCE(lastname_param, "lastname"),
        "firstname" = COALESCE(firstname_param, "firstname"),
        "email" = COALESCE(email_param, "email"),
        "password" = COALESCE(password_param, "password"),
        "biography" = COALESCE(biography_param, "biography"),
        "updated_at" = NOW()  -- Ajout de la date et de l'heure actuelles
    WHERE 
        artist.id = artist_id_param
    RETURNING 
        artist.id INTO updated_artist_id;
    
    -- Mise à jour des informations dans la table artist_details
    UPDATE artist_details 
    SET 
        "birthdate" = COALESCE(birthdate_param, "birthdate"),
        "type" = COALESCE(type_param, "type"),
        "street_no" = COALESCE(street_no_param, "street_no"),
        "street_name" = COALESCE(street_name_param, "street_name"),
        "zipcode" = COALESCE(zipcode_param, "zipcode"),
        "city" = COALESCE(city_param, "city"),
        "phone" = COALESCE(phone_param, "phone"),
        "facebook" = COALESCE(facebook_param, "facebook"),
        "insta" = COALESCE(insta_param, "insta"),
        "twitter" = COALESCE(twitter_param, "twitter"),
        "youtube" = COALESCE(youtube_param, "youtube"),
        "updated_at" = NOW()  -- Ajout de la date et de l'heure actuelles
    WHERE 
        artist_details.artist_id = updated_artist_id;
    
    -- Renvoie les données mises à jour de la table artist
    SELECT 
        json_build_object(
            'id', a.id,
            'path', a.path,
            'lastname', a.lastname,
            'firstname', a.firstname,
            'email', a.email,
            'password', a.password,
            'biography', a.biography,
            'birthdate', ad.birthdate,
            'type', ad.type,
            'street_no', ad.street_no,
            'street_name', ad.street_name,
            'zipcode', ad.zipcode,
            'city', ad.city,
            'phone', ad.phone,
            'facebook', ad.facebook,
            'insta', ad.insta,
            'twitter', ad.twitter,
            'youtube', ad.youtube,
            'updated_at', NOW()  -- Ajout de la date et de l'heure actuelles
        )
    INTO 
        updated_artist
    FROM 
        artist a
    FULL JOIN 
        artist_details ad ON a.id = ad.artist_id
    WHERE 
        a.id = updated_artist_id;
    
    RETURN updated_artist;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Récupération de toutes les oeuvres d'un artiste par l'id de l'artiste--> passer par la route categories/oeuvres qui retourne toutes les oeuvres avec toutes les catégories
CREATE OR REPLACE FUNCTION get_artworks_by_artist_id(artist_id_param int) 
RETURNS TABLE (
    id int,
    name text,
    description text,
    production_year date,
    technique text,
    width int,
    height int,
    media text,
    framing boolean,
    quote text,
    path text,
    orientation text,
    "position" int,
    homepage_flag boolean,
    artist_id int,
    updated_at TIMESTAMPTZ,
    categories text[]
) AS $$
BEGIN
    RETURN QUERY 
    SELECT 
        a.id,
        a.name,
        a.description,
        a.production_year,
        a.technique,
        a.width,
        a.height,
        a.media,
        a.framing,
        a.quote,
        a.path,
        a.orientation,
        a.position,
        a.homepage_flag,
        a.artist_id,
        a.updated_at,,
        array_agg(c.name) AS categories
    FROM artwork a
    LEFT JOIN artwork_has_category ahc ON a.id = ahc.artwork_id
    LEFT JOIN category c ON ahc.category_id = c.id
    WHERE a.artist_id = artist_id_param 
    GROUP BY a.id, a.name, a.description, a.production_year, a.technique, a.width, a.height, a.media, a.framing, a.quote, a.path, a.orientation, a.position, a.homepage_flag, a.artist_id, a.updated_at
    ORDER BY a.position;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --sans les catégories
-- CREATE OR REPLACE FUNCTION get_artworks_for_home_page(artist_id_param int)      
-- RETURNS TABLE (
--     id int,
--     name text,
--     description text,
--     production_year date,
--     technique text,
--     width int,
--     height int,
--     media text,
--     framing boolean,
--     quote text,
--     path text,
--     orientation text,
--     "position" int,
--     homepage_flag boolean,
--     artist_id int,
--     updated_at TIMESTAMPTZ
-- ) AS $$
-- BEGIN
--     RETURN QUERY 
--     SELECT 
--         a.id,
--         a.name,
--         a.description,
--         a.production_year,
--         a.technique,
--         a.width,
--         a.height,
--         a.media,
--         a.framing,
--         a.quote,
--         a.path,
--         a.orientation,
--         a.position,
--         a.homepage_flag,
--         a.artist_id,
--         a.updated_at
--     FROM artwork a
--     JOIN artist_details ad ON a.artist_id = ad.artist_id
--     WHERE a.artist_id = artist_id_param AND a.homepage_flag = true
--     ORDER BY a.position
--     LIMIT 3;
-- END;    
-- $$ LANGUAGE plpgsql SECURITY DEFINER;

--Récupération des 3 oeuvres pour la HP avec leur catégories
--tri sur position et homepage_flag
CREATE OR REPLACE FUNCTION get_artworks_for_home_page(artist_id_param int)      
RETURNS TABLE (
    id int,
    name text,
    description text,
    production_year date,
    technique text,
    width int,
    height int,
    media text,
    framing boolean,
    quote text,
    path text,
    orientation text,
    "position" int,
    homepage_flag boolean,
    artist_id int,
    updated_at TIMESTAMPTZ,
    categories text[]
) AS $$
BEGIN
    RETURN QUERY 
    SELECT 
        a.id,
        a.name,x
        a.description,
        a.production_year,
        a.technique,
        a.width,
        a.height,
        a.media,
        a.framing,
        a.quote,
        a.path,
        a.orientation,
        a.position,
        a.homepage_flag,
        a.artist_id,
        a.updated_at,
        array_agg(c.name) AS categories
    FROM artwork a
    LEFT JOIN artwork_has_category ahc ON a.id = ahc.artwork_id
    LEFT JOIN category c ON ahc.category_id = c.id
    WHERE a.artist_id = artist_id_param AND a.homepage_flag = true
    GROUP BY a.id, a.name, a.description, a.production_year, a.technique, a.width, a.height, a.media, a.framing, a.quote, a.path, a.orientation, a.position, a.homepage_flag, a.artist_id, a.updated_at
    ORDER BY a.position
    LIMIT 3;
END;    
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Création du type artwork_with_categories pour récupérer des détails de l'oeuvre avec les catégories

CREATE TYPE artwork_with_categories AS (
    id int,
     name text,
     description text,
     production_year date,
     technique text,
     width int,
     height int,
     media text,
     framing boolean,
     quote text,
     path text,
     orientation text,
     "position" int,
     homepage_flag boolean,
     artist_id int,
    categories text[]
);

-- Récupération des détails d'une oeuvre avec ses catégories
CREATE OR REPLACE FUNCTION get_artwork_by_artist_and_id(artist_id_param int, artwork_id_param int)
RETURNS artwork_with_categories AS $$
DECLARE
    artwork_found artwork_with_categories;
BEGIN
    SELECT  a.id,
         a.name,
         a.description,
         a.production_year,
         a.technique,
         a.width,
         a.height,
         a.media,
         a.framing,
         a.quote,
         a.path,
         a.orientation,
         a.position,
         a.homepage_flag,
         a.artist_id	
	INTO artwork_found FROM artwork a WHERE a.artist_id = artist_id_param AND a.id = artwork_id_param;
    SELECT array_agg(c.name) INTO artwork_found.categories
    FROM category c
    JOIN artwork_has_category ac ON c.id = ac.category_id
    WHERE ac.artwork_id = artwork_id_param;
    -- Retour de l'oeuvre avec ses catégories
    RETURN artwork_found;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- --version sans categories
-- CREATE OR REPLACE FUNCTION get_artwork_by_artist_and_id(artist_id_param int, artwork_id_param int) 
-- RETURNS TABLE (
--     id int,
--     name text,
--     description text,
--     production_year date,
--     technique text,
--     width int,
--     height int,
--     media text,
--     framing boolean,
--     quote text,
--     path text,
--     orientation text,
--     "position" int,
--     homepage_flag boolean,
--     artist_id int
-- ) AS $$
-- BEGIN
--     RETURN QUERY 
--     SELECT 
--         a.id,
--         a.name,
--         a.description,
--         a.production_year,
--         a.technique,
--         a.width,
--         a.height,
--         a.media,
--         a.framing,
--         a.quote,
--         a.path,
--         a.orientation,
--         a.position,
--         a.homepage_flag,
--         a.artist_id
--     FROM artwork a
--     WHERE a.artist_id = artist_id_param AND a.id = artwork_id_param;
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;


--ajouter une oeuvre à la liste des oeuvres de l'artiste artist_id + ajout des données catégories
-- CREATE OR REPLACE FUNCTION add_artwork_by_artist_id(artist_id_param INT, artwork_name_param TEXT, description_param TEXT, production_year_param DATE, technique_param TEXT, width_param INT, height_param INT, media_param TEXT, framing_param BOOLEAN, quote_param TEXT, path_param TEXT, orientation_param TEXT, position_param INT, homepage_flag_param BOOLEAN,category_name TEXT) 
-- RETURNS artwork AS $$
-- DECLARE
--     new_artwork artwork;
-- BEGIN
--     -- Insertion des données dans la table "artwork" et récupération de la ligne ajoutée
--     INSERT INTO artwork (name, description, production_year, technique, width, height, media, framing, quote, path, orientation, position, homepage_flag, artist_id)
--     VALUES (artwork_name_param, description_param, production_year_param, technique_param, width_param, height_param, media_param, framing_param, quote_param, path_param, orientation_param, position_param, homepage_flag_param, artist_id_param)
--     RETURNING * INTO new_artwork;

--     -- Mise à jour du champ updated_at et created_at avec la date et l'heure actuelles
--     UPDATE artwork SET updated_at = NOW() WHERE id = new_artwork.id;
--     UPDATE artwork SET created_at = NOW() WHERE id = new_artwork.id;
    
--     -- Retour de la ligne ajoutée
--     RETURN new_artwork;
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;


-- CREATE OR REPLACE FUNCTION add_artwork_by_artist_id(
--     artist_id_param INT, 
--     artwork_name_param TEXT, 
--     description_param TEXT, 
--     production_year_param DATE, 
--     technique_param TEXT, 
--     width_param INT, 
--     height_param INT, 
--     media_param TEXT, 
--     framing_param BOOLEAN, 
--     quote_param TEXT, 
--     path_param TEXT, 
--     orientation_param TEXT, 
--     position_param INT, 
--     homepage_flag_param BOOLEAN,
--     category_name_param TEXT
-- ) 
-- RETURNS artwork AS $$
-- DECLARE
--     new_artwork artwork;
--     category_id INTEGER;
-- BEGIN
--     -- Insertion des données dans la table "artwork" et récupération de l'œuvre ajoutée
--     INSERT INTO artwork (name, description, production_year, technique, width, height, media, framing, quote, path, orientation, position, homepage_flag, artist_id, created_at, updated_at)
--     VALUES (
--         artwork_name_param, 
--         description_param, 
--         production_year_param, 
--         technique_param, 
--         width_param, 
--         height_param, 
--         media_param, 
--         framing_param, 
--         quote_param, 
--         path_param, 
--         orientation_param, 
--         position_param, 
--         homepage_flag_param, 
--         artist_id_param, 
--         NOW(), 
--         NOW()
--     )
--     RETURNING * INTO new_artwork;

--     -- Récupération de l'ID de la catégorie
--     SELECT id INTO category_id FROM category WHERE name = category_name_param;

--     -- Insertion des données dans la table "artwork_has_category"
--     INSERT INTO artwork_has_category (artwork_id, category_id, created_at, updated_at)
--     VALUES (new_artwork.id, category_id, NOW(), NOW());

--     -- Retour de l'œuvre ajoutée
--     RETURN new_artwork;
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;

--même fonction qu'au-dessus mais avec un tableau de catégories
-- CREATE OR REPLACE FUNCTION add_artwork_by_artist_id(
--     artist_id_param INT, 
--     artwork_name_param TEXT, 
--     description_param TEXT, 
--     production_year_param DATE, 
--     technique_param TEXT, 
--     width_param INT, 
--     height_param INT, 
--     media_param TEXT, 
--     framing_param BOOLEAN, 
--     quote_param TEXT, 
--     path_param TEXT, 
--     orientation_param TEXT, 
--     position_param INT, 
--     homepage_flag_param BOOLEAN,
--     category_names TEXT[]
-- ) 
-- RETURNS artwork AS $$
-- DECLARE
--     new_artwork artwork;
--     category_id INTEGER;
-- 	category_name TEXT;
    
-- BEGIN
--     -- Insertion des données dans la table "artwork" et récupération de l'œuvre ajoutée
--     INSERT INTO artwork (name, description, production_year, technique, width, height, media, framing, quote, path, orientation, position, homepage_flag, artist_id, created_at, updated_at)
--     VALUES (
--         artwork_name_param, 
--         description_param, 
--         production_year_param, 
--         technique_param, 
--         width_param, 
--         height_param, 
--         media_param, 
--         framing_param, 
--         quote_param, 
--         path_param, 
--         orientation_param, 
--         position_param, 
--         homepage_flag_param, 
--         artist_id_param, 
--         NOW(), 
--         NOW()
--     )
--     RETURNING * INTO new_artwork;

--     -- Insertion des données dans la table "artwork_has_category" pour chaque catégorie fournie
--     FOREACH category_name IN ARRAY category_names LOOP
--         -- Récupération de l'ID de la catégorie
--         SELECT id INTO category_id FROM category WHERE name = category_name;

--         -- Vérifiez si l'ID de la catégorie est valide
--         IF category_id IS NOT NULL THEN
--             -- Insertion des données dans la table "artwork_has_category"
--             INSERT INTO artwork_has_category (artwork_id, category_id, created_at, updated_at)
--             VALUES (new_artwork.id, category_id, NOW(), NOW());
--         END IF;
--     END LOOP;

--     -- Retour de l'œuvre ajoutée
--     RETURN new_artwork;
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;


--même fonction qu'au-dessus mais avec une liste de catégories en chaîne de caractères: fonction OK
-- CREATE OR REPLACE FUNCTION add_artwork_by_artist_id(
--     artist_id_param INT, 
--     artwork_name_param TEXT, 
--     description_param TEXT, 
--     production_year_param DATE, 
--     technique_param TEXT, 
--     width_param INT, 
--     height_param INT, 
--     media_param TEXT, 
--     framing_param BOOLEAN, 
--     quote_param TEXT, 
--     path_param TEXT, 
--     orientation_param TEXT, 
--     position_param INT, 
--     homepage_flag_param BOOLEAN,
--     category_names TEXT
-- ) 
-- RETURNS artwork AS $$
-- DECLARE
--     new_artwork artwork;
--     category_id INTEGER;
--     category_name TEXT;
-- BEGIN
--     -- Insertion des données dans la table "artwork" et récupération de l'œuvre ajoutée
--     INSERT INTO artwork (name, description, production_year, technique, width, height, media, framing, quote, path, orientation, position, homepage_flag, artist_id, created_at, updated_at)
--     VALUES (
--         artwork_name_param, 
--         description_param, 
--         production_year_param, 
--         technique_param, 
--         width_param, 
--         height_param, 
--         media_param, 
--         framing_param, 
--         quote_param, 
--         path_param, 
--         orientation_param, 
--         position_param, 
--         homepage_flag_param, 
--         artist_id_param, 
--         NOW(), 
--         NOW()
--     )
--     RETURNING * INTO new_artwork;

--     -- Insertion des données dans la table "artwork_has_category" pour chaque catégorie fournie
--     FOREACH category_name IN ARRAY string_to_array(category_names, ',') LOOP
--         -- Récupération de l'ID de la catégorie
--         SELECT id INTO category_id FROM category WHERE name = category_name;

--         -- Vérifiez si l'ID de la catégorie est valide
--         IF category_id IS NOT NULL THEN
--             -- Insertion des données dans la table "artwork_has_category"
--             INSERT INTO artwork_has_category (artwork_id, category_id, created_at, updated_at)
--             VALUES (new_artwork.id, category_id, NOW(), NOW());
--         END IF;
--     END LOOP;

--     -- Retour de l'œuvre ajoutée
--     RETURN new_artwork;
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;

--même fonction qu'au-dessus en récup les catégories en plus de l'oeuvre
-- Fonction pour ajouter une nouvelle œuvre d'art à la liste des œuvres d'un artiste
-- si categories est null, retourne l'objet JSON sans ajouter de catégories
-- sinon, ajoute les catégories à l'objet JSON de l'oeuvre d'art
CREATE OR REPLACE FUNCTION add_artwork_by_artist_id(
    artist_id_param INT, 
    artwork_name_param TEXT, 
    description_param TEXT, 
    production_year_param DATE, 
    technique_param TEXT, 
    width_param INT, 
    height_param INT, 
    media_param TEXT, 
    framing_param BOOLEAN, 
    quote_param TEXT, 
    path_param TEXT, 
    orientation_param TEXT, 
    position_param INT, 
    homepage_flag_param BOOLEAN,
    category_names TEXT
) 
RETURNS JSON AS $$
DECLARE
    new_artwork_json JSON;
    category_names_array TEXT[];
    category_id INTEGER;
    category_name TEXT;
    new_artwork_id INTEGER;
BEGIN
    -- Insertion des données dans la table "artwork" et récupération de l'œuvre ajoutée
    INSERT INTO artwork (name, description, production_year, technique, width, height, media, framing, quote, path, orientation, position, homepage_flag, artist_id, created_at, updated_at)
    VALUES (
        artwork_name_param, 
        description_param, 
        production_year_param, 
        technique_param, 
        width_param, 
        height_param, 
        media_param, 
        framing_param, 
        quote_param, 
        path_param, 
        orientation_param, 
        position_param, 
        homepage_flag_param, 
        artist_id_param, 
        NOW(), 
        NOW()
    )
    RETURNING id INTO new_artwork_id;

    -- Construire l'objet JSON représentant la nouvelle œuvre d'art
    SELECT json_build_object(
        'id', new_artwork_id,
        'name', artwork_name_param,
        'description', description_param,
        'production_year', production_year_param,
        'technique', technique_param,
        'width', width_param,
        'height', height_param,
        'media', media_param,
        'framing', framing_param,
        'quote', quote_param,
        'path', path_param,
        'orientation', orientation_param,
        'position', position_param,
        'homepage_flag', homepage_flag_param
    ) INTO new_artwork_json;

    -- Si category_names est null, retourner simplement l'objet JSON sans ajouter de catégories
    IF category_names IS NOT NULL THEN
        -- Insertion des données dans la table "artwork_has_category" pour chaque catégorie fournie
        FOREACH category_name IN ARRAY string_to_array(category_names, ',') LOOP
            -- Récupération de l'ID de la catégorie
            SELECT id INTO category_id FROM category WHERE name = category_name;

            -- Vérification si l'ID de la catégorie est valide
            IF category_id IS NOT NULL THEN
                -- Insertion des données dans la table "artwork_has_category"
                INSERT INTO artwork_has_category (artwork_id, category_id, created_at, updated_at)
                VALUES (new_artwork_id, category_id, NOW(), NOW());
                -- Ajout du nom de la catégorie à la liste
                category_names_array := array_append(category_names_array, category_name);
            END IF;
        END LOOP;

        -- Ajout des noms de catégories à l'objet JSON de l'œuvre d'art
        new_artwork_json := jsonb_build_object(
            'id', new_artwork_id,
            'name', artwork_name_param,
            'description', description_param,
            'production_year', production_year_param,
            'technique', technique_param,
            'width', width_param,
            'height', height_param,
            'media', media_param,
            'framing', framing_param,
            'quote', quote_param,
            'path', path_param,
            'orientation', orientation_param,
            'position', position_param,
            'homepage_flag', homepage_flag_param,
            'category_names', category_names_array
        );
    END IF;

    -- Retour de l'objet JSON contenant toutes les informations sur la nouvelle œuvre d'art
    RETURN new_artwork_json;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- pour modifier une oeuvre par son artiste et son id: fonction OK sans les catégories
-- CREATE OR REPLACE FUNCTION modify_artwork_by_artist_id(artist_id_param INT, artwork_id_param INT, artwork_name_param TEXT, description_param TEXT, production_year_param DATE, technique_param TEXT, width_param INT, height_param INT, media_param TEXT, framing_param BOOLEAN, quote_param TEXT, path_param TEXT, orientation_param TEXT, position_param INT, homepage_flag_param BOOLEAN) 
-- RETURNS artwork AS $$
-- DECLARE
--     updated_artwork artwork;
-- BEGIN
--      -- Modification des données dans la table "artwork" et récupération de la ligne modifiée
--     UPDATE artwork
--     SET 
--         name = COALESCE(artwork_name_param, name),
--         description = COALESCE(description_param, description),
--         production_year = COALESCE(production_year_param, production_year),
--         technique = COALESCE(technique_param, technique),
--         width = COALESCE(width_param, width),
--         height = COALESCE(height_param, height),
--         media = COALESCE(media_param, media),
--         framing = COALESCE(framing_param, framing),
--         quote = COALESCE(quote_param, quote),
--         path = COALESCE(path_param, path),
--         orientation = COALESCE(orientation_param, orientation),
--         position = COALESCE(position_param, position),
--         homepage_flag = COALESCE(homepage_flag_param, homepage_flag),
--         updated_at = NOW()  -- Ajout de la date et de l'heure actuelles
--     WHERE 
--         artist_id = artist_id_param
--         AND id = artwork_id_param
--         RETURNING * INTO updated_artwork;
    
--     -- Retour de la ligne modifiée
--     RETURN updated_artwork;
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;

--même fonction qu'au-dessus mais avec les catégories
-- Fonction pour modifier une œuvre d'art par son artiste et son ID
CREATE OR REPLACE FUNCTION modify_artwork_by_id_and_artist_id(
    artist_id_param INT, 
    artwork_id_param INT, 
    artwork_name_param TEXT, 
    description_param TEXT, 
    production_year_param DATE, 
    technique_param TEXT, 
    width_param INT, 
    height_param INT, 
    media_param TEXT, 
    framing_param BOOLEAN, 
    quote_param TEXT, 
    path_param TEXT, 
    orientation_param TEXT, 
    position_param INT, 
    homepage_flag_param BOOLEAN,
    category_names TEXT
) 
RETURNS JSON AS $$
DECLARE
    updated_artwork_json JSON;
    category_names_array TEXT[] := '{}'; -- Initialisation de l'array vide
    category_id INTEGER;
    category_name TEXT;
BEGIN
    -- Modification des données dans la table "artwork"
    UPDATE artwork
    SET 
        name = COALESCE(artwork_name_param, name),
        description = COALESCE(description_param, description),
        production_year = COALESCE(production_year_param, production_year),
        technique = COALESCE(technique_param, technique),
        width = COALESCE(width_param, width),
        height = COALESCE(height_param, height),
        media = COALESCE(media_param, media),
        framing = COALESCE(framing_param, framing),
        quote = COALESCE(quote_param, quote),
        path = COALESCE(path_param, path),
        orientation = COALESCE(orientation_param, orientation),
        position = COALESCE(position_param, position),
        homepage_flag = COALESCE(homepage_flag_param, homepage_flag),
        updated_at = NOW()  -- Ajout de la date et de l'heure actuelles
    WHERE 
        artist_id = artist_id_param
        AND id = artwork_id_param;

    -- Suppression des anciennes catégories
    DELETE FROM artwork_has_category WHERE artwork_id = artwork_id_param;

    -- Vérification si category_names est NULL
    IF category_names IS NOT NULL THEN
        -- Insertion des nouvelles catégories
        FOREACH category_name IN ARRAY string_to_array(category_names, ',') LOOP
            -- Récupération de l'ID de la catégorie
            SELECT id INTO category_id FROM category WHERE name = category_name;

            -- Vérification si l'ID de la catégorie est valide
            IF category_id IS NOT NULL THEN
                -- Insertion des données dans la table "artwork_has_category"
                INSERT INTO artwork_has_category (artwork_id, category_id, created_at, updated_at)
                VALUES (artwork_id_param, category_id, NOW(), NOW());
                -- Ajout du nom de la catégorie à la liste
                category_names_array := array_append(category_names_array, category_name);
            END IF;
        END LOOP;
    END IF;

    -- Construction de l'objet JSON représentant l'œuvre d'art modifiée
    SELECT json_build_object(
        'id', artwork_id_param,
        'name', COALESCE(artwork_name_param, name),
        'description', COALESCE(description_param, description),
        'production_year', COALESCE(production_year_param, production_year),
        'technique', COALESCE(technique_param, technique),
        'width', COALESCE(width_param, width),
        'height', COALESCE(height_param, height),
        'media', COALESCE(media_param, media),
        'framing', COALESCE(framing_param, framing),
        'quote', COALESCE(quote_param, quote),
        'path', COALESCE(path_param, path),
        'orientation', COALESCE(orientation_param, orientation),
        'position', COALESCE(position_param, position),
        'homepage_flag', COALESCE(homepage_flag_param, homepage_flag),
        'categories', COALESCE(category_names_array)
    ) INTO updated_artwork_json
    FROM artwork
    WHERE 
        artist_id = artist_id_param
        AND id = artwork_id_param;

    -- Retour de l'objet JSON contenant toutes les informations sur l'œuvre d'art modifiée
    RETURN updated_artwork_json;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


--suppression d'une oeuvre par son id et artist_id --> suppression aussi des lignes associées dans la table artwork_has_category
CREATE OR REPLACE FUNCTION delete_artwork_by_id_and_artist_id(artwork_id_param INT, artist_id_param INT)
RETURNS VOID AS $$
BEGIN
    -- Suppression des catégories associées à l'œuvre d'art dans la table "artwork_has_category"
    DELETE FROM artwork_has_category WHERE artwork_id = artwork_id_param;

    -- Suppression de l'œuvre de la table "artwork"
    DELETE FROM artwork WHERE id = artwork_id_param AND artist_id = artist_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Récupération de la configuration d'artiste artist_id_param
CREATE OR REPLACE FUNCTION get_configuration_by_artist_id(artist_id_param int) 
-- la fonction retournera un tableau de résultats, où chaque ligne contient les colonnes spécifiées dans les parenthèses suivantes
-- Les colonnes spécifiées (id, font_type, background_color, etc.) définissent la structure de chaque ligne de résultat retournée par la fonction.
RETURNS TABLE (
    id int,
    font_type text,
    background_color text,
    background_color_nav text,
    cursor text,
    font_color text,
    layout integer,
    banner text,
    logo text,
    facebook_flag boolean,
    insta_flag boolean,
    twitter_flag boolean,
    youtube_flag boolean,
    artist_id int
) AS $$ 
--debut du bloc de code de la fonction
BEGIN
-- instruction qui indique à la fonction de retourner le résultat de la requête SQL suivante
    RETURN QUERY 
    SELECT 
        configuration.id,
        configuration.font_type,
        configuration.background_color,
        configuration.background_color_nav,
        configuration.cursor,
        configuration.font_color,
        configuration.layout,
        configuration.banner,
        configuration.logo,
        configuration.facebook_flag,
        configuration.insta_flag,
        configuration.twitter_flag,
        configuration.youtube_flag,
        configuration.artist_id
    FROM configuration
    WHERE configuration.artist_id = artist_id_param;
END;--fin du bloc de code de la fonction
$$ LANGUAGE plpgsql SECURITY DEFINER; -- langage procédural de pgsql

-- si les nouveaux paramètres passés à la fonction sont nuls, les valeurs existantes dans la table configuration seront conservées pour ces colonnes.

-- Modification de la configuration d'artiste par son id
CREATE OR REPLACE FUNCTION update_configuration_by_artist_id(
    artist_id_param int, 
    font_type_param text, 
    background_color_param text, 
    background_color_nav_param text,
    cursor_param text, 
    font_color_param text, 
    layout_param integer, 
    banner_param text,
    logo_param text,
    facebook_flag_param boolean, 
    insta_flag_param boolean, 
    twitter_flag_param boolean, 
    youtube_flag_param boolean
) 
RETURNS json AS $$
DECLARE
    updated_configuration json;
BEGIN
    UPDATE configuration
    SET 
        font_type = COALESCE(font_type_param, font_type),
        background_color = COALESCE(background_color_param, background_color),
        background_color_nav= COALESCE(background_color_nav_param, background_color_nav),
        cursor = COALESCE(cursor_param, cursor),
        font_color = COALESCE(font_color_param, font_color),
        layout = COALESCE(layout_param, layout),
        banner = COALESCE(banner_param, banner),
        logo = COALESCE(logo_param, logo),
        facebook_flag = COALESCE(facebook_flag_param, facebook_flag),
        insta_flag = COALESCE(insta_flag_param, insta_flag),
        twitter_flag = COALESCE(twitter_flag_param, twitter_flag),
        youtube_flag = COALESCE(youtube_flag_param, youtube_flag),
        updated_at = NOW() -- Ajout de la date et de l'heure actuelles
    WHERE 
        artist_id = artist_id_param
    RETURNING 
        json_build_object(
            'font_type', font_type,
            'background_color', background_color,
            'background_color_nav', background_color_nav,
            'cursor', cursor,
            'font_color', font_color,
            'layout', layout,
            'banner', banner,
            'logo', logo,
            'facebook_flag', facebook_flag,
            'insta_flag', insta_flag,
            'twitter_flag', twitter_flag,
            'youtube_flag', youtube_flag
        )
    INTO 
        updated_configuration;

    RETURN updated_configuration;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- la fonction est exécutée avec les privilèges du propriétaire de la fonction plutôt que ceux de l'utilisateur qui l'appelle. Cela peut être important pour garantir que seules les personnes autorisées peuvent accéder à certaines données.
-- Récupération de toutes les catégories et leurs oeuvres associées, par l'id de l'artiste
CREATE OR REPLACE FUNCTION get_categories_by_artist_id(int) 
RETURNS TABLE (
	category_id int,
	category_name text,
	category_description text,
	color text,
	id int,
	name text,
	description text,
	production_year date,
	technique text,
	width int,
	height int,
	media text,
	framing boolean, 
	quote text,
	path text,
	orientation text,
	"position" int,
	homepage_flag boolean,
	artist_id int
) AS $$
BEGIN
	RETURN QUERY
	SELECT
		c.id AS category_id,
		c.name AS category_name,
		c.description AS category_description,
		c.color,
		a.id,
		a.name,
		a.description,
		a.production_year,
		a.technique,
		a.width,
        a.height,
        a.media,
        a.framing,
        a.quote,
        a.path,
        a.orientation,
        a.position,
        a.homepage_flag,
        a.artist_id
	FROM artist
	JOIN artwork a on artist.id = a.artist_id
	JOIN artwork_has_category on a.id = artwork_has_category.artwork_id
	JOIN category c on c.id = artwork_has_category.category_id
	WHERE artist.id = $1
    ORDER BY a.position ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Récupération de tous les noms de catégories sans doublon par l'id de l'artiste
DROP FUNCTION get_categories_names_by_artist_id(artist_id_param INT);
CREATE OR REPLACE FUNCTION get_categories_names_by_artist_id(artist_id_param INT) 
RETURNS TABLE (
    id int,
    name text,
    descripton text,
    color text
) AS $$
    BEGIN
        RETURN QUERY
        SELECT 
            c.id,
            c.name,
            c.description,
            c.color
            
        FROM category c
        WHERE c.artist_id = artist_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Récupération d'une catégorie par son id, avec ses oeuvres associées, par l'id de l'artiste
CREATE OR REPLACE FUNCTION get_category_by_artist_id(artist_id_param int, category_id_param int) 
RETURNS TABLE (
	category_id int,
	category_name text,
	category_description text,
	color text,
	id int,
	name text,
	description text,
	production_year date,
	technique text,
	width int,
	height int,
	media text,
	framing boolean, 
	quote text,
	path text,
	orientation text,
	"position" int,
	homepage_flag boolean,
	artist_id int
) AS $$
BEGIN
	RETURN QUERY
	SELECT
		c.id AS category_id,
		c.name AS category_name,
		c.description AS category_description,
		c.color,
		a.id,
		a.name,
		a.description,
		a.production_year,
		a.technique,
		a.width,
        a.height,
        a.media,
        a.framing,
        a.quote,
        a.path,
        a.orientation,
        a.position,
        a.homepage_flag,
        a.artist_id
	FROM artist
	JOIN artwork a on artist.id = a.artist_id
	JOIN artwork_has_category on a.id = artwork_has_category.artwork_id
	JOIN category c on c.id = artwork_has_category.category_id
	WHERE artist.id = artist_id_param AND c.id = category_id_param;
END;

$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Création d'une nouvelle catégorie
CREATE OR REPLACE FUNCTION add_category_by_artist_id(artist_id_param int, category_name text, category_description text, category_color text) 
RETURNS category AS $$
DECLARE
    new_category category;
BEGIN
	INSERT INTO "category" 	(name, description, color, artist_id, created_at)
	VALUES 	(category_name, category_description, category_color, artist_id_param, NOW())
	RETURNING * INTO new_category;
    RETURN new_category;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Modification des informations d'une catégorie
CREATE OR REPLACE FUNCTION update_category_by_artist_id(
    artist_id_param int, 
    category_id_param int, 
    category_name_param text, 
    category_description_param text, 
    category_color_param text
) 
RETURNS JSON AS $$
DECLARE 
	updated_category JSON;
BEGIN
	UPDATE category 
    SET
		name = COALESCE(category_name_param, name),
        description = COALESCE(category_description_param, description),
        color = COALESCE(category_color_param, color),
        updated_at = NOW()
	WHERE 
		artist_id = artist_id_param
		AND id = category_id_param	
    RETURNING 
    json_build_object(
        'id', id,
        'name', name,
        'description', description,
        'color', color   
    ) 
    INTO 
    updated_category;    

    -- Retour de l'objet JSON contenant toutes les informations sur la catégorie modifiée
    RETURN updated_category;
	
	
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Suppression d'une catégorie
CREATE OR REPLACE FUNCTION delete_category_by_artist_id(artist_id_param int, category_id_param int) RETURNS VOID AS $$
BEGIN
    -- Suppression des œuvres d'art associées à la catégorie dans la table "artwork_has_category"
    DELETE FROM artwork_has_category WHERE category_id = category_id_param;

    -- Suppression de la catégorie de la table "category"
    DELETE FROM category WHERE artist_id = artist_id_param AND id = category_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;