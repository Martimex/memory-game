import { icon } from '@fortawesome/fontawesome-svg-core';
import { get, random, set } from 'animejs';
import anime from 'animejs/lib/anime.es.js';
import { useRef } from 'react/cjs/react.development';
import Game from './components/game.js';
import levels from './levels.js';
//import { tiles, foundTiles } from './components/game.js';
//let gameboard = useRef(null);

// #1 WINNING CONDITION :  if(foundTiles+2 === tiles) equals true
// #2 IF TWO CARDS MATCH:  if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1])
// #3 GET THE RIGHT TILE'S CHILD NODES [NOT #TEXT AND SUCH] BY A TARGET CLASS: 
      /* let target = document.querySelector(.target-1); targetTile.querySelector('.tile-back'); */
// #4 DO SOME STUFF ONLY FOR TILES THAT HAS NOT BEEN FOUND YET : allTiles.forEach(tile => {if(tile.style.visibility !== 'hidden') **some stuff here** })
// #5 BLOCK CLICK EVENTS FOR TILES :  document.querySelector('.board').dataset.animation = 'on';   -> REMEMBER TO CHANGE IT TO 'OFF' AFTER ALL
// #6 GRAB ANIMATION CONTAINER:  const animationContainer = document.querySelector('.animationContainer');

const flags = {
    
    // LVL 1
    loadBorders_1: function() {
        //document.querySelector('.board').dataset.animation = 'off'
        anime({
            targets: '.tile',
            duration: 1600,
            borderColor: ['hsl(4, 87%, 62%)', 'hsl(45, 50%, 80%)'],
            //loop: true,
            direction: 'alternate',
        })
        //console.log('eigjiepg')
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

    removeBordersMark_1: function() {
        anime({
            targets: '.target',
            delay: 400,
            duration: 2000,
            borderColor: ['hsl(45, 50%, 80%)', 'hsl(4, 87%, 62%)'],
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
            duration: 3000,
            backgroundColor: 'hsl(199, 70%, 52%)',
        })
    },

    removeColorBackground_2: function() {
        anime({
            targets: '.target',
            delay: 1000,
            duration: 2000,
            backgroundColor: ['hsl(199, 70%, 52%)', 'rgba(72,129,199,0)'],
            easing: 'linear',
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
        /* anime({
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
        })  DISABLED ONLY FOR DEVELOPMENT PURPOSES*/ 
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

    removeTargetShadow_4: function() {
        anime({
            targets: '.target',
            delay: 700,
            duration: 2000,
            boxShadow: ['6px -6px 0px 2px hsla(50, 90%, 50%, 90%)', '6px -6px 0px 2px hsla(142, 0%, 0%, 70%)'],
        })
    },

    changeRepeatedBg_4: function(cardsOpened, tiles, foundTiles) {
        console.log(tiles);
        console.log(foundTiles);
        if(foundTiles+2 === tiles) {  // it's async, so append value right away
            async function waitFinish() {
                const wait = anime ({
                    targets: '.board',
                    duration: 1000,
                    skewY: '0deg',
                    loop: false,
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


    // LVL 5

    skewTo0Deg_5: function() {
        document.querySelector('.bg-5').style = 'background-image: unset';
        anime({
            targets: '.board',
            duration: 1000,
            skewY: '0deg',
            loop: false,
        })
    },

    addTilesIdentifer_5: function(cardsOpened, tiles, foundTiles) {
        console.log(tiles);
        let allTiles = document.querySelectorAll('.tile');
        for(let i=0; i<tiles/2; i++) {
            allTiles[i].classList.add('tileType1');
        }
        for(let j=(tiles/2); j<tiles; j++) {
            allTiles[j].classList.add('tileType2');
        } 
    },

    resetIcons_5: function(cardsOpened, tiles, foundTiles) {
        const allTiles = document.querySelectorAll('.tile');
        let iconsArr = [];
        let tileTypeArr1 = [];
        let tileTypeArr2 = [];
        let randomizedElems1 = [];
        let randomizedElems2 = [];
        //console.log(allTiles[0].childNodes[2].childNodes[0].classList[1]);
        for(let a=0; a<tiles; a++) {
            iconsArr.push(allTiles[a].childNodes[2].childNodes[0]);
        }
        //console.log(iconsArr);
        function sortSvgs(array) {
            let compareArr = [];
            for(let x=0; x<array.length; x++) {
                compare(array[x], compareArr);
            }
            return compareArr;
        }

        function compare(item, compareArr) {
            compareArr.unshift(item);
            if(compare.length > 1) {
                for(let y=1; y<compareArr.length; y++) {
                    if(item.classList[1] > compareArr[y].classList[1]) {
                        let z = compareArr[y];
                        compareArr[y] = compareArr[y-1];
                        compareArr[y-1] = z;
                    }
                }
            } else {
                return compareArr;
            }
        }

        let sortediconsArr = sortSvgs(iconsArr);

        //console.log('112345');
        //console.log(comp);
        //console.log(iconsArr);
        //console.log(allTiles);
        for(let b=0; b<tiles; b++) {
            if(b%2) {
                tileTypeArr1.push(sortediconsArr[b]);
                /*tileTypeArr1[Math.floor(b/2)].classList.add('tileType1');*/
            } else { tileTypeArr2.push(sortediconsArr[b]);  /*tileTypeArr2[Math.floor(b/2)].classList.add('tileType2');*/ }
        }
        const tileType1 = document.querySelectorAll('.tileType1');
        const tileType2 = document.querySelectorAll('.tileType2');
        //console.log(tileType1)
        for(let c=0; c<(tiles/2); c++) {
            let rand = Math.floor(Math.random() * tileTypeArr1.length);
            //console.log(tileType1[c].childNodes[2].childNodes[0]);
            //console.log(tileTypeArr1[rand]);
            randomizedElems1.push(tileTypeArr1[rand]);
            tileTypeArr1.splice(rand, 1);
        }
        for(let d=0; d<(tiles/2); d++) {
            let rand = Math.floor(Math.random() * tileTypeArr2.length);
            randomizedElems2.push(tileTypeArr2[rand]);
            tileTypeArr2.splice(rand, 1);
        }  

        for(let h=0; h<allTiles.length; h++) {
            allTiles[h].childNodes[2].childNodes[0].remove();
        }

        tileType1.forEach((tile, index) => {
            //console.log(tile);
            tile.childNodes[2].appendChild(randomizedElems1[index])
        })

        tileType2.forEach((tile, index) => {
            tile.childNodes[2].appendChild(randomizedElems2[index])
        })
    },

    createAnimatedDots_5: function() {
        let animationContainer = document.querySelector('.animationContainer');
        let dots = [];
        for(let i=0; i<40; i++) {
            let dot = document.createElement('div');
            let topv = Math.floor(Math.random()*90)+1;
            let leftv = Math.floor(Math.random()*90)+1;
           // console.log(topv)
            dot.classList.add('dot-g');
            animationContainer.appendChild(dot);
            let thisdot = document.querySelector(`.dot-g:nth-child(${i+1})`);
            dots.push(thisdot);
            console.log(thisdot);
           // dot.style = `absolute;`;
            dot.setAttribute('style', `top:${topv}%;left:${leftv}%;`); // = ` ${topv};`;//topv; //style.top = `19%`;
           // dot.left = `${leftv};`; // = `41%`;
            //thisdot.style += `left: ${Math.floor(Math.random() * 90)+1}%`;
        }

        anime({
            targets: '.dot-g',
            duration: 7000,
            backgroundColor: ['hsl(122, 66%, 32%)', 'hsl(352, 86%, 62%)'],
            delay: anime.stagger(120),
            opacity: ['0.4', '0.8'],
            translateY: [0, '16rem'],
            translateX: [0, '10rem'],
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: true,
        })
    },

    /* animateLevelInfo_5: function() {
        anime({
            targets: ['.level-5', '.score-5', '.counter-5'],
            duration: 3000,
            opacity: [0, 1],
            direction: 'alternate',
            loop: true,
        })
    },  REMOVED BECAUSE IT INVOLVES BUGS */

    hideFirstType_5: function(cardsOpened, tiles, foundTiles) {
        const firstType = document.querySelectorAll('.tileType1');
        const secondType = document.querySelectorAll('.tileType2');

/*         secondType.forEach(type => {
            type.style += 'pointer-events: auto;';
        }) */

        document.querySelector('.board').dataset.animation = 'on';

        async function wait() {
            const a1 = anime({
                targets: [firstType, 'svg'],
                delay: 1000,
                duration: 1000,
                borderColor: ['hsl(122, 86%, 32%)', 'hsl(0, 0%, 0%)'],
                opacity: 0,
                //pointerEvents: ['none', 'none'],
                //visibility: 'hidden',
                easing: 'linear',
            })
    
            const a2 = anime({
                targets: [secondType, 'svg'],
                delay: 1000,
                duration: 1000,
                borderColor: ['hsl(0, 0%, 0%)', 'hsl(122, 86%, 32%)'],
                opacity: 1,
                //pointerEvents: ['auto', 'auto'],
                //visibility: 'visible',
                easing: 'linear',
            })

            Promise.all([a1, a2]);
        }

        wait().then(() => {
            setTimeout(() => {
/*                 firstType.forEach(type => {
                    type.style += 'pointer-events: none;';
                }) */
                document.querySelector('.board').dataset.animation = 'off';
            }, 2000);
        })

    },

    hideSecondType_5: function(cardsOpened, tiles, foundTiles) {
        const secondType = document.querySelectorAll('.tileType2');
        const firstType = document.querySelectorAll('.tileType1');

/*         firstType.forEach(type => {
            type.style += 'pointer-events: auto;';
        })
 */
        document.querySelector('.board').dataset.animation = 'on';

        async function wait() {
            const a1 = anime({
                targets: [secondType, 'svg'],
                delay: 1000,
                duration: 1000,
                borderColor: ['hsl(122, 86%, 32%)', 'hsl(0, 0%, 0%)'],
                opacity: 0,
                //pointerEvents: ['none', 'none'],
                //visibility: 'hidden',
                easing: 'linear',
            })
    
    
            const a2 = anime({
                targets: [firstType, 'svg'],
                delay: 1000,
                duration: 1000,
                borderColor: ['hsl(0, 0%, 0%)', 'hsl(122, 86%, 32%)'],
                opacity: 1,
                //pointerEvents: ['auto', 'auto'],
                //visibility: 'visible',
                easing: 'linear',
            });

            Promise.all([a1, a2]);
        }

        wait().then(() => {
            setTimeout(() => {
/*                 secondType.forEach(type => {
                    type.style += 'pointer-events: none;';
                }) */
                document.querySelector('.board').dataset.animation = 'off';
            }, 2000);
        })
    },

    generateNewDots_5: function(cardsOpened, tiles, foundTiles, iter) {
        //console.log('IVALUE: '+iter.value);
        //console.log('TILES: '+tiles);
        //console.log('FOUND: '+foundTiles);
        let animationContainer = document.querySelector('.animationContainer');
        if((parseInt(tiles/4) <= parseInt(foundTiles)) && (iter.value < 1)) {
            iter.value = 1;
            //console.log('ITER:::: '+iter);
            for(let i=0; i<20; i++) {
                let dot = document.createElement('div');
                let topv = Math.floor(Math.random()*90)+1;
                let leftv = Math.floor(Math.random()*90)+1;
                dot.classList.add('dot-g-4');
                animationContainer.appendChild(dot);
                dot.setAttribute('style', `top:${topv}%;left:${leftv}%;`); // = ` ${topv};`;//topv; //style.top = `19%`;
            }
            anime({
                targets: '.dot-g-4',
                duration: 7000,
                backgroundColor: ['hsl(122, 66%, 32%)', 'hsl(352, 86%, 62%)'],
                delay: anime.stagger(120),
                opacity: ['0.4', '0.8'],
                translateY: [0, '-16rem'],
                translateX: [0, '-10rem'],
                direction: 'alternate',
                easing: 'easeInOutSine',
                loop: true,
            })
        }
        else if((parseInt(tiles/2) <= parseInt(foundTiles)) && (iter.value < 2)) {
            iter.value = 2;
            //console.log('ITER:::: '+iter);
            for(let i=0; i<20; i++) {
                let dot = document.createElement('div');
                let topv = Math.floor(Math.random()*90)+1;
                let leftv = Math.floor(Math.random()*90)+1;
                dot.classList.add('dot-g-2');
                animationContainer.appendChild(dot);
                dot.setAttribute('style', `top:${topv}%;left:${leftv}%;`); // = ` ${topv};`;//topv; //style.top = `19%`;
            }
            anime({
                targets: '.dot-g-2',
                duration: 5000,
                backgroundColor: ['hsl(22, 66%, 32%)', 'hsl(122, 66%, 32%)'],
                delay: anime.stagger(120),
                opacity: ['0.4', '0.8'],
                translateY: [0, '20rem'],
                translateX: [0, '20rem'],
                rotate: 90,
                direction: 'alternate',
                easing: 'easeInOutSine',
                loop: true,
            })
        }
    }, 



    // LVL 6

    resetBgImg_6: function(cardsOpened, tiles, foundTiles, iter) {
        iter.value = 0;
        document.querySelector('.bg-6').style = '';
    },

    rotateBoard_6: function(cardsOpened, tiles, foundTiles, iter) {
        let game = document.querySelector('.game-6');
        let board = document.querySelector('.board-6');
        let spinningBox = document.createElement('div');
        spinningBox.classList.add('spinning');
        //spinningBox.style = //'position: absolute; width: 100%; height: 100%;';
        game.appendChild(spinningBox);
        spinningBox.appendChild(board);
        const rotation = anime({
            targets: spinningBox,
            duration: 14000,
            keyframes:[
                {rotate: [0, 90]},
                {rotate: [90, 180]},
                {rotate: [180, 270]},
                {rotate: [270, 360]},
            ],
            easing: 'easeOutExpo',
            direction: 'alternate',
            loop: true,
        });
        //flags.check_6(rotation, tiles, foundTiles);
        //iter.value++;

    },

    check_6: function(rotation, tiles, foundTiles) {
        if(foundTiles+2 === tiles) {
            console.log('Would it pause then ?')
            rotation.pause();
            document.querySelector('.board-6').onclick = rotation.pause();
        }  
    },

    createTornados_6: function() {
        const animationContainer = document.querySelector('.animationContainer');
        for(let i=0; i<4; i++) {
            let tornado = document.createElement('div');
            tornado.classList.add('tornado', `tornado-${i+1}`);
            animationContainer.appendChild(tornado);
            for(let x=0; x<9; x++) {
                let tornadoElem = document.createElement('div');
                tornadoElem.classList.add('tornado-elem');
                tornado.appendChild(tornadoElem);
            }
        }
    },

    rotateTornados_6: function() {
        anime({
            targets: `.tornado-1`,
            duration: 4800,
            rotate: 360,
            easing: 'linear',
            loop: true,
        })

        anime({
            targets: `.tornado-2`,
            duration: 6200,
            rotate: -360,
            easing: 'linear',
            loop: true,
        })

        anime({
            targets: `.tornado-3`,
            duration: 6200,
            rotate: -360,
            easing: 'linear',
            loop: true,
        })

        anime({
            targets: `.tornado-4`,
            duration: 4800,
            rotate: 360,
            easing: 'linear',
            loop: true,
        })

    },

    animateTarget_6: function() {
        anime({
            targets: '.target',
            duration: 6400,
            keyframes: [
                {backgroundImage: ['radial-gradient(hsl(52, 80%, 60%) 20%, hsl(29, 80%, 60%) 45%, hsl(282, 80%, 40%))', 'radial-gradient(hsl(29, 80%, 60%) 20%, hsl(52, 80%, 60%) 45%, hsl(282, 80%, 40%))']},
                {backgroundImage: 'radial-gradient(hsl(52, 80%, 60%) 20%, hsl(29, 80%, 60%) 45%, hsl(282, 80%, 40%))'},
                {backgroundImage: 'radial-gradient(hsl(29, 80%, 60%) 20%, hsl(52, 80%, 60%) 45%, hsl(282, 80%, 40%))'},
                {backgroundImage: 'radial-gradient(hsl(52, 80%, 60%) 20%, hsl(29, 80%, 60%) 45%, hsl(282, 80%, 40%))'},
            ],
            loop: false,
        })
    },

    animateMatch_6: function(cardsOpened, tiles, foundTiles, iter) {
        console.log('ITER NEW VALUE::: '+iter.value)
        if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) {
            anime({
                targets: [cardsOpened[0], cardsOpened[1]],
                duration: 1800,
                backgroundImage: 'radial-gradient(hsl(67, 80%, 60%) 20%, hsl(44, 80%, 60%) 45%, hsl(297, 80%, 60%))',
            })

            //let b7 = document.querySelector('.board-6');
        }
    },

    isGameFinished_6: function(cardsOpened, tiles, foundTiles, iter) {
        if(foundTiles+2 === tiles) {
            anime({
                targets: '.target',
                duration: 500,
                opacity: [0.5, 0],
                easing: 'linear',
            });
            let randomDiv = document.createElement('div');
            let game = document.querySelector('.game');
            let board = document.querySelector('.board');
            game.appendChild(board);
            let spinningBox = document.querySelector('.spinning');
            randomDiv.appendChild(spinningBox);
            randomDiv.remove();
        }
    },



    // LVL 7

    resetRotatingBoard_7: function() {
        // TEMPORARY. PLEASE TEMOVE IT DURING PRODUCTION
        let randomDiv = document.createElement('div');
        let game = document.querySelector('.game');
        let board = document.querySelector('.board');
        game.appendChild(board);
        let spinningBox = document.querySelector('.spinning');
        randomDiv.appendChild(spinningBox);
        randomDiv.remove(); 
    },

    changeAllIconColors_7: function(cardsOpened, tiles, foundTiles, iter) {
        iter.value++;
        if(iter.value%4 === 0) {
            let svgs = document.querySelectorAll('svg');
            console.log(svgs);
            svgs.forEach(svg => {
                let hue = Math.floor(Math.random() * 360)+1;
                let saturate  = Math.floor(Math.random() * 80)+11;
                let lightness = Math.floor(Math.random() * 80)+11;
                svg.style = `color: hsl(${hue}, ${saturate}%, ${lightness}%);`;
                let back = svg.parentNode;
                back.setAttribute('backgroundImage', `radial-gradient(hsl(52, 80%, 60%) 20%, hsl(29, 80%, 0%) 25%, hsl(${hue}, 50%, 50%))`); 
            });
        }
    },

    addAnimationBoxes_7: function(cardsOpened, tiles, foundTiles, iter) {
        const animationContainer = document.querySelector('.animationContainer');
        for(let i=0; i<2; i++) {
            let animationBox = document.createElement('div');
            animationBox.classList.add('animationBox', `animationBox-${i+1}`);
            animationContainer.appendChild(animationBox);
        }

        for(let i=0; i<2; i++) {
            let animationBoxInner = document.createElement('div');
            animationBoxInner.classList.add('animationBoxInner', `animationBoxInner-${i+1}`);
            animationContainer.appendChild(animationBoxInner);
        }


        anime({
            targets: '.animationBox-1',
            duration: 14400,
            keyframes: [
                {translateY: 0, translateX: '87vw', scale: ['100%', '200%'], duration: 5000},
                {translateY: '80vh', translateX: '87vw', scale: ['200%', '100%'], duration: 3000},
                {translateY: '80vh', translateX: '0vw',  scale: ['100%', '200%'],  duration: 5000},
                {translateY: 0, translateX: 0,  scale: ['200%', '100%'], duration: 3000},
            ],
            easing: 'linear',
            loop: true,
        })

        anime({
            targets: '.animationBoxInner-1',
            duration: 14400,
            keyframes: [
                {translateY: 0, translateX: '77vw', scale: ['100%', '200%'], duration: 3500},
                {translateY: '70vh', translateX: '77vw', scale: ['200%', '100%'], duration: 2500},
                {translateY: '70vh', translateX: '0vw',  scale: ['100%', '200%'],  duration: 3500},
                {translateY: 0, translateX: 0,  scale: ['200%', '100%'], duration: 2500},
            ],
            easing: 'linear',
            loop: true,
        })

        anime({
            targets: '.animationBox-2',
            duration: 14400,
            keyframes: [
                {translateY: 0, translateX: '-87vw', scale: ['200%', '100%'], duration: 5000},
                {translateY: '-80vh', translateX: '-87vw', scale: ['100%', '200%'], duration: 3000},
                {translateY: '-80vh', translateX: '0vw', scale: ['200%', '100%'], duration: 5000},
                {translateY: 0, translateX: 0,  scale: ['100%', '200%'], duration: 3000},
            ],
            easing: 'linear',
            loop: true,
        })

        anime({
            targets: '.animationBoxInner-2',
            duration: 14400,
            keyframes: [
                {translateY: 0, translateX: '-77vw', scale: ['100%', '200%'], duration: 3500},
                {translateY: '-70vh', translateX: '-77vw', scale: ['200%', '100%'], duration: 2500},
                {translateY: '-70vh', translateX: '0vw',  scale: ['100%', '200%'],  duration: 3500},
                {translateY: 0, translateX: 0,  scale: ['200%', '100%'], duration: 2500},
            ],
            easing: 'linear',
            loop: true,
        })
    },

    colorAnimationBoxes_7: function(cardsOpened, tiles, foundTiles, iter) {
        let targetTile;
        let selector;
        if(cardsOpened.length <= 1) {  // Jeśli kolorujemy większe pudełko
            if(iter.value%2 > 0) {  // Jeśli to jest pierwsza, lub każda nieparzysta tura
                targetTile = document.querySelector('.target-1');
                selector = '.animationBox-1';
            }
            else {
                targetTile = document.querySelector('.target-1');
                selector = '.animationBox-2';
            }
        }

        else {
            if(iter.value%2 > 0) {
                targetTile = document.querySelector('.target-2');
                selector = '.animationBoxInner-1';
            }
            else {
                targetTile = document.querySelector('.target-2');
                selector = '.animationBoxInner-2';
            }
        }

        let newColor = targetTile.querySelector('.tile-back');
        let color = newColor.getAttribute('backgroundImage');
        if(color) {
            color = color.replace('(hsl(52, 80%, 60%)', '(hsla(5, 0%, 0%, 70%)');
        }

        anime({
            targets: selector,
            duration: 2000,
            backgroundImage:  color,
            loop: false,
            easing: 'linear',
        })
    },

    winAnimation_7: function(cardsOpened, tiles, foundTiles, iter) {
        if(foundTiles+2 === tiles) {
            anime({
                targets: ['.animationBox', '.animationBoxInner'],
                duration: 12200,
                keyframes: [
                    {scale: ['0%', '350%'], duration: 4000},
                    {scale: ['350%', '100%'], duration: 8000},
                ],
                delay: anime.stagger(1000),
                opacity: [1, 0],
                easing: 'easeInOutQuint',
            })
        }
    },



    // LVL 8 

    blockRedTilesClick_8: function(cardsOpened, tiles, foundTiles, iter) {
        // CARDS OPENED IS PASSED BY VALUE, NOT BY REFERENCE SO MODYFING IT HERE HAS NO EFFECT FOR GAME COMPONENT. FIND ALTERNATIVE APPROACH FOR THISFUNC
 
        let allTiles = document.querySelectorAll('.tile');
        let redTiles = [];
        allTiles.forEach(tile => {
            let svg = tile.querySelector('svg');
            let svgColor = svg.style.color;
            if(svgColor === 'rgb(230, 105, 76)')  { // if red
                tile.style = 'pointer-events: none;';
            }
        })

        /* let target;
        iter.value++;
        console.log(cardsOpened.length)
        if(cardsOpened.length <= 1) { // first card
            //target = cardsOpened[0].parentNode;
            target = document.querySelector('.target-1');
        } else { // second card border checking
            //target = cardsOpened[1].parentNode;
            target = document.querySelector('.target-2');
        }

        let svg = target.querySelector('svg');

        console.log(svg.style.borderColor);
        console.log(target)
        if(svg.style.borderColor === 'rgb(230, 105, 76)') {  // if the color is red
            //document.querySelector('.board').dataset.animation = 'on';
            async function revertRed() {
                const a1 = anime({
                    targets: target,
                    duration: 500,
                    rotateY: '0deg',
                    scale: '200%',
                    easing: 'linear',
                }) 
                console.log('cardsOpened elem removed');
               // Promise.all([a1]);
            } 
            revertRed().then(() => {
                while(cardsOpened.length > 0) {
                    cardsOpened.pop(); 
                } 
                console.log('successfull');
                //document.querySelector('.board').dataset.animation = 'off';
                target.classList.remove('target-1');
                target.classList.remove('target-2');
                console.log('flag length:  '+cardsOpened.length)
                return cardsOpened;
            })
        }

        else{
            console.log('cardsOpened remain untouched');
            return cardsOpened;
        } */
    },

    setColorfulBorders_8: function(cardsOpened, tiles, foundTiles, iter) {
        let allTiles = document.querySelectorAll('.tile');
        //let activeTiles = 0;  // this variable indicates the number of visible tiles
        // Remember that all found tiles exists; they are just not visible
        let existingTiles = [];
        allTiles.forEach(tile => {
            if((tile.style.visibility !== 'hidden') && (!(tile.classList.contains('target')))) {
                existingTiles.push(tile);
                //activeTiles++;
            }
        })
        //console.log(existingTiles);

        // Now spread out existingTiles array between green and red borders (half and half)
        let greenTiles = [];
        let activeTiles = existingTiles.length;
        //console.log(activeTiles);
        
        for(let x=0; x<(activeTiles/2); x++) {
            let rand = Math.floor(Math.random() * existingTiles.length);
            greenTiles.push(existingTiles[rand]);
            existingTiles.splice(rand, 1);
        }

        let redTiles = [...existingTiles];
        //console.log(existingTiles);

        for(let y=0; y<greenTiles.length; y++) {
            let svg = greenTiles[y].querySelector('svg');
            svg.style = 'color: hsl(110, 75%, 60%); border-color: hsl(110, 75%, 60%);'
            greenTiles[y].style = 'border: .8rem solid hsla(110, 93%, 29%, 20%);';
        }

        for(let z=0; z<redTiles.length; z++) {
            let svg = redTiles[z].querySelector('svg');
            svg.style = 'color: hsl(11, 75%, 60%); border-color: hsl(11, 75%, 60%);';
            redTiles[z].style = 'border: .8rem solid hsla(11, 93%, 29%, 20%); backgroundImage: radial-gradient(hsla(11, 80%, 60%, 80%) 20%, hsl(33, 80%, 80%) 75%, hsla(55, 80%, 60%, 60%));';
        }

        anime({
            targets: greenTiles,
            duration: 1600,
            easing: 'easeInOutCirc',
            backgroundImage: ['radial-gradient(hsla(110, 80%, 60%, 30%) 20%, hsl(33, 80%, 80%) 75%, hsla(55, 80%, 60%, 20%))', 'radial-gradient(hsla(110, 80%, 60%, 80%) 20%, hsl(33, 80%, 80%) 75%, hsla(55, 80%, 60%, 60%))'],
            /*rotate: 180, That seems quite fun*/
        })

        if((cardsOpened.length < 2) || ((cardsOpened[0].childNodes[0].classList[1] !== cardsOpened[1].childNodes[0].classList[1]))) {
            anime({
                targets: redTiles,
                duration: 1600,
                easing: 'easeInOutCirc',
                rotate: -90,
                filter: 'sepia(30%)',
                /*rotateX: 180,*/
            })
        }

        else {
            anime({
                targets: redTiles,
                duration: 1600,
                easing: 'easeInOutCirc',
                rotate: 270,
                filter: 'sepia(30%)',
                /*rotateX: 180,*/
            })
        }

    },

    lastPairTurnGreen_8: function(cardsOpened, tiles, foundTiles, iter) {
        if((foundTiles+4 === tiles) || (foundTiles+2 === tiles)) {  // last pair before win has to be green of course
            let allTiles = document.querySelectorAll('.tile');
            let lastPair = [];
            allTiles.forEach(tile => {
                if(tile.style.visibility !== 'hidden') {
                    lastPair.push(tile);
                }
            })
            for(let m=0; m<lastPair.length; m++) {
                let svg = lastPair[m].querySelector('svg');
                svg.style = 'color: hsl(110, 75%, 60%); border-color: hsl(110, 75%, 60%);'
                lastPair[m].style = 'border: .8rem solid hsla(110, 93%, 29%, 20%); radial-gradient(hsla(110, 80%, 60%, 80%) 20%, hsl(33, 80%, 80%) 75%, hsla(55, 80%, 60%, 60%));';
            }
        }
    },




    // LVL 9
    
    createMutatingBox_9: function(cardsOpened, tiles, foundTiles, iter) {
        const animationContainer = document.querySelector('.animationContainer');
        

        let mutatingBox = document.createElement('div');
        mutatingBox.classList.add('mutatingBox');

        let mbText = document.createElement('div');
        mbText.classList.add('mbText');


        mutatingBox.appendChild(mbText);
        animationContainer.appendChild(mutatingBox);

        anime({
            targets: mutatingBox,
            duration: 2200,
            scale: '140%',
            easing: 'easeInBounce',
        })
    },

    enlargeIcons_9: function(cardsOpened,tiles,foundTiles, iter) {

        iter.value = 2.5;

        let iconsArr = [];
        let allIcons = document.querySelectorAll('.fa-icon-9');
        allIcons.forEach(icon => iconsArr.push(icon));

        console.log(iconsArr);

        anime({
            targets: iconsArr,
            duration: 2100,
            scale: ['10%', '100%'],
            //fontSize: ['0.8rem', '2.5rem'],
            delay: anime.stagger(50, {from: 'center'}),  // Don't do that at home
            easing: 'easeInOutExpo',
        })
    },

    checkIconModify_9: function(cardsOpened, tiles, foundTiles, iter) {

        let allIcons = document.querySelectorAll('.fa-icon-9');

        function setIconsColor(iter) {
            if(iter.value >= 2) { //blue
                anime({ targets: allIcons, duration: 1000, fontSize: `${iter.value}rem`,
                    color: 'hsla(194, 70%, 30%, 0.6)', 
                })
            } else if(iter.value >= 1.5) {  //green
                anime({ targets: allIcons, duration: 1000, fontSize: `${iter.value}rem`,
                    color: 'hsla(102, 70%, 30%, 0.6)', 
                })
            } else if(iter.value >= 1) {  //yellow
                anime({ targets: allIcons, duration: 1000, fontSize: `${iter.value}rem`,
                    color: 'hsla(45, 70%, 30%, 0.6)', 
                })
            }
            else {  //red
                anime({ targets: allIcons, duration: 1000, fontSize: `${iter.value}rem`,
                    color: 'hsla(7, 70%, 30%, 0.6)', 
                })
            }
        }

        if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) {
            
            if(iter.value <= .5) {
                iter.value +=1;
            }

            iter.value+=.25;

            setIconsColor(iter);
            
        }
        else {
            // Minify icons

            console.log(iter.value);

            if(iter.value <= 0.3) {return;}

            iter.value-=.2;

            setIconsColor(iter);

        }
    },

    mutateBox_9: function(cardsOpened, tiles, foundTiles, iter) {
        let mutatingBox = document.querySelector('.mutatingBox');
        let mbText = mutatingBox.querySelector('.mbText');
        mbText.textContent = Math.ceil(iter.value*10);
        if(iter.value >= 2) { //blue
            anime({ targets: mbText, duration: 1200, opacity: [0.6, 1],
                color: 'hsla(199, 70%, 45%, 0.9)'})
            anime({targets: mutatingBox, duration: 1500, backgroundColor: 'hsla(199, 70%, 45%, 0.5)'})

        } else if(iter.value >= 1.5) {  //green
            anime({ targets: mbText, duration: 1200, opacity: [0.6, 1],
                color: 'hsla(102, 70%, 45%, 0.9)' })
            anime({targets: mutatingBox, duration: 1500, backgroundColor: 'hsla(102, 70%, 45%, 0.5)'})

        } else if(iter.value >= 1) {  //yellow
            anime({ targets: mbText, duration: 1200, opacity: [0.6, 1],
                color: 'hsla(45, 70%, 45%, 0.9)' })
            anime({targets: mutatingBox, duration: 1500, backgroundColor: 'hsla(45, 70%, 45%, 0.5)'})

        }
        else if(iter.value > 0.3){  //red
            anime({ targets: mbText, duration: 1200, opacity: [0.6, 1],
                color: 'hsla(7, 70%, 45%, 0.9)' })
            anime({targets: mutatingBox, duration: 1500, backgroundColor: 'hsla(7, 70%, 45%, 0.5)'})
        }
        mbText.style += `borderRadius: calc(50% - (${iter.value*10});`;
    },

    winAnimation_9: function(cardsOpened, tiles, foundTiles, iter) {
        if(foundTiles+2 === tiles) {
            let board = document.querySelector('.board');
            let mutatingBox = document.querySelector('.mutatingBox');
            let mbFinalColor = mutatingBox.style.backgroundColor;
            console.log(mbFinalColor);
        
            anime({
                targets: board,
                duration: 3800,
                opacity: [0.6, 1],
                background: mbFinalColor,
                easing: 'easeOutCubic',

            })

            anime({
                targets: mutatingBox,
                duration: 2200,
                scale: '140%',
                easing: 'easeInBounce',
            })
        }
    },






    // LVL 10

    animateBorders_10: function(cardsOpened, tiles, foundTiles, iter) {
        let focusedIcon = [];
        let target = document.querySelectorAll('.target');
        target.forEach(el => {
            let back = el.querySelector('.tile-back');
            el.classList.add('focused'); 
            focusedIcon.push(back.childNodes[0]);
        });

        let currTarget = document.querySelector('.target-2') || document.querySelector('.target-1');
        console.log(currTarget);
        let back = currTarget.querySelector('.tile-back');
        let svg = back.childNodes[0];

        let newBg = {color: 'n'};
        let newBor = {color: 'n'};

        if(iter.amount === 0) {
            newBg.color = 'hsla(229, 50%, 40%, .4)';
            newBor.color = 'hsla(229, 60%, 50%, .5)';
        }


        else if(iter.amount%5 === 0) {
            newBg.color =  `hsla(8, 0%, 0%, .4)`;
            newBor.color =  `hsla(8, 0%, 0%, .5)`;

        }
        else if(iter.amount%4 === 0) {
            newBg.color =  `hsla(8, 50%, 40%, .4)`;
            newBor.color =  `hsla(8, 60%, 50%, .5)`;

        }
        else if(iter.amount%3 === 0) {
            newBg.color =  `hsla(55, 50%, 40%, .4)`;
            newBor.color =  `hsla(55, 60%, 50%, .5)`;

        }
        else if(iter.amount%2 === 0) {
            newBg.color =  `hsla(317, 50%, 40%, .4)`;
            newBor.color =  `hsla(317, 60%, 50%, .5)`;

        }
        else if(iter.amount%1 === 0) {
            newBg.color =  `hsla(266, 50%, 40%, .4)`;
            newBor.color =  `hsla(266, 60%, 50%, .5)`;

        }
        else {
            newBg.color =  `hsla(177, 50%, 40%, .4)`;
            newBor.color =  `hsla(177, 60%, 50%, .5)`;
        }

        //if(iter.amount%2 === 0) {
            anime({
                targets: target,
                duration: 1800,
                borderColor: `${newBor.color}`,
                backgroundColor: `${newBg.color}`,
                easing: 'easeInQuad',
            })

            /* anime({
                targets: svg,
                duration: 1200,
                color: 'hsla(229, 91%, 52%, .6)',
                easing: 'easeInQuad',
            }) */

       /*  } else {
            anime({
                targets: target,
                duration: 1800,
                borderColor: 'hsla(110, 60%, 50%, .5)',
                backgroundColor: 'hsla(110, 50%, 40%, .4)',
                easing: 'easeInQuad',
            })

            /* anime({
                targets: svg,
                duration: 1200,
                color: 'hsla(110, 91%, 52%, .6)',
                easing: 'easeInQuad',
            }) */
        //} */
    },

    randomizeIcons_10: function(cardsOpened, tiles, foundTiles, iter) {
        let allTiles = document.querySelectorAll('.tile');
        let activeIcons = [];
        let notFocusedTiles = [];
        let focusedTiles = [];

        iter.value++;

        console.log(iter);

        if(iter.value%7 === 0) { /* 6 */

            document.querySelector('.board').dataset.animation = 'on';
            iter.amount++;

            setTimeout(() => {

                allTiles.forEach(tile => {
                    //let back = tile.querySelector('.tile-back');
                    if((tile.style.visibility !== 'hidden') && (!(tile.classList.contains('focused')))) {
                        //tile.style += 'border: .4rem solid hsla(110, 60%, 50%, 50%);';
                        activeIcons.push(tile.childNodes[2].childNodes[0]);
                        tile.childNodes[2].childNodes[0].remove();
                    }
                })
    
                //console.log(activeIcons);
        
                allTiles.forEach(tile => {
                    if((tile.style.visibility !== 'hidden') && (!(tile.classList.contains('focused')))) {
                        let rand = Math.floor(Math.random() * activeIcons.length);
                        let back = tile.querySelector('.tile-back');
                        //(iter.amount%2)? activeIcons[rand].style = 'color: hsla(229, 91%, 52%, .6);' : activeIcons[rand].style = 'color: hsla(110, 91%, 52%, .6);';
                        if(iter.amount%6 === 0) {activeIcons[rand].style = 'color: hsla(8, 0%, 0%, .6);';}
                        else if(iter.amount%5 === 0) {activeIcons[rand].style = 'color: hsla(8, 91%, 52%, .6);';}
                        else if(iter.amount%4 === 0) {activeIcons[rand].style = 'color: hsla(55, 91%, 52%, .6);';}
                        else if(iter.amount%3 === 0) {activeIcons[rand].style = 'color: hsla(317, 91%, 52%, .6);';}
                        else if(iter.amount%2 === 0) {activeIcons[rand].style = 'color: hsla(266, 91%, 52%, .6);';}
                        else if(iter.amount%1 === 0) {activeIcons[rand].style = 'color: hsla(229, 91%, 52%, .6);';}
                       
                        if(!(tile.classList.contains('focused'))) {notFocusedTiles.push(tile);} else {focusedTiles.push(tile);}
                        back.appendChild(activeIcons[rand]);
                        activeIcons.splice(rand, 1);
                    }
                })

                async function wait() {
                    let newBg = {color: 'n'};
                    let newBor = {color: 'n'};
                    let oldBg = {color: 'o'};
                    let oldBor = {color: 'o'};
                    let gameBg = {color: '?'}

                        if(iter.amount%6 === 0) {
                            newBg.color =  `hsla(8, 0%, 0%, .4)`;
                            newBor.color =  `hsla(8, 0%, 0%, .5)`;
                            gameBg.color = `hsla(8, 0%, 0%, .8)`;
                            oldBg.color =  `hsla(8, 50%, 40%, .4)`;
                            oldBor.color =  `hsla(8, 60%, 50%, .5)`;
                        }

                        else if(iter.amount%5 === 0) {
                            newBg.color =  `hsla(8, 50%, 40%, .4)`;
                            newBor.color =  `hsla(8, 60%, 50%, .5)`;
                            gameBg.color = `hsla(8, 90%, 30%, .8)`;
                            oldBg.color = `hsla(55, 50%, 40%, .4)`;
                            oldBor.color = `hsla(55, 60%, 50%, .5)`;
                        }
                        else if(iter.amount%4 === 0) {
                            newBg.color =  `hsla(55, 50%, 40%, .4)`;
                            newBor.color =  `hsla(55, 60%, 50%, .5)`;
                            gameBg.color = `hsla(55, 90%, 30%, .8)`;
                            oldBg.color = `hsla(317, 50%, 40%, .4)`;
                            oldBor.color = `hsla(317, 60%, 50%, .5)`;
                        }
                        else if(iter.amount%3 === 0) {
                            newBg.color =  `hsla(317, 50%, 40%, .4)`;
                            newBor.color =  `hsla(317, 60%, 50%, .5)`;
                            gameBg.color = `hsla(317, 90%, 30%, .8)`;
                            oldBg.color = `hsla(266, 50%, 40%, .4)`;
                            oldBor.color = `hsla(266, 60%, 50%, .5)`;
                        }
                        else if(iter.amount%2 === 0) {
                            newBg.color =  `hsla(266, 50%, 40%, .4)`;
                            newBor.color =  `hsla(266, 60%, 50%, .5)`;
                            gameBg.color = `hsla(266, 90%, 30%, .8)`;
                            oldBg.color = `hsla(229, 50%, 40%, .4)`;
                            oldBor.color = `hsla(229, 60%, 50%, .5)`;
                        }
                        else if(iter.amount%1 === 0) {
                            newBg.color =  `hsla(229, 50%, 40%, .4)`;
                            newBor.color =  `hsla(229, 60%, 50%, .5)`;
                            gameBg.color = `hsla(229, 90%, 30%, .8)`;
                            oldBg.color = `hsla(110, 50%, 40%, .4)`;
                            oldBor.color = `hsla(110, 60%, 50%, .5)`;
                        }
                        else {
                            newBg.color =  `hsla(177, 50%, 40%, .4)`;
                            newBor.color =  `hsla(177, 60%, 50%, .5)`;
                        }

                        let newGameBackground = document.querySelector('.bg-10');
                        //console.log(newGameBackground)

                    //console.log(newBg.color);
                    //console.log(newBor.color);
                    //if(iter.amount%2 === 0) {
                        const a1 = anime({
                            targets: notFocusedTiles,
                            duration: 2500,
                            borderColor:  [`${oldBor.color}`, `${newBor.color}`],//['hsla(110, 60%, 50%, .5)', 'hsla(229, 60%, 50%, .5)'],
                            backgroundColor: [`${oldBg.color}`, `${newBg.color}`], //['hsla(110, 50%, 40%, .4)', 'hsla(229, 50%, 40%, .4)'],
                            easing: 'easeOutExpo',       
                        })

                        
                        const a2 = anime({
                            targets:focusedTiles,
                            duration: 200,
                            borderColor: `${newBor.color}`, //'hsla(229, 60%, 50%, .5)',
                            backgroundColor: `${newBg.color}`, //'hsla(229, 50%, 40%, .4)',
                            easing: 'easeOutExpo',
                        })

                        const a3 = anime({
                            targets: newGameBackground,
                            duration: 2200,
                            backgroundColor: `${gameBg.color}`,
                            easing: 'linear',
                        })

                        Promise.all([a1, a2, a3]);
                    //} else {
/*                         const a1 = anime({
                            targets: notFocusedTiles,
                            duration: 2500,
                            borderColor: ['hsla(229, 60%, 50%, .5)', 'hsla(110, 60%, 50%, .5)'],
                            backgroundColor: ['hsla(229, 50%, 40%, .4)', 'hsla(110, 50%, 40%, .4)'],
                            easing: 'easeOutExpo',       
                        })

                        const a2 = anime({
                            targets:focusedTiles,
                            duration: 200,
                            borderColor: 'hsla(110, 60%, 50%, .5)',
                            backgroundColor: 'hsla(110, 50%, 40%, .4)',
                            easing: 'easeOutExpo',
                        })

                        Promise.all([a1, a2]);
                    }    */  
                }

                wait().then(animate())
                .then(() => {
                    setTimeout(() => {
                        //console.log('all resolved')
                        document.querySelector('.board').dataset.animation = 'off';
                    },3000)
                })
                
                async function animate() {
                    let focusedElems = document.querySelectorAll('.focused');
                    focusedElems.forEach(el => el.classList.remove('focused'));
                    let activeTiles = [];
                    let tilesToAnimate = [];
                    //iter.amount++;
                    allTiles.forEach(tile => {
                        if(tile.style.visibility !== 'hidden') activeTiles.push(tile);
                    })
                    // Tu zrób animację odsłonięcia pewnej części kart (% z obecnej liczby  kart)
                    console.log(levels[`lvl10`].tiles); // It's level 10 !
                    for(let i=0; i<(levels[`lvl10`].tiles - foundTiles)/2; i++) {  // show only half of all tiles
                        let rand = Math.floor(Math.random() * activeTiles.length);
                        tilesToAnimate.push(activeTiles[rand]);
                        activeTiles.splice(rand, 1);
                    }

                    if(tilesToAnimate.length > 0) {
                        const inverseReverse = anime.timeline({
                            duration: 2000,
                            easing: 'easeInOutQuart',
                        })
                
                        inverseReverse
                        .add ({
                            targets: tilesToAnimate,
                            transitionProperty: 'all',
                            rotateY: '180deg',
                            loop: false,
                        })
                
                        .add ({
                            targets: tilesToAnimate,
                            transitionProperty: 'all',
                            rotateY: '0deg',
                            loop: false,
                        }, '+=600')

                        Promise.all([inverseReverse]);
                    }
                }

            }, 2000);


        }
    },





    // LVL 11

    createWantedQuestBoxes_11: function(cardsOpened, tiles, foundTiles, iter) {
        const animationContainer = document.querySelector('.animationContainer');
        for(let i=0; i<2; i++) {  // Generating two Wanted Boxes
            let wBox = document.createElement('div');
            let headerText = document.createElement('div');
            let svgContainer = document.createElement('div');
            
            wBox.classList.add('wBox', `wBox-${i+1}`);
            headerText.classList.add('hText');
            svgContainer.classList.add('svgContainer');

            headerText.textContent = 'WANTED';

            wBox.appendChild(headerText);
            wBox.appendChild(svgContainer);
            animationContainer.appendChild(wBox);
        }

    },

    setBountyQuest_11: function(cardsOpened, tiles, foundTiles, iter) {
        let allTiles = document.querySelectorAll('.tile');
        let svgCont = document.querySelectorAll('.svgContainer');
        let activeTiles = [];

        if(foundTiles+12 >= tiles)  { // Five from last pairs, so it's unnecessary to generate new bounties / +12
            return;
        }

        allTiles.forEach(tile => {
            let back = tile.querySelector('.tile-back');
            if((tile.style.visibility !== 'hidden') && (!(tile.classList.contains('target')))) {
                if((svgCont[0].childNodes.length <= 0) && (svgCont[1].childNodes.length <= 0)) {activeTiles.push(tile);}
                else if ((back.childNodes[0].classList[1] !== svgCont[0].childNodes[0].classList[1]) && (!(svgCont[1].hasChildNodes()))) {activeTiles.push(tile);}
                else if ((back.childNodes[0].classList[1] !== svgCont[0].childNodes[0].classList[1]) && (back.childNodes[0].classList[1] !== svgCont[1].childNodes[0].classList[1])) {activeTiles.push(tile);}
            } 
        });

        let rand = Math.floor(Math.random() * activeTiles.length);
/*         let textDiv = document.createElement('div');
        let theText = document.createElement('div');
        textDiv.classList.add('textDiv');
        theText.classList.add('theText');
        theText.textContent = 'Find me!'; */
 
        console.log(activeTiles[rand]);
        //activeTiles[rand].style = 'border-color: hsla(138, 30%, 40%, .7); border-width: .55rem;';
        anime({
            targets: activeTiles[rand],
            duration: 800,
            borderColor: 'hsla(138, 30%, 40%, .7)',
            borderWidth: '.55rem',
            easing: 'linear',
        })
        const front = activeTiles[rand].querySelector('.tile-front');
/*         textDiv.appendChild(theText);
        front.appendChild(textDiv); */

        console.log(activeTiles[rand])

        activeTiles[rand].classList.add('bounty-q');
        //let textD = allTiles[rand].querySelector('.textDiv');
        //let theT = allTiles[rand].querySelector('.theText');

        // 

       /*  //Calculate current  bounty quest position on the screen
        let topPos = allTiles[rand].offsetTop;
        console.log(topPos);
        let leftPos = allTiles[rand].offsetLeft;
        console.log(leftPos);

        // Create dialog items
        let cr1 = document.createElement('div');
        let cr2 = document.createElement('div');
        let dialogBox = document.createElement('div');

        //append to animation Container
        animationContainer.appendChild(cr1);
        animationContainer.appendChild(cr2);
        animationContainer.appendChild(dialogBox);


        cr1.classList.add('cr');
        cr1.style = `top: ${topPos + 140}px; left: ${leftPos + 140}px;`;
        //cr1.setAttribute(`top`, `${topPos+20}px`); //left:calc(${leftPos}+20)px;`;
        //cr1.setAttribute(`left`, `${leftPos+20}px`);

        cr2.classList.add('cr');
        cr2.style = `top: ${topPos + 120}px; left: ${leftPos + 120}px;`;
        //cr2.setAttribute(`top`, `${topPos+40}px`);
       // cr2.setAttribute(`left`, `${leftPos+40}px`)
       // cr2.style = `top: calc(${topPos}+40)px; left:calc(${leftPos}+40)px;`;

        dialogBox.classList.add('dialogBox');
        /* dialogBox.style = `top: ${topPos - 80}px; left: ${leftPos - 80}px;`; */


       // animationContainer.appendChild(dialogBox); */

    },

    markBountyQuestAnswer_11: function(cardsOpened, tiles, foundTiles, iter) {
        let bounty = document.querySelector('.bounty-q');
        let bountyBack = bounty.querySelector('.tile-back');
        let allTiles = document.querySelectorAll('.tile');
        let bountyAnswer = [];

        allTiles.forEach(tile => {
            if((!(tile.classList.contains('bounty-q'))) && (bountyBack.childNodes[0].classList[1] === tile.querySelector('.tile-back').childNodes[0].classList[1])) {
                bountyAnswer.push(tile);
            }
        })

        anime({
            targets: bountyAnswer,
            duration: 1200,
            borderColor: ['#a7c', 'hsl(122, 20%, 30%)'],
            easing: 'linear',
        })

    },

    resetBountyReward_11: function(cardsOpened, tiles, foundTiles, iter) {
        iter.extraTurns = 0;
    },

    rotateChosenTile_11: function(cardsOpened, tiles, foundTiles, iter) {
        //const bountyQuest = document.querySelector('.bounty-q');
        let currTarget;
        if(cardsOpened.length <= 1) {
            currTarget = document.querySelector('.target-1');
        } else {
            currTarget = document.querySelector('.target-2');
        }

        async function animate() {
            let random = Math.floor(Math.random() * 2);
            document.querySelector('.board').dataset.animation = 'on';
            document.querySelector('.board').setAttribute('pointerEvents', 'none');
            let rotation;
            if(random%2) { 
                rotation = '-90';
                const a1 = anime({
                    targets: currTarget,
                    duration: 400,
                    rotate: `${rotation}`,
                    easing: 'linear',
                })
                Promise.all([a1]);
            }
            else  { 
                rotation = '270';
                const a1 = anime({
                    targets: currTarget,
                    duration: 1200,
                    rotate: `${rotation}`,
                    easing: 'linear',
                })
                Promise.all([a1]);
            }
        }

        animate().then(() => {
            setTimeout(() => {
                document.querySelector('.board').dataset.animation = 'off';
                document.querySelector('.board').setAttribute('pointerEvents', 'auto');
            }, 1200)
        })
        

    },

    checkBountyQuestState_11: function(cardsOpened, tiles, foundTiles, iter) {
        let targetBackFirst = document.querySelector('.target-1 .tile-back');
        let targetBackSecond = document.querySelector('.target-2 .tile-back');
        let allSvgConts = document.querySelectorAll('.svgContainer');

        //console.log(targetFirst);
        //console.log(targetSecond);

        if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) { // if pairs match
            // lets check if player found bountyQuest

            iter.extraTurns = 1;

            this.removeWantedQuest_11(cardsOpened, tiles, foundTiles, iter); // Please do not remove it even it's not showin up in levels main obj

            if((cardsOpened[0].parentNode.classList.contains('bounty-q') || (cardsOpened[1].parentNode.classList.contains('bounty-q')))) {
                iter.extraTurns = -4; // 2 extra  turns, since it takes 1 turn to find, and every pair consumes 1 extra turn :)

                if(cardsOpened[0].parentNode.classList.contains('bounty-q')) {
                    this.setWantedQuest_11(cardsOpened, tiles, foundTiles, iter); // Please do not remove it even it's not showin up in levels main obj
                }

                let foundBounty = document.querySelector('.bounty-q');
                foundBounty.classList.remove('bounty-q');

                // INIT NEW BOUNTY GENERATOR
                this.setBountyQuest_11(cardsOpened, tiles, foundTiles, iter);
            } 
            else if(allSvgConts[1].hasChildNodes()) {
                if(/* (targetBackFirst.childNodes[0].classList[1] !== allSvgConts[0].childNodes[0].classList[1]) &&  */(targetBackSecond.childNodes[0].classList[1] !== allSvgConts[1].childNodes[0].classList[1])) {  // else if its not wanted quest 
                    anime({
                        targets: '.target',
                        duration: 1500,
                        borderColor: 'hsla(0, 63%, 48%, .7)',
                        easing: 'easeInQuad',
                    })
                }
            }

            else if(allSvgConts[0].hasChildNodes()) { // if any wanted quest exists
            
                if(targetBackFirst.childNodes[0].classList[1] !== allSvgConts[0].childNodes[0].classList[1]) {  // else if its not wanted quest 
                    anime({
                        targets: '.target',
                        duration: 1500,
                        borderColor: 'hsla(0, 63%, 48%, .7)',
                        easing: 'easeInQuad',
                    })
                }
            }
        }
    },

    removeWantedQuest_11: function(cardsOpened, tiles, foundTiles, iter) {
        // Remove found WANTED icons - if pair match
        let allSvgConts = document.querySelectorAll('.svgContainer');
        console.log(allSvgConts[0].childNodes.length);


        if(allSvgConts[1].childNodes.length > 0) {
            if(cardsOpened[0].childNodes[0].classList[1] === allSvgConts[1].childNodes[0].classList[1]) {
                iter.extraTurns = -3; // 1 extra  turns, since it takes 1 turn to find, and every pair consumes 1 extra turn :)
                async function animation() {
                    const a1 =  anime({
                        targets: allSvgConts[1].childNodes[0],
                        duration: 800,
                        opacity: [1, 0],
                        easing: 'linear',
                    })

                    Promise.all([a1]);
                }

                animation().then(() => allSvgConts[1].childNodes[0].remove());
            }
            else if(cardsOpened[0].childNodes[0].classList[1] === allSvgConts[0].childNodes[0].classList[1]) {
                iter.extraTurns = -3; // 1 extra  turns, since it takes 1 turn to find, and every pair consumes 1 extra turn :)
                let svgSecond = allSvgConts[1].childNodes[0];
                allSvgConts[0].childNodes[0].remove();
                allSvgConts[0].appendChild(svgSecond);
                //allSvgConts[1].childNodes[0].remove();
            }
        }

        else if(allSvgConts[0].childNodes.length > 0) {
            if(cardsOpened[0].childNodes[0].classList[1] === allSvgConts[0].childNodes[0].classList[1]) {
                iter.extraTurns = -3; // 1 extra  turns, since it takes 1 turn to find, and every pair consumes 1 extra turn :)
                async function animation() {
                    const a1 =  anime({
                        targets: allSvgConts[0].childNodes[0],
                        duration: 800,
                        opacity: [1, 0],
                        easing: 'linear',
                    })

                    Promise.all([a1]);
                }

                animation().then(() => allSvgConts[0].childNodes[0].remove());
            }
        }
    },

    setWantedQuest_11: function(cardsOpened, tiles, foundTiles, iter) {
        console.log('WANTED QUEST CREATION');
        let allTiles = document.querySelectorAll('.tile');
        let allSvgConts = document.querySelectorAll('.svgContainer');
        let alreadyWantedIcon_1;

        if(document.querySelector('.svgContainer').childNodes.length > 0) {
            alreadyWantedIcon_1= document.querySelector('.svgContainer svg').classList[1];
        } else {
            alreadyWantedIcon_1 = 'no-class';
        }

        let activeTiles = [];

        allTiles.forEach(tile => {
            let back = tile.querySelector('.tile-back');
            if((tile.style.visibility !== 'hidden') && (!(tile.classList.contains('target'))) && (alreadyWantedIcon_1 !== back.childNodes[0].classList[1])) {
                activeTiles.push(tile);
            }
        });

        let rand = Math.floor(Math.random() * activeTiles.length);

        let wantedSvg = activeTiles[rand].querySelector('svg');
        let newSvg = wantedSvg.cloneNode(true);

        console.log(newSvg);


        // Push new WANTED quests to container 


        if(allSvgConts[0].childNodes.length <= 0) {
            allSvgConts[0].appendChild(newSvg);
        } 
        else if(allSvgConts[1].childNodes.length <= 0) {
            allSvgConts[1].appendChild(newSvg);
        }
        else if((allSvgConts[0].childNodes.length > 0) && (allSvgConts[1].childNodes.length > 0)) {
            let svgSecond = allSvgConts[1].childNodes[0];
            allSvgConts[0].childNodes[0].remove();
            allSvgConts[0].appendChild(svgSecond);

            allSvgConts[1].appendChild(newSvg);
        }
        //svgCont.appendChild(newSvg);

        console.log(wantedSvg);

        /* 
          Rozważ, czy bounty quest może być tym samym co WANTED quest. Jeśli nie, zrób odpowiedni mechanizm blokujący taką sytuację
        */
    },





    // LVL 12

    prepareIterArray_12: function(cardsOpened, tiles, foundTiles, iter) {
        for(let i=0; i<4; i++) {
            iter.array.push(0);
        }
    },

    createGlowingDots_12: function(cardsOpened, tiles, foundTiles, iter) {
        const animationContainer = document.querySelector('.animationContainer');
        for(let i=0; i<(levels[`lvl12`].tiles / 2); i++) { //  it stands for number of pairs
            let dot = document.createElement('div');
            dot.classList.add('glowing-dot', `glowing-${(i+1)%4}`);
            animationContainer.appendChild(dot);

            let topv = Math.floor( Math.random() * 80) + 10; // 10 to 90
            let leftv = Math.floor( Math.random() * 80) + 10; // 10 to 90

            dot.setAttribute('style', `top:${topv}%;left:${leftv}%;`);
        }

        let duration = 2400;
        let delay = 200;
        let transY = 12;
        let transX = 12;

       /*  anime({
            targets: '.glowing-0',
            duration: duration,
            delay: anime.stagger(delay),
            translateY: [0, `${transY}`],
            translateX: [0, `${transX}`],
            direction: 'alternate',
            loop: true,

        })

        anime({
            targets: '.glowing-1',
            duration: duration,
            delay: anime.stagger(delay),
            translateY: [0, `-${transY}`],
            translateX: [0, `-${transX}`],
            direction: 'alternate',
            loop: true,

        })

        anime({
            targets: '.glowing-2',
            duration: duration,
            delay: anime.stagger(delay),
            translateY: [0, `${transY}`],
            translateX: [0, `-${transX}`],
            direction: 'alternate',
            loop: true,

        })

        anime({
            targets: '.glowing-3',
            duration: duration,
            delay: anime.stagger(delay),
            translateY: [0, `-${transY}`],
            translateX: [0, `${transX}`],
            direction: 'alternate',
            loop: true,

        }) */

    },

    animateTileClick_12: function(cardsOpened, tiles, foundTiles, iter) {
        let rand = Math.floor(Math.random() * 4);
        let colorArr = ['hsla(144, 50%, 55%, .85)', 'hsla(33, 50%, 55%, .85)', 'hsla(178, 50%, 55%, .85)', 'hsla(232, 50%, 55%, .85)' ]

        switch (cardsOpened.length) {
            case 1: {
                anime({
                    targets: '.target-1',
                    duration: 1600,
                    borderColor: ['none', `${colorArr[rand]}`],
                    borderWidth: '.2rem',
                })
                anime({
                    targets: '.target-1 div svg',
                    duration: 1600,
                    color: ['none', `${colorArr[rand]}`],
                })
                break;
            }

            case 2: {

                anime({
                    targets: '.target-2',
                    duration: 1600,
                    borderColor: ['none', `${colorArr[rand]}`],
                    borderWidth: '.2rem',
                })
                anime({
                    targets: '.target-2 div svg',
                    duration: 1600,
                    color: ['none', `${colorArr[rand]}`],
                })

                break;
            }
        }
    },


    moveDots_12: function(cardsOpened, tiles, foundTiles, iter) {
        //if(cardsOpened[0].childNodes[0].classList[1] !== cardsOpened[1].childNodes[0].classList[1]) {  // if pair does NOT match 
            const animationContainer = document.querySelector('.animationContainer');

            let rand = Math.floor(Math.random() * 4);

            let randDotType = animationContainer.querySelectorAll(`.glowing-${rand}`);

            if(randDotType.length !== 0) {
                    if(iter.array[rand] % 4 === 0) {
                        anime({
                            targets: randDotType,
                            duration: 1400,
                            translateX: '-=3rem',
                            translateY: '-=3rem',
                            easing: 'easeOutExpo',
        
                        })
                        iter.array[rand]++;
                    }
                    else if(iter.array[rand] % 4 === 1) {
                        anime({
                            targets: randDotType,
                            duration: 1400,
                            translateX: '+=3rem',
                            translateY: '-=3rem',
                            rotate: '90deg',
                            easing: 'easeOutExpo',
        
                        })
                        iter.array[rand]++;
                    }
                    else if(iter.array[rand] % 4 === 2) {
                        anime({
                            targets: randDotType,
                            duration: 1400,
                            translateX: '+=3rem',
                            translateY: '+=3rem',
                            rotate: '90deg',
                            easing: 'easeOutExpo',
        
                        })
                        iter.array[rand]++;
                    }
                    else if(iter.array[rand] % 4 === 3) {
                        anime({
                            targets: randDotType,
                            duration: 1400,
                            translateX: '-=3rem',
                            translateY: '+=3rem',
                            rotate: '90deg',
                            easing: 'easeOutExpo',
        
                        })
                        iter.array[rand]++;
                    }
            }
        //}
    },


    checkDotRemoval_12: function(cardsOpened, tiles, foundTiles, iter) {
        if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) {
            const allTiles = document.querySelectorAll('.tile');

            if(foundTiles+14 < tiles) {
                // Remove all visible borders  
                anime({
                    targets: allTiles,
                    duration: 1000,
                    borderColor: 'none',
                    borderWidth: '0rem',
                    easing: 'linear',
                })
            }  else if(foundTiles+8 > tiles) {
                anime({
                    targets: allTiles,
                    duration: 1800,
                    borderColor: ['hsl(0, 0%, 0%)','hsl(15, 40%, 60%)'],
                    borderWidth: ['0rem', '.4rem'],
                    easing: 'linear',
                })
            }   else  {
                // Help finding tiles
                let helpArr = [];
                allTiles.forEach(tile => { if(tile.style.visibility !== 'hidden') {
                    
                    helpArr.push(tile);
                }})

                let rand = Math.floor(Math.random() * helpArr.length);
                let rand2 = Math.floor(Math.random() * helpArr.length);
                let helpTile = helpArr[rand];
                let helpTile2 = helpArr[rand2];

                console.log(helpArr);
                console.log(helpTile);

                anime({
                    targets: [helpTile, helpTile2],
                    duration: 1800,
                    borderColor: ['hsl(0, 0%, 0%)','hsl(15, 40%, 60%)'],
                    borderWidth: ['0rem', '.4rem'],
                    easing: 'linear',
                })
            }
            

            // Remove 1 dot from the map

            const animationContainer = document.querySelector('.animationContainer');
            const time = 1800;

            async function fade() {
                const a1 = anime({
                    targets: '.glowing-dot:nth-of-type(1)',
                    duration: time,
                    easing: 'linear',
                    opacity: [1, 0],
                })

                await Promise.all([a1]);
            }

            fade().then(() => {animationContainer.querySelector('.glowing-dot:nth-of-type(1)').remove();}) // this lineo nly for development

            /* fade().then(() => {
                animationContainer.querySelector('.glowing-dot:nth-of-type(1)').remove();
                const allDots = document.querySelectorAll('.glowing-dot');
                anime({
                    targets: allDots,
                    duration: 1000,
                    opacity: [1, 0],
                    easing: 'linear',
                    direction: 'alternate',
                })
                this.moveDots_12(cardsOpened, tiles, foundTiles, iter);
            }) */
            
        }
    },





    // LVL 13

    styleElements_13: function(cardsOpened, tiles, foundTiles, iter) {
        console.log(levels[`lvl13`].tiles);
        let divideNum = levels[`lvl13`].columns;
        const allTiles = document.querySelectorAll('.tile');

        allTiles.forEach((tile, index) => {
            let back = tile.querySelector('.tile-back');
            let icon = back.childNodes[0];

            if(index%divideNum < (divideNum/3)) {
                tile.style = 'border: .3rem solid hsla(23, 40%, 50%, .5); background-image: radial-gradient(hsl(166, 0%, 0%), hsl(23, 40%, 50%), hsl(62, 0%, 0%));';
                icon.style =  'color: hsl(23, 50%, 60%)';
            }

            else if(index%divideNum >= ((divideNum * 2)/3)) {
                tile.style = 'border: .3rem solid hsla(62, 40%, 50%, .5); background-image: radial-gradient(hsl(166, 0%, 0%), hsl(62, 40%, 50%), hsl(23, 0%, 0%));';
                icon.style =  'color: hsl(62, 50%, 60%)';
            }

            else {
                icon.style =  'color: hsl(166, 50%, 60%)';
            }
        })
    },

    createSubstractionVisuals_13: function(cardsOpened, tiles, foundTiles, iter) {
        const animationContainer = document.querySelector('.animationContainer');
        let substractCounter = document.createElement('div');
        substractCounter.classList.add('substract');
        animationContainer.appendChild(substractCounter);
    },

    startAnimateTiles_13: function(cardsOpened, tiles, foundTiles, iter) {
        const allTiles = document.querySelectorAll('.tile');
        anime({
            targets: allTiles,
            duration: 800,
            rotate: [120, 360],
            translateX: ['1.3rem', '0rem'],
        })
    },

    addInteractiveStrips_13: function(cardsOpened, tiles, foundTiles, iter) {
        const board = document.querySelector('.board');
        const boardbox = document.createElement('div');
        boardbox.classList.add('bbox');
        board.appendChild(boardbox);

        for(let i=0; i<(levels[`lvl13`].columns); i++) {
            let strip = document.createElement('div');
            strip.classList.add('strip');
            let bgcolor;
            if(i < (levels[`lvl13`].columns)/3) {
                bgcolor = 'background-color: hsl(23, 50%, 60%)';
                strip.classList.add('s-brown');
            } else if( i < ((levels[`lvl13`].columns)/1.5)) {
                bgcolor = 'background-color: hsl(166, 50%, 60%)';
                strip.classList.add('s-silver');
            } else {
                bgcolor = 'background-color: hsl(62, 50%, 60%)';
                strip.classList.add('s-gold');
            }
            strip.setAttribute('style', `top:${10}%;left:${i * (100/(levels[`lvl13`].columns))}%; ${bgcolor}; `); //visibility: hidden;

            boardbox.appendChild(strip);
        }
    },

    visibleStrips_13: function(cardsOpened, tiles, foundTiles, iter) {
        console.log(cardsOpened[1].childNodes[0].style.color)//.getAttribute('color'))

        if(cardsOpened[1].childNodes[0].style.color === 'rgb(102, 204, 180)') {  // silver
            async function aSerires() {
                const a1 = anime({
                    targets: '.s-silver',
                    duration: 1500,
                    delay: anime.stagger(600, {from: 'center'}),
                    backgroundImage: 'radial-gradient(hsl(23, 0%, 0%), hsl(166, 40%, 50%), hsl(62, 0%, 0%))',
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                }).finished;

                await Promise.all([a1]);
            } 

            async function aFinish() {
                const a2 = anime({
                    targets: '.s-silver',
                    duration: 700,
                    delay: anime.stagger(600, {from: 'center'}),
                    /* visibility: 'visible', */
                    opacity: [1, 0],
                    easing: 'easeInExpo',
                }).finished;

                await Promise.all([a2]);
            }

            async function init() {
                await aSerires();
                await aFinish();
            }

            init();

        } else if(cardsOpened[1].childNodes[0].style.color === 'rgb(204, 141, 102)') { // brown
            async function aSerires() {
                const a1 = anime({
                    targets: '.s-brown',
                    duration: 1500,
                    delay: anime.stagger(600),
                    backgroundImage: 'radial-gradient(hsl(23, 0%, 0%), hsl(23, 40%, 50%), hsl(62, 0%, 0%))',
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                }).finished;

                await Promise.all([a1]);
            } 

            async function aFinish() {
                const a2 = anime({
                    targets: '.s-brown',
                    duration: 700,
                    delay: anime.stagger(600),
                    opacity: [1, 0],
                    easing: 'easeInExpo',
                }).finished;

                await Promise.all([a2]);
            }

            async function init() {
                await aSerires();
                await aFinish();
            }

            init();

        } else { // gold

            async function aSerires() {
                const a1 = anime({
                    targets: '.s-gold',
                    duration: 1500,
                    delay: anime.stagger(600, {from: 'last'}),
                    backgroundImage: 'radial-gradient(hsl(23, 0%, 0%), hsl(62, 40%, 50%), hsl(62, 0%, 0%))',
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                }).finished;

                await Promise.all([a1]);
            } 

            async function aFinish() {
                const a2 = anime({
                    targets: '.s-gold',
                    duration: 700,
                    delay: anime.stagger(600),
                    opacity: [1, 0],
                    easing: 'easeInExpo',
                }).finished;

                await Promise.all([a2]);
            }

            async function init() {
                await aSerires();
                await aFinish();
            }

            init();
        }
    },

    animateCardSide_13: function(cardsOpened, tiles, foundTiles, iter) {
        let currTarget;
        let elemBg = {color: '', newColor: ''};

        if(cardsOpened.length <= 1) {
            currTarget = document.querySelector('.target-1');
        } else {
            currTarget = document.querySelector('.target-2');
        }

        let back = currTarget.querySelector('.tile-back');

        if(back.childNodes[0].style.color === 'rgb(204, 141, 102)') {  // if brown
            elemBg.color = 'radial-gradient(hsl(0, 0%, 0%), hsl(23, 40%, 50%), hsl(0, 0%, 0%))';
            elemBg.newColor = 'radial-gradient(hsl(23, 40%, 50%), hsl(0, 0%, 0%), hsl(23, 40%, 50%))';
        } else if (back.childNodes[0].style.color === 'rgb(102, 204, 180)') {  // if silver
            elemBg.color = 'radial-gradient(hsl(0, 0%, 0%), hsl(166, 40%, 50%), hsl(0, 0%, 0%))';
            elemBg.newColor = 'radial-gradient(hsl(166, 40%, 50%), hsl(0, 0%, 0%), hsl(166, 40%, 50%))';
        } else { // if gold
            elemBg.color = 'radial-gradient(hsl(0, 0%, 0%), hsl(62, 40%, 50%), hsl(0, 0%, 0%))';
            elemBg.newColor = 'radial-gradient(hsl(62, 40%, 50%), hsl(0, 0%, 0%), hsl(62, 40%, 50%))';
        }

        async function first() {
            const a1 = anime({
                targets: currTarget,
                duration: 2200,
                keyframes: [
                    {backgroundImage: `${elemBg.newColor}`, duration: 1600,  easing: 'easeInExpo'},
                    {backgroundImage: `${elemBg.color}`,  easing: 'easeInBounce'},
                ],
            })

            await Promise.all([a1]);
        }

        async function second() { 
            console.log(cardsOpened)
            if(cardsOpened.length > 1) {
                anime({
                    targets: '.target',
                    duration: 800,
                    /* backgroundImage: [`${elemBg.newColor}`, `${elemBg.color}`], */
                    opacity: .1,
                })
            }
        }

        async function init() {
            await first();
            await second();
        }

        init();
    },

    cardsMatchCheckoutAndAnimation_13(cardsOpened, tiles, foundTiles, iter) {
        if(foundTiles+2 === tiles) {
            // Remove strips appended to board comp
            let bbox = document.querySelector('.bbox');
            if(bbox !== null) {
                bbox.remove(); // remove this div with all it's ancestors (strip class)
            }
        }
        else if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) {
            anime({
                targets: [cardsOpened[0].parentNode, cardsOpened[1].parentNode],
                duration: 2000,
                easing: 'linear',
                scale: ['100%', '20%'],
            })
            iter.streak = 0;
            iter.extraTurns = 0;
        }
        else {  // if cards does not match
            let number = 3;
            if(iter.streak > number) {
                iter.extraTurns = iter.streak - number;

                let substract = document.querySelector('.substract');
                substract.textContent = `-${iter.extraTurns+1}`;
    
                anime({
                    targets: substract,
                    duration: 2100,
                    keyframes: [
                        {opacity: 1, translateY: 0, duration: 400},
                        {opacity: .4, translateY: 40, duration: 700},
                        {opacity: 0, translateY: 70, duration: 1000},
                    ],
                })
            }
            iter.streak++;
        }
    },








    // LVL 14

    temporaryRemovalFunction_14: function(cardsOpened, tiles, foundTiles, iter) {
        let bbox = document.querySelector('.bbox');
            if(bbox !== null) {
                bbox.remove(); // remove this div with all it's ancestors (strip class)
            }
    },

    iconsAppear_14: function(cardsOpened, tiles, foundTiles, iter) {
        const allTiles = document.querySelectorAll('.tile');
        anime({
            targets: allTiles,
            duration: 2600,
            backgroundImage: ['none', 'linear-gradient(45deg, hsl(99, 100%, 100%) 10%, hsl(60, 1%, 40%))'],
            easing: 'easeInSine',
        })

        // Plus give their tilebacks identifier class (silver);
        allTiles.forEach(tile => {
            let back = tile.querySelector('.tile-back');
            back.classList.add('silver');
        })

    },

    tileBackgroundRetrieve_14: function(cardsOpened, tiles, foundTiles, iter) {
        anime({
            targets: '.target-1',
            duration: 1400,
            backgroundImage: 'linear-gradient(45deg, hsl(99, 100%, 100%) 10%, hsl(60, 1%, 40%))',
            easing: 'easeOutSine',
        })
    },

    blockSecondTileReveal_14: function(cardsOpened, tiles, foundTiles, iter) {
        document.querySelector('.target-2').style = 'background-image: none;';

        anime({
            targets: '.target-2',
            duration: 1800,
            easing: 'easeOutInCirc',
            backgroundImage: 'none',
            opacity: [0, 1],
        })
    },

    checkForPairCombo_14(cardsOpened, tiles, foundTiles, iter) {
        const allTiles = document.querySelectorAll('.tile');
        if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) {

            // Do some operations here//

            let firstBg = cardsOpened[0].classList[cardsOpened[0].classList.length-1];
            let secBg =  cardsOpened[1].classList[cardsOpened[1].classList.length-1];

           /* console.log('first tile: '+ firstBg);
           console.log('second tile: '+secBg); */

           if(firstBg === secBg) {
                document.querySelector('.board').dataset.animation = 'on';
                document.querySelector('.board').setAttribute('pointerEvents', 'none');

                let typeArr = [];

                if(firstBg === 'silver') { // Two silvers combined
                    // Reveal only GOLD tiles
                    allTiles.forEach(tile => {
                        let back = tile.querySelector('.tile-back');
                        if(back.classList.contains('gold')) typeArr.push(back.parentNode);
                    })
                }

                else if(firstBg === 'gold') {
                    // Reveal only SILVER tiles
                    //console.log(' OK ::::::::::: REVEAL SILVERS')
                    allTiles.forEach(tile => {
                        let back = tile.querySelector('.tile-back');
                        if(back.classList.contains('silver')) typeArr.push(back.parentNode);
                    })
                }

                async function reveal() {
                    const typeAppear = anime({
                        targets: typeArr,
                        keyframes: [
                            {rotateY: '+=180deg', duration: 500, easing: 'easeInSine'},
                            {rotateY: '-=180deg', duration: 500, delay: 950, easing: 'easeOutSine'},
                        ],
                        easing: 'easeInExpo',
                    }).finished;

                   await Promise.all([typeAppear]);
                }

                async function init() {
                    await reveal()
                        .then(() => {
                            console.log('unblokced'); 
                            document.querySelector('.board').dataset.animation = 'off';
                            document.querySelector('.board').setAttribute('pointerEvents', 'auto');
                        })
                }

                init();
           }

        }

        // And then... //
        cardsOpened[0].classList.replace(cardsOpened[0].classList[cardsOpened[0].classList.length-1], 'silver');
        cardsOpened[1].classList.replace(cardsOpened[1].classList[cardsOpened[1].classList.length-1], 'gold');
    },








    // LVL 15
    darkenBeginningAnimation_15: function(cardsOpened, tiles, foundTiles, iter) {
        const aContainer = document.querySelector('.animationContainer');
        anime({
            targets: aContainer,
            duration: 2700,
            keyframes: [
                {backgroundColor: 'hsla(1, 0%, 0%, 1)'}, //hsla(144, 50%, 55%, .85)
                {backgroundColor: 'hsla(1, 0%, 0%, .8)', duration: 900},
                {backgroundColor: 'hsla(1, 0%, 0%, .4)', duration: 900},
                {backgroundColor: 'hsla(1, 0%, 0%, .0)', duration: 900},
            ],
            easing: 'easeInSine',
        })
    },

    createSubstractionVisuals_15: function(cardsOpened, tiles, foundTiles, iter) {
        const animationContainer = document.querySelector('.animationContainer');
        let substractCounter = document.createElement('div');
        substractCounter.classList.add('substract');
        animationContainer.appendChild(substractCounter);
    },

    createAdditionalTiles_15: function(cardsOpened, tiles, foundTiles, iter) {
        const board = document.querySelector('.board');
        for(let i=0; i<levels[`lvl15`].columns; i++) {
            // Front
            let front = document.createElement('div');
            front.classList.add('tile-front', 'tf-15');
            // Back
            let back = document.createElement('div');
            back.classList.add('tile-back', 'tb-15');

            // Img (svg)
            //let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            let svg = document.createElement('img');
            //svg.alt = '';
            svg.src = `bombicon-${(i%3)+1}.svg`;
            svg.classList.add('fa-icon-15', `fake-${i}`, `scaledImg`); // fake-${i} is NOT styling based class

            let newTile = document.createElement('div');
            newTile.classList.add('tile', 't-15');

            back.appendChild(svg);

            newTile.appendChild(front);
            newTile.appendChild(back);

            board.appendChild(newTile);
            console.log('created');
        }
    },

    redistributeIcons_15: function(cardsOpened,tiles,foundTiles, iter) {
        const iconsArray = [];
        const colors = {1: 'hsla(25, 50%, 44%, .35)', 2: 'hsla(144, 50%, 44%, .35)', 3: 'hsla(299, 50%, 44%, .35'};
        const allTiles = document.querySelectorAll('.tile');
        console.log(allTiles.length); // 77
        // push elems to array & remove it from DOM 
        allTiles.forEach((tile, index) => {
            let back = tile.querySelector('.tile-back');
            iconsArray.push(back.childNodes[0]);
            back.childNodes[0].style = `color: ${colors[(index%3)+ 1]};`;
            back.childNodes[0].remove();
        })

        // now let's randomize order & append it to DOM back
        allTiles.forEach(tile => {
            let back = tile.querySelector('.tile-back');
            let rand = Math.floor(Math.random() * iconsArray.length);
            back.appendChild(iconsArray[rand]);
            iconsArray.splice(rand, 1);
        })
        console.log('after');
        console.log(iconsArray);
    },

    animateChosenTile_15: function(cardsOpened,tiles,foundTiles, iter) {
        let currTarget;

        if(cardsOpened.length <= 1) {
            currTarget = document.querySelector('.target-1');
        } else {
            currTarget = document.querySelector('.target-2');
        }

        anime({
            targets: currTarget,
            duration: 700,
            scale: ['100%', '120%'],

        })
    },

    isBombRevealed_15: function(cardsOpened,tiles,foundTiles, iter)  {
        iter.amount = 0;
        iter.extraTurns = 0;
        for(let i=0; i<cardsOpened.length; i++) {
            if(cardsOpened[i].childNodes[0].classList.contains('scaledImg')) {
                //console.log(':(((');
                iter.extraTurns+=3;
                iter.amount++;

                anime({
                    targets: '.details-item',
                    duration: 1400,
                    color: 'hsl(11, 60%, 40%)',
                    direction: 'alternate',
                }) 
            }
        }

        if(iter.amount >= 2) {
            iter.extraTurns+=3;

            anime({
                targets: '.background',
                duration: 1400,
                backgroundColor: 'hsl(11, 60%, 40%)',
                direction: 'alternate',
            }) 
        }

        if(iter.amount > 0) {
            let substract = document.querySelector('.substract');
            substract.textContent = `-${iter.extraTurns+1}`;
    
            anime({
                targets: substract,
                duration: 2100,
                keyframes: [
                    {opacity: 1, translateY: 0, duration: 400},
                    {opacity: .4, translateY: 40, duration: 700},
                    {opacity: 0, translateY: 70, duration: 1000},
                ],
            })   
        } 

    },

    ifWinRemoveFakeTiles_15: function(cardsOpened,tiles,foundTiles, iter) {
        if(foundTiles+2 === tiles) {
            let allTiles = document.querySelectorAll('.tile');
            let allFakeTiles = [];
            allTiles.forEach(tile => {
                if(tile.style.visibility !== 'hidden') {allFakeTiles.push(tile);}
            })

            async function animateWin() {
                const a1 = anime({
                    targets: allFakeTiles,
                    duration: 2400,
                    scale: '0%',
                    easing: 'easeInBounce',
                })
                await Promise.all([a1]);
            }

            async function init() {
                await animateWin()
                .then(() => {
                    while(allFakeTiles.length > 0) {
                        allFakeTiles[0].remove();
                        allFakeTiles.shift();
                    }
                })
            }

            init();
        }
    },





    // LVL 16
    temporaryBombsRemoval_16: function(cardsOpened, tiles, foundTiles, iter) {
        let allBombs = document.querySelectorAll('.scaledImg');
        let bombsArr = [...allBombs];
        if(allBombs.length > 0) {
            while(bombsArr.length > 0) {
                bombsArr[0].parentNode.parentNode.remove();
                bombsArr.shift();
            }
        }
    },

    startingAnimation_16: function(cardsOpened, tiles, foundTiles, iter) {

        document.querySelector('.board').dataset.animation = 'on';
        document.querySelector('.board').setAttribute('pointerEvents', 'none');

        const bg = document.querySelector('.background');

        async function hideBg() {
           const hide = anime ({
               targets: bg,
               duration: 300,
               opacity: [.2, 0],
               easing: 'linear',
           }).finished;

           await Promise.all([hide])
        }

        async function reveal() {
            const reveal = anime({
                targets: '.tile',
                keyframes: [
                    {rotateY: '+=180deg', duration: 1400, delay: 1300, easing: 'easeOutExpo'},
                ],
                direction: 'alternate',
            }).finished;

           await Promise.all([reveal]);
        }

        async function showBg() {
            const show = anime ({
                targets: bg,
                duration: 2500,
                opacity: [0, 1],
                easing: 'linear',
            }).finished;
 
            await Promise.all([show])
         }

        async function init() {
            await hideBg()
            await showBg()
            await reveal()
                .then(() => {
                    console.log('unblokced'); 
                    document.querySelector('.board').dataset.animation = 'off';
                    document.querySelector('.board').setAttribute('pointerEvents', 'auto');
                })
        }

        init();
    },

    isUnfreezingTime_16: function(cardsOpened, tiles, foundTiles, iter) {
        if(foundTiles+16 >= tiles) {
            iter.amount++;
        }

        if(iter.amount === 1) {

            let unfreezedElems = [];

            while(iter.array.length > 0) {
                iter.array[0].parentNode.style = 'pointer-events: auto;';
                unfreezedElems.push(iter.array[0].parentNode);
                iter.array.shift();
            }

            anime({
                targets: unfreezedElems,
                duration: 2400,
                delay: anime.stagger(200),
                backgroundImage: 'radial-gradient(hsla(0, 0%, 0%, 0) 45%, hsla(0, 100%, 100%, .8)',
                borderWidth: ['.6rem', '.3rem'],
                rotate: 180,
            })
        }

    },

    testFreezingCondition_16: function(cardsOpened, tiles, foundTiles, iter) {
        if(cardsOpened[0].childNodes[0].classList[1] !== cardsOpened[1].childNodes[0].classList[1]) {
            
            if(iter.amount > 0) {return; }

            for(let i=0; i<2; i++) {
                cardsOpened[i].parentNode.style = 'pointer-events: none;';
                iter.array.push(cardsOpened[i]);
            }

            let unfreezedElems = [];

            if(iter.array.length >= 8) {
                while(iter.array.length > 6) {
                    iter.array[0].parentNode.style = 'pointer-events: auto;';
                    unfreezedElems.push(iter.array[0].parentNode);
                    iter.array.shift();
                }

                // Animate unfreezing process
                anime({
                    targets: unfreezedElems,
                    duration: 1900,
                    //scale: '130%',
                    backgroundImage: 'radial-gradient(hsla(0, 0%, 0%, 0) 45%, hsla(0, 100%, 100%, .8)',
                    borderWidth: ['.6rem', '.3rem'],
                }) 
            }

            // Freeze new elems
            anime({
                targets: '.target',
                duration: 1900,
                //rotateX: 55,
                backgroundImage: ['radial-gradient(hsla(0, 0%, 0%, 0) 5%, hsl(0, 100%, 100%)', 'radial-gradient(hsla(0, 0%, 0%, 0) 5%, hsl(0, 100%, 100%)'],
                borderWidth: '.6rem',
            })
        } else {
            anime({
                targets: '.target',
                duration: 1900,
                backgroundImage: 'radial-gradient(hsla(0, 0%, 0%, 0) 85%, hsla(0, 100%, 100%, .4)',
                borderWidth: ['.3rem', '.15rem'],
            })
        }
    },





    // LVL 17
    fadeInBoard_17: function(cardsOpened, tiles, foundTiles, iter) {
        anime({
            targets: '.board',
            duration: 600,
            opacity: [0, 1],
        })
    },

    divideIntoPhases_17: function(cardsOpened, tiles, foundTiles, iter) {

        // STEPS / PHASES

        if(iter.streak === 0) iter.value = 48;  // BASE STEP -> 48 , 24 , 12 , 6 , 2
        else if(iter.streak === 1) iter.value = 24;
        else if(iter.streak === 2) iter.value = 12;
        else if(iter.streak === 3) iter.value = 6;
        else if(iter.streak === 4) iter.value = 2;

        iter.streak++;

        iter.amount += iter.value;

       /* GDY PIERWSZY RAZ RENDER
            - pobierz ze wszystkich kafelków ich ikonki
            - posortuj ikonki i spushuj je do tablicy (nie jako referencje, tylko KOPIE) -> tu możesz po sortowaniu usunąć nadstepową liczbę ikonek
            - USUŃ NADLICZBOWE KAFLE, CZYLI TAKIE KTÓRE WYKRACZAJĄ POZA WARTOŚĆ STEP
            - teraz rozlosuj ikonki i przydziel każdą z nich do przefiltrowanych kafelków 
       */
        /* GDY RENDER DRUGI I KAŻDY KOLEJNY
            - pobierz ze wszystkich kafelków ich ikonki
            - posortuj ikonki i spushuj je do tablicy (nie jako referencje, tylko KOPIE) -> tu możesz po sortowaniu usunąć nadstepową liczbę ikonek
            - USUŃ NADLICZBOWE KAFLE, CZYLI TAKIE KTÓRE WYKRACZAJĄ POZA WARTOŚĆ STEP
            - teraz rozlosuj ikonki i przydziel każdą z nich do przefiltrowanych kafelków
       */

        const allTiles = document.querySelectorAll('.tile');
        const board = document.querySelector('.board');

        let iconsArray = [];

        if(iter.streak > 1) {  // if it's second and further step
            // REMOVE ALL TILES, AND CREATE NEW ONES
            allTiles.forEach(tile => tile.remove());


            let iconArr = [];

            for(let x=0; x<iter.value; x++) {
                iconArr.push(iter.array[x]);
            }

            console.log(iconArr)

            for(let i=0; i<iter.value; i++) {
                // Front
                let front = document.createElement('div');
                front.classList.add('tile-front', 'tf-17');
                // Back
                let back = document.createElement('div');
                back.classList.add('tile-back', 'tb-17');
    
                let newTile = document.createElement('div');
                newTile.classList.add('tile', 't-17');
    

                let rand = Math.floor( Math.random() * iconArr.length);

                newTile.appendChild(front);
                newTile.appendChild(back);

                back.appendChild(iconArr[rand]);

                iconArr.splice(rand, 1);
    
                board.appendChild(newTile);
                console.log('created');
            }

            allTiles.forEach((tile, index) => {
                if(index >= iter.value) {
                    tile.remove();
                }
            })
        }

        else {
            allTiles.forEach(tile => {
                let back = tile.querySelector('.tile-back');
                console.log(back.childNodes[0])
                iconsArray.push(back.childNodes[0]);
            })

            iconsArray.sort();
            iconsArray.reverse();
                if(iconsArray[0] === undefined) {
                    while(iconsArray[0] === undefined) {
                        iconsArray.shift();
                    }
                }
            iconsArray.reverse();
            console.log(iconsArray);

            function sortSvgs(array) {
                let compareArr = [];
                for(let x=0; x<array.length; x++) {
                    compare(array[x], compareArr);
                }
                return compareArr;
            }

            function compare(item, compareArr) {
                compareArr.unshift(item);
                if(compare.length > 1) {
                    for(let y=1; y<compareArr.length; y++) {
                        if(item.classList[1] > compareArr[y].classList[1]) {
                            let z = compareArr[y];
                            compareArr[y] = compareArr[y-1];
                            compareArr[y-1] = z;
                        }
                    }
                } else {
                    return compareArr;
                }
            }

            let sortediconsArr = sortSvgs(iconsArray);
            console.log(sortediconsArr);

            // Let's reduce sortedIcons array
            while(sortediconsArr.length !== iter.value) {
                sortediconsArr.pop();
            }


            iter.array = [...sortediconsArr];

            console.log(iter.array)

            console.log(sortediconsArr);

            allTiles.forEach((tile, index) => {
                if(index < iter.value) {
                    console.log('tile detected !');
                    let back = tile.querySelector('.tile-back');
                    if(back.hasChildNodes()) { back.childNodes[0].remove(); }
                
                    // Now randomize, append, and slowly reduce the array length
                    let rand = Math.floor(Math.random() * sortediconsArr.length);
                    back.appendChild(sortediconsArr[rand]);
                    sortediconsArr.splice(rand, 1);
    
                } else {
                    tile.remove();
                }
            })

        }

        console.log(allTiles.length);

    },

    calcPhaseTilesCount_17: function(cardsOpened, tiles, foundTiles, iter) {

    },

    tileClickAnimation_17: function(cardsOpened, tiles, foundTiles, iter) {
 /*        console.log('TILES: ' + tiles);
        console.log('CURRENT STEP: ' + iter.value);
        console.log('FOUND TILES: ' + foundTiles);
        console.log('FOUND TARGET: ' + iter.amount);
 */
        let currTarget;

        if(cardsOpened.length <= 1) {
            currTarget = document.querySelector('.target-1');
        } else {
            currTarget = document.querySelector('.target-2');
        }

        anime({
            targets: currTarget,
            duration: 900,
            borderWidth: ['.4rem', '.7rem'],
            borderRadius: ['20% 50% 20% 50%', '50% 20% 50% 20%'],
            direction: 'alternate',

        })
    },

    increaseVisualDifficulty_17(cardsOpened, tiles, foundTiles, iter) {

        const allTiles = document.querySelectorAll('.tile');
        let degs = [20, 40, 60, 80, 100, 120, 140, 160, 200, 220, 240, 260, 280, 300, 320, 340];

        if(iter.streak === 2) {
            allTiles.forEach(tile => {
                let back = tile.querySelector('.tile-back');
                back.childNodes[0].style = 'color: hsla(0, 0%, 0%, .4)';
            })
        } else if(iter.streak === 3) {
            allTiles.forEach(tile => {
                let back = tile.querySelector('.tile-back');
                let rand = Math.floor( Math.random() * degs.length);
                back.childNodes[0].style = `color: hsla(0, 100%, 100%, .3); transform: rotate(${degs[rand]}deg)`;
            })
        } else if(iter.streak === 4) {
            allTiles.forEach(tile => {
                let back = tile.querySelector('.tile-back');
                let rand = Math.floor( Math.random() * degs.length);
                back.childNodes[0].style = `color: hsla(0, 0%, 0%, .2); transform: rotate(${degs[rand]}deg)`;
            })
        }
    },

    animatePairMatch_17: function(cardsOpened, tiles, foundTiles, iter) {
        if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) {
            anime({
                targets: '.target',
                duration: 2400,
                backgroundImage: ['radial-gradient(hsl(0, 20%, 20%), hsla(0, 20%, 20%, .7))', 'radial-gradient(hsl(0, 0%, 0%), hsla(0, 0%, 0%, .7))'],
            })
        }
    },

    lookForNextPhase_17: function(cardsOpened, tiles, foundTiles, iter) {
        if((cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) && (foundTiles+4 >= iter.amount)) {
            
            document.querySelector('.board').dataset.animation = 'on';
            document.querySelector('.board').setAttribute('pointerEvents', 'none');
            setTimeout(() => {
                this.divideIntoPhases_17(cardsOpened, tiles, foundTiles, iter);
                this.increaseVisualDifficulty_17(cardsOpened, tiles, foundTiles, iter);
                document.querySelector('.board').dataset.animation = 'off';
                document.querySelector('.board').setAttribute('pointerEvents', 'auto');
            }, 3000);

            anime({
                targets: '.board',
                duration: 2400,
                opacity: [1, 0],
                direction: 'alternate',
            })

            if(iter.streak === 1) {
                anime({
                    targets: '.background',
                    duration: 2400,
                    backgroundColor: '#000',
                   // opacity: [1, 0],
                   filter: 'blur(10px)',
                    direction: 'alternate',
                })
            } else if(iter.streak === 2) {
                anime({
                    targets: '.background',
                    duration: 2400,
                    backgroundColor: '#000',
                    filter: 'hue-rotate(70deg)',
                    //direction: 'alternate',
                })
            } else if(iter.streak === 3) {
                anime({
                    targets: '.background',
                    duration: 2400,
                    backgroundColor: '#fff',
                    filter: 'saturate(190%) invert(90%)',
                    easing: 'easeInSine',
                    //direction: 'alternate',
                })
            } else if(iter.streak === 4) {
                anime({
                    targets: '.background',
                    duration: 2400,
                    backgroundColor: '#fff',
                    filter: 'brightness(30%) invert(0%) sepia(35%)',
                    easing: 'easeInSine',
                    //direction: 'alternate',
                })
            }

        }
    },







    // LVL 18
    createCombinations_18: function(cardsOpened, tiles, foundTiles, iter) {
        for(let i=1; i<=(levels[`lvl18`].rows); i++) {
            iter.array.push(`r${i}`, `c${i}`);
        }
        
    },

    createChallengeCountdown_18: function(cardsOpened, tiles, foundTiles, iter) {
        const animationContainer = document.querySelector('.animationContainer');

        let countdownBox = document.createElement('div');
        countdownBox.classList.add('countdown-box');

        let countdown = document.createElement('div');
        countdown.classList.add('countdown');

        countdown.textContent = `${iter.value}`;

        countdownBox.appendChild(countdown);
        animationContainer.appendChild(countdownBox);
    },

    setChallenge_18: function(cardsOpened, tiles, foundTiles, iter) {

        iter.nextArr = [];

        // Remove challenge class from remain tiles if challenge has been failed
        let allCTiles = document.querySelectorAll('.tile-challenge');
        if(allCTiles.length > 0) {
            allCTiles.forEach(ctile => {
                ctile.classList.remove('tile-challenge');
            })
        }

        iter.amount = Math.floor(Math.random() * iter.array.length);
        let randomControl = iter.array[iter.amount];
        
        let dimension = randomControl.charAt(0);
        let num = randomControl.charAt(1);

        let allTiles = document.querySelectorAll('.tile');

        if(dimension === 'r') {  // if we want to mark some row
            for(let x=0; x<(levels[`lvl18`].rows); x++) {
                allTiles[((levels[`lvl18`].rows) * (num - 1)) + x].classList.add('tile-challenge');
            }
        }

        else if(dimension === 'c') {  // if we want to mark some column
            for(let y=0; y<(levels[`lvl18`].columns); y++) {
                allTiles[(levels[`lvl18`].columns * y) + (num - 1)].classList.add(`tile-challenge`);
            }
        }

        let allChallengeTiles = document.querySelectorAll('.tile-challenge');
        allChallengeTiles.forEach(ctile => {
            if(ctile.style.visibility === 'hidden') {
                ctile.classList.remove(`tile-challenge`);
            }
        })

        //iter.array.splice(random, 1); // BUT ONLY IF THE CHALLENGE HAS BEEN PASSED ! so not in this func
        let finalChallengeTiles = document.querySelectorAll('.tile-challenge');
        iter.value = finalChallengeTiles.length * 2; // indicates how much turns u have to find all marked tiles

        this.updateCountdown_18(cardsOpened, tiles, foundTiles, iter);
    },

    matchChallengeClassRemoval_18: function(cardsOpened, tiles, foundTiles, iter) {

        // Decrease available turns by one

        iter.value = iter.value - 1;

        if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1])
        {

            let isChallengePassed = checkPassCondition(cardsOpened);
            console.log(isChallengePassed);

            // Here add some animations
            
            if((cardsOpened[0].parentNode.classList.contains('tile-challenge') || (cardsOpened[1].parentNode.classList.contains('tile-challenge'))) && (iter.value === 0) && (isChallengePassed === false)) {
                // If at the last available challenge turn very last challenge tiles did not match
                const comparableClass = cardsOpened[0].childNodes[0].classList[1];
                console.log(comparableClass);
                cardsOpened[0].childNodes[0].classList.replace(comparableClass, 'fake-class');
                console.log(cardsOpened[0].childNodes[0].classList[1]);

                setTimeout(() => {
                    let fake = document.querySelector('.fake-class');
                    fake.classList.replace('fake-class', comparableClass);
                }, 2000); 
            }

            else if((cardsOpened[0].parentNode.classList.contains('tile-challenge') || (cardsOpened[1].parentNode.classList.contains('tile-challenge')))) {

                // Next array keeps all the tiles found during the current challenge
                iter.nextArr.push(cardsOpened[0], cardsOpened[1]);

                setTimeout(() => {
                    iter.fTilesModifier = 0;
                    console.log('FOUND TILES : = '+ foundTiles);
                }, 2000);

                cardsOpened[0].parentNode.classList.remove('tile-challenge');
                cardsOpened[1].parentNode.classList.remove('tile-challenge');  // DONT REMOVE THIS DECLARATIONS PLEASE
            } else {
                const comparableClass = cardsOpened[0].childNodes[0].classList[1];
                console.log(comparableClass);
                cardsOpened[0].childNodes[0].classList.replace(comparableClass, 'fake-class');
                console.log(cardsOpened[0].childNodes[0].classList[1]);

                setTimeout(() => {
                    let fake = document.querySelector('.fake-class');
                    fake.classList.replace('fake-class', comparableClass);
                }, 2000); 
            }

            function checkPassCondition(cardsOpened) {

                // Czy gdy znaleźliśmy ostatnią parę w ostatniej turze challengu
                let allChallengeTiles = document.querySelectorAll('.tile-challenge');
                let remainCount = 0;
                allChallengeTiles.forEach(ctile => {
                    let ctile_back = ctile.querySelector('.tile-back');
                   /*  if(!(ctile.classList.contains('target'))) {
                        remainCount++;
                    } */
                    if((ctile_back.childNodes[0].classList[1] !==  cardsOpened[0].childNodes[0].classList[1]) && (ctile_back.childNodes[0].classList[1] !==  cardsOpened[1].childNodes[0].classList[1])) {
                        remainCount++;
                    }
                })
                if(remainCount === 0) return true;
                else return false;
            }

        }
    },

    checkChallengeProgress_18: function(cardsOpened, tiles, foundTiles, iter) {
        let challengeTiles = document.querySelectorAll('.tile-challenge');

        // First, check if player resolved random challenge
        console.log(challengeTiles.length);

        if(challengeTiles.length === 0) {
            iter.array.splice(iter.amount, 1);
            iter.streak++;  // INDICATES CURRENT CHALLENGE No (starting from index 0);

            const timer = 2200;

            // Anyway, check which iter array combinations are outdated
            //this.testRemainCombinations_18(iter);

            setTimeout(() => {
                this.testRemainCombinations_18(iter);
                this.randomizeRemainIcons_18(cardsOpened, tiles, foundTiles, iter);
                this.setChallenge_18(cardsOpened, tiles, foundTiles, iter);
                console.log(document.querySelector('.board'))
            }, timer);

            async function winCAnimtion() {
                const a1 = anime({
                    targets: '.background',
                    duration: 1000,
                    backgroundColor: '#000',
                    easing: 'linear',
                }).finished;

                const a2 = anime({
                    targets: ['.board', '.countdown-box'],
                    duration: (timer/2),
                    opacity: [1, 0],
                    easing: 'easeOutSine',
                }).finished;

                await Promise.all([a1, a2]);
            }

            async function challengeCompletion() {
                const a1 = anime({
                    targets: '.completion-box',
                    duration: 2200,
                    opacity: [0, 1],
                    easing: 'easeOutQuint',
                    direction: 'alternate',
                }).finished;

                await Promise.all([a1]);
            }

            async function finishAnimation() {
                const a1 = anime({
                    targets: '.background',
                    duration: 1000,
                    backgroundColor: 'hsla(231, 65%, 25%, 0.7)',
                    easing: 'linear',
                }).finished;

                const a2 = anime({
                    targets: ['.board', '.countdown-box'],
                    duration: (timer/2),
                    opacity: [0, 1],
                    easing: 'easeInSine',
                }).finished;

                await Promise.all([a1, a2]);
            }

            async function showRandomizeBox() {
                const show = anime({
                    targets: '.randomize-box',
                    duration: 1100,
                    easing: 'linear',
                    opacity: [0, 1],
                })

                await Promise.all([show]);
            }

            async function animateThreeDots() {
                const animate = anime({
                    targets: '.challenge-dot',
                    keyframes: [
                        {duration: 800,  translateY: '-=8rem', easing: 'linear'},
                        {duration: 800,  translateY: '+=8rem', easing: 'easeOutBounce'},
                        {duration: 800,  translateY: '-=8rem', easing: 'linear'},
                        {duration: 800,  translateY: '+=8rem', easing: 'easeOutBounce'},
                        {duration: 800,  translateY: '-=8rem', easing: 'linear'},
                        {duration: 800,  translateY: '+=8rem', easing: 'easeOutBounce'},

                    ],
                    delay: anime.stagger(400),
                }).finished;

                await Promise.all([animate]);
            }

            async function fadeRandomizeBox() {
                const fade = anime({
                    targets: '.randomize-box',
                    duration: 700,
                    opacity: [1, 0],
                    easing: 'linear',
                }).finished;

                await Promise.all([fade]);
            }

            async function showChallengeTiles() {
                const show = anime({
                    targets: '.tile-challenge',
                    keyframes: [
                        {rotateY: '+=180deg', duration: 900, easing: 'easeInExpo'},
                        {rotateY: '-=180deg', duration: 900, delay: 3200, easing: 'easeOutQuint'},
                    ],
                }).finished;
    
                await Promise.all([show]);
            }

            async function init() {

                document.querySelector('.board').dataset.animation = 'on';
                document.querySelector('.board').setAttribute('pointerEvents', 'none');

                await winCAnimtion()
                .then(() => {
                    const animationContainer = document.querySelector('.animationContainer');
                    const completionBox = document.createElement('div');
                    const completionText = document.createElement('div');
    
                    completionBox.classList.add('completion-box');
                    completionText.classList.add('completion-text', 'completion-success');
    
                    completionText.textContent = 'Challenge completed'

                    completionBox.appendChild(completionText);
                    animationContainer.appendChild(completionBox);

                    console.log('all ok!')
                })
                await challengeCompletion()
                .then(() => {
                    const animationContainer = document.querySelector('.animationContainer');
                    const completionBox = animationContainer.querySelector('.completion-box');
                    completionBox.remove();
                })
                .then(() => {
                    const animationContainer = document.querySelector('.animationContainer');

                    const randomizeBox = document.createElement('div');
                    const randomizeInfo = document.createElement('div');

                    randomizeBox.appendChild(randomizeInfo);

                    for(let i=0; i<3; i++) {
                        let dot = document.createElement('div');
                        dot.classList.add('challenge-dot');
                        randomizeBox.appendChild(dot);
                    }

                    randomizeBox.classList.add('randomize-box');
                    randomizeInfo.classList.add('randomize-info');

                    randomizeInfo.textContent = 'Reset icons';

                    animationContainer.appendChild(randomizeBox);
                })
                await showRandomizeBox()
                await animateThreeDots()
                await fadeRandomizeBox()
                .then(() => {
                    const animationContainer = document.querySelector('.animationContainer');
                    const randomizeBox = animationContainer.querySelector('.randomize-box');
                    randomizeBox.remove();
                })
                await finishAnimation()
                await showChallengeTiles()
                .then(() => {

                    document.querySelector('.board').dataset.animation = 'off';
                    document.querySelector('.board').setAttribute('pointerEvents', 'auto');
                })
            }
            
            init();


        } 
        // Next - if not resolved, check if he has some turns left
        else if(iter.value === 0) {
            // Reset icons and then set new challenge
            const timer = 2200;

            setTimeout(() => {
                this.resetIcons_18(iter, foundTiles);
                this.setChallenge_18(cardsOpened, tiles, foundTiles, iter);
                //this.failedChallengeAnimation_18(cardsOpened, tiles, foundTiles, iter);
            }, timer);

            async function loseCAnimtion() {
                const a1 = anime({
                    targets: '.background',
                    duration: 1000,
                    backgroundColor: 'hsl(1, 60%, 30%)',
                    easing: 'linear',
                }).finished;

                const a2 = anime({
                    targets: ['.board', '.countdown-box'],
                    duration: (timer/2),
                    opacity: [1, 0],
                    easing: 'easeOutSine',
                }).finished;

                await Promise.all([a1, a2]);
            }

            async function challengeCompletion() {
                const a1 = anime({
                    targets: '.completion-box',
                    duration: 2200,
                    opacity: [0, 1],
                    easing: 'easeOutQuint',
                    direction: 'alternate',
                }).finished;

                await Promise.all([a1]);
            }

            async function finishAnimation() {
                const a1 = anime({
                    targets: '.background',
                    duration: 1000,
                    backgroundColor: 'hsla(231, 65%, 25%, 0.7)',
                    easing: 'linear',
                }).finished;

                const a2 = anime({
                    targets: ['.board', '.countdown-box'],
                    duration: (timer/2),
                    opacity: [0, 1],
                    easing: 'easeInSine',
                }).finished;

                await Promise.all([a1, a2]);
            }

            async function reveal() {
                const appear = anime({
                    targets: '.tile',
                    keyframes: [
                        {rotateY: '+=180deg', duration: 1100, easing: 'easeInSine'},
                        {rotateY: '-=180deg', duration: 1100, delay: 1700, easing: 'easeOutSine'},
                    ],
                    easing: 'easeInExpo',
                }).finished;

            await Promise.all([appear]);
            }

            async function showChallengeTiles() {
                const show = anime({
                    targets: '.tile-challenge',
                    keyframes: [
                        {rotateY: '+=180deg', duration: 900, easing: 'easeInExpo'},
                        {rotateY: '-=180deg', duration: 900, delay: 3200, easing: 'easeOutQuint'},
                    ],
                }).finished;
    
                await Promise.all([show]);
            }

            async function init() {

                document.querySelector('.board').dataset.animation = 'on';
                document.querySelector('.board').setAttribute('pointerEvents', 'none');

                await loseCAnimtion()
                .then(() => {
                    const animationContainer = document.querySelector('.animationContainer');
                    const completionBox = document.createElement('div');
                    const completionText = document.createElement('div');
    
                    completionBox.classList.add('completion-box');
                    completionText.classList.add('completion-text', 'completion-failure');
    
                    completionText.textContent = 'Challenge failed'

                    completionBox.appendChild(completionText);
                    animationContainer.appendChild(completionBox);

                    console.log('all ok!')
                })
                await challengeCompletion()
                .then(() => {
                    const animationContainer = document.querySelector('.animationContainer');
                    const completionBox = animationContainer.querySelector('.completion-box');
                    completionBox.remove();
                })
                await finishAnimation()
                if(iter.streak <= 0) { await reveal() }
                await showChallengeTiles()
                .then(() => {

                    document.querySelector('.board').dataset.animation = 'off';
                    document.querySelector('.board').setAttribute('pointerEvents', 'auto');
                })
            }
            
            init();

        }
    },

    testRemainCombinations_18(iter) {
        for(let m=0; m<iter.array.length; m++) {
            let allTiles = document.querySelectorAll('.tile');
            let testArr = [];
            let dimension = iter.array[m].charAt(0);
            let num = iter.array[m].charAt(1);

            if(dimension === 'r') {
                for(let x=0; x<(levels[`lvl18`].rows); x++) {
                    if(allTiles[((levels[`lvl18`].rows) * (num - 1)) + x].style.visibility === 'hidden') {
                        testArr.push(iter.array[m]);
                    }
                }
            } else if(dimension === 'c') {
                for(let y=0; y<(levels[`lvl18`].columns); y++) {
                    if(allTiles[(levels[`lvl18`].columns * y) + (num - 1)].style.visibility === 'hidden') {
                        testArr.push(iter.array[m]);
                    }
                }
            }

            if((testArr.length >= (levels[`lvl18`].rows)) || (testArr.length >= (levels[`lvl18`].columns))) {
                iter.array.splice(m, 1);
            }
        }
    },

    winChallengeAnimation_18: function(cardsOpened, tiles, foundTiles, iter) {
        document.querySelector('.board').dataset.animation = 'on';
        document.querySelector('.board').setAttribute('pointerEvents', 'none');

        async function showChallengeTiles() {
            const show = anime({
                targets: '.tile-challenge',
                keyframes: [
                    {rotateY: '+=180deg', duration: 900, easing: 'easeInExpo'},
                    {rotateY: '-=180deg', duration: 900, delay: 3200, easing: 'easeOutQuint'},
                ],
            }).finished;

            await Promise.all([show]);
        }

        async function init() {
            await showChallengeTiles()
                .then(() => {
                    document.querySelector('.board').dataset.animation = 'off';
                    document.querySelector('.board').setAttribute('pointerEvents', 'auto');
                })
        }

        init(); 
    },


    /* failedChallengeAnimation_18: function(cardsOpened, tiles, foundTiles, iter) {

        document.querySelector('.board').dataset.animation = 'on';
        document.querySelector('.board').setAttribute('pointerEvents', 'none');

        if(iter.streak <= 0) {

            async function reveal() {
                const appear = anime({
                    targets: '.tile',
                    keyframes: [
                        {rotateY: '+=180deg', duration: 1100, easing: 'easeInSine'},
                        {rotateY: '-=180deg', duration: 1100, delay: 1700, easing: 'easeOutSine'},
                    ],
                    easing: 'easeInExpo',
                }).finished;

            await Promise.all([appear]);
            }

            async function showChallengeTiles() {
                const show = anime({
                    targets: '.tile-challenge',
                    keyframes: [
                        {rotateY: '+=180deg', duration: 900, easing: 'easeInExpo'},
                        {rotateY: '-=180deg', duration: 900, delay: 3200, easing: 'easeOutQuint'},
                    ],
                }).finished;

                await Promise.all([show]);
            }

            async function init() {
                await reveal()
                await showChallengeTiles()
                    .then(() => {
                        document.querySelector('.board').dataset.animation = 'off';
                        document.querySelector('.board').setAttribute('pointerEvents', 'auto');
                    })
            }

            init();
        } else {
            async function showChallengeTiles() {
                const show = anime({
                    targets: '.tile-challenge',
                    keyframes: [
                        {rotateY: '+=180deg', duration: 900, easing: 'easeInExpo'},
                        {rotateY: '-=180deg', duration: 900, delay: 3200, easing: 'easeOutQuint'},
                    ],
                }).finished;

                await Promise.all([show]);
            }

            async function init() {
                await showChallengeTiles()
                    .then(() => {
                        document.querySelector('.board').dataset.animation = 'off';
                        document.querySelector('.board').setAttribute('pointerEvents', 'auto');
                    })
            }

            init();
        }
    }, */

    resetIcons_18: function(iter, foundTiles) {
        //const allTiles = document.querySelectorAll('.tile');

        console.log(iter.nextArr.length);
        iter.fTilesModifier=  0 - (iter.nextArr.length); 
        foundTiles -= iter.fTilesModifier;


        for(let p=0; p<iter.nextArr.length; p++) {
            iter.nextArr[p].parentNode.style  = 'visibility: visible';
        }

        /* UNCOMMENT FOR RANDOM ICON EFFECT

        let visibleTiles = [];
        let visibleIcons = [];
        
        allTiles.forEach(tile => {
            if(tile.style.visibility === 'visible') {
                tile.classList.remove('tile-challenge');
                let back = tile.querySelector('.tile-back');
                visibleIcons.push(back.childNodes[0]);
                visibleTiles.push(tile);
            }
        })

        for(let i=0; i<visibleTiles.length; i++) {
            let rand = Math.floor(Math.random() * visibleIcons.length);
            let back = visibleTiles[i].querySelector('.tile-back');
            if(back.hasChildNodes()) {
                back.childNodes[0].remove();
            }
            back.appendChild(visibleIcons[rand]);

            visibleIcons.splice(rand, 1);
        } */

    },

    randomizeRemainIcons_18: function (cardsOpened, tiles, foundTiles, iter) {
        // THIS HAPPENS ONLY WHEN YOU WIN A CHALLENGE
        const allTiles = document.querySelectorAll('.tile');

        let visibleTiles = [];
        let visibleIcons = [];
        
        allTiles.forEach(tile => {
            if((tile.style.visibility !== 'hidden') && (!(tile.classList.contains('target')))) {
                //tile.classList.remove('tile-challenge');
                let back = tile.querySelector('.tile-back');
                visibleIcons.push(back.childNodes[0]);
                visibleTiles.push(tile);
            }
        })

        console.log(`%c visibleTiles:  ${visibleTiles}`, `background: #89b; color: #a2e; font-weight: 700;`);
        console.log(`%c visibleIcons:  ${visibleIcons}`, `background: #a2e; color: #89b; font-weight: 700;`);

        for(let i=0; i<visibleTiles.length; i++) {
            let rand = Math.floor(Math.random() * visibleIcons.length);
            let back = visibleTiles[i].querySelector('.tile-back');
            if(back.hasChildNodes()) {
                back.childNodes[0].remove();
            }
            back.appendChild(visibleIcons[rand]);

            visibleIcons.splice(rand, 1);
        }
    },


    updateCountdown_18: function(cardsOpened, tiles, foundTiles, iter) {
        let countdown = document.querySelector('.countdown');
        countdown.textContent = `${iter.value}`;
    },







    // LVL 19
    quickFadeInOut_19(cardsOpened, tiles, foundTiles, iter) {
        const animationContainer = document.querySelector('.animationContainer');

        anime({
            targets: animationContainer,
            duration: 700,
            backgroundColor: 'hsla(0, 0%, 0%, 0)',
            easing: 'linear',
        })
    },

    addPseudoClasses_19: function(cardsOpened, tiles, foundTiles, iter) {
        const allTiles = document.querySelectorAll('.tile');
        allTiles.forEach(tile =>  {
            tile.classList.add(`gem-${iter.streak}`);
            tile.style = 'visibility: hidden;';
        })
    },

    createDummyIcons_19: function(cardsOpened, tiles, foundTiles, iter) {
        let allTiles = document.querySelectorAll('.tile');
        allTiles.forEach((tile, index) => {
            let back = tile.querySelector('.tile-back');
            iter.array.push(back.childNodes[0]);
            if(index >= ((levels[`lvl19`].rows) * (levels[`lvl19`].columns))) {
                tile.remove();
            } else {
                tile.style = 'visibility: visible;';
            }
        })

        function sortSvgs(array) {
            let compareArr = [];
            for(let x=0; x<array.length; x++) {
                compare(array[x], compareArr);
            }
            return compareArr;
        }

        function compare(item, compareArr) {
            compareArr.unshift(item);
            if(compare.length > 1) {
                for(let y=1; y<compareArr.length; y++) {
                    if(item.classList[1] > compareArr[y].classList[1]) {
                        let z = compareArr[y];
                        compareArr[y] = compareArr[y-1];
                        compareArr[y-1] = z;
                    }
                }
            } else {
                return compareArr;
            }
        }

        let sortediconsArr = sortSvgs(iter.array);

       // console.log(iter.array);  // UNTOUCHED
       // console.log(sortediconsArr);  // SORTED
        
        let actualIcons = [];

        for(let i=0; i<((levels[`lvl19`].rows) * (levels[`lvl19`].columns)); i++) {
            actualIcons.push(sortediconsArr[0]);
            sortediconsArr.shift();
        }

        // Before allTiles.length === 126
        allTiles = document.querySelectorAll('.tile');
        // Mow allTiles.length === 42

        for(let x=0; x<((levels[`lvl19`].rows) * (levels[`lvl19`].columns)); x++) {
            let rand = Math.floor(Math.random() * actualIcons.length);
            let back = allTiles[x].querySelector('.tile-back');
            if(back.hasChildNodes()) {
                back.childNodes[0].remove();
            }
            back.appendChild(actualIcons[rand]);
            actualIcons.splice(rand, 1);
        }

        /*for(let x=0; x<((levels[`lvl19`].rows) * (levels[`lvl19`].columns)); x++) {
            let back = allTiles[x].querySelector('.tile-back');
            //console.log(back.childNodes[0].classList[1]);
        } */

        console.log(sortediconsArr.length);

        // Now we can empty our dummy array...
        iter.array = [];
        // ... and fill once again

        for(let a=0; a<sortediconsArr.length; a=a+2) {
            iter.array.push(sortediconsArr[a]);
        }

        // After all we have 1 times every dummy icon (total: 42);

        console.log(iter.array);

    },

    createProgressBar_19: function(cardsOpened, tiles, foundTiles, iter) {
        const animationContainer = document.querySelector('.animationContainer');
        let progressBar = document.createElement('div');
        progressBar.classList.add('p-bar');
        for(let j=0; j<(((levels[`lvl19`].rows) * (levels[`lvl19`].columns)) / 2); j++) {  // half of tiles, because wa are counting pairs !!
            let progressStep = document.createElement('div');
            progressStep.classList.add('p-step');
            progressBar.appendChild(progressStep);
        }
        animationContainer.appendChild(progressBar);
    },

    animateGem_19: function(cardsOpened, tiles, foundTiles, iter) {
        let currTarget;

        if(cardsOpened.length <= 1) {
            currTarget = document.querySelector('.target-1');
        } else {
            currTarget = document.querySelector('.target-2');
        }

        anime({
            targets: currTarget,
            duration: 400,
            opacity: ['.5'],
            direction: 'alternate',
        })
    },

    appendDummyIcons_19: function(cardsOpened, tiles, foundTiles, iter) {

        // WHAT IS THE MAIN CONDITION TO FIRE THAT FUNCTION ?  ->  TURNS USED, OR TILES FOUND ? let it be tiles, turns used is impossible !!
        // it'll be fired 7 times - 6 tiles per every count - not exactly like this !!!


        if((foundTiles+2 > (((levels[`lvl19`].rows) * (levels[`lvl19`].columns)) / 1.25)) && (iter.streak === 3) && (cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1])) {
            // if  ftiles > 42 / 1.5 -> if ftiles > 33
            let newDummiesCount = 12;          
            iter.streak++;
            this.modifyGrid_19(iter, newDummiesCount);

            // SOME ASYNC ANIMATIONS HERE
            this.asyncDummyChapter(iter, newDummiesCount);
        }
        else if((foundTiles+2 > (((levels[`lvl19`].rows) * (levels[`lvl19`].columns)) / 2)) && (iter.streak === 2) && (cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1])) {
            // if  ftiles > 42 / 2 -> if ftiles > 21
            let newDummiesCount = 6;
            iter.streak++;
            this.modifyGrid_19(iter, newDummiesCount);

            // SOME ASYNC ANIMATIONS HERE
            this.asyncDummyChapter(iter, newDummiesCount);
        }
        else if((foundTiles+2 > (((levels[`lvl19`].rows) * (levels[`lvl19`].columns)) / 3)) && (iter.streak === 1) && (cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1])) {
            // if  ftiles > 42 / 3 -> if ftiles > 14
            let newDummiesCount = 8;
            iter.streak++;
            this.modifyGrid_19(iter, newDummiesCount);

            // SOME ASYNC ANIMATIONS HERE
            this.asyncDummyChapter(iter, newDummiesCount);
        }
        else if((foundTiles+2 > (((levels[`lvl19`].rows) * (levels[`lvl19`].columns)) / 6)) && (iter.streak <= 0) && (cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1])) { 
            // if  ftiles > 42 / 6 -> if ftiles > 7
            let newDummiesCount = 8;  // it has to be lower or equal yet found tiles in order to place new dummies in grid
            iter.streak++;
            this.modifyGrid_19(iter, newDummiesCount);

            // SOME ASYNC ANIMATIONS HERE
            this.asyncDummyChapter(iter, newDummiesCount);
        }
    },

    updateProgressBar_19: function(cardsOpened, tiles, foundTiles, iter) {
        if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) {
            let progressBar = document.querySelector('.p-bar');
            let pBarItem = progressBar.querySelector(`.p-step:nth-of-type(${((foundTiles + 2) / 2)})`);
            //pBarItem.style = 'background-image: radial-gradient(hsl(85, 30%, 50%), hsl(281, 40%, 50%) 25%, hsl(140, 50%, 60%));';
            //pBarItem.style = 'background-image: linear-gradient(120deg, hsl(185, 30%, 50%), hsl(215, 40%, 50%) 25%, hsl(0, 0%, 0%))';
            
            anime({
                targets: pBarItem,
                duration: 2400,
                backgroundImage: [' inherit', 'linear-gradient(120deg, hsl(185, 30%, 50%), hsl(215, 40%, 50%) 25%, hsl(0, 0%, 0%))'],
                easing: 'easeInSine',
            })
        
        }
    },

    checkLevelProgress_19: function(cardsOpened, tiles, foundTiles, iter) {
        if((foundTiles+4 >= ((levels[`lvl19`].rows) * (levels[`lvl19`].columns))) && (cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1])) {
            console.log('FOUND TILES !!!  '+foundTiles);
            if(iter.amount > 0) {return; }

            iter.amount++;
            console.log('YOU WON LV 19')
            // ADD STUFF
            iter.fTilesModifier = ((levels[`lvl19`].rows) * (levels[`lvl19`].columns) * 2);
            //iter.extraTurns = -1;
            this.destroyAllFakes(cardsOpened, tiles, foundTiles, iter);
        }
    },

    /* Create following animations :
    
    - When you add some dummy tiles (async + anime);
    - Update progress bar (anime);   - ok, but might be improved
    - When you (almost) win the game - fade those remain dummies (anime):
    - Pair match  (?) -> (anime);
    
    */

    modifyGrid_19(iter, newDummiesCount) {

        const board = document.querySelector('.board');

        let allTiles = document.querySelectorAll('.tile');
        allTiles.forEach(tile => {
            if((tile.style.visibility === 'hidden') || (tile.classList.contains('target'))) {
                tile.remove();
            }
        })

        for(let d=0; d<newDummiesCount; d++) {
            // Front
            let front = document.createElement('div');
            front.classList.add('tile-front', 'tf-19');
            // Back
            let back = document.createElement('div');
            back.classList.add('tile-back', 'tb-19');

            let newTile = document.createElement('div');
            newTile.classList.add('tile', 't-19');


            let rand = Math.floor( Math.random() * iter.array.length);

            newTile.appendChild(front);
            newTile.appendChild(back);

            back.appendChild(iter.array[rand]);

            iter.nextArr.push(iter.array[rand]);
            iter.array.splice(rand, 1);

            board.appendChild(newTile);
            console.log('created');
        }

        // Now let's redistibute icons - grab all icons and set it randomly to already existing tiles, BUT WAIT FOR A WHILE AND LET
        // THE LAST PAIR TO DISAPPEAR FROM THE SCREEN - done, cool

        allTiles = document.querySelectorAll('.tile');
        let allIcons = [];

        allTiles.forEach(tile => {
            let back = tile.querySelector('.tile-back');
            allIcons.push(back.childNodes[0]);
            back.childNodes[0].remove();
        })

        console.log(allTiles);
        console.log(allIcons);

        allTiles.forEach(tile => {
            let rand = Math.floor( Math.random() * allIcons.length);
            let back = tile.querySelector('.tile-back');
            back.appendChild(allIcons[rand]);
            allIcons.splice(rand, 1);
        })

        console.log(allIcons);
    },

    asyncDummyChapter: function(iter, newDummiesCount) {
        const board = document.querySelector('.board');

        let content = {
            dummy1: {
                text: 'Do NOT trust all the tiles',
                hueR: '55deg',
                visBg: '55, 46%, 36%',
                gemBackColor: '55',
            },
            dummy2: {
                text: `Let's see what have changed`,
                hueR: '110deg',
                visBg: '344, 46%, 36%',
                gemBackColor: '344',
            },
            dummy3: {
                text: `Already feel exhasuted ?`,
                hueR: '160deg',
                visBg: '107, 46%, 36%',
                gemBackColor: '171',
            },
            dummy4: {
                text: `Good luck :)`,
                hueR: '220deg',
                visBg: '283, 46%, 36%,',
                gemBackColor: '283',
            },
        }

        async function moveBoard() {
            const a1 = anime({
                targets: board,
                duration: 2200,
                translateY: '+=2200',
                easing: 'easeInQuad',
            }).finished;

            await Promise.all([a1]);
        }
        
        async function showVis() {
            const allVis = document.querySelectorAll('.vis-black');

            const a2 = anime({
                targets: allVis,
                duration: 700,
                delay: anime.stagger(300, {from: 'center'}),
                easing: 'linear',
                opacity: [0, 1],
            }).finished;

           await Promise.all([a2]);

        }

        async function showMessageText() {

            const getMsgText = document.querySelector('.msg-text');
            getMsgText.style = 'visibility: visible;';

            const a3 = anime({
                targets: getMsgText,
                duration: 2100,
                opacity: [0, 1],
                visibility: ['visible', 'visible'],
                easing: 'easeInSine',
            }).finished;



           await Promise.all([a3]);
        }

        async function hideVis() {
            const allVis = document.querySelectorAll('.vis-black');
            const getMsgText = document.querySelector('.msg-text');

            const a4  = anime({
                targets: allVis,
                duration: 900,
                easing: 'linear',
                delay: anime.stagger(300),
                opacity: [1, 0],
            }).finished;

            const a4b = anime({
                targets: getMsgText,
                duration: 1800,
                easing: 'easeInCirc',
                filter: `hue-rotate(${content[`dummy${iter.streak}`].hueR})`,
            })

            await Promise.all([a4, a4b]);
        }
        
        async function hideMessageText() {
            const getMsgText = document.querySelector('.msg-text');

            const a5 = anime({
                targets: getMsgText,
                duration: 1500,
                scale: [1, 0],
                easing: 'easeOutCirc',
            }).finished;

            await Promise.all([a5]);
        }
        
        async function retrieveBoard() {
            const a6 = anime({
                targets: board,
                duration: 2200,
                translateY: '-=2200',
                easing: 'easeOutQuad',
            }).finished;

            await Promise.all([a6]);
        }

        async function init() {
            document.querySelector('.board').dataset.animation = 'on';
            document.querySelector('.board').setAttribute('pointerEvents', 'none');

            await moveBoard()
            .then(() => {
                const animationContainer = document.querySelector('.animationContainer');

                const messageDiv = document.createElement('div');
                const messageText = document.createElement('div');

                for(let i=0; i<20; i++) {
                    let vis = document.createElement('div');
                    vis.classList.add('vis-black');
                    messageDiv.appendChild(vis);

                    vis.style = `box-shadow: 0px -1px 5px 17px hsla(${content[`dummy${iter.streak}`].visBg}, 0.81); background:hsla(0, 0%, 0%, 0.9);`;
                }

                messageDiv.classList.add('msg-div');
                messageText.classList.add('msg-text');

                messageText.textContent = content[`dummy${iter.streak}`].text;

                messageDiv.appendChild(messageText);
                animationContainer.appendChild(messageText);
                animationContainer.appendChild(messageDiv);
            })
            await showVis()
            await showMessageText()
            .then(() => {
                const allTiles = document.querySelectorAll('.tile');
                allTiles.forEach(tile =>  {
                    let back = tile.querySelector('.tile-back');
                    back.style = `background-image: radial-gradient(hsla(${content[`dummy${iter.streak}`].gemBackColor}, 40%, 40%, .65), hsla(202, 40%, 40%, .65));`
                    tile.classList.remove(`gem-${iter.streak - 1}`);
                    tile.classList.add(`gem-${iter.streak}`);
                })
            })
            await hideVis()
            await hideMessageText()
            await retrieveBoard()
            .then(() => {
                const messageText = document.querySelector('.msg-text');
                const messageDiv = document.querySelector('.msg-div');

                messageText.remove();
                messageDiv.remove();

                document.querySelector('.board').dataset.animation = 'off';
                document.querySelector('.board').setAttribute('pointerEvents', 'auto');
            })
            .then(() => {
                if(iter.streak === 1) {
                    for(let i=0; i<iter.nextArr.length; i++) {
                        iter.nextArr[i].style = 'color: hsla(7, 70%, 40%, .75);';
                    }
                }
                else if((iter.streak === 2) || (iter.streak === 3)) {
                    for(let i=0; i<iter.nextArr.length; i++) {
                        iter.nextArr[i].style = 'color: hsla(0, 0%, 0%, .65);';
                    }
                    document.querySelector('.board').dataset.animation = 'on';
                    document.querySelector('.board').setAttribute('pointerEvents', 'none');
            
                    async function showTiles() {
                        const show = anime({
                            targets: '.tile',
                            keyframes: [
                                {rotateY: '+=180deg', duration: 900, easing: 'easeInExpo'},
                                {rotateY: '-=180deg', duration: 900, delay: 1400, easing: 'easeOutQuint'},
                            ],
                        }).finished;
            
                        await Promise.all([show]);
                    }
            
                    async function init2() {
                        await showTiles()
                            .then(() => {
                                document.querySelector('.board').dataset.animation = 'off';
                                document.querySelector('.board').setAttribute('pointerEvents', 'auto');
                            })
                    }
            
                    init2(); 
                }   
            })
        }

        init();
    },

    destroyAllFakes: function(cardsOpened, tiles, foundTiles, iter) {
        document.querySelector('.board').dataset.animation = 'on';
        document.querySelector('.board').setAttribute('pointerEvents', 'none');

        let tilesToDestroy = [];

        for(let i=0; i<iter.nextArr.length; i++) {
            let tile = iter.nextArr[i].parentNode.parentNode;
            tilesToDestroy.push(tile);
        }

        async function destroy() {
            const a1 = anime({
                targets: tilesToDestroy,
                duration: 2400,
                rotate: 360,
                scale: [1, 0],
            }).finished;

            await Promise.all([a1]);
        }

        async function fadeBoard() {
            const a2 = anime({
                targets: '.board',
                duration: 500,
                opacity: [1, 0],
                easing: 'easeInSine',
            }).finished;

            await Promise.all([a2]);
        }

        async function showMsg() {
            const getMsgText = document.querySelector('.msg-text');
            getMsgText.style = 'visibility: visible;';

            const a3 = anime({
                targets: getMsgText,
                duration: 1300,
                opacity: [0, 1],
                translateY: ['-=2200', '+=2200'],
                easing: 'easeInExpo',
            }).finished;

            await Promise.all([a3]);
        }

        async function fadeMsg() {
            const getMsgText = document.querySelector('.msg-text');

            const a4 = anime({
                targets: getMsgText,
                delay: 800,
                duration: 1400,
                backgroundImage: 'linear-gradient(45deg, hsla(0, 0%, 0%, 0), hsla(0, 0%, 0%, 0))',
                textShadow: '0px 0px 0px hsla(0, 0%, 0%, 0)',

            }).finished;

            await Promise.all([a4]);
        }

        async function showBoard() {
            const a5  = anime({
                targets: '.board',
                duration: 1600,
                opacity: [0, 1],
                rotate: '180deg',
                easing: 'easeInBounce',
            }).finished;

            await Promise.all([a5]);
        }

        async function init3() {
            await destroy()
            await fadeBoard()
            .then(() => {
                const animationContainer = document.querySelector('.animationContainer');

                const messageDiv = document.createElement('div');
                const messageText = document.createElement('div');

                messageDiv.classList.add('msg-div');
                messageText.classList.add('msg-text');

                messageText.textContent = 'Surprised ?';

                messageDiv.appendChild(messageText);
                animationContainer.appendChild(messageText);
                animationContainer.appendChild(messageDiv);
            })
            await showMsg()
            await fadeMsg()
            .then(() => {
                for(let i=0; i<tilesToDestroy.length; i++) {
                    tilesToDestroy[i].remove();
                }
            })
            await showBoard()
            .then(() => {
                document.querySelector('.board').dataset.animation = 'off';
                document.querySelector('.board').setAttribute('pointerEvents', 'auto');
            })

        }

        init3(); 
        console.log('destroyed');
    },








    // LVL 20 - Final level !

    prepareTilesToPairs_20: function(cardsOpened, tiles, foundTiles, iter) {

        const allTiles = document.querySelectorAll('.tile');
        let iconsArray = [];

        allTiles.forEach(tile => {
            let back = tile.querySelector('.tile-back');
            iconsArray.push(back.childNodes[0]);
        })

        function sortSvgs(array) {
            let compareArr = [];
            for(let x=0; x<array.length; x++) {
                compare(array[x], compareArr);
            }
            return compareArr;
        }

        function compare(item, compareArr) {
            compareArr.unshift(item);
            if(compare.length > 1) {
                for(let y=1; y<compareArr.length; y++) {
                    if(item.classList[1] > compareArr[y].classList[1]) {
                        let z = compareArr[y];
                        compareArr[y] = compareArr[y-1];
                        compareArr[y-1] = z;
                    }
                }
            } else {
                return compareArr;
            }
        }

        iter.array = sortSvgs(iconsArray);
    },

    createSeparateRooms_20: function(cardsOpened, tiles, foundTiles, iter) {

        console.log(iter.array)

        const board = document.querySelector('.board');
        const novaGrid = document.createElement('div');
        novaGrid.classList.add('main-grid');
        board.appendChild(novaGrid);
        let allTiles = document.querySelectorAll('.tile');
        let roomsCount = 4;
        let directoriesCount = 5;
        const colorOptions = 2;

        const colorObj = {
            // red, orange, yellow, green, lightblue, darkblue, purple, pink
            a0: ['red', 'green'],
            a1: ['yellow', 'darkblue'],
            a2: ['lightblue', 'purple'],
            a3: ['orange', 'pink'],
        }

        for(let a=0; a<roomsCount; a++) {
            let room = document.createElement('div');
            room.classList.add('room', `room-${a + 1}`);
            board.appendChild(room);

            let substractionCount = 0;
            let colorFirstAmount = 0;
            let colorSecondAmount = 0;
            
            // Color tiles
            for(let z=0; z<(allTiles.length / roomsCount); z = z + 2) {
                let tile = iter.array[z].parentNode.parentNode;
                let tileSibling = iter.array[z+1].parentNode.parentNode;
                let rand = Math.floor( Math.random() * colorOptions);

                /* if(rand === 0) {
                    if(colorFirstAmount === ((allTiles.length / roomsCount) / colorOptions)) {
                        rand++;
                    } else { colorFirstAmount+= 2;}
                } else if(rand === 1) {
                    colorSecondAmount+= 2;
                    if(colorSecondAmount === ((allTiles.length / roomsCount) / colorOptions)) {
                        rand--;
                    } else { colorSecondAmount+= 2; }
                } */

                if((rand === 0) && ((colorFirstAmount >= (allTiles.length / roomsCount) / colorOptions))) {
                    rand = 1;
                } else if ((rand === 1) && ((colorSecondAmount >= (allTiles.length / roomsCount) / colorOptions))) {
                    rand = 0;
                }

                if(rand === 0) {colorFirstAmount = colorFirstAmount + 2;}
                else if(rand === 1) {colorSecondAmount = colorSecondAmount + 2;}

                //console.log(rand, a);

                let starEffectDiv = document.createElement('div');
                tile.appendChild(starEffectDiv);
                starEffectDiv.classList.add('star-effect', `star-${colorObj[`a${a}`][rand]}`);

                let starEffectDivSibling = document.createElement('div');
                tileSibling.appendChild(starEffectDivSibling);
                starEffectDivSibling.classList.add('star-effect', `star-${colorObj[`a${a}`][rand]}`);

            }

            for(let b=(a * (allTiles.length / roomsCount)); b<((a + 1) * (allTiles.length / roomsCount)); b++) {
                //let currentRoom = document.querySelector(`.room-${a + 1}`);
                let rand = Math.floor(Math.random() * ((allTiles.length / roomsCount) - substractionCount));
                //console.log(currentRoom);
                //console.log(iter.array[rand].parentNode.parentNode, b);
                //console.log(iter.array);
                room.appendChild(iter.array[rand].parentNode.parentNode);
                iter.array.splice(rand, 1);
                substractionCount++;
            }
        }

        for(let c=0; c<directoriesCount; c++) {
            let directory = document.createElement('div');
            directory.classList.add(`directory`, `directory-${c + 1}`);
            board.appendChild(directory);
        }

        let addedRooms = 0;
        let addedDirectories = 0;

        let initialDirections = {
            dir1: 'right',
            dir3: 'up',
            dir4: 'up',
            dir5: 'down',
            dir7: 'left',
        }

        let qnovaGrid = document.querySelector('.main-grid');

        for(let i=0; i<9; i++) {
            if((i === 0) || (i === 2) || (i === 6) || (i === 8)) {
                let room = document.querySelector(`.room-${addedRooms + 1}`)
                qnovaGrid.appendChild(room);
                addedRooms++;
            } else {
                let directory = document.querySelector(`.directory-${addedDirectories + 1}`)
                let arrow = document.createElement('img');
                arrow.classList.add('directory-arrow', `directory-arrow-${addedDirectories + 1}`);
                arrow.alt = `arrow-${initialDirections[`dir${i}`]}`;
                arrow.src = `arrow-${initialDirections[`dir${i}`]}.svg`;
                //let wholeArrow = arrow.querySelector('svg > g > g > g > rect');
                //console.log(wholeArrow)
                //wholeArrow.fill = 'blue';
                directory.appendChild(arrow);
                qnovaGrid.appendChild(directory);
                addedDirectories++;
            }
        }

    },

    blockThreeRoomsAndActivateDirectories_20: function(cardsOpened, tiles, foundTiles, iter) {
        
        // 1. At very beginning pick one starting room and block pointer events on the others

        const roomsCount = 4;
        const colorOptions = 2;
        let animationArray = [];

        for(let i=1; i<=4; i++) {
            let room = document.querySelector(`.room-${i}`);
            room.style = 'pointer-events: none;';
            animationArray.push(room);
        }

        let randomStart = Math.floor( Math.random() * roomsCount) + 1;

        let startRoom = document.querySelector(`.room-${randomStart}`);
        startRoom.style = 'pointer-events: auto;';
        animationArray.splice(randomStart - 1, 1);

        iter.value = startRoom;

        anime({
            targets: animationArray,
            duration: 2400,
            delay: anime.stagger(2400),
            //opacity: [1, 0],
            filter: 'grayscale(100%)',
            easing: 'easeOutExpo',
        })

        // 2. Now activate two directoires, based on which room has been chosen

        console.log(iter.value)

        const directoriesToActivate = {
            r1: ['arrow-1', 'arrow-2'],
            r2: ['arrow-1', 'arrow-4'],
            r3: ['arrow-2', 'arrow-5'],
            r4: ['arrow-4', 'arrow-5'],
        }

        const startRoomClassName = iter.value.classList[1];

        const firstLetter = startRoomClassName[0];
        const lastLetter = startRoomClassName[startRoomClassName.length - 1];

        //console.log(firstLetter + lastLetter);

        let arrowsToColor = directoriesToActivate[firstLetter + lastLetter];
        let thisRoomColors = [];
        console.log(arrowsToColor);

        // Get the colors from board elems
        let thisRoom = document.querySelector(`.${startRoomClassName}`);
        let thisRoomTiles = thisRoom.querySelectorAll('.tile');
        thisRoomTiles.forEach((tile, index) => {
            let starEffect = tile.querySelector('.star-effect');
            let color = starEffect.classList[1];

            if(thisRoomColors.length >= colorOptions) {}
            else if(index === 0) {thisRoomColors.push(color);}
            else if(color !== thisRoomColors[0]) {thisRoomColors.push(color);}
        })

        console.log(thisRoomColors); // star-orange, star-pink

        // We ve got proper colors, so now paint out arrows randomly
        // ...

        for(let n=0; n<colorOptions; n++) {
            let rand = Math.floor(Math.random() * thisRoomColors.length);
            let thisArrow = document.querySelector(`.directory-${arrowsToColor[n]}`);
            console.log(thisArrow);
            thisArrow.classList.add(thisRoomColors[rand], `arrow-type`);
            thisRoomColors.splice(rand, 1);
        } 
    },

    lookForRandomizingScenario_20(cardsOpened, tiles, foundTiles, iter) {

        // First check initial conditions
        //if(!cardsOpened[0]) { this.pickRandomizingScenario_20(cardsOpened, tiles, foundTiles, iter); }
        if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) {
            this.pickRandomizingScenario_20(cardsOpened, tiles, foundTiles, iter);
        }
    },

    pickRandomizingScenario_20(cardsOpened, tiles, foundTiles, iter) {
        console.log('i Love console.log');
        // Initial object - quite complicated tbh

        const conflict = 'conflict';
        const peaceful = 'peaceful';
        const selfPointing = 'self-pointing';
        const magic = 'magic';

        const behaviourControlObj = {
            // Consider removing those line which result in CONFLICT scenario. It may be determined also
            // by whether arrow obj has this prop or not (for example: arrow_1 don't need arrow_up option)           
            
            room_1: {
                arrow_1: {
                    // Clockwise order
                    arrow_up: conflict,
                    arrow_right: peaceful,
                    arrow_down: conflict,
                    arrow_left: selfPointing,
                },
                arrow_2: {
                    arrow_up: selfPointing,
                    arrow_right: conflict,
                    arrow_down: peaceful,
                    arrow_left: conflict,
                },
                arrow_3: {
                    // It's gonna be rotated based on room number 
                    arrow_top: magic,
                },
            },
            room_2: {
                arrow_1: {
                    arrow_up: conflict,
                    arrow_right: selfPointing,
                    arrow_down: conflict,
                    arrow_left: peaceful,
                },
                arrow_3: {
                    arrow_top: magic,
                },
                arrow_4: {                    
                    arrow_up: selfPointing,
                    arrow_right: conflict,
                    arrow_down: peaceful,
                    arrow_left: conflict,
                },
            },
            room_3: {
                arrow_2: {
                    arrow_up: peaceful,
                    arrow_right: conflict,
                    arrow_down: selfPointing,
                    arrow_left: conflict,
                },
                arrow_3: {
                    arrow_top: magic,
                },
                arrow_5: {
                    arrow_up: conflict,
                    arrow_right: peaceful,
                    arrow_down: conflict,
                    arrow_left: selfPointing,
                },
            },
            room_4: {
                arrow_3: {
                    arrow_top: magic,
                },
                arrow_4: {
                    arrow_up: peaceful,
                    arrow_right: conflict,
                    arrow_down: selfPointing,
                    arrow_left: conflict,
                },
                arrow_5: {
                    arrow_up: conflict,
                    arrow_right: selfPointing,
                    arrow_down: conflict,
                    arrow_left: peaceful,
                },
            },
        }

        // WE ARE ALWAYS CERTAIN THAT cardsOpened[0].parentNode's color equals cardsOpened[1].parentNode
        let tile = cardsOpened[0].parentNode;

        // Let's get the room number first
        const room = tile.parentNode;
        let roomNoUnformatted = room.classList[1];
        let roomNoFormatted;
        if(roomNoUnformatted.includes('-')) {
            roomNoFormatted = roomNoUnformatted.replace('-', '_');
        } else {
            roomNoFormatted = roomNoUnformatted;
        }

        // Now let's go for arrow identifier

        let starEffect = tile.querySelector('.star-effect');

        let chosenColorPath = starEffect.classList[1];

        console.log(chosenColorPath); // star-pink  as an example - so the player chose pink path

        // Now look for that arrow that contains
        let arrowToFollow;
        const allArrows = document.querySelectorAll('.directory-arrow');
        allArrows.forEach((arrow) => {
            if(arrow.classList.contains(chosenColorPath)) arrowToFollow = arrow;
        })

        console.log(arrowToFollow); // We have now a proper arrow to follow further instructions on !!
        
        let arrowAltUnformatted = arrowToFollow.alt;
        let arrowAltFormatted;
        if(arrowAltUnformatted.includes('-')) {
            arrowAltFormatted = arrowAltUnformatted.replace('-', '_');
        } else {
            arrowAltFormatted = arrowAltUnformatted;
        }

        let arrowToFollowNo = arrowToFollow.classList[1];

        let initialIndex = arrowToFollowNo.indexOf('arrow');
        let arrowIdentifierUnformatted = arrowToFollowNo.substring(initialIndex);

        let arrowIdentifierFormatted;
        if(arrowIdentifierUnformatted.includes('-')) {
            arrowIdentifierFormatted = arrowIdentifierUnformatted.replace('-', '_');
            //arrowIdentifierFormatted = arrowIdentifierUnformatted.
        } else {
            arrowIdentifierFormatted = arrowIdentifierUnformatted;
        }

        console.log(roomNoFormatted); // Room number compatible with behaviourControlObj
        console.log(arrowIdentifierFormatted); // Finally compatible with behaviourControlObj ^^
        console.log(arrowAltFormatted); // Direction where the arrow points to

    },
}

export default flags;