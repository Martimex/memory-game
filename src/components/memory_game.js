import  React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Router from "next/router";
import '../../src/styles/game.module.css';

import styles_global from '../../src/global/global_styles.module.css';

import  levels from '../../src/levels.js';
import useMediaQuery from '../../src/virtual_hooks/useMediaQuery';

import * as Animation from "animejs"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faParagraph, fas } from '@fortawesome/free-solid-svg-icons';

import GameInfo from '../../src/components/game_info.js';
import Confirm from '../../src/components/confirm.js';
//import ConfirmPlay from './confirm_play'; -> can be removed later along with the Component
import ConfirmWin from '../../src/components/confirm_win';
//import Pause from './pause'; -> can be removed later along with the Component

// Level based stuff
import {uncoverPatterns} from '../../src/global/predefined/uncover_patterns.js';
import {scoreExtras} from '../../src/global/predefined/score_extras.js';

import { setIcon, icon_Sets } from '../../pages/landing.js';

//import prisma from '../../lib/prisma';

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


let cardsOpened = [];   // WE WILL NOT USE IT ANYMORE, BECAUSE WE STORE THIS VARIABLE IN PROPS GAINED BY SSR FUNCTION: getServerSideProps
let handleCount = 0;   // chroni przed wielokrotnym wywoływaniem funkcji-flag poprzez kliknięcie - dotyczy onFirstClick
let handleCheck = 0;   // chroni przed wielokrotnym wywoływaniem funkcji-flag poprzez kliknięcie - dotyczy onSecondClick

let scoreAddon = 0;

let isChecking = false; // Prevents from using multiple turns during the cards checkout animation
const scorePerPair = 100;  // Don't modify this varible; let it be with this value
const moveScoreValue = 150; // Don't momdify aswell - it calculates score for every remaining move after you've succeded
const timeScoreValue = 50; // Don't momdify aswell - it calculates score for every remaining second after you've succeded, it's calculated twice, so add '/2' value

const stageUpdateTime = 800; // probably not needed now

const classes = {
    firstPlan: styles_global['firstPlanContainer'],
    secondPlan: styles_global['secondPlanContainer'],
    animationPlan: styles_global['animationContainer'],
}

const duplicateIcons = {
    pairs: 2,
    triplets: 3,
    quads: 4,
}

/* const inGameCounters = {
    spreeCount: 0,
    totalRemainingTime: [],
    totalRemainingTurns: [],
} */

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
    const start = await import(`../../src/levels/${serieName}/level_${levelNumber}/scripts/start.js`);
    const xclick = await import(`../../src/levels/${serieName}/level_${levelNumber}/scripts/xclick.js`);
    const match = await import(`../../src/levels/${serieName}/level_${levelNumber}/scripts/match.js`);
    const stagecomplete = await import(`../../src/levels/${serieName}/level_${levelNumber}/scripts/stagecomplete.js`);
    //const end = await import(`../levels/${serieName}/level_${levelNumber}/scripts/end.js`);
    
    return {
        start: start,
        xclick: xclick,
        match: match,
        stagecomplete: stagecomplete,
        //end: end,
    }
}

const cssModules = {
    // We are going to use it to assign styles to dynamic imports. They will be used as style object within JSX 
    main: '',
    bg: '',
    firstPlan: '',
    secondPlan: '',
}

let otherModules = null; // we can use it to access our scripts
let pointsInStage = 0; // determines how many points player gets during current stage of the level
let turns = 0; // detaermines how much turns player used in current stage
let arr = []; // for applying proper number of tiles that has to be rendered for current stage
let randomizedIconsArray = []; // array which holds random icons for newly created tiles 

//INIT
let allTiles;

const anime = Animation.default;

/* export async function getStaticPaths() {
    return {
        paths: [{ params: { id: 'clh515vi700009ss46njnn4s5' } }],
        fallback: false, // can also be true or 'blocking'
    };
}
 */

/* export const getServerSideProps = async({ params }) => {
    const DUMMY_USER_ID = 'clhf5gk8800009sw4tx7ssxam'; // DUMMY USER IS:  Wóda cuda // REMOVE THIS AFTER GOING FOR AUTHENTICATION SERVICE (WE WILL MAKE US OF USESESSION OVER HERE)

    console.log('SERVER SIDE PARAMS ARE: ', params);
    const level = await prisma.level.findUnique({
        where: { id: String(params.id) },
        include: {
            Serie: {
                select: { name_abbr: true }
            }
        }
    });

    const user_progresses = await prisma.progress.findMany({
        where: { userId: DUMMY_USER_ID },
    });

    console.log('PROGRESS RECORD IS: ', user_progresses);

    const level_progress = user_progresses.find(progress_record => progress_record.levelId === String(params.id));

    console.log('LEVEL PROGRESS RECORD IS: ', level_progress);

    const allGameCounters = {
        cardsOpened: [],
        spreeCount: 0,
        totalRemainingTime: [],
        totalRemainingTurns: [],
    }

    const currentProgress = {
        id: level_progress.id,
        stars: level_progress.stars_got,
        lv_progress: level_progress.lv_progress,
        highscore: level_progress.highscore
    }

    let sampleObj = {};

    for(let key in JSON.parse(JSON.stringify(level))) {
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

    if(!level_progress) { throw new Error(`The queried level progress record is missing (could not be found). It should be already created before reaching this point !`) }

    //sampleObj['someArr'] = [];

    return {
        props: { level: sampleObj, gameCounters: allGameCounters, progress: currentProgress} //JSON.parse(JSON.stringify(level))
    };
}; */



function Game(props) {
    // !!!  comments means that we HAVE TO uncomment the code pieces after some development is done for the component
    //console.warn(props);
/*     const allKeys = Object.keys(props);
    console.log(allKeys); */
    /* for(let key in props) {
        if(props[key] instanceof Object && Boolean(props[key][key])) {
            // Level specific settings (such as win conditions, animation times, limitation, tile sizings FALL HERE BELOW) :
            sampleObj[key] = JSON.parse(props[key][key].replace(/'/ig, `"`).replace(/(\w+:)|(\w+ :)/g, function(matchedStr) {  // convert String({} with own properties) to an array
                return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
            }))
        }
        else if(props[key] instanceof Number || String) {
            sampleObj[key] = props[key];
        }
    }

    console.log('Check if we save all the keys in our modified OBJ: ', Boolean(Object.keys(props).length === Object.keys(sampleObj).length))

    console.log(sampleObj); */

    //const z = JSON.parse(JSON.stringify(props.rows.rows)); console.log(typeof z, z); //z.forEach(el => console.log(el))

    //console.warn(JSON.parse(props.rows.rows)) // convert String([] of Numbers) to an array
    //console.warn(JSON.parse(props.icon_set.icon_set.replace(/'/ig, `"`))) // convert String([] of Strings) to an array
/*     console.warn(JSON.parse(props.win.win.replace(/'/ig, `"`).replace(/(\w+:)|(\w+ :)/g, function(matchedStr) {  // convert String({} with own properties) to an array
        return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
    }))); */
    
/*     obj = JSON.parse(jsonStr);
    console.warn(obj); */

    //console.warn(JSON.parse(props.win.win.replace(/'/ig, `"`)));

    // This hooks exist because of switching to Next.js and thanks to it we can perform styles loading once player requests a given level (CSS provided the moment user sees the level screen)
    const [renderStyleModules, setRenderStyleModules] = useState(false);

    const isDesktop = useMediaQuery('(min-width: 941px)');

    const [level, setLevel] = useState(props.level);

    const [scoreMultiplier, setScoreMultiplier] = useState(1); // REMOVE AFTER TRANSFORMING OLD LEVELS INTO A NEW SYSTEM
    const [highscore, setHighscore] = useState(0); // REMOVE AFTER TRANSFORMING OLD LEVELS INTO A NEW SYSTEM
    const [moves, setMoves] = useState(0);   // REMOVE AFTER TRANSFORMING OLD LEVELS INTO A NEW SYSTEM
    const [foundTiles, setFoundTiles] = useState(0); // REMOVE AFTER TRANSFORMING OLD LEVELS INTO A NEW SYSTEM


    const [testValue, setTestValue] = useState(false); // REMOVE AFTER TESTING
    const [confirmValue, setConfirmValue] = useState(null); // ALWAYS SET IT TO NULL (INITIAL) ||  true / false (is level fully Completed ?)
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(0);
    const [clickNo, setClickNo] = useState(0); // use to calculate click number (mostly for xClick script)
    const [stageNo, setStageNo] = useState(0); // use to switch stages (if level has few stages)
    const [boardState, setBoardState] = useState(null);
    // Below prevents from overriding 'better progress record' with worse one, in cases when player uses 'Retry button' instead of 'Back' when saving progress on 'level lose' scenario 
    const [progressData, setProgressData] = useState({highscore: props['progress']['highscore'], lv_progress: props['progress']['lv_progress'], stars: props['progress']['stars']}); 

    const all = useRef(null);
    const bg = useRef(null);
    const gameboard = useRef(null);
    const game = useRef(null);
    const gameinfo_ref = useRef(null);
    const animationBox = useRef(null);

    function conditionsAreMet(e) {
        if(gameboard.current.dataset.animation !== 'off') {return false;}
        if(!e.target.classList.contains(styles_global['tile'])) {return false;}
        const isNotAlreadyOpened = checkTilesOrigin(props.gameCounters.cardsOpened, e.target);
        if(!isNotAlreadyOpened) {  return false; }

        return true;
    }

    function clickable(e)  {

        const tile_back = e.target.querySelector(`.${styles_global['tile-back']}`);
        props.gameCounters.cardsOpened.push(tile_back);
        props.gameCounters.cardsOpened[props.gameCounters.cardsOpened.length - 1].parentNode.classList.add(`target`, `target-serie-${stageNo}`, `target-${props.gameCounters.cardsOpened.length}`); // classcheck

        keepCardOpen(e);
    }

    function checkTilesOrigin(cardsOpened, new_tile) {
        // Everything here in fact refer to props.gameCounters.cardsOpened
        for(let n=0; n<cardsOpened.length; n++) {
            if(cardsOpened[n].parentNode === new_tile) return false;
        }
        return true;
    }

    useEffect(() => {

        if(props.level.limitations[stageNo][`time`]) { 
            // Each level has to have time counting !!!

            if((time === 0) || (confirmValue !== null)) {return;} // We have a separate setTime call which sets time to 1 after initial animation finish 

            const stopwatch = setInterval(() => {
                if(pointsInStage < props.level.win[stageNo][`value`]) {
                    setTime((time + 1) - iter.timeAddon);
                }
            }, 1000);
    
            if((props.level.limitations[stageNo][`time`] - time < 0) && (pointsInStage < props.level.win[stageNo][`value`])) {
                setConfirmValue(false);
                clearInterval(stopwatch);
            }
    
            return () => clearInterval(stopwatch);
        } else {
            console.error('TIME COUNTDOWN NOT ADDED TO THE LEVEL !');
        }

    }, [time]);

    useEffect(() => {
        //console.log(cardsOpened);
        //console.log('Resetting....', cardsOpened);
        
        // 0. Reset all gameCounters - we will use it now for props.gameCounters*
        resetGameCounters();

        // 1. Reset turns / time / stageScore variables first
        setTime(0);
        turns = 0;
        pointsInStage = 0;
        if(props.gameCounters.cardsOpened.length) { props.gameCounters.cardsOpened = [] };
        console.log(props.gameCounters.cardsOpened);

        if(arr.length > 0) {
            while(arr.length > 0) {
                arr.pop();
            }
        }
    
        for(let i=0; i<props.level.tiles[stageNo]['count']; i++) {
            arr.push('');
        };

        randomizedIconsArray = setRandomIcons(icon_Sets[`${props.level.tiles[stageNo]['icon_set']}`], props.level.tiles[stageNo]['count'], props.level.uncover[stageNo][`pattern`]);

        allTiles =  arr.map((tile, index) =>  {
            return <div className={`${styles_global['tile']} ${cssModules.main && cssModules.main[`tile_custom`]}`} key={`tile-s${stageNo}-${index.toString()}`}><div className={`${styles_global[`tile-front`]} ${cssModules.main && cssModules.main[`tile-front_custom`]}`}></div> <div className={`${styles_global[`tile-back`]} ${cssModules.main && cssModules.main[`tile-back_custom`]}`}>{<FontAwesomeIcon icon={`${randomizedIconsArray[index]}`} className={cssModules.main && cssModules.main[`fa-icon_custom`]}/>}</div></div>
        });

        setBoardState(allTiles);
        //setTestValue(!testValue);
        appendPlansElems()
        //loadStyles()
        loadDynamic()

    }, [stageNo, testValue])

    // Add proper styling based on device used by end user

    let boardGridParams = {gridTemplateColumns: `repeat(${props.level.board[stageNo]['columns']}, ${(props.level.tiles[stageNo]['size'])/10}rem)`, gridTemplateRows: `repeat(${props.level.board[stageNo]['rows']}, ${(props.level.tiles[stageNo]['size'])/10}rem)`};
    
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
                duration: props.level.tile_animation[stageNo][`duration`],
                transitionProperty: 'all',
                easing: props.level.tile_animation[stageNo][`easing`],
                rotateY: 180,
            }).finished;

            await Promise.all([a1]);
        }

        setClickNo(clickNo + 1);

        if(props.gameCounters.cardsOpened.length === props.level.uncover[stageNo][`count`]) {
            gameboard.current.dataset.animation = 'on';
            turns = turns + 1;
            iter.pauseCondition = false;

            const doesMatch = uncoverPatterns[props.level.uncover[stageNo][`pattern`]](props.gameCounters.cardsOpened);

            const cardsOpened_parentNodes = setParentNodes(props.gameCounters.cardsOpened);

            //otherModules[`match`].match(doesMatch, cardsOpened_parentNodes, stageNo); // doesMatch determines whether player meets required condition to remove tiles
        
            openUp()
                .then(() => {
                    otherModules[`match`].match(doesMatch, cardsOpened_parentNodes, stageNo, props.level/* props.newLevel */) // doesMatch determines whether player meets required condition to remove tiles
                        .then(() => {
                            doCardsMatch(doesMatch, props.gameCounters.cardsOpened)
                        })
                })
        } else {
            openUp();
        }
    }

    function doCardsMatch(doesMatch, cardsOpened) {
        // Block the click listener for a brief checkout duration
        isChecking = true;

        // EVERY cardsOpened statement here refers to props.gameCounters.cardsOpened

        manageValuesAndCounters(doesMatch);

        if(props.level.limitations[stageNo][`time`]) {
            if(props.level.limitations[stageNo][`time`] - time <= 0) {
                // We need to block winning condition when player is left with too little time
                setConfirmValue(false);
                return;
            }
        }
        console.log('totalRemainingTurns: ',  props.gameCounters[`totalRemainingTurns`], "  totalRemainingTime: ", props.gameCounters[`totalRemainingTime`])
        setTimeout(() => {

            const cardsOpened_parentNodes = setParentNodes(cardsOpened);

            if(doesMatch) {

                setScore(score + props.level.score[stageNo][`count`] 
                    + ((props.level.score[stageNo][`extras`])?  scoreExtras[`${props.level.score[stageNo][`extras`]}`](props.gameCounters, props.level.score[stageNo][`count`]) : 0)
                );

                async function fade() {
                    const a1 = anime({
                        targets: cardsOpened_parentNodes,
                        duration: props.level.tile_animation[stageNo][`duration`],
                        easing: props.level.tile_animation[stageNo][`easing`],
                        opacity: 0,
                    }).finished;

                    await Promise.all([a1]);
                }

                fade().then(() => {
                    cardsOpened_parentNodes.forEach((parent, index) => {
                        parent.style = 'visibility: hidden';
                        parent.classList.remove(`target`, `target-serie-${stageNo}`, `target-${index + 1}`); //classcheck
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
                    cardsOpened_parentNodes[i].classList.remove(`target`, `target-serie-${stageNo}`, `target-${i+1}`); //classcheck
                }

                while(cardsOpened.length) {cardsOpened.pop();}

                setClickNo(0);
                gameboard.current.dataset.animation = 'off';
                flipBack(cardsOpened_parentNodes);
                isChecking = false;

                async function flipBack(cardsOpened_parentNodes) {
                    const a1 = anime({
                        targets: cardsOpened_parentNodes,
                        duration: props.level.tile_animation[stageNo][`duration`],
                        rotateY: [180, 0],
                        easing: props.level.tile_animation[stageNo][`easing`],
                    }).finished;

                    await Promise.all([a1]);
                }        
                
            }

            checkLosingConditions();

        }, props.level.tile_animation[stageNo]['compareTime'])

    }

    function manageValuesAndCounters(doesMatch) {
        // This function is used for managing all counters in one place (to make things cleaner)

        if(doesMatch) {
            pointsInStage += props.level.win[stageNo][`pointsPerMatch`];
            props.gameCounters['spree'] += 1;
        } else {
            props.gameCounters['spree'] = 0;
        }
    }

    function resetGameCounters() {
        props.gameCounters['spree'] = 0;
    }

    function checkLosingConditions() {
        if(props.level.limitations[stageNo][`turns`]) { // if this stage take care of turns used
            if( (props.level.limitations[stageNo][`turns`] - turns <= 0) && (pointsInStage < props.level.win[stageNo][`value`]) && (confirmValue === null) ) { 
                // if we have no turns left, and still didnt complete current stage
                setConfirmValue(false);
            }
        }
    }

    function checkStageSuccess(pointsInStage) {

        if( (pointsInStage >= props.level.win[stageNo][`value`]) ) {
            // Update gameCounters for accumulative remaining turns / time
            if(props.level.limitations[stageNo][`turns`]) props.gameCounters[`totalRemainingTurns`].push(props.level.limitations[stageNo][`turns`] - turns);
            if(props.level.limitations[stageNo][`time`])  props.gameCounters[`totalRemainingTime`].push(props.level.limitations[stageNo][`time`] - time); 


            if(stageNo + 1 === props.level.stages) {
                // Level completed !
                async function finishGame() {
                    await otherModules[`stagecomplete`].stagecomplete(stageNo, true)
                }
                finishGame()
                    .then(() => setConfirmValue(true));
            } 
            else if(stageNo + 1 !== props.level.stages) {
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
        // EVERY cardsOpened statement in fact refers to props.gameCounters.cardsOpened 
        let parentsNodeArr = [];
        cardsOpened.forEach(tile => {
            parentsNodeArr.push(tile.parentNode);
        })
        return parentsNodeArr;
    }

    async function loadDynamic() {
        // 0. First let's import some level-based styling
        await loadStyles();
        // 1. Init icons 
        allTiles = arr.map((tile, index) =>  {
            return <div data-get={'tile'} className={`${styles_global['tile']} ${cssModules.main && cssModules.main[`tile_custom`]}`} key={`tile-s${stageNo}-${index.toString()}`}><div className={`${styles_global[`tile-front`]} ${cssModules.main && cssModules.main[`tile-front_custom`]}`}></div> <div className={`${styles_global[`tile-back`]} ${cssModules.main && cssModules.main[`tile-back_custom`]}`}>{<FontAwesomeIcon icon={`${randomizedIconsArray[index]}`} className={cssModules.main && cssModules.main[`fa-icon_custom`]}/>}</div></div>
        });
        // 2. Now perform DOM repaint by fire useState hook
        console.log('ALLTILES: ', allTiles);
        setBoardState(allTiles);
        // 3. Execute start script, launch animation, etc.
        
    }

    useEffect(() => {
        if(boardState) {
            async function run() {
                let loadStart = await import(`../../src/levels/${props.level.Serie.name_abbr}/level_${props.level.number}/scripts/start.js`);
                loadStart.level_start(stageNo, props.level.starting_animation[stageNo][`duration`], props.level.starting_animation[stageNo][`tileShowTime`])
                    .then(() => {
                        // After animation is completed...
                        setTime(1);
                        document.body.style.pointerEvents = 'auto'; // unlock clicking (previously blocked in leve_info *play btn onClick*)
                    })
                otherModules = await loadOtherModules(props.level.Serie.name_abbr, props.level.number);    
            }
            run();
        }
    }, [boardState])

    function restartLevel() {
        gameboard.current.dataset.animation = 'off'; // prevents from bug happening when player opens 2 tiles, which are not closed again before time runs out
        resetPlanItems();
        resetAllGameCounters(props.gameCounters);
        setTestValue(!testValue);
        setBoardState(null);
        setClickNo(0); // Setting back to 0 prevents from bug, where clicking first turn for already restarted level make animations not runnings
        setStageNo(0);
        setScore(0); // reset score value to 0 after lose
        setConfirmValue(null);
    }

    function resetPlanItems() {
        const [getFirstPlan, getSecondPlan, getAnimationPlan] = 
            [   document.querySelector(`.${classes[`firstPlan`]}`),
                document.querySelector(`.${classes[`secondPlan`]}`),
                document.querySelector(`.${classes[`animationPlan`]}`),
            ];
        getFirstPlan.replaceChildren();
        getSecondPlan.replaceChildren();
        getAnimationPlan.replaceChildren();
    }

    function resetAllGameCounters(allGameCounters) {
        for(let key in allGameCounters) {
            if(typeof(allGameCounters[key]) === 'string') { allGameCounters[key] = ''}
            else if(typeof(allGameCounters[key]) === 'number') { allGameCounters[key] = 0}
            else if(allGameCounters[key] instanceof Array) { allGameCounters[key] = []}
            else { console.error(`DETECTED UNSUPPORTED KEY TYPE WHEN RESETTING COUNTER VALUES. FOUND TYPE: ${typeof(key)} for counter: ${key} with value of: ${allGameCounters[key]} `) };
        }
    }

/*     useEffect(() => {
        async function runDynamic() {
            let loadStart = await import(`../../src/levels/${props.Serie.name_abbr}/level_${props.number}/scripts/start.js`);
            loadStart.level_start(stageNo, props.starting_animation[stageNo][`time`], props.starting_animation[stageNo][`tileShowTime`])
            .then(() => {
                // After animation is completed...
                setTime(1);
                document.body.style.pointerEvents = 'auto'; // unlock clicking (previously blocked in leve_info *play btn onClick*)
            })
            otherModules = await loadOtherModules(props.Serie.name_abbr, props.number);
        }
        runDynamic();
    }, [boardState]) */

    async function newStageFadeIn() {
        const a1 = anime({
            targets: [gameboard.current, gameinfo_ref.current],
            opacity: [0, 1],
            duration: props.level.fade[stageNo]['duration'],
            easing: props.level.fade[stageNo]['easing'],
        }).finished;

        await Promise.all([a1]);
    }

    async function newStageFadeOut() {
        const a1 = anime({
            targets: [gameboard.current, gameinfo_ref.current],
            opacity: [1, 0],
            duration: props.level.fade[stageNo]['duration'],
            easing: props.level.fade[stageNo]['easing'],
        }).finished;
        
        await Promise.all([a1]);
    }


    useEffect(() => {
        if(clickNo > 0) {
            otherModules[`xclick`].xclick(clickNo, props.gameCounters.cardsOpened[props.gameCounters.cardsOpened.length - 1].parentNode, stageNo, props.level/* props.newLevel */);
        } else {
            //
        }
    }, [clickNo])

    useLayoutEffect(() => {
        // Prevents from initial screen flickering when a couple of frames were suddenly showing a level, interrupted by the fadeIn animation (below one)
        anime({
            targets: document.body,
            duration: 1200,
            opacity: [0, 1],
            easing: 'linear',
        })
    }, []);

    useEffect(() => {
        document.body.style.overflowY = 'auto';
        const all = document.querySelector(`.${styles_global['all']}`);
        console.log('INIT MEMORY_GAME SHOWUP : ', all);
/*         anime({
            targets: document.body,
            duration: 1200,
            opacity: [0, 1],
            easing: 'linear',
        }) */
        setBoardState(null);
        //loadStyles();
        /* appendPlansElems(); */
    }, []);

    async function loadStyles() {
        cssModules.main = await import(`../../src/levels/${props.level.Serie.name_abbr}/level_${props.level.number}/styles/main.module.css`); // for styling tiles
        cssModules.firstPlan = await import(`../../src/levels/${props.level.Serie.name_abbr}/level_${props.level.number}/styles/firstPlan.module.css`); // for first plan fancy elements
        cssModules.secondPlan = await import(`../../src/levels/${props.level.Serie.name_abbr}/level_${props.level.number}/styles/secondPlan.module.css`); // for second plan fancy elements
        cssModules.bg =  await import(`../../src/levels/${props.level.Serie.name_abbr}/level_${props.level.number}/styles/bg.module.css`); // for adding background to the level
    }

    async function appendPlansElems() {
        const plansElems = await import(`../../src/levels/${props.level.Serie.name_abbr}/level_${props.level.number}/generatePlanItems.js`);
        plansElems.generateItems(classes[`firstPlan`], classes[`secondPlan`]);
    }

    return(
        <div className={styles_global['all']} ref={all}>
            <div className={`${styles_global[`background`]} ${cssModules.bg && cssModules.bg[`background_custom`]}`} ref={bg}>
                <div className='game-info' ref={gameinfo_ref} >
                    <GameInfo newSerie={props.level.Serie.name_abbr} level={props.level.number} moves={props.level.limitations[stageNo]['turns'] - turns} time={props.level.limitations[stageNo]['time'] - time} score={score}  />
                </div>

                <div className={`${styles_global[`game`]} ${cssModules.bg && cssModules.bg[`game_custom`]}`} ref={game}>
                    <div className={`${styles_global[`board`]} ${cssModules.bg && cssModules.bg[`board_custom`]}`} ref={gameboard} data-animation='off' onClick={(e) => { if(conditionsAreMet(e)) { clickable(e); setClickNo(clickNo + 1); }}}  style={boardGridParams}>
                        {boardState}
                    </div>
                </div>
                
                <div className={`${classes[`firstPlan`]} ${cssModules.firstPlan && cssModules.firstPlan[`firstPlan_custom`]}`}> </div>
                <div className={`${classes[`secondPlan`]} ${cssModules.secondPlan && cssModules.secondPlan[`secondPlan_custom`]}`}> </div>
                <div className={`${classes[`animationPlan`]} ${cssModules.main && cssModules.main[`aContainer_custom`]}`} ref={animationBox}></div>

                {confirmValue !== null && (
                    <Confirm value={confirmValue} level={level} level_no={props.level.number} newSerie={props.level.Serie.name_abbr} score={score} highscore={highscore} tsv={timeScoreValue} msv={moveScoreValue} 
                        turns={(confirmValue)? props.gameCounters[`totalRemainingTurns`] : (props.level.limitations[stageNo][`turns`])? props.level.limitations[stageNo][`turns`] - turns : 0} 
                        time={(confirmValue) ? props.gameCounters[`totalRemainingTime`] : (props.level.limitations[stageNo][`time`])? props.level.limitations[stageNo][`time`] - time : 0} 
                        start={() => {props.changeComponent('preview') /* Router.push('/preview') */}} /* next={props.level.changeComponent} */ restart={() => { restartLevel();   /* Router.push('/preview/[id]', `/preview/${props.level.id}`) */}}
                        variables={props.level.variables} progressRecordId={props.progress.id} currentProgress={progressData} setCurrentProgress={setProgressData} starConditions={props.level.star_conditions} pointsInStage={pointsInStage} stageNo={stageNo}
                        playerId={props.playerId} playerExp={props.playerExp}
                    />
                )}

                {(props.level.cords === 'gg') && ( 
                    <div className='confirmation-w'>
                        {<ConfirmWin level={level} highscore={highscore} start={props.level.preview} />}
                    </div>
                )}
            </div>
        </div>
    )
} 

export default Game;