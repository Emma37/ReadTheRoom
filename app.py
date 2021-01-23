from flask import Flask, send_from_directory
import json

app = Flask(__name__)


@app.route("/")
def index():
    return send_from_directory("read-the-room/build", "index.html")
    # return "<h1>New South 4eva!</h1>"


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


@app.route("/<path:path>")
@app.route("/<string:path>")
def catch_all(path):
    print(path)
    return send_from_directory("read-the-room/build", path)


@app.route("/static/js/<path:path>")
@app.route("/static/js/<string:path>")
def catch_static_js(path):
    print(path)
    return send_from_directory("read-the-room/build/static/js", path)

@app.route("/static/css/<path:path>")
@app.route("/static/css/<string:path>")
def catch_static_css(path):
    print(path)
    return send_from_directory("read-the-room/build/static/css", path)

@app.route("/static/media/<path:path>")
@app.route("/static/media/<string:path>")
def catch_static_media(path):
    print(path)
    return send_from_directory("read-the-room/build/static/media", path)

if __name__ == "__main__":
    app.run(debug=True)
