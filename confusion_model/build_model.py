from collections import Counter
import json
import os
import io
import datetime
import time
import operator
import pandas as pd
from azure.cognitiveservices.vision.face import FaceClient
from msrest.authentication import CognitiveServicesCredentials
from azure.cognitiveservices.vision.face.models import TrainingStatusType, Person
from xgboost import XGBClassifier, plot_tree, plot_importance
from sklearn.metrics import accuracy_score, log_loss
from sklearn.model_selection import train_test_split, GridSearchCV

KEY = os.environ["face_API_key"]
ENDPOINT = os.environ["face_API_Endpoint"]

def rate_faces(path):
    scores_dict = {}
    for filename in os.listdir(path):
        if filename.endswith('.txt'):
            continue
        file_key = filename[:-4]
        frame = open(path+filename, 'rb')
        face_client = FaceClient(ENDPOINT, CognitiveServicesCredentials(KEY))
        detected_faces = face_client.face.detect_with_stream(frame, return_face_attributes=["emotion"])
        if not detected_faces:
            continue
        else:
            face_emotions   = detected_faces[0].face_attributes.emotion
            scores = {}
            scores['anger']     = face_emotions.anger
            scores['contempt']  = face_emotions.contempt
            scores['disgust']   = face_emotions.disgust
            scores['fear']      = face_emotions.fear
            scores['happiness'] = face_emotions.happiness
            scores['neutral']   = face_emotions.neutral
            scores['sadness']   = face_emotions.sadness
            scores['surprise']  = face_emotions.surprise

        scores_dict[file_key] = scores

        time.sleep(0.2)

    return scores_dict


confused_man_scores = rate_faces(path='./images/confused_face_man/')
confused_woman_scores = rate_faces(path='./images/confused_face_woman/')
confused_scores = {}
for d in (confused_man_scores, confused_woman_scores):
    confused_scores.update(d)

man_scores = rate_faces(path='./images/face_man/')
woman_scores = rate_faces(path='./images/face_woman/')
normal_scores = {}
for d in (man_scores, woman_scores):
    normal_scores.update(d)


confused_df = pd.DataFrame.from_dict(confused_scores, orient='index')
confused_df['confused'] = 1

normal_df = pd.DataFrame.from_dict(normal_scores, orient='index')
normal_df['confused'] = 0

data = pd.concat([confused_df, normal_df]).sample(frac=1)

features = list(set(data.columns) - {'confused'})

X_train = data[features]
Y_train = data['confused']

# hyperparameters chosen from gridsearch with 3 folds for cross validation
model = XGBClassifier(max_depth = 3,
                     learning_rate = 0.1,
                     reg_lambda = 10,
                     n_estimators = 25)

model.fit(X_train, Y_train)

model.save_model('bdt.model')
