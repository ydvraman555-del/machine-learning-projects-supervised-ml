# Industrial Fabric Quality Inspection using Support Vector Machine (SVM)

🔗 **Live Demo:** https://stitchcore-ai.vercel.app/

This project focuses on predicting **Fabric Quality (High / Medium / Low)** using a Support Vector Machine (SVM) classification model applied to industrial textile inspection data.

---

## Project Overview

In industrial manufacturing, maintaining consistent fabric quality is critical for reducing defects and improving production efficiency.

The objective of this project is to:

- Analyze fabric inspection parameters such as:
  - Thread Count  
  - GSM  
  - Tensile Strength  
  - Shrinkage Percent  
  - Fabric Thickness  
  - Machine Temperature  
  - Humidity Level  
  - Defect Count  

- Build a **multi-class classification model**
- Predict fabric quality category:
  - High
  - Medium
  - Low

---

## Tools & Technologies

- Python  
- Pandas  
- NumPy  
- Matplotlib  
- Seaborn  
- Scikit-learn  
- Jupyter Notebook  
- Streamlit / Flask (Deployment)

---

## Project Workflow

1. Data Loading and Understanding  
2. Data Preprocessing  
   - Handling Missing Values (Median & Mode Imputation)  
3. Exploratory Data Analysis (EDA)  
4. Label Encoding (Categorical Features)  
5. Feature Selection (X, y)  
6. Train-Test Split (80-20)  
7. Feature Scaling (StandardScaler)  
8. Model Training (SVM)  
9. Model Evaluation  
10. Hyperparameter Tuning  
    - GridSearchCV  
    - RandomizedSearchCV  
11. Multi-Class ROC Curve & AUC Analysis  
12. Cross-Validation  
13. Model Deployment  

---

## Model Implemented

### Support Vector Classifier (SVC)
- Linear Kernel  
- RBF Kernel  
- Polynomial Kernel  
- Sigmoid Kernel  

---

## Evaluation Metrics

- Accuracy Score  
- Confusion Matrix  
- Precision  
- Recall  
- F1-Score  
- Cross Validation Score  
- ROC Curve (Multi-Class)  
- ROC–AUC Score  

---

## Results & Performance

### Base SVM Model Accuracy:
~ 92.85%

### After GridSearchCV Tuning:
~ 95.45% Test Accuracy  

Best Parameters (GridSearch):  
- C = 10  
- Kernel = Linear  

### RandomizedSearchCV Accuracy:
~ 94.36% Test Accuracy  

Best Parameters (RandomSearch):  
- Kernel = RBF  
- Gamma = 0.01  
- C = 1  

### Cross Validation Accuracy:
~ 92–95% (Stable across folds)

### Multi-Class ROC–AUC:
- Class 0 AUC ≈ 0.98  
- Class 1 AUC ≈ 0.98  
- Class 2 AUC ≈ 0.97  

---

## Visualizations Included

- Target Variable Distribution  
- Confusion Matrix  
- Multi-Class ROC Curve  
- Cross Validation Scores  
- Hyperparameter Comparison (GridSearch vs RandomSearch)  

---

## Key Insights

- Feature scaling significantly improved SVM performance.  
- Linear kernel performed best after tuning.  
- GridSearchCV provided slightly better performance than RandomSearch.  
- ROC-AUC analysis confirmed strong classification capability for all three classes.  
- Model generalizes well as cross-validation scores are consistent.  

---

## Conclusion

This project demonstrates a complete end-to-end multi-class classification workflow using Support Vector Machines, including preprocessing, feature engineering, hyperparameter tuning, and advanced evaluation techniques.

The final tuned SVM model achieved high accuracy and strong class separation, making it suitable for automated industrial fabric quality inspection systems.

---

## Future Improvements

- Apply advanced ensemble models (Random Forest, XGBoost, LightGBM)  
- Perform feature importance analysis  
- Handle potential class imbalance using resampling techniques  
- Integrate into a real-time industrial inspection system  
- Improve explainability using SHAP and model interpretation tools  

---

## Key Highlights

- End-to-end machine learning workflow  
- Multi-class classification problem  
- Advanced hyperparameter tuning  
- Strong ROC-AUC performance across all classes  
- Stable cross-validation performance  
- Real-world industrial dataset  
- Live deployed machine learning application  

---

## Acknowledgment

This project strengthened my understanding of Support Vector Machines, hyperparameter tuning, multi-class classification, ROC-AUC evaluation, cross-validation, and real-world industrial machine learning applications.
