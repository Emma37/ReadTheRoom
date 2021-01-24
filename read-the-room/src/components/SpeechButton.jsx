import React from 'react';


function SpeechButton(props){
    var isDisabled = false;

    function handleClick(e) {
        e.preventDefault();

        isDisabled = true;
        var button = document.getElementById(props.id);
        button.disabled = true;
        setTimeout(function(){button.disabled=false;}, 3000);
    }

    return (
        <>
            <button id={props.id} className="btn btn-primary speech-button" disabled={isDisabled} onClick={handleClick}>
                {props.text}
            </button>
        </>
    )
}

export default SpeechButton;
