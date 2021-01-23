import React from 'react';
import { render } from 'react-dom';
import SpeechButton from '../components/SpeechButton';


const Student = () => {

    var video = document.querySelector("#videoElement");
 
    if (navigator.mediaDevices.getUserMedia) {       
        navigator.mediaDevices.getUserMedia({video: true})
    .then(function(stream) {
        video.srcObject = stream;
    })
    .catch(function(err0r) {
        console.log("Something went wrong!");
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
        <h1>Class: Algebra 28/01/2021</h1>

        <div id="container">
            <video autoPlay="true" id="videoElement" className="bg-dark">
            </video>
        </div>
        <select>
            {devices.map((value, index) => {
                return <option>{value}</option>
            })}
            {/* {items} */}
        </select>

        <div>
            No one can see this video stream but you
        </div>

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
        </>
    )
}

export default Student;
