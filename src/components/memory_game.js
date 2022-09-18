import  React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import '../styles/game.css';
import  levels from '../levels.js';
import useMediaQuery from '../virtual_hooks/useMediaQuery';

import anime from 'animejs/lib/anime.es.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import GameInfo from './game_info.js';
import Confirm from './confirm.js';
import ConfirmPlay from './confirm_play';
import ConfirmWin from './confirm_win';
import Pause from './pause';

// Level based stuff
import {uncoverPatterns} from '../global/predefined/uncover_patterns.js';


import { setIcon, fasArray, /* fabArray */ } from './landing.js';

library.add(fab, fas);

let usedIcons = [];
let randomizedIcons = [];

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

function setRandomIcons(fasArray, usedIcons, randomizedIcons, tiles) {

    let fasArrayCopy = [...fasArray]; // Create a copy of fasArray; direct assigning (fasArrayCopy = fasArray) would affect fasArray too!
    //let fabArrayCopy = [...fabArray]; // Same here ...

    for(let i=0; i<(tiles/2); i++) { // Math.ceil(tileCodes.length/2) => it should be actually state value !!!
        let random = Math.floor(Math.random() * fasArrayCopy.length);
        usedIcons.push(fasArrayCopy[random]);
        fasArrayCopy.splice(random, 1);
    }
    let duplicate = usedIcons;
    usedIcons.push(...duplicate);

    const usedIconsCopy = [...usedIcons]; // Same here - creating a copy; do not assign values directly(it works for original ref only) !!

    if(randomizedIcons.length > 0) {
        while(randomizedIcons.length > 0) {
            randomizedIcons.pop();
        }
    }

    for(let j=0; j<usedIconsCopy.length; j++) {
        randomizedIcons.push(setIcon(usedIcons));
    }

}

async function loadOtherModules(serieName, levelNumber) {
    const xclick = await import(`../levels/${serieName}/level_${levelNumber}/scripts/xclick.js`);
    const match = await import(`../levels/${serieName}/level_${levelNumber}/scripts/match.js`);
    const stagecomplete = await import(`../levels/${serieName}/level_${levelNumber}/scripts/stagecomplete.js`);
    const end = await import(`../levels/${serieName}/level_${levelNumber}/scripts/end.js`);
    
    return {
        xclick: xclick,
        match: match,
        stagecomplete: stagecomplete,
        end: end,
    }
}

let otherModules = null; // we can use it to access our scripts
let pointsInStage = 0; // determines how man points player gets during current stage of the level

//INIT
function Game(props) {

    const isDesktop = useMediaQuery('(min-width: 941px)');

    const [renderCount, setRenderCount] = useState(0);
    const [animationLoad, setAnimationLoad] = useState(false);
    const [tiles, setTiles] = useState(null);  // Ta wartość odpowiada za poprawne malowanie ekranu - NIE WOLNO JEJ MODYFIKOWAĆ W TRAKCIE GRY !
    const [level, setLevel] = useState(props.level);

    const [scoreMultiplier, setScoreMultiplier] = useState(1);
    const [highscore, setHighscore] = useState(0);
    const [moves, setMoves] = useState(0);  
    const [time, setTime] = useState(null);
    const [foundTiles, setFoundTiles] = useState(0);
    const [confirmValue, setConfirmValue] = useState(null); // przyjmuje wartości true / false  -> wygrałeś / przegrałeś ten poziom ?

    const [pause, setPause] = useState(false); // is game paused? Should game be paused ?

    const [score, setScore] = useState(0);
    const [turns, setTurns] = useState(0);
    const [clickNo, setClickNo] = useState(0); // use to calculate click number (mostly for xClick script)
    const [stageNo, setStageNo] = useState(0); // use to switch stages (if level has few stages)

    const all = useRef(null);
    const bg = useRef(null);
    const gameboard = useRef(null);
    const game = useRef(null);
    const animationBox = useRef(null);
    const inverseReverse = useRef(null); // Starting animation

    //If you lose, the Icon Array has to be cleared out completely - neglecting can cause pushing not paired icons to array
    
    // If you win...
    const changeTileNumber = () => {

        // Clean-up function whenever you finish a level
        // First, clean up all State variables

        setAnimationLoad(false);
        setLevel(level + 1);
        setFoundTiles(0);
        setScore(0);
        setScoreMultiplier(1);
        setMoves(0);
        setTime(0);
        //setTiles(levels[`lvl${level}`].tiles);
        setConfirmValue(null);
        setRenderCount(0);

        setTurns(0);

        scoreAddon = 0;
        handleCount = 0;
        handleCheck = 0;

        iter.value = 0;
        iter.amount = 0;
        iter.count = 0;
        iter.streak = 0;
        iter.previousStep = 0;
        iter.extraTurns = 0;
        iter.fTilesModifier = 0;
        iter.timeAddon = 0;
        iter.array = [];
        iter.nextArr = [];
        iter.pauseCondition = false; // by default, it is not allowed to turn on pasue btn

        async function finish() {
           await winLvAnimation()
        }

        cleanup();
        finish();
    }

    const winLvAnimation = async () => {

        const a1 = anime({
            targets: bg.current,
            duration: 2000,
            opacity: [0, 1],
            easing: 'linear',
        }).finished;

        await Promise.all([a1]);
    
    }

    const cleanup = () => {
        // Tu będzie rotate wszystkich ikon; w skrócie: przywracamy poziom do stanu pierwotnego i potem tworzymy kolejny poziom
        // Then proceed with new tiles, grid, icons...

        if(animationBox.current.childNodes.length > 0) {
            for(let nodeCount = 0; nodeCount !== animationBox.current.childNodes.length;) {
                animationBox.current.childNodes[nodeCount].remove();
            }
    
        }

        for(let x=0; x<gameboard.current.childNodes.length; x++) {
            gameboard.current.childNodes[x].style = `visibility: visible`;
        }

    }


    if((level <= 1) && (renderCount < 1)) {
        //setConfirmValue('play');
    } 

    //  Render Count pomaga pozbyć się mylących błędów z konsoli - zmienna pilnuje, czy render wykonał się 1 raz. Jeśli ma się on wykonać po raz
    //  kolejny, to nie tworzymy na nowo tabeli z ikonkami (unikamy podmiany ikon na planszy podczas gry)
    if(renderCount < 1) {
        setRandomIcons(fasArray, usedIcons, randomizedIcons, props.newLevel.tiles[stageNo]);
        setRenderCount(renderCount + 1);
    }

    useEffect(() => {
       // gameboard.current.removeEventListener('click', clickable);
       // gameboard.current.addEventListener('click', clickable);
        handleCount = 0;
            // Starting animation in the first place -> 800 animation time + 1400 delay - 4000 ms is a safe delay
    }, [animationLoad]);

    useEffect(() => {

        // ADD STARTING FLAG
        levels[`lvl${level-1}`].onStartFlag(cardsOpened, props.newLevel.tiles[stageNo], foundTiles, iter); // later on this line will became useless
        iter.pauseCondition = false;
     
    }, [level]);

    function conditionsAreMet(e) {
        if(gameboard.current.dataset.animation !== 'off') {return false;}
        if(!e.target.classList.contains('tile')) {return false;}
        const isNotAlreadyOpened = checkTilesOrigin(cardsOpened, e.target);
        if(!isNotAlreadyOpened) { console.error('Lack of origin detected'); return false; }

        return true;
    }

    function clickable(e)  {
        // console.warn(props.newLevel.uncover.count); // its our new equivalent of cardsOpened.length - but dynamic !

        const tile_back = e.target.querySelector('.tile-back');
        cardsOpened.push(tile_back);
        cardsOpened[cardsOpened.length - 1].parentNode.classList.add(`target`, `target-${cardsOpened.length}`);

        keepCardOpen(e);
    }

    function checkTilesOrigin(cardsOpened, new_tile) {
        for(let n=0; n<cardsOpened.length; n++) {
            if(cardsOpened[n].parentNode === new_tile) return false;
        }
        return true;
    }

    useEffect(() => {

        if(levels[`lvl${level-1}`].counter.turns !== null) {
            if(((foundTiles+2) === props.newLevel.tiles) && (cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1])) {  // If you win the level...  // SetState is async, so we need to prepend a value right before
                confirmSuccess();
            }

            else if((parseInt(levels[`lvl${level-1}`].counter.turns) - moves) <= 0) {  // SetState is async, so we need to prepend a value right before
                confirmFailure();
            } 
        } 

    }, [moves]);


    useEffect(() => {

        if(levels[`lvl${level-1}`].counter.time !== null) {
            const stopwatch = setInterval(() => {
                if(pause !== true) {
                    setTime((time + 1) - iter.timeAddon);
                }
            }, 1000);
    
            if((foundTiles === props.newLevel.tiles) && (levels[`lvl${level-1}`].counter.time - time > 0)) {
                confirmSuccess();
                clearInterval(stopwatch);
    
            }
    
            else if((levels[`lvl${level-1}`].counter.time - time <= 0) && (levels[`lvl${level-1}`].counter.time !== null)) {
                confirmFailure();
                clearInterval(stopwatch);
            }
    
            return () => clearInterval(stopwatch);
        }

    }, [time, level, pause]); // Level because normally we won't count down time - only when those time levels came in, so every time we need to check if new level is the time level


    let arr = [];

    if(arr.length > 0) {
        while(arr.length > 0) {
            arr.pop();
        }
    }

    for(let i=0; i<props.newLevel.tiles[stageNo]; i++) {
        arr.push('');
    };

    let allTiles =  arr.map((tile, index) =>  {
            return <div className={`tile t-${props.newLevel.number}`} key={index.toString()}><div className={`tile-front tf-${props.newLevel.number}`}></div> <div className={`tile-back tb-${props.newLevel.number}`}>{<FontAwesomeIcon icon={`${randomizedIcons[index]}`} className={`fa-icon-${props.newLevel.number}`}/>}</div></div>
        } 
    ); 
    
    //console.log(allTiles);

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

        // Lets do it in advance
        resolveAnimationBugs();

        if(cardsOpened.length === props.newLevel.uncover[stageNo][`count`]) {
            gameboard.current.dataset.animation = 'on';
            // Checking...
            setTurns(turns + 1);
            //console.log(usedTurns);
            console.warn('COŚ KREATYWNEGO');
            iter.pauseCondition = false;
            //doCardsMatch(cardsOpened);  // PLEASE REBUILD THAT

            const doesMatch = uncoverPatterns[props.newLevel.uncover[stageNo][`pattern`]](cardsOpened);

            otherModules[`match`].match(doesMatch, cardsOpened, stageNo); // doesMatch determines whether player meets required condition to remove tiles
        
            console.time();
            openUp()
                .then(() => {
                    console.timeEnd();
                    doCardsMatch(doesMatch, cardsOpened);  // PLEASE REBUILD THAT
                })
        } else {
            openUp();
        }
    }

    function doCardsMatch(doesMatch, cardsOpened) {
        // Block the click listener for a brief checkout duration
       // gameboard.current.removeEventListener('click', clickable);
        console.log(cardsOpened);
        isChecking = true;

        setTimeout(() => {

            if(doesMatch) {

                setScore(score + props.newLevel.score[stageNo][`count`]);

                async function fade() {
                    const a1 = anime({
                        targets: [cardsOpened[0].parentNode, cardsOpened[1].parentNode],
                        duration: props.newLevel.tile_animation[stageNo][`time`],
                        easing: props.newLevel.tile_animation[stageNo][`easing`],
                        opacity: [1, 0],
                    }).finished;

                   await Promise.all([a1]);
                }

                fade().then(() => {
                    console.log('now !');
                    cardsOpened[0].parentNode.style = 'visibility: hidden';
                    cardsOpened[1].parentNode.style = 'visibility: hidden';
                
                    //resolveAnimationBugs(); // Tab switching issue

                    for(let i=0; i<cardsOpened.length; i++) {
                        cardsOpened[i].parentNode.classList.remove(`target`, `target-${i+1}`);
                    }

                    while(cardsOpened.length) {cardsOpened.pop();}


                    //gameboard.current.addEventListener('click', clickable); 

                    // Check game progress - do player finish level or stage ?
                    pointsInStage += props.newLevel.win[stageNo][`pointsPerMatch`];
                    checkStageSuccess(pointsInStage);

                    setClickNo(0);
                    isChecking = false;
                    gameboard.current.dataset.animation = 'off';
                })
            }

            else {

                const copy = [...cardsOpened];

                for(let i=0; i<cardsOpened.length; i++) {
                    console.log(cardsOpened[i]);
                    cardsOpened[i].parentNode.classList.remove(`target`, `target-${i+1}`);
                }

                console.log('removing cardsOpened');
                while(cardsOpened.length) {cardsOpened.pop();}

                //gameboard.current.addEventListener('click', clickable);

                setClickNo(0);
                gameboard.current.dataset.animation = 'off';
                flipBack(copy);
                isChecking = false;

                async function flipBack(copy) {
                    const a1 = anime({
                        targets: [copy[0].parentNode, copy[1].parentNode],
                        duration: props.newLevel.tile_animation[stageNo][`time`],
                        rotateY: [180, 0],
                        easing: props.newLevel.tile_animation[stageNo][`easing`],
                    }).finished;

                    await Promise.all([a1]);
                }
                
                /*  flipBack().then(() => {

                    //resolveAnimationBugs(); // Tab switching issue

                    for(let i=0; i<cardsOpened.length; i++) {
                        console.log(cardsOpened[i]);
                        cardsOpened[i].parentNode.classList.remove(`target`, `target-${i+1}`);
                    }

                    while(cardsOpened.length) {cardsOpened.pop();}

                    isChecking = false;
                    gameboard.current.addEventListener('click', clickable);
        
                }) */
                
            }

        }, props.newLevel.compare_time[stageNo])

    }

    function checkStageSuccess(pointsInStage) {
        if(pointsInStage >= props.newLevel.win[stageNo][`value`]) {
            if(stageNo + 1 === props.newLevel.stages) {
                // Level completed !
                setConfirmValue(true);
            } 
            else if(stageNo + 1 !== props.newLevel.stages) {
                // Move to the new stage 
                setStageNo(stageNo + 1);
                pointsInStage = 0;
            }
        }
    }

        
    function resolveAnimationBugs() {

        let tilesToCheck = [...gameboard.current.childNodes];
        let buggedTiles = [];
        tilesToCheck.forEach((ttc, index) => {
            let transform = ttc.style.transform;
            let query = 'rotateY';
            let pos = transform.indexOf(query);
            let end = transform.indexOf(')', pos);
            let transformValue = transform.substring(pos + query.length, end + 1);

            if(cardsOpened[1]) { // Resolve after second click
                if((ttc.style.visibility !== 'hidden')  && (transformValue !== '(0deg)') && (cardsOpened[0].parentNode !== ttc) && (cardsOpened[1].parentNode !== ttc))  {
                    buggedTiles.push(ttc);
                }
            } else {  // Resolve after first click
                if((ttc.style.visibility !== 'hidden')  && (transformValue !== '(0deg)') && (cardsOpened[0].parentNode !== ttc))  {
                    buggedTiles.push(ttc);
                }
            }
        })

        if(buggedTiles.length > 0) {
            anime({
                targets: buggedTiles,
                duration: 500,
                rotateY: '0deg',
                easing: 'easeOutSine',
            })
        }
    }

    function confirmSuccess() {
     
        scoreAddon = (scorePerPair * scoreMultiplier);

        if(levels[`lvl${level-1}`].counter.turns !== null) {
            setHighscore(highscore + score +  scoreAddon + ((levels[`lvl${level-1}`].counter.turns - moves) * moveScoreValue));
        }
        else {  // So it was time level
            setHighscore(highscore + score  + ((levels[`lvl${level-1}`].counter.time - time) * timeScoreValue));
        } 

        setConfirmValue(true);
    }

    function confirmFailure() {
        
        if(levels[`lvl${level-1}`].counter.turns !== null) {
            setHighscore(highscore + score + scoreAddon + ((levels[`lvl${level-1}`].counter.turns - moves) * moveScoreValue));
        }
        else {  // So it was time level
            setHighscore(highscore + score  + ((levels[`lvl${level-1}`].counter.time - time) * timeScoreValue));
            if(cardsOpened.length > 0) {  // If you lose time game and click 1 tile before losing...
                cardsOpened.pop();
            }
        } 

        setConfirmValue(false);

        // IT IS NOT WORKING (?)
       // gameboard.current.removeEventListener('click', clickable);
    }

    function handleState() {

        // PREVENT FIRSTCLICK AND SECONDCLICK MULTIPLE TIMES INVOKING WHEN USER KEEPS PRESSING THE SAME TILE / SOME TILES MULTIPLE TIMES !!!!
        if(isChecking) {return;}

        if(gameboard.current.dataset.animation === 'off') {

            if((handleCount < 1) && (cardsOpened[0])) {
                cardsOpened[0].parentNode.classList.add('target', 'target-1');
                if(cardsOpened.length === 1) {
                    handleCheck = 0;
                    handleCount++;
                    //levels[`lvl${level-1}`].onFirstClickFlag(cardsOpened, props.newLevel.tiles, foundTiles, iter);

                    // Try to call 
                    //otherModules[`xclick`].xclick(1, cardsOpened[0].parentNode); // pass ( click no, target )
                }
            }

            else if((handleCheck < 1) && (cardsOpened[1]))  {
                cardsOpened[1].parentNode.classList.add('target', 'target-2');
                if(cardsOpened.length > 1) {
                    //levels[`lvl${level-1}`].onSecondClickFlag(cardsOpened, props.newLevel.tiles, foundTiles, iter, time);
                    //otherModules[`xclick`].xclick(2, cardsOpened[1].parentNode); // pass ( click no, target )
                    handleCheck++;
                    handleCount = 0;
                }       
            }

            
        }
            
        if((cardsOpened.length > 1) && (!(isChecking))) {
            return;
            for(let i=0; i < cardsOpened.length; i++) {
                cardsOpened[i].parentNode.classList.remove('target');
                cardsOpened[i].parentNode.classList.remove('target-1');
                cardsOpened[i].parentNode.classList.remove('target-2');
            }

            setTimeout(() => {

                if(cardsOpened.length <= 1) {return;} 

                if(cardsOpened[0].parentNode === cardsOpened[1].parentNode) {
                    return;
                } 

                if(levels[`lvl${level-1}`].counter.turns !== null) {
                    setMoves(moves + 1 + iter.extraTurns);
                }

                if((cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1])) {
                    setFoundTiles(foundTiles + 2 + iter.fTilesModifier);
                    setScore(score +(scorePerPair * scoreMultiplier));
                    scoreAddon = ((scorePerPair * scoreMultiplier) +50);  // if u lose, but the last pair match
                    setScoreMultiplier(scoreMultiplier + 0.5);
                }
                else {
                    setScoreMultiplier(1);
                    scoreAddon = 0;  // if u lose, but the last pair doesn't match
                }

            }, 1200) 
            // Block the scope and prevents from fast-clicking turn decreasing behaviour
            handleCount = 0;
        } 
    }

    useEffect(() => {
        console.log(' ??? ');
        if(clickNo > 0) {
            console.log('xclick activation');
            otherModules[`xclick`].xclick(clickNo, cardsOpened[cardsOpened.length - 1].parentNode, stageNo);
        } else {
            //cardsOpened
        }
    }, [clickNo])

    useEffect(() => {
        if(stageNo > 0) {
            // From here we know level is not yet completed !

            // Here we are gonna create and prepare all things and stuff for new level stage
        }
    }, [stageNo])

    function pauseGame() {
        if(iter.pauseCondition) {
            setPause(true);
        }
    }

    function continueGame() {
        setPause(false);
        if(time !== null) {
            setTime(time + 1); // Taxing 1 second every time player press pause - in order to avoid taking time advantages (or animation skipping)
        }
    }

    /* Rework has begun ! */
    useEffect(() => {  // or useLayoutEffect if that will not work
        // Here set state once rendering is completed, then another useEffect when we have a finished board and can go for starting animation
        async function loadDynamic() {
            let loadStart = await import(`../levels/${props.newSerie}/level_${props.newLevel.number}/scripts/start.js`);
            loadStart.level_start(stageNo);
            otherModules = await loadOtherModules(props.newSerie, props.newLevel.number);
            console.log(otherModules);
            
        }

        console.time();
        loadDynamic()
            .then(() => {
                console.timeEnd();
            })

        //console.log(props.newLevel, props.newLevel.number);
    }, []);

    return(
        <div className='all' ref={all}>
            <div className={`background bg-${props.newLevel.number}`} ref={bg}>
                <div className='game-info'>
                    <GameInfo level={props.newLevel.number} moves={(props.newLevel.limitations[stageNo]['turns'] - turns)} time={props.newLevel.limitations[stageNo]['time']} score={score}  />
                </div>

                {/*  ONLY FOR DEV LEVEL TESTING ->  <div onClick={() => {setLevel(level + 2); confirmSuccess();}}> XMM; </div>*/}
                {/* <div onClick={() => {setLevel(level + 10); confirmSuccess();}}> XMM; </div> */}
                <div className={`game game-${props.newLevel.number}`} ref={game}>
                    <div className={`board board-${props.newLevel.number}`} ref={gameboard} data-animation='off' onClick={(e) => { if(conditionsAreMet(e)) { clickable(e); setClickNo(clickNo + 1); }}}  style={boardGridParams}>
                        {allTiles}
                    </div>
                </div>
                {/* <div className={(iter.pauseCondition) ? 'pause-btn' : 'pause-btn-not-active' } isVisual={iter.pauseCondition} onClick={pauseGame} > || </div> */}
                <div className={`animationContainer aContainer-${props.newLevel.number}`} ref={animationBox}></div>

                {/*{pause === true && (
                    <div className='pause-box'>
                        {<Pause continue={continueGame} />}
                    </div>
                )} */}

{/*                 {confirmValue === 'play' && (
                    <div className='confirmation-p'>
                        {<ConfirmPlay value={'play'} level={level} next={changeTileNumber} /> }
                    </div>
                )} */}
                {confirmValue === true && (
                    <div className='confirmation-s'>
                        <Confirm value={true} level={level} score={score} highscore={highscore} tsv={timeScoreValue} msv={moveScoreValue} turns={((levels[`lvl${level-1}`].counter.turns) - moves)} time={(levels[`lvl${level-1}`].counter.time) - time} next={changeTileNumber}/>
                    </div>
                )}
                {confirmValue === false && (
                    <div className='confirmation-f'>
                        <Confirm value={false} level={level} score={score} highscore={highscore} tsv={timeScoreValue} msv={moveScoreValue} turns={((levels[`lvl${level-1}`].counter.turns) - moves)} time={(levels[`lvl${level-1}`].counter.time) - time} start={props.preview}/>,
                    </div>
                )}
                {(levels[`lvl${level-1}`].lv === 'gg') && (
                    <div className='confirmation-w'>
                        {<ConfirmWin level={level} highscore={highscore} start={props.preview} />}
                    </div>
                )}
            </div>
        </div>
    )
} 

export default Game;