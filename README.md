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
TWITCH_CLIENT_ID = 'v9e4a3teexxbsmeovv3bmq4tz02281'
TWITCH_SECRET    = '35kapw7g0q7uv5crba6powesd9bpeo'

DISCORD_CLIENT_ID=1174682089338183772
DISCORD_CLIENT_SECRET=-q2j9dJchOJ2KcZAhKZpMAy0PAMY22qr
DISCORD_REDIRECT_URI=http://localhost:3000/discord/callback
SESSION_SECRET=SEEEECRET
MONGODB_URI=mongodb+srv://projetweb3oauth:mQ0JxtEozTxpUJPN@cluster0.rbb9rop.mongodb.net/projetweb3?retryWrites=true&w=majority

```

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

-**Google**: [Fonctionnalité spéciale de Google]

-**Discord**: Voir l'ensemble de ses serveurs, et avoir une statistique de fonctionnalités sur nos serveurs

-**Twitch**: [Fonctionnalité spéciale de Twitch]

-**GitHub**: [Fonctionnalité spéciale de GitHub]

## Auteurs
Abid Brahim, Agbassah Steven, ...
