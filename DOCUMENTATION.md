# DiRVED - Tâches et responsabilités actuelles

- [DiRVED - Tâches et responsabilités actuelles](#dirved---tâches-et-responsabilités-actuelles)
  - [Objectifs](#objectifs)
  - [Logiciel de gestion des conventions et des prestations](#logiciel-de-gestion-des-conventions-et-des-prestations)
    - [Prérequis](#prérequis)
    - [Architecture](#architecture)
    - [Environnement de développement](#environnement-de-développement)
      - [1. Installez les outils nécessaires](#1-installez-les-outils-nécessaires)
      - [2. Installez les dépendances](#2-installez-les-dépendances)
      - [3. Mettre en place MongoDB](#3-mettre-en-place-mongodb)
      - [4. Démarrez l'application](#4-démarrez-lapplication)
    - [Structure du code](#structure-du-code)
      - [Fichiers et dossiers clés](#fichiers-et-dossiers-clés)
        - [Dossier frontend](#dossier-frontend)
        - [Dossier backend](#dossier-backend)
      - [Classes et fonctions principales](#classes-et-fonctions-principales)

> Personnes impliquées: Aira TRIBORD

Programmation du logiciel de gestion conventions & prestations

## Objectifs

Cet outil a été conçu pour aider la DiRVED à gérer efficacement leurs activités liées aux conventions et prestations.
Il offre une interface intuitive et des fonctionnalités pour suivre les conventions, planifier les prestations et gérer les données clients. Ce logiciel utilise des technologies telles qu'Electron, React, Express et MongoDB pour offrir une expérience utilisateur fluide et une gestion des données fiable.

## Logiciel de gestion des conventions et des prestations

La template utilisé est la suivante : [Electron React Boilerplate](https://electron-react-boilerplate.js.org/)

> Documentation : [Electron React Boilerplate](https://electron-react-boilerplate.js.org/docs/installation)

La base de données utilisée est MongoDB.

### Prérequis

Les prérequis pour exécuter ce logiciel sont les suivants :

- **Node.js v16.13.1** : ce logiciel nécessite une installation de Node.js sur votre ordinateur. Vous pouvez télécharger et installer Node.js depuis le site web officiel de Node.js.
- **npm** : npm est le gestionnaire de paquets intégré à Node.js. Il est inclus avec l'installation de Node.js.
- **MongoDB** : ce logiciel utilise MongoDB comme base de données. Vous devez donc avoir une installation de MongoDB en cours d'exécution sur votre ordinateur. Vous pouvez télécharger et installer MongoDB depuis le site web officiel de MongoDB.

Pour installer ces prérequis, suivez les instructions de leurs sites web respectifs. Une fois les prérequis installés, vous pouvez cloner le référentiel Github pour le logiciel et installer les dépendances en utilisant npm, comme décrit dans la section [Environnement de développement](#environnement-de-développement).

### Architecture

L'architecture du logiciel est basée sur la combinaison de différents composants, notamment electron-react-boilerplate, Express et MongoDB. Voici une brève description de comment ces composants interagissent les uns avec les autres :

- **electron-react-boilerplate** : C'est un modèle de projet qui permet de démarrer rapidement un projet Electron en utilisant React comme bibliothèque pour le développement d'interface utilisateur. Il comprend également des outils pour faciliter le développement et le déploiement d'une application Electron-React.
- **Express** : Express est un framework pour développer des applications web à l'aide de Node.js. Il est utilisé pour mettre en place le serveur web et les API qui permettront à l'application Electron d'interagir avec la base de données MongoDB.
- **MongoDB** : MongoDB est une base de données NoSQL qui stocke les données de l'application. Les données sont accessibles via les API Express et utilisées pour alimenter les composants React dans l'application Electron.

En résumé, electron-react-boilerplate fournit la structure de base pour l'application Electron-React, tandis qu'Express permet de gérer les communications entre l'application et la base de données MongoDB. MongoDB stocke les données qui seront utilisées par l'application pour fonctionner. Chacun de ces composants joue un rôle clé dans la mise en œuvre de la solution de gestion de conventions et de prestations.

```lua
 ┌──────────────────────────┐
 │electron-react-boilerplate│
 └──────────┬───▲───────────┘
            │   |
            │   |
            │   |
         ┌──▼───┴──┐
         │ Express │
         └──┬───▲──┘
            │   |
            │   |
            │   |
            │   |
         ┌──▼───┴──┐
         │ MongoDB │
         └─────────┘
```

### Environnement de développement

Pour configurer l'environnement de développement pour ce logiciel, vous devrez suivre les étapes suivantes :

#### 1. Installez les outils nécessaires

Pour développer ce logiciel, vous aurez besoin d'avoir installé Node.js v16.13.1, npm et Git sur votre ordinateur.

Clonez le référentiel Github : pour obtenir le code source du logiciel, vous pouvez cloner le référentiel Github à l'adresse `https://github.com/NicoLarson/gestion-dirved`. Pour cela, ouvrez un terminal et exécutez la commande suivante :

```sh
git clone https://github.com/NicoLarson/gestion-dirved.git
```

#### 2. Installez les dépendances

Une fois le code source cloné, accédez au répertoire du projet et exécutez la commande suivante pour installer toutes les dépendances nécessaires :

```sh
npm install
```

#### 3. Mettre en place MongoDB

Pour utiliser MongoDB avec ce logiciel, vous devez avoir une installation de MongoDB en cours d'exécution sur votre ordinateur. Vous pouvez télécharger et installer MongoDB depuis le site web officiel de MongoDB.

Une fois MongoDB installé, vous pouvez créer une base de données pour le logiciel en exécutant les commandes MongoDB appropriées. Vous pouvez trouver des informations sur les commandes MongoDB dans la documentation officielle de MongoDB.

<!-- TODO : Mettre un lien pour le logiciel d'insertion de convention -->

#### 4. Démarrez l'application

Une fois toutes les dépendances installées et MongoDB configuré, vous pouvez démarrer l'application en exécutant la commande suivante :

Pour lancer le développement, il faut installer les dépendances du projet avec la commande suivante :

```sh
npm run install:backend
npm run install:frontend
```

Ensuite, il faut lancer et le serveur de développement avec la commande suivante :

```sh
npm run dev
```

Maintenant, l'application devrait être en cours d'exécution et vous pourrez démarrer le développement.

### Structure du code

#### Fichiers et dossiers clés

##### Dossier frontend

Le dossier frontend contient le code de l'application Electron-React. Il est composé des dossiers suivants :

- Dossier `src` : ce dossier contient le code source de l'application Electron-React.
  - Le dossier `main` contient le code source du processus principal de l'application Electron.
  - Le dossier `renderer` contient le code source du processus de rendu de l'application Electron.
  - Le dossier `components` contient les composants React qui seront utilisés dans l'application.
  - Le dossier `pages` contient les pages React qui seront utilisées dans l'application.

- Dossier `assets` : ce dossier contient les fichiers statiques tels que les images, les polices et les fichiers HTML.

- Fichier `package.json` : ce fichier contient les informations sur le projet et les dépendances du projet.
- Fichier `App.js` : ce fichier est l'entrée de l'application Electron-React et il charge les composants React dans le rendu HTML. Il est également responsable de la création de la fenêtre de l'application Electron.

##### Dossier backend

Le dossier `backend` contient le code du serveur Express qui gère les communications via requêtes HTTP entre l'application Electron-React et la base de données MongoDB. Il est composé des dossiers suivants :

- Le dossier `routes` les contrôleurs qui seront utilisés dans l'application.
- Le dossier `models` contient les modèles Mongoose qui seront utilisés dans l'application.
- Le dossier `files` contient les fichiers téléchargé par l'application.

- Le fichier `package.json` contient les informations sur le projet et les dépendances du projet.
- Le fichier `.env` contient les informations de connexion à la base de données.
- Le fichier `con.js` contient les informations de connexion à la base de données.
- Le fichier `server.js` est l'entrée du serveur Express et il configure les routes, les middlewares et les interactions avec la base de données.
- Le fichier `dirved.route.js` contient les routes.

#### Classes et fonctions principales

- Classes de composants React : Les composants React sont des classes qui définissent la structure et le comportement de l'interface utilisateur.
- Actions et réducteurs : Les actions sont des objets qui décrivent les modifications de l'état de l'application, tandis que les réducteurs sont des fonctions qui prennent en charge les modifications de l'état de l'application en fonction des actions.
- Routes Express : Les routes Express définissent les URL qui peuvent être utilisées pour envoyer des requêtes HTTP au serveur.
- Interactions avec la base de données : Le serveur Express interagit avec la base de données MongoDB en utilisant des requêtes pour enregistrer, mettre à jour et récupérer les données.

En conclusion, la structure du code est divisée en deux parties principales, l'interface utilisateur gérée par React et le serveur Express qui gère les requêtes et les interactions avec la base de données. Il est important de comprendre cette structure pour pouvoir maintenir et développer efficacement le logiciel.

---

Structure du code : Décrivez la structure du code, y compris les fichiers et dossiers clés, les principales classes et fonctions.

Fonctionnalités actuelles : Décrivez les fonctionnalités du logiciel déjà implémentées et comment elles fonctionnent.

Tâches en suspens : Décrivez les tâches en suspens et les fonctionnalités prévues pour les prochaines étapes du développement.

Conventions de codage : Décrivez les conventions de codage utilisées dans le projet, y compris les normes de style, les processus de contrôle de version, etc.
