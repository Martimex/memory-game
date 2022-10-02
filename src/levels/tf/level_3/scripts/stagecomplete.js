import anime from 'animejs/lib/anime.es.js';

async function stagecomplete(stageNo, isLevelCompleted) {

    let game = document.querySelector('.background');
    console.error('stageNo is:  ' + stageNo);

    async function init() {
        await fadeScreen()
    }

    async function fadeScreen() {
        const a1 = anime({
            targets: game,
            duration: 2500,
            opacity: .5,
            easing: 'easeInQuad',
        }).finished;

        await Promise.all([a1]);
    }

    // Fire
   await init();
}

export {stagecomplete};