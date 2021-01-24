import React from 'react';
import AttendancePieChart from '../components/AttendancePieChart';
import EmotionLeaderBoard from '../components/EmotionLeaderBoard';
import SimpleNotification from '../components/Notification';
import axios from 'axios';


class Teacher extends React.Component{
    checkDataIntervalObject = null
    emotionMap = {"neutral": "🙂 Neutral",
                  "anger": "😡 Anger",
                  "contempt": "😒 Contempt",
                  "disgust": "🤢 Disgust",
                  "fear": "😨 Fear",
                  "happiness": "😄 Happiness",
                  "sadness": "😢 Sadness",
                  "surprise": "😮 Surprise",
                  "confused": "🤔 Confused",
                  "absent": "Unknown"}
    keys = ["neutral", "anger", "contempt", "disgust", "fear", "happiness", "sadness", "surprise", "confused"]
    absentColor = "#696773"
    presentColor = "#009fb7"
    messagesMap = {"muted": "Your may be muted.",
                   "no_slides": "Your slides can't be seen.",
                   "slow_internet": "Your image quality seems to be degraded.",
                   "slow_down": "Calm down. Breathe deeply.",
                   "confused": "Your students are confused."}
    messageKeys = ["muted", "no_slides", "slow_internet", "slow_down", "confused"]

    constructor(props) {
        super(props);
        var data =
            {"😡 Anger": 0,
            "😒 Contempt": 0,
            "🤢 Disgust": 0,
            "😨 Fear": 0,
            "😄 Happiness": 0,
            "🙂 Neutral": 0,
            "😥 Sadness": 0,
            "😮 Surprise": 0,
            "🤔 Confused": 0,
        };
        var mockAttendanceData = [{title: "Absent", value: 5,
                                   color: this.absentColor}]
        this.state = {emotionsData: data, attendanceData: mockAttendanceData};
    }

    checkDataAtIntervals = () => {
        var intervalObject = setInterval(() => {
            // Get stuff
            axios({method: "get",
              url: "./current_data"})
            .then(data => {
                // Handle emotions
                var givenData = data.data;
                var newData = {};
                var presentStudents = 0;
                this.keys.forEach(key => {
                    console.log(key);
                    if (key in givenData.users){
                        newData[this.emotionMap[key]] = givenData.users[key];
                        presentStudents += givenData.users[key];
                    }
                    else{
                        newData[this.emotionMap[key]] = 0;
                    }
                })

                // Handle absence
                var absentStudents = 0;
                var attendanceData = [];
                if ("absent" in givenData.users){
                    absentStudents += givenData.users.absent;
                }
                if (presentStudents === 0){
                    attendanceData = [{title: "Absent", value: 5, color: this.absentColor}];
                }
                else if (absentStudents === 0){
                    attendanceData = [{title: "Present", value: 5, color: this.presentColor}];
                }
                else{
                    attendanceData = [{title: "Absent", value: absentStudents, color: this.absentColor},
                                      {title: "Present", value: presentStudents, color: this.presentColor}]
                }

                this.setState({emotionsData: newData, attendanceData: attendanceData});

                // Handle messages
                var maxCount = 0;
                var maxMessage = null;
                this.messageKeys.forEach(key => {
                    if (key in givenData.commands && givenData.commands[key] > maxCount){
                        maxCount = givenData.commands[key];
                        maxMessage = key;
                    }
                })
                if (maxMessage != null){
                    new Notification('Read the Room: ' + this.messagesMap[maxMessage]);
                }
            })
        }, 3000);
        return intervalObject;
    }

    componentDidMount(){
        this.checkDataIntervalObject = this.checkDataAtIntervals();
        if (!("Notification" in window)) {
          console.log("This browser does not support desktop notification");
        } else {
          Notification.requestPermission();
        }
    }

    componentWillUnmount(){
        if (this.checkDataIntervalObject != null){
            clearInterval(this.checkDataInterval);
        }
    }

    render(){
        return (
            <>
            <div className="text-center mb-3 mb-lg-5">
                <h1>Class: Algebra 28/01/2021</h1>
                <div>Session key: silly-ferret-feet</div>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <h2>Emotional Engagement</h2>
                    <div>See what emotions your students are showing</div>
                    <EmotionLeaderBoard data={this.state.emotionsData}/>
                </div>
                <div class="col-lg-6 mt-5 mt-lg-0">
                    <h2>Attendance</h2>
                    <div>Check the class attendance</div>
                    <AttendancePieChart attendanceData={this.state.attendanceData}/>
                </div>
            </div>
        </>
    )
  }
}

export default Teacher;
