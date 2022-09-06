import React, {useEffect} from 'react';
import { all_levels } from '../global/all_levels.js';
import '../styles/serie_box.css';
import { series_abbr } from '../global/series_abbr.js';
import { rainbowColors } from '../global/rainbow_colors.js';

import anime from 'animejs/lib/anime.es.js';

const colors_number = 4;

const dynamic_classes = {
    level_borders: 'mode-block__serie__border',
} 

let currentlyColoredBorders = [

];

function openUpFire(e) {
/*  console.log(e.target);

    const serieContent = e.target.querySelector('.serie-content');
    const serieTitle = e.target.querySelector('.serie-title');

    console.log(serieContent, serieTitle)

    serieTitle.classList.add('invisible');
    serieContent.classList.remove('invisible'); */

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

        //console.log(gradient_String);
        level_tile.style.backgroundImage = `linear-gradient(135deg, ${gradient_String})`;
        //console.log(level_tile.style.backgroundImage);
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


    console.log(currentlyColoredBorders);
}

function SerieBox(props) {

    return(
        <div className='mode-block__serie' onClick={(e) => openUpFire(e)}>
            {/* <div className='serie-title'> {series_abbr[props.serie]} </div> */}
            <div className='serie-content invisible'>
                {Object.keys(all_levels[props.serie]).map((lv, index) =>
                    <div className={`${dynamic_classes.level_borders}`} key={props.serie.toString() + index.toString()}>
                        <div className='mode-block__serie__level'
                            onClick={() => {props.setLevelChoose([all_levels[props.serie][lv], props.serie])}}
                        >

                            {(all_levels[props.serie][lv].number < 10)? '0'+all_levels[props.serie][lv].number : all_levels[props.serie][lv].number} 

                        </div>
                    </div>   
                )}
            </div>
        </div>
    )
}

export { SerieBox }