# Portfolio — Emile

Site construit avec [Astro](https://astro.build). Direction visuelle validée :
fond clair, une seule note de couleur (terracotta), typo fine, mur d'essais
punaisé pour les galeries.

## Lancer le site en local

Il faut [Node.js](https://nodejs.org) (version 22 ou plus) installé sur ton
ordinateur.

```bash
npm install       # une seule fois, après avoir récupéré le projet
npm run dev        # lance le site en local sur http://localhost:4321
```

`npm run dev` recharge automatiquement à chaque sauvegarde. C'est comme ça
qu'on travaillera ensemble : tu vois le résultat en direct pendant qu'on
ajuste.

Pour vérifier que tout compile sans erreur avant de mettre en ligne :

```bash
npm run build       # génère le site figé dans dist/
npm run preview      # sert ce site figé, pour vérifier avant publication
```

## Ajouter un projet — deux façons de faire

Chaque projet est un dossier dans `src/content/projects/` qui contient :
- `index.md` — le texte et les informations du projet
- ses images, au même niveau (`cover.jpg`, `etude-01.jpg`, etc.)

Exemple : `src/content/projects/berges-aveyron/index.md` + `cover.jpg`.

### Option A — dans le code, avec Cursor

1. Copie un dossier de projet existant (ex. `pavillon/`) et renomme la copie,
   par exemple `mon-nouveau-projet/`.
2. Ouvre son `index.md` et remplis l'en-tête (entre les `---`) :

```yaml
---
title: Le nom de mon projet
category: amenagement-paysager   # doit correspondre à un fichier dans src/content/categories/
year: "2026"
place: Là où c'est situé
tools: Les outils utilisés
order: 2                          # position dans la liste (1 = en premier)
cover: cover.jpg
coverAlt: Description de l'image pour l'accessibilité
gallery:
  - src: photo-1.jpg
    alt: Description de la photo
    caption: une légende à la main
    size: l                      # s (petit), m (moyen) ou l (grand)
  - src: photo-2.jpg
    caption: une autre légende
    size: m
---

Le texte de présentation du projet vient ici, en markdown normal.
Un paragraphe par idée. Le premier paragraphe est mis en avant automatiquement.
```

3. Remplace les images du dossier par les tiennes, avec les mêmes noms que
   dans le fichier.
4. Sauvegarde. Le projet apparaît automatiquement dans sa rubrique.

Les images sont automatiquement optimisées et converties en `.webp` au
moment de la mise en ligne — dépose-les en bonne qualité, ne t'inquiète pas
de leur poids.

### Option B — depuis un formulaire, avec Sveltia CMS

Une fois le site déployé (voir plus bas), une interface d'édition visuelle
est disponible sur `tonsite.fr/admin` : formulaire, ajout d'images par
glisser-déposer, aucun fichier à ouvrir. Elle modifie exactement les mêmes
fichiers que l'option A — tu peux passer de l'une à l'autre sans problème,
y compris pour modifier les trois projets d'exemple déjà en place.

## Ajouter ou renommer une rubrique

Dans `src/content/categories/`, chaque fichier `.md` est une rubrique du
portfolio :

```yaml
---
title: Le nom affiché de la rubrique
order: 4          # position dans la page Portfolio
---
```

Le nom du fichier (sans `.md`) est l'identifiant à utiliser dans le champ
`category` des projets. Une fois le CMS branché (voir plus bas), la
collection **Rubriques** fait la même chose depuis un formulaire.

## Textes à personnaliser

Deux-trois choses sont encore des textes provisoires à remplacer :

- `src/pages/contact.astro` — ton vrai email, téléphone, liens Instagram/LinkedIn (variables en haut du fichier).
- `src/pages/apropos.astro` — le texte de présentation et la photo (remplace le bloc `.about-ph` par une vraie image).
- Les trois projets d'exemple (`berges-aveyron`, `pavillon`, `memorandum-pli`) sont là pour tester la mise en page — à remplacer par tes vrais projets, ou à garder comme modèles.

## Palette et typo

Tout est centralisé dans `src/styles/global.css`, en haut du fichier, sous
`:root`. Pour changer la note de couleur, une seule ligne à modifier :
`--accent`.

## Brancher la vraie police (PP Telegraf)

Le site utilise actuellement Outfit (Google Fonts, gratuite) comme
équivalent visuel de PP Telegraf, le temps de récupérer les fichiers de la
vraie police.

1. Télécharge PP Telegraf sur pangrampangram.com/products/telegraf
   (gratuite pour un usage personnel/portfolio — vérifie les conditions
   pour un usage professionnel plus tard).
2. Dépose les fichiers `.woff2` dans `public/fonts/telegraf/`.
3. Dans `src/styles/global.css`, décommente le bloc `@font-face` prévu en
   haut du fichier et adapte les noms de fichiers.
4. Remplace la valeur de `--font-sans` par `'PP Telegraf'`.
5. Retire le lien Google Fonts vers Outfit dans `src/layouts/Base.astro`
   (tu peux garder DM Mono et Caveat, qui restent des choix valables).

## Version PDF

Une base d'impression existe (`@media print` dans `global.css`) mais elle
est minimale pour l'instant — c'est la prochaine étape, une fois le
contenu du site stabilisé.

## Déploiement (Netlify) + interface d'édition (Sveltia CMS)

Les deux se mettent en place dans la foulée, une seule fois.

### 1. Mettre le projet sur GitHub

Crée un dépôt sur [github.com/new](https://github.com/new) (privé ou public,
peu importe), puis pousse ce projet dedans — dans Cursor, le terminal
intégré ou l'onglet Source Control savent faire ça, ou en ligne de
commande :

```bash
git init
git add .
git commit -m "Premier envoi du portfolio"
git branch -M main
git remote add origin https://github.com/TON-PSEUDO/TON-DEPOT.git
git push -u origin main
```

### 2. Brancher le dépôt sur le nom du CMS

Ouvre `public/admin/config.yml` et remplace la ligne `repo:` par ton vrai
dépôt :

```yaml
backend:
  name: github
  repo: TON-PSEUDO/TON-DEPOT   # <- ici
  branch: main
```

Commit et pousse ce changement.

### 3. Déployer sur Netlify

1. Sur [netlify.com](https://netlify.com) : "Add new site" → "Import an
   existing project" → connecte le dépôt GitHub créé à l'étape 1.
2. Build command : `npm run build` — Publish directory : `dist`.
3. Netlify donne une adresse en `.netlify.app` immédiatement ; un vrai nom
   de domaine (`prenom-nom.fr`) se branche ensuite dans les réglages du
   site, quand tu es prêt.

Chaque nouveau `git push` (ou chaque modification via Sveltia CMS, qui pousse
elle aussi sur GitHub) redéclenche automatiquement un déploiement.

### 4. Se connecter à l'interface d'édition

1. Va sur `tonsite.netlify.app/admin` (ou ton propre domaine une fois
   branché).
2. Clique sur **Sign In with Token**. Un lien pré-rempli t'emmène sur
   GitHub pour créer un jeton d'accès personnel avec exactement les
   permissions nécessaires (accès en lecture/écriture à ce seul dépôt).
3. Génère le jeton, copie-le, colle-le dans la fenêtre de connexion.

Ce jeton reste stocké dans ton navigateur — il n'est jamais partagé
ailleurs. Tu peux le révoquer à tout moment depuis les réglages GitHub
(*Settings → Developer settings → Personal access tokens*) si besoin.

Tu es alors dans l'interface : deux collections apparaissent, **Projets**
et **Rubriques**, avec les trois projets d'exemple déjà éditables. Chaque
sauvegarde dans le CMS crée un commit sur GitHub et relance le déploiement,
exactement comme si tu avais modifié les fichiers toi-même.
