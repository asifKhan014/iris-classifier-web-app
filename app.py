from flask_cors import CORS
from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)
model = joblib.load('iris_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    prediction = model.predict(np.array([data['features']]))
    return jsonify({'prediction': int(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True)
