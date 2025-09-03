import React from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Box, Typography, Paper } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProfitChart = ({ data, title, entityType, chartType = 'bar' }) => {
  // Déterminer les noms de propriétés en fonction du type d'entité
  const getIdProperty = () => {
    switch (entityType) {
      case 'offer': return 'offer_id';
      case 'affiliate': return 'affiliate_id';
      case 'advertiser': return 'advertiser_id';
      default: return 'id';
    }
  };

  const getNameProperty = () => {
    switch (entityType) {
      case 'offer': return 'offer_name';
      case 'affiliate': return 'affiliate_name';
      case 'advertiser': return 'advertiser_name';
      default: return 'name';
    }
  };

  // Préparer les données pour le graphique
  const chartData = {
    labels: data.map(item => {
      // Tronquer les noms trop longs pour améliorer la lisibilité
      const name = item[getNameProperty()] || `ID: ${item[getIdProperty()]}`;
      return name.length > 25 ? name.substring(0, 22) + '...' : name;
    }),
    datasets: [
      {
        label: 'Revenue',
        data: data.map(item => item.revenue),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Payout',
        data: data.map(item => item.payout),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Profit',
        data: data.map(item => item.profit),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Pour les graphiques empilés, on utilise un format différent
  const stackedChartData = {
    labels: data.map(item => {
      const name = item[getNameProperty()] || `ID: ${item[getIdProperty()]}`;
      return name.length > 25 ? name.substring(0, 22) + '...' : name;
    }),
    datasets: [
      {
        label: 'Revenue',
        data: data.map(item => item.revenue),
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
      },
      {
        label: 'Payout',
        data: data.map(item => item.payout),
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    barPercentage: 0.7, // Réduit la largeur des barres
    categoryPercentage: 0.8, // Augmente l'espace entre les groupes de barres
  };

  // Configuration spécifique pour le graphique en ligne
  const lineOptions = {
    fill: true, // Pour créer l'effet de zone
  };
  
  // Configuration pour le donut
  const doughnutOptions = {
    cutout: '70%', // Pour créer l'effet donut
  };
  
  // Orientation horizontale pour les barres si nécessaire
  const barOptions = {
    indexAxis: entityType === 'offer' || entityType === 'advertiser' || entityType === 'affiliate' ? 'y' : 'x', // Horizontal pour les offres, annonceurs et affiliés
    scales: {
      x: {
        stacked: chartType === 'stacked',
      },
      y: {
        stacked: chartType === 'stacked',
        beginAtZero: true
      },
    },
  };
  
  // Rendu conditionnel en fonction du type de graphique
  const renderChart = () => {
    switch(chartType) {
      case 'doughnut':
        return <Doughnut data={chartData} options={{...options, ...doughnutOptions}} />;
      case 'line':
        return <Line data={chartData} options={{...options, ...lineOptions}} />;
      case 'stacked':
        return <Bar data={stackedChartData} options={{...options, ...barOptions}} />;
      case 'bar':
      default:
        return <Bar data={chartData} options={{...options, ...barOptions}} />;
    }
  };
  
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Box sx={{ height: 400 }}>
        {renderChart()}
      </Box>
    </Paper>
  );
};

export default ProfitChart;