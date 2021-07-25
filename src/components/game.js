
import  React, { useState, useEffect, useRef } from 'react';
import '../styles/game.css';
import  levels from '../levels.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { setIcon, fasArray, fabArray } from './landing.js';

library.add(fab, fas);

let usedIcons = [];
let randomizedIcons = [];


function clearArrayElems(usedIcons, randomizedIcons, fasArrayCopy, fabArrayCopy) {
    //for() // Clear all arrays, because every render pushes next elems, making arrays with unlimited elems !!!!!!!!!
}

function setRandomIcons(fasArray, usedIcons, randomizedIcons, tiles) {

    if(randomizedIcons.length > 0) {
        clearArrayElems(usedIcons, randomizedIcons, fasArrayCopy, fabArrayCopy);
    }

    let fasArrayCopy = [...fasArray]; // Create a copy of fasArray; direct assigning (fasArrayCopy = fasArray) would affect fasArray too!
    let fabArrayCopy = [...fabArray]; // Same here ...
    for(let i=0; i<(tiles/2); i++) { // Math.ceil(tileCodes.length/2) => it should be actually state value !!!
        let random = Math.floor(Math.random() * fasArrayCopy.length);
        usedIcons.push(fasArrayCopy[random]);
        fasArrayCopy.splice(random, 1);
    }
    let duplicate = usedIcons;
    usedIcons.push(...duplicate);

    const usedIconsCopy = [...usedIcons]; // Same here - creating a copy; do not assign values directly(it works for original ref only) !!

    for(let j=0; j<usedIconsCopy.length; j++) {
        randomizedIcons.push(setIcon(usedIcons));
    }

    console.log(randomizedIcons);
}




//function generateGrid(props) {
//    console.log(props.tiles);
//}

//INIT

//generateGrid(props);

function Game(props) {

    const [tiles, setTiles] = useState(16);
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(12);
    const [time, setTime] = useState(null);

    // INIT
    setRandomIcons(fasArray, usedIcons, randomizedIcons, tiles);

    const changeTileNumber = (arr) => {
        if(tiles === 16) {
            setTiles(0); // CHANGE TO 10 LATER
        }

        else {
            setTiles(16);
        }
    }

    const gameboard = useRef(null);

    useEffect(() => {
        const board = gameboard.current;

        board.addEventListener('click', (e) => {
            if(e.target.classList.contains('tile')) {
                console.log('event fired');
                e.target.style = 'transform: rotateY(180deg)';
            } else {
                console.log('x');
            }

        })
    })

    console.log(tiles);

    let arr = [];

    for(let i=0; i<tiles; i++) {
        arr.push('');
    };

    console.log('length: ', arr.length)

    const allTiles = arr.map((tile, index) => 
        <div className={`tile`} key={index.toString()}><div className='tile-front'></div> <div className='tile-back'>{<FontAwesomeIcon icon={`${randomizedIcons[index]}`} className={`fa-icon`}/>}</div></div>
    );

    return(
        <div>
            <div className='background'>
                <p className="para"> Here is your game...</p>
                <div> {levels[1].columns}  Poziom zawiera {tiles} kafelków </div>
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