//import anime from 'animejs/lib/anime.es.js';
//import anime from "animejs"

async function match(isMatch, cardsOpened_parentNodes, stageNo, levelObject) {
    // Fire some animations when we found / do not found a match


    if(isMatch) {
        levelObject.variables[`wasMatch`] = true;

        if(stageNo === 1) {
            // If we are inside second stage of the gameplay
            const background = document.querySelector('.background');
            
            // sync
            anime({
                targets: background,
                duration: 1400,
                filter: ['saturate(100%) hueRotate(0deg)', 'saturate(130%) hueRotate(40deg)'],
                easing: 'easeOutExpo',
                direction: 'alternate',
            })
        }
    }
    else {
        levelObject.variables[`wasMatch`] = false;

        if(stageNo === 1) {
            // If we are inside second stage of the gameplay
            const background = document.querySelector('.background');
            
            // sync
            anime({
                targets: background,
                duration: 1400,
                filter: ['saturate(100%) sepia(0%)', 'saturate(30%) sepia(40%)'],
                easing: 'easeOutExpo',
                direction: 'alternate',
            })
        }
    }
}

export {match};