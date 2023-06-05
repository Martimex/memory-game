import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Router from "next/router";
import styles from '../src/styles/landing.module.css';
import styles_preview from '../src/styles/preview.module.css';
import '../src/animations/animeLanding.js';
//import anime from 'animejs/lib/anime.es.js';
import * as Animation from "animejs";
import { colors, tileCodes } from '../src/vars.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as user } from '@fortawesome/free-solid-svg-icons';

import { library, config } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { useSession, signIn, signOut } from "next-auth/react";

import UserTab from '../src/components/user_tab';

// 2.0 Import stuff
import { all_levels } from '../src/global/all_levels.js';
//console.log(all_levels);

//////////

//config.autoAddCss = false;
library.add(fab, fas, far);

const usedIcons = [];
const randomizedIcons = [];

const icon_Sets = {
    fas: Object.keys(library.definitions.fas),
    fab: Object.keys(library.definitions.fab), // not working for some reason
    far: Object.keys(library.definitions.far),
}

function getRandomIcons(iconSet, usedIcons, randomizedIcons) {
    let iconSetCopy = [...iconSet]; // Create a copy of fasArray; direct assigning (fasArrayCopy = fasArray) would affect fasArray too!
    for(let i=0; i<(tileCodes.length/2); i++) { // Math.ceil(tileCodes.length/2) => it should be actually state value !!!
        let random = Math.floor(Math.random() * iconSetCopy.length);
        usedIcons.push(iconSetCopy[random]);
        iconSetCopy.splice(random, 1);
    }
    let duplicate = usedIcons;
    usedIcons.push(...duplicate);

    const usedIconsCopy = [...usedIcons]; // Same here - creating a copy; do not assign values directly(it works for original ref only) !!

    for(let j=0; j<usedIconsCopy.length; j++) {
        randomizedIcons.push(setIcon(usedIcons));
    }
    console.warn(randomizedIcons);
}

function setIcon(usedIcons) {
    let index = Math.floor(Math.random() * usedIcons.length);
    let chosenIcon = usedIcons[index];
    usedIcons.splice(index, 1);
    return chosenIcon;
}

// We need to declare this variable outside of function component, to prevent it from being re-rendered and causing SVG path mismatch between SSR and CSR
let allTiles;

function Landing(props) {
    // DEFINE GLOBAL ASSIGNMENT THAT WILL INDICATE WE WANT TO USE LEGACY anime({}) call exactly as it used to be
    const anime = Animation.default;

    const { data, status } = useSession();

    console.log(data);

    // We use this hook to apply icon coloring animation (see useLayoutEffect below)
    const [render, setRender] = useState(false);
    const [isUserTabOpen, setUserTabOpen] = useState(false);
    const [isAnimationRunning, setAnimationRunning] = useState(false);

    useEffect(() => {
        // This useEffect happens only once - that is mandatory here !s
        getRandomIcons(icon_Sets[`fas`], usedIcons, randomizedIcons);
        setRender(true);
    }, []);

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

    useEffect(() => {

        anime({
            targets: `.${styles['start']}`,
            duration: 3000,
            opacity: [0, 1],
            easing: 'linear',
        })

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

    }, [render]);

    allTiles = tileCodes.map((code, index) => 
        <div className={`${styles[`card`]} ${code}`} key={index.toString()}><div className={styles['card-front']}></div> <div className={styles['card-back']}> {randomizedIcons.length && <FontAwesomeIcon icon={`${randomizedIcons[index]}`} className={`${styles[`fa-icon`]} ${code}`}/>} </div></div>
    );

    /* const changeScreen = React.useRef(null); */

    function fadeAnimation() {
/*         changeScreen.current = anime({
            targets: 'body',
            duration: 1000,
            opacity: [0, 1],
            easing: 'linear',
        }) */
    }

    function checkUserSession() {
        if(status === 'authenticated') {
            Router.push("/play");
        } else {
            // Not authenticated yet, need to sign in with Google
            signIn('google');
        }
    }

    if(status === 'loading') { return <h1> Loading, please wait ... </h1>}
    return( 
        <div className={styles['landing-all']}>

            <div className={styles['layer']}>
                <div className={styles['theme']} ref={gameBoard}>
                    {allTiles}
                </div>
            </div>

            {status === 'authenticated' && <button className={styles['start']} onClick={() => {signOut()}}> Sign Out </button> }

            <div className={styles['content']}>
                <div className={styles['content-section']}>
                    <div className={styles["game-title"]}>FLASH</div>
                    <div className={styles['game-subtitle']}>The Ultimate Memory Game</div>
                </div>
                <div className={styles['content-action']}>
                    <div className={styles['from-author']}> The hardest memory game You would ever play... {status === 'authenticated' && <span>Hi {data.user.name}</span>}</div>
                    {/* <button className={styles['start']} onClick={() => {props.changeComponent(); fadeAnimation();}}> Play </button> */}
                    <button className={styles['start']} onClick={() => {checkUserSession()}}> Play </button>
                </div>
            </div>     

            {status === 'authenticated' && (
                <div className={styles['setup-container']} onClick={() => { setUserTabOpen(true);/* setAnimationRunning(true); */ /* animateTransition(); */}}>
                    <div className={styles_preview['follow-me']} >
                        <FontAwesomeIcon icon={user} className={styles_preview["icon-user"]} />
                    </div>    
                </div>  
            )}


            {isUserTabOpen && <UserTab includeUserStats={false} setAnimationRunning={setAnimationRunning} setUserTabOpen={setUserTabOpen} player={data.user} /* player={props.player} levelsCount={props.levelsCount} */ />}
        </div>
        
    )
}

export default Landing;
export { getRandomIcons, setIcon, icon_Sets };