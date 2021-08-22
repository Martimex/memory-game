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
            borderColor: ['hsl(4, 87%, 62%)', 'hsl(45, 50%, 100%)'],
            //loop: true,
            direction: 'alternate',
        })
        console.log('eigjiepg')
    },

    markBorders_1: function() {
        anime({
            targets: ['.tile-front', '.tile-back', '.tile'],
            duration: 400,
            borderColor: 'hsl(45, 50%, 100%)',
            //loop: true,
            //direction: 'alternate',
        })
    },
}

export default flags;