import React from 'react';


function SpeechButton(props){
    // var isDisabled = false;

    function handleClick(e) {
        e.preventDefault();

        props.isActive = false;
        var button = document.getElementById(props.id);
        button.disabled = true;
        setTimeout(function(){props.isActive=true;}, 3000);
    }

    return (
        <>
            <button id={props.id} className="btn btn-primary speech-button" disabled={!props.isActive} onClick={handleClick}>
                {props.text}
            </button>
        </>
    )
}

export default SpeechButton;
