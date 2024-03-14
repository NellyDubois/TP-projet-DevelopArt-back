# MCD

## Entités

- Artiste
- Oeuvre
- Categorie
- Configuration
  
## Attributs des entités

- Artiste
  - code_artiste
  - chemin_photo_artiste
  - nom
  - prénom
  - adesse_email
  - mot_de_passe
  - date_de_naissance
  - biographie
  - type_artiste
  - numéro_rue
  - nom_rue
  - code_postal
  - ville
  - téléphone
  - compte_facebook
  - compte_instagram
  - compte_X
  - compte_youtube

- Oeuvre
  - code_oeuvre
  - nom_de_l_oeuvre
  - description
  - année_de_réalisation
  - technique
  - largeur
  - hauteur
  - support_d_impression
  - encadré
  - citation
  - chemin_de_l_image
  - orientation
  - position
  - présence_page_d_accueil

- Categorie
  - code_catégorie
  - nom_catégorie
  - description
  - couleur

- Configuration
  - code_configuration
  - type_de_police
  - couleur_de_fond
  - curseur_souris
  - couleur_de_police
  - type_d_agencement
  - flag_facebook
  - flag_instagram
  - flag_X
  - flag_youtube

## Associations

Artiste - Oeuvre ( réaliser )
Artiste - Configuration ( choisir )
Oeuvre - Categorie ( appartenir )

## Cardinalités des associations

Un artiste a réalisé au minimum 0 oeuvre et au maximum N oeuvre  
Une oeuvre est réalisé par minimum 1 artiste et par maximum 1 artiste  

Un artiste peut choisir entre minimum 1 configuration et maximum 1 configuration  
Une configuration peut être choisie par minimum 1 artiste et maximum 1 artiste  

Une oeuvre peut appartenir à minimum 0 catégories et maximum N catégories
Une catégorie appartient à minimum 0 oeuvres et maximum N oeuvres

## On obtient donc

```txt
OEUVRE: code oeuvre, nom de l'oeuvre, description, année de réalisation, technique, largeur,hauteur,support d'impression,encadré, citation, chemin de l'image, orientation, position, présence page d'accueil
REALISER, 11 OEUVRE, 0N ARTISTE

CATEGORIE: code catégorie, nom catégorie, description, couleur
APPARTENIR, 0N OEUVRE, 0N CATEGORIE
ARTISTE: code artiste, chemin photo artiste, Nom, Prénom, adresse email, mot de passe, date de naissance,biographie,type artiste, numéro rue, nom rue, code postal, ville, téléphone, compte facebook, compte instagram, compte X, compte YouTube
CHOISIR, 11 CONFIGURATION, 11 ARTISTE
CONFIGURATION: code configuration, type de police, couleur de fond, curseur souris, couleur de police, type d'agencement, flag facebook, flag instagram, flag X, flag YouTube

```
