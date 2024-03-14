# projet-galerie-personnalisable-back

L’objectif du projet Dévelop’Art est de mettre à disposition un CMS offrant une ou plusieurs intégrations personnalisées et esthétiques que les artistes pourront choisir selon leurs préférences. Grâce à un accès à un back office, ils pourront agencer leur galerie d’art à leur convenance en ayant la possibilité de sélectionner différents designs, fonds, polices, agencements..  
Pourquoi pas pousser le truc un peu plus loin : proposer une solution e-commerce.   
De plus, cette solution pourrait être déclinée pour d'autres artistes que les photographes (peintres, sculpteurs,...), offrant ainsi une option flexible et personnalisable pour la création de sites artistiques.  

La cible principale du projet Dévelop’Art est donc les artistes dans leur diversité: 
photographes, peintres, sculpteurs, … souhaitant disposer d’un site web personnalisé, notamment en termes d’esthétique.

La cible indirecte est donc également les visiteurs des sites web créés à travers Dévelop’Art pour ces artistes.

## MVP

- Présentation de l’artiste avec quelques-unes de ses oeuvres  
- Affichage des oeuvres de l’artiste sous forme de galerie avec un lien pour accéder aux détails des oeuvres  
- Sélection des oeuvres en filtrant par catégorie  
- Visualisation du détail des oeuvres : affichage de l’oeuvre en plus grand format, description détaillée de l’oeuvre  
- Possibilité de se logguer en tant qu’artiste pour accéder à une page back office qui permettrait de:  
  - changer la couleur de fond parmi 2 ou 3 proposées (blanc, noir ou palette de couleurs pour que l’artiste personnalise complètement son fond)   
  - avoir le choix entre 2 ou 3 agencements possibles  
  - avoir le choix entre 2 ou 3 polices  
  - personnaliser sa bannière  
  - télécharger ses images,ajouter ses descriptions / catégories  
  - préciser les contacts, les liens vers les réseaux sociaux  
- Contacter l’artiste  
- Ajout des mentions légales : droits d’auteur  

## Routes back

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



