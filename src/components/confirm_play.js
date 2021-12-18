import React, { useState, useEffect, useRef } from 'react';

import '../styles/confirm_play.css';

import Game from './game.js';
import levels from '../levels.js';
import anime from 'animejs/lib/anime.es.js';

function ConfirmPlay(props) {

    const animationRefFlash = React.useRef(null);

    React.useEffect(() => {
        animationRefFlash.current = anime({
            targets: '.anywhere-dialog',
            duration: 3200,
            delay: 1000,
            keyframes: [
                {opacity: 0, duration: 1200},
                {opacity: .1, delay: 600},
                {opacity: .2},
                {opacity: .3},
                {opacity: .4},
                {opacity: .5},
                {opacity: .6},
                {opacity: .7},
                {opacity: .8},
                {opacity: .9},
                {opacity: 1, delay: 2500},
            ],
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: true,
        })
    }, []);

    return(
        <div className='anywhere-box' onClick={props.next}>
            <div className='anywhere-dialog'>
                <div className='anywhere-text'> Click anywhere to begin </div>
            </div>
        </div>
    )
}

export default ConfirmPlay;