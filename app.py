from flask import Flask, send_from_directory
import json

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


@app.route("/current_data")
def send_current_data():
    return {"users": {"total": 10, "happy": 1, "confused": 9, "active": 10},
            "commands": {"slow": 1, "muted": 0}
            }


@app.route("/send_data", methods=["POST"])
def update_data():
    given_data = json.loads(request.data)
    print(given_data)
    return


if __name__ == "__main__":
    app.run(debug=True)
