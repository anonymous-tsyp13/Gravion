# Gravion

A smart hybrid renewable energy monitoring system developed for TSYP13 (Phase 1 submission). Gravion integrates solar, wind, and hydro power monitoring with AI-driven decision making for optimal energy management.

## Features

- **Real-time Energy Monitoring**
  - Solar power generation tracking
  - Wind energy production monitoring
  - Hydro power management
  - Live tank level monitoring

- **Smart AI Decision System**
  - Automated valve control based on energy conditions
  - Weather-aware power management
  - Predictive energy optimization

- **Weather Integration**
  - Real-time weather condition monitoring
  - Solar irradiance tracking
  - Wind speed monitoring
  - Temperature and humidity data

- **Interactive Dashboard**
  - Real-time energy production visualization
  - System status monitoring
  - Weather forecast integration
  - AI decision insights

## Technology Stack

- **Backend**: Python with Flask
- **Frontend**: HTML, CSS, JavaScript
- **Real-time Updates**: AJAX/JSON APIs
- **Visualization**: Dynamic charts and gauges

## Getting Started

1. Clone the repository
2. Install the required Python packages:
   ```
   pip install flask
   ```
3. Run the application:
   ```
   python app.py
   ```
4. Open a web browser and navigate to `http://localhost:5000`

## Project Structure

```
├── app.py              # Main Flask application
├── static/            
│   ├── css/           # Styling
│   └── js/            # Frontend scripts
└── templates/         
    ├── ai.html        # AI decisions page
    ├── base.html      # Base template
    ├── dashboard.html # Main dashboard
    └── forecast.html  # Weather forecast
```

## License

See the [LICENSE](LICENSE) file for details.
