import React, { useState, useEffect, useRef } from 'react';
import Game from './game.js';

function Confirm(props) {

    console.log(props.value);

    return (
        <div className={(props.value) ? 'confirmation-s' : 'confirmation-f'}>
            <div className={(props.value) ? 'title-s' : 'title-f' }> {(props.value) ? 'Success !' : 'Failure !' } </div>
            <div className='info'>
                <div className='info-level'> LV: </div>
                <div className='info-level-val'> {props.level-1}</div>
            </div>
            <div className='info'>
                <div className='info-counter'>Counter: </div>
                <div className='info-counter-moves-val'> {(props.turns !== null) ? `${props.turns} turns` : '-'}</div>
                <div className='info-counter-time-val'> {(props.time !== null) ? `${props.time} s` : '-'}</div>
            </div>
            <div className='info'>
                <div className='info-score'> Score: </div>
                <div className='info-score-val'> 9 </div>
            </div>

            <div className='highscore'> Highscore: 
                <div className='total-score'> 14 </div>
            </div>

            <div className='finish'>
                <button className={(props.value) ? 'btn-s' : 'btn-f'} onClick={(props.value) ? {/*changeTileNumber*/} : ''} > {(props.value) ? 'Next level ->' : 'Try again !'}</button>
            </div>
        </div>
    )

}

export default Confirm;