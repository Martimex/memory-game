import  React, { useState, useEffect, useRef } from 'react';
import '../styles/game.css';

import '../global/global_styles.css';

import  levels from '../levels.js';
import useMediaQuery from '../virtual_hooks/useMediaQuery';

import anime from 'animejs/lib/anime.es.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import GameInfo from './game_info.js';
import Confirm from './confirm.js';
//import ConfirmPlay from './confirm_play'; -> can be removed later along with the Component
import ConfirmWin from './confirm_win';
//import Pause from './pause'; -> can be removed later along with the Component

// Level based stuff
import {uncoverPatterns} from '../global/predefined/uncover_patterns.js';
import {scoreExtras} from '../global/predefined/score_extras.js';

import { setIcon, icon_Sets } from './landing.js';

library.add(fab, fas);

let iter = {
    // Add more keys if necessary
    /* basic value*/ value: 0, 
    /* value v2*/ amount: 0,
    /* value v3*/ count: 0,
    /*value in series*/ streak: 0,
    /*value only for lvl 18*/ previousStep: 0,
    /*turn addon/penalty*/ extraTurns: 0,
    /*used ONLY for lvl 18 and prob 19 - it modifies your find tiles*/ fTilesModifier: 0, // if lower than 0, it lowers foundTiles count
    /*used ONLY for lvl 20 time multiplying */ timeAddon: 0,
    /*used for more advanced animation stuff*/ array: [],
    /*additional array for lvl 17 purposes*/ nextArr: [],
    /*determines whether its okay to do pause ATM*/ pauseCondition: true,
};  // EXTRA VALUES FOR FLAG FUNCTIONS


let cardsOpened = [];
let handleCount = 0;   // chroni przed wielokrotnym wywoływaniem funkcji-flag poprzez kliknięcie - dotyczy onFirstClick
let handleCheck = 0;   // chroni przed wielokrotnym wywoływaniem funkcji-flag poprzez kliknięcie - dotyczy onSecondClick

let scoreAddon = 0;

let isChecking = false; // Prevents from using multiple turns during the cards checkout animation
const scorePerPair = 100;  // Don't modify this varible; let it be with this value
const moveScoreValue = 150; // Don't momdify aswell - it calculates score for every remaining move after you've succeded
const timeScoreValue = 50; // Don't momdify aswell - it calculates score for every remaining second after you've succeded, it's calculated twice, so add '/2' value

const stageUpdateTime = 800;

const classes = {
    firstPlan: 'firstPlanContainer',
    secondPlan: 'secondPlanContainer',
    animationPlan: 'animationContainer',
}

const duplicateIcons = {
    pairs: 2,
    triplets: 3,
    quads: 4,
}

const inGameCounters = {
    spreeCount: 0,
    totalRemainingTime: [],
    totalRemainingTurns: [],
}

function setRandomIcons(iconSet, tiles, pattern) { 

    let iconSetCopy = [...iconSet]; 
    let usedIcons = [];
    let randomizedIcons = [];

    for(let i=0; i<(tiles/duplicateIcons[pattern]); i++) { 
        let random = Math.floor(Math.random() * iconSetCopy.length);
        usedIcons.push(iconSetCopy[random]);
        iconSetCopy.splice(random, 1);
    }

    let duplicate = [];

    for(let g=0; g<duplicateIcons[pattern]; g++) {
        duplicate.push(...usedIcons);
    }

    const usedIconsCopy = [...duplicate]; 

    for(let j=0; j<usedIconsCopy.length; j++) {
        randomizedIcons.push(setIcon(duplicate));
    }

    return randomizedIcons;
}

async function loadOtherModules(serieName, levelNumber) {
    const start = await import(`../levels/${serieName}/level_${levelNumber}/scripts/start.js`);
    const xclick = await import(`../levels/${serieName}/level_${levelNumber}/scripts/xclick.js`);
    const match = await import(`../levels/${serieName}/level_${levelNumber}/scripts/match.js`);
    const stagecomplete = await import(`../levels/${serieName}/level_${levelNumber}/scripts/stagecomplete.js`);
    //const end = await import(`../levels/${serieName}/level_${levelNumber}/scripts/end.js`);
    
    return {
        start: start,
        xclick: xclick,
        match: match,
        stagecomplete: stagecomplete,
        //end: end,
    }
}

let otherModules = null; // we can use it to access our scripts
let pointsInStage = 0; // determines how many points player gets during current stage of the level
let turns = 0; // detaermines how much turns player used in current stage
let arr = []; // for applying proper number of tiles that has to be rendered for current stage
let randomizedIconsArray = []; // array which holds random icons for newly created tiles 

//INIT
function Game(props) {

    const isDesktop = useMediaQuery('(min-width: 941px)');

    const [level, setLevel] = useState(props.level);

    const [scoreMultiplier, setScoreMultiplier] = useState(1); // REMOVE AFTER TRANSFORMING OLD LEVELS INTO A NEW SYSTEM
    const [highscore, setHighscore] = useState(0); // REMOVE AFTER TRANSFORMING OLD LEVELS INTO A NEW SYSTEM
    const [moves, setMoves] = useState(0);   // REMOVE AFTER TRANSFORMING OLD LEVELS INTO A NEW SYSTEM
    const [foundTiles, setFoundTiles] = useState(0); // REMOVE AFTER TRANSFORMING OLD LEVELS INTO A NEW SYSTEM


    const [confirmValue, setConfirmValue] = useState(null); // ALWAYS SET IT TO NULL (INITIAL) ||  true / false (is level fully Completed ?)
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(0);
    const [clickNo, setClickNo] = useState(0); // use to calculate click number (mostly for xClick script)
    const [stageNo, setStageNo] = useState(0); // use to switch stages (if level has few stages)
    const [boardState, setBoardState] = useState(null);

    const all = useRef(null);
    const bg = useRef(null);
    const gameboard = useRef(null);
    const game = useRef(null);
    const gameinfo_ref = useRef(null);
    const animationBox = useRef(null);

    function conditionsAreMet(e) {
        if(gameboard.current.dataset.animation !== 'off') {return false;}
        if(!e.target.classList.contains('tile')) {return false;}
        const isNotAlreadyOpened = checkTilesOrigin(cardsOpened, e.target);
        if(!isNotAlreadyOpened) {  return false; }

        return true;
    }

    function clickable(e)  {

        const tile_back = e.target.querySelector('.tile-back');
        cardsOpened.push(tile_back);
        cardsOpened[cardsOpened.length - 1].parentNode.classList.add(`target`, `target-serie-${stageNo}`, `target-${cardsOpened.length}`);

        keepCardOpen(e);
    }

    function checkTilesOrigin(cardsOpened, new_tile) {
        for(let n=0; n<cardsOpened.length; n++) {
            if(cardsOpened[n].parentNode === new_tile) return false;
        }
        return true;
    }

    useEffect(() => {

        if(props.newLevel.limitations[stageNo][`time`]) { 
            // Each level has to have time counting !!!

            if((time === 0) || (confirmValue !== null)) {return;} // We have a separate setTime call which sets time to 1 after initial animation finish 

            const stopwatch = setInterval(() => {
                if(pointsInStage < props.newLevel.win[stageNo][`value`]) {
                    setTime((time + 1) - iter.timeAddon);
                }
            }, 1000);
    
            if((props.newLevel.limitations[stageNo][`time`] - time < 0) && (pointsInStage < props.newLevel.win[stageNo][`value`])) {
                setConfirmValue(false);
                clearInterval(stopwatch);
            }
    
            return () => clearInterval(stopwatch);
        } else {
            console.error('TIME COUNTDOWN NOT ADDED TO THE LEVEL !');
        }

    }, [time]);

    useEffect(() => {

        // 0. Reset all inGameCounters
        resetInGameCounters();

        // 1. Reset turns / time / stageScore variables first
        setTime(0);
        turns = 0;
        pointsInStage = 0;

        if(arr.length > 0) {
            while(arr.length > 0) {
                arr.pop();
            }
        }
    
        for(let i=0; i<props.newLevel.tiles[stageNo]; i++) {
            arr.push('');
        };

        randomizedIconsArray = setRandomIcons(icon_Sets[`${props.newLevel.icon_set[stageNo]}`], props.newLevel.tiles[stageNo], props.newLevel.uncover[stageNo][`pattern`]);

        let allTiles =  
        arr.map((tile, index) =>  {
            return <div className={`tile t-${props.newLevel.number}`} key={`tile-s${stageNo}-${index.toString()}`}><div className={`tile-front tf-${props.newLevel.number}`}></div> <div className={`tile-back tb-${props.newLevel.number}`}>{<FontAwesomeIcon icon={`${randomizedIconsArray[index]}`} className={`fa-icon-${props.newLevel.number}`}/>}</div></div>
        }); 
        setBoardState(allTiles); 

        loadDynamic()

    }, [stageNo])

    // Add proper styling based on device used by end user

    let boardGridParams = {gridTemplateColumns: `repeat(${props.newLevel.columns[stageNo]}, ${(props.newLevel.tile_size[stageNo])/10}rem)`, gridTemplateRows: `repeat(${props.newLevel.rows[stageNo]}, ${(props.newLevel.tile_size[stageNo])/10}rem)`};
    
    /* if(isDesktop) {  UNCOMMENT AND MAKE A DEVELOPMENT LATER WHEN WORKING WITH MEDIA QUERIES !!!
        boardGridParams = {gridTemplateColumns: `repeat(${props.newLevel.columns}, ${(props.newLevel.tile_size)/10}rem)`, gridTemplateRows: `repeat(${props.newLevel.rows}, ${(props.newLevel.tile_size)/10}rem)`};
    } else {
        boardGridParams = {gridTemplateColumns: `repeat(${props.newLevel.columns}, ${(props.newLevel.tile_size_mobile)/10}rem)`, gridTemplateRows: `repeat(${props.newLevel.rows}, ${(props.newLevel.tile_size_mobile)/10}rem)`};
    } */

    function keepCardOpen(e) {
        // Open up the tile
        async function openUp() {
            const a1 = anime({
                targets: e.target,
                duration: props.newLevel.tile_animation[stageNo][`time`],
                transitionProperty: 'all',
                easing: props.newLevel.tile_animation[stageNo][`easing`],
                rotateY: 180,
            }).finished;

            await Promise.all([a1]);
        }

        setClickNo(clickNo + 1);

        if(cardsOpened.length === props.newLevel.uncover[stageNo][`count`]) {
            gameboard.current.dataset.animation = 'on';
            turns = turns + 1;
            iter.pauseCondition = false;

            const doesMatch = uncoverPatterns[props.newLevel.uncover[stageNo][`pattern`]](cardsOpened);

            const cardsOpened_parentNodes = setParentNodes(cardsOpened);

            //otherModules[`match`].match(doesMatch, cardsOpened_parentNodes, stageNo); // doesMatch determines whether player meets required condition to remove tiles
        
            openUp()
                .then(() => {
                    otherModules[`match`].match(doesMatch, cardsOpened_parentNodes, stageNo, props.newLevel) // doesMatch determines whether player meets required condition to remove tiles
                        .then(() => {
                            doCardsMatch(doesMatch, cardsOpened)
                        })
                })
        } else {
            openUp();
        }
    }

    function doCardsMatch(doesMatch, cardsOpened) {
        // Block the click listener for a brief checkout duration
        isChecking = true;

        manageValuesAndCounters(doesMatch);

        if(props.newLevel.limitations[stageNo][`time`]) {
            if(props.newLevel.limitations[stageNo][`time`] - time <= 0) {
                // We need to block winning condition when player is left with too little time
                setConfirmValue(false);
                return;
            }
        }

        setTimeout(() => {

            const cardsOpened_parentNodes = setParentNodes(cardsOpened);

            if(doesMatch) {

                setScore(score + props.newLevel.score[stageNo][`count`] 
                    + ((props.newLevel.score[stageNo][`extras`])?  scoreExtras[`${props.newLevel.score[stageNo][`extras`]}`](inGameCounters, props.newLevel.score[stageNo][`count`]) : 0)
                );

                async function fade() {
                    const a1 = anime({
                        targets: cardsOpened_parentNodes,
                        duration: props.newLevel.tile_animation[stageNo][`time`],
                        easing: props.newLevel.tile_animation[stageNo][`easing`],
                        opacity: 0,
                    }).finished;

                   await Promise.all([a1]);
                }

                fade().then(() => {
                    cardsOpened_parentNodes.forEach((parent, index) => {
                        parent.style = 'visibility: hidden';
                        parent.classList.remove(`target`, `target-serie-${stageNo}`, `target-${index + 1}`);
                    })

                    while(cardsOpened.length) {cardsOpened.pop();}

                    // Check game progress - do player finish level or stage ?
                    checkStageSuccess(pointsInStage);

                    setClickNo(0);
                    isChecking = false;
                    gameboard.current.dataset.animation = 'off';
                })
            }

            else {

                for(let i=0; i<cardsOpened.length; i++) {
                    // cardsOpened.length is ALWAYS equal to cardsOpened_parentNodes.length
                    cardsOpened_parentNodes[i].classList.remove(`target`, `target-serie-${stageNo}`, `target-${i+1}`);
                }

                while(cardsOpened.length) {cardsOpened.pop();}

                setClickNo(0);
                gameboard.current.dataset.animation = 'off';
                flipBack(cardsOpened_parentNodes);
                isChecking = false;

                async function flipBack(cardsOpened_parentNodes) {
                    const a1 = anime({
                        targets: cardsOpened_parentNodes,
                        duration: props.newLevel.tile_animation[stageNo][`time`],
                        rotateY: [180, 0],
                        easing: props.newLevel.tile_animation[stageNo][`easing`],
                    }).finished;

                    await Promise.all([a1]);
                }        
                
            }

            checkLosingConditions();

        }, props.newLevel.compare_time[stageNo])

    }

    function manageValuesAndCounters(doesMatch) {
        // This function is used for managing all counters in one place (to make things cleaner)

        if(doesMatch) {
            pointsInStage += props.newLevel.win[stageNo][`pointsPerMatch`];
            inGameCounters['spree'] += 1;
        } else {
            inGameCounters['spree'] = 0;
        }
    }

    function resetInGameCounters() {
        inGameCounters['spree'] = 0;
    }

    function checkLosingConditions() {
        if(props.newLevel.limitations[stageNo][`turns`]) { // if this stage take care of turns used
            if( (props.newLevel.limitations[stageNo][`turns`] - turns <= 0) && (pointsInStage < props.newLevel.win[stageNo][`value`]) && (confirmValue === null) ) { 
                // if we have no turns left, and still didnt complete current stage
                setConfirmValue(false);
            }
        }
    }

    function checkStageSuccess(pointsInStage) {

        if( (pointsInStage >= props.newLevel.win[stageNo][`value`]) ) {
            // Update inGameCounters for accumulative remaining turns / time
            if(props.newLevel.limitations[stageNo][`turns`]) inGameCounters[`totalRemainingTurns`].push(props.newLevel.limitations[stageNo][`turns`] - turns);
            if(props.newLevel.limitations[stageNo][`time`])  inGameCounters[`totalRemainingTime`].push(props.newLevel.limitations[stageNo][`time`] - time); 


            if(stageNo + 1 === props.newLevel.stages) {
                // Level completed !
                async function finishGame() {
                    await otherModules[`stagecomplete`].stagecomplete(stageNo, true)
                }
                finishGame()
                    .then(() => setConfirmValue(true));
            } 
            else if(stageNo + 1 !== props.newLevel.stages) {
                // Move to the new stage + block pointer events just during new stage animations
                document.body.style.pointerEvents = 'none';
                nextStageTransition()
            }
        }
    }

    async function nextStageTransition() {
        await otherModules[`stagecomplete`].stagecomplete(stageNo, false);
        await newStageFadeOut()
            .then(() => {
                newStageFadeIn()
                setStageNo(stageNo + 1);
            })
    }

    function setParentNodes(cardsOpened) {
        let parentsNodeArr = [];
        cardsOpened.forEach(tile => {
            parentsNodeArr.push(tile.parentNode);
        })
        return parentsNodeArr;
    }

    async function loadDynamic() {
        let loadStart = await import(`../levels/${props.newSerie}/level_${props.newLevel.number}/scripts/start.js`);
        loadStart.level_start(stageNo, props.newLevel.starting_animation[stageNo][`time`], props.newLevel.starting_animation[stageNo][`tileShowTime`])
            .then(() => {
                // After animation is completed...
                setTime(1);
                document.body.style.pointerEvents = 'auto'; // unlock clicking (previously blocked in leve_info *play btn onClick*)
            })
        otherModules = await loadOtherModules(props.newSerie, props.newLevel.number);
    }

    async function newStageFadeIn() {
        const a1 = anime({
            targets: [gameboard.current, gameinfo_ref.current],
            opacity: [0, 1],
            duration: stageUpdateTime,
            easing: 'easeOutCubic',
        }).finished;

        await Promise.all([a1]);
    }

    async function newStageFadeOut() {
        const a1 = anime({
            targets: [gameboard.current, gameinfo_ref.current],
            opacity: [1, 0],
            duration: stageUpdateTime,
            easing: 'easeOutCubic',
        }).finished;
        
        await Promise.all([a1]);
    }


    useEffect(() => {
        if(clickNo > 0) {
            otherModules[`xclick`].xclick(clickNo, cardsOpened[cardsOpened.length - 1].parentNode, stageNo, props.newLevel);
        } else {
            //
        }
    }, [clickNo])

    useEffect(() => {
        document.body.style.overflowY = 'auto';
        loadStyles();
        appendPlansElems();
    }, []);

    async function loadStyles() {
        await import(`../levels/${props.newSerie}/level_${props.newLevel.number}/styles/main.css`); // for styling tiles
        await import(`../levels/${props.newSerie}/level_${props.newLevel.number}/styles/firstPlan.css`); // for first plan fancy elements
        await import(`../levels/${props.newSerie}/level_${props.newLevel.number}/styles/secondPlan.css`); // for second plan fancy elements
        await import(`../levels/${props.newSerie}/level_${props.newLevel.number}/styles/bg.css`); // for adding background to the level
    }

    async function appendPlansElems() {
        const plansElems = await import(`../levels/${props.newSerie}/level_${props.newLevel.number}/generatePlanItems.js`);
        plansElems.generateItems(classes[`firstPlan`], classes[`secondPlan`]);
    }

    return(
        <div className='all' ref={all}>
            <div className={`background bg-${props.newLevel.number}`} ref={bg}>
                <div className='game-info' ref={gameinfo_ref} >
                    <GameInfo level={props.newLevel.number} moves={props.newLevel.limitations[stageNo]['turns'] - turns} time={props.newLevel.limitations[stageNo]['time'] - time} score={score}  />
                </div>

                <div className={`game game-${props.newLevel.number}`} ref={game}>
                    <div className={`board board-${props.newLevel.number}`} ref={gameboard} data-animation='off' onClick={(e) => { if(conditionsAreMet(e)) { clickable(e); setClickNo(clickNo + 1); }}}  style={boardGridParams}>
                        {boardState}
                    </div>
                </div>
                
                <div className={`${classes[`firstPlan`]} firstPlan-${props.newLevel.number}`}> </div>
                <div className={`${classes[`secondPlan`]} secondPlan-${props.newLevel.number}`}> </div>
                <div className={`${classes[`animationPlan`]} aContainer-${props.newLevel.number}`} ref={animationBox}></div>

                {confirmValue !== null && (
                    <Confirm value={confirmValue} level={level} level_no={props.newLevel.number} newSerie={props.newSerie} score={score} highscore={highscore} tsv={timeScoreValue} msv={moveScoreValue} 
                        turns={(confirmValue)? inGameCounters[`totalRemainingTurns`] : (props.newLevel.limitations[stageNo][`turns`])? props.newLevel.limitations[stageNo][`turns`] - turns : 0} 
                        time={(confirmValue) ? inGameCounters[`totalRemainingTime`] : (props.newLevel.limitations[stageNo][`time`])? props.newLevel.limitations[stageNo][`time`] - time : 0} 
                        start={props.preview} next={props.changeComponent} restart={props.confirmComponent}
                        variables={props.newLevel.variables}
                    />
                )}

                {(props.newLevel.cords === 'gg') && ( 
                    <div className='confirmation-w'>
                        {<ConfirmWin level={level} highscore={highscore} start={props.preview} />}
                    </div>
                )}
            </div>
        </div>
    )
} 

export default Game;