import React from 'react';


function SpeechButton(props){
    return (
        <>
            <button className="Speech button">
                {props.text}
            </button>
        </>
    )
}

export default SpeechButton;
