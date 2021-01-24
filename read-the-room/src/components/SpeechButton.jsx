import React from 'react';


function SpeechButton(props){
    return (
        <>
            <button className="btn btn-primary speech-button">
                {props.text}
            </button>
        </>
    )
}

export default SpeechButton;
