
import  React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import '../styles/game.css';
import  levels from '../levels.js';
import flags from '../flags.js';

import anime from 'animejs/lib/anime.es.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import GameInfo from './game_info.js';
import Confirm from './confirm.js';

import { setIcon, fasArray, fabArray } from './landing.js';
import { set } from 'animejs';
import { render } from '@testing-library/react';

library.add(fab, fas);

let usedIcons = [];
let randomizedIcons = [];

//let highscore = 0; // Your total score count
let iter = {value: 0};  // EXTRA VALUES FOR FLAG FUNCTIONS :
let iter2 = {value: 0};
let strike = {value: 0};


let cardsOpened = [];
let handleCount = 0;   // chroni przed wielokrotnym wywoływaniem funkcji-flag poprzez kliknięcie - dotyczy onFirstClick
let handleCheck = 0;   // chroni przed wielokrotnym wywoływaniem funkcji-flag poprzez kliknięcie - dotyczy onSecondClick

let scoreAddon = 0;

let isChecking = false; // Prevents from using multiple turns during the cards checkout animation
const scorePerPair = 100;  // Don't modify this varible; let it be with this value
const moveScoreValue = 150; // Don't momdify aswell - it calculates score for every remaining move after you've succeded
const timeScoreValue = 50; // Don't momdify aswell - it calculates score for every remaining second after you've succeded, it's calculated twice, so add '/2' value

function clearArrayElems(usedIcons, randomizedIcons, /*fasArrayCopy, fabArrayCopy*/) {
    //for() // Clear all arrays, because every render pushes next elems, making arrays with unlimited elems !!!!!!!!!
    console.log((usedIcons.length === randomizedIcons.length));
    for(let i=0; i<usedIcons.length; i++) {
        usedIcons.pop();
        randomizedIcons.pop();
    }
    return { usedIcons, randomizedIcons };
}

function setRandomIcons(fasArray, usedIcons, randomizedIcons, tiles) {

    //if(randomizedIcons.length > 0) {
        //clearArrayElems(usedIcons, randomizedIcons, /*fasArrayCopy, fabArrayCopy*/);
    //}

    let fasArrayCopy = [...fasArray]; // Create a copy of fasArray; direct assigning (fasArrayCopy = fasArray) would affect fasArray too!
    let fabArrayCopy = [...fabArray]; // Same here ...
    //console.log(fasArrayCopy);
    //console.log(fabArrayCopy);
    for(let i=0; i<(tiles/2); i++) { // Math.ceil(tileCodes.length/2) => it should be actually state value !!!
        let random = Math.floor(Math.random() * fasArrayCopy.length);
        usedIcons.push(fasArrayCopy[random]);
        fasArrayCopy.splice(random, 1);
    }
    let duplicate = usedIcons;
    usedIcons.push(...duplicate);

    //console.log('USED ICONS ARRAY:::::::::')
    //console.log(usedIcons);

    const usedIconsCopy = [...usedIcons]; // Same here - creating a copy; do not assign values directly(it works for original ref only) !!

    //console.log('randomized icon length:  ', randomizedIcons.length)
    //console.log('usedIconsCopy length:  ', usedIconsCopy.length ) // JEST 0, A POWINNO BYĆ 24

    if(randomizedIcons.length > 0) {
        while(randomizedIcons.length > 0) {
            randomizedIcons.pop();
        }
    }

    for(let j=0; j<usedIconsCopy.length; j++) {
        randomizedIcons.push(setIcon(usedIcons));
    }

    //console.log(usedIcons);
    //console.log(usedIconsCopy);
    //console.log(randomizedIcons);
    //console.log('ICONS ARRAY::');
    //console.log(randomizedIcons);
}




//function generateGrid(props) {
//    console.log(props.tiles);
//}

//INIT

//generateGrid(props);

function Game(props) {

    // SET MOVES ODEJMUJE SIĘ TYLKO 1 RAZ (Z JAKIEGOŚ POWODU...) => MOŻE DLATEGO, ŻE REACT NIE WIDZI ŻADNYCH ZMIAN, PRZEZ CO NIE MALUJE EKRANU NA NOWO

    const [renderCount, setRenderCount] = useState(0);
    const [animationLoad, setAnimationLoad] = useState(false);
    const [tiles, setTiles] = useState(null);  // Ta wartość odpowiada za poprawne malowanie ekranu - NIE WOLNO JEJ MODYFIKOWAĆ W TRAKCIE GRY !
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [scoreMultiplier, setScoreMultiplier] = useState(1);
    const [highscore, setHighscore] = useState(0);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(null);
    const [foundTiles, setFoundTiles] = useState(0);
    const [confirmValue, setConfirmValue] = useState(null); // przyjmuje wartości true / false  -> wygrałeś / przegrałeś ten poziom ?
    //const []
    //const [cardsOpen, setCardsOpen] = useState([]);

    //  Render Count pomaga pozbyć się mylących błędów z konsoli - zmienna pilnuje, czy render wykonał się 1 raz. Jeśli ma się on wykonać po raz
    //  kolejny, to nie tworzymy na nowo tabeli z ikonkami (unikamy podmiany ikon na planszy podczas gry)
    if(renderCount < 1) {
        setRandomIcons(fasArray, usedIcons, randomizedIcons, tiles);
        setRenderCount(renderCount + 1);
    }


    //If you lose, the Icon Array has to be cleared out completely - neglecting can cause pushing not paired icons to array
    
    // If you win...
    const changeTileNumber = () => {

        // Clean-up function whenever you finish a level
        // First, clean up all State variables

        console.log('level value: '+ level);
        //setAnimationLoad(false);
        setLevel(level + 1);
        setFoundTiles(0);
        setScore(0);
        setScoreMultiplier(1);
        setMoves(0);
        setTime(0); //setTime(0);
        setTiles(levels[`lvl${level}`].tiles);
        setConfirmValue(null);

        scoreAddon = 0;
        handleCount = 0;
        handleCheck = 0;

        iter.value = 0;
        iter2.value = 0;
        strike.value = 0;

        cleanup();
    }

    const cleanup = () => {
        // Tu będzie rotate wszystkich ikon; w skrócie: przywracamy poziom do stanu pierwotnego i potem tworzymy kolejny poziom
        // Spróbuj jeszcze pomyśleć nad prerobieniem mechanizmu dla arr (L: 124 - 134); być może to wystarczy i ta funkcja okaże się bez sensu

        // Then proceed with new tiles, grid, icons...

        // Hide win confirmation table
        //setConfirmValue(null);
        
        console.log(animationBox.current.childNodes.length);

        if(animationBox.current.childNodes.length > 0) {
            for(let nodeCount = 0; nodeCount !== animationBox.current.childNodes.length; nodeCount = nodeCount) {
                animationBox.current.childNodes[nodeCount].remove();
            }
    
        }

        console.log(animationBox.current.childNodes);

        // Create new grid based on level values
       // gameboard.current.style = `gridTemplateColumns: repeat(${levels[`lvl${level}`].columns}, ${levels[`lvl${level}`].tile_size}vw )`;
       // gameboard.current.style = `gridTempleteRows: repeat(${levels[`lvl${level}`].rows}, 3vw )`;
        //gameboard.current.style = `background: green`;

        console.log('child Nodes: ')
        console.log(gameboard.current.childNodes);

        for(let x=0; x<gameboard.current.childNodes.length; x++) {
            gameboard.current.childNodes[x].style = `visibility: visible`;
        }

        setRenderCount(0);
    }

    const all = useRef(null);
    const bg = useRef(null);
    const gameboard = useRef(null);
    const game = useRef(null);
    const animationBox = useRef(null);
    const inverseReverse = useRef(null); // Starting animation

    useEffect(() => {
        gameboard.current.removeEventListener('click', clickable);
        gameboard.current.addEventListener('click', clickable);
        handleCount = 0;
            // Starting animation in the first place -> 800 animation time + 1400 delay - 4000 ms is a safe delay - at worse user can waste 1 - 2 turns
    }, [setAnimationLoad]); // leave this dependency array as it is -> [] */

    useEffect(() => {

        // ADD STARTING FLAG
            levels[`lvl${level-1}`].onStartFlag(cardsOpened, tiles, foundTiles, iter); // it works !!

            // MAYBE DURING ANIMATION TIME ADD SOME INVINCIBLE LAYER, WHICH PREVENTS FROM CLICKING DURING THE ANIMATION PROCESS ???
            //gameboard.current.removeEventListener('click', clickable);
         // Below add some Inverse / Reverse starting animation

            inverseReverse.current = anime.timeline({
                duration: 1400,
                easing: 'easeInOutQuart',
            });
    
            inverseReverse.current
            .add ({
                targets: '.tile',
                //transformStyle: 'preserve-3d',
                //transitionTimingFunction: 'linear',
                transitionProperty: 'all',
                //backgroundColor: '#4ba',
                rotateY: '180deg',
                loop: false,
            })
    
            .add ({
                //delay: 1400, // it prevents these two animations from running at the same time - they should work separately
                targets: '.tile',
                //transformStyle: 'preserve-3d',
                //transitionTimingFunction: 'linear',
                transitionProperty: 'all',
                //backgroundColor: '#4ba',
                rotateY: '0deg',
                loop: false,
            }, '+=600')

            inverseReverse.current.finished.then(() => { console.log('timeline accpeted')});

        /* setTimeout(() => {
            setAnimationLoad(true);
        }, 5000); */
            
    }, [level]);

    function clickable(e)  {
        console.log(gameboard.current.dataset.animation);
        if(gameboard.current.dataset.animation !== 'off') {return;}
        console.log(e.target);
        if(e.target.classList.contains('tile')) {
            //e.target.style = 'transform: rotateY(180deg);'; // border: .3rem solid hsl(51, 88%, 38%);
            anime({
                targets: e.target,
                duration: 3200,
                //transformStyle: 'preserve-3d',
                //transitionTimingFunction: 'linear',
                transitionProperty: 'all',
                rotateY: 180,
            })
            //console.log(e.target.childNodes);
            let trgt = e.target;
            let node = e.target.childNodes;
            for( let i = 0; i < node.length; i++) {
                if((node[i].classList !== undefined) && (node[i].classList.contains('tile-back'))) {
                    console.log('indeed')
                    //styleNode(node[i]);
                    keepCardOpen(node, node[i], e, trgt);

                }
            }
            //setMoves(moves + 1);
        } else {
            console.log('nope');
        }
    }

    //console.log(tiles);

    useEffect(() => {

        if(levels[`lvl${level-1}`].counter.turns !== null) {
            if((foundTiles+2) === tiles) {  // If you win the level...  // SetState is async, so we need to prepend a value right before
                console.log('moves win');
                confirmSuccess();
            }

            else if((parseInt(levels[`lvl${level-1}`].counter.turns) - moves) <= 0) {  // SetState is async, so we need to prepend a value right before
                confirmFailure();
            } 
        } 

    }, [moves]);


    useEffect(() => {

        // ISSUE #1 : COUNTER IS BEING INVOKED DURING THE ANIMATION, CAUSING TIME TO RUN WHILE USER CAN'T CLICK ANYTHING (3 SECONDS)
        //            IT'S MINOR ISSUE THO, BUT STILL SOMETHING THAT CAN BE MADE BETTER

        // ISSUE #2 : BUG -> IF U CLICK AT VERY LAST SECOND AT LAST TWO TILES, THEN FAILURE SCREEN SHOWS UP, IMMADIETALY INTERRUPTED
        //  (RESOLVED)       BY WINNING SCREEN. ONE OF THEM SHOULD SHOW, NOT ONE AFTER ANOTHER. RESOLVING THIS MIGHT BE CRUCIAL SINCE
        //                   LOSING AND WINNING ANIMATIONS MIGHT BE INVOKED AT THE SAME TIME, CAUSING VISUAL BUGS...

        if(levels[`lvl${level-1}`].counter.time !== null) {
            const stopwatch = setInterval(() => {
                setTime(time + 1);
            }, 1000);
    
            //if(renderCount < 1) {return () => clearInterval(stopwatch);};  // Prevents from causing error on very first render - line below causes it
    
            if((foundTiles === tiles) && (levels[`lvl${level-1}`].counter.time - time > 0)) {
                console.log('Time game won')
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

    //console.log('length: ', arr.length)

    let allTiles =  arr.map((tile, index) =>  
        <div className={`tile t-${level-1}`} key={index.toString()}><div className={`tile-front tf-${level-1}`}></div> <div className={`tile-back tb-${level-1}`}>{<FontAwesomeIcon icon={`${randomizedIcons[index]}`} className={`fa-icon-${level-1}`}/>}</div></div>
    ); 

    /* function createAllTiles(randomizedIcons) {
        let allTiles = arr.map((tile, index) => 
            <div className={`tile`} key={index.toString()}><div className='tile-front'></div> <div className='tile-back'>{<FontAwesomeIcon icon={`${randomizedIcons[index]}`} className={`fa-icon`}/>}</div></div>
        );

        return allTiles;
    } */  
    
    function keepCardOpen(allCardNodes, card_back, card, target) {
      
        console.log(cardsOpened.length);
        cardsOpened.push(card_back);

      console.log(cardsOpened.length);
      //target.classList.add('target');
      // Czy user wybrał już 2 karty ?

       checkParentOrigin(cardsOpened, target); // Prevents from tile + outer tile border click bug
        console.log(card)
       
      if(cardsOpened.length > 1) {
            //levels[`lvl${level-1}`].onSecondClickFlag();
            doCardsMatch(cardsOpened);
       }
    }
    
    function checkParentOrigin(cardsOpened, target) {

        if((cardsOpened.length > 1) && (cardsOpened[0].parentNode === cardsOpened[1].parentNode)) {
            handleCount++;
            cardsOpened.pop();
        }
    }
    
    console.log(gameboard);

    function doCardsMatch(cardsOpened) {
        // Block the click listener for a brief checkout duration
        gameboard.current.removeEventListener('click', clickable);  //game.childNodes[0]
        //console.log(cardsOpened.length);
        //console.log(cardsOpened[0]);
        //console.log(cardsOpened[1]);
        setTimeout(() => {
            isChecking = true;
        }, 200)
        console.log('checking...');

        setTimeout(() => {

            if(cardsOpened[1] === undefined) { cardsOpened.pop(); return;} // prevents from time bug
            //isChecking = false;
            if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) { // czy pary się zgadzają? TAK -> usuń je z planszy;  NIE -> odwróć z powrotem

                async function fade() {
                    const a1 = anime({
                        targets: [cardsOpened[0].parentNode, cardsOpened[1].parentNode],
                        duration: 1800,
                        opacity: [1, 0],
                    })

                    Promise.all([a1]);
                }

                fade().then(() => {
                    setTimeout(() => {
                        cardsOpened[0].parentNode.style = 'visibility: hidden';
                        cardsOpened[1].parentNode.style = 'visibility: hidden';
                
                        for(let i=0; i<=1; i++) {
                            cardsOpened.pop();
                        }
                    })
                })

                // Testy z VANTA.JS
                
            } else {
                const temp = 0;
                async function flipBack() {
                    const a1 = anime({
                        targets: [cardsOpened[0].parentNode, cardsOpened[1].parentNode],
                        duration: 2200,
                        rotateY: 0,
                    })

                    Promise.all([a1]);
                }
                
                flipBack().then(() => {
                    for(let i=0; i<=1; i++) {
                        cardsOpened.pop();
                    }
                })
                
                console.log({moves});
            }
            console.log('time out');
    
            isChecking = false;
    
            setTimeout(() => {
                gameboard.current.addEventListener('click', clickable); // game.childNodes[0]
            }, 300); // this timer has to be longer than CSS reverse animation count  - currently it's 700 ms!!!
    
        }, 1400); // this time allows to see two opend tiles for user - he can check whether they match or not
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
        
        
        console.log('SUCCESS');
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

        console.log('lost confirmed');
        

        // IT IS NOT WORKING

        gameboard.current.removeEventListener('click', clickable);

        // IT CAUSES NEW BUGS

       /* gameboard.current = anime({
            targets: ['.tile'],
            duration: 500,
            display: 'none',
            opacity: [1, 0],
            loop: false,
        }); */

        // IT IS NOT REMOVING ALL TILES - 2 LASTLY CHOSEN REMAINS STILL ON THE BOARD
      /*   setTi2meout(() => {
            for(let x=0; x<gameboard.current.childNodes.length; x++) {
                gameboard.current.childNodes[x].style = `display: none`;
            }
        }, 800); // WORKS WITH A PROPER TIMEOUT VALUE */

    }

    function handleState() {

        // PREVENT FIRSTCLICK AND SECONDCLICK MULTIPLE TIMES INVOKING WHEN USER KEEPS PRESSING THE SAME TILE / SOME TILES MULTIPLE TIMES !!!!
        console.log('isChecking: ' +isChecking)
        console.log(`%c handleCount is  ${handleCount}`, 'background: #d49; color: #70eb4a');
        if(isChecking) {return;}

        if(gameboard.current.dataset.animation === 'off') {

            console.log('%c handleState invoked...', 'background: #46b; color: #882')
            console.log(cardsOpened.length);

            if((handleCount < 1) && (cardsOpened[0])) {
                cardsOpened[0].parentNode.classList.add('target', 'target-1');
                if(cardsOpened.length === 1) {
                    handleCheck = 0;
                    handleCount++;
                    levels[`lvl${level-1}`].onFirstClickFlag(cardsOpened, tiles, foundTiles, iter);
                    console.log('final length: '+cardsOpened.length);
                }
            }

            else if((handleCheck < 1) && (cardsOpened[1]))  {
                cardsOpened[1].parentNode.classList.add('target', 'target-2');
                if(cardsOpened.length > 1) {
                    levels[`lvl${level-1}`].onSecondClickFlag(cardsOpened, tiles, foundTiles, iter);
                    console.log('final length: '+cardsOpened.length);
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

                console.log(cardsOpened);
                //isChecking = false;
                if(cardsOpened.length <= 1) {return;} 

                if(cardsOpened[0].parentNode === cardsOpened[1].parentNode) {
                    console.log('conditions passed')
                    return;
                } 

                if(levels[`lvl${level-1}`].counter.turns !== null) {
                    setMoves(moves + 1);
                }

                if((cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1])) {
                    setFoundTiles(foundTiles + 2);
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
            // Please do find a better solution than this....
            // useEffect for below lines of code
            handleCount = 0;
        } 
            //handleCount = 0;
        // block the scope and prevents from fast-clicking turn decreasing behaviour, please keep 1200 ms, value OK, 
               //please check this since it causes bugs - when u delay second click, state does not update
        //handleCount = 0;
    }
    /* useLayoutEffect(() => {

        console.log('useLayoutEffect');

        //setRandomIcons(fasArray, usedIcons, randomizedIcons, tiles);
        //createAllTiles(randomizedIcons);

       allTiles = arr.map((tile, index) => 
            <div className={`tile`} key={index.toString()}><div className='tile-front'></div> <div className='tile-back'>{<FontAwesomeIcon icon={`${randomizedIcons[index]}`} className={`fa-icon`}/>}</div></div>
        );

       const board = gameboard.current;
       //let div = <p> Hi there </p>
       //board.appendChild(div);
    }, [level]) */

    //console.log(allTiles);

   /* if(allTiles.length <= 0) {
        console.log('null 123');
        return null;
    }
    */

    return(
        <div className='all' ref={all}>
            <div className={`background bg-${level-1}`} ref={bg}>
                {/*<GameInfo />*/}
                <div className='game-info'>
                    <GameInfo level={level}  moves={moves} time={time} score={score}  />
                </div>

                <div onClick={() => {setLevel(level + 9); confirmSuccess();}}> {levels[`lvl${level-1}`].lv} poziom zawiera {levels[`lvl${level-1}`].tiles} kafelków - Kolumny: {levels[`lvl${level-1}`].columns}; </div>
                <div className={`game game-${level-1}`} ref={game}>
               
                    <div className={`board board-${level-1}`} ref={gameboard} data-animation='off' onClick={handleState} style={{gridTemplateColumns: `repeat(${levels[`lvl${level-1}`].columns}, ${(levels[`lvl${level-1}`].tile_size)/10}vw)`, gridTemplateRows: `repeat(${levels[`lvl${level-1}`].rows}, ${(levels[`lvl${level-1}`].tile_size)/10}vw)`}}>
                        {allTiles}
                    </div>
                </div>
                <div className={`animationContainer aContainer-${level-1}`} ref={animationBox}></div>

                {level === 1 && (
                    <button className='summary' onClick={changeTileNumber} > Submit</button>
                )}
                {confirmValue === true && (
                    <div className='confirmation-s'>
                        <Confirm value={true} level={level} score={score} highscore={highscore} turns={((levels[`lvl${level-1}`].counter.turns) - moves)} time={(levels[`lvl${level-1}`].counter.time) - time} next={changeTileNumber}/>
                    </div>
                )}
                {confirmValue === false && (
                    <div className='confirmation-f'>
                        <Confirm value={false} level={level} score={score} highscore={highscore} turns={((levels[`lvl${level-1}`].counter.turns) - moves)} time={(levels[`lvl${level-1}`].counter.time) - time} start={props.start}/>,
                    </div>
                )}

            </div>
        </div>
    )
} 

export default Game;
//export { tiles };
//export gameboard;