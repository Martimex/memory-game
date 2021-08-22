import levels from '../levels.js';

function GameInfo(props) {

    return (
        <div className='game-details'>
            <div className={`level-${props.level-1} details-item`}> Level: {props.level-1}</div>  
            {levels[`lvl${props.level-1}`].counter.turns &&  (<div className={`counter-${props.level-1} details-item`}> Remaining turns: {parseInt(levels[`lvl${props.level-1}`].counter.turns) - parseInt(props.moves)} </div>) }
            {levels[`lvl${props.level-1}`].counter.time  &&  (<div className={`counter-${props.level-1} details-item`}> Remaining time:  {parseInt(levels[`lvl${props.level-1}`].counter.time) - parseInt(props.time)} s </div>) }
            <div className={`score-${props.level-1} details-item`}> Score: {props.score} </div>
        </div>
    )
}

export default GameInfo;