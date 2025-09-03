import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchOffersProfits = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_URL}/profits/offers`, {
      params: { start_date: startDate, end_date: endDate }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des profits par offre:', error);
    throw error;
  }
};

export const fetchAffiliatesProfits = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_URL}/profits/affiliates`, {
      params: { start_date: startDate, end_date: endDate }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des profits par affilié:', error);
    throw error;
  }
};

export const fetchAdvertisersProfits = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_URL}/profits/advertisers`, {
      params: { start_date: startDate, end_date: endDate }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des profits par annonceur:', error);
    throw error;
  }
};