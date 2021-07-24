
import  React, { useState, useEffect } from 'react';
import '../styles/game.css';
import  levels from '../levels.js';


function Game(props) {

    const [tiles, setTiles] = useState(16);

    const changeTileNumber = (arr) => {
        if(tiles === 16) {
            setTiles(10);
        }

        else {
            setTiles(16);
        }
    }

    console.log(tiles);

    let arr = [];

    for(let i=0; i<tiles; i++) {
        arr.push('');
    };

    console.log('length: ', arr.length)

    const allTiles = arr.map((tile, index) => 
        <div className={`card`}> {index+1}<div className='card-front'></div> <div className='card-back'>{/*<FontAwesomeIcon icon={`${randomizedIcons[index]}`} className={`fa-icon ${code}`}/>*/}</div></div>
    );

    return(
        <div>
            <p className="para"> Here is your game...</p>
            <div> {levels[1].columns}  Poziom zawiera {tiles} kafelków </div>
            <div>
                {allTiles}
            </div>
            <button className='summary' onClick={changeTileNumber} > Submit</button>
        </div>
    )
} 

export default Game;