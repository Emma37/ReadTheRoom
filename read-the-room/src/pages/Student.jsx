import React, { useEffect } from 'react';
import axios from 'axios';
import { ImageCapture } from 'image-capture';
import { render } from 'react-dom';
import SpeechButton from '../components/SpeechButton';


class Student extends React.Component{
    videoRef = React.createRef();
    sendIntervalObject = null;
    userId = Math.floor(Math.random() * 10000);

    sendCurrentData = () => {
        var dataToSend = {main_emotion: this.state.maxEmotion, id: this.userId};
        if (this.state.muteMessage === true){
            dataToSend["active_command"] = "muted";
        }
        else if (this.state.cannotSeeSlidesMessage === true){
            dataToSend["active_command"] = "no_slides"
        }
        else if (this.state.internetConnectionMessage === true){
            dataToSend["active_command"] = "slow_internet";
        }
        else if (this.state.slowDownMessage === true){
            dataToSend["active_command"] = "slow_down";
        }
        else if (this.state.confusedMessage === true){
            dataToSend["active_command"] = "confused";
        }
        axios({method: "post",
              data: dataToSend,
              url: "./send_data"})
        .then(data => {console.log(JSON.stringify(data))})
    }

    sendFaceAtIntervals = (imageCapture) => {
        const url = "./image_analysis"
        const canvas = document.createElement('canvas');
        var intervalObject = setInterval(() => {
            imageCapture.grabFrame()
            .then(img => {
                console.log(img); // ImageBitmap
                return new Promise(res => {
                  // resize it to the size of our ImageBitmap
                  canvas.width = img.width;
                  canvas.height = img.height;
                  // try to get a bitmaprenderer context
                  let ctx = canvas.getContext('bitmaprenderer');
                  if(ctx) {
                    // transfer the ImageBitmap to it
                    ctx.transferFromImageBitmap(img);
                  }
                  else {
                    // in case someone supports createImageBitmap only
                    // twice in memory...
                    canvas.getContext('2d').drawImage(img,0,0);
                  }
                  // get it back as a Blob
                  canvas.toBlob(res);
                });
              })
            .then(blobData => {
               axios({
                method: "post",
                url: url,
                // contentType: "application/octet-stream",
                headers:{
                    "content-type":"application/octet-stream",
                },
                data: blobData
               })
               .then(data => {
                  console.log(JSON.stringify(data));
                  this.setState({maxEmotion: data.data.max_emotion});
                  this.sendCurrentData();
              })
              //  .catch(function(err) {
              //     console.log(JSON.stringify(err));
              // })
           });
        }, 3000);
        return intervalObject;
    }

    constructor(props) {
        super(props);
        this.state = {maxEmotion: "absent",
                      muteMessage: false,
                      confusedMessage: false,
                      slowDownMessage: false,
                      internetConnectionMessage: false,
                      cannotSeeSlidesMessage: false,
                      showOverrideSection: false
                      };
    }

    componentDidMount(){
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({video: {facingMode: "user"}})
        .then(stream => {
            this.videoRef.current.srcObject = stream;

            const mediaStreamTrack = stream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(mediaStreamTrack);
            this.sendIntervalObject = this.sendFaceAtIntervals(imageCapture);
        })
        .catch(err0r => {
            console.log(err0r);
            console.log("Something went wrong 2!");
        });
        }
    }

    componentWillUnmount(){
        if (this.sendIntervalObject != null){
            console.log("Unmounting")
            this.videoRef.current.srcObject.getTracks().forEach((track) => track.stop())
            clearInterval(this.sendIntervalObject);
        }
    }

    flipState = (state) => {
        return () =>{
            var newDict = {};
            newDict[state] = !this.state[state];
            this.setState(newDict);
        }
    }

    render(){
        const items = [];
        var emotionMap = {"neutral": "🙂 Neutral",
                          "anger": "😡 Anger",
                          "contempt": "😒 Contempt",
                          "disgust": "🤢 Disgust",
                          "fear": "😨 Fear",
                          "happiness": "😄 Happiness",
                          "sadness": "😢 Sadness",
                          "surprise": "😮 Surprise",
                          "absent": "Unknown"}
        const devices = ["Front camera", "Back camera"];

        // console.log("test", navigator.mediaDevices
        //     .enumerateDevices())

        // const devices = navigator.mediaDevices
        // .enumerateDevices();

        // for(const [index, value] in devices){
        //     var mediaDevice = devices[index];
        //     if (mediaDevice.kind === 'videoinput') {
        //         items.push(<option>{mediaDevice.label}</option>)
        //     }
        // }

        const OverrideButton = 
                <button className="btn btn-danger mt-3" onClick={() => this.setState({ showOverrideSection: true })}>
                    My detected emotion is incorrect
                </button>
        ;

        const OverrideSection = 
            <>
                <select className="form-select form-select-lg mt-3">
                {
                    Object.keys(emotionMap).map((key, index) => ( 
                    <option key={index}>{emotionMap[key]}</option> 
                    ))
                }
                </select>
                <button className="btn btn-primary mt-3" onClick={() => this.setState({ showOverrideSection: false })}>Submit</button>
            </>
        ;


        return (
            <>
            <h1 className="text-center mb-3 mb-lg-5">Class: Algebra 28/01/2021</h1>

            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div>
                            <div className="bg-secondary p-2">
                                Only you can see this video stream
                            </div>
                            <div id="container">
                                <video autoPlay playsInline id="videoElement" className="webcam-feed bg-dark" ref={this.videoRef}>
                                </video>
                            </div>
                        </div>
                        <select className="form-select form-select-lg">
                            {devices.map((value, index) => {
                                return <option>{value}</option>
                            })}
                            {/* {items} */}
                        </select>
                    </div>
                    <div className="col-lg-6 mt-3 mt-lg-0">
                        <div>
                            <h2>
                                Your data
                            </h2>
                            <div>
                                This is the data being anonymously sent to your teacher which will be aggregated with everyone from your class
                            </div>
                            <div className="row mt-4 mb-4">
                                <div className="col-6">
                                    <div className="data-item">
                                        <div className="data__title">
                                            Attendance
                                        </div>
                                        <div className="data__value">
                                            {this.state.maxEmotion === "absent" ? "👻 Lost" : "✔ Present"}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="data-item">
                                        <div className="data__title">
                                            Emotion
                                        </div>
                                        <div className="data__value">
                                            {emotionMap[this.state.maxEmotion]}
                                        </div>
                                    </div>
                                </div>
                                { this.state.showOverrideSection ? OverrideSection : OverrideButton }

                            </div>
                        </div>
                        <div className="mt-3 divider-top pt-4">
                            <h2>
                                Raise an issue
                            </h2>
                            <div className="pb-4">
                                Let your teacher know something is wrong
                            </div>
                            <SpeechButton id="SB1" text="You're on mute" isActive={!this.state.muteMessage} flipState={this.flipState("muteMessage")}/>
                            <SpeechButton id="SB2" text="I'm really confused" isActive={!this.state.confusedMessage} flipState={this.flipState("confusedMessage")}/>
                            <SpeechButton id="SB3" text="Please slow down" isActive={!this.state.slowDownMessage} flipState={this.flipState("slowDownMessage")}/>
                            <SpeechButton id="SB4" text="There's a bad internet connection" isActive={!this.state.internetConnectionMessage} flipState={this.flipState("internetConnectionMessage")}/>
                            <SpeechButton id="SB5" text="I can't see the slides" isActive={!this.state.cannotSeeSlidesMessage} flipState={this.flipState("cannotSeeSlidesMessage")}/>
                        </div>
                    </div>
                </div>
            </div>




            </>
        )
    }
}

export default Student;
