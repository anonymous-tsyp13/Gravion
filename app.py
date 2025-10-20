from flask import Flask, render_template, jsonify
import random
from datetime import datetime, timedelta
import time

app = Flask(__name__)

# Mock data generation functions
def generate_energy_data():
    return {
        'solar': round(random.uniform(2.5, 5.0), 2),
        'wind': round(random.uniform(1.8, 4.2), 2),
        'water': round(random.uniform(1.0, 2.5), 2)
    }

def generate_tank_levels():
    return {
        'upper': round(random.uniform(60, 95), 1),
        'lower': round(random.uniform(20, 40), 1)
    }

def generate_weather_forecast():
    conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain']
    return {
        'temperature': round(random.uniform(18, 28), 1),
        'wind_speed': round(random.uniform(5, 15), 1),
        'solar_irradiance': round(random.uniform(400, 800), 0),
        'humidity': round(random.uniform(40, 80), 1),
        'condition': random.choice(conditions)
    }

def generate_ai_decision():
    weather = generate_weather_forecast()
    energy = generate_energy_data()
    
    # Mock AI logic
    if weather['solar_irradiance'] > 600 and weather['wind_speed'] < 8:
        decision = "Maintaining valve closure - Sufficient solar energy available"
        valve_status = False
    else:
        decision = "Opening valve - Supplementing with hydro power"
        valve_status = True
    
    return {
        'decision': decision,
        'valve_status': valve_status,
        'next_decision': round(random.uniform(30, 60), 0)
    }

# Routes
@app.route('/')
def dashboard():
    return render_template('dashboard.html',
                         energy_data=generate_energy_data(),
                         tank_levels=generate_tank_levels(),
                         weather=generate_weather_forecast(),
                         ai_status=generate_ai_decision())

@app.route('/forecast')
def forecast():
    forecasts = []
    current_time = datetime.now()
    
    for i in range(24):  # 24-hour forecast
        time_point = current_time + timedelta(hours=i)
        forecast = generate_weather_forecast()
        forecast['time'] = time_point.strftime('%H:00')
        forecasts.append(forecast)
    
    return render_template('forecast.html', forecasts=forecasts)

@app.route('/ai')
def ai_dashboard():
    decisions = []
    current_time = datetime.now()
    
    for _ in range(10):  # Last 10 decisions
        decision = generate_ai_decision()
        decision['timestamp'] = (current_time - timedelta(minutes=random.randint(5, 60))).strftime('%H:%M')
        decisions.append(decision)
    
    return render_template('ai.html', decisions=decisions)

@app.route('/api/update-data')
def update_data():
    """API endpoint for real-time updates"""
    return jsonify({
        'energy': generate_energy_data(),
        'tanks': generate_tank_levels(),
        'weather': generate_weather_forecast(),
        'ai': generate_ai_decision()
    })

if __name__ == '__main__':
    app.run(debug=True)