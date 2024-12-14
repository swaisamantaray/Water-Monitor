import numpy as np
from sklearn.linear_model import LinearRegression
import pickle

# Data for training
days = np.array([1, 2, 3, 4, 5, 6, 7]).reshape(-1, 1)
daily_consumption = np.array([500, 600, 550, 700, 650, 600, 580])

# Train the model
model = LinearRegression()
model.fit(days, daily_consumption)

# Save the model
with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)
