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

  // Ajoutez ces options dans votre composant ProfitChart
  
  // Couleurs personnalisées pour les graphiques
  const chartColors = {
    profit: 'rgba(56, 161, 105, 0.8)',    // Vert
    revenue: 'rgba(49, 130, 206, 0.8)',     // Bleu
    payout: 'rgba(229, 62, 62, 0.8)',       // Rouge
    background: [
      'rgba(56, 161, 105, 0.8)',
      'rgba(49, 130, 206, 0.8)',
      'rgba(221, 107, 32, 0.8)',
      'rgba(136, 87, 241, 0.8)',
      'rgba(237, 137, 54, 0.8)',
      'rgba(72, 187, 120, 0.8)',
      'rgba(66, 153, 225, 0.8)',
      'rgba(159, 122, 234, 0.8)',
      'rgba(246, 173, 85, 0.8)',
      'rgba(72, 187, 120, 0.8)',
    ],
  };
  
  // Améliorez les options des graphiques
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,  // Animation plus longue pour un effet plus fluide
      easing: 'easeOutQuart'
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 20,
          font: {
            family: '"Poppins", sans-serif',
            size: 12
          },
          usePointStyle: true,  // Utilise des points au lieu de rectangles
          pointStyle: 'circle'
        }
      },
      title: {
        display: true,
        text: title,
        font: {
          family: '"Poppins", sans-serif',
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          family: '"Poppins", sans-serif',
          size: 14
        },
        bodyFont: {
          family: '"Poppins", sans-serif',
          size: 13
        },
        padding: 12,
        cornerRadius: 6,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          font: {
            family: '"Poppins", sans-serif',
          },
          callback: function(value) {
            return new Intl.NumberFormat('fr-FR', { 
              style: 'currency', 
              currency: 'USD',
              notation: 'compact' 
            }).format(value);
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: '"Poppins", sans-serif',
          }
        }
      }
    },
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