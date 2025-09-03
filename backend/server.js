const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Importer les routes
const apiRoutes = require('./routes');

// Utiliser les routes
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`✅ Serveur backend démarré sur le port ${PORT}`);
});
