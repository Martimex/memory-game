import anime from 'animejs/lib/anime.es.js';
import { useRef } from 'react/cjs/react.development';
import Game from './components/game.js';

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
        let f= document.querySelector('.background');

        for(let i=75; i>0; i--) {
            let d = document.createElement('div');
            d.classList.add('flood-elem');
            f.appendChild(d);
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
}

export default flags;