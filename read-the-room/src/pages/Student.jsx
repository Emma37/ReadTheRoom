import React, { useEffect } from 'react';
import axios from 'axios';
import { ImageCapture } from 'image-capture';
import { render } from 'react-dom';
import SpeechButton from '../components/SpeechButton';


function sendFaceAtIntervals(imageCapture) {
    const url = "./image_analysis"
    var intervalObject = setInterval(function(){
        // console.log(videoRef)
        // let data = videoRef.current.toDataURL('image/jpg');
        // fetch(data)
        // .then(res => res.blob())
        imageCapture.takePhoto()
        .then(blobData => {
           axios({
            method: "post",
            url: url,
            contentType: "application/octet-stream",
            data: blobData
           })
           .then(function(data) {
              console.log(JSON.stringify(data));
          })
           .catch(function(err) {
              console.log(JSON.stringify(err));
          })
       });
    }, 1000);
    return intervalObject;
}


const Student = () => {
    const videoRef = React.createRef();
    var sendIntervalObject = null;

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({video: {facingMode: "user"}})
    .then(function(stream) {
        videoRef.current.srcObject = stream;

        const mediaStreamTrack = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(mediaStreamTrack);
        sendIntervalObject = sendFaceAtIntervals(imageCapture);
    })
    .catch(function(err0r) {
        console.log(err0r);
        console.log("Something went wrong 2!");
    });
    }

    useEffect(() => {
        return () => {
            if (sendIntervalObject != null){
                console.log("Unmounting")
                clearInterval(sendIntervalObject);
            }
        }
    }, [])

    const items = [];
    var emotions = ["test"];
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
                            <video autoPlay playsInline id="videoElement" className="webcam-feed bg-dark" ref={videoRef}>
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
                        <div className="row mt-4 mb-5">
                            <div className="col-6">
                                <div className="data-item">
                                    <div className="data__title">
                                        Attendance
                                    </div>
                                    <div className="data__value">
                                        ✔ Present
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="data-item">
                                    <div className="data__title">
                                        Emotion
                                    </div>
                                    <div className="data__value">
                                        😐 Neutral
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 divider-top pt-4">
                        <h2>
                            Raise an issue
                        </h2>
                        <div className="pb-4">
                            Let your teacher know something is wrong
                        </div>
                        <SpeechButton id="SB1" text="You're on mute" />
                        <SpeechButton id="SB2" text="I'm really confused" />
                        <SpeechButton id="SB3" text="Please slow down" />
                        <SpeechButton id="SB4" text="There's a bad internet connection" />
                        <SpeechButton id="SB5" text="I can't see the slides" />
                    </div>
                </div>
            </div>
        </div>




        </>
    )
}

export default Student;
