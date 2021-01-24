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
                  "absent": "Unknown"}
    keys = ["neutral", "anger", "contempt", "disgust", "fear", "happiness", "sadness", "surprise"]

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
            "😮 Surprise": 0
        };
        this.state = {emotionsData: data};
    }

    checkDataAtIntervals = () => {
        var intervalObject = setInterval(() => {
            // Get stuff
            axios({method: "get",
              url: "./current_data"})
            .then(data => {
                var givenData = data.data;
                var newData = {};
                this.keys.forEach(key => {
                    console.log(key);
                    if (key in givenData.users){
                        newData[this.emotionMap[key]] = givenData.users[key];
                    }
                    else{
                        newData[this.emotionMap[key]] = 0;
                    }
                })
                this.setState({emotionsData: newData});
            })
        }, 3000);
        return intervalObject;
    }

    componentDidMount(){
        this.checkDataIntervalObject = this.checkDataAtIntervals();
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
                    <AttendancePieChart />
                </div>
            </div>
            <SimpleNotification message="You're on mute"/>
        </>
    )
  }
}

export default Teacher;
