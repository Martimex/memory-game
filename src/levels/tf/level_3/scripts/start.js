import anime from 'animejs/lib/anime.es.js';

async function level_start(stageNo, time, tileShowTime) {

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
            //borderColor: ['hsl(4, 87%, 62%)', 'hsl(45, 50%, 80%)'],
            easing: 'linear',
            loop: false,
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
            //borderColor: ['hsl(45, 50%, 80%)', 'hsl(4, 87%, 62%)'],
            easing: 'linear',
            loop: false,
        }).finished;

        await Promise.all([a2]);
    }



    // Init
    await startAnimation()
        .then(() => {

            const board = document.querySelector('.board')
            const oddTiles = board.querySelectorAll('.t-3:nth-of-type(odd)');
            const evenTiles = board.querySelectorAll('.t-3:nth-of-type(even)');

            // Run infinite background animation
            anime({
                targets: evenTiles,
                duration: 9000,
                background: [`linear-gradient(90deg, hsla(252, 50%, 40%, .6), hsla(142, 80%, 30%, .6))`, `linear-gradient(90deg, hsla(142, 80%, 30%, .6), hsla(252, 50%, 40%, .6))`],
                direction: 'alternate',
                easing: 'linear',
                loop: true,
            })

            anime({
                targets: oddTiles,
                duration: 7500,
                background: [`linear-gradient(90deg, hsla(142, 80%, 30%, .6), hsla(252, 50%, 40%, .6))`, `linear-gradient(90deg, hsla(252, 50%, 40%, .6), hsla(142, 80%, 30%, .6))`],
                direction: 'alternate',
                easing: 'linear',
                loop: true,
            })

            anime({
                targets: ['.powerball'],
                duration: 4000,
                delay: anime.stagger(400),
                keyframes: [
                    {translateY: '0%', opacity: 0, scale: 1, rotate: 0},
                    {translateY: '30%', opacity: 0.2, scale: 2, roatate: 120},
                    {translateY: '60%', opacity: .8,  scale: 1, rotate: 240},
                    {translateY: '45%', rotate: 360, scale: 1.4},
                ],
                loop: true,
                direction: 'alternate',
                easing: 'linear',
            })
            
            anime({
                targets: '.lantern-1',
                delay: 1800,
                duration: 5500,
                scale: [.4, 1],
                opacity: [0, 1],
                rotate: ['0deg', '90deg'],
                borderColor: ['hsl(222, 40%, 50%)', 'hsl(252, 50%, 60%)'],
                translateX: ['0rem', '-5rem'],
                saturate: ['100%', '50%'],
                easing: 'linear',
                direction: 'alternate',
                loop: true,
            })

            anime({
                targets: '.lantern-2',
                delay: 1800,
                duration: 5500,
                scale: [.4, 1],
                opacity: [0, 1],
                rotate: ['0deg', '90deg'],
                borderColor: ['hsl(222, 40%, 50%)', 'hsl(252, 50%, 60%)'],
                translateX: ['-5rem', '0rem'],
                saturate: ['100%', '50%'],
                easing: 'linear',
                direction: 'alternate',
                loop: true,
            })
        })
    
}


export {level_start};