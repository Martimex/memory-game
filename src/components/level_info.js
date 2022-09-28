import '../styles/level_info.css';
import '../styles/variables/difficulty_colors.css';
import { series_abbr } from '../global/series_abbr.js';
import { background_gradients } from '../global/exceptions/background_gradients.js';
import React, { useEffect, useRef } from 'react';
import { faStar as star_full, faCheck as check, faFileAlt as notes, faChartBar as stats, faPlay as play } from '@fortawesome/free-solid-svg-icons';
import { faStar as star_empty} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import anime from 'animejs';

function LevelInfo(props) {

    const bg_placeholder_ref = useRef(null);
    const levelInfoAll_ref = useRef(null);
    const levelBox_ref = useRef(null);

    function checkCloseCondition(e) {
        if(e.target.classList.contains('level-info-box')) {
            
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

       const difficulty_Dynamic_Elems = document.querySelectorAll('.dynamic-text');
       for(let x=0; x< difficulty_Dynamic_Elems.length; x++) {
            const styles = getComputedStyle(difficulty_Dynamic_Elems[x]);
            const main_diff_col = styles.getPropertyValue(`--color_${difficulty}_main`);
            const sec_diff_col = styles.getPropertyValue(`--color_${difficulty}_sec`);
       
            difficulty_Dynamic_Elems[x].style.backgroundImage  = `-webkit-linear-gradient(135deg, ${main_diff_col}, ${sec_diff_col})`;
            difficulty_Dynamic_Elems[x].style.backgroundClip = `text`;
            difficulty_Dynamic_Elems[x].style.textShadow = `.15rem .15rem .15rem ${sec_diff_col}`;
        }

        // For level round border
        const level_tab = document.querySelector('.content-item-level');
        const level_tab_styles = getComputedStyle(level_tab);
        const border_col = level_tab_styles.getPropertyValue(`--border-color_${difficulty}`);
        level_tab.style.borderColor = border_col;

        // For play button border
        const play_btn = document.querySelector('.play');
        const play_btn_styles = getComputedStyle(play_btn);
        const border_col_2 = play_btn_styles.getPropertyValue(`--border-color_${difficulty}`);
        play_btn.style.borderColor = border_col_2;

        // For play button icon
        const play_icon = document.querySelector('.icon-play');
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
        setLevelBoxPosition(levelInfoAll_ref.current);
        applyDifficultyTextColors(props.level_details.difficulty)
       const img_url = `bgs/${props.serie_name}/bg-${props.level_details.number}.svg`;
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
                if((props.serie_name === 'tf') && (parseInt(props.level_details.number) <= 6)) {
                    bg_placeholder_ref.current.style.backgroundImage = background_gradients[props.serie_name][props.level_details.number];
                    
                    anime({
                        targets: bg_placeholder_ref.current,
                        duration: 500,
                        opacity: [0, 1],
                        easing: 'linear',
                    })
                }
            })
    }, [])

    return (
        <div className='level-info-blurred' ref={levelInfoAll_ref} onClick={(e) => checkCloseCondition(e)} >
            <div className="level-info-box" ref={levelBox_ref}>
                <div className="level-info-box-content" >
                    <div className='level-info-box-content-item' datatype="info">
                        <div className='content-item-part'>
                            <div className='content-item-serie'> {series_abbr[props.serie_name]}  </div>
                        </div>
                        <div className='content-item-part'>
                            <div className='content-item-flex'>
                                {/* Once this button is clicked, that section changes to whatever the button is about, with 
                                    possibility to scroll the section down (if necessary) and moving back to main section 
                                */}
                                <div className='content-item-origin_btn'>
                                    <FontAwesomeIcon icon={notes} className="icon-notes"></FontAwesomeIcon>
                                </div>

                                <div className='content-item-stats_btn'>
                                    <FontAwesomeIcon icon={stats} className="icon-stats"></FontAwesomeIcon>
                                </div>
                            </div>
                        </div>
                        <div className='content-item-verification'>
                            <div className='content-item-verification-circle'>
                                <FontAwesomeIcon icon={check} className="icon-check"></FontAwesomeIcon>
                            </div>
                        </div>
                    </div>

                    <div className='level-info-box-content-item' datatype='main'>
                        <div className='content-item-level-circle'>
                            <div className='content-item-level dynamic-text'>
                                {props.level_details.number}
                            </div>
                        </div>
                        <div className='content-item-part'> 
                            <div className='content-item-time dynamic-text'> Time: {props.level_details.limitations['time'] || '-'} </div>
                            <div className='content-item-time dynamic-text'> Turns: {props.level_details.limitations['turns'] || '-'}  </div>
                            <div className='content-item-time dynamic-text'> Tiles: {props.level_details.tiles} </div>
                            {/*<div className='content-item-score'> Score: 1200 </div>
                            <div className='content-item-trials'> Trials: 225 </div> */}
                        </div>
                        <div className='play' onClick={() => { blockClicking(); props.changeComponent(props.level_details, props.serie_name); props.proceed(); } } >
                            {/* Once play button is clicked, do not forget to temporarily block click events during level load time */}
                            <div className='play-level'> 
                                <FontAwesomeIcon icon={play} className="icon-play"> </FontAwesomeIcon>
                            </div>
                        </div>
                    </div>

                    <div className='level-info-box-content-item' datatype='stars'>
                        <FontAwesomeIcon icon={star_full} className="icon-star_full"></FontAwesomeIcon>
                        <FontAwesomeIcon icon={star_empty} className="icon-star_empty"></FontAwesomeIcon>
                        <FontAwesomeIcon icon={star_empty} className="icon-star_empty"></FontAwesomeIcon>
                    </div>

                    <div className='bg-placeholder' ref={bg_placeholder_ref} ></div>
                </div>
            </div>
        </div>
    )
}

export { LevelInfo };