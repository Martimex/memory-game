import React, { useRef } from 'react';
import levels from '../levels.js';
import anime from 'animejs/lib/anime.es.js';

function Confirm(props) {

    const table = useRef(null);
    const levelVis = useRef(null);
    const counterVis = useRef(null);
    const counterVis2 = useRef(null); 
    const scoreVis = useRef(null);
    const highscoreVis = useRef(null);

    const confBtn = useRef(null);

    let confirmParams = ['.info-level-val', '.info-counter-moves-val', '.info-counter-time-val', '.info-score-val'];
    let highscoreParam = '.total-score';
    const showParamsDuration = 1000;
    const delayStagger = 500;
    const calcParamsDuration = 1600;
    const showButtonDuration = 1200;

    let sub;
    if(props.turns !== null) {
        sub = (props.score + (props.turns * props.msv));
    } else if(props.time !== null) {
        sub = (props.score + (props.time * props.tsv));
    }

    React.useEffect(() => {

        async function hideButton() {
            const a0 = anime({
                targets: ['.confirmation-btn'],
                duration: 0,
                opacity: [0, 0],
                easing: 'linear',
            }).finished;
            
            const a00 = anime({
                targets: [confirmParams, highscoreParam],
                duration: 0,
                opacity: [0, 0],
                easing: 'linear',
            }).finished;

            await Promise.all([a0, a00]);
        }

        async function showParams() {
            const a1 = anime({
                targets: confirmParams,
                duration: showParamsDuration,
                delay: anime.stagger(delayStagger),
                easing: 'easeInSine',
                opacity: [0, 1],
            }).finished;

            const a01 = anime({
                targets: highscoreParam,
                duration: showParamsDuration,
                opacity: [0, 1],
                round: 1,
                keyframes: [
                    {textContent: (props.highscore), duration: 100, opacity: 0 },
                    {textContent: (props.highscore - sub), duration: 100, opacity: 0.1},
                    {opacity: 1, duration: (showParamsDuration - 200)},
                ],
            })

            await Promise.all([a1, a01]);
        }


        async function calcParams() {

            const a2 = anime({
                targets: ['.total-score'],
                duration: calcParamsDuration,
                easing: 'linear',
                round: 1,
                textContent: [(props.highscore - sub), props.highscore],
            }).finished;
            
            const a3 = anime({
                targets: ['.info-score-val'],
                duration: calcParamsDuration,
                easing: 'linear',
                round: 1,
                textContent: [props.score, 0],
            }).finished;

            let a4;

            if(props.turns !== null) {
                a4 = anime({
                    targets: ['.info-counter-moves-val'],
                    duration: calcParamsDuration,
                    easing: 'linear',
                    round: 1,
                    textContent: [props.turns, 0],
                }).finished;

            } else if(props.time !== null) {
                a4 = anime({
                    targets: ['.info-counter-time-val'],
                    duration: calcParamsDuration,
                    easing: 'linear',
                    round: 1,
                    textContent: [props.time, 0],
                }).finished;
            }

            await Promise.all([a2, a3, a4]);
        }

        async function showButton() {

            const a5 = anime({
                targets: ['.confirmation-btn'],
                duration: showButtonDuration,
                opacity: [0, 1],
                easing: 'linear',
            }).finished;

            await Promise.all([a5]);
        }

        async function init() {
            confBtn.current.style.pointerEvents = 'none';
            await hideButton()
            await showParams()
            await calcParams()
            await showButton()
                .then(() => {
                    confBtn.current.style.pointerEvents = 'auto';
                })
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
                <button className='btn-s confirmation-btn' onClick={props.next} ref={confBtn} > Next level </button>
                :
                <button className='btn-f confirmation-btn' onClick={props.start} ref={confBtn} > Try again !</button>}
            </div>
        </div>
    )

}

export default Confirm;