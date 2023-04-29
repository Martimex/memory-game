import React, { } from 'react';
import '../styles/confirm_win.module.css';
//import anime from 'animejs/lib/anime.es.js';
//import anime from "animejs";

function ConfirmWin(props) {

    let winMessage = ['C', 'O', 'N', 'G', 'R', 'A', 'T', 'U', 'L', 'A', 'T', 'I', 'O', 'N', 'S'];

    const finalBtn = React.useRef(null);

    React.useEffect(() => {

        anime({
            targets: '.background-win',
            duration: 48000,
            backgroundImage: [
                'linear-gradient(135deg, hsl(0, 0%, 0%), hsl(0, 0%, 0%),  hsla(276, 30%, 30%, .65), hsl(0, 0%, 0%), hsl(0, 0%, 0%))',
                'linear-gradient(135deg, hsl(0, 0%, 0%), hsl(0, 0%, 0%),  hsla(322, 30%, 30%, .65), hsl(0, 0%, 0%), hsl(0, 0%, 0%))',
                'linear-gradient(135deg, hsl(0, 0%, 0%), hsl(0, 0%, 0%),  hsla(11, 30%, 30%, .65), hsl(0, 0%, 0%), hsl(0, 0%, 0%))',
                'linear-gradient(135deg, hsl(0, 0%, 0%), hsl(0, 0%, 0%),  hsla(64, 30%, 30%, .65), hsl(0, 0%, 0%), hsl(0, 0%, 0%))',
                'linear-gradient(135deg, hsl(0, 0%, 0%), hsl(0, 0%, 0%),  hsla(138, 30%, 30%, .65), hsl(0, 0%, 0%), hsl(0, 0%, 0%))',
                'linear-gradient(135deg, hsl(0, 0%, 0%), hsl(0, 0%, 0%),  hsla(199, 30%, 30%, .65), hsl(0, 0%, 0%), hsl(0, 0%, 0%))',
                'linear-gradient(135deg, hsl(0, 0%, 0%), hsl(0, 0%, 0%),  hsla(225, 30%, 30%, .65), hsl(0, 0%, 0%), hsl(0, 0%, 0%))',
                'linear-gradient(135deg, hsl(0, 0%, 0%), hsl(0, 0%, 0%),  hsla(276, 30%, 30%, .65), hsl(0, 0%, 0%), hsl(0, 0%, 0%))',
            ],
            loop: true,
            direction: 'alternate',
            easing: 'linear',
        })

        async function animateCubes() {
            const a1 = anime({
                targets: '.heading-cube',
                duration: 1400,
                delay: anime.stagger(400, {from: 'center'}),
                translateY: ['-30%', '0%'],
                easing: 'easeOutBounce',
            }).finished;

            await Promise.all([a1]);
        }

        async function showSummaryText() {
            const a2 = anime({
                targets: '.summary-text',
                duration: 1700,
                opacity: [0, 1],
                easing: 'easeInExpo',
                translateY: ['40%', '0%'],
            }).finished;

            const a3 = anime({
                targets: '.stats-table-win',
                duration: 1400,
                borderColor: ['hsla(0, 0%, 0%, 1)', 'hsla(277, 59%, 34%, 0.85)'],
                opacity: [0, 1],
                easing: 'linear',
            }).finished;

            await Promise.all([a2, a3]);
        }

        async function showMovingStats() {

            const a4 = anime({
                targets: '.stats-text',
                duration: 1900,
                delay: anime.stagger(500),
                opacity: [0, 1],
                easing: 'easeOutCubic',
                translateX: ['-30%', '0%'],
            }).finished;

            const a5 = anime({
                targets: '.stats-value',
                duration: 1900,
                delay: anime.stagger(500, {from: 'last'}),
                opacity: [0, 1],
                easing: 'easeInBounce',
                translateY: ['-30%', '0%'],
            }).finished;

            await Promise.all([a4, a5]);
        }

        async function showFinalButton() {
            const a6 = anime({
                targets: '.gg-btn',
                duration: 2400,
                opacity: [0, 1],
                easing: 'easeInCubic',
                scale: ['0%', '130%'],
            }).finished;

            await Promise.all([a6]);
        }

        async function init() {
            finalBtn.current.style.pointerEvents = 'none';
            await animateCubes()
            await showSummaryText()
            await showMovingStats()
            await showFinalButton()
                .then(() => {
                    finalBtn.current.style.pointerEvents = 'auto';
                })
        }
        
        init();

    }, []);



    function animateBtnColorBack() {
        anime({
            targets: '.gg-btn',
            color: 'hsla(276, 40%, 50%, .9)',
            border: '.2rem double',
            duration: 1100,
            easing: 'easeInSine',
        })
    }

    function animateBtnColor() {
        anime({
            targets: '.gg-btn',
            color: 'hsla(0, 0%, 0%, 0.95)',
            border: '.3rem solid',
            duration: 1100,
            easing: 'easeOutSine',
        })
    }

    function fadeAnimation() {
        anime({
            targets: 'body',
            duration: 1000,
            opacity: [0, 1],
            easing: 'linear',
        })
    }

    let cubes =  winMessage.map((message, index) =>  
        <div className='heading-cube' key={index.toString()}> 
            <div className='cube-content'>
                <div className='content-text'>
                    {message}
                </div>
            </div>
        </div>
    );

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
                <button className='gg-btn' ref={finalBtn} onClick={() => {props.start(); fadeAnimation();}} onMouseOver={() => {animateBtnColor();}} onMouseOut={() => {animateBtnColorBack();}}> GGWP </button>
            </div>
        </div>
    );
}

export default ConfirmWin;