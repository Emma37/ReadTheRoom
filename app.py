from flask import Flask, send_from_directory, request
from collections import Counter
import json
import os
import datetime

app = Flask(__name__)

students = {}
timeout_time = 10

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


def clean_students_dictionary():
    global students
    current_date = datetime.datetime.now()
    invalid_keys = [s for s in students if (current_date - students[s]["date"]).total_seconds() > timeout_time]
    for key in invalid_keys:
        students.pop(key, None)


@app.route("/current_data")
def send_current_data():
    clean_students_dictionary()
    emotion_counts = Counter(students[s]["main_emotion"] for s in students)
    emotion_counts["total_students"] = len(students.keys())
    # active_students calculated on some timeout function + no students detected?
    command_counts = Counter(students[s]["active_command"] for s in students)
    return {"users": emotion_counts,
            "commands": command_counts
            }


@app.route("/send_data", methods=["POST"])
def update_data():
    given_data = json.loads(request.data)
    given_data['date'] = datetime.datetime.now()
    students[given_data['id']] = given_data
    return {"success": True}


@app.route("/<path:path>")
@app.route("/<string:path>")
def catch_all(path):
    print(path)
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory("read-the-room/build", path)
    else:
        return send_from_directory("read-the-room/build", 'index.html')


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
