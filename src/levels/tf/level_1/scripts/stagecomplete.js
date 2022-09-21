import anime from 'animejs/lib/anime.es.js';

async function stagecomplete(stageNo) {

    let game = document.querySelector('.background');
    console.error(stageNo);

    console.warn('Stage complete animation');

    async function init() {
        await fadeScreen()
            .then(() => console.warn('SC animation finished !'))
    }

    async function fadeScreen() {
        const a1 = anime({
            targets: game,
            duration: 400,
            opacity: .85,
            easing: 'linear',
        }).finished;

        await Promise.all([a1]);
    }

    // Fire
   await init();
}

export {stagecomplete};