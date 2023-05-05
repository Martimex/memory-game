import Router from "next/router";
import styles from '../styles/level_info.module.css';
import styles_diffcolors from '../styles/variables/difficulty_colors.module.css';
import { series_abbr } from '../global/series_abbr.js';
import { background_gradients } from '../global/exceptions/background_gradients.js';
import React, { useEffect, useRef } from 'react';
import { faStar as star_full, faCheck as check, faFileAlt as notes, faChartBar as stats, faPlay as play } from '@fortawesome/free-solid-svg-icons';
import { faStar as star_empty} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Animation from 'animejs';

// DEFINE GLOBAL ASSIGNMENT THAT WILL INDICATE WE WANT TO USE LEGACY anime({}) call exactly as it used to be
const anime = Animation.default;

function LevelInfo(props) {

    const bg_placeholder_ref = useRef(null);
    const levelInfoAll_ref = useRef(null);
    const levelBox_ref = useRef(null);

    function checkCloseCondition(e) {
        if(e.target.classList.contains(`${styles['level-info-box']}`)) {
            document.body.style.overflow = 'auto';

            async function init() {
                await animation()
                await props.closeLevelInfo([null, null]);
            }

            async function animation() {
                const a1 = anime({
                    targets: levelBox_ref.current,
                    duration: 500,
                    opacity: [1, 0],
                    translateX: '-=8%',
                    easing: 'linear',
                }).finished;
                await Promise.all([a1]);
            }

           init();

        }
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
       
            difficulty_Dynamic_Elems[x].style.backgroundImage  = `-webkit-linear-gradient(135deg, ${main_diff_col}, ${sec_diff_col})`;
            difficulty_Dynamic_Elems[x].style.backgroundClip = `text`;
            difficulty_Dynamic_Elems[x].style.textShadow = `.15rem .15rem .15rem ${sec_diff_col}`;
        }

        // For level round border
        const level_tab = document.querySelector(`.${styles['content-item-level']}`);
        const level_tab_styles = getComputedStyle(level_tab);
        const border_col = level_tab_styles.getPropertyValue(`--border-color_${difficulty}`);
        level_tab.style.borderColor = border_col;

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

    function blockClicking() {
        document.body.style.pointerEvents = 'none';
    }

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        setLevelBoxPosition(levelInfoAll_ref.current);
        applyDifficultyTextColors(props.level_details.difficulty)
       const img_url = `bgs/${props.serie_abbr}/bg-${props.level_details.number}.svg`;
        loadBackground_preview(img_url)
            .then(() => {
                bg_placeholder_ref.current.style.backgroundImage = `url(${img_url})`;
                anime({
                    targets: bg_placeholder_ref.current,
                    duration: 500,
                    opacity: [0, 1],
                    easing: 'linear',
                })
            })
            .catch((error) => { console.log(error); 
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

    console.log(props, props.serie);
    console.log(props.level_details);

    return (
        <div className={styles['level-info-blurred']} ref={levelInfoAll_ref} onClick={(e) => checkCloseCondition(e)} >
            <div className={styles['level-info-box']} ref={levelBox_ref}>
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
                                <FontAwesomeIcon icon={check} className={styles['icon-check']}></FontAwesomeIcon>
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
{/*                             <div className={`${styles['content-item-level_difficulty']} ${styles['dynamic-text']}`}> {props.level_details.creatorUserId} </div> */}
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
                        <div className={styles['play']} onClick={() => { blockClicking(); Router.push('/preview/[id]', `/preview/${props.level_details.id}`) } } >
                            {/* Once play button is clicked, do not forget to temporarily block click events during level load time */}
                            <div className={styles['play-level']}> 
                                <FontAwesomeIcon icon={play} className={styles['icon-play']}> </FontAwesomeIcon>
                            </div>
                        </div>
                    </div>

                    <div className={styles['level-info-box-content-item']} datatype='stars'>
                        <FontAwesomeIcon icon={star_full} className={styles['icon-star_full']}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={star_empty} className={styles['icon-star_empty']}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={star_empty} className={styles['icon-star_empty']}></FontAwesomeIcon>
                    </div>

                    <div className={styles['bg-placeholder']} ref={bg_placeholder_ref} ></div>
                </div>
            </div>
        </div>
    )
}

export { LevelInfo };