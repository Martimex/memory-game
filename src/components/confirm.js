import React, { useState, useEffect, useRef } from 'react';
import Game from './game.js';
import levels from '../levels.js';
import anime from 'animejs/lib/anime.es.js';

function Confirm(props) {

    console.log(props.value);

    const table = useRef(null);
    const levelVis = useRef(null);
    const counterVis = useRef(null);
    const counterVis2 = useRef(null); 
    const scoreVis = useRef(null);
    const highscoreVis = useRef(null);


    /*highscoreVis.current= anime({
        targets: '.total-score',
        duration: 2400,
        opacity: [0, 1],
        easing: 'linear',
    }) */


    React.useEffect(() => {

        async function showParams() {
            const a1 = table.current;

            table.current = anime({
                targets: ['.info-level-val', '.info-counter-moves-val', '.info-counter-time-val', '.info-score-val', '.total-score'],
                duration: 1200,
                delay: anime.stagger(800),
                easing: 'easeInSine',
                opacity: [0, 1],
            })
            await Promise.all([a1]);
        }

        async function hideParams() {
            const a2 = highscoreVis.current;

            highscoreVis.current = anime({
                targets: ['.total-score'],
                duration: 2000,
                delay: 2000,
                easing: 'linear',
                round: 1,
                textContent: [(props.highscore - props.score), props.highscore],
            })

            const a3 = scoreVis.current; 
            
            scoreVis.current = anime({
                targets: ['.info-score-val'],
                duration: 2000,
                delay: 2000,
                easing: 'linear',
                round: 1,
                textContent: [props.score, 0],
            })

            await Promise.all([a2, a3]);
        }

        async function init() {
            await showParams()
            await hideParams()
        }

        init();
    }, [])

    return (
        <div className='confirmation-bg'>
            <div className={(props.value) ? 'confirmation-table-s' : 'confirmation-table-f'} ref={table} >
                <div className="confirmation-title">
                    <div className={(props.value) ? 'title-s' : 'title-f' }> {(props.value) ? 'Success !' : 'Failure !' } </div>
                </div>
                <div className={(props.value) ? 'info-s' : 'info-f' }>
                    <div className='info-level'> LV: </div>
                    <div className='info-level-val' ref={levelVis}> {props.level-1}</div>
                </div>
                <div className={(props.value) ? 'info-s' : 'info-f' }>
                    <div className='info-counter'>Counter: </div>
                    {((levels[`lvl${props.level-1}`].counter.turns) !== null) && <div className='info-counter-moves-val' ref={counterVis}> {props.turns} turns</div>}
                    {((levels[`lvl${props.level-1}`].counter.time)  !==null) && <div className='info-counter-time-val' ref={counterVis2}> {props.time} s </div>}
                </div>
                <div className={(props.value) ? 'info-s' : 'info-f' }>
                    <div className='info-score'> Score: </div>
                    <div className='info-score-val' ref={scoreVis}> {props.score} </div>
                </div>

                <div className={(props.value) ? 'highscore-s' : 'highscore-f' }> Highscore: 
                    <div className='total-score' ref={highscoreVis}> {props.highscore} </div>
                </div>
                {(props.value) ?
                <button className='btn-s' onClick={props.next} > Next level </button>
                :
                <button className='btn-f' onClick={props.start} > Try again !</button>}
            </div>
        </div>
    )

}

export default Confirm;