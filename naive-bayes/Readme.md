# Prediction of Stress-Relief Gaming Behavior using Naive Bayes

A machine learning classification project to predict whether students play games for stress relief using behavioral, academic, and lifestyle data.

---

## Project Overview

Gaming is often used by students as a coping mechanism for academic stress.  
This project builds a classification model to identify whether a student uses gaming for stress relief based on personal habits, academic performance, and emotional factors.

The project follows a complete end-to-end machine learning pipeline, including preprocessing, modeling, evaluation, and optimization.

---

## Problem Statement

The objective is to classify students into:

- Plays games for stress relief (Yes)  
- Does not play games for stress relief (No)  

based on features such as:

- Age, gender, and education level  
- CGPA and academic performance  
- Gaming habits and time spent  
- Sleep patterns and daily routine  
- Emotional responses and lifestyle factors  

---

## Tech Stack

- Programming: Python  
- Data Analysis: Pandas, NumPy  
- Visualization: Matplotlib, Seaborn, Plotly  
- Machine Learning: Scikit-learn  
- Advanced Models: XGBoost, LightGBM, CatBoost  

---

## Workflow Pipeline

Data Collection → Data Cleaning → EDA → Encoding → Feature Engineering → Train-Test Split → Model Training → Evaluation → Optimization

---

## Key Steps

- Handled missing values using median (numerical) and mode (categorical) imputation  
- Applied one-hot encoding for categorical variables  
- Performed exploratory data analysis to understand behavior patterns  
- Split dataset into training and testing sets (80:20)  
- Applied Bernoulli Naive Bayes for classification  
- Used RandomizedSearchCV and GridSearchCV for tuning  

---

## Models Implemented

### Baseline Model
- Bernoulli Naive Bayes  

### Advanced Models
- Logistic Regression  
- Decision Tree  
- Random Forest  
- Gradient Boosting  
- AdaBoost  
- XGBoost  
- LightGBM  
- CatBoost  

---

## Evaluation Metrics

- Accuracy Score  
- Precision  
- Recall  
- F1 Score  
- Confusion Matrix  
- ROC-AUC Score  

---

## Results & Performance

| Model                | Accuracy |
|---------------------|----------|
| Naive Bayes         | ~56%     |
| Logistic Regression | ~61%     |
| Decision Tree       | ~64%     |
| Gradient Boosting   | ~75%     |
| Random Forest       | ~83%     |
| XGBoost             | ~81%     |
| CatBoost            | ~81%     |
| LightGBM            | ~85% (Best) |

---

## Key Insights

- The target variable is fairly balanced, enabling reliable classification  
- Students aged 20–25 dominate the dataset  
- Higher gaming time is associated with increased likelihood of stress-relief usage  
- Excessive gaming may slightly impact academic performance (CGPA)  
- Students using gaming for stress relief tend to spend more time playing  
- Naive Bayes performs moderately but struggles with complex feature relationships  
- Ensemble and boosting models significantly outperform Naive Bayes  

---

## Visualizations

- Target variable distribution  
- Age and CGPA distribution  
- Gender distribution analysis  
- Gaming time vs CGPA relationship  
- Sleep pattern distribution  
- Stress relief vs gaming time analysis  
- Fatigue vs gaming behavior  
- Model accuracy comparison  

---

## Model Optimization Techniques

- RandomizedSearchCV for parameter tuning  
- GridSearchCV for fine optimization  
- ROC-AUC evaluation  
- Comparison of multiple machine learning models  

---

## Conclusion

This project demonstrates how classification models can be applied to understand behavioral patterns in students and their stress management strategies.

It highlights:
- The role of lifestyle and emotional factors in gaming behavior  
- The limitations of Naive Bayes in complex datasets  
- The effectiveness of ensemble and boosting techniques  

---

## Future Improvements

- Apply feature selection techniques for better performance  
- Perform deep learning-based classification  
- Deploy the model using Flask or Streamlit  
- Collect larger and more diverse datasets  

---

## Key Highlights

- End-to-end machine learning pipeline  
- Real-world behavioral dataset  
- Strong exploratory data analysis  
- Model comparison across multiple algorithms  
- Best performance achieved with LightGBM (~85%)  

---

## Acknowledgment

This project strengthened my understanding of probabilistic models like Naive Bayes, classification techniques, and real-world data preprocessing, along with practical exposure to model tuning and performance comparison.
