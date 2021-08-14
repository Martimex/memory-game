import React, { useState, useEffect, useRef } from 'react';
import Game from './game.js';
import levels from '../levels.js';

function Confirm(props) {

    console.log(props.value);

    return (
        <div className='confirmation-bg'>
            <div className={(props.value) ? 'confirmation-table-s' : 'confirmation-table-f'}>
                <div className="confirmation-title">
                    <div className={(props.value) ? 'title-s' : 'title-f' }> {(props.value) ? 'Success !' : 'Failure !' } </div>
                </div>
                <div className={(props.value) ? 'info-s' : 'info-f' }>
                    <div className='info-level'> LV: </div>
                    <div className='info-level-val'> {props.level-1}</div>
                </div>
                <div className={(props.value) ? 'info-s' : 'info-f' }>
                    <div className='info-counter'>Counter: </div>
                    {((levels[`lvl${props.level-1}`].counter.turns) !== null) && <div className='info-counter-moves-val'> {props.turns} turns</div>}
                    {((levels[`lvl${props.level-1}`].counter.time)  !==null) && <div className='info-counter-time-val'> {props.time} s </div>}
                </div>
                <div className={(props.value) ? 'info-s' : 'info-f' }>
                    <div className='info-score'> Score: </div>
                    <div className='info-score-val'> 9 </div>
                </div>

                <div className={(props.value) ? 'highscore-s' : 'highscore-f' }> Highscore: 
                    <div className='total-score'> 14 </div>
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