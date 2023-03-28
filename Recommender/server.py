from flask import Flask
import firebase_admin
from firebase_admin import credentials, firestore, auth
import pandas as pd

# For not displaying the warning by pandas library
import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)

app = Flask(__name__)

# Use a service account
cred = credentials.Certificate('serviceAccountKey.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

# IMPORTANT to edit
items=['iPad', 'monitor', 'echo', 'watch', 'mixer', 'lean', 'weights', 'breath', 'walker']

# Make a ratings list with all the ratings of order appended to a single list for the specified user. 
def getRatingsList(id):
    doc_ref = db.collection('users').document(id).collection('orders')

    docs = doc_ref.stream()

    ratings = []

    for doc in docs:
        prodict = doc.to_dict()
        ratings = ratings + prodict.get("ratings")
        
    return ratings

# Makes a dictionary of {item : rating} for the user with ID = id
def makeDict(id):
    tempDict = {}
    ratings = getRatingsList(id)
    itemList = []
    
    for i in range(0, len(ratings), 2):
        if (ratings[i] in itemList):
            continue
        else:
            tempDict[ratings[i]] = ratings[i+1]
            itemList.append(ratings[i])
      
    return tempDict

# Getting a list of users
page = auth.list_users()
users = []
for user in auth.list_users().iterate_all():
    users.append(user.uid)

# Data for making recommendations
df = pd.DataFrame(columns=['User', 'Item', 'Rating'])

# Making a dataframe with of purchase history and ratings for all users.
for id in users:
    for item in items:
        tempDict = makeDict(id)
        if item in tempDict.keys():
            df2 = {'User': id, 'Item': item, 'Rating': tempDict[item]}
            df = df.append(df2, ignore_index=True)
            
df = df.set_index('User')

# Creating a pivot table and filling na values with 0.
df_pivot_table = df.pivot_table(index=["User"], columns=["Item"], values="Rating").fillna(0)

# Making a pearson correlation matrix
similarity_matrix = df_pivot_table.corr(method='pearson')

# Function to get recommendation based on an item and rating
def getRecommendations(item, rating):
    similarity_score = similarity_matrix[item]*(rating-2.5)
    similarity_score = similarity_score.sort_values(ascending=False)
    
    return similarity_score

# Recommendation API route
@app.route("/recList/<id>")
def itemRecs(id):
    if (id != 'noUser'):
        recommendations = pd.DataFrame()  # DF to be populated
        customDict = makeDict(id)  # Purchase history of user

        for item in customDict.keys():
            recommendations = recommendations.append(getRecommendations(item, customDict[item]), ignore_index=True)

        recs = list(recommendations.sum().sort_values(ascending=False).index)
        
        data = {u'items': recs}
        
        db.collection(u'users').document(id).collection('recommendations').document('list').set(data)
        
        return recs
    else:
        return ''

if __name__ == "__main__":
    app.run(debug=True)