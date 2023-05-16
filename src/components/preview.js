import React, { useEffect, useState, useRef } from 'react';
import styles from '../styles/preview.module.css';
import * as Animation from 'animejs';
//import anime from 'animejs/lib/anime.es.js';
//import anime from "animejs/lib/anime.es.js"

import { LevelInfo } from './level_info.js';
import { SerieBox } from './serie_box.js';
//import  { all_levels } from './global/all_levels.js'; NOT NEEDED SINCE V2 REWORK

import { faGithub as github} from '@fortawesome/free-brands-svg-icons';
import { faHome as home} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Preview( props ) {
    // DEFINE GLOBAL ASSIGNMENT THAT WILL INDICATE WE WANT TO USE LEGACY anime({}) call exactly as it used to be
    console.warn(props.user_progresses);
    const anime = Animation.default;

    const [[levelChoose, lv_index, serie_abbr, serie_name, serie_desc], setLevelChoose] = useState([null, null, null, null, null]);
    const [chosenSerie, setChosenSerie] = useState(null);
    const [chosenSerieName, setChosenSerieName] = useState(null);
    const [isLevelStart, setLevelStart] = useState(false);
    
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
        <SerieBox serie={serie} setSerieName={setChosenSerie} setLevelChoose={setLevelChoose} key={serie.index.toString() + serie.name} />
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

    return (
        <div className={styles['bg-main']}>
            <div className={styles['seizure-flexbox']}>
                <div className={styles['top-bar']} ref={topBarRef}>
                    <div className={styles['top-bar__return']}>
                        <button className={styles['return-back']} onClick={() => {props.backToHome(); props.proceed();}}> 
                            <FontAwesomeIcon icon={home} className={styles["icon-home"]} />
                        </button>
                    </div>

                    <div className={styles['top-bar__title']}>
                        <div className={styles['title-name']} ref={currSerie}> {chosenSerieName ? chosenSerieName : `Choose a serie` } </div>
                    </div>

                    <div className={styles['top-bar__follow']}>
                        <div className={styles['follow-me']} onClick={() => console.log(props)}>
                            <FontAwesomeIcon icon={github} className={styles["icon-github"]} />
                        </div>    
                    </div>
                    
                </div>

                <div className={styles['showcase-block']}>
                    {levels_showcase}
                </div>


            </div>

            { levelChoose && (
                <LevelInfo serie_name={serie_name} serie_abbr={serie_abbr} serie_desc={serie_desc} level_details={levelChoose} lv_index={lv_index} closeLevelInfo={setLevelChoose} 
                    changeComponent={props.changeComponent} user_progresses={props.user_progresses} 
                    setLevelData={props.setLevelData} setLevelProgressRecord={props.setLevelProgressRecord} setGameCounters={props.setGameCounters}
                />
            )}
        </div>
        
    )

}

export default Preview;