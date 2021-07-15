import React from 'react';
import '../styles/landing.css';
import '../animations/animeLanding.js';
import ReactDOM from 'react-dom';
import anime from 'animejs/lib/anime.es.js';

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

    const staggering = 40;
    const startBefore = 5000;

    const animationRef = React.useRef(null);
    React.useEffect(() => {
        animationRef.current = anime.timeline({
            //targets: ['.t00, .t01, .t02, .t03, .t04, .t05, .t06, .t07, .t08, .t09'],
            duration: 7000,
            easing: 'linear',
            direction: 'alternate',
            loop: true,
            // taka funckja czeka, aż wszystkie boxy dostaną kolor ostatni z tablicy, a potem działa, znowu czeka, etc... -> Może by to zmienić???
            // Dodaj odpowiednio timeline dla klas "t00, t01, t02 itd..."
        })

        animationRef.current
        .add({
            targets: ['.t00'],
            borderColor: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'],
            delay: anime.stagger(`${staggering}`, {from: 'center'}),
        }, `-=${startBefore}`)
        .add({
            targets: ['.t01'],
            borderColor: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'],
            delay: anime.stagger(`${staggering}`, {from: 'center'}),
        }, `-=${startBefore}`)
        .add({
            targets: ['.t02'],
            borderColor: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'],
            delay: anime.stagger(`${staggering}`, {from: 'center'}),
        }, `-=${startBefore}`)
        .add({
            targets: ['.t03'],
            borderColor: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'],
            delay: anime.stagger(`${staggering}`, {from: 'center'}),
        }, `-=${startBefore}`)
        .add({
            targets: ['.t04'],
            borderColor: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'],
            delay: anime.stagger(`${staggering}`, {from: 'center'}),
        }, `-=${startBefore}`)
        .add({
            targets: ['.t05'],
            borderColor: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'],
            delay: anime.stagger(`${staggering}`, {from: 'center'}),
        }, `-=${startBefore}`)
        .add({
            targets: ['.t06'],
            borderColor: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'],
            delay: anime.stagger(`${staggering}`, {from: 'center'}),
        }, `-=${startBefore}`)
        .add({
            targets: ['.t07'],
            borderColor: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'],
            delay: anime.stagger(`${staggering}`, {from: 'center'}),
        }, `-=${startBefore}`)
        .add({
            targets: ['.t08'],
            borderColor: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'],
            delay: anime.stagger(`${staggering}`, {from: 'center'}),
        }, `-=${startBefore}`)
        .add({
            targets: ['.t09'],
            borderColor: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'],
            delay: anime.stagger(`${staggering}`, {from: 'center'}),
        }, `-=${startBefore}`)
    }, []);


    const animationRef1 = React.useRef(null);
    React.useEffect(() => {
        animationRef1.current = anime({
            targets: '.theme',
            backgroundImage: ['linear-gradient(to right, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #9400D3)',
                'linear-gradient(to right, #9400D3, #4B0082, #0000FF, #00FF00, #FFFF00, #FF7F00, #FF0000)' ],
            duration: 4000,
            direction: 'alternate',
            loop: true,
            easing: 'linear',
        })
    }, []);


    return(
        <div>
            <div className='layer'>
                <div className='theme'>
                    <div className='card t00'> Card</div>   <div className='card t01'> Card</div>  <div className='card t02'> Card</div>  <div className='card t03'> Card</div>  <div className='card t04'> Card</div>   <div className='card t05'> Card</div>  <div className='card t06'> Card</div>  <div className='card t07'> Card</div>  <div className='card t08'> Card</div>   <div className='card t09'> Card</div>  <div className='card'> Card</div>  <div className='card t00'> Card</div>  <div className='card t01'> Card</div>   <div className='card t02'> Card</div>  <div className='card t03'> Card</div>  <div className='card t04'> Card</div> <div className='card t05'> Card</div>   <div className='card t06'> Card</div>  <div className='card t07'> Card</div>  <div className='card t08'> Card</div> <div className='card t09'> Card</div> 
                    <div className='card t01'> Card</div>   <div className='card t02'> Card</div>  <div className='card t03'> Card</div>  <div className='card t04'> Card</div>  <div className='card t05'> Card</div>   <div className='card t06'> Card</div>  <div className='card t07'> Card</div>  <div className='card t08'> Card</div>  <div className='card t09'> Card</div>   <div className='card t08'> Card</div>  <div className='card'> Card</div>  <div className='card t01'> Card</div>   <div className='card t02'> Card</div>  <div className='card t03'> Card</div>  <div className='card t04'> Card</div>  <div className='card t05'> Card</div> <div className='card t06'> Card</div>   <div className='card t07'> Card</div>  <div className='card t08'> Card</div>  <div className='card t09'> Card</div> <div className='card t08'> Card</div>
                    <div className='card t02'> Card</div>   <div className='card t03'> Card</div>  <div className='card t04'> Card</div>  <div className='card t05'> Card</div>  <div className='card t06'> Card</div>   <div className='card t07'> Card</div>  <div className='card t08'> Card</div>  <div className='card t09'> Card</div>  <div className='card t08'> Card</div>   <div className='card t07'> Card</div>  <div className='card'> Card</div>  <div className='card t02'> Card</div>  <div className='card t03'> Card</div>   <div className='card t04'> Card</div>  <div className='card t05'> Card</div>  <div className='card t06'> Card</div> <div className='card t07'> Card</div>   <div className='card t08'> Card</div>  <div className='card t09'> Card</div>  <div className='card t08'> Card</div> <div className='card t07'> Card</div> 
                    <div className='card t03'> Card</div>   <div className='card t04'> Card</div>  <div className='card t05'> Card</div>  <div className='card t06'> Card</div>  <div className='card t07'> Card</div>   <div className='card t08'> Card</div>  <div className='card t09'> Card</div>  <div className='card t08'> Card</div>  <div className='card t07'> Card</div>   <div className='card t06'> Card</div>  <div className='card'> Card</div>  <div className='card t03'> Card</div>   <div className='card t04'> Card</div>  <div className='card t05'> Card</div>  <div className='card t06'> Card</div>  <div className='card t07'> Card</div> <div className='card t08'> Card</div>   <div className='card t09'> Card</div>  <div className='card t08'> Card</div>  <div className='card t07'> Card</div> <div className='card t06'> Card</div>
                    <div className='card t04'> Card</div>   <div className='card t05'> Card</div>  <div className='card t06'> Card</div>  <div className='card t07'> Card</div>  <div className='card t08'> Card</div>   <div className='card t09'> Card</div>  <div className='card t08'> Card</div>  <div className='card t07'> Card</div>  <div className='card t06'> Card</div>   <div className='card t05'> Card</div>  <div className='card'> Card</div>  <div className='card t04'> Card</div>  <div className='card t05'> Card</div>   <div className='card t06'> Card</div>  <div className='card t07'> Card</div>  <div className='card t08'> Card</div> <div className='card t09'> Card</div>   <div className='card t08'> Card</div>  <div className='card t07'> Card</div>  <div className='card t06'> Card</div> <div className='card t05'> Card</div> 
                    <div className='card t05'> Card</div>   <div className='card t06'> Card</div>  <div className='card t07'> Card</div>  <div className='card t08'> Card</div>  <div className='card t09'> Card</div>   <div className='card t08'> Card</div>  <div className='card t07'> Card</div>  <div className='card t06'> Card</div>  <div className='card t05'> Card</div>   <div className='card t04'> Card</div>  <div className='card'> Card</div>  <div className='card t05'> Card</div>   <div className='card t06'> Card</div>  <div className='card t07'> Card</div>  <div className='card t08'> Card</div>  <div className='card t09'> Card</div> <div className='card t08'> Card</div>   <div className='card t07'> Card</div>  <div className='card t06'> Card</div>  <div className='card t05'> Card</div> <div className='card t04'> Card</div>
                    <div className='card t06'> Card</div>   <div className='card t07'> Card</div>  <div className='card t08'> Card</div>  <div className='card t09'> Card</div>  <div className='card t08'> Card</div>   <div className='card t07'> Card</div>  <div className='card t06'> Card</div>  <div className='card t05'> Card</div>  <div className='card t04'> Card</div>   <div className='card t03'> Card</div>  <div className='card'> Card</div>  <div className='card t06'> Card</div>  <div className='card t07'> Card</div>   <div className='card t08'> Card</div>  <div className='card t09'> Card</div>  <div className='card t08'> Card</div> <div className='card t07'> Card</div>   <div className='card t06'> Card</div>  <div className='card t05'> Card</div>  <div className='card t04'> Card</div> <div className='card t03'> Card</div> 
                    <div className='card t07'> Card</div>   <div className='card t08'> Card</div>  <div className='card t09'> Card</div>  <div className='card t08'> Card</div>  <div className='card t07'> Card</div>   <div className='card t06'> Card</div>  <div className='card t05'> Card</div>  <div className='card t04'> Card</div>  <div className='card t03'> Card</div>   <div className='card t02'> Card</div>  <div className='card'> Card</div>  <div className='card t07'> Card</div>   <div className='card t08'> Card</div>  <div className='card t09'> Card</div>  <div className='card t08'> Card</div>  <div className='card t07'> Card</div> <div className='card t06'> Card</div>   <div className='card t05'> Card</div>  <div className='card t04'> Card</div>  <div className='card t03'> Card</div> <div className='card t02'> Card</div>
                    <div className='card t08'> Card</div>   <div className='card t09'> Card</div>  <div className='card t08'> Card</div>  <div className='card t07'> Card</div>  <div className='card t06'> Card</div>   <div className='card t05'> Card</div>  <div className='card t04'> Card</div>  <div className='card t03'> Card</div>  <div className='card t02'> Card</div>   <div className='card t01'> Card</div>  <div className='card'> Card</div>  <div className='card t08'> Card</div>  <div className='card t09'> Card</div>   <div className='card t08'> Card</div>  <div className='card t07'> Card</div>  <div className='card t06'> Card</div> <div className='card t05'> Card</div>   <div className='card t04'> Card</div>  <div className='card t03'> Card</div>  <div className='card t02'> Card</div> <div className='card t01'> Card</div> 
                    <div className='card t09'> Card</div>   <div className='card t08'> Card</div>  <div className='card t07'> Card</div>  <div className='card t06'> Card</div>  <div className='card t05'> Card</div>   <div className='card t04'> Card</div>  <div className='card t03'> Card</div>  <div className='card t02'> Card</div>  <div className='card t01'> Card</div>   <div className='card t00'> Card</div>  <div className='card'> Card</div>  <div className='card t09'> Card</div>   <div className='card t08'> Card</div>  <div className='card t07'> Card</div>  <div className='card t06'> Card</div>  <div className='card t05'> Card</div> <div className='card t04'> Card</div>   <div className='card t03'> Card</div>  <div className='card t02'> Card</div>  <div className='card t01'> Card</div> <div className='card t00'> Card</div>
                         
                      
                    
                      
                      
                   {/*<div className='card'> Card</div>   <div className='card'> Card</div>*/}  
                    {/*<div className='card'> Card</div>   <div className='card'> Card</div>  <div className='card'> Card</div>  <div className='card'> Card</div>*/}  
                    {/*<div className='card'> Card</div>   <div className='card'> Card</div>  <div className='card'> Card</div>  <div className='card'> Card</div>*/}
                    {/*<div className='card'> Card</div>   <div className='card'> Card</div>  <div className='card'> Card</div>  <div className='card'> Card</div>*/}
                    
                </div>
            </div>

            <div className='content'>
                <span className="game-title">MEMO</span>
                <button className='start'> Start </button>
            </div>       
        </div>
    )
}

export default Landing;