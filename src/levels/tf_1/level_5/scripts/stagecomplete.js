//import anime from 'animejs/lib/anime.es.js';
//import anime from "animejs"

async function stagecomplete(stageNo) {

    let game = document.querySelector('.background');

    async function init() {
        const msg = `Too\u00a0easy,\u00a0right\u00a0?`;

        const aContainer = document.querySelector(`.animationContainer`);
        const textBox = document.createElement('div');
        const text = document.createElement('div');
        //text.textContent = msg;

        for(let x=0; x<msg.length; x++) {
            let letter = document.createElement('div');
            letter.classList.add('letter');
            letter.textContent = msg[x];
            text.appendChild(letter);
        }

        text.classList.add('message');
        textBox.classList.add('message-box');
        
        textBox.appendChild(text);
        aContainer.appendChild(textBox);

        await fadeScreen()
        await showMessage()
        await delay()
        await hideMessage()
    }

    async function fadeScreen() {
        const a1 = anime({
            targets: game,
            duration: 1600,
            opacity: .9,
            filter: ['saturate(75%)', 'saturate(125%)'],
            easing: 'easeInBounce',
        }).finished;

        await Promise.all([a1]);
    }

    async function showMessage() {
        const a2 = anime({
            targets: `.letter`,
            duration: 150,
            delay: anime.stagger(80),
            easing: 'linear',
            opacity:  1,
        }).finished;

        await Promise.all([a2]);
    }

    async function delay() {
        // Just wait - let the user read the message
        const a3 = anime({
            targets: '',
            duration: 1200,
            easing: 'linear',
        }).finished;

        await Promise.all([a3]);
    }

    async function hideMessage() {
        const a4 = anime({
            targets: `.letter`,
            duration: 100,
            delay: anime.stagger(60, {from: 'last'}),
            easing: 'easeOutExpo',
            opacity: 0,
        }).finished;

        await Promise.all([a4]);
    }

    // Fire
    if(stageNo === 0) {
        await init();
    }

}

export {stagecomplete};