import React, {useState} from "react";
import styles from "../styles/player_stats.module.css";
import player_stats_pages from "../global/player_stats_pages";


function PlayerStats(props) {

    const pagesLimit = props.pageLastIndex + 1;
    const statsRows = Array.from(new Array(pagesLimit)).map((el, ind) => {
        const [userStat, gameStat] = connectObj(props.levelsCount, player_stats_pages[props.pageNo][ind].connect_name);
        /* console.error(props); */
        const getPercentageValue = Math.floor((100 / (gameStat || 1 /* AVOIDING POSSIBLE DIVISION BY 0 */)) * userStat);
        return(
            <div key={ind.toString()} className={styles['stats-item']}> 
                <div className={styles['stats-item-box']}> 
                    <p className={styles['item-box__text']}> {player_stats_pages[props.pageNo][ind].stat_name}: </p>
                </div>
                <div className={styles['stats-item-box']}> 
                    <div className={styles['item-box__bar--outer']}>
                        <div className={styles['item-box__bar-text']}> {getPercentageValue}% {/* {(Boolean(props.levelsCount.user_completed['insane']) && Boolean(props.levelsCount.all['insane']))? ((100 / props.levelsCount.all['insane']) / props.levelsCount.user_completed['insane']).toFixed() : 0} */}</div>
                        <div className={`${styles['item-box__bar--inner']} ${styles[player_stats_pages[props.pageNo][ind].color_bar_class]}`} style={{'width': `${getPercentageValue}%`}} >  </div>
                    </div>
                </div>
                <div className={styles['stats-item-box']}> 
                    <p className={styles['item-box__text']}> {userStat} / {gameStat} {/* {Boolean(props.levelsCount.user_completed['insane'])? props.levelsCount.user_completed['insane'] : 0} */} </p>
                </div>
            </div>
        );
    })

    return (
        <div className={styles['stats-table']}>
            {statsRows}
            {/* <div className={styles['stats-item']}> 
                <div className={styles['stats-item-box']}> 
                    <p className={styles['item-box__text']}> {player_stats_pages[props.pageNo][0].stat_name}: </p>
                </div>
                <div className={styles['stats-item-box']}> 
                    <div className={styles['item-box__bar--outer']}>
                        <div className={styles['item-box__bar-text']}> {(Boolean(props.levelsCount.user_completed['insane']) && Boolean(props.levelsCount.all['insane']))? ((100 / props.levelsCount.all['insane']) / props.levelsCount.user_completed['insane']).toFixed() : 0}% </div>
                        <div className={styles['item-box__bar--inner']}>  </div>
                    </div>
                </div>
                <div className={styles['stats-item-box']}> 
                    <p className={styles['item-box__text']}> {Boolean(props.levelsCount.user_completed['insane'])? props.levelsCount.user_completed['insane'] : 0} </p>
                </div>
            </div>

            <div className={styles['stats-item']}> 
                <div className={styles['stats-item-box']}> 
                    <p className={styles['item-box__text']}> {player_stats_pages[props.pageNo][1].stat_name}: </p>
                </div>
                <div className={styles['stats-item-box']}> 
                    <div className={styles['item-box__bar--outer']}> 
                        <div className={styles['item-box__bar-text']}> 100% </div>
                        <div className={styles['item-box__bar--inner']}> </div>
                    </div>
                </div>
                <div className={styles['stats-item-box']}> 
                    <p className={styles['item-box__text']}> 73 </p>
                </div>
            </div>

            <div className={styles['stats-item']}> 
                <div className={styles['stats-item-box']}> 
                    <p className={styles['item-box__text']}>{player_stats_pages[props.pageNo][2].stat_name}: </p>
                </div>
                <div className={styles['stats-item-box']}> 
                    <div className={styles['item-box__bar--outer']}>
                        <div className={styles['item-box__bar-text']}> 7% </div>
                        <div className={styles['item-box__bar--inner']}>  </div>
                    </div>
                </div>
                <div className={styles['stats-item-box']}> 
                    <p className={styles['item-box__text']}> 45 </p>
                </div>
            </div> */}
        </div>
    )
}

function connectObj(obj, connect) { // WE WILL INVOKE THIS FUNCTION LIKE THAT:  connectObj(props.levelsCount) - below connector variable assumes that;

    const CHANGETHISEXPVALUELATER_ = 11;
    const CHANGETHISEXPVALUELATER = 40;

    const connector = {
        'main-exp':  [CHANGETHISEXPVALUELATER_, CHANGETHISEXPVALUELATER],
        'main-stars': [obj.user_stars, +obj.levelsAmount['inGame'] * 3],
        'main-levels': [obj.levelsAmount['userWin'], obj.levelsAmount['inGame']],
        'diff-easy': [obj.user_completed['easy'], obj.all['easy']],
        'diff-medium': [obj.user_completed['medium'], obj.all['medium']],
        'diff-hard': [obj.user_completed['hard'], obj.all['hard']],
        'diff-insane': [obj.user_completed['insane'], obj.all['insane']],
        'diff-extreme': [obj.user_completed['extreme'], obj.all['extreme']],
        'diff-legend': [obj.user_completed['legend'], obj.all['legend']],
    }

    return testConnectValues(connector[connect]);
}

function testConnectValues([val1, val2]) {
    // This function is only used to replace undefined / null values with 0
    return [val1 || 0, val2 || 0];
}

export default PlayerStats;