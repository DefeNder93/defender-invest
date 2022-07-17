from flask import Flask, request
from flask_cors import CORS
import json
import os
from spreads import Spreads

app = Flask(__name__)
CORS(app)

@app.route("/chart-data", methods = ['POST'])
def hello_world():
    # TODO взять config-backtester из crypto api и переработать, на FE должен быть 1 чарт и панель с настройками ( попробовать обойтись этим )
    spread = Spreads()
    spread.test()
    # dates = request.json["dates"]
    # spreads = request.json["spreads"]
    # settings = request.json["settings"]
    with open('data/BCN/1990.json') as json_file:
        with open('data/GOG/1990.json') as json_file2:
            data = json.load(json_file)
            data2 = json.load(json_file2)
            return {
                "spreads": [data, data2],
                # "request": request.data["dates"]
            }

@app.route("/tickers", methods = ['GET'])
def tickers():
    return {
        "tickers": os.listdir("data")
    }
