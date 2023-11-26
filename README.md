# Projet Just_Connect

Ce projet GitHub vise à illustrer le fonctionnement de l'OAuth 2.0 en fournissant des exemples d'authentification avec différentes plateformes populaires telles qu'Azure, Google, Discord, Twitch, et GitHub. Chaque méthode d'authentification est potentiellement associée à une fonctionnalité spéciale qui met en évidence les possibilités offertes par l'OAuth 2.0.


## Configuration initiale
Assurez-vous d'avoir Node.js et npm installés sur votre machine.


## Frontend (React)

Le frontend est écrit en ReactJS et est configuré pour fonctionner sur le port 5173 par défaut. Pour lancer le frontend, exécutez la commande suivante depuis le répertoire du frontend :


```bash
npm install
npm run dev
```
Le frontend sera accessible à l'adresse http://localhost:5173. 


## Backend (Node.js avec Express)

Le backend est écrit en Node.js et utilise express  et est configuré pour fonctionner sur le port 3000 par défaut. Pour lancer le backend, exécutez la commande suivante depuis le répertoire du backend :
```bash
npm install
npm start

```
Le backend sera accessible à l'adresse http://localhost:3000.

Si le port 5173 n'est pas disponible, veuillez changer dans le backend dans le fichier app.js les corsOptions afin de modifier les URL autorisées à envoyer des requêtes au backend.


```javascript
const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
};

```
De plus pour que le backend fonctionne, il vous faudra mettre un fichier .env à la racine avec le contenu suivant :
``` 
GOOGLE_CLIENT_ID=82750345803-0j5f035ffj0b0gjtm9def2cuvgkres1i.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_REDIRECT_URI=http://localhost:3000/oauthGoogle/callback
DISCORD_CLIENT_ID=1174682089338183772
DISCORD_CLIENT_SECRET=-q2j9dJchOJ2KcZAhKZpMAy0PAMY22qr
DISCORD_REDIRECT_URI=http://localhost:3000/discord/callback
SESSION_SECRET=SEEEECRET

TWITCH_CLIENT_ID = v9e4a3teexxbsmeovv3bmq4tz02281
TWITCH_SECRET    = 35kapw7g0q7uv5crba6powesd9bpeo

GITHUB_CLIENT_ID = 11d6bfcb9bff3259dba4
GITHUB_CLIENT_SECRET = 7879cfa60edb6f2a4813d58c68870f031f3f2b76


```
## Base de données et confidentialité
Suite à l'authentification avec un moyen externe à la plateforme, il est d'usage d'enregistrer des informations sur l'utilisateur dans une base de données. Pour ce projet, nous avons décidé de ne pas le faire et nous vous **garantissons**
donc qu'**aucune** de vos données personnelles ne seront enregistrées de notre côté.

## Authentification
Chaque méthode d'authentification est accessible via l'interface utilisateur du frontend. Suivez les instructions spécifiques à chaque plateforme pour vous authentifier.

-**Azure**: Authentifiez-vous avec votre compte Azure et découvrez une fonctionnalité spéciale liée à Azure.

-**Google**: Utilisez votre compte Google pour vous authentifier et explorez la fonctionnalité spéciale associée à Google.

-**Discord**: Utilisez votre compte Discord pour vous authentifier et explorez la fonctionnalité spéciale associée à Discord.

-**Twitch**: Utilisez votre compte Twitch pour vous authentifier et explorez la fonctionnalité spéciale associée à Twitch.

-**GitHub**: Utilisez votre compte GitHub pour vous authentifier et explorez la fonctionnalité spéciale associée à GitHub.

## Fonctionnalités spéciales
Chaque authentification réussie débloque une fonctionnalité spéciale. Ces fonctionnalités sont conçues pour illustrer les possibilités étendues offertes par l'OAuth 2.0.

-**Azure**: [Fonctionnalité spéciale d'Azure]

-**Google**: Voir ses informations ainsi que les événements du calendrier avec un lien qui permet de voir l'événement sur Google Calendar et ajouter des événements à son calendrier.

-**Discord**: Voir l'ensemble de ses serveurs, et avoir une statistique de fonctionnalités sur nos serveurs

-**Twitch**: Voir ses informations.

-**GitHub**: Voir nos différents repositories et des informations sur ces derniers.

## Auteurs
Abid Brahim, Agbassah Steven, ...
