from flask import Flask, send_from_directory
from collections import Counter
import json

app = Flask(__name__)

students = {}

@app.route("/")
def index():
    return "<h1>New South 4eva!</h1>"

@app.route("/json")
def test_json():
    return {"test": 1}

@app.route("/current_data")
def send_current_data():
    emotion_counts = Counter(students[s]["main_emotion"] for s in students)
    emotion_counts["total_students"] = len(students.keys())
    # active_students calculated on some timeout function?
    command_counts = Counter(students[s]["active_command"] for s in students)
    return {"users": emotion_counts,
            "commands": command_counts
            }

@app.route("/send_data", methods=["POST"])
def update_data():
    given_data = json.loads(request.data)
    students{given_data['id']} = given_data
    return

if __name__ == "__main__":
    app.run(debug=True)
