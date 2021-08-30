import anime from 'animejs/lib/anime.es.js';
import { useRef } from 'react/cjs/react.development';
import Game from './components/game.js';
//import { tiles, foundTiles } from './components/game.js';
//let gameboard = useRef(null);

const flags = {
    
    // LVL 1
    loadBorders_1: function() {
        anime({
            targets: '.tile',
            duration: 1600,
            borderColor: ['hsl(4, 87%, 62%)', 'hsl(45, 50%, 80%)'],
            //loop: true,
            direction: 'alternate',
        })
        console.log('eigjiepg')
    },

    markBorders_1: function() {
        anime({
            targets: '.target',
            duration: 400,
            borderColor: 'hsl(45, 50%, 80%)',
            //loop: true,
            //direction: 'alternate',
        })
    },

    // LVL 2

    setBackgroundFlood_2: function() {
        let waterMaxheight = window.innerWidth;
        //let f = document.querySelector('.background');
        let animationContainer = document.querySelector('.animationContainer');//document.createElement('div');
        //animationContainer.classList.add('animationContainer');

        //f.appendChild(animationContainer);

        for(let i=75; i>0; i--) {
            let d = document.createElement('div');
            d.classList.add('flood-elem');
            animationContainer.appendChild(d);
        }
        console.log(waterMaxheight); 
        anime({
            targets: '.flood-elem',
            duration: 300,
            delay: anime.stagger(1000, {from: 'last'}),
            opacity: ['0', '0.2'],
            easing: 'easeInSine',
        })
    },

    colorBackground_2: function() {
        anime({
            targets: '.target',
            duration: 500,
            backgroundColor: 'hsl(199, 70%, 52%)',
        })
    },

    // LVL 3

    animate_3: function() {
        let animationContainer = document.querySelector('.animationContainer');//document.createElement('div');

        for(let i=2; i>0; i--) {
            let d = document.createElement('div');
            d.classList.add('powerball', 'powerball-1');
            let d1 = document.createElement('div');
            d1.classList.add('powerball', 'powerball-2');
            let d2 = document.createElement('div');
            d2.classList.add('powerball', 'powerball-3');
            animationContainer.appendChild(d);
            animationContainer.appendChild(d1);
            animationContainer.appendChild(d2);
        }

        anime({
            targets: ['.powerball-1', '.powerball-2', '.powerball-3'],
            duration: 4000,
            delay: anime.stagger(200),
            keyframes: [
                {translateY: '0vh', opacity: 0, scaleX: '1', scaleY: '1'},
                {translateY: '30vh', opacity: 0.2, backgroundColor: 'hsl(142, 80%, 30%)', scaleX: '2', scaleY: '2'},
                {translateY: '100vh', opacity: 1, backgroundColor: 'hsl(142, 80%, 30%)', scaleX: '3', scaleY: '3'},
                {backgroundColor: 'hsl(299, 50%, 65%)', scaleX:'2', scaleY: '2'},
                {delay: 200},
            ],
            loop: true,
            direction: 'alternate',
            easing: 'easeInQuad',
        })
    },

    fadeTile_3: function() {
        async function waitInverse() {
            const wait = anime ({
                duration: 500,
                targets: '.tile',
            }).finished;
            await Promise.all([wait]);
        } 
        waitInverse().then(() => {
            anime({
                targets: '.target',
                //delay: 8000,
                duration: 1000,
                // autoplay: false,
                easing: 'linear',
                opacity: '0.1',
            })
        })
    },


    // LVL 4

    blockInverseAnimation_4: function() {
        anime({
            targets: '.tile',
            duration: 3200,
            delay: anime.stagger(85),
            keyframes: [
                {translateX: '10rem'},
                {translateX: '0rem'},
            ],
            loop: false,
            easing: 'linear',
        });

        anime({
            targets: '.board',
            duration: 3200,
            skewY: '10deg',
            loop: false,
        })
    },

    colorFirstTargetShadow_4: function() {
        anime({ 
            targets: '.target',
            duration: 500,
            boxShadow: ['6px -6px 0px 2px hsla(142, 0%, 0%, 70%)', '6px -6px 0px 2px hsla(50, 90%, 50%, 90%)'],
        })
    },

    colorSecondTargetShadow_4: function() {
        anime({
            targets: '.target',
            duration: 500,
            boxShadow: ['6px -6px 0px 2px hsla(142, 0%, 0%, 70%)', '6px -6px 0px 2px hsla(50, 90%, 50%, 90%)'],
        })
    },

    changeRepeatedBg_4: function(cardsOpened, tiles, foundTiles) {
        console.log(tiles);
        console.log(foundTiles);
        if(foundTiles+2 === tiles) {  // it's async, so append value right away
            async function waitFinish() {
                const wait = anime ({
                    duration: 1000,
                    targets: '.tile',
                }).finished;
                await Promise.all([wait]);
            } 
            waitFinish().then(() => {
                anime({
                    targets:'.background',
                    duration: 4200,
                    easing: 'linear',
                    backgroundImage: ['repeating-linear-gradient(190deg, hsl(41, 70%, 50%), hsl(50, 70%, 50%) 8%, hsl(0, 0%, 10%) 12%)', 'repeating-linear-gradient(30deg, hsl(70, 70%, 50%), hsl(110, 70%, 50%) 8%, hsl(0, 0%, 10%) 12%)'],
                    direction: 'alternate',
                })
            })
        }
        else if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) {
            anime({
                targets:'.background',
                duration: 1500,
                easing: 'linear',
                backgroundImage: ['repeating-linear-gradient(190deg, hsl(41, 70%, 50%), hsl(50, 70%, 50%) 8%, hsl(0, 0%, 10%) 12%)', 'repeating-linear-gradient(190deg, hsl(70, 70%, 50%), hsl(110, 70%, 50%) 8%, hsl(0, 0%, 10%) 12%)'],
                direction: 'alternate',
            })
        }
        else {
            anime({
                targets:'.background',
                duration: 1600,
                easing: 'linear',
                backgroundImage: ['repeating-linear-gradient(190deg, hsl(41, 70%, 50%), hsl(50, 70%, 50%) 8%, hsl(0, 0%, 10%) 12%)', 'repeating-linear-gradient(190deg, hsl(41, 70%, 50%), hsl(15, 70%, 50%) 8%, hsl(0, 0%, 10%) 12%)'],
                direction: 'alternate',
            })
        }
    },
}

export default flags;