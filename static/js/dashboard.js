// Initialize the energy production chart
const ctx = document.getElementById('energyChart').getContext('2d');
let energyChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Solar',
                data: [],
                borderColor: '#ff8f00',
                tension: 0.4
            },
            {
                label: 'Wind',
                data: [],
                borderColor: '#00bcd4',
                tension: 0.4
            },
            {
                label: 'Water',
                data: [],
                borderColor: '#4caf50',
                tension: 0.4
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#b3b3b3'
                }
            },
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#b3b3b3'
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#b3b3b3'
                }
            }
        }
    }
});

// Function to update the chart with new data
function updateChart(solarValue, windValue, waterValue) {
    const now = new Date();
    const timeLabel = now.toLocaleTimeString();

    energyChart.data.labels.push(timeLabel);
    energyChart.data.datasets[0].data.push(solarValue);
    energyChart.data.datasets[1].data.push(windValue);
    energyChart.data.datasets[2].data.push(waterValue);

    // Keep only the last 10 data points
    if (energyChart.data.labels.length > 10) {
        energyChart.data.labels.shift();
        energyChart.data.datasets.forEach(dataset => dataset.data.shift());
    }

    energyChart.update();
}

// Function to update the sensor stream
function updateSensorStream(data) {
    const streamDiv = document.getElementById('sensorData');
    const timestamp = new Date().toLocaleTimeString();
    const newData = `[${timestamp}] Solar: ${data.energy.solar}kW, Wind: ${data.energy.wind}kW, Water: ${data.energy.water}kW\n`;
    
    streamDiv.innerHTML = newData + streamDiv.innerHTML;
    
    // Keep only the last 5 entries
    const entries = streamDiv.innerHTML.split('\n');
    if (entries.length > 5) {
        streamDiv.innerHTML = entries.slice(0, 5).join('\n');
    }
}

// Function to update tank levels with animation
function updateTankLevels(upperLevel, lowerLevel) {
    const upperTank = document.getElementById('upperTankLevel');
    const lowerTank = document.getElementById('lowerTankLevel');

    upperTank.style.height = `${upperLevel}%`;
    upperTank.querySelector('.tank-percentage').textContent = `${upperLevel}%`;
    
    lowerTank.style.height = `${lowerLevel}%`;
    lowerTank.querySelector('.tank-percentage').textContent = `${lowerLevel}%`;
}

// Function to update valve status
function updateValveStatus(isOpen) {
    const valve = document.getElementById('valveStatus');
    valve.className = `valve-indicator ${isOpen ? 'open' : 'closed'}`;
    valve.textContent = isOpen ? 'Valve Open' : 'Valve Closed';
}

// Function to update AI decision countdown
let countdownInterval;
function updateAICountdown(seconds) {
    clearInterval(countdownInterval);
    const countdownElement = document.getElementById('nextDecision');
    let timeLeft = seconds;

    countdownInterval = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

// Function to update weather information
function updateWeather(weather) {
    document.getElementById('temperature').textContent = `${weather.temperature}°C`;
    document.getElementById('windSpeed').textContent = `${weather.wind_speed} m/s`;
    document.getElementById('solarIrradiance').textContent = `${weather.solar_irradiance} W/m²`;
    document.getElementById('humidity').textContent = `${weather.humidity}%`;
}

// Main function to fetch and update all data
function updateDashboard() {
    fetch('/api/update-data')
        .then(response => response.json())
        .then(data => {
            // Update energy values
            document.getElementById('solarValue').textContent = data.energy.solar;
            document.getElementById('windValue').textContent = data.energy.wind;
            document.getElementById('waterValue').textContent = data.energy.water;
            document.getElementById('totalValue').textContent = 
                (data.energy.solar + data.energy.wind + data.energy.water).toFixed(2);

            // Update chart
            updateChart(data.energy.solar, data.energy.wind, data.energy.water);

            // Update tank levels
            updateTankLevels(data.tanks.upper, data.tanks.lower);

            // Update valve status
            updateValveStatus(data.ai.valve_status);

            // Update AI decision
            document.getElementById('aiDecision').textContent = data.ai.decision;
            updateAICountdown(data.ai.next_decision);

            // Update weather
            updateWeather(data.weather);

            // Update sensor stream
            updateSensorStream(data);
        })
        .catch(error => console.error('Error updating dashboard:', error));
}

// Sidebar toggle functionality
document.getElementById('sidebarCollapse').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('content').classList.toggle('active');
});

// Initialize updates
updateDashboard();
setInterval(updateDashboard, 5000); // Update every 5 seconds