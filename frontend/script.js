// JavaScript for dynamic updates

document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://127.0.0.1:5000/api';

    // Fetch current water level from the backend
    async function fetchWaterLevel() {
        try {
            const response = await fetch(`${API_BASE_URL}/water-level`);
            const data = await response.json();
            updateWaterLevel(data.water_level);
        } catch (error) {
            console.error('Error fetching water level:', error);
        }
    }

    // Fetch usage trends from the backend
    async function fetchUsageTrends() {
        try {
            const response = await fetch(`${API_BASE_URL}/usage-trends`);
            const data = await response.json();
            updateUsageChart(data.future_trends);
        } catch (error) {
            console.error('Error fetching usage trends:', error);
        }
    }

    // Function to update the water level visualization
    function updateWaterLevel(level) {
        const waterFill = document.getElementById('water-fill');
        const levelStatus = document.getElementById('level-status');

        // Update height of water fill and status text
        waterFill.style.height = `${level}%`;
        levelStatus.textContent = `Tank is ${level}% full`;

        // Check for alert thresholds
        const alertMessage = document.getElementById('alert-message');
        if (level < 20) {
            alertMessage.textContent = 'Water is below 20%! Refill needed.';
            alertMessage.style.color = 'red';
        } else if (level === 100) {
            alertMessage.textContent = 'Tank is full! Stop filling water.';
            alertMessage.style.color = 'green';
        } else {
            alertMessage.textContent = '';
        }
    }

    // Function to update the usage trends chart
    function updateUsageChart(trends) {
        usageChart.data.datasets[0].data = trends;
        usageChart.update();
    }

    // Initialize Chart.js for usage trends
    const ctx = document.getElementById('usage-chart').getContext('2d');
    const usageChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12'],
            datasets: [{
                label: 'Predicted Daily Water Consumption (Liters)',
                data: [], // Empty initially, updated dynamically
                borderColor: '#0078d4',
                backgroundColor: 'rgba(0, 120, 212, 0.2)',
                fill: true,
            }],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    // Periodically fetch data
    setInterval(fetchWaterLevel, 5000); // Fetch water level every 5 seconds
    fetchWaterLevel(); // Initial fetch
    fetchUsageTrends(); // Fetch usage trends on load
});
