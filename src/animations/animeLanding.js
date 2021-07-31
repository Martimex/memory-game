import anime from 'animejs/lib/anime.es.js';
import react from 'react';
import reactDom from 'react-dom';

const el = document.querySelectorAll('div .layer .theme .card');
//console.log(el);



anime({
    targets: el,
    opacity: [0, 1],
    duration: 2000,
    loop: true,
    easing: 'linear',
})