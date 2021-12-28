import React, { useState, useEffect, useRef } from 'react';

import '../styles/confirm_win.css';

import Game from './game.js';
import levels from '../levels.js';
import anime from 'animejs/lib/anime.es.js';

    anime({
        targets: '.cube-content',
        duration: 1400,
        transform: ['translateY(-40deg)', 'translateY(0deg)'],
        background: 'hsl(60, 60%, 60%)',
        easing: 'easeInQuart',
    })

function ConfirmWin(props) {

    console.log('%c Win confirmed', 'color: #fff; background: #000');
    let winMessage = ['C', 'O', 'N', 'G', 'R', 'A', 'T', 'U', 'L', 'A', 'T', 'I', 'O', 'N', 'S'];
    //let winQuote = 'You have successfully completed the Adventure mode! It has been tough and long journey, but you have made it here! GGWP';
    //let winQuoteArr = [];

    /*for(let i=0; i<winQuote.length; i++) {
        winQuoteArr.push(winQuote[i]);
    }

    console.log(winQuoteArr); */

    let cubes =  winMessage.map((message, index) =>  
        <div className='heading-cube' key={index.toString()}> 
            <div className='cube-content'>
                <div className='content-text'>
                    {message}
                </div>
            </div>
        </div>
    );

    /* let quote = winQuoteArr.map((letter, index) => {
        <div className='q-letter' key={index.toString()}>
            {letter}
        </div>
    }) */

    return (
        <div className='background-win'>
            <div className='main-win'>
                <div className='heading-win'>
                    {cubes}
                </div>
            </div>
            <div className='summary-win'>
                <div className='summary-text'>
                    You have successfully completed the Adventure mode! It has been tough and long journey, but you have made it here! GGWP
                </div>
            </div>
            <div className='stats-table-win'>
                <div className='stats'>
                    <div className='stats-text'> Final score: </div>
                    <div className='stats-value'> {props.highscore} </div>
                </div>
                <div className='stats'>
                    <div className='stats-text'> Levels completed: </div>
                    <div className='stats-value'> {props.level-2} </div>
                </div>
                <div className='stats'>
                    <div className='stats-text'> Points per level (PPL): </div>
                    <div className='stats-value'> {Math.round((props.highscore / (props.level-2)))} </div>
                </div>
                <button className='gg-btn'> GGWP </button>
            </div>
        </div>
    );
}

export default ConfirmWin;