import anime from 'animejs/lib/anime.es.js';

function level_start(stageNo) {

    async function startAnimation() {
        await showTiles()
        await hideTiles()
            .then(() => {
                console.warn('Animation complete !');
            })
    }

    async function showTiles() {
        const a1 = anime({
            targets: '.tile',
            duration: 1400,
            transitionProperty: 'all',
            rotateY: '180deg',
            borderColor: ['hsl(4, 87%, 62%)', 'hsl(45, 50%, 80%)'],
            easing: 'easeInOutQuart',
            loop: false,
        }).finished;

        await Promise.all([a1]);
    }

    async function hideTiles() {
        const a2 = anime({
            targets: '.tile',
            duration: 1400,
            transitionProperty: 'all',
            rotateY: '0deg',
            borderColor: ['hsl(45, 50%, 80%)', 'hsl(4, 87%, 62%)'],
            easing: 'easeInOutQuart',
            loop: false,
        }, '+=600').finished;

        await Promise.all([a2]);
    }

    // Init
    startAnimation();
}


export {level_start};