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

let animationFinishController = [true, true];

function flipTile(e, mouseEventName) {

    if(e.target.classList.contains(`${dynamic_classes.level_tile_front}`)) {
        const tile = e.target; //.querySelector(`.${dynamic_classes.level_tile_front}`); 
        // expected parent: '.mode-block__serie__level' 
        return;
        const flip = anime.timeline({

        })

        if(mouseEventName === 'over') {
            flip
            .add ({
                targets: tile,
                duration: 800,
                easing: 'easeInSine',
                backgroundImage: 'radial-gradient(#0005, #0005, #0005)',
                //opacity: 0,
                loop: false,
            })
        }

        else if(mouseEventName === 'out') {
            flip
            .add ({
                targets: tile,
                duration: 800,
                easing: 'easeOutSine',
                backgroundImage: 'radial-gradient(#444, #333, #222)',
                loop: false,
            })
        }
    }
}

function SerieBox(props) {

    function openUpFire(e) {
        //console.warn(e.target.classList);
        if(!animationFinishController[0] || !animationFinishController[1]) return; // Dont fire if both animations are not completed
        if(e.target === recentShowUpBox) return; // Dont fire if old and new sections are the same
        if(!e.target.classList.contains(`${dynamic_classes.serie_block}`)) return; // Only section block can be targeted
        const thisSerieTiles = e.target.querySelectorAll(`.${dynamic_classes.level_borders}`);
        console.log(thisSerieTiles);
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
        animationFinishController[0] = false;
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
                animationFinishController[0] = true;
            })
        }
    
        async function fadeText() {
            const a1 = anime({
                targets: section_title,
                duration: 650,
                translateX: '30%',
                filter: 'sepia(70%)',
                opacity: 0,
                easing: 'easeOutSine',
            }).finished;
            await Promise.all([a1]);
        }
    
        async function showUpLevels() {
            const a2 = anime({
                targets: section_content_tiles,
                duration: 500,
                delay: anime.stagger(120),
                opacity: 1,
                easing: 'easeInCubic',
            }).finished;
            await Promise.all([a2]);
        }
    
        animationChain();
    }
    
    function animateOtherSectionHide(e) {

        if(recentShowUpBox) {
            animationFinishController[1] = false;
            console.log(recentShowUpBox);
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
                    animationFinishController[1] = true;
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
    

    return(
        <div className={`${dynamic_classes.serie_block}`} onClick={(e) => {openUpFire(e)} } onMouseOver={(e) => flipTile(e, 'over')} onMouseOut={(e) => {flipTile(e, 'out')}} >
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