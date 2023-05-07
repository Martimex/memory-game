import levels from '../levels.js'; // No needed since rework
import styles_global from '../global/global_styles.module.css';

let styles_main = '';

function GameInfo(props) {
    //console.log(props);
    async function loadItemsStyling() {
        if(props.newSerie && props.level) {
            styles_main = await import(`../levels/${props.newSerie}/level_${props.level}/styles/main.module.css`) 
        }
    }
    
    loadItemsStyling();

    return (
        <div className={`${styles_global['game-details']}`}>
            <div className={`${styles_main && styles_main[`level-${props.level}`]} ${styles_global['details-item']}`}> Level: {props.level}</div>  
            {(props.moves >= -1) &&  (<div className={`${styles_main && styles_main[`counter-${props.level}`]} ${styles_global['details-item']}`}> Turns: {parseInt(props.moves)} </div>) }
            {(props.time >= -1) &&  (<div className={`${styles_main && styles_main[`counter-${props.level}`]} ${styles_global['details-item']}`}> Time:  {parseInt(props.time)} s </div>) }
            <div className={`${styles_main && styles_main[`score-${props.level}`]} ${styles_global['details-item']}`}> Score: {props.score} </div>
        </div>
    )
}

export default GameInfo;