from flask import Flask, request
from flask_cors import CORS
import json
import os
from spreads import Spreads
from config_backtester import ConfigBacktester

app = Flask(__name__)
CORS(app)

@app.route("/chart-data", methods = ['POST'])
def hello_world():
    # TODO взять config-backtester из crypto api и переработать, на FE должен быть 1 чарт и панель с настройками ( попробовать обойтись этим )
    spread = Spreads()
    spread.test()
    dates = request.json["dates"]  # {startDate: "2022-07-12", endDate: "2022-07-31", firstYear: 1992, lastYear: 1994}
    spreads = request.json["spreads"]  # [{leg1: "BCN", leg2: "GOG", leg1_price_multiplier: 1, leg2_price_multiplier: 10}]
    settings = request.json["settings"]  # {normalize: false, percents: true, smaLen: 5}

    algo = ConfigBacktester()
    algo.init(dates, spreads, settings)
    results = algo.run()
    algo.analyze_results(results)
    print('Finished')

    data = algo.get_fe_data()
    return {
        "data": data
    }

# local storage for test: di-spreads-params => {"dates":{"startDate":"2022-08-12T21:00:00.000Z","endDate":"2022-08-11T21:00:00.000Z","firstYear":1994,"lastYear":2021},"spreads":[{"leg1":"GOQ","leg2":"BCN","leg1_price_multiplier":1,"leg2_price_multiplier":10}],"settings":{"normalize":false,"percents":true,"smaLen":5}}

@app.route("/tickers", methods = ['GET'])
def tickers():
    return {
        "tickers": os.listdir("data")
    }
