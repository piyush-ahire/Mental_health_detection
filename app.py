# app.py
from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from Node.js

# Load model
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['input']
    prediction = model.predict([np.array(data)])
    return jsonify({'prediction': int(prediction[0])})

if __name__ == '__main__':
    test_input = [5.1, 3.5, 1.4]  # change this for different inputs
    prediction = model.predict([test_input])
    print("Test Prediction:", prediction)
    app.run(debug=True)

