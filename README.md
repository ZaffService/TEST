# GP du Monde - Système de Gestion des Cargaisons

## Description
Système de gestion des cargaisons pour GP du Monde, permettant la gestion des cargaisons aériennes, maritimes et routières avec suivi des colis clients.

## Technologies
- **Backend**: PHP 8+ avec sessions
- **Frontend**: TypeScript, Tailwind CSS
- **Base de données**: JSON Server (développement)
- **Serveur**: PHP Built-in Server

## Installation

### Prérequis
- PHP 8.0 ou supérieur
- Node.js 16+ et npm
- Git

### Étapes d'installation

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd gp-du-monde-cargo
```

2. **Installer les dépendances Node.js**
```bash
npm install
```

3. **Compiler TypeScript**
```bash
npm run build
```

4. **Démarrer le serveur de développement**
```bash
npm run dev
```

Cette commande démarre :
- Serveur PHP sur `http://localhost:8000`
- JSON Server sur `http://localhost:3001`
- Compilation TypeScript en mode watch

## Utilisation

### Accès à l'application
- **Page d'accueil**: `http://localhost:8000`
- **Connexion gestionnaire**: `http://localhost:8000/login`

### Comptes de test
- **admin** / admin123
- **gestionnaire** / gestion2024
- **manager** / manager123

### Fonctionnalités principales

1. **Suivi de colis** (sans connexion)
   - Recherche par code de suivi
   - Affichage du statut en temps réel

2. **Gestion des cargaisons** (connexion requise)
   - Création de nouvelles cargaisons
   - Ajout de produits avec compatibilité automatique
   - Calcul automatique des prix

3. **Enregistrement de colis clients**
   - Formulaire complet client + colis
   - Génération automatique du code de suivi

4. **Outils gestionnaire**
   - Recherche de colis par code
   - Recherche de cargaisons par numéro
   - Modification des statuts

## Structure du projet

```
├── src/ts/                 # Code TypeScript
│   ├── models/            # Classes métier
│   ├── auth.ts           # Gestion authentification
│   └── main.ts           # Logique principale
├── views/                 # Pages PHP
├── templates/            # Templates partagés
├── public/js/            # JavaScript compilé
├── db.json              # Base de données JSON
└── Router.php           # Routeur PHP
```

## Scripts disponibles

- `npm run dev` - Démarrage complet (PHP + JSON Server + TypeScript watch)
- `npm run build` - Compilation TypeScript
- `npm run php-server` - Serveur PHP uniquement
- `npm run json-server` - JSON Server uniquement
- `npm run watch-ts` - Compilation TypeScript en mode watch

## API Endpoints

### JSON Server (port 3001)
- `GET /cargaisons` - Liste des cargaisons
- `POST /cargaisons` - Créer une cargaison
- `PATCH /cargaisons/:id` - Modifier une cargaison
- `GET /colis` - Liste des colis
- `POST /colis` - Créer un colis
- `PATCH /colis/:id` - Modifier un colis

## Authentification

Le système utilise les sessions PHP pour l'authentification. Les pages protégées redirigent automatiquement vers `/login` si l'utilisateur n'est pas connecté.

## Développement

Pour ajouter de nouvelles fonctionnalités :

1. **Nouvelles pages** : Créer dans `views/` et ajouter la route dans `Router.php`
2. **Nouvelles classes** : Ajouter dans `src/ts/models/`
3. **Nouvelle logique** : Modifier `src/ts/main.ts`

## Production

Pour la production :
1. Remplacer JSON Server par une vraie base de données
2. Configurer un serveur web (Apache/Nginx)
3. Optimiser les assets CSS/JS
4. Configurer HTTPS et sécurité