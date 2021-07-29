
import  React, { useState, useEffect, useRef } from 'react';
import '../styles/game.css';
import  levels from '../levels.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import GameInfo from './game_info.js';

import { setIcon, fasArray, fabArray } from './landing.js';

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
    console.log(fasArrayCopy);
    console.log(fabArrayCopy);
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

    const [tiles, setTiles] = useState(null);
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(null);

    // INIT
    setRandomIcons(fasArray, usedIcons, randomizedIcons, tiles);

    const changeTileNumber = () => {

        console.log('level value: '+ level);
        setLevel(level + 1);
        // setTiles(0); // CHANGE TO 10 LATER
        setTiles(levels[`lvl${level}`].tiles);
    }

    const gameboard = useRef(null);

    useEffect(() => {
        const board = gameboard.current;

        board.addEventListener('click', (e) => {
            if(e.target.classList.contains('tile')) {
                console.log('event fired');
                e.target.style = 'transform: rotateY(180deg)';
                setMoves(moves + 1);
            } else {
                console.log('x');
            }

        })
    }, [])

    console.log(tiles);

    let arr = [];

    if(arr.length > 0) {
        while(arr.length > 0) {
            arr.pop();
        }
    }

    for(let i=0; i<tiles; i++) {
        arr.push('');
    };

    console.log('length: ', arr.length)

    let allTiles =  arr.map((tile, index) => 
        <div className={`tile`} key={index.toString()}><div className='tile-front'></div> <div className='tile-back'>{<FontAwesomeIcon icon={`${randomizedIcons[index]}`} className={`fa-icon`}/>}</div></div>
    );

    useEffect((allTiles) => {
        allTiles = arr.map((tile, index) => 
            <div className={`tile`} key={index.toString()}><div className='tile-front'></div> <div className='tile-back'>{<FontAwesomeIcon icon={`${randomizedIcons[index]}`} className={`fa-icon`}/>}</div></div>
        );
        return allTiles;
    }, [level])

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
                <div className='game'>
                    <div className='board' ref={gameboard}>
                        {allTiles}
                    </div>
                </div>
                <button className='summary' onClick={changeTileNumber} > Submit</button>
            </div>
        </div>
    )
} 

export default Game;