import React, { useEffect, useState, useRef } from 'react';
import '../styles/preview.css';
import anime from 'animejs/lib/anime.es.js';

import { LevelInfo } from './level_info.js';
import { SerieBox } from './serie_box.js';
import  { all_levels } from '../global/all_levels.js';

import { faGithub as github} from '@fortawesome/free-brands-svg-icons';
import { faHome as home} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Preview(props) {

    const [[levelChoose, serie], setLevelChoose] = useState([null, null]);
    const [chosenSerie, setChosenSerie] = useState(null);
    const [chosenSerieName, setChosenSerieName] = useState(null);
    const animationTextOpacity = React.useRef(null);

    const currSerie = useRef(null);
    const topBarRef = useRef(null);

    const levels_showcase = Object.keys(all_levels).map((serie_name, index) => 
        <SerieBox serie={serie_name} setSerieName={setChosenSerie} setLevelChoose={setLevelChoose} key={serie_name.toString()} />
    )

    useEffect(() => {
        console.log(levelChoose);
        console.log(serie);
        if(levelChoose !== null) {
           // document.querySelector('.bg-main').style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        } else if(!levelChoose) {
            //document.body.style.overflow = 'auto'; -> declaration moved to leve_info Component
        }

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

/*     async function fadeAnimation() {

        const a1 = anime({
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
    } */

    useEffect(() => {
        async function fade() {
            await animate()
                .then(() => setChosenSerieName(chosenSerie))
        }
        
        async function animate() {
            const a1 = anime({
                targets: currSerie.current,
                duration: 500,
                opacity: [1, 0],
                easing: 'linear',
            }).finished;

            await Promise.all([a1]);
        }

        fade();

    }, [chosenSerie])

    useEffect(() => {
        anime({
            targets: currSerie.current,
            duration: 500,
            opacity: [0, 1],
            easing: 'linear',
        })
    }, [chosenSerieName])
    //console.log(all_levels['tf'][2].limitations) - here some props can be accessed

    useEffect(() => {
        window.addEventListener('scroll', checkStickyBar); 

        return () => {
            window.removeEventListener('scroll', checkStickyBar);
        }
    });

    function checkStickyBar() {
        //const sticky = topBarRef.current.offsetTop;
        const isSticky_before = topBarRef.current.classList.contains('sticky');
        topBarRef.current.classList.toggle('sticky', window.scrollY > 0);
        const isSticky_after = topBarRef.current.classList.contains('sticky');

        if(isSticky_before !== isSticky_after) {
            if(isSticky_after === true) {
                // Enter sticky mode
                anime({
                    targets: topBarRef.current,
                    duration: 500,
                    backgroundColor: ['#2223', '#222f'],
                    easing: 'linear',
                })
            }

            else {
                // Close sticky mode
                anime({
                    targets: topBarRef.current,
                    duration: 500,
                    backgroundColor: ['#222f', '#2223'],
                    easing: 'linear',
                })
            }
        }
    }

    return (
        <div className='bg-main'>
            <div className='seizure-flexbox'>
                <div className='top-bar' ref={topBarRef}>
                    <div className='top-bar__return'>
                        <button className='return-back' onClick={() => {props.backToHome(); props.proceed();}}> 
                            <FontAwesomeIcon icon={home} className="icon-home" />
                        </button>
                    </div>

                    <div className='top-bar__title'>
                        <div className='title-name' ref={currSerie}> {chosenSerieName ? chosenSerieName : `Choose a serie` } </div>
                    </div>

                    <div className='top-bar__follow'>
                        <div className='follow-me'>
                            <FontAwesomeIcon icon={github} className="icon-github" />
                        </div>    
                    </div>
                    
                </div>

                <div className='showcase-block'>
                    {levels_showcase}
                </div>


            </div>

            { levelChoose && (
                <LevelInfo serie_name={serie} level_details={levelChoose} closeLevelInfo={setLevelChoose} 
                    changeComponent={props.changeComponent} proceed={props.proceed}
                />
            )}
        </div>
    )

}

export default Preview;