import '../styles/level_info.css';
import { background_gradients } from '../global/exceptions/background_gradients.js';
import React, { useEffect, useRef } from 'react';
import { faStar as star_full, faCheck as check, faFileAlt as notes, faChartBar as stats, faPlay as play } from '@fortawesome/free-solid-svg-icons';
import { faStar as star_empty} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import anime from 'animejs';

function LevelInfo(props) {

    const bg_placeholder_ref = useRef(null);

    function checkCloseCondition(e) {
        if(e.target.classList.contains('level-info-box')) {
            props.closeLevelInfo([null, null]);
        }
    }

    function loadBackground_preview(url) {
        return new Promise((resolve, reject) => {
            const bg_image = new Image();
            bg_image.addEventListener('load', () => {
                resolve(bg_image);
            })
            bg_image.addEventListener('error', (err) => {reject(err)});

            bg_image.src = url;
        })

    }

    useEffect(() => {
       const img_url = `bgs/${props.serie_name}/bg-${props.level_details.number}.svg`;
        loadBackground_preview(img_url)
            .then(() => {
                bg_placeholder_ref.current.style.backgroundImage = `url(${img_url})`;
                anime({
                    targets: bg_placeholder_ref.current,
                    duration: 500,
                    opacity: [0, 1],
                    easing: 'linear',
                })
            })
            .catch((error) => { console.log(error); 
                // + Handle exceptions for TF serie levels (1 to 6), because they only have default SVG backgrounds, but CSS gradients
                if((props.serie_name === 'tf') && (parseInt(props.level_details.number) <= 6)) {
                    bg_placeholder_ref.current.style.backgroundImage = background_gradients[props.serie_name][props.level_details.number];
                    
                    anime({
                        targets: bg_placeholder_ref.current,
                        duration: 500,
                        opacity: [0, 1],
                        easing: 'linear',
                    })
                }
            })
    }, [])

    return (
        <div className='level-info-blurred' onClick={(e) => checkCloseCondition(e)} >
            <div className="level-info-box">
                <div className="level-info-box-content" >
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

                    <div className='bg-placeholder' ref={bg_placeholder_ref} ></div>
                </div>
            </div>
        </div>
    )
}

export { LevelInfo };