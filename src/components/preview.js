import React, { useEffect, useState, useRef } from 'react';
import styles from '../styles/preview.module.css';
import * as Animation from 'animejs';
import { useSession } from 'next-auth/react';
import Router from "next/router";
//import anime from 'animejs/lib/anime.es.js';
//import anime from "animejs/lib/anime.es.js"

import { LevelInfo } from './level_info.js';
import { SerieBox } from './serie_box.js';
import UserTab from './user_tab.js';
//import  { all_levels } from './global/all_levels.js'; NOT NEEDED SINCE V2 REWORK

/* import { faGithub as github} from '@fortawesome/free-brands-svg-icons'; */
import { faUserCircle as user} from '@fortawesome/free-solid-svg-icons';
import { faHome as home} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// We need to make sure it is a non-mutable value. We are going to use it for TopBar showUp animation, and we have to have reference 100% value
let topBarHeight;

function Preview( props ) {
    // DEFINE GLOBAL ASSIGNMENT THAT WILL INDICATE WE WANT TO USE LEGACY anime({}) call exactly as it used to be
    console.warn(props.user_progresses);
    const anime = Animation.default;

    const [[levelChoose, lv_index, serie_abbr, serie_name, serie_desc], setLevelChoose] = useState([null, null, null, null, null]);
    const [chosenSerie, setChosenSerie] = useState(null);
    const [chosenSerieName, setChosenSerieName] = useState(null);
    const [isLevelStart, setLevelStart] = useState(false);
    const [isUserTabOpen, setUserTabOpen] = useState(null);
    const [isAnimationRunning, setAnimationRunning] = useState(true);

    const { data: session, status } = useSession();
    
    // State to share with main Memory_game component
    /*     const [levelData, setLevelData] = useState(null);
    const [levelProgressRecord, setLevelProgressRecord] = useState(null);
    const [gameCounters, setGameCounters] = useState(null); - ALL 3 MOVED TO THE PLAY COMPONENT */ 

    const currSerie = useRef(null);
    const topBarRef = useRef(null);

    /* const levels_showcase = Object.keys(all_levels).map((serie_name, index) => 
        <SerieBox serie={serie_name} setSerieName={setChosenSerie} setLevelChoose={setLevelChoose} key={serie_name.toString()} />
    ) */

    //props.data.map((serie, index) => console.log(serie.name));

    const levels_showcase = props.data.map((serie, index) => 
        <SerieBox serie={serie} setSerieName={setChosenSerie} setLevelChoose={setLevelChoose} isAnimationRunning={isAnimationRunning} key={serie.index.toString() + serie.name} />
    ) 

    useEffect(() => {
        if(levelChoose !== null) {
            document.body.style.overflow = 'hidden';
        } else if(!levelChoose) {
            //
        }

    }, [levelChoose]);

/*     useEffect(() => {
        if(levelData) { 
            console.log(levelData, levelProgressRecord, gameCounters ) 
            props.changeComponent('game');
        }
    }, [levelData]) */

    useEffect(() => {
        async function fade() {
            await animate()
                .then(() => setChosenSerieName(chosenSerie))
        }
        
        async function animate() {
            const a1 = anime({
                targets: `.${styles['title-name']}`,
                duration: 500,
                opacity: [1, 0],
                easing: 'linear',
            }).finished;

            await Promise.all([a1]);
        }

        fade();

    }, [chosenSerie])

    useEffect(() => {
        anime({
            targets: `.${styles['title-name']}`,
            duration: 500,
            opacity: [0, 1],
            easing: 'linear',
        })
    }, [chosenSerieName])

    useEffect(() => {
        window.addEventListener('scroll', checkStickyBar); 

        return () => {
            window.removeEventListener('scroll', checkStickyBar);
        }
    });

    function checkStickyBar() {
        if(!topBarRef.current) {return;} // Solves weird bug when using "home button", which later indicates that topBarRef.current.classList is not defined
        const isSticky_before = topBarRef.current.classList.contains(styles['sticky']);
        topBarRef.current.classList.toggle(styles['sticky'], window.scrollY > 0);
        const isSticky_after = topBarRef.current.classList.contains(styles['sticky']);

        if(isSticky_before !== isSticky_after) {
            if(isSticky_after === true) {
                // Enter sticky mode
                anime({
                    targets: topBarRef.current,
                    duration: 500,
                    backgroundColor: ['#2223', '#222f'],
                    easing: 'linear',
                })
            }

            else {
                // Close sticky mode
                anime({
                    targets: topBarRef.current,
                    duration: 500,
                    backgroundColor: ['#222f', '#2223'],
                    easing: 'linear',
                })
            }
        }
    }

    useEffect(() => {
        if(isUserTabOpen === false) {
            const topBar = document.querySelector(`.${styles['top-bar']}`);
            anime({
                targets: topBar,
                height: {value: +topBarHeight, duration: 500, easing: 'easeInCubic'},
                opacity: {value: 1, duration: 550, easing: 'linear'},
            }).finished;
            setAnimationRunning(false);
        }
    }, [isUserTabOpen]);

    useEffect(() => {
        setAnimationRunning(false);
    }, [])

    async function animateTransition() {
        const topBar = document.querySelector(`.${styles['top-bar']}`);
/*         const previewMain = document.querySelector(`.${styles['bg-main']}`); // Going to use it to temporarily block click events;
        previewMain.style.pointerEvents = 'none'; */
        topBarHeight = (topBarHeight)? topBarHeight : topBar.offsetHeight; // Prevents from a bug that a bar grows 2px every animation cycle
        await anime({
            targets: topBar,
            height: {value: 0, duration: 500, easing: 'easeInCubic'},
            opacity: {value: 0, duration: 550, easing: 'linear'},
        }).finished;
        setUserTabOpen(true);
    }

    return (
        <div className={styles['bg-main']}>
            <div className={styles['seizure-flexbox']}>
                <div className={styles['top-bar']} ref={topBarRef}>
                    <div className={styles['top-bar__return']}>
                        <button className={styles['return-back']} onClick={() => {setAnimationRunning(true); Router.push('/')/* props.backToHome(); props.proceed(); */}}> 
                            <FontAwesomeIcon icon={home} className={styles["icon-home"]} />
                        </button>
                    </div>

                    <div className={styles['top-bar__title']}>
                        <div className={styles['title-name']} ref={currSerie}> {chosenSerieName ? chosenSerieName : `Choose a serie` } </div>
                    </div>

                    <div className={styles['top-bar__follow']}>
                        <div className={styles['follow-me']} onClick={() => {setAnimationRunning(true); animateTransition();}}>
                            <FontAwesomeIcon icon={user} className={styles["icon-user"]} />
                        </div>    
                    </div>

                </div>

                {/* <h1 style={{color: 'white'}}> {session && session.user.name} </h1> */}
                <div className={styles['showcase-block']}>
                    {levels_showcase}
                </div>


            </div>

            { isUserTabOpen && (
                <UserTab includeUserStats={true} player={props.player} levelsCount={props.levelsCount} setUserTabOpen={setUserTabOpen} setAnimationRunning={setAnimationRunning} />
            )}   

            { levelChoose && (
                <LevelInfo serie_name={serie_name} serie_abbr={serie_abbr} serie_desc={serie_desc} level_details={levelChoose} lv_index={lv_index} closeLevelInfo={setLevelChoose} 
                    changeComponent={props.changeComponent} user_progresses={props.user_progresses} playerId={props.player.id}
                    setLevelData={props.setLevelData} setLevelProgressRecord={props.setLevelProgressRecord} setGameCounters={props.setGameCounters}
                />
            )}
        </div>
        
    )

}

export default Preview;