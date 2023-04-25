import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';
import '../styles/confirm.css';
import {level_end_messages} from '../global/predefined/level_end_messages.js';
import { faStar as star_empty} from '@fortawesome/free-regular-svg-icons';
import { faStar as star_full} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { set } from 'animejs';
import { equation } from '../global/predefined/stars_equation.js';

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
    star_box: `info-stars`,
    star: `icon-star`,
    star_empty: `icon-star_empty`,
    star_full: `icon-star_full`,
    action_container: `action_container`,
    win_btn: `win-btn`,
    lost_btn: `lost-btn`,
}

function Confirm(props) {

    const [endMessage, setEndMessage] = useState(null);
    const [allStars, setAllStars] = useState(
        <FontAwesomeIcon icon={star_empty} className={`${static_classes['star']} ${static_classes[`star_empty`]}`}></FontAwesomeIcon>
    ); // we use this initial value as a placeholder - to hold space for dynamically rendered stars

    const table = useRef(null);
    const confBtn = useRef(null);
    const actionBox_ref = useRef(null);

    let sub;
    if(props.turns !== null) {
        sub = (props.score + (props.turns * props.msv));
    } else if(props.time !== null) {
        sub = (props.score + (props.time * props.tsv));
    }

    async function callEndAnimation() {

        // also import stars condition file
        if(props.value) {
            const star_conditions = await import(`../levels/${props.newSerie}/level_${props.level_no}/starConditions.js`)
            const stars_full_count = checkGottenStars(star_conditions);
            console.warn(`props.time: ${props.time}   props.turns: ${props.turns}  || stars gotten:  `,stars_full_count);
            makeStars(stars_full_count);
        }
        fireEndAnimation();
    }

    function fireEndAnimation() {

        const valuesArr = [props.time, props.turns, [props.score]]; // props.score is within array because is the only numeric value (and we need to ensure each param is type of array)
        const allParamNames = document.querySelectorAll(`.${static_classes[`param_name`]}`);
        const allParamValues = document.querySelectorAll(`.${static_classes[`param_value`]}`)

        if(props.value) {

            // Win animation
            async function winAnimation() {
                await showTitle()
                for(let arr_ind=0; arr_ind<valuesArr.length; arr_ind++) {
                    await showParams(arr_ind)
                }
                await showHighscore()
                await removeParamValue(allParamValues)
                    .then(() => { document.querySelector(`.${static_classes['star_box']}`).style.opacity = 1; }) // condition: if(props.value)
                await showGottenStars()
                await showWinButton()
                    .then(() => {
                        document.querySelector(`.${static_classes['win_btn']}`).style.pointerEvents = 'auto';
                    })
            }

            async function showTitle() {
                const a1 = anime({
                    targets: `.${static_classes['title']}`,
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
                    easing: 'easeInOutQuint',
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
    }

    
    function checkGottenStars(star_conditions) {
        // 1. We can assume that each level has 3 stars, therefore star_conditions array of object is length of 3
        // 2. It also should be noted, that each sooner star have more severe obtain conditions than the previous one
        console.error(props.variables);
        for(let star_no = 0; star_no < 3; star_no++) {
            let areConditionsMet = checkStarCondition(star_conditions[`starConditions`][star_no]);
            if(!areConditionsMet) return star_no; 
        }

        return 3;

        function checkStarCondition(conditionSet) {
            // 1. props name has to be IDENTICAL as for each starCondition condition element
            // 2. currently only one parameter can be set inside key of Object property name (eg. time can have 'moreThan' prop, but cannot have 'lessThan' simultaneously)
            // 3. Currently supported props: turns & time + level variables
            // 4. NOTE: When using variables, only one condition property can be supported. Correct pattern is:
            //  ->   variables: {secret_solved: {equal: true}} - variables refer to property name of newLevel obj, which should be always typed as it is,
            //  + next - secret_solved is example of one and only property that can be used inside variables. No more are allowed atm. However this property
            //  could be a result of other variables values, which are previously checked inside other level specific functions. Fe: if some variables have
            //  desired values, we can set the property (fe. secret_solved) to true, and based on that provide a star at the end level.
            let index = 0;
            console.warn(conditionSet);
            for(let key in conditionSet) {
                console.log(props[key], key, Object.keys(conditionSet[key]), Object.values(conditionSet[key]));

                const checkConditionPass = (props[`${Object.keys(conditionSet)[index]}`] instanceof Array)?
                    equation(props[`${Object.keys(conditionSet)[index]}`].reduce((accumVariable, curValue) => accumVariable + curValue , 0), Object.values(conditionSet[key]), ...Object.keys(conditionSet[key]))
                    :
                    equation(props[key][`${Object.keys(conditionSet[key])}`], ...Object.values(...Object.values(conditionSet[key])), ...Object.keys(...Object.values(conditionSet[key])),);
                index++;
                console.log(checkConditionPass)
                if(!checkConditionPass) { return false; }
            }

            return true;
        }
    }

    function makeStars(stars_full_count) {
        let starArr = ['', '', '']; // has always to be of length: 3
        let stars = starArr.map((el, index) => {
            return <FontAwesomeIcon key={'star_' + index} icon={(index < stars_full_count)? star_full : star_empty} className={(index < stars_full_count)? `${static_classes['star']} ${static_classes[`star_full`]}` : `${static_classes['star']} ${static_classes[`star_empty`]}`}></FontAwesomeIcon>
        }) 
        setAllStars(stars);
    }

    useEffect(() => {
        let end = (props.value)? 'win' : 'lose';
        let rand = Math.floor(Math.random() * level_end_messages[`${end}`].length);
        setEndMessage(level_end_messages[`${end}`][rand]);
        callEndAnimation();
    }, [])

    useLayoutEffect(() => {
        // Hide confirmbox elements
        document.querySelector(`.${static_classes['action_container']}`).style.pointerEvents = 'none';
        //document.querySelectorAll(`.${static_classes['param_name']}`).forEach(el => el.style.opacity = 0);
        //document.querySelectorAll(`.${static_classes['param_value']}`).forEach(el => el.style.opacity = 0);
        if(props.value) {
            document.querySelector(`.${static_classes['win_btn']}`).style.transform = 'scale(0%)';
            document.querySelector(`.${static_classes['highscore']}`).style.opacity = 0;
        }
    }, [])

    useEffect(() => {
        document.querySelectorAll(`.${static_classes['star']}`).forEach(el => el.style.opacity = 0);
        //if(props.value) { document.querySelector(`.${static_classes['star_box']}`).style.opacity = 1; }
    }, [allStars])

    function fadeAnimation() {
        anime({
            targets: 'body',
            duration: 1000,
            opacity: [0, 1],
            easing: 'linear',
        })
    }

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
                            <div className={`${static_classes['param_value']}`}> {(props.value) ? 0 :  props.time}</div>
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
    
                                <div className={`${static_classes['star_box']}`}>
                                    {allStars}
                                </div>
                            </div>
                        )}

                    </div>

                </div>

                <div className='action'>
                    <div className={`${static_classes['action_container']}`} ref={actionBox_ref}>
                        {(props.value) ?
                            <div className={'action_container--win'} ref={table} >
                                <div className={`${static_classes[`win_btn`]}`}  onClick={() => {props.start(); fadeAnimation()}} ref={confBtn} > Go to menu </div>
                            </div>
                            :
                            <div className={'action_container--lost'} ref={table} >
                                <div className={`${static_classes[`lost_btn`]}`} onClick={() => {props.restart(); fadeAnimation()}} ref={confBtn} > Retry </div>
                                <div className={`${static_classes[`lost_btn`]}`} onClick={() => {props.start(); fadeAnimation()}} ref={confBtn} > Back </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Confirm;