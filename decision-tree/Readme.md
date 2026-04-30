# Calories Prediction of Indian Food using Decision Tree Regression

A machine learning regression project to predict the calorie content of Indian food items using nutritional attributes and tree-based models.

---

## Project Overview

With growing awareness about health and nutrition, estimating calorie intake is essential.  
This project builds regression models to predict calorie values of Indian food based on nutritional components such as carbohydrates, proteins, fats, sugar, fibre, and micronutrients.

The project includes both single-tree and ensemble-based approaches to compare model performance.

---

## Problem Statement

The objective is to predict:

- Calorie content (kcal) of food items  

using features such as:

- Carbohydrates, protein, fats  
- Free sugar and fibre  
- Sodium, calcium, iron  
- Vitamin C and folate  

---

## Tech Stack

- Programming: Python  
- Data Analysis: Pandas, NumPy  
- Visualization: Matplotlib, Seaborn, Plotly  
- Machine Learning: Scikit-learn  
- Advanced Models: XGBoost, LightGBM  

---

## Workflow Pipeline

Data Collection → Data Cleaning → EDA → Feature Selection → Train-Test Split → Model Training → Evaluation → Optimization

---

## Key Steps

- Handled missing values using median imputation  
- Performed extensive exploratory data analysis  
- Identified relationships between nutrients and calories  
- Applied train-test split (80:20)  
- Built Decision Tree regression model  
- Performed pruning to reduce overfitting  
- Used GridSearchCV for hyperparameter tuning  

---

## Models Implemented

### Baseline Model
- Decision Tree Regressor  

### Advanced Models
- Linear Regression  
- Ridge Regression  
- KNN Regressor  
- Support Vector Regressor (SVR)  
- Random Forest Regressor  
- Gradient Boosting Regressor  
- XGBoost Regressor  
- LightGBM Regressor  

---

## Evaluation Metrics

- R² Score  
- Mean Absolute Error (MAE)  
- Mean Squared Error (MSE)  
- Root Mean Squared Error (RMSE)  

---

## Results & Performance

| Model                | R² Score |
|---------------------|----------|
| Decision Tree       | ~0.987   |
| Linear Regression   | ~0.9986  |
| Ridge Regression    | ~0.9986  |
| XGBoost             | ~0.9969  |
| Random Forest       | ~0.9960  |
| LightGBM            | ~0.9958  |
| Gradient Boosting   | ~0.9957  |
| KNN                 | ~0.91    |
| SVR                 | Negative |

---

## Key Insights

- Fat has the strongest correlation with calories (~0.92), making it the most influential feature  
- Most dishes fall within the 100–300 kcal range, with some high-calorie outliers  
- Calorie distribution is right-skewed, indicating more low-calorie foods  
- Decision Tree achieves strong performance but shows signs of overfitting (Train R² = 1.0)  
- Pruning helps reduce overfitting while maintaining good performance  
- Ensemble models provide highly accurate and robust predictions  

---

## Visualizations

- Calories distribution and outlier detection  
- Fat vs calories relationship  
- Protein and fibre distribution analysis  
- Sugar vs calories comparison  
- Correlation heatmap of nutritional features  
- Actual vs predicted value comparison  
- Model performance comparison  

---

## Model Optimization Techniques

- Decision Tree pruning (max_depth, min_samples_leaf)  
- GridSearchCV for hyperparameter tuning  
- Model comparison across multiple regression algorithms  

---

## Conclusion

This project demonstrates how regression models can be used to estimate calorie values based on nutritional composition.

It highlights:
- The importance of fat content in determining calories  
- The effectiveness of tree-based models in capturing non-linear relationships  
- The superior performance of ensemble models for regression tasks  

---

## Future Improvements

- Deploy the model using Flask or Streamlit  
- Perform feature importance and SHAP analysis  
- Use deep learning models for regression  
- Expand dataset with more diverse food items  

---

## Key Highlights

- End-to-end regression pipeline  
- Real-world nutritional dataset  
- Strong exploratory data analysis  
- High model accuracy (R² ~0.99)  
- Comparison of multiple regression models  

---

## Acknowledgment

This project strengthened my understanding of regression models, decision trees, and ensemble learning techniques, along with practical experience in model tuning and real-world data analysis.
