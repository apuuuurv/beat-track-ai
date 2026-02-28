from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the NEW "At-Home" models
model = joblib.load("heart_model_athome.pkl")
scaler = joblib.load("scaler_athome.pkl")
model_columns = joblib.load("model_columns_athome.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        
        # Validate keys based on the new 8-feature list
        missing_keys = [col for col in model_columns if col not in data]
        if missing_keys:
            return jsonify({"error": f"Missing data for features: {missing_keys}"}), 400

        input_df = pd.DataFrame([data], columns=model_columns)
        input_scaled = scaler.transform(input_df)

        prediction = model.predict(input_scaled)[0]
        probability = model.predict_proba(input_scaled)[0][1]

        if probability < 0.40:
            risk = "Low"
            recommendation = "Maintain healthy diet and exercise daily."
        elif probability < 0.65:
            risk = "Medium"
            recommendation = "Consult a doctor for a routine checkup."
        else:
            risk = "High"
            recommendation = "Seek medical evaluation to discuss these symptoms."

        return jsonify({
            "prediction": int(prediction),
            "risk": risk,
            "probability": float(probability),
            "recommendation": recommendation
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)