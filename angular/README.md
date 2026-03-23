# Angular - Guide Rapide

## Installation

```bash
cd angular
npm i
```

## Lancer l'application

```bash
npm start
```

L'app démarre sur `http://localhost:4200`.

## Tests E2E (Cypress)

```bash
npm run e2e
```

Cela lance les tests Cypress en mode CLI.

Pour ouvrir Cypress en interface graphique :

```bash
npm run e2e:open
```

## Coverage E2E

```bash
npm run e2e:coverage
```

Ce script fait automatiquement :
1. build Angular en mode dev
2. instrumentation du bundle pour le coverage
3. lancement d'un serveur local
4. exécution de Cypress
5. génération du rapport coverage

Rapports générés :
- résumé console (`text-summary`)
- rapport HTML dans `coverage/index.html`
