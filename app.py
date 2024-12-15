from flask import Flask, jsonify, request
import random
import numpy as np
from sklearn.linear_model import LinearRegression
import pickle

app = Flask(__name__)

# Historical water usage data
historical_data = {
    "daily_consumption": [500, 600, 550, 700, 650, 600, 580],
    "days": [1, 2, 3, 4, 5, 6, 7]
}

# Load or train the predictive model
def train_model():
    X = np.array(historical_data['days']).reshape(-1, 1)
    y = np.array(historical_data['daily_consumption'])
    model = LinearRegression()
    model.fit(X, y)
    return model

try:
    with open('model.pkl', 'rb') as f:
        model = pickle.load(f)
except FileNotFoundError:
    model = train_model()
    with open('model.pkl', 'wb') as f:
        pickle.dump(model, f)

# Endpoint for current water level
@app.route('/api/water-level', methods=['GET'])
def get_water_level():
    level = random.randint(0, 100)  # Simulated water level
    return jsonify({"water_level": level})

# Endpoint for usage trends
@app.route('/api/usage-trends', methods=['GET'])
def get_usage_trends():
    future_days = np.array([8, 9, 10, 11, 12]).reshape(-1, 1)
    predictions = model.predict(future_days).tolist()
    return jsonify({"future_trends": predictions})

# Endpoint for sensor updates
@app.route('/api/update-water-level', methods=['POST'])
def update_water_level():
    data = request.get_json()
    new_level = data.get("water_level")
    if new_level is not None:
        return jsonify({"status": "success", "message": "Water level updated"})
    return jsonify({"status": "error", "message": "Invalid data"}), 400

from flask import Flask, jsonify
import random

app = Flask(__name__)

# Example endpoint to return random water level data
@app.route('/api/water-level', methods=['GET'])
def water_level():
    water_data = {
        "water_level": random.randint(10, 100)  # Random water level for demonstration
    }
    return jsonify(water_data)

# Example endpoint for predictions
@app.route('/api/usage-trends', methods=['GET'])
def usage_trends():
    trends = [random.randint(100, 300) for _ in range(5)]  # Example future trends
    return jsonify({"future_trends": trends})



if __name__ == '__main__':
    app.run(debug=True)
