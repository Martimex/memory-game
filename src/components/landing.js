import React, { useEffect, useRef } from 'react';
import '../styles/landing.css';
import '../animations/animeLanding.js';
import ReactDOM from 'react-dom';
import anime from 'animejs/lib/anime.es.js';
import { colors } from '../vars.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fab, fas);


let fasArray = Object.keys(library.definitions.fas)

console.log(fasArray)


function Landing() {

   /*  function myMethod() {
        const node = ReactDOM.findDOMNode(this);
        console.log(node);

        // Get child nodes
        if (node instanceof HTMLElement) {
            const child = node.querySelector('div .layer');
            console.log(child);
        }
    }

        myMethod();
    */

    const gameBoard = useRef(null);

    useEffect(() => {
        const board = gameBoard.current;
       // console.log(board);
        //console.log(board.children)

        const allChilds = board.children;

       // console.log(allChilds)

        //console.log(allChilds[0]);
        //console.log(allChilds[0].children[1])
        //console.log(allChilds[0].childNodes[1])

        for(let child of allChilds) {
            let back = child.childNodes[2];
            let svg = back.childNodes[0];

            svg.icon = fasArray[42];
            let comp = <FontAwesomeIcon icon={fasArray[42]}  className="fa-icon"/>
            
            //console.log(back);//.innerText = '1234';
           // console.log(svg);
            //svg.dataset.icon = 'square';
            //svg.className = "svg-inline--fa fa-square fa-w-14 fa-icon;";
            //back.innerText = 'XD';
            //let iconComp = <FontAwesomeIcon icon="coffee"  className="fa-icon" rotation={180} />;
            //back.appendChild(iconComp);
        }

        //board.addEvenListener('click', () => {
        //    console.log('now clicked');
        //})
    }, []);

    const staggering = 40;
    const startBefore = 5000;

    const animationRef1 = React.useRef(null);
    const animationRef2 = React.useRef(null);
    const animationRef3 = React.useRef(null);

    /* BELOW USED FOR TILES BORDER COLOR MANIPULATION */

    const animationRef4 = React.useRef(null);
    const animationRef5 = React.useRef(null);
    const animationRef6 = React.useRef(null);
    const animationRef7 = React.useRef(null);
    const animationRef8 = React.useRef(null);
    const animationRef9 = React.useRef(null);
    const animationRef10 = React.useRef(null);

    React.useEffect(() => {

        // taka funckja czeka, aż wszystkie boxy dostaną kolor ostatni z tablicy, a potem działa, znowu czeka, etc... -> Może by to zmienić???
         // Dodaj odpowiednio timeline dla klas "t00, t01, t02 itd..."

        ///////////////////////////////

        animationRef4.current = anime({
            targets: ['.t11'],
            borderColor: [`${colors.A}`, `${colors.A1}`, `${colors.A2}`, `${colors.A3}`, `${colors.B}`, `${colors.B1}`, `${colors.B2}`, `${colors.B2}`, `${colors.B3}`, `${colors.C}`, `${colors.C1}`, `${colors.C2}`, `${colors.C3}`, `${colors.D}`, `${colors.D1}`, `${colors.D2}`, `${colors.D3}`, `${colors.E}`, `${colors.E1}`, `${colors.E2}`, `${colors.E3}`, `${colors.G}`, `${colors.G1}`, `${colors.G2}`, `${colors.G3}`],
            duration: 48000,
            easing: 'easeOutElastic',
            direction: 'normal',
            loop: true,
        })

        animationRef5.current = anime({
            targets: ['.t12'],
            borderColor: [`${colors.A1}`, `${colors.A2}`, `${colors.A3}`, `${colors.B}`, `${colors.B1}`, `${colors.B2}`, `${colors.B2}`, `${colors.B3}`, `${colors.C}`, `${colors.C1}`, `${colors.C2}`, `${colors.C3}`, `${colors.D}`, `${colors.D1}`, `${colors.D2}`, `${colors.D3}`, `${colors.E}`, `${colors.E1}`, `${colors.E2}`, `${colors.E3}`, `${colors.G}`, `${colors.G1}`, `${colors.G2}`, `${colors.G3}`, `${colors.A}`],
            duration: 48000,
            easing: 'easeOutElastic',
            direction: 'normal',
            loop: true,
        })

        animationRef6.current = anime({
            targets: ['.t13'],
            duration: 48000,
            borderColor: [`${colors.A2}`, `${colors.A3}`, `${colors.B}`, `${colors.B1}`, `${colors.B2}`, `${colors.B2}`, `${colors.B3}`, `${colors.C}`, `${colors.C1}`, `${colors.C2}`, `${colors.C3}`, `${colors.D}`, `${colors.D1}`, `${colors.D2}`, `${colors.D3}`, `${colors.E}`, `${colors.E1}`, `${colors.E2}`, `${colors.E3}`, `${colors.G}`, `${colors.G1}`, `${colors.G2}`, `${colors.G3}`, `${colors.A}`, `${colors.A1}`],
            easing: 'easeOutElastic',
            direction: 'normal',
            loop: true,
        })

        animationRef7.current = anime({
            targets: ['.t14'],
            borderColor: [`${colors.A3}`, `${colors.B}`, `${colors.B1}`, `${colors.B2}`, `${colors.B2}`, `${colors.B3}`, `${colors.C}`, `${colors.C1}`, `${colors.C2}`, `${colors.C3}`, `${colors.D}`, `${colors.D1}`, `${colors.D2}`, `${colors.D3}`, `${colors.E}`, `${colors.E1}`, `${colors.E2}`, `${colors.E3}`, `${colors.G}`, `${colors.G1}`, `${colors.G2}`, `${colors.G3}`, `${colors.A}`, `${colors.A1}`, `${colors.A2}`],
            duration: 48000,
            easing: 'easeOutElastic',
            direction: 'normal',
            loop: true,
        })

        animationRef8.current = anime({
            targets: ['.t15'],
            borderColor: [`${colors.B}`, `${colors.B1}`, `${colors.B2}`, `${colors.B2}`, `${colors.B3}`, `${colors.C}`, `${colors.C1}`, `${colors.C2}`, `${colors.C3}`, `${colors.D}`, `${colors.D1}`, `${colors.D2}`, `${colors.D3}`, `${colors.E}`, `${colors.E1}`, `${colors.E2}`, `${colors.E3}`, `${colors.G}`, `${colors.G1}`, `${colors.G2}`, `${colors.G3}`, `${colors.A}`, `${colors.A1}`, `${colors.A2}`, `${colors.A3}`],
            duration: 48000,
            easing: 'easeOutElastic',
            direction: 'normal',
            loop: true,
        })

        animationRef9.current = anime({
            targets: ['.t16'],
            borderColor: [`${colors.B1}`, `${colors.B2}`, `${colors.B2}`, `${colors.B3}`, `${colors.C}`, `${colors.C1}`, `${colors.C2}`, `${colors.C3}`, `${colors.D}`, `${colors.D1}`, `${colors.D2}`, `${colors.D3}`, `${colors.E}`, `${colors.E1}`, `${colors.E2}`, `${colors.E3}`, `${colors.G}`, `${colors.G1}`, `${colors.G2}`, `${colors.G3}`, `${colors.A}`, `${colors.A1}`, `${colors.A2}`, `${colors.A3}`, `${colors.B}`],
            duration: 48000,
            easing: 'easeOutElastic',
            direction: 'normal',
            loop: true,
        })

        animationRef10.current = anime({
            targets: ['.t17'],
            borderColor: [`${colors.B2}`, `${colors.B2}`, `${colors.B3}`, `${colors.C}`, `${colors.C1}`, `${colors.C2}`, `${colors.C3}`, `${colors.D}`, `${colors.D1}`, `${colors.D2}`, `${colors.D3}`, `${colors.E}`, `${colors.E1}`, `${colors.E2}`, `${colors.E3}`, `${colors.G}`, `${colors.G1}`, `${colors.G2}`, `${colors.G3}`, `${colors.A}`, `${colors.A1}`, `${colors.A2}`, `${colors.A3}`, `${colors.B}`, `${colors.B1}`],
            duration: 48000,
            easing: 'easeOutElastic',
            direction: 'normal',
            loop: true,
        })


        /* BELOW ARE FOR THE GAME WINDOW AT THE CENTER OF THE SCREEN 

        animationRef1.current = anime({
            targets: ['.start'],
            backgroundColor: [`${colors.B2}`, `${colors.B2}`, `${colors.B3}`, `${colors.C}`, `${colors.C1}`, `${colors.C2}`, `${colors.C3}`, `${colors.D}`, `${colors.D1}`, `${colors.D2}`, `${colors.D3}`, `${colors.E}`, `${colors.E1}`, `${colors.E2}`, `${colors.E3}`, `${colors.G}`, `${colors.G1}`, `${colors.G2}`, `${colors.G3}`, `${colors.A}`, `${colors.A1}`, `${colors.A2}`, `${colors.A3}`, `${colors.B}`, `${colors.B1}`],
            duration: 48000,
            easing: 'easeOutElastic',
            direction: 'normal',
            loop: true,
        })

        animationRef2.current = anime({
            targets: ['.game-title'],
            color: [`${colors.B2}`, `${colors.B2}`, `${colors.B3}`, `${colors.C}`, `${colors.C1}`, `${colors.C2}`, `${colors.C3}`, `${colors.D}`, `${colors.D1}`, `${colors.D2}`, `${colors.D3}`, `${colors.E}`, `${colors.E1}`, `${colors.E2}`, `${colors.E3}`, `${colors.G}`, `${colors.G1}`, `${colors.G2}`, `${colors.G3}`, `${colors.A}`, `${colors.A1}`, `${colors.A2}`, `${colors.A3}`, `${colors.B}`, `${colors.B1}`],
            duration: 48000,
            easing: 'easeOutElastic',
            direction: 'normal',
            loop: true,
        }) */

    }, []);


    const animationRefA = React.useRef(null);
    React.useEffect(() => {
        animationRefA.current = anime({
            targets: '.theme',
           // backgroundImage: ['linear-gradient(to right, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #9400D3)',
           //     'linear-gradient(to right, #9400D3, #4B0082, #0000FF, #00FF00, #FFFF00, #FF7F00, #FF0000)' ],
            duration: 4000,
            direction: 'normal',
            loop: true,
            easing: 'linear',
        })
    }, []);

    console.log(gameBoard.current)

    function doSomething(e) {
        console.log(e);
        console.log('s');
        console.log(this)

    }

    return( 
        <div>
            <div className='layer'>
                <div className='theme' onLoad={doSomething(this)} ref={gameBoard}>
                    <div className="card t11"> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="square"  className="fa-icon"/> </div> </div>    <div className='card t11'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div></div>  <div className='card t11'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div></div>  <div className='card t11'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t12'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t12'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t17'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t17'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> 
                    <div className='card t11'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon=""  className="fa-icon"/> </div> </div>   <div className='card t11'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t11'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t12'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t12'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t17'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t17'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>
                    <div className='card t11'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t11'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t12'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t12'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t17'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t17'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> 
                    <div className='card t11'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t12'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t12'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t17'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t17'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>
                    <div className='card t12'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t12'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t17'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t17'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> <div className='card t12'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> 
                    <div className='card t12'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t17'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t17'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t12'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> <div className='card t12'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>
                    <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t17'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t17'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t12'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t12'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> <div className='card t11'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> 
                    <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t17'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t17'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t12'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t12'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t11'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> <div className='card t11'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>
                    <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t17'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t17'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> <div className='card t12'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t12'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t11'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t11'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> <div className='card t11'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> 
                    <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t17'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t17'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t16'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t15'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t14'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t13'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t12'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> <div className='card t12'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>   <div className='card t11'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t11'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>  <div className='card t11'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div> <div className='card t11'> <div className='card-front'></div><div className='card-back'><FontAwesomeIcon icon="coffee"  className="fa-icon"/> </div> </div>
                         
                      
                    
                      
                      
                   {/*<div className='card'> Card</div>   <div className='card'> Card</div>*/}  
                    {/*<div className='card'> Card</div>   <div className='card'> Card</div>  <div className='card'> Card</div>  <div className='card'> Card</div>*/}  
                    {/*<div className='card'> Card</div>   <div className='card'> Card</div>  <div className='card'> Card</div>  <div className='card'> Card</div>*/}
                    {/*<div className='card'> Card</div>   <div className='card'> Card</div>  <div className='card'> Card</div>  <div className='card'> Card</div>*/}
                    
                </div>
            </div>

            <div className='content'>
                <span className="game-title">MEMO</span>
                <button className='start'> Play </button>
            </div>       
        </div>
    )
}

export default Landing;