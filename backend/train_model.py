import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report
import joblib

# 1. Load dataset
df = pd.read_csv("heart.csv")

# 2. Drop the clinical features patients won't know at home
hospital_features = ['restecg', 'oldpeak', 'slope', 'ca', 'thal']
df = df.drop(columns=hospital_features)

X = df.drop("target", axis=1)
y = df["target"]

# 3. Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Scale the data
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 5. NEW: Train a Gradient Boosting Model (Much smarter than Logistic Regression)
# We use a learning rate and limits on depth to prevent it from memorizing the tiny dataset
model = GradientBoostingClassifier(
    n_estimators=150, 
    learning_rate=0.05, 
    max_depth=3, 
    random_state=42
)
model.fit(X_train_scaled, y_train)

# 6. Evaluate
y_pred = model.predict(X_test_scaled)
accuracy = accuracy_score(y_test, y_pred)

print(f"--- UPGRADED AT-HOME MODEL RESULTS ---")
print(f"Accuracy on 8 features: {accuracy * 100:.2f}%")
print("--------------------------------------\n")

# 7. Save Model
joblib.dump(model, "heart_model_athome.pkl")
joblib.dump(scaler, "scaler_athome.pkl")
joblib.dump(list(X.columns), "model_columns_athome.pkl")

print("Gradient Boosting At-Home Model saved successfully!")