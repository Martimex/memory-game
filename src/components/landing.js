import React, { useRef } from 'react';
import '../styles/landing.css';
import '../animations/animeLanding.js';
import anime from 'animejs/lib/anime.es.js';
import { colors } from '../vars.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { tileCodes } from '../vars.js';

library.add(fab, fas);

let usedIcons = [];
let randomizedIcons = [];

let fasArray = Object.keys(library.definitions.fas);
let fabArray = Object.keys(library.definitions.fab);

function getRandomIcons(fasArray, usedIcons, randomizedIcons) {
    let fasArrayCopy = [...fasArray]; // Create a copy of fasArray; direct assigning (fasArrayCopy = fasArray) would affect fasArray too!
    for(let i=0; i<(tileCodes.length/2); i++) { // Math.ceil(tileCodes.length/2) => it should be actually state value !!!
        let random = Math.floor(Math.random() * fasArrayCopy.length);
        usedIcons.push(fasArrayCopy[random]);
        fasArrayCopy.splice(random, 1);
    }
    let duplicate = usedIcons;
    usedIcons.push(...duplicate);

    const usedIconsCopy = [...usedIcons]; // Same here - creating a copy; do not assign values directly(it works for original ref only) !!

    for(let j=0; j<usedIconsCopy.length; j++) {
        randomizedIcons.push(setIcon(usedIcons));
    }
}

function setIcon(usedIcons) {
    let index = Math.floor(Math.random() * usedIcons.length);
    let chosenIcon = usedIcons[index];
    usedIcons.splice(index, 1);
    return chosenIcon;
}


// INIT
getRandomIcons(fasArray, usedIcons, randomizedIcons);

function Landing(props) {

    const tileCodes = props.tileCodes;

    const gameBoard = useRef(null);

    /* BELOW USED FOR TILES BORDER COLOR MANIPULATION */

    const animationRef4 = React.useRef(null);
    const animationRef5 = React.useRef(null);
    const animationRef6 = React.useRef(null);
    const animationRef7 = React.useRef(null);
    const animationRef8 = React.useRef(null);
    const animationRef9 = React.useRef(null);
    const animationRef10 = React.useRef(null);

    React.useEffect(() => {

        animationRef4.current = anime({
            targets: ['.t11'],
            borderColor: [`${colors.A}`, `${colors.A1}`, `${colors.A2}`, `${colors.A3}`, `${colors.B}`, `${colors.B1}`, `${colors.B2}`, `${colors.B2}`, `${colors.B3}`, `${colors.C}`, `${colors.C1}`, `${colors.C2}`, `${colors.C3}`, `${colors.D}`, `${colors.D1}`, `${colors.D2}`, `${colors.D3}`, `${colors.E}`, `${colors.E1}`, `${colors.E2}`, `${colors.E3}`, `${colors.G}`, `${colors.G1}`, `${colors.G2}`, `${colors.G3}`],
            color: [`${colors.A}`, `${colors.A1}`, `${colors.A2}`, `${colors.A3}`, `${colors.B}`, `${colors.B1}`, `${colors.B2}`, `${colors.B2}`, `${colors.B3}`, `${colors.C}`, `${colors.C1}`, `${colors.C2}`, `${colors.C3}`, `${colors.D}`, `${colors.D1}`, `${colors.D2}`, `${colors.D3}`, `${colors.E}`, `${colors.E1}`, `${colors.E2}`, `${colors.E3}`, `${colors.G}`, `${colors.G1}`, `${colors.G2}`, `${colors.G3}`],
            duration: 48000,
            easing: 'easeOutElastic',
            direction: 'normal',
            loop: true,
        })

        animationRef5.current = anime({
            targets: ['.t12'],
            borderColor: [`${colors.A1}`, `${colors.A2}`, `${colors.A3}`, `${colors.B}`, `${colors.B1}`, `${colors.B2}`, `${colors.B2}`, `${colors.B3}`, `${colors.C}`, `${colors.C1}`, `${colors.C2}`, `${colors.C3}`, `${colors.D}`, `${colors.D1}`, `${colors.D2}`, `${colors.D3}`, `${colors.E}`, `${colors.E1}`, `${colors.E2}`, `${colors.E3}`, `${colors.G}`, `${colors.G1}`, `${colors.G2}`, `${colors.G3}`, `${colors.A}`],
            color: [`${colors.A1}`, `${colors.A2}`, `${colors.A3}`, `${colors.B}`, `${colors.B1}`, `${colors.B2}`, `${colors.B2}`, `${colors.B3}`, `${colors.C}`, `${colors.C1}`, `${colors.C2}`, `${colors.C3}`, `${colors.D}`, `${colors.D1}`, `${colors.D2}`, `${colors.D3}`, `${colors.E}`, `${colors.E1}`, `${colors.E2}`, `${colors.E3}`, `${colors.G}`, `${colors.G1}`, `${colors.G2}`, `${colors.G3}`, `${colors.A}`],
            duration: 48000,
            easing: 'easeOutElastic',
            direction: 'normal',
            loop: true,
        })

        animationRef6.current = anime({
            targets: ['.t13'],
            duration: 48000,
            borderColor: [`${colors.A2}`, `${colors.A3}`, `${colors.B}`, `${colors.B1}`, `${colors.B2}`, `${colors.B2}`, `${colors.B3}`, `${colors.C}`, `${colors.C1}`, `${colors.C2}`, `${colors.C3}`, `${colors.D}`, `${colors.D1}`, `${colors.D2}`, `${colors.D3}`, `${colors.E}`, `${colors.E1}`, `${colors.E2}`, `${colors.E3}`, `${colors.G}`, `${colors.G1}`, `${colors.G2}`, `${colors.G3}`, `${colors.A}`, `${colors.A1}`],
            color: [`${colors.A2}`, `${colors.A3}`, `${colors.B}`, `${colors.B1}`, `${colors.B2}`, `${colors.B2}`, `${colors.B3}`, `${colors.C}`, `${colors.C1}`, `${colors.C2}`, `${colors.C3}`, `${colors.D}`, `${colors.D1}`, `${colors.D2}`, `${colors.D3}`, `${colors.E}`, `${colors.E1}`, `${colors.E2}`, `${colors.E3}`, `${colors.G}`, `${colors.G1}`, `${colors.G2}`, `${colors.G3}`, `${colors.A}`, `${colors.A1}`],
            easing: 'easeOutElastic',
            direction: 'normal',
            loop: true,
        })

        animationRef7.current = anime({
            targets: ['.t14'],
            borderColor: [`${colors.A3}`, `${colors.B}`, `${colors.B1}`, `${colors.B2}`, `${colors.B2}`, `${colors.B3}`, `${colors.C}`, `${colors.C1}`, `${colors.C2}`, `${colors.C3}`, `${colors.D}`, `${colors.D1}`, `${colors.D2}`, `${colors.D3}`, `${colors.E}`, `${colors.E1}`, `${colors.E2}`, `${colors.E3}`, `${colors.G}`, `${colors.G1}`, `${colors.G2}`, `${colors.G3}`, `${colors.A}`, `${colors.A1}`, `${colors.A2}`],
            color: [`${colors.A3}`, `${colors.B}`, `${colors.B1}`, `${colors.B2}`, `${colors.B2}`, `${colors.B3}`, `${colors.C}`, `${colors.C1}`, `${colors.C2}`, `${colors.C3}`, `${colors.D}`, `${colors.D1}`, `${colors.D2}`, `${colors.D3}`, `${colors.E}`, `${colors.E1}`, `${colors.E2}`, `${colors.E3}`, `${colors.G}`, `${colors.G1}`, `${colors.G2}`, `${colors.G3}`, `${colors.A}`, `${colors.A1}`, `${colors.A2}`],
            duration: 48000,
            easing: 'easeOutElastic',
            direction: 'normal',
            loop: true,
        })

        animationRef8.current = anime({
            targets: ['.t15'],
            borderColor: [`${colors.B}`, `${colors.B1}`, `${colors.B2}`, `${colors.B2}`, `${colors.B3}`, `${colors.C}`, `${colors.C1}`, `${colors.C2}`, `${colors.C3}`, `${colors.D}`, `${colors.D1}`, `${colors.D2}`, `${colors.D3}`, `${colors.E}`, `${colors.E1}`, `${colors.E2}`, `${colors.E3}`, `${colors.G}`, `${colors.G1}`, `${colors.G2}`, `${colors.G3}`, `${colors.A}`, `${colors.A1}`, `${colors.A2}`, `${colors.A3}`],
            color: [`${colors.B}`, `${colors.B1}`, `${colors.B2}`, `${colors.B2}`, `${colors.B3}`, `${colors.C}`, `${colors.C1}`, `${colors.C2}`, `${colors.C3}`, `${colors.D}`, `${colors.D1}`, `${colors.D2}`, `${colors.D3}`, `${colors.E}`, `${colors.E1}`, `${colors.E2}`, `${colors.E3}`, `${colors.G}`, `${colors.G1}`, `${colors.G2}`, `${colors.G3}`, `${colors.A}`, `${colors.A1}`, `${colors.A2}`, `${colors.A3}`],
            duration: 48000,
            easing: 'easeOutElastic',
            direction: 'normal',
            loop: true,
        })

        animationRef9.current = anime({
            targets: ['.t16'],
            borderColor: [`${colors.B1}`, `${colors.B2}`, `${colors.B2}`, `${colors.B3}`, `${colors.C}`, `${colors.C1}`, `${colors.C2}`, `${colors.C3}`, `${colors.D}`, `${colors.D1}`, `${colors.D2}`, `${colors.D3}`, `${colors.E}`, `${colors.E1}`, `${colors.E2}`, `${colors.E3}`, `${colors.G}`, `${colors.G1}`, `${colors.G2}`, `${colors.G3}`, `${colors.A}`, `${colors.A1}`, `${colors.A2}`, `${colors.A3}`, `${colors.B}`],
            color: [`${colors.B1}`, `${colors.B2}`, `${colors.B2}`, `${colors.B3}`, `${colors.C}`, `${colors.C1}`, `${colors.C2}`, `${colors.C3}`, `${colors.D}`, `${colors.D1}`, `${colors.D2}`, `${colors.D3}`, `${colors.E}`, `${colors.E1}`, `${colors.E2}`, `${colors.E3}`, `${colors.G}`, `${colors.G1}`, `${colors.G2}`, `${colors.G3}`, `${colors.A}`, `${colors.A1}`, `${colors.A2}`, `${colors.A3}`, `${colors.B}`],
            duration: 48000,
            easing: 'easeOutElastic',
            direction: 'normal',
            loop: true,
        })

        animationRef10.current = anime({
            targets: ['.t17'],
            borderColor: [`${colors.B2}`, `${colors.B2}`, `${colors.B3}`, `${colors.C}`, `${colors.C1}`, `${colors.C2}`, `${colors.C3}`, `${colors.D}`, `${colors.D1}`, `${colors.D2}`, `${colors.D3}`, `${colors.E}`, `${colors.E1}`, `${colors.E2}`, `${colors.E3}`, `${colors.G}`, `${colors.G1}`, `${colors.G2}`, `${colors.G3}`, `${colors.A}`, `${colors.A1}`, `${colors.A2}`, `${colors.A3}`, `${colors.B}`, `${colors.B1}`],
            color: [`${colors.B2}`, `${colors.B2}`, `${colors.B3}`, `${colors.C}`, `${colors.C1}`, `${colors.C2}`, `${colors.C3}`, `${colors.D}`, `${colors.D1}`, `${colors.D2}`, `${colors.D3}`, `${colors.E}`, `${colors.E1}`, `${colors.E2}`, `${colors.E3}`, `${colors.G}`, `${colors.G1}`, `${colors.G2}`, `${colors.G3}`, `${colors.A}`, `${colors.A1}`, `${colors.A2}`, `${colors.A3}`, `${colors.B}`, `${colors.B1}`],
            duration: 48000,
            easing: 'easeOutElastic',
            direction: 'normal',
            loop: true,
        })

    }, []);

    const allTiles = tileCodes.map((code, index) => 
        <div className={`card ${code}`} key={index.toString()}><div className='card-front'></div> <div className='card-back'><FontAwesomeIcon icon={`${randomizedIcons[index]}`} className={`fa-icon ${code}`}/></div></div>
    );

    const changeScreen = React.useRef(null);

    function fadeAnimation() {
        changeScreen.current = anime({
            targets: 'body',
            duration: 1000,
            opacity: [0, 1],
            easing: 'linear',
        })
    }

    return( 
        <div className='landing-all'>
            <div className='layer'>
                <div className='theme' ref={gameBoard}>
                    {allTiles}
                </div>
            </div>

            <div className='content'>
                <div className='content-section'>
                    <div className="game-title">FLASH</div>
                    <div className='game-subtitle'>The Ultimate Memory Game</div>
                </div>
                <div className='content-action' >
                    <div className='from-author'> &copy; Created with ♡ by @Martimex</div>
                    <button className='start' onClick={() => {props.changeComponent(); fadeAnimation();}}> Play </button>
                </div>
            </div>       
        </div>
    )
}

export default Landing;
export { getRandomIcons, setIcon, fasArray, fabArray };