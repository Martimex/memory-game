import '../styles/level_info.css';
import { faStar as star_full, faCheck as check, faFileAlt as notes, faChartBar as stats, faPlay as play } from '@fortawesome/free-solid-svg-icons';
import { faStar as star_empty} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function LevelInfo(props) {

    function checkCloseCondition(e) {
        //console.log(e.target.classList);
        if(e.target.classList.contains('level-info-box')) {
            props.closeLevelInfo([null, null]);
        }
    }

    return (
        <div className='level-info-blurred' onClick={(e) => checkCloseCondition(e)} >
            <div className="level-info-box">
                <div className="level-info-box-content">
                    <div className='level-info-box-content-item' datatype="info">
                        <div className='content-item-part'>
                            <div className='content-item-serie'> {props.serie_name}  </div>
                            {/* <div className='content-item-version'> 1.1 </div>
                            <div className='content-item-date'> 12.12.1453 </div> */}
                        </div>
                        <div className='content-item-part'>
                            <div className='content-item-flex'>
                                {/* Once this button is clicked, that section changes to whatever the button is about, with 
                                    possibility to scroll the section down (if necessary) and moving back to main section 
                                */}
                                <div className='content-item-origin_btn'>
                                    <FontAwesomeIcon icon={notes} className="icon-notes"></FontAwesomeIcon>
                                </div>

                                <div className='content-item-stats_btn'>
                                    <FontAwesomeIcon icon={stats} className="icon-stats"></FontAwesomeIcon>
                                </div>
                            </div>
                        </div>
                        <div className='content-item-verification'>
                            <div className='content-item-verification-circle'>
                                <FontAwesomeIcon icon={check} className="icon-check"></FontAwesomeIcon>
                            </div>
                        </div>
                    </div>

                    <div className='level-info-box-content-item' datatype='main'>
                        <div className='content-item-level-circle'>
                            <div className='content-item-level'>
                                {props.level_details.number}
                            </div>
                        </div>
                        <div className='content-item-part'> 
                            <div className='content-item-time'> Time: {props.level_details.limitations['time'] || '-'} </div>
                            <div className='content-item-time'> Turns: {props.level_details.limitations['turns'] || '-'}  </div>
                            <div className='content-item-time'> Tiles: {props.level_details.tiles} </div>
                            {/*<div className='content-item-score'> Score: 1200 </div>
                            <div className='content-item-trials'> Trials: 225 </div> */}
                        </div>
                        <div className='play' onClick={() => { props.changeComponent(); props.proceed(); } } >
                            <div className='play-level'> 
                                <FontAwesomeIcon icon={play} className="icon-play"> </FontAwesomeIcon>
                            </div>
                        </div>
                    </div>

                    <div className='level-info-box-content-item' datatype='stars'>
                        <FontAwesomeIcon icon={star_full} className="icon-star_full"></FontAwesomeIcon>
                        <FontAwesomeIcon icon={star_empty} className="icon-star_empty"></FontAwesomeIcon>
                        <FontAwesomeIcon icon={star_empty} className="icon-star_empty"></FontAwesomeIcon>
                    </div>

                </div>
            </div>
        </div>
    )
}

export { LevelInfo };