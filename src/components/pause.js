import React, { } from 'react';
import '../styles/pause.css';
import anime from 'animejs/lib/anime.es.js';

function Pause(props) {

    return(
        <div className='pause-screen' onClick={props.continue}>
            <div className='pause-screen-icon'>
                 ||
            </div>
        </div>
    );
}

export default Pause;