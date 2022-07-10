from flask import Flask, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

@app.route("/chart-data", methods = ['POST'])
def hello_world():
    dates = request.json["dates"]
    spreads = request.json["spreads"]
    settings = request.json["settings"]
    with open('data/BCN/1990.json') as json_file:
        data = json.load(json_file)
        return {
            "username": "Alex",
            "theme": 1,
            "data": data,
            "request": request.data["dates"]
        }

@app.route("/tickers", methods = ['GET'])
def tickers():
    return {
        "tickers": os.listdir("data")
    }
