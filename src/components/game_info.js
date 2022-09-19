import levels from '../levels.js'; // No needed since rework

function GameInfo(props) {

    return (
        <div className='game-details'>
            <div className={`level-${props.level} details-item`}> Level: {props.level}</div>  
            {(props.moves >= -1) &&  (<div className={`counter-${props.level} details-item`}> Turns: {parseInt(props.moves)} </div>) }
            {(props.time >= -1) &&  (<div className={`counter-${props.level} details-item`}> Time:  {parseInt(props.time) /* - parseInt(props.time) */} s </div>) }
            <div className={`score-${props.level} details-item`}> Score: {props.score} </div>
        </div>
    )
}

export default GameInfo;