import Router from "next/router";
import styles from '../styles/level_info.module.css';
import styles_diffcolors from '../styles/variables/difficulty_colors.module.css';
import { series_abbr } from '../global/series_abbr.js';
import { background_gradients } from '../global/exceptions/background_gradients.js';
import LevelDescription from "./level_description";
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { faStar as star_full, faPlus as icon_plus, faMinus as icon_minus, faPlay as play } from '@fortawesome/free-solid-svg-icons';
import { faStar as star_empty} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Animation from 'animejs';

// DEFINE GLOBAL ASSIGNMENT THAT WILL INDICATE WE WANT TO USE LEGACY anime({}) call exactly as it used to be
const anime = Animation.default;
let progressRecord = ''; // We will update this variable with initial useEffect call

function LevelInfo(props) {
    console.log('our props: ',  props);
    console.log(`We look for ${props.level_details.id} inside this object: ${props.user_progresses} (consider each value of levelId key)`);
    console.log('user_progress array: ', props.user_progresses);
    const [viewRepaint, setViewRepaint] = useState(false);
    const [isLevelDescOpened, setLevelDescOpened] = useState(false);
    const bg_placeholder_ref = useRef(null);
    const levelInfoAll_ref = useRef(null);
    const levelBox_ref = useRef(null);

    function checkCloseCondition(e) {
        if(e.target.classList.contains(`${styles['level-info-box']}`)) {
            closeLevelInfo();
        }
    }

    function closeLevelInfo() {
        document.body.style.overflow = 'auto';

        async function init() {
            await animation()
            await props.closeLevelInfo([null, null]);
        }

        async function animation() {
            document.body.style.pointerEvents = 'none';
            const a1 = anime({
                targets: levelBox_ref.current,
                duration: 600,
                opacity: { value: [1, 0], easing: 'easeInOutCubic' },
                translateX: { value: '-=1.5%', duration: 150, easing: 'linear' },
            }).finished;
            const a2 = anime({
                /* targets: levelInfoAll_ref.current, */
                duration: 600,
                opacity: [1, 0],
                easing: 'linear',
            }).finished;
            await Promise.all([a1, a2]);
            document.body.style.pointerEvents = 'auto';
        }

        init();
    }

    function loadBackground_preview(url) {
        return new Promise((resolve, reject) => {
            const bg_image = new Image();
            bg_image.addEventListener('load', () => {
                resolve(bg_image);
            })
            bg_image.addEventListener('error', (err) => {reject(err)});

            bg_image.src = url;
        })

    }

    function applyDifficultyTextColors(difficulty) {
        console.warn(styles_diffcolors);
       const difficulty_Dynamic_Elems = document.querySelectorAll(`.${styles['dynamic-text']}`);
       for(let x=0; x< difficulty_Dynamic_Elems.length; x++) {
            const styles = getComputedStyle(difficulty_Dynamic_Elems[x]);
            const main_diff_col = styles.getPropertyValue(`--color_${difficulty}_main`);
            const sec_diff_col = styles.getPropertyValue(`--color_${difficulty}_sec`);
            console.log(difficulty,main_diff_col, sec_diff_col);
       
            difficulty_Dynamic_Elems[x].style.backgroundImage  = `-webkit-linear-gradient(135deg, ${main_diff_col}, ${sec_diff_col})`;
            difficulty_Dynamic_Elems[x].style.backgroundClip = `text`;
            difficulty_Dynamic_Elems[x].style.textShadow = `.15rem .15rem .2rem ${sec_diff_col}`;
        }

/*         UNCOMMENT LATER // For level round border
        const level_tab = document.querySelector(`.${styles['content-item-level']}`);
        const level_tab_styles = getComputedStyle(level_tab);
        const border_col = level_tab_styles.getPropertyValue(`--border-color_${difficulty}`);
        level_tab.style.borderColor = border_col; */

        // For play button border
        const play_btn = document.querySelector(`.${styles['play']}`);
        const play_btn_styles = getComputedStyle(play_btn);
        const border_col_2 = play_btn_styles.getPropertyValue(`--border-color_${difficulty}`);
        play_btn.style.borderColor = border_col_2;

        // For play button icon
        const play_icon = document.querySelector(`.${styles['icon-play']}`);
        const play_icon_styles = getComputedStyle(play_icon);
        const col = play_icon_styles.getPropertyValue(`--playIcon-color_${difficulty}`);
        play_icon.style.color = col;

    }

    function setLevelBoxPosition(newScreen) {
        const scrolled = window.scrollY;
        newScreen.style.top = `${scrolled}px`;
        levelBox_ref.current.style.opacity = 1; // That prevents form initial flickering (combined with CSS style for opacity: 0)
    }

    async function fadeScreenAnimation() {
        const screen = document.querySelector(`.${styles['level-info-blurred']}`); 
        const level_info_box = document.querySelector(`.${styles['level-info-box']}`);

        const a1 = anime({
            targets: screen,
            duration: 450,
            background: '#000',
            easing: 'linear',
        }).finished;
        const a2 = anime({
            targets: level_info_box,
            duration: 450,
            opacity: 0,
            easing: 'linear',
        }).finished;
        await Promise.all([a1, a2]);
    }

    function blockClicking() {
        document.body.style.pointerEvents = 'none';
    }

    function getProgressRecord() {
        if(!props.user_progresses.length) return;
        return props.user_progresses.find((record, ind) => props.level_details.id === record.levelId)
    }

    useEffect(() => {
        //if(1) {return} // DELETE THIS SINGLE LINE AFTER DEVELOPING STYLES FOR V2 LEVEL_INFO
        document.body.style.overflowY = 'hidden';
        progressRecord = getProgressRecord();
        setViewRepaint(!viewRepaint);
        console.warn('This is the progress record: ', progressRecord)
        setLevelBoxPosition(levelInfoAll_ref.current);
        applyDifficultyTextColors(props.level_details.difficulty)
        const img_url = `bgs/${props.serie_abbr}/bg-${props.level_details.number}.svg`;
        loadBackground_preview(img_url)
            .then(() => {
                bg_placeholder_ref.current.style.backgroundImage = `url(${img_url})`;
                anime({
                    targets: bg_placeholder_ref.current,
                    duration: 350,
                    opacity: [0, 1],
                    easing: 'linear',
                })
            })
            .catch((error) => { console.log(error); 

                anime({
                    targets: bg_placeholder_ref.current,
                    duration: 350,
                    opacity: [0, 1],
                    easing: 'linear',
                })

                // + Handle exceptions for TF serie levels (1 to 6), because they only have default SVG backgrounds, but CSS gradients
                if((props.serie_abbr === 'tf_1') && (parseInt(props.level_details.number) <= 6)) {
                    bg_placeholder_ref.current.style.backgroundImage = background_gradients[props.serie_abbr][props.level_details.number];
                    
                    anime({
                        targets: bg_placeholder_ref.current,
                        duration: 500,
                        opacity: [0, 1],
                        easing: 'linear',
                    })
                }
            })
    }, [])

    async function handleLevelDesc() {
        if(isLevelDescOpened) {
            await asyncDescriptionShowUp(false);
            setLevelDescOpened(!isLevelDescOpened)
        }
        else {
            setLevelDescOpened(!isLevelDescOpened)
        }
    }

    useEffect(() => {
        if(isLevelDescOpened) {
            asyncDescriptionShowUp(true);
        }
    }, [isLevelDescOpened])

    async function asyncDescriptionShowUp(shouldBeShown) {
        // DONT FORGET TO BLOCK CLICK EVENTS
        document.body.style.pointerEvents = 'none';
        const description__box = document.querySelector(`.${styles['lv-description__box']}`);
        const description__text = document.querySelector(`.${styles['lv-description__text']}`);
        const box_content = document.querySelector(`.${styles['box__content']}`);
        /* console.error(description__text); */
        const a1 = anime({
            targets: description__box,
            duration: shouldBeShown? 450 : 600,
            opacity: shouldBeShown? 1 : 0,
            easing: shouldBeShown? 'linear' : 'easeInQuad',
        }).finished;
        const a2 = anime({
            targets: box_content,
            duration: shouldBeShown? 600 : 450,
            opacity: shouldBeShown? 0 : 1,
            easing: shouldBeShown? 'easeInQuad' : 'linear',
        }).finished;
        const a3 = anime({
            targets: description__text,
            duration: shouldBeShown? 650 : 350,
            opacity: shouldBeShown? [0, 1] : 0,
            easing: shouldBeShown? 'linear' : 'linear',
        }).finished;
        await Promise.all([a1, a2, a3]);
        // AND TO UNBLOCK THEM AFTERWARDS
        document.body.style.pointerEvents = 'auto';
    }

   /*  console.log(props, props.serie);
    console.log(props.level_details); */

    const startLevel = async function(e) {
        e.preventDefault();
        //console.log('submitting ...', props.user_progresses.map(el => el.levelId).find(props.level_details.id), props.level_details.id);
        //const DUMMY_USER_ID = 'clhf5gk8800009sw4tx7ssxam'; // DUMMY USER IS:  Wóda cuda // REMOVE THIS AFTER GOING FOR AUTHENTICATION SERVICE (WE WILL MAKE US OF USESESSION OVER HERE)

        const user_id = props.playerId;  //DUMMY_USER_ID;
        const level_id = props.level_details.id;
        const level_difficulty = props.level_details.difficulty;
        console.log('isLVFOUND: ', props.user_progresses.find(el => el.levelId === props.level_details.id));
        try {

            // WE CAN ALSO FETCH A LEVEL FROM HERE
            const level = await fetch(`api/level/${level_id}`, {
                method: 'GET',
                headers: { 'Content-Type' : 'application/json' },
            })
                .then((res) => res.body)
                .then(rb => {
                    const reader = rb.getReader();

                    return new ReadableStream({
                        start(controller) {

                            function push() {
                                reader.read().then(({ done, value }) => {
                                    if(done)  {
                                        //console.log('done: ', done);
                                        controller.close();
                                        return;
                                    }

                                    controller.enqueue(value);
                                    //console.log(done, value);
                                    push();
                                })
                            }

                            push();
                        },
                    });
                })
                .then(stream => new Response(stream, { headers: { "Content-Type": "text/html" } }).text())
                .then((result) => JSON.parse(result) );
            
            console.log('OUR LEVEL IS ! : ');
            console.dir(level);

            let sampleObj = {};

            for(let key in level) {
                //console.log(level[key]);
                if(level[key] instanceof Object && Boolean(level[key][key])) {
                    // Level specific settings (such as win conditions, animation times, limitation, tile sizings FALL HERE BELOW) :
                    sampleObj[key] = JSON.parse(level[key][key].replace(/'/ig, `"`).replace(/(\w+:)|(\w+ :)/g, function(matchedStr) {  // convert String({} with own properties) to an array
                        return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
                    }))
                }
                else if(level[key] instanceof Number || String) {
                    // All the props that are used to identify the level from others
                    sampleObj[key] = level[key];
                }
            }

            if(Boolean(Object.keys(level).length === Object.keys(sampleObj).length) === false) {
                throw new Error(`Rewriting object properties left new object version with less than expected properties. Old version had ${Object.keys(level).length} properties, while new version has ${Object.keys(sampleObj).length} properties included.`);
            }

            const body = { user_id, level_id, level_difficulty };
            if(Boolean(props.user_progresses.find(el => el.levelId === props.level_details.id)) === false) {
                // Create new progress record ONLY IF the player have not played the level yet
                await fetch('api/progress', {
                    method: 'POST',
                    headers:  { 'Content-Type' : 'application/json' },
                    body: JSON.stringify(body)
                });
            }
            else { console.warn('User already played the level, no need to duplicate records @')};

            console.log(level_id)
            //const progress_credentials = level_id + '&player=' + props.playerId
            const lv_progress = await fetch(`api/progress/${level_id}/${props.playerId}`, {
                method: 'GET',
                headers:  { 'Content-Type' : 'application/json' },
            })
                .then((res) => res.body)
                .then(rb => {
                    const reader = rb.getReader();

                    return new ReadableStream({
                        start(controller) {

                            function push() {
                                reader.read().then(({ done, value }) => {
                                    if(done)  {
                                        //console.log('done: ', done);
                                        controller.close();
                                        return;
                                    }

                                    controller.enqueue(value);
                                    //console.log(done, value);
                                    push();
                                })
                            }

                            push();
                        },
                    });
                })
                .then(stream => new Response(stream, { headers: { "Content-Type": "text/html" } }).text())
                .then((result) => JSON.parse(result) );

            console.log('FINALLY OUR PROGRESS RECORD IS: ', lv_progress);
            
            const currentProgress = {
                id: lv_progress.id,
                stars: lv_progress.stars_got,
                lv_progress: lv_progress.lv_progress,
                highscore: lv_progress.highscore
            }

            const allGameCounters = {
                cardsOpened: [],
                spreeCount: 0,
                totalRemainingTime: [],
                totalRemainingTurns: [],
            }

            props.setLevelProgressRecord(currentProgress);
            props.setGameCounters(allGameCounters);

            //await Router.push('/preview/[id]', `/preview/${props.level_details.id}`); // Uncomment after finishing try block

            // Push the level data as props and this way initialize the Game Component
            await fadeScreenAnimation();
            props.setLevelData(sampleObj);
        }
        catch(err) { console.error(err); }
    }

    console.log('LEVEL INFO PROPS:  ', props);

    return (
        <div className={styles["level-info-blurred"]} ref={levelInfoAll_ref} onClick={(e) => checkCloseCondition(e)} >
            <div className={styles["level-info-box"]} ref={levelBox_ref}>
                <div className={styles["box__background"]} ref={bg_placeholder_ref} >
                    <div className={styles['level-button-box']}>
                        <div className={styles['level-button-box__item']} onClick={() => handleLevelDesc()}>
                            <FontAwesomeIcon  icon={icon_plus} className={styles['icon-plus']}></FontAwesomeIcon>
                        </div>
                        <div className={styles['level-button-box__item']} onClick={() => closeLevelInfo()}>
                            <FontAwesomeIcon icon={icon_minus} className={styles['icon-minus']}></FontAwesomeIcon>
                        </div>
                    </div>
                    <div className={styles["box__content"]} >
                        <div className={styles["content__serie"]}>
                            <div className={styles["serie__title-box"]}>
                                <span className={styles["serie__title-box-text"]}> SERIE </span>
                            </div>
                            <div className={styles["serie__info-box"]}>
                                <div className={styles["serie__info-box__about"]}>
                                    <div className={styles["info-box__about-box"]}>
                                        <span className={styles["info-box__about-box-main"]}>{props.serie_name}</span>
                                    </div>
                                    <span className={styles["info-box__about-text"]}>Ref: {props.serie_abbr}</span>
                                    <span className={styles["info-box__about-text"]}>Levels: {props.serieInfo.Levels.length}</span>
                                </div>
                                <div className={styles["serie__info-box__desc"]}>
                                    <span className={styles["info-box__desc-text"]}>
                                        {props.serie_desc}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={styles["content__level"]}>
                            <div className={styles["level__title-box"]}>
                                <span className={`${styles["level__title-box-text"]} ${styles['dynamic-text']}`}> {props.level_details.name} </span>
                            </div>
                            <div className={styles["level__info-box"]}>
                                <div className={styles["level__info-box__about"]}>
                                    <span className={`${styles["info-box__about-text-2"]} ${styles['dynamic-text']}`}>ID: #{props.level_details.number}</span>
                                    <span className={`${styles["info-box__about-text-2"]} ${styles['dynamic-text']}`}>Author: {props.level_details.Created_By.name}</span>
                                    <span className={`${styles["info-box__about-text-2"]} ${styles['dynamic-text']}`}>Difficulty: {props.level_details.difficulty}</span>
                                    <span className={`${styles["info-box__about-text-2"]} ${styles['dynamic-text']}`}>Released: {props.level_details.createdAt.split('T')[0].split('-').reverse().join('/')}</span>
                                </div>
                                <div className={styles["level__info-box__play"]}>
                                    <form onSubmit={startLevel}>
                                        <button className={styles['play']} type="submit" value="Create" onClick={() => { blockClicking(); fadeScreenAnimation(); } } >
                                                <div className={styles['play-level']} > 
                                                    <FontAwesomeIcon icon={play} className={styles['icon-play']}> </FontAwesomeIcon>
                                                </div>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className={styles["content__progress"]}>
                            <div className={styles["progress__title-box"]}>
                                <span className={styles["progress__title-box-text"]}> PROGRESS </span>
                            </div>
                            <div className={styles["progress__info-box"]}>
                                <div className={styles["progress__info-box__about"]}>
                                    <div className={styles["info-box__about-box-2"]}>
                                        <span className={styles["info-box__about-box-2-main"]}> {props.playerName} </span>
                                    </div>
                                    <span className={styles["info-box__about-text"]}>Best run: {progressRecord? `${progressRecord.lv_progress}%` : `0%` } </span>
                                    <span className={styles["info-box__about-text"]}>Score: {progressRecord? progressRecord.highscore : 0}</span>
                                </div>
                                <div className={styles["progress__info-box__stats"]}>
                                    {/* <div className={styles["info-box__stats-item"]}>
                                        <span className={styles["info-box__stats-item-text"]}> Best run : </span>
                                        <div className={styles["info-box__stats-item-bar"]}>
                                            <span className={styles["info-box__stats-item-bar-text"]}> 100% </span>
                                        </div>
                                    </div>
                                    <div className={styles["info-box__stats-item"]}>
                                        <span className={styles["info-box__stats-item-text"]}> Highscore : </span>
                                        <div className={styles["info-box__stats-item-bar"]}>
                                            <span className={styles["info-box__stats-item-bar-text"]}> 7654 </span>
                                        </div>
                                    </div> */}
                                    <div className={styles["info-box__stats-item"]}>
                                        {/* <span className={styles["info-box__stats-item-text"]}> Stars </span> */}
                                        <div className={styles["info-box__stats-item-bar"]}>
                                            {  progressRecord? 
                                                (Array.from(new Array(3)).map((el, ind) => {
                                                    return (progressRecord.stars_got > ind)?
                                                        <FontAwesomeIcon key={ind.toString()} icon={star_full} className={styles['icon-star_full']}></FontAwesomeIcon>
                                                        :
                                                        <FontAwesomeIcon key={ind.toString()} icon={star_empty} className={styles['icon-star_empty']}></FontAwesomeIcon> 
                                                }))
                                                :
                                                (Array.from(new Array(3)).map((el, ind) => {
                                                    return <FontAwesomeIcon key={ind.toString()} icon={star_empty} className={styles['icon-star_empty']}></FontAwesomeIcon>
                                                }))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isLevelDescOpened && (
                            <div className={styles["lv-description__box"]} >
                                <div className={styles["lv-description__text"]}>
                                    <p className={styles["lv-description__text-intro"]}> [#{props.level_details.number}] - {props.level_details.name} </p>
                                    <LevelDescription serie_abbr={props.serie_abbr} lv_id={props.level_details.number} />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={styles["bg-placeholder"]} >

            </div>
        </div>
    )

    return (
        <div className={styles['level-info-blurred']} ref={levelInfoAll_ref} onClick={(e) => checkCloseCondition(e)} >
            <div className={styles['level-info-box']} ref={levelBox_ref}>
{/*               <div className={styles['level-info-box__button']}></div>
                <div className={styles['level-info-box__button2']}></div> */}
                <div className={styles['level-info-box-content']} >
                    <div className={styles['level-info-box-content-item']} datatype="info">
                        <div className={styles['content-item-part']}>
                            <div className={styles['content-item-serie']}> {props.serie_name}  </div>
                        </div>
                        <div className={styles['content-item-part']}>
                            <div className={styles['content-item-flex']}>
                                {/* Once this button is clicked, that section changes to whatever the button is about, with 
                                    possibility to scroll the section down (if necessary) and moving back to main section 
                                */}
{/*                                 <div className={styles['content-item-origin_btn']}>
                                    <FontAwesomeIcon icon={notes} className={styles['icon-notes']}></FontAwesomeIcon>
                                </div>

                                <div className={styles['content-item-stats_btn']}>
                                    <FontAwesomeIcon icon={stats} className={styles['icon-stats']}></FontAwesomeIcon>
                                </div> */}
                                {props.serie_desc? props.serie_desc : "<< No description provided >>"}
                            </div>
                        </div>
                        <div className={styles['content-item-verification']}>
                            <div className={styles['content-item-verification-circle']}>
                                {progressRecord? `${progressRecord.lv_progress}%` : `0%` }
                                {/* <FontAwesomeIcon icon={check} className={styles['icon-check']}></FontAwesomeIcon> */}
                            </div>
                        </div>
                    </div>

                    <div className={styles['level-info-box-content-item']} datatype='main'>
                        <div className={styles['content-item-level-circle']}>
                            <div className={`${styles['content-item-level']} ${styles['dynamic-text']}`}>
                                {props.lv_index}
                            </div>
                        </div>
                        <div className={styles['content-item-part']}> 
{/*                             <div className={`${styles['content-item-time']} ${styles['dynamic-text']}`}> Time: {props.level_details.limitations['time'] || '-'} </div>
                            <div className={`${styles['content-item-time']} ${styles['dynamic-text']}`}> Turns: {props.level_details.limitations['turns'] || '-'}  </div>
                            <div className={`${styles['content-item-time']} ${styles['dynamic-text']}`}> Tiles: {props.level_details.tiles} </div> */}
                            <div className={`${styles['content-item-level_name']} ${styles['dynamic-text']}`}>  {props.level_details.name} </div>
                            <div className={`${styles['content-item-level_difficulty']} ${styles['dynamic-text']}`}> Highscore: {progressRecord? progressRecord.highscore : 0} </div>
                            <div className={`${styles['content-item-level_id']} ${styles['dynamic-text']}`}>  id: [#{props.level_details.number}]  Diff: {props.level_details.difficulty} </div>
                            {/*<div className={styles['content-item-score']}> Score: 1200 </div>
                            <div className={styles['content-item-trials']}> Trials: 225 </div> */}
                        </div>
{/*                         <div className={styles['play']} onClick={() => { blockClicking(); props.changeComponent(props.level_details, props.serie_abbr); props.proceed(); } } >
                            Once play button is clicked, do not forget to temporarily block click events during level load time
                            <div className={styles['play-level']}> 
                                <FontAwesomeIcon icon={play} className={styles['icon-play']}> </FontAwesomeIcon>
                            </div>
                        </div> */}
                        <form onSubmit={startLevel}>
                            <button className={styles['play']} type="submit" value="Create" onClick={() => { blockClicking(); /* props.proceed(); */ /* COMMENTED OUT, BECAUSE WE WANT TO WORK APPLYING PROGRESS TO A DB Router.push('/preview/[id]', `/preview/${props.level_details.id}`) */ } } >
                                {/* Once play button is clicked, do not forget to temporarily block click events during level load time */}
                                
                                    <div className={styles['play-level']} > 
                                        <FontAwesomeIcon icon={play} className={styles['icon-play']}> </FontAwesomeIcon>
                                    </div>
                            </button>
                        </form>
                    </div>

                    <div className={styles['level-info-box-content-item']} datatype='stars'>
                        {  progressRecord? 
                                (Array.from(new Array(3)).map((el, ind) => {
                                    return (progressRecord.stars_got > ind)?
                                        <FontAwesomeIcon key={ind.toString()} icon={star_full} className={styles['icon-star_full']}></FontAwesomeIcon>
                                        :
                                        <FontAwesomeIcon key={ind.toString()} icon={star_empty} className={styles['icon-star_empty']}></FontAwesomeIcon> 
                                }))
                                :
                                (Array.from(new Array(3)).map((el, ind) => {
                                    return <FontAwesomeIcon key={ind.toString()} icon={star_empty} className={styles['icon-star_empty']}></FontAwesomeIcon>
                                }))
                        }
{/*                         <FontAwesomeIcon icon={star_full} className={styles['icon-star_full']}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={star_empty} className={styles['icon-star_empty']}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={star_empty} className={styles['icon-star_empty']}></FontAwesomeIcon> */}
                    </div>

                    <div className={styles['bg-placeholder']} ref={bg_placeholder_ref} >
                        <div className={styles['level-button-box']}>
                            <div className={styles['level-button-box__item']}>
                                <FontAwesomeIcon  icon={icon_plus} className={styles['icon-plus']}></FontAwesomeIcon>
                            </div>
                            <div className={styles['level-button-box__item']}>
                                <FontAwesomeIcon icon={icon_minus} className={styles['icon-minus']}></FontAwesomeIcon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { LevelInfo };