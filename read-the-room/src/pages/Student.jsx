import React from 'react';
import { render } from 'react-dom';
import SpeechButton from '../components/SpeechButton';


const Student = () => {

    const videoRef = React.createRef();

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({video: {facingMode: "user"}})
    .then(function(stream) {
        videoRef.current.srcObject = stream;
    })
    .catch(function(err0r) {
        console.log(err0r);
        console.log("Something went wrong 2!");
    });
    }

    const items = [];
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
        <h1 className="text-center mb-4">Class: Algebra 28/01/2021</h1>

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
                    <select>
                        {devices.map((value, index) => {
                            return <option>{value}</option>
                        })}
                        {/* {items} */}
                    </select>
                </div>
                <div className="col-lg-6">
                <div>
                    <div>This is the data being sent to your teacher and will be aggregated with everyone from your class</div>
                        Emotion
                    </div>
                    <div>
                        <div>Need to tell your teacher something?</div>
                        <SpeechButton text="Please slow down" />
                        <SpeechButton text="You're on mute" />
                        <SpeechButton text="There's a bad internet connection" />
                        <SpeechButton text="I'm really confused" />
                    </div>
                </div>
            </div>
        </div>




        </>
    )
}

export default Student;
