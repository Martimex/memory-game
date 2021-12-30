import  React, { useState, useEffect, useRef } from 'react';
import '../styles/game.css';
import  levels from '../levels.js';

import anime from 'animejs/lib/anime.es.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import GameInfo from './game_info.js';
import Confirm from './confirm.js';
import ConfirmPlay from './confirm_play';
import ConfirmWin from './confirm_win';

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
    /*determines whether you passed level specific conditions - if not, value = false and u lose the level*/ passCondition: true,
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

//INIT
function Game(props) {

    const [renderCount, setRenderCount] = useState(0);
    const [animationLoad, setAnimationLoad] = useState(false);
    const [tiles, setTiles] = useState(null);  // Ta wartość odpowiada za poprawne malowanie ekranu - NIE WOLNO JEJ MODYFIKOWAĆ W TRAKCIE GRY !
    const [level, setLevel] = useState(props.level);
    const [score, setScore] = useState(0);
    const [scoreMultiplier, setScoreMultiplier] = useState(1);
    const [highscore, setHighscore] = useState(0);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(null);
    const [foundTiles, setFoundTiles] = useState(0);
    const [confirmValue, setConfirmValue] = useState(null); // przyjmuje wartości true / false  -> wygrałeś / przegrałeś ten poziom ?

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
        setTiles(levels[`lvl${level}`].tiles);
        setConfirmValue(null);
        setRenderCount(0);

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
        iter.passCondition = true;

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
        setConfirmValue('play');
    } 

    //  Render Count pomaga pozbyć się mylących błędów z konsoli - zmienna pilnuje, czy render wykonał się 1 raz. Jeśli ma się on wykonać po raz
    //  kolejny, to nie tworzymy na nowo tabeli z ikonkami (unikamy podmiany ikon na planszy podczas gry)
    if(renderCount < 1) {
        setRandomIcons(fasArray, usedIcons, randomizedIcons, tiles);
        setRenderCount(renderCount + 1);
    }

    useEffect(() => {
        gameboard.current.removeEventListener('click', clickable);
        gameboard.current.addEventListener('click', clickable);
        handleCount = 0;
            // Starting animation in the first place -> 800 animation time + 1400 delay - 4000 ms is a safe delay
    }, [animationLoad]);

    useEffect(() => {

        // ADD STARTING FLAG
        levels[`lvl${level-1}`].onStartFlag(cardsOpened, tiles, foundTiles, iter);

        // Below add some Inverse / Reverse starting animation
        inverseReverse.current = anime.timeline({
            duration: 1400,
            easing: 'easeInOutQuart',
        });

        inverseReverse.current
        .add ({
            targets: '.tile',
            transitionProperty: 'all',
            rotateY: '180deg',
            loop: false,
        })

        .add ({
            targets: '.tile',
            transitionProperty: 'all',
            rotateY: '0deg',
            loop: false,
        }, '+=600')
     
    }, [level]);

    function clickable(e)  {
        if(gameboard.current.dataset.animation !== 'off') {return;}
        if(e.target.classList.contains('tile')) {
            anime({
                targets: e.target,
                duration: 3200,
                transitionProperty: 'all',
                rotateY: 180,
            })
            let trgt = e.target;
            let node = e.target.childNodes;
            for( let i = 0; i < node.length; i++) {
                if((node[i].classList !== undefined) && (node[i].classList.contains('tile-back'))) {
                    keepCardOpen(node, node[i], e, trgt);
                }
            }
        } else {
            //  **Nothing happens**
        }
    }

    useEffect(() => {

        if(levels[`lvl${level-1}`].counter.turns !== null) {
            if(((foundTiles+2) === tiles) && (cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1])) {  // If you win the level...  // SetState is async, so we need to prepend a value right before
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
                setTime((time + 1) - iter.timeAddon);
            }, 1000);
    
            if((foundTiles === tiles) && (levels[`lvl${level-1}`].counter.time - time > 0)) {
                confirmSuccess();
                clearInterval(stopwatch);
    
            }
    
            else if((levels[`lvl${level-1}`].counter.time - time <= 0) && (levels[`lvl${level-1}`].counter.time !== null)) {
                confirmFailure();
                clearInterval(stopwatch);
            }
    
            return () => clearInterval(stopwatch);
        }

    }, [time, level]); // Level because normally we won't count down time - only when those time levels came in, so every time we need to check if new level is the time level


    let arr = [];

    if(arr.length > 0) {
        while(arr.length > 0) {
            arr.pop();
        }
    }

    for(let i=0; i<tiles; i++) {
        arr.push('');
    };

    let allTiles =  arr.map((tile, index) =>  
        <div className={`tile t-${level-1}`} key={index.toString()}><div className={`tile-front tf-${level-1}`}></div> <div className={`tile-back tb-${level-1}`}>{<FontAwesomeIcon icon={`${randomizedIcons[index]}`} className={`fa-icon-${level-1}`}/>}</div></div>
    ); 
    
    function keepCardOpen(allCardNodes, card_back, card, target) {
      
        cardsOpened.push(card_back);

        checkParentOrigin(cardsOpened, target); // Prevents from tile + outer tile border click bug
       
        // Lets do it in advance
        resolveAnimationBugs();

        if(cardsOpened.length > 1) {
            doCardsMatch(cardsOpened);
        }
    }
    
    function checkParentOrigin(cardsOpened, target) {

        if((cardsOpened.length > 1) && (cardsOpened[0].parentNode === cardsOpened[1].parentNode)) {
            handleCount++;
            cardsOpened.pop();
        }
    }

    function doCardsMatch(cardsOpened) {
        // Block the click listener for a brief checkout duration
        gameboard.current.removeEventListener('click', clickable);

        setTimeout(() => {
            isChecking = true;
        }, 200)

        setTimeout(() => {

            if(cardsOpened[1] === undefined) { cardsOpened.pop(); return;}
            if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) { // czy pary się zgadzają? TAK -> usuń je z planszy;  NIE -> odwróć z powrotem

                async function fade() {
                    const a1 = anime({
                        targets: [cardsOpened[0].parentNode, cardsOpened[1].parentNode],
                        duration: 1800,
                        opacity: [1, 0],
                    })

                   await Promise.all([a1]);
                }

                fade().then(() => {
                    cardsOpened[0].parentNode.style = 'visibility: hidden';
                    cardsOpened[1].parentNode.style = 'visibility: hidden';
                
                    resolveAnimationBugs(); // Tab switching issue

                    for(let i=0; i<=1; i++) {
                        cardsOpened.pop();
                    }
                })
                
            } else {
                async function flipBack() {
                    const a1 = anime({
                        targets: [cardsOpened[0].parentNode, cardsOpened[1].parentNode],
                        duration: 2200,
                        rotateY: 0,
                    })

                    Promise.all([a1]);
                }
                
                flipBack().then(() => {

                    resolveAnimationBugs(); // Tab switching issue

                    for(let i=0; i<=1; i++) {
                        cardsOpened.pop();
                    }
                })

            }
    
            isChecking = false;
    
            setTimeout(() => {
                gameboard.current.addEventListener('click', clickable); 
            }, 300); // this timer has to be longer than CSS reverse animation count  - currently it's 700 ms!!!
    
        }, 1400); // this time allows to see two opened tiles for user - he can check whether they match or not
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
        gameboard.current.removeEventListener('click', clickable);
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
                    levels[`lvl${level-1}`].onFirstClickFlag(cardsOpened, tiles, foundTiles, iter);
                }
            }

            else if((handleCheck < 1) && (cardsOpened[1]))  {
                cardsOpened[1].parentNode.classList.add('target', 'target-2');
                if(cardsOpened.length > 1) {
                    levels[`lvl${level-1}`].onSecondClickFlag(cardsOpened, tiles, foundTiles, iter, time);
                    handleCheck++;
                    handleCount = 0;
                }       
            }

            
        }
            
        if((cardsOpened.length > 1) && (!(isChecking))) {

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

    return(
        <div className='all' ref={all}>
            <div className={`background bg-${level-1}`} ref={bg}>
                <div className='game-info'>
                    <GameInfo level={level}  moves={moves} time={time} score={score}  />
                </div>

                {/*  ONLY FOR DEV LEVEL TESTING ->  <div onClick={() => {setLevel(level + 2); confirmSuccess();}}> XMM; </div>*/}
                <div className={`game game-${level-1}`} ref={game}>
                    <div className={`board board-${level-1}`} ref={gameboard} data-animation='off' onClick={handleState} style={{gridTemplateColumns: `repeat(${levels[`lvl${level-1}`].columns}, ${(levels[`lvl${level-1}`].tile_size)/10}vw)`, gridTemplateRows: `repeat(${levels[`lvl${level-1}`].rows}, ${(levels[`lvl${level-1}`].tile_size)/10}vw)`}}>
                        {allTiles}
                    </div>
                </div>
                <div className={`animationContainer aContainer-${level-1}`} ref={animationBox}></div>

                {confirmValue === 'play' && (
                    <div className='confirmation-p'>
                        {<ConfirmPlay value={'play'} level={level} next={changeTileNumber} /> }
                    </div>
                )}
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