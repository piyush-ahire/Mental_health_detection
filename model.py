# model.py
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import pickle

# Load dataset
data = pd.read_csv('dataset1.csv')  # Ensure dataset.csv is in the same directory

# Basic example assuming binary classification
X = data.drop('target', axis=1)  # Replace 'target' with your label column
y = data['target']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save model
with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)

print("Model Accuracy:", model.score(X_test, y_test))
