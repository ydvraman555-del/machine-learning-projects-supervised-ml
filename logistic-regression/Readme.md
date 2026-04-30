# Clean Energy Dominance Prediction using Logistic Regression

A machine learning classification project to predict whether a country’s electricity generation is dominated by clean energy sources using real-world global energy data.

---

## Project Overview

With the increasing global focus on sustainability, understanding clean energy adoption is crucial.  
This project builds a classification model to predict whether a country is clean-energy dominant based on energy composition, region, and temporal data.

The project follows a complete end-to-end machine learning pipeline, from data preprocessing to advanced model comparison.

---

## Problem Statement

The goal is to classify countries into:

- Clean Energy Dominant (True)  
- Not Clean Energy Dominant (False)  

based on features such as:

- Renewable energy percentage  
- Fossil fuel dependency  
- Electricity generation sources  
- Region and year  

---

## Tech Stack

- Programming: Python  
- Data Analysis: Pandas, NumPy  
- Visualization: Matplotlib, Seaborn  
- Machine Learning: Scikit-learn  
- Advanced Models: XGBoost, LightGBM, CatBoost  

---

## Workflow Pipeline

Data Collection → Data Cleaning → EDA → Encoding → Scaling → Train-Test Split → Model Training → Evaluation → Optimization

### Key Steps

- Handled missing values using median imputation  
- Applied Label Encoding for categorical variables  
- Performed feature scaling for improved performance  
- Used GridSearchCV for hyperparameter tuning  
- Applied threshold tuning for classification optimization  

---

## Models Implemented

### Baseline Model
- Logistic Regression  

### Advanced Models
- Random Forest Classifier  
- XGBoost Classifier  
- LightGBM Classifier  
- CatBoost Classifier  

### Ensemble Model
- Voting Classifier (Soft Voting)  

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
| Logistic Regression | ~70%     |
| Random Forest       | ~85%     |
| XGBoost             | ~92.8%   |
| CatBoost            | ~93.0%   |
| LightGBM            | ~96.9%   |
| Ensemble Model      | ~94.1%   |

---

## Key Insights

- Clean energy dominance is strongly linked to higher renewable energy percentage  
- Fossil fuel dependency shows a negative correlation with clean energy dominance  
- Logistic Regression provides a strong baseline but struggles with complex patterns  
- Boosting models such as LightGBM and XGBoost significantly improve performance  
- Ensemble learning improves robustness but may not outperform the best individual model  

---

## Visualizations

- Clean energy distribution (pie chart)  
- Renewable vs fossil energy scatter plot  
- Violin and box plots for distribution analysis  
- Region-wise clean energy comparison  
- Correlation heatmap  
- ROC-AUC curve  

---

## Model Optimization Techniques

- GridSearchCV for hyperparameter tuning  
- ROC-AUC evaluation  
- Threshold tuning for classification improvement  
- Comparison of multiple machine learning models  
- Ensemble learning approach  

---

## Conclusion

This project demonstrates how classification models can be used to analyze global energy trends and predict clean energy dominance.

It highlights the importance of feature relationships, the effectiveness of boosting algorithms, and the limitations of linear models in handling complex datasets.

---

## Future Improvements

- Deploy the model using Flask or Streamlit  
- Perform feature importance and SHAP analysis  
- Incorporate time-series analysis for trend prediction  
- Use additional datasets for improved generalization  

---

## Key Highlights

- End-to-end machine learning pipeline  
- Real-world dataset  
- Advanced model comparison  
- High accuracy with LightGBM (~96.9%)  
- Strong exploratory data analysis and visualization  

---

## Acknowledgment

This project strengthened my understanding of classification models, evaluation techniques, and real-world data preprocessing, along with practical experience in ensemble and boosting methods.
