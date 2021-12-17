import React, { useState, useEffect, useRef } from 'react';
import Game from './game.js';
import levels from '../levels.js';
import '../styles/preview.css';
import anime from 'animejs/lib/anime.es.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

function Preview(props) {

    console.log(props);

    /*  const highscoreVis = useRef(null);

    highscoreVis.current= anime({
        targets: '.total-score',
        duration: 2400,
        opacity: [0, 1],
        easing: 'linear',
    }) */

    return (
        <div className='bg-main'>
            <div className='seizure-box'>
                <div className='mode-description'>
                    <div className='mode-block'>
                        <div className='mode-title'>Adventure mode </div>
                    </div>
                    <div className='mode-block'>
                        <div className='mode-about'>
                            The magic journey thorugh diffetent levels. This mode awaits for brave Adventurer,
                            who is willing to overcome many various challenges. No mistakes allowed.
                        </div>
                    </div>
                    <div className='proceed'>
                        <button className='proceed-play' onClick={() => {props.changeComponent(); }} > Start </button>
                    </div>
                </div>


            </div>
            <div className='return-home'>
                <button className='back' onClick={props.startQuick}> H </button>
            </div>
        </div>
    )

}

export default Preview;