import anime from 'animejs/lib/anime.es.js';

async function level_start(stageNo, time, tileShowTime) {
    console.warn(time, tileShowTime);

    async function startAnimation() {
        await showTiles()
        await hideTiles()
    }

    async function showTiles() {
        const a1 = anime({
            targets: '.tile',
            duration: time,
            transitionProperty: 'all',
            rotateY: '180deg',
            easing: 'easeInSine',
            loop: false,
        }).finished;

        await Promise.all([a1]);
    }

    async function hideTiles() {
        const a2 = anime({
            targets: '.tile',
            delay: tileShowTime,
            duration: time,
            transitionProperty: 'all',
            rotateY: '0deg',
            easing: 'easeOutSine',
            loop: false,
        }).finished;

        await Promise.all([a2]);
    }

    async function createFlood() {
        const b1 = anime({
            targets: '.flood-elem',
            duration: 400,
            delay: anime.stagger(1000, {from: 'last'}),
            opacity: [0, .4],
            easing: 'easeInSine',
        }).finished;

        await b1;
    }

    // Init
    await startAnimation()
    createFlood();
}

export {level_start};
