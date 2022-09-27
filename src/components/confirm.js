import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import '../styles/confirm.css';
import {level_end_messages} from '../global/predefined/level_end_messages.js';
import { set } from 'animejs';
import { faStar as star_empty} from '@fortawesome/free-regular-svg-icons';
import { faStar as star_full} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const static_classes = {  // Simply classes which are unaffected by game result (win / lost) ?
    bg: `confirmation-bg`,
    box: `confirm-box`,
    title: `info-title`,
    info: `confirm__info`,
    param: `info-param`,
    param_name: `param-name`,
    param_value: `param-value`,
    highscore: `info-highscore`,
    highscore_value: `highscore-value`,
    star: `icon-star`,
    action_container: `action_container`,
    win_btn: `win-btn`,
    lost_btn: `lost-btn`,
}

function Confirm(props) {

    const [endMessage, setEndMessage] = useState(null);

    const table = useRef(null);
    const levelVis = useRef(null);
    const counterVis = useRef(null);
    const counterVis2 = useRef(null); 
    const scoreVis = useRef(null);
    const highscoreVis = useRef(null);

    const confBtn = useRef(null);
    const actionBox_ref = useRef(null);

    let confirmParams = ['.info-level-val', '.info-counter-moves-val', '.info-counter-time-val', '.info-score-val'];
    let highscoreParam = '.total-score';
    const showParamsDuration = 1000;
    const delayStagger = 500;
    const calcParamsDuration = 1600;
    const showButtonDuration = 1200;

    let sub;
    if(props.turns !== null) {
        sub = (props.score + (props.turns * props.msv));
    } else if(props.time !== null) {
        sub = (props.score + (props.time * props.tsv));
    }

    useEffect(() => {

        async function hideButton() {
            const a0 = anime({
                targets: ['.action-box'],
                duration: 0,
                opacity: [0, 0],
                easing: 'linear',
            }).finished;
            
            const a00 = anime({
                targets: [confirmParams, highscoreParam],
                duration: 0,
                opacity: [0, 0],
                easing: 'linear',
            }).finished;

            await Promise.all([a0, a00]);
        }

        async function showParams() {
            const a1 = anime({
                targets: confirmParams,
                duration: showParamsDuration,
                delay: anime.stagger(delayStagger),
                easing: 'easeInSine',
                opacity: [0, 1],
            }).finished;

            const a01 = anime({
                targets: highscoreParam,
                duration: showParamsDuration,
                opacity: [0, 1],
                round: 1,
                keyframes: [
                    {textContent: (props.highscore), duration: 100, opacity: 0 },
                    {textContent: (props.highscore - sub), duration: 100, opacity: 0.1},
                    {opacity: 1, duration: (showParamsDuration - 200)},
                ],
            })

            await Promise.all([a1, a01]);
        }


        async function calcParams() {

            const a2 = anime({
                targets: ['.total-score'],
                duration: calcParamsDuration,
                easing: 'linear',
                round: 1,
                textContent: [(props.highscore - sub), props.highscore],
            }).finished;
            
            const a3 = anime({
                targets: ['.info-score-val'],
                duration: calcParamsDuration,
                easing: 'linear',
                round: 1,
                textContent: [props.score, 0],
            }).finished;

            let a4;

            if(props.turns !== null) {
                a4 = anime({
                    targets: ['.info-counter-moves-val'],
                    duration: calcParamsDuration,
                    easing: 'linear',
                    round: 1,
                    textContent: [props.turns, 0],
                }).finished;

            } else if(props.time !== null) {
                a4 = anime({
                    targets: ['.info-counter-time-val'],
                    duration: calcParamsDuration,
                    easing: 'linear',
                    round: 1,
                    textContent: [props.time, 0],
                }).finished;
            }

            await Promise.all([a2, a3, a4]);
        }

        async function showButton() {

            const a5 = anime({
                targets: ['.confirmation-btn'],
                duration: showButtonDuration,
                opacity: [0, 1],
                easing: 'linear',
            }).finished;

            await Promise.all([a5]);
        }

        async function init() {
            confBtn.current.style.pointerEvents = 'none';
            await hideButton()
            await showParams()
            await calcParams()
            await showButton()
                .then(() => {
                    confBtn.current.style.pointerEvents = 'auto';
                })
        }

        //init(); ALL LINES ABOVE THIS STATEMENT ARE TO BE REMOVED COMPLETELY
        document.querySelector(`.${static_classes['action_container']}`).style.pointerEvents = 'none';
        document.querySelectorAll(`.${static_classes['param_name']}`).forEach(el => el.style.opacity = 0);
        document.querySelectorAll(`.${static_classes['param_value']}`).forEach(el => el.style.opacity = 0);
        const valuesArr = [props.time, props.turns, [props.score]]; // props.score is within array because its a numeric value only
        const allParamNames = document.querySelectorAll(`.${static_classes[`param_name`]}`);
        const allParamValues = document.querySelectorAll(`.${static_classes[`param_value`]}`)

        if(props.value) {

            document.querySelector(`.${static_classes['win_btn']}`).style.transform = 'scale(0%)';
            document.querySelectorAll(`.${static_classes['star']}`).forEach(el => el.style.opacity = 0);
            document.querySelector(`.${static_classes['highscore']}`).style.opacity = 0;

            // Win animation
            async function winAnimation() {
                await showTitle()
                for(let arr_ind=0; arr_ind<valuesArr.length; arr_ind++) {
                    await showParams(arr_ind)
                }
                await showHighscore()
                await removeParamValue(allParamValues)
                await showGottenStars()
                await showWinButton()
                    .then(() => {
                        //console.log('win animation done');
                        document.querySelector(`.${static_classes['win_btn']}`).style.pointerEvents = 'auto';
                    })
            }

            async function showTitle() {
                const a1 = anime({
                    targets: `.${static_classes['title']}`, // title - param
                    duration: 1200,
                    translateX: ['-15%', '0%'],
                    opacity: [0, 1],
                    easing: 'linear',
                }).finished;
                await Promise.all([a1]);
            }

            async function showParams(index) {
                await showParamName(allParamNames[index])
                await showParamValue(allParamValues[index], valuesArr[index])
            }

            async function showParamName(el) {
                const a2 = anime({
                    targets: el,
                    duration: 500,
                    opacity: [0, 1],
                    translateX: ['-20%', '0%'],
                    easing: 'linear',
                }).finished;
                await Promise.all([a2]);
            }

            async function showParamValue(el, valueArr) {
                await fadeInParamValue(el)
                for(let x=0; x<valueArr.length; x++) {
                    console.log(el, valueArr[x]);
                    await addParamsValue(el, valueArr[x]);
                }
            }

            async function fadeInParamValue(el) {
                const a3 = anime({
                    targets: el,
                    duration: 300,
                    opacity: [0, 1],
                    easing: 'linear',
                }).finished;
                await Promise.all([a3]);
            }

            async function addParamsValue(el, currValue) {
                const a4 = anime({
                    targets: el,
                    duration: 500,
                    delay: 300,
                    textContent: [el.textContent, `+=${currValue}`],
                    round: 1,
                    easing: 'linear',
                }).finished;
                await Promise.all([a4]);
            }

            async function showHighscore() {
                const a5 = anime({
                    targets: `.${static_classes['highscore']}`,
                    duration: 350,
                    opacity: [0, 1],
                    easing: 'easeInQuad',
                }).finished;
                await Promise.all([a5]);
            }

            async function removeParamValue(el) {
                const duration_time = 1600;
                const delay_time = 600;
                let baseValue = 0;
                const totalRemainingTime = props.time.reduce((accumVariable, curValue) => accumVariable + curValue , baseValue);
                const totalRemainingTurns = props.turns.reduce((accumVariable, curValue) => accumVariable + curValue , baseValue);

                const a6 = anime({
                    targets: el,
                    duration: duration_time,
                    delay: delay_time,
                    textContent: 0,
                    round: 1,
                    easing: 'linear',
                }).finished;

                const a7 = anime({
                    targets: `.${static_classes[`highscore_value`]}`,
                    duration: duration_time,
                    delay: delay_time,
                    textContent: [0, ((props.tsv * totalRemainingTime) + (props.msv * totalRemainingTurns) + (props.score))],
                    round: 1,
                    easing: 'linear',
                }).finished;

                await Promise.all([a6, a7]);
            }

            async function showGottenStars() {
                const a8 = anime({
                    targets: `.${static_classes['star']}`,
                    duration: 1200,
                    delay: anime.stagger(600),
                    scale: ['0%', '100%'],
                    opacity: [0, 1],
                    easing: 'easeInOutElastic',
                }).finished;
                await Promise.all([a8]);
            }

            async function showWinButton() {
                const a9 = anime({
                    targets: `.${static_classes['win_btn']}`,
                    duration: 900,
                    opacity: [0, 1],
                    scale: ['0%', '100%'],
                    easing: 'easeInOutQuint',  // expo
                }).finished;
                await Promise.all([a9]);
            }

            winAnimation();
        } else {

            document.querySelectorAll(`.${static_classes[`lost_btn`]}`).forEach((el) => el.style.transform = 'scale(0%)');
            document.querySelectorAll(`.${static_classes[`lost_btn`]}`).forEach((el) => el.style.pointerEvents = 'none');

            // Lost animation

            async function lostAnimation() {
                await showLostTitle()
                for(let arr_ind=0; arr_ind<valuesArr.length; arr_ind++) {
                    await showParams(arr_ind)
                }
                await showLostButtons()
                .then(() => {
                    document.querySelectorAll(`.${static_classes[`lost_btn`]}`).forEach((el) => el.style.pointerEvents = 'auto');
                })
            }

            async function showLostTitle() {
                const a1= anime({
                    targets: `.${static_classes['title']}`,
                    duration: 1200,
                    opacity: [0, 1],
                    translateY: ['-12%', 0],
                    easing: 'easeOutBounce',
                }).finished;
                await Promise.all([a1]);
            }

            async function showParams(index) {
                await showParamName(allParamNames[index])
                await showParamValue(allParamValues[index])
            }

            async function showParamName(el) {
                const a2 = anime({ 
                    targets: el,
                    duration: 500,
                    opacity: [0, 1],
                    translateY: ['-10%', '0%'],
                    easing: 'linear',
                }).finished;
                await Promise.all([a2]);
            }

            async function showParamValue(el) {
                const a3 = anime({ 
                    targets: el,
                    duration: 500,
                    opacity: [0, 1],
                    translateY: ['10%', '0%'],
                    easing: 'linear',
                }).finished;
                await Promise.all([a3]);
            }

            async function showLostButtons() {
                const a4 = anime({
                    targets: `.${static_classes[`lost_btn`]}`,
                    duration: 1200,
                    delay: anime.stagger(600),
                    opacity: [0, 1],
                    scale: ['0%', '100%'],
                    easing: 'easeOutExpo',
                }).finished;
                await Promise.all([a4]);
            }

            lostAnimation();
        }
    }, [])


    useEffect(() => {
        let end = (props.value)? 'win' : 'lose';
        let rand = Math.floor(Math.random() * level_end_messages[`${end}`].length);
        setEndMessage(level_end_messages[`${end}`][rand]);
    }, [])

    return (
        <div className={`${static_classes['bg']}`}>
            <div className={`${static_classes['box']}`}>
                <div className={(props.value) ? 'confirm confirm-win' : 'confirm confirm-lost'}>
                    <div className={`${static_classes['info']}`}>
                        <div className={(props.value) ? `${static_classes['title']} info-title-win` : `${static_classes['title']} info-title-lost`}>
                            {endMessage}
                        </div>

                        <div className={`${static_classes['param']}`}>
                            <div className={`${static_classes['param_name']}`}> Time: </div>
                            <div className={`${static_classes['param_value']}`}> {(props.value) ? 0 : props.time}</div>
                        </div>

                        <div className={`${static_classes['param']}`}>
                            <div className={`${static_classes['param_name']}`}> Turns: </div>
                            <div className={`${static_classes['param_value']}`}> {(props.value) ? 0 : props.turns} </div>
                        </div>

                        <div className={`${static_classes['param']}`}>
                            <div className={`${static_classes['param_name']}`}> Score: </div>
                            <div className={`${static_classes['param_value']}`}> {(props.value) ? 0 : props.score} </div>
                        </div>

                        {(props.value) && (
                            <div className='win-summary'>
                                <div className={`${static_classes['highscore']}`}>
                                    <div className='highscore-name'> Highscore: </div>
                                    <div className={`${static_classes['highscore_value']}`}> 0 </div>
                                </div> 
    
                                <div className='info-stars'>
                                    <FontAwesomeIcon icon={star_full} className={`${static_classes['star']} icon-star_full`}></FontAwesomeIcon>
                                    <FontAwesomeIcon icon={star_empty} className={`${static_classes['star']} icon-star_empty`}></FontAwesomeIcon>
                                    <FontAwesomeIcon icon={star_empty} className={`${static_classes['star']} icon-star_empty`}></FontAwesomeIcon>
                                </div>
                            </div>
                        )}

                    </div>

                </div>

                <div className='action'>
                    <div className={`${static_classes['action_container']}`} ref={actionBox_ref}>
                        {(props.value) ?
                            <div className={'action_container--win'} ref={table} >
                                <div className={`${static_classes[`win_btn`]}`}  onClick={props.start} ref={confBtn} > Go to menu </div>
                            </div>
                            :
                            <div className={'action_container--lost'} ref={table} >
                                <div className={`${static_classes[`lost_btn`]}`} onClick={props.next} ref={confBtn} > Retry </div>
                                <div className={`${static_classes[`lost_btn`]}`} onClick={props.start} ref={confBtn} > Back </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Confirm;