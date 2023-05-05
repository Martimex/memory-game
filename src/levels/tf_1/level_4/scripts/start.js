//import anime from 'animejs/lib/anime.es.js';
//import anime from "animejs"

async function level_start(stageNo, time, tileShowTime) {

    document.querySelector(`.board`).classList.add('floor-bg');

    async function startAnimation() {
        await blockAnimation()
        await hideTiles()
    }

    async function blockAnimation() {
        const a1 = anime({
            targets: '.tile',
            duration: 3200,
            delay: anime.stagger(85, {from: 'center'}),
            keyframes: [
                {translateX: '10rem', opacity: 0},
                {translateX: '0rem', opacity: 0},
                {opacity: 1, rotate: [0, 20], duration: 300, easing: 'linear'}
            ],
            loop: false,
            easing: 'linear',
        }).finished;
        await Promise.all([a1]);
    }

    async function hideTiles() {
        const a2 = anime({
            targets: '.tile',
            duration: time,
            delay: tileShowTime,
            transitionProperty: 'all',
            rotateY: '0deg',
            easing: 'linear',
            loop: false,
        }).finished;

        await Promise.all([a2]);
    }

    // Init
    await startAnimation();
}


export {level_start};