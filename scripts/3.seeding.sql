-- Seeding de la Base de données
BEGIN;

-- Table: role
INSERT INTO role(
	name)
	VALUES ('artist'),
           ('member');

-- Table: artist
INSERT INTO artist(
	path, lastname, firstname, email, password, biography, role_id)
	VALUES ('https://picsum.photos/id/237/200/300', 'Blanc', 'Aurelie', 'aurelie.blanc@loremipsum.com', 'Aurelie01!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',  1),
	       ('https://picsum.photos/seed/picsum/200/300', 'Dubois', 'Nelly', 'nelly.dubois@loremipsum.com', '$2b$10$etLA3YtLvFdI7gu0otPjmen.wYLdszDuzPktTTcsLYzuCqOOCRc9e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', 1);

-- Table: artist_details
INSERT INTO artist_details(
	birthdate, type, street_no, street_name, zipcode, city, phone, facebook, insta, twitter, youtube, artist_id)
	VALUES ('1990-11-10', 'painter', '12', 'rue de la soif', '75012', 'Paris', '0712859436', 'https://www.facebook.com/', 'https://www.instagram.com/', 'https://twitter.com/home', 'https://www.youtube.com/', 1),
			('1901-12-05', 'photograph', '4', 'avenue de la chapelle', '77600', 'Meaux', '0492651725', 'https://www.facebook.com/', 'https://www.instagram.com/', 'https://twitter.com/home', 'https://www.youtube.com/', 2);

-- Table: configuration
INSERT INTO configuration(
	font_type, background_color, cursor, font_color, layout, banner, logo, facebook_flag, insta_flag, twitter_flag, youtube_flag, artist_id)
	VALUES ('Arial', '#000000', 'Arrow', '#FFFFFF', 1, 'https://picsum.photos/id/32/4032/3024', 'Develo''Part', true, true, true, true, 1),
           ('Callista', '#FFFFFF', 'Pointer', '#000000', 2, 'https://picsum.photos/id/57/2448/3264', 'Develop''Art', false, false, false, false, 2);

-- Table: artwork
INSERT INTO artwork(
	name, description, production_year, technique, width, height, media, framing, quote, path, orientation, "position", homepage_flag, artist_id)
	VALUES ('Mont fuji', 'Photo prise au pied du Mont Fuji', '12/11/2023', 'Argentique', 15, 11, 'papier brillant', false, 'Celui qui gravit le Mont Fuji une fois est sage', 'https://picsum.photos/seed/picsum/200/300', 'paysage', 4, true, 1),
	       ('Victor Hugo', 'Portrait de Victor Hugo', '08/11/2022', 'Aquarelle', 50, 80, 'toile', true, 'Je ne suis rien, je le sais', 'https://picsum.photos/seed/picsum/200/300', 'portrait', 1, false, 2),

	       ('Rochelle Flatley', 'photo de Rochelle Flatley', '11/08/2020', 'Sepia', 70, 90, 'papier mat', true, 'Je ne suis rien, je le sais', 'https://media.istockphoto.com/id/496619649/fr/photo/beaut%C3%A9-asiatique.jpg?s=2048x2048&w=is&k=20&c=-czWG2a8ohzEgBDXXujSNFWvM0W8LBinsp8Iy2fX1oo=', 'portrait', 1, true, 1),
		   ('Wilbert Powlowski', 'photo de Wilbert Powlowski', '19/09/2021', 'numérique', 50, 40, 'toile', false, '', 'https://media.istockphoto.com/id/1473137337/fr/photo/ballerine-en-robe-de-mousseline-rose-saut-fendu-danseuse-de-ballet-en-robe-de-soie-pointes.jpg?s=2048x2048&w=is&k=20&c=4G7MtxBsdLS3QsDJyQLSIc5CIXkgFLa2aZU9xwyR-4M=', 'portrait', 2, true, 1),
		   ('Edna Ortiz', 'photo de Edna Ortiz', '09/12/2021', 'argentique', 50, 40, 'toile', false, '', 'https://media.istockphoto.com/id/1293643267/fr/photo/statue-antique-3d-de-femme-pierre-cass%C3%A9e-blanche-grec-mod%C3%A8le-romain-de-bont%C3%A9-bouquet-rose-de.jpg?s=2048x2048&w=is&k=20&c=Vp-h3Ybo5O5hWGFV5WbKfpmaUm89SvWmKN_Z4gHtRoE=', 'paysage', 3, true, 1);

-- Table: category
INSERT INTO category(
	name, description, color, artist_id)
	VALUES ('Culinaire', 'Photos autour de la cuisine', '#be4d25',1),
           ('Paysages', 'Photos de paysages', '#49be25',2),
		   ('Personnes', 'Photos de personnes', '#ff0000',1),
		   ('Animaux', 'Photos d animaux', '#ff0000',1);
		   
-- Table: artwork_has_category
INSERT INTO artwork_has_category(
	artwork_id, category_id
	)
	VALUES (1,1),
		   (2,2),
		   (3,3),
		   (4,3),
		   (5,3);


COMMIT;