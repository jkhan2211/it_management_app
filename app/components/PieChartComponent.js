"use client"; // Ensure this is the first line in the file

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Box, Typography } from '@mui/material';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels); // Register the plugin

// Predefined colors array
const predefinedColors = [
  'rgba(255, 99, 132, 0.6)', // Red
  'rgba(54, 162, 235, 0.6)', // Blue
  'rgba(255, 206, 86, 0.6)', // Yellow
  'rgba(75, 192, 192, 0.6)', // Green
  'rgba(153, 102, 255, 0.6)', // Purple
  'rgba(255, 159, 64, 0.6)', // Orange
];

const getColorForQuantity = (quantity) => {
  return quantity < 2 ? 'rgba(255, 99, 132, 0.6)' : predefinedColors[Math.floor(Math.random() * predefinedColors.length)];
};

const PieChartComponent = ({ inventory }) => {
  // Prepare data for the pie chart
  const data = {
    labels: inventory.map(item => item.name),
    datasets: [
      {
        data: inventory.map(item => item.quantity),
        backgroundColor: inventory.map(item => getColorForQuantity(item.quantity)),
        borderColor: inventory.map(item => getColorForQuantity(item.quantity)),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend to save space
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || '';
            return `${label}: ${value}`;
          },
        },
        enabled: true, // Enable the default tooltip
      },
      datalabels: {
        display: true,
        color: '#fff',
        formatter: (value, context) => {
          // Display the value and label if quantity is less than 2
          if (context.dataset.data[context.dataIndex] < 2) {
            const label = context.chart.data.labels[context.dataIndex];
            return `${label}: ${value}`;
          }
          return '';
        },
        backgroundColor: (context) => {
          // Set background color based on quantity
          return context.dataset.data[context.dataIndex] < 2 ? 'rgba(255, 99, 132, 0.6)' : 'rgba(0,0,0,0.1)';
        },
        borderRadius: 4,
        padding: 6,
      },
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: 4,
        padding: 2,
        width: '100%', // Adjust width to fit within the container
        maxWidth: '300px', // Set a maximum width to ensure responsiveness
        height: 'auto', // Allow height to adjust based on width
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto', // Center align horizontally
      }}
    >
      <Typography variant="h6" gutterBottom>
        Inventory Distribution
      </Typography>
      <Pie data={data} options={options} width={300} height={300} /> {/* Set the size here */}
    </Box>
  );
};

export default PieChartComponent;
