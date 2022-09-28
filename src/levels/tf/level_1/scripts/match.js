import anime from 'animejs/lib/anime.es.js';

function match(isMatch, cardsOpened_parentNodes, stageNo) {
    // Fire some animations when we found / do not found a match
    if(isMatch) {
        anime({
            targets: cardsOpened_parentNodes,
            duration: 1300,
            backgroundColor: 'hsla(45, 50%, 60%, .2)',
            easing: 'easeInExpo',
        })
    }
    else {
       //
    }
}

export {match};