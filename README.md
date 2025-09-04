# ✨ Everflow Analytics Dashboard  

Application web permettant de **visualiser les performances (profits)** par offre, affilié ou annonceur sur une période donnée, en utilisant l’API **Everflow**.  

![Dashboard Preview](./screenshot.png)  

---

## 🚀 Fonctionnalités  

🔑 Connexion sécurisée à l'API Everflow  
- 📅 Sélection de plage de dates personnalisable  
- 📊 Visualisation des profits par **offre, affilié et annonceur**  
- 📈 Graphiques dynamiques (barres horizontales, donuts, empilés)  
- 📋 Tableaux de données détaillés avec pagination  
- 🧭 Navigation par onglets entre les vues  
- 🌙 Mode sombre pour réduire la fatigue oculaire
- 🎨 Personnalisation des couleurs du thème
- ❓ Page d'aide avec documentation complète
- ⚙️ Page de paramètres pour personnaliser l'interface
---

## 🏗️ Architecture  

### Backend (Node.js / Express)  
- Sert d’intermédiaire sécurisé avec l’API Everflow  
- Gère l’authentification via clé API  
- Traite et formate les données pour le frontend  
- Routes API RESTful :  
  - `/api/offers`  
  - `/api/affiliates`  
  - `/api/advertisers`  

### Frontend (React + Chart.js + Material-UI)  
- Interface utilisateur intuitive  
- Sélecteur de dates avec validation  
- Graphiques interactifs  
- Navigation fluide via onglets  

---

## ⚙️ Installation  

### Prérequis  
- Node.js ≥ 14  
- npm ou yarn  

### Backend  
```bash
cd backend
npm install
# ou yarn install
Créer un fichier .env :
EVERFLOW_API_KEY=votre_clé_api
EVERFLOW_API_URL=https://api.eflow.team/v1
PORT=5000

Démarrer le serveur :
npm start
👉 Backend dispo sur http://localhost:5000

Frontend
cd frontend
npm install
npm start
👉 Frontend dispo sur http://localhost:3000


🖥️ Utilisation

Sélectionner une plage de dates

Cliquer sur "Appliquer"

Explorer les onglets :

📦 Offres

👥 Affiliés

🏢 Annonceurs

Explorer les graphiques et consulter les tableaux détaillés




📊 API interne – Calculs

payout = montant payé aux affiliés

revenue = montant reçu des annonceurs

profit = revenue - payout

Exemple de réponse /api/advertisers :
[
  {
    "advertiser_id": "789",
    "advertiser_name": "Nom de l'annonceur",
    "payout": 100.50,
    "revenue": 150.75,
    "profit": 50.25
  }
]

## Structure générale
L'API utilise l'API Everflow pour récupérer les données de performance et effectue des calculs pour déterminer les profits. Les trois endpoints principaux suivent la même logique de calcul :

- /api/offers - Profits par offre
- /api/affiliates - Profits par affilié
- /api/advertisers - Profits par annonceur


## Paramètres de requête
Tous les endpoints acceptent les paramètres suivants :

- start_date (obligatoire) : Date de début au format YYYY-MM-DD
- end_date (obligatoire) : Date de fin au format YYYY-MM-DD
📌 Remarques

### Données brutes d'Everflow
L'API fait appel à l'endpoint /networks/reporting/entity/table d'Everflow avec les paramètres suivants :

- Période : définie par start_date et end_date
- Fuseau horaire : UTC (timezone_id: 67)
- Devise : USD
- Filtre : uniquement les conversions approuvées ( conversion_status: "approved" )


Seules les conversions approuvées sont comptées

Toutes les valeurs sont en USD

Les valeurs manquantes = 0

Données agrégées par entité

