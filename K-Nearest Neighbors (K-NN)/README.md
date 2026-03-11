Disaster Severity Prediction using K-Nearest Neighbors (KNN)

This project focuses on predicting whether a disaster event becomes a Major Disaster (1) or Non-Major Disaster (0) using a K-Nearest Neighbors (KNN) classification model applied to global disaster event data.

Project Overview

Natural disasters cause significant human and economic losses. Early identification of high-severity disaster events can help governments and organizations allocate resources efficiently and improve emergency response strategies.

The objective of this project is to:

Analyze disaster-related parameters such as:

Severity Level

Affected Population

Estimated Economic Loss (USD)

Infrastructure Damage Index

Response Time (Hours)

Disaster Type

Aid Provided

Location

Year

Geographic Coordinates (Latitude & Longitude)

Build a binary classification model to predict:

0 → Non-Major Disaster

1 → Major Disaster

Tools & Technologies

Python

Pandas

NumPy

Matplotlib

Seaborn

Plotly

Scikit-learn

Jupyter Notebook

Project Workflow
1️⃣ Data Loading and Understanding

Imported disaster event dataset

Explored dataset structure using:

.head()

.info()

.describe()

.shape()

2️⃣ Data Preprocessing

Handling missing values:

Numerical columns filled using Median Imputation

Severity Level

Affected Population

Estimated Economic Loss

Infrastructure Damage Index

Categorical columns filled using Mode Imputation

Disaster Type

3️⃣ Exploratory Data Analysis (EDA)

Several visualizations were created to understand patterns in the dataset.

Visualizations include:

Disaster Type Distribution (Bar Chart)

Major vs Non-Major Disaster Distribution (Pie Chart)

Year-wise Disaster Trend (Line Chart)

Response Time by Disaster Type (Box Plot)

Global Disaster Hotspots (Geo Scatter Plot)

Severity vs Economic Loss (Bubble Plot)

Aid Distribution (Donut Chart)

Infrastructure Damage vs Economic Loss

Disaster Frequency Heatmap (Year vs Type)

Probability of Major Disaster by Severity

Parallel Coordinates Plot for multivariate analysis

These visualizations helped reveal relationships between disaster severity, population impact, economic loss, and disaster classification.

4️⃣ Feature Encoding

Categorical variables were converted into numerical format using Label Encoding

Encoded features:

Disaster Type

Location

Aid Provided

5️⃣ Feature Selection

Features (X):

All variables except the target column.

Target Variable (y):

is_major_disaster
6️⃣ Train-Test Split

Dataset split into:

80% Training Data

20% Testing Data

Using:

train_test_split(test_size=0.2, random_state=42)
7️⃣ Feature Scaling

Since KNN is a distance-based algorithm, feature scaling is essential.

Used:

StandardScaler

to normalize numerical features.

Model Implemented
K-Nearest Neighbors Classifier

KNN classifies a new data point based on the majority class among its nearest neighbors in the feature space.

Implemented using:

KNeighborsClassifier()
Hyperparameter Tuning

Two tuning methods were used to optimize the model.

GridSearchCV

Parameters explored:

n_neighbors

weights

algorithm

p (distance metric)

GridSearchCV finds the best parameter combination through exhaustive search.

RandomizedSearchCV

Random combinations of parameters were tested to find a near-optimal solution faster.

Evaluation Metrics

Model performance was evaluated using:

Accuracy Score

Classification Report

Precision

Recall

F1-Score

Confusion Matrix

Cross-Validation Score

ROC Curve

ROC–AUC Score

Model Performance
Base KNN Model

Evaluated using Accuracy Score and Classification Report.

Cross-Validation

Used 5-Fold Cross Validation to ensure model stability.

cross_val_score(model, X_train, y_train, cv=5)

This helps verify that the model performs consistently across different data splits.

ROC Curve & AUC

ROC Curve was plotted to evaluate the model’s classification capability.

True Positive Rate vs False Positive Rate

AUC Score measures overall model performance

A higher AUC indicates better classification performance.

Visualizations Included

Missing Value Heatmap

Disaster Type Distribution

Major vs Non-Major Disaster Pie Chart

Year-wise Disaster Trend

Disaster Response Time Analysis

Global Disaster Map

Infrastructure Damage vs Economic Loss

Disaster Frequency Heatmap

Confusion Matrix

ROC Curve

Key Insights

Disaster severity and infrastructure damage strongly influence whether an event becomes a major disaster.

Higher economic loss and affected population correlate with major disaster classification.

Feature scaling significantly improves KNN performance because the algorithm relies on distance calculations.

Cross-validation scores confirm the model performs consistently across folds.

Conclusion

This project demonstrates an end-to-end machine learning pipeline using the K-Nearest Neighbors algorithm for disaster severity prediction.

The workflow includes:

Data preprocessing

Exploratory data analysis

Feature engineering

Model training

Hyperparameter tuning

Performance evaluation

The final KNN model provides a reliable method for identifying high-impact disaster events, which could help improve disaster preparedness and response planning.

Future Improvements

Apply advanced models such as:

Random Forest

XGBoost

LightGBM

Perform feature importance analysis

Handle potential class imbalance using SMOTE

Deploy the model using:

Streamlit

Flask

Integrate with real-time disaster monitoring systems
