import React, { useEffect, useState } from 'react';
import '../styles/preview.css';
import anime from 'animejs/lib/anime.es.js';

import { LevelInfo } from './level_info.js';
import  { all_levels } from '../global/all_levels.js';

function Preview(props) {

    const [[levelChoose, serie], setLevelChoose] = useState([null, null]);
    const animationTextOpacity = React.useRef(null);

    const levels_showcase = Object.keys(all_levels).map((serie_name, index) => 
        <div className='showcase-serie-box' key={serie_name.toString()}>
            {Object.keys(all_levels[serie_name]).map((lv, index) => 
                <div className='showcase-level-box' 
                    key={serie_name.toString() + index.toString()}
                    onClick={() => {setLevelChoose([all_levels[serie_name][lv], serie_name])}}
                > 
                    {all_levels[serie_name][lv].tiles} 
                </div>
            )}
        </div>
    )

    useEffect(() => {
        console.log(levelChoose);
        console.log(serie);
    }, [levelChoose]);

    React.useEffect(() => {
        animationTextOpacity.current = anime({
            targets: '.mode-about',
            duration: 9600,
            background: ['linear-gradient(120deg, hsla(0, 0%, 0%, .35) 25%,  hsla(128, 40%, 30%, .75), hsl(128, 63%, 39%, .4))',
            'linear-gradient(120deg, hsla(128, 40%, 30%, .4) 25%, hsl(128, 63%, 39%, .4), hsla(0, 0%, 0%, .35))',
            'linear-gradient(120deg, hsla(128, 63%, 39%, .4) 25%, hsl(128, 0%, 0%, .4), hsla(0, 0%, 0%, .35))',
            'linear-gradient(120deg, hsla(128, 0%, 0%, .4) 25%, hsl(128, 0%, 0%, .4), hsla(0, 0%, 0%, .35))'],
            borderRadius: ['10%', '20%', '30%', '40%', '30%', '20%', '10%'],
            easing: 'linear',
            direction: 'alternate',
            loop: true,
        })
    }, []);

    const animationButtonHover = React.useRef(null);

    function animateBtn() {
        animationButtonHover.current = anime({
            targets: '.proceed-play',
            opacity: 0,
            duration: 1400,
            filter: 'saturate(40%) invert(40%)',
            translateX: '3rem',
            easing: 'linear',
        })
    }

    function animatwBtnBack() {
        animationButtonHover.current = anime({
            targets: '.proceed-play',
            opacity: 1,
            duration: 1400,
            filter: 'saturate(100%) invert(0%)',
            translateX: '0rem',
            easing: 'linear',
        })
    }

    const changeScreen = React.useRef(null);

    async function fadeAnimation() {

        const a1 = changeScreen.current;

        changeScreen.current = anime({
            targets: 'body',
            duration: props.timing,
            opacity: [1, 0],
            direction: 'alternate',
            easing: 'linear',
        })

        await Promise.all([a1]);
    }

    async function proceed() {
        await fadeAnimation()
    }

    //console.log(all_levels['tf'][2].limitations) - here some props can be accessed

    return (
        <div className='bg-main'>
            <div className='seizure-box'>
                <div className='mode-description'>
                    <div className='mode-block'>
                        <div className='mode-title'>Adventure mode </div>
                    </div>
                    <div className='mode-block'>
{/*                         <div className='mode-about'>
                            The magic journey through different levels. This mode awaits for brave Adventurer,
                            who is willing to overcome many various challenges. No mistakes allowed.
                            {all_levels['tf'][2].tile_size}
                        </div> */}
                        <div>
                            {levels_showcase}
                        </div>
                    </div>
                    <div className='proceed'>
                        <button className='proceed-play'  onClick={() => {props.changeComponent(); proceed();}} onMouseOver={() => {animateBtn();}} onMouseOut={() => {animatwBtnBack();}}> Start </button>
                    </div>
                </div>


            </div>
            <div className='return-home'>
                <button className='back' onClick={() => {props.backToHome(); proceed();}}> H </button>
            </div>

            { levelChoose && (
                <LevelInfo serie_name={serie} level_details={levelChoose} closeLevelInfo={setLevelChoose} 
                    changeComponent={props.changeComponent} proceed={proceed}
                />
            )}
        </div>
    )

}

export default Preview;