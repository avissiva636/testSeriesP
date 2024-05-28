import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const { totalQuestions, unAttended, questionsWrong, questionsCorrect } = data;

      const config = {
        type: 'doughnut',
        data: {
          labels: ['Unattended', 'Questions Wrong', 'Questions Correct'],
          datasets: [{
            label: 'Questions',
            data: [unAttended, questionsWrong, questionsCorrect],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)', // red
              'rgba(54, 162, 235, 0.6)', // blue
              'rgba(75, 192, 192, 0.6)', // green
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          }],
        },
        options: {
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
            },
          },
        },
      };

      chartInstance.current = new Chart(chartContainer.current, config);
    }

    return () => {
      // Cleanup chart instance on unmount
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default PieChart;
