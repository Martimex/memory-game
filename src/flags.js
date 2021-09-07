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

    hideFirstType_5: function() {
        const firstType = document.querySelectorAll('.tileType1');
        const secondType = document.querySelectorAll('.tileType2');

        //firstType.forEach(first => first.style = 'visibilty: none;');
       // secondType.forEach(second => second.style = 'visibility: ;');

        anime({
            targets: firstType,
            delay: 1000,
            duration: 1000,
            backgroundColor: ['#48c', '#75a'],
            opacity: 0,
            visibility: 'hidden',
            easing: 'linear',
        })

        anime({
            targets: secondType,
            duration: 1000,
            backgroundColor: ['#48c', '#75a'],
            opacity: 1,
            visibility: 'visible',
            easing: 'linear',
        })
    },

    hideSecondType_5: function() {
        const secondType = document.querySelectorAll('.tileType2');
        const firstType = document.querySelectorAll('.tileType1');

        //secondType.forEach(second => second.style = 'pointer-events: none;');
        //firstType.forEach(first => first.style = 'pointer-events: autp;');

        anime({
            targets: secondType,
            delay: 1000,
            duration: 1000,
            backgroundColor: ['#48c', '#75a'],
            opacity: 0,
            visibility: 'hidden',
            easing: 'linear',
        })

        anime({
            targets: firstType,
            duration: 1000,
            backgroundColor: ['#48c', '#75a'],
            opacity: 1,
            visibility: 'visible',
            easing: 'linear',
        })
    },
}

export default flags;