import anime from 'animejs/lib/anime.es.js';

async function level_start(stageNo, time, tileShowTime) {

    async function startAnimation() {
        await showTiles()
        await hideTilesAndShowTornados()
            .then(() => { rotateTornados(); rotateBoard(); glowTiles(); })
    }

    async function showTiles() {
        const a1 = anime({
            targets: '.tile',
            duration: time,
            transitionProperty: 'all',
            rotateY: '180deg',
            //borderColor: ['hsl(4, 87%, 62%)', 'hsl(45, 50%, 80%)'],
            easing: 'linear',
            loop: false,
        }).finished;

        await Promise.all([a1]);
    }

    async function hideTilesAndShowTornados() {
        const a2 = anime({
            targets: '.tile',
            duration: time,
            delay: tileShowTime,
            transitionProperty: 'all',
            rotateY: '0deg',
            //borderColor: ['hsl(45, 50%, 80%)', 'hsl(4, 87%, 62%)'],
            easing: 'linear',
            loop: false,
        }).finished;

        const allTornados = document.querySelectorAll(`.tornado`);

        const a3 = anime({
            targets: allTornados,
            duration: 1200,
            delay: anime.stagger(350),
            easing: 'easeInExpo',
            opacity: [0, 1],
        }).finished;

        await Promise.all([a2, a3]);
    }

    function rotateTornados() {
        anime({
            targets: `.tornado-1`,
            duration: 4800,
            rotate: 360,
            easing: 'linear',
            direction: 'alternate',
            loop: true,
        })

        anime({
            targets: `.tornado-2`,
            duration: 6200,
            rotate: -360,
            easing: 'linear',
            direction: 'alternate',
            loop: true,
        })

        anime({
            targets: `.tornado-3`,
            duration: 6200,
            rotate: -360,
            easing: 'linear',
            direction: 'alternate',
            loop: true,
        })

        anime({
            targets: `.tornado-4`,
            duration: 4800,
            rotate: 360,
            easing: 'linear',
            direction: 'alternate',
            loop: true,
        })
    }

    function rotateBoard() {
        let game = document.querySelector('.game-6');
        let board = document.querySelector('.board-6');
        let spinningBox = document.createElement('div');
        spinningBox.classList.add('spinning');
        game.appendChild(spinningBox);
        spinningBox.appendChild(board);
        anime({
            targets: spinningBox,
            duration: 12000,
            keyframes:[
                {rotate: [0, 90], easing: 'easeOutExpo'},
                {rotate: [90, 180], easing: 'easeInExpo'},
                {rotate: [180, 270], easing: 'easeOutExpo'},
                {rotate: [270, 360], easing: 'easeInExpo'},
            ],
            direction: 'alternate',
            loop: true,
        });
    }

    function glowTiles() {
        const allTiles = document.querySelectorAll(`.tile`);
        
        anime({
            targets: allTiles,
            duration: 1400,
            boxShadow: ['0 0 .2rem .2rem hsl(262, 60%, 60%), 0 0 .4rem .4rem hsl(55, 60%, 60%)'],
        })
    }

    // Init
    await startAnimation();
}


export {level_start};