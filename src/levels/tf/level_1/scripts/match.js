import anime from 'animejs/lib/anime.es.js';

function match(isMatch, targeted_cards, stageNo) {
    // Fire some animations when we found / do not found a match
    if(isMatch) {
        //console.log('MATCH');
        anime({
            targets: [targeted_cards[0].parentNode, targeted_cards[1].parentNode],
            duration: 1300,
            backgroundColor: 'hsla(45, 50%, 60%, .2)',
            easing: 'easeInExpo',
        })
    }
    else {
       // console.log(' TRY AGAIN LOL ');
    }
}

export {match};