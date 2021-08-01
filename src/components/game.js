
import  React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import '../styles/game.css';
import  levels from '../levels.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import GameInfo from './game_info.js';

import { setIcon, fasArray, fabArray } from './landing.js';
import { set } from 'animejs';
import { render } from '@testing-library/react';

library.add(fab, fas);

let usedIcons = [];
let randomizedIcons = [];

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

    const usedIconsCopy = [...usedIcons]; // Same here - creating a copy; do not assign values directly(it works for original ref only) !!

    if(randomizedIcons.length > 0) {
        for(let h=0; h<usedIconsCopy.length; h++) {
            randomizedIcons.pop();
        }
    }

    for(let j=0; j<usedIconsCopy.length; j++) {
        randomizedIcons.push(setIcon(usedIcons));
    }

    //console.log(usedIcons);
    //console.log(usedIconsCopy);
    //console.log(randomizedIcons);
}




//function generateGrid(props) {
//    console.log(props.tiles);
//}

//INIT

//generateGrid(props);

function Game(props) {

    let cardsOpened = [];

    const [renderCount, setRenderCount] = useState(0);
    const [tiles, setTiles] = useState(null);
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(null);
    const [cardsOpen, setCardsOpen] = useState([]);

    //  Render Count pomaga pozbyć się mylących błędów z konsoli - zmienna pilnuje, czy render wykonał się 1 raz. Jeśli ma się on wykonać po raz
    //  kolejny, to nie tworzymy na nowo tabeli z ikonkami (unikamy podmiany ikon na planszy podczas gry)
    if(renderCount < 1) {
        setRandomIcons(fasArray, usedIcons, randomizedIcons, tiles);
        setRenderCount(renderCount + 1);
    }

    const changeTileNumber = () => {

        console.log('level value: '+ level);
        setLevel(level + 1);
        // setTiles(0); // CHANGE TO 10 LATER
        setTiles(levels[`lvl${level}`].tiles);
        setRenderCount(0);

        cleanup();
    }

    const cleanup = () => {
        // Tu będzie rotate wszystkich ikon; w skrócie: przywracamy poziom do stanu pierwotnego i potem tworzymy kolejny poziom
        // Spróbuj jeszcze pomyśleć nad prerobieniem mechanizmu dla arr (L: 124 - 134); być może to wystarczy i ta funkcja okaże się bez sensu
    }

    const gameboard = useRef(null);
    const game = useRef(null);

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

    // THIS ONE MIGHT STILL NOT WORK AS EXPECTED 
    function animateStart() {

        setTimeout(() => {
            document.querySelectorAll('.card').forEach(card => {
                //card.style += 'transform: rotateY(90deg); ';
                //let back = card.querySelector('.card-back');
                let node = card.childNodes;
                node.style = 'transform: rotateY(180deg); border: .3rem solid hsl(51, 88%, 38%);';
                //console.log(node);
                for( let i = 0; i < node.length; i++) {
                    if((node[i].classList !== undefined) && (node[i].classList.contains('card-back'))) {
                        node[i].style = 'transform: rotateY(180deg); border: .3rem solid hsl(51, 88%, 38%);';
                        styleNode(node[i]);
                    }
                }
                //console.log(back);
                //back.style += 'transform: rotateY(90deg); border: .3rem solid hsl(51, 88%, 38%);';
            })
            console.log('finished');
            //board.addEventListener('click', clickable); 
        }, 2000)
    }
    
    
    function styleNode(elem) {
        console.log(elem);
        elem.style += 'transform: rotateY(180deg); border: .3rem solid hsl(51, 88%, 38%);'
    }
    
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

            setMoves(moves + 1);
            //document.querySelector('.turns').textContent = turns;
    
            if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) { // czy pary się zgadzają? TAK -> usuń je z planszy;  NIE -> odwróć z powrotem
                //console.log('equal');
                cardsOpened[0].parentNode.style = 'visibility: hidden';
                cardsOpened[1].parentNode.style = 'visibility: hidden';
    
                //highscore +=10;
                //document.querySelector('.highscore').textContent = highscore;
                // *W tym miejscu robimy animację znikania* -> W tym celu pobierz anime.js na potrzeby tego projektu
                
                // Testy z VANTA.JS
                
            } else {
    
                const temp = 0;
    
                //console.log(`There's no match here`);
                cardsOpened[0].parentNode.style = `transform: rotateY(${temp}deg);`;
                cardsOpened[1].parentNode.style = `transform: rotateY(${temp}deg);`;
    
    
            }
            console.log('time out');
    
            for(let i=0; i<=1; i++) {
                cardsOpened.pop();
            }
    
            console.log(cardsOpened);
    
           // gameboard.current.addEventListener('click', clickable); // game.childNodes[0]
    
        }, 900);
    }
        
    function clickable1(event) {
        //alert('Wygrałeś 1000 zł');
        if(event.target.classList.contains('card')) {
            //console.log('class found');
            event.target.style = 'transform: rotateY(180deg); border: .3rem solid hsl(51, 88%, 38%);';
            console.log(event.target.childNodes);
            let node = event.target.childNodes;
            for( let i = 0; i < node.length; i++) {
                if((node[i].classList !== undefined) && (node[i].classList.contains('card-back'))) {
                    { styleNode(node[i]);
                        keepCardOpen(node, node[i], event);
                    }
                }
            }

        } else {
            console.log (' X ');
        }
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
        <div>
            <div className='background'>
                {/*<GameInfo />*/}
                <div className='game-info'>
                    <div> Level: {levels[`lvl${level-1}`].lv} </div>
                    <div> Turns remaining: {parseInt(levels[`lvl${level-1}`].counter.turns) - parseInt(moves)} </div>
                    <div> Highscore: </div>
                </div>

                <div> {levels[`lvl${level-1}`].lv} poziom zawiera {levels[`lvl${level-1}`].tiles} kafelków - Kolumny: {levels[`lvl${level-1}`].columns}; </div>
                <div className='game' ref={game}>
                    <div className='board' ref={gameboard} onClick={clickable}>
                        {allTiles}
                    </div>
                </div>
                <button className='summary' onClick={changeTileNumber} > Submit</button>
            </div>
        </div>
    )
} 

export default Game;