import React, { useEffect } from 'react';
import axios from 'axios';
import { ImageCapture } from 'image-capture';
import { render } from 'react-dom';
import SpeechButton from '../components/SpeechButton';


class Student extends React.Component{
    videoRef = React.createRef();
    sendIntervalObject = null;
    userId = Math.floor(Math.random() * 10000);
    canvas = document.createElement('canvas');

    browserName = (function(){
        var ua= navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE '+(tem[1] || '');
        }
        if(M[1]=== 'Chrome'){
            tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
            if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    })();

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

    captureImage = (imageCapture) => {
        if (this.browserName.includes("Safari")){
            return imageCapture.takePhoto()
        }
        else{
            return (imageCapture.grabFrame()
                   .then(img => {
                        console.log(img); // ImageBitmap
                        return new Promise(res => {
                          // resize it to the size of our ImageBitmap
                          this.canvas.width = img.width;
                          this.canvas.height = img.height;
                          // try to get a bitmaprenderer context
                          let ctx = this.canvas.getContext('bitmaprenderer');
                          if(ctx) {
                            // transfer the ImageBitmap to it
                            ctx.transferFromImageBitmap(img);
                          }
                          else {
                            // in case someone supports createImageBitmap only
                            // twice in memory...
                            this.canvas.getContext('2d').drawImage(img,0,0);
                          }
                          // get it back as a Blob
                          this.canvas.toBlob(res);
                        });
                      }))
        }
    }

    sendFaceAtIntervals = () => {
        const url = "./image_analysis"
        var intervalObject = setInterval(() => {
            if (!this.state.overridingDisabled){
                const mediaStreamTrack = this.state.currentStream.getVideoTracks()[0];
                const imageCapture = new ImageCapture(mediaStreamTrack);
                this.captureImage(imageCapture)
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
                      // Have to do this check again in case the request come back after
                      // the user's overridden.
                      if (!this.state.overridingDisabled){
                        this.setState({maxEmotion: data.data.max_emotion});
                      }
                      this.sendCurrentData();
                  })
                });
            }
            else{
                console.log("Skipped checking for a new face");
                this.sendCurrentData();
            }
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
                      showOverrideSection: false,
                      cameraOptions: [],
                      overridingDisabled: false,
                      overridingEmotion: "neutral",
                      currentStream: null
                      };
    }

    gotDevices = (mediaDevices) => {
        let count = 1;
        var newCameraOptions = [];
        mediaDevices.forEach(mediaDevice => {
            if (mediaDevice.kind === 'videoinput') {
              const value = mediaDevice.deviceId;
              const label = mediaDevice.label || `Camera ${count++}`;
              newCameraOptions.push(<option value={value}>{label}</option>);
            }
        });

        this.setState({cameraOptions: newCameraOptions});
        console.log(this.state.cameraOptions);
    }



    stopMediaTracks = (stream) => {
        stream.getTracks().forEach(track => {
          track.stop();
        });
    }

    handleChange = (e) => {
        if (typeof currentStream !== 'undefined') {
            this.stopMediaTracks(this.state.currentStream);
          }
        const videoConstraints = {};
        if (e.target.value === '') {
            videoConstraints.facingMode = 'environment';
        } else {
            videoConstraints.deviceId = { exact: e.target.value };
        }
        const constraints = {
            video: videoConstraints,
            audio: false
        };

        navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
        this.setState({currentStream: stream});
        this.videoRef.current.srcObject = stream;
        return navigator.mediaDevices.enumerateDevices();
        })
        .then(this.gotDevices)
        .catch(error => {
        console.error(error);
        });

        console.log("test", this.state.currentStream);
    }

    componentDidMount(){

        navigator.mediaDevices.enumerateDevices().then(this.gotDevices);

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({video: {facingMode: "user"}})
        .then(stream => {
            this.videoRef.current.srcObject = stream;
            this.setState({currentStream: stream});
            this.sendIntervalObject = this.sendFaceAtIntervals();
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

    overrideEmotion = () => {
        this.setState({ showOverrideSection: false, overridingDisabled: true });
        setTimeout(() => {this.setState({ overridingDisabled: false })}, 10000);
        const newValue = this.state.overridingEmotion;
        this.setState({overridingEmotion: "neutral"});
        console.log(newValue);
        this.setState({maxEmotion: newValue});
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
                          "confused": "🤔 Confused",
                          "absent": "👻 Not Detected"}
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
                <button className="btn btn-secondary" onClick={() => this.setState({ showOverrideSection: true })} disabled={ this.state.overridingDisabled }>
                    <span className="override-button">
                        <span className="override-button__icon">⚠</span>
                        <span>That's not how I feel</span>
                    </span>
                </button>
        ;

        const OverrideSection =
            <>
                <div className="d-flex">
                    <select className="form-select form-select-lg mt-3" onChange={ (e) => {this.setState({overridingEmotion: e.target.value})} }>
                    {
                        Object.keys(emotionMap).map((key, index) => (
                            key === "absent" ? null : <option key={index} value={key}>{emotionMap[key]}</option>
                        ))
                    }
                    </select>
                    <button className="btn btn-primary mt-3 ml-3" onClick={ this.overrideEmotion }>Submit</button>
                </div>
            </>
        ;


        return (
            <>
            <h1 className="text-center mb-3 mb-lg-5">Class: Algebra 28/01/2021</h1>

            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="webcam-feed">
                            <div className="bg-secondary p-2 webcam-feed__notice">
                                Only you can see this video stream
                            </div>
                            <div id="container">
                                <video autoPlay playsInline id="videoElement" className="webcam-feed bg-dark" ref={this.videoRef}>
                                </video>
                            </div>
                        </div>
                        <select className="form-select form-select-lg"  onChange={this.handleChange}>
                            {this.state.cameraOptions}
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
                            <div className="row mt-4 mb-4 align-items-center">
                                <div className="col-lg-6">
                                    <div className="data-item">
                                        <div className="data__title">
                                            Reported Emotion
                                        </div>
                                        <div className="data__value">
                                            {emotionMap[this.state.maxEmotion]}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mt-3 mt-lg-0">
                                    { this.state.showOverrideSection ? null : OverrideButton }
                                </div>
                                { this.state.showOverrideSection ? OverrideSection : null }
                            </div>
                        </div>
                        <div className="mt-3 divider-top pt-4">
                            <h2>
                                Raise an issue
                            </h2>
                            <div className="pb-4">
                                Let your teacher know something is wrong
                            </div>
                            <div className="speech-button__container">
                                <SpeechButton id="SB1" text="You're on mute" isActive={!this.state.muteMessage} flipState={this.flipState("muteMessage")}/>
                                <SpeechButton id="SB2" text="I'm really confused" isActive={!this.state.confusedMessage} flipState={this.flipState("confusedMessage")}/>
                                <SpeechButton id="SB3" text="Please slow down" isActive={!this.state.slowDownMessage} flipState={this.flipState("slowDownMessage")}/>
                                <SpeechButton id="SB4" text="There's a bad internet connection" isActive={!this.state.internetConnectionMessage} flipState={this.flipState("internetConnectionMessage")}/>
                                <SpeechButton id="SB5" text="I can't see the slides" isActive={!this.state.cannotSeeSlidesMessage} flipState={this.flipState("cannotSeeSlidesMessage")}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            </>
        )
    }
}

export default Student;
