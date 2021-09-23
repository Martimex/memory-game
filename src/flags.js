import anime from 'animejs/lib/anime.es.js';
import { useRef } from 'react/cjs/react.development';
import Game from './components/game.js';
//import { tiles, foundTiles } from './components/game.js';
//let gameboard = useRef(null);

// WINNING CONDITION :  if(foundTiles+2 === tiles) equals true
// IF TWO CARDS MATCH:  if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1])
// GET THE RIGHT TILE'S CHILD NODES [NOT #TEXT AND SUCH] BY A TARGET CLASS: 
    /* let target = document.querySelector(.target-1); targetTile.querySelector('.tile-back'); */

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
        console.log('IVALUE: '+iter.value);
        console.log('TILES: '+tiles);
        console.log('FOUND: '+foundTiles);
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
        let allTiles = document.querySelectorAll('.t-8');
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
        if(foundTiles+2 === tiles) {  // last pair before win has to be green of course
            let allTiles = document.querySelectorAll('.t-8');
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

}

export default flags;