
import  React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import '../styles/game.css';
import  levels from '../levels.js';

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

let cardsOpened = [];

let iter = 0; // Prevents from using multiple turns during the cards checkout animation

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
    const [tiles, setTiles] = useState(null);  // Ta wartość odpowiada za poprawne malowanie ekranu - NIE WOLNO JEJ MODYFIKOWAĆ W TRAKCIE GRY !
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
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
        setLevel(level + 1);
        setFoundTiles(0);
        setMoves(0);
        setTime(0); //setTime(0);
        setTiles(levels[`lvl${level}`].tiles);

        cleanup();
    }

    const cleanup = () => {
        // Tu będzie rotate wszystkich ikon; w skrócie: przywracamy poziom do stanu pierwotnego i potem tworzymy kolejny poziom
        // Spróbuj jeszcze pomyśleć nad prerobieniem mechanizmu dla arr (L: 124 - 134); być może to wystarczy i ta funkcja okaże się bez sensu

        // Then proceed with new tiles, grid, icons...

        // Hide win confirmation table
        setConfirmValue(null);

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
    const inverseReverse = useRef(null); // Starting animation

    useEffect(() => {
        setTimeout(() => {
            gameboard.current.removeEventListener('click', clickable);
            gameboard.current.addEventListener('click', clickable);
        }, 4000);  // Starting animation in the first place -> 800 animation time + 1400 delay - 4000 ms is a safe delay - at worse user can waste 1 - 2 turns
    }, []);

    useEffect(() => {
         // Below add some Inverse / Reverse starting animation
         inverseReverse.current = anime.timeline({
            duration: 800,
            easing: 'easeInOutQuart',
        });

        inverseReverse.current
        .add ({
            targets: '.tile',
            //backgroundColor: '#4ba',
            rotateY: '180deg',
            loop: false,
        })

        .add ({
            delay: 1400, // it prevents these two animations from running at the same time - they should work separately
            targets: '.tile',
            //backgroundColor: '#4ba',
            rotateY: '0deg',
            loop: false,
        })
    }, [level]);

    const clickable = (e) => {
        if(e.target.classList.contains('tile')) {
            e.target.style = 'transform: rotateY(180deg);'; // border: .3rem solid hsl(51, 88%, 38%);
            //console.log(e.target.childNodes);
            let node = e.target.childNodes;
            for( let i = 0; i < node.length; i++) {
                if((node[i].classList !== undefined) && (node[i].classList.contains('tile-back'))) {
                    //console.log('indeed')
                    //styleNode(node[i]);
                    keepCardOpen(node, node[i], e);

                }
            }
            //setMoves(moves + 1);
        } else {
            console.log('nope');
        }
    }

    //console.log(tiles);

    useEffect(() => {

        // ISSUE #1 : COUNTER IS BEING INVOKED DURING THE ANIMATION, CAUSING TIME TO RUN WHILE USER CAN'T CLICK ANYTHING (3 SECONDS)
        //            IT'S MINOR ISSUE THO, BUT STILL SOMETHING THAT CAN BE MADE BETTER

        // ISSUE #2 : BUG -> IF U CLICK AT VERY LAST SECOND AT LAST TWO TILES, THEN FAILURE SCREEN SHOWS UP, IMMADIETALY INTERRUPTED
        //                   BY WINNING SCREEN. ONE OF THEM SHOULD SHOW, NOT ONE AFTER ANOTHER. RESOLVING THIS MIGHT BE CRUCIAL SINCE
        //                   LOSING AND WINNING ANIMATIONS MIGHT BE INVOKED AT THE SAME TIME, CAUSING VISUAL BUGS...

        const stopwatch = setInterval(() => {
            setTime(time + 1);
        }, 1000);

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
    }, [time]);


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
        <div className={`tile`} key={index.toString()}><div className='tile-front'></div> <div className='tile-back'>{<FontAwesomeIcon icon={`${randomizedIcons[index]}`} className={`fa-icon`}/>}</div></div>
    ); 

    /* function createAllTiles(randomizedIcons) {
        let allTiles = arr.map((tile, index) => 
            <div className={`tile`} key={index.toString()}><div className='tile-front'></div> <div className='tile-back'>{<FontAwesomeIcon icon={`${randomizedIcons[index]}`} className={`fa-icon`}/>}</div></div>
        );

        return allTiles;
    } */  
    
    function keepCardOpen(allCardNodes, card_back, card) {
      cardsOpened.push(card_back);

      console.log(cardsOpened);

      // Czy user wybrał już 2 karty ?
    
       checkParentOrigin(cardsOpened); // Prevents from tile + outer tile border click bug
    
      if(cardsOpened.length > 1) {
          doCardsMatch(cardsOpened);
      }
    }
    
    function checkParentOrigin(cardsOpened) {

        if((cardsOpened.length > 1) && (cardsOpened[0].parentNode === cardsOpened[1].parentNode)) {
            cardsOpened.pop();
        }
    }
    
    console.log(gameboard);

    function doCardsMatch(cardsOpened) {
        // Block the click listener for a brief checkout duration
        gameboard.current.removeEventListener('click', clickable);  //game.childNodes[0]
        console.log(cardsOpened[0]);
        console.log(cardsOpened[1]);
    
        console.log('checking...');
        setTimeout(() => {
    
            //console.log(cardsOpened[0].parentNode);
            //console.log(cardsOpened[1]);
    
            //console.log(cardsOpened[0].childNodes[0].classList[1])
            //console.log(cardsOpened[1].childNodes[0].classList[1]);

            //setMoves(moves + 1);
            //document.querySelector('.turns').textContent = turns;
    
            if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) { // czy pary się zgadzają? TAK -> usuń je z planszy;  NIE -> odwróć z powrotem
                //console.log('equal');
                cardsOpened[0].parentNode.style = 'visibility: hidden';
                cardsOpened[1].parentNode.style = 'visibility: hidden';
    
                //highscore +=10;
                //document.querySelector('.highscore').textContent = highscore;

                // *W tym miejscu robimy animację znikania* -> W tym celu pobierz anime.js na potrzeby tego projektu
                
                console.log({foundTiles});
                console.log({tiles});

                if({foundTiles} === {tiles}) {  // If you win the level...
                    confirmSuccess();
                }

                // Testy z VANTA.JS
                
            } else {
    
                const temp = 0;
    
                //console.log(`There's no match here`);
                cardsOpened[0].parentNode.style = `transform: rotateY(${temp}deg);`;
                cardsOpened[1].parentNode.style = `transform: rotateY(${temp}deg);`;
    
                console.log({moves});
                if((parseInt(levels[`lvl${level-1}`].counter.turns) - {moves}) <= 0) {
                    confirmFailure();
                }
            }
            console.log('time out');
    
            for(let i=0; i<=1; i++) {
                cardsOpened.pop();
            }
    
            console.log(cardsOpened);
    
            setTimeout(() => {
                gameboard.current.addEventListener('click', clickable); // game.childNodes[0]
            }, 800); // this timer has to be longer than CSS reverse animation count  - currently it's 700 ms!!!
    
        }, 900);
    }
        
    function confirmSuccess() {
        setConfirmValue(true);
        console.log('SUCCESS');
    }

    function confirmFailure() {
        console.log('lost confirmed');
        setConfirmValue(false);

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
      /*   setTimeout(() => {
            for(let x=0; x<gameboard.current.childNodes.length; x++) {
                gameboard.current.childNodes[x].style = `display: none`;
            }
        }, 800); // WORKS WITH A PROPER TIMEOUT VALUE */

    }

    function handleState() {
        console.log('handleState fired');

        //if(levels[`lvl${level-1}`].counter.turns === null) { return; }
        //if(iter > 0) { return; }

        iter++;
        setTimeout(() => {

        
            if(cardsOpened.length > 1) {
                if(cardsOpened[0].parentNode === cardsOpened[1].parentNode) {
                    console.log('conditions passed')
                    return;
                }

                
                setMoves(moves + 1);
                // Block the scope and prevents from fast-clicking turn decreasing behaviour
                // Please do find a better solution than this....


                if((cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1])) {
                    setFoundTiles(foundTiles + 2);
                    if((foundTiles+2) === tiles) {  // If you win the level...  // SetState is async, so we need to prepend a value right before
                        confirmSuccess();
                        return;
                    }

                }

                if((parseInt(levels[`lvl${level-1}`].counter.turns) - (moves + 1)) <= 0) {  // SetState is async, so we need to prepend a value right before
                    confirmFailure();
                }
            }    
        }, 800)
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
            <div className='background' ref={bg}>
                {/*<GameInfo />*/}
                <div className='game-info'>
                    <GameInfo level={level}  moves={moves} time={time} score={score}  />
                </div>

                {/*<div> {levels[`lvl${level-1}`].lv} poziom zawiera {levels[`lvl${level-1}`].tiles} kafelków - Kolumny: {levels[`lvl${level-1}`].columns}; </div>*/}
                <div className='game' ref={game}>
               
                    <div className='board' ref={gameboard} onClick={handleState} style={{gridTemplateColumns: `repeat(${levels[`lvl${level-1}`].columns}, ${levels[`lvl${level-1}`].tile_size}vw)`, gridTemplateRows: `repeat(${levels[`lvl${level-1}`].rows}, ${levels[`lvl${level-1}`].tile_size}vw)`}}>
                        {allTiles}
                    </div>
                </div>
                {level === 1 && (
                    <button className='summary' onClick={changeTileNumber} > Submit</button>
                )}
                {confirmValue === true && (
                    <div className='confirmation-s'>
                        <Confirm value={true} level={level} turns={((levels[`lvl${level-1}`].counter.turns) - moves)} time={(levels[`lvl${level-1}`].counter.time) - time} next={changeTileNumber}/>
                    </div>
                )}
                {confirmValue === false && (
                    <div className='confirmation-f'>
                        <Confirm value={false} level={level} turns={((levels[`lvl${level-1}`].counter.turns) - moves)} time={(levels[`lvl${level-1}`].counter.time) - time} start={props.start}/>,
                    </div>
                )}

            </div>
        </div>
    )
} 

export default Game;