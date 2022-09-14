import levels from '../levels.js'; // No needed since rework

function GameInfo(props) {

    return (
        <div className='game-details'>
            <div className={`level-${props.level} details-item`}> Level: {props.level-1}</div>  
            {props.moves &&  (<div className={`counter-${props.level} details-item`}> Remaining turns: {parseInt(props.moves) /* - parseInt(props.moves) */} </div>) }
            {props.time  &&  (<div className={`counter-${props.level} details-item`}> Remaining time:  {parseInt(props.time) /* - parseInt(props.time) */} s </div>) }
            <div className={`score-${props.level} details-item`}> Score: {props.score} </div>
        </div>
    )
}

export default GameInfo;