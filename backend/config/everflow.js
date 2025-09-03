require('dotenv').config();

// Configuration Everflow API
const EVERFLOW_API_BASE = 'https://api.eflow.team/v1';
const API_KEY = process.env.EVERFLOW_API_KEY;

// Headers pour l'authentification Everflow
const getAuthHeaders = () => ({
  'X-Eflow-API-Key': API_KEY,
  'Content-Type': 'application/json'
});

module.exports = {
  EVERFLOW_API_BASE,
  getAuthHeaders
};