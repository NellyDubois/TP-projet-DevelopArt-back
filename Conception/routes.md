# Routes back

| Routes | Description | Méthode |  
| :-----: | ----- | ----- |
| / | Doc Swagger / Description API | |
| /:artiste_id | Récupérer toutes les informations de l'artiste dont l'id est id_artiste | GET |
| /:artiste_id | Modifier les informations de l'artiste dont l'id est id_artiste | PATCH |
| /:artiste_id | Créer les informations de l'artiste dont l'id est id_artiste | POST |
| /:artiste_id | Supprimer les informations de l'artiste dont l'id est id_artiste | DELETE |
| /:artiste_id/oeuvres | Récupérer toutes les oeuvres de l'artiste dont l'id est id_artiste | GET |
| /:artiste_id/oeuvres | Ajouter des oeuvres à la galerie de l'artiste dont l'id est id_artiste | POST |
| /:artiste_id/oeuvres/:oeuvre_id | Récupérer les détails de l'oeuvre par son id | GET |
| /:artist_id/oeuvres/:oeuvre_id | Modifier les détails de l'oeuvre par son id ( par exemple ajouter une catégorie | PATCH |
| /:artiste_id/oeuvres/:oeuvre_id | Supprimer l'oeuvre par son id | DELETE |
| /:artiste_id/categories | Récupérer les catégories et les oeuvres associées de l'artiste ( par son id ) | GET |
| /:artiste_id/categories | Créer une nouvelle catégorie et les oeuvres associées de l'artiste ( par son id ) | POST |
| /:artiste_id/categories/categorie_id | Récupérer la catégorie par son id et les oeuvres associées | GET |
| /:artiste_id/categories/:categorie_id | Modifier la catégorie et les oeuvres associées de l'artiste ( par son id ) | PATCH |
| /:artiste_id/categories/:categorie_id | Supprimer la catégorie par son id et les oeuvres associées | DELETE |
| /:artiste_id/configuration | Récupérer les informations de configuration choisies par l'artiste | GET |
| /:artiste_id/configuration | Sauvegarder les informations de configuration choisies par l'artiste | POST |
| /:artiste_id/configuration | Modifier les informations de configuration choisies par l'artiste | PATCH |
| /signin | Connexion de l'artiste à son compte | POST |