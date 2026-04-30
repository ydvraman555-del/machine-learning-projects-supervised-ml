# Eco-Friendly Logistics Prediction using Random Forest Classification

A machine learning classification project to predict whether a logistics route is eco-friendly based on operational, environmental, and transportation factors.

---

## Project Overview

With increasing emphasis on sustainability, optimizing logistics operations for minimal environmental impact is essential.  
This project builds a classification model to identify whether a delivery route is eco-friendly using features such as vehicle type, distance, traffic conditions, and carbon emissions.

The project follows an end-to-end machine learning workflow including preprocessing, modeling, evaluation, and optimization.

---

## Problem Statement

The objective is to classify logistics operations into:

- Eco-Friendly (1)  
- Not Eco-Friendly (0)  

based on features such as:

- Origin and destination  
- Vehicle type and route type  
- Distance and package weight  
- Traffic conditions  
- Carbon emissions  

---

## Tech Stack

- Programming: Python  
- Data Analysis: Pandas, NumPy  
- Visualization: Matplotlib, Seaborn, Plotly  
- Machine Learning: Scikit-learn  
- Advanced Models: XGBoost, LightGBM, CatBoost  

---

## Workflow Pipeline

Data Collection → Data Cleaning → EDA → Feature Engineering → Encoding → Train-Test Split → Model Training → Evaluation → Optimization

---

## Key Steps

- Handled missing values using median (numerical) and mode (categorical) imputation  
- Applied One-Hot Encoding for categorical features  
- Built pipeline using ColumnTransformer and Random Forest  
- Performed train-test split (70:30)  
- Trained Random Forest Classifier  
- Evaluated using classification metrics and ROC-AUC  
- Performed hyperparameter tuning using GridSearchCV  
- Applied cross-validation for model stability  
- Implemented threshold tuning for performance optimization  

---

## Models Implemented

### Baseline Model
- Random Forest Classifier  

### Comparative Models
- Logistic Regression  
- K-Nearest Neighbors  
- Support Vector Machine (SVM)  
- Decision Tree  
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

- Random Forest Accuracy: **~94.9%** :contentReference[oaicite:1]{index=1}  
- ROC-AUC Score: **~0.9899** :contentReference[oaicite:2]{index=2}  
- Cross-Validation AUC: **~0.9900** :contentReference[oaicite:3]{index=3}  

### Model Comparison (Accuracy)

| Model                | Accuracy |
|---------------------|----------|
| Decision Tree       | ~95.0% |
| CatBoost            | ~95.0% |
| AdaBoost            | ~95.0% |
| Gradient Boosting   | ~95.0% |
| XGBoost             | ~94.9% |
| Logistic Regression | ~94.4% |
| LightGBM            | ~94.3% |
| KNN                 | ~86.2% |
| SVM                 | ~66.4% |

---

## Key Insights

- According to the analysis (pages 8–14), eco-friendly deliveries are slightly fewer but fairly balanced  
- Eco-friendly routes have significantly lower carbon emissions compared to non-eco routes  
- As shown in the scatter plot (page 9), emissions increase with distance, indicating a strong positive relationship  
- Electric vehicles, cargo bicycles, and drone deliveries show the highest eco-friendly rates  
- Urban last-mile routes are more likely to be eco-friendly  
- Severe traffic conditions increase carbon emissions  
- Shorter distances are more associated with eco-friendly deliveries  
- Distance and carbon emissions have a very strong positive correlation (page 15)  
- Ensemble and boosting models perform slightly better than standalone models  

---

## Visualizations

- Target class distribution  
- Carbon emission vs eco-friendly classification  
- Distance vs emissions relationship  
- Vehicle type vs eco-friendly rate  
- Route type vs eco-friendly probability  
- Traffic condition impact analysis  
- Correlation heatmap  
- Interactive Plotly visualizations  
- ROC-AUC curve  

---

## Model Optimization Techniques

- GridSearchCV for hyperparameter tuning  
- Cross-validation for model robustness  
- Threshold tuning for optimal classification  
- Pipeline-based preprocessing and modeling  

---

## Conclusion

This project demonstrates how machine learning can be applied to optimize logistics operations for environmental sustainability.

It highlights:
- The importance of emission-related features  
- The effectiveness of Random Forest and ensemble models  
- The impact of operational factors like distance and traffic on sustainability  

---

## Future Improvements

- Deploy the model as a real-time logistics decision system  
- Integrate live traffic and route APIs  
- Apply deep learning models for improved prediction  
- Extend to multi-objective optimization (cost + sustainability)  

---

## Key Highlights

- End-to-end classification pipeline  
- Real-world logistics dataset  
- High accuracy (~95%) and strong ROC-AUC (~0.99)  
- Advanced model comparison  
- Strong exploratory data analysis  

---

## Acknowledgment

This project strengthened my understanding of ensemble learning techniques, classification models, and real-world data preprocessing, along with practical experience in model optimization and evaluation.
