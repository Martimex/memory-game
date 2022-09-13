import React, {useEffect, useState} from 'react';
import { all_levels } from '../global/all_levels.js';
import '../styles/serie_box.css';
import { series_abbr } from '../global/series_abbr.js';
import { rainbowColors } from '../global/rainbow_colors.js';

import anime from 'animejs/lib/anime.es.js';

const colors_number = 4;

const dynamic_classes = {
    serie_block: 'mode-block__serie',
    level_borders: 'mode-block__serie__border',
    level_tile_main: 'mode-block__serie__tile',
    level_tile_front: 'mode-block__serie__level',
    level_tile_back: 'mode-block__serie__back-side',
} 

let currentlyColoredBorders = [

];

let recentShowUpBox = null;

let animationFinishController = 
{
  first: true, 
  second: true,
};

function flipTile(e, mouseEventName) {

    if(e.target.classList.contains(`${dynamic_classes.serie_block}`)) {
        const tile = e.target; //.querySelector(`.${dynamic_classes.level_tile_front}`); 
        // expected parent: '.mode-block__serie__level' 
        return;

        if(mouseEventName === 'over') {
            anime({
                targets: tile,
                duration: 3000,
               // borderColor: ['#333 #333 #333 #333', '#000 #888 #888 #000'],
                //boxShadow: ['1em 2em 3.2em #333', '1em 2em 3.2em #ddd'],
                boxShadowColor: '#ddd',
                easing: 'easeInSine',
                direction: 'alternate',
                loop: true,
            })
        }

        else if(mouseEventName === 'out') {
            anime({
                targets: tile,
                duration: 1200,
                //borderColor: '#333',
                //boxShadow: ['1em 2em 3.2em #111'],
                boxShadowColor: '#333',
                easing: 'easeOutSine',
                loop: false,
            })
        }
    }
}

function SerieBox(props) {

    function openUpFire(e) {
        //console.warn(e.target.classList);
        //console.warn('openUpFire:  ', animationFinishController[`first`], animationFinishController[`second`] );
        if(!animationFinishController[`first`] || !animationFinishController[`second`]) return; // Dont fire if both animations are not completed
        if(e.target === recentShowUpBox) return; // Dont fire if old and new sections are the same
        if(!e.target.classList.contains(`${dynamic_classes.serie_block}`)) return; // Only section block can be targeted
        const thisSerieTiles = e.target.querySelectorAll(`.${dynamic_classes.level_borders}`);
        //console.log(thisSerieTiles);
        thisSerieTiles.forEach(level_tile => {
            currentlyColoredBorders.push([]); // arr for tile
            const colorsCopy = [...rainbowColors];
            let gradient_String = '';
    
            for(let color_no = 0; color_no < colors_number; color_no++) {
                // 1. Get rand 2. Push 3. Splice
                let rand = Math.floor(Math.random() * colorsCopy.length);
                currentlyColoredBorders[currentlyColoredBorders.length -1].push(colorsCopy[rand]);
                gradient_String+= (color_no !== colors_number - 1)? ` ${colorsCopy[rand]},` : ` ${colorsCopy[rand]}`;
                colorsCopy.splice(rand, 1);
            }
    
    
            level_tile.style.backgroundImage = `linear-gradient(135deg, ${gradient_String})`;
            let ccb = currentlyColoredBorders;
    
            anime({
                targets: level_tile,
                duration: 14000,
                backgroundImage: [
                    `linear-gradient(135deg, ${ccb[ccb.length -1][0]}, ${ccb[ccb.length -1][1]}, ${ccb[ccb.length -1][2]}, ${ccb[ccb.length -1][3]} )`,
                    `linear-gradient(135deg, ${ccb[ccb.length -1][1]}, ${ccb[ccb.length -1][2]}, ${ccb[ccb.length -1][3]}, ${ccb[ccb.length -1][0]} )`,
                    `linear-gradient(135deg, ${ccb[ccb.length -1][2]}, ${ccb[ccb.length -1][3]}, ${ccb[ccb.length -1][0]}, ${ccb[ccb.length -1][1]} )`,
                    `linear-gradient(135deg, ${ccb[ccb.length -1][3]}, ${ccb[ccb.length -1][0]}, ${ccb[ccb.length -1][1]}, ${ccb[ccb.length -1][2]} )`,
                ],
                hueRotate: [
                   '0deg', '20deg', '40deg', '60deg', '40deg', '20deg', '0deg'
                ],
                saturate: '140%',
                loop: true,
                direction: 'alternate',
                easing: 'linear',
            })
        })
    
        animateSectionShowUp(e);
        animateOtherSectionHide(e);
    }
    
    function animateSectionShowUp(e) {
        animationFinishController['first'] = false;
        const section_title = e.target.querySelector(`.serie-title`);
        const section_content = e.target.querySelector(`.serie-content`);
        const section_content_tiles = section_content.querySelectorAll(`.${dynamic_classes.level_borders}`);
    
        section_content.classList.remove('invisible');
       
        section_content_tiles.forEach(lv_tile => lv_tile.style.pointerEvents = 'auto');
    
        async function animationChain() {
            await fadeText()
            .then(() => {
                section_title.classList.add('invisible');
            })
            await showUpLevels()
            .then(() => {
                animationFinishController[`first`] = true;
            })
        }
    
        async function fadeText() {
            const timing = 650;
            const a1 = anime({
                targets: section_title,
                duration: timing,
                translateX: '30%',
                filter: 'sepia(70%)',
                opacity: 0,
                easing: 'easeOutSine',
            }).finished;
            
            const b1= anime({
                targets: e.target,
                duration: timing,
                filter: ['contrast(100%)', 'contrast(140%)'],
                easing: 'linear',
            }).finished;

            await Promise.all([a1, b1]);
        }
    
        async function showUpLevels() {
            const timing = 500;
            const staggering = 120;
            const total_stagger = timing + (staggering * section_content_tiles.length);
            const a2 = anime({
                targets: section_content_tiles,
                duration: timing,
                delay: anime.stagger(staggering),
                opacity: 1,
                easing: 'easeInCubic',
            }).finished;

            const b2 = anime({
                targets: e.target,
                duration: total_stagger,
                filter: ['constrast(140%)', 'contrast(100%)'],
                easing: 'linear',
            }).finished;

            await Promise.all([a2, b2]);
        }
    
        animationChain();
    }
    
    function animateOtherSectionHide(e) {

        if(recentShowUpBox) {
            animationFinishController[`second`] = false;
            const section_title_old = recentShowUpBox.querySelector(`.serie-title`);
            const section_content_old = recentShowUpBox.querySelector(`.serie-content`);
            const section_content_tiles_old = section_content_old.querySelectorAll(`.${dynamic_classes.level_borders}`);

            section_content_tiles_old.forEach(lv_tile => lv_tile.style.pointerEvents = 'none');

            async function animationChain() {
                section_title_old.classList.remove('invisible');
                await hideLevels()
                await showText()
                .then(() => {
                    section_content_old.classList.add('invisible');
                    animationFinishController[`second`] = true;
                })
            }

            async function hideLevels() {
                const a1 = anime({
                    targets: section_content_tiles_old,
                    duration: 500,
                    delay: anime.stagger(120, {from: 'last'}),
                    opacity: 0,
                    easing: 'easeOutCubic',
                }).finished;
                await Promise.all([a1]);
            }

            async function showText() {
                const a2 = anime({
                    targets: section_title_old,
                    duration: 650,
                    translateX: 0,
                    filter: 'sepia(0%)',
                    opacity: 1,
                    easing: 'easeInSine',
                }).finished;
                await Promise.all([a2]);
            }

            animationChain(section_content_tiles_old);

        }

        recentShowUpBox = e.target;
    }
    
    function checkSerieNameChange() {
        // Object properties are not updated !
        //console.warn('check: ', animationFinishController['first'], animationFinishController['second']);
        if((animationFinishController[`first`] === true)  && (animationFinishController[`second`]) === true)  {
            props.setSerieName(series_abbr[props.serie])
        }
    }

    return(
        <div className={`${dynamic_classes.serie_block}`} onClick={(e) => {checkSerieNameChange(); openUpFire(e); } } onMouseOver={(e) => flipTile(e, 'over')} onMouseOut={(e) => {flipTile(e, 'out')}} >
            <div className='serie-title'> {series_abbr[props.serie]} </div> 
            <div className='serie-content invisible'>
                {Object.keys(all_levels[props.serie]).map((lv, index) =>
                    <div className={`${dynamic_classes.level_borders}`} key={props.serie.toString() + index.toString()}
                        onClick={() => {props.setLevelChoose([all_levels[props.serie][lv], props.serie])}}
                    >
                        <div className='bg-layer'>
                            <div className={`${dynamic_classes.level_tile_main}`}>
                                <div className={`${dynamic_classes.level_tile_front}`}>

                                    {(all_levels[props.serie][lv].number < 10)? '0'+all_levels[props.serie][lv].number : all_levels[props.serie][lv].number} 


                                </div>   
                                
                                <div className={`${dynamic_classes.level_tile_back}`} > </div>
                            </div>
                        </div> 
                    </div>
                )}
            </div>
        </div>
    )
}

export { SerieBox }