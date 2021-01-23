from flask import Flask, send_from_directory

app = Flask(__name__)


@app.route("/")
def index():
    return "<h1>New South 4eva!</h1>"


@app.route("/test")
def test():
    return "<h1>Matt's learning Flask!</h1>\n Hello world!!"


@app.route("/json")
def test_json():
    return {"test": 1}


@app.route("/<path:path>")
def home(path):
    return send_from_directory("client/public", path)
