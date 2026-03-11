Disaster Severity Prediction using K-Nearest Neighbors (KNN)

This project focuses on predicting whether a disaster becomes a Major Disaster or Non-Major Disaster using the K-Nearest Neighbors (KNN) classification algorithm on global disaster event data.

Project Overview

The objective of this project is to analyze disaster-related factors and build a machine learning model to predict disaster severity.

Key factors analyzed include:

Severity Level

Affected Population

Estimated Economic Loss

Infrastructure Damage Index

Response Time

Disaster Type

Aid Provided

Location

Year

Geographic Coordinates

The model helps identify high-impact disasters, which can assist authorities in better risk assessment and disaster response planning.

Tools & Technologies

Python

Pandas

NumPy

Matplotlib

Seaborn

Plotly

Scikit-learn

Jupyter Notebook

Workflow

Data loading and understanding

Data cleaning and preprocessing

Handling missing values (Median & Mode Imputation)

Exploratory Data Analysis (EDA)

Feature encoding (Label Encoding)

Feature scaling using StandardScaler

Train-test split (80-20)

Model training and evaluation

Model Implemented

K-Nearest Neighbors (KNN) Classifier

KNN classifies disaster events based on the majority class of the nearest neighboring data points in the feature space.

Evaluation Metrics

Accuracy Score

Precision

Recall

F1 Score

Confusion Matrix

Cross-Validation Score

ROC Curve

ROC-AUC Score

Results & Insights

The KNN model successfully classified disaster events with stable performance across training and testing datasets.

Feature scaling significantly improved model performance since KNN relies on distance calculations.

Cross-validation results showed consistent model behavior across folds, indicating good generalization capability.

Visualizations Included

Target variable distribution

Disaster type distribution

Year-wise disaster trends

Response time analysis

Infrastructure damage vs economic loss analysis

Disaster frequency heatmap

Confusion matrix

ROC curve

Conclusion

This project demonstrates a complete end-to-end machine learning pipeline using the K-Nearest Neighbors algorithm for disaster severity prediction.

The workflow includes:

Data preprocessing

Exploratory data analysis

Feature engineering

Model training

Performance evaluation

The model provides insights into disaster severity patterns and can support data-driven disaster management strategies.

Future Improvements

Apply advanced models such as Random Forest, XGBoost, and LightGBM

Handle potential class imbalance using SMOTE

Perform feature importance analysis

Deploy the model using Streamlit or Flask
