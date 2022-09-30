import anime from 'animejs/lib/anime.es.js';

async function match(isMatch, cardsOpened_parentNodes, stageNo) {
    // Fire some animations when we found / do not found a match
    const targets = document.querySelectorAll('.target');

    async function matchAnimation() {
        if(isMatch) {
            console.warn(cardsOpened_parentNodes);
            const a1 = anime({
                targets: [targets],
                duration: 750,
                borderRadius: '30%',
                saturate: 1.5,
                scale: [1, .85],
                easing: 'easeInOutSine',
            }).finished;
            await Promise.all([a1]);
        }
        else {
           //
        }
    }
   

    /* await */ matchAnimation();
}

export {match};