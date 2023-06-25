import * as Animation from "animejs"

const anime = Animation.default;

async function match(isMatch, cardsOpened_parentNodes, stageNo) {
    // Fire some animations when we found / do not found a match
    const targets = document.querySelectorAll('.target');

    async function matchAnimation() {
        if(isMatch) {
            const a1 = anime({
                targets: cardsOpened_parentNodes, // targets: [targets],
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