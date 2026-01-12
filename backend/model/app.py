import streamlit as st
import joblib
import numpy as np

model = joblib.load('logistic_model.pkl')
scaler = joblib.load('scaler.pkl')

st.title("Cardiovascular Disease Prediction")
st.write("Enter patient health details")

age = st.number_input("Age (in years)", 18 , 100)
gender = st.selectbox("Gender" , ["Female" , "Male"])
height = st.number_input("Height (in cm)" , 120 , 220)
weight = st.number_input("Weight (in kg)" , 30 , 200)
ap_hi = st.number_input("Systolic Blood Pressure (ap_hi)" , 80 , 250)
ap_lo = st.number_input("Diastolic Blood Pressure (ap_lo)" , 40 , 150)

cholesterol = st.selectbox("Cholesterol Level", [1, 2, 3])
gluc = st.selectbox("Glucose Level", [1, 2, 3])

smoke = st.selectbox("Smoking", [0, 1])
alco = st.selectbox("Alcohol Intake", [0, 1])
active = st.selectbox("Physical Activity", [0, 1])

gender = 1 if gender == "Male" else 0

bmi = weight / ((height / 100) ** 2)

if st.button("Predict"):
    input_data = np.array([[age , gender , height , weight , ap_hi , ap_lo , cholesterol , gluc , smoke , alco , active , bmi]])

    input_scaled = scaler.transform(input_data)

    prediction = model.predict(input_scaled)
    probability = model.predict_proba(input_scaled)

    if prediction[0] == 1:
        st.error(f"⚠️ High Risk of Heart Disease\nProbability: {probability[0][1]*100:.2f}%")
    else:
        st.success(f"✅ Low Risk of Heart Disease\nProbability: {probability[0][0]*100:.2f}%")