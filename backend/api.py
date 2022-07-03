from flask import Flask
import json

app = Flask(__name__)

@app.route("/")
def hello_world():
    with open('data/1990.json') as json_file:
        data = json.load(json_file)
        return {
            "username": "Alex",
            "theme": 1,
            "data": data
        }