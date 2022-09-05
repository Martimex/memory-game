import React from 'react';
import { all_levels } from '../global/all_levels.js';
import '../styles/serie_box.css';
import { series_abbr } from '../global/series_abbr.js';

function openUpFire(e) {
/*     console.log(e.target);

    const serieContent = e.target.querySelector('.serie-content');
    const serieTitle = e.target.querySelector('.serie-title');

    console.log(serieContent, serieTitle)

    serieTitle.classList.add('invisible');
    serieContent.classList.remove('invisible'); */
}

function SerieBox(props) {

    return(
        <div className='mode-block__serie' onClick={(e) => openUpFire(e)}>
            {/* <div className='serie-title'> {series_abbr[props.serie]} </div> */}
            <div className='serie-content invisible'>
                {Object.keys(all_levels[props.serie]).map((lv, index) =>
                    <div className='mode-block__serie__level'
                        key={props.serie.toString() + index.toString()}
                        onClick={() => {props.setLevelChoose([all_levels[props.serie][lv], props.serie])}}
                    >

                        {all_levels[props.serie][lv].number} 

                    </div>
                )}
            </div>
        </div>
    )
}

export { SerieBox }