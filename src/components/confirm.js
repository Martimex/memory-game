import React, { useState, useEffect, useRef } from 'react';
import Game from './game.js';

function Confirm(props) {

    console.log(props.value);

    return (
        <div>
            <div className="confirmation-title">
                <div className={(props.value) ? 'title-s' : 'title-f' }> {(props.value) ? 'Success !' : 'Failure !' } </div>
            </div>
            <div className={(props.value) ? 'info-s' : 'info-f' }>
                <div className='info-level'> LV: </div>
                <div className='info-level-val'> {props.level-1}</div>
            </div>
            <div className={(props.value) ? 'info-s' : 'info-f' }>
                <div className='info-counter'>Counter: </div>
                {(props.turns !== null) && <div className='info-counter-moves-val'> {props.turns} turns</div>}
                {(props.time !==null) && <div className='info-counter-time-val'> {props.time} s </div>}
            </div>
            <div className={(props.value) ? 'info-s' : 'info-f' }>
                <div className='info-score'> Score: </div>
                <div className='info-score-val'> 9 </div>
            </div>

            <div className={(props.value) ? 'highscore-s' : 'highscore-f' }> Highscore: 
                <div className='total-score'> 14 </div>
            </div>

        </div>
    )

}

export default Confirm;