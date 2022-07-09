from flask import Flask
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route("/chart-data", methods = ['POST'])
def hello_world():
    with open('data/BCN/1990.json') as json_file:
        data = json.load(json_file)
        return {
            "username": "Alex",
            "theme": 1,
            "data": data
        }