import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import styles from './Analytics.module.css'

function CombinedCertificatesChart({ organizationId }) {
  const [chartData, setChartData] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    fetchChartData();
  }, []);

  useEffect(() => {
    if (chartData) {
      renderChart();
    }
  }, [chartData]);

  const fetchChartData = async () => {
    try {
      const pendingResponse = await axios.get(`http://localhost:5000/admin/certificates/organization/${organizationId}/count/pending`);
      const rejectedResponse = await axios.get(`http://localhost:5000/admin/certificates/organization/${organizationId}/count/rejected`);
      const approvedResponse = await axios.get(`http://localhost:5000/admin/certificates/organization/${organizationId}/count/approved`);

      const pendingCount = pendingResponse.data.pendingCertificates || 0;
      const rejectedCount = rejectedResponse.data.rejectedCertificates || 0;
      const approvedCount = approvedResponse.data.approvedCertificates || 0;

      setChartData({
        pendingCount,
        rejectedCount,
        approvedCount
      });
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const renderChart = () => {
    const ctx = document.getElementById('combinedCertificatesChart');

    // Destroy previous chart instance if exists
    if (chartInstance) {
      chartInstance.destroy();
    }

    const newChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Pending Certificates', 'Rejected Certificates', 'Approved Certificates'],
        datasets: [{
          data: [chartData.pendingCount, chartData.rejectedCount, chartData.approvedCount],
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(75, 192, 192, 0.5)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
              align: 'start'
          }
      }
      }
    });

    setChartInstance(newChartInstance);
  };

  return (
    <div className={styles.AnalyticsCharts}>
      <canvas id="combinedCertificatesChart"></canvas>
    </div>
  );
}

export default CombinedCertificatesChart;
