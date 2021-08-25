import flags from './flags.js';
import Game from './components/game';

// PLEASE DO NOT TEST LEVELS WITH 2 TILES !!!
const levels = {

    // FALLBACK, SINCE FOR SOME REASON VERY FIRST RENDER DOESN'T APPEAR TO DISPLAY CARDS
    lvl0: {
        lv: 0,
        rows: 0,
        columns: 0,
        tiles: 2,
        iconSet: 'fas',
        counter: {
            time: null,
            turns: null,
        },
        onStartFlag: function() {
            return;
        },
        onFirstClickFlag: function() {
            return;
        },
        onSecondClickFlag: function() {
            return;
        },
    },

    lvl1: {
        lv: 1,
        rows: 4,
        columns: 4,
        tile_size: 80, // 80 x 0.1vw
        tiles: 6,   // 16 , 6
        iconSet: 'fas',
        counter: {
            time: null, // 16
            turns: 15, // 12  , 15, 14,  4
        },
        onStartFlag: function() {
            console.log('%c start function flag runs', 'background: #222; color: #bada55');
            flags.loadBorders_1();
        },
        onFirstClickFlag: function() {        // It means every first push to the pair array
            console.log('%c first click', 'background: #721; color: #174bb9');
            flags.markBorders_1();
        },
        onSecondClickFlag: function() {       // It means every second push to the pair array
            console.log('%c second click', 'background: #ab3; color: #a4713e');
            flags.markBorders_1();
            //flags.removeBordersMark_1();
        },

    },

    lvl2: {
        lv: 2,
        rows: 3,
        columns: 8,
        tile_size: 64,
        tiles: 24,  // 24
        iconSet: 'fas',
        counter: {
            time: 75,  // 75
            turns: null,  // 26
        },
        onStartFlag: function() {
            console.log('%c Love ya', 'background: #471; color: #af43d8');
            flags.setBackgroundFlood_2();
        },
        onFirstClickFlag: function() {
            console.log('%c got you', 'background: #721; color: #174bb9');
            flags.colorBackground_2();
        },
        onSecondClickFlag: function() {
            console.log('%c lol it works', 'background: #ab3; color: #a4713e');
            flags.colorBackground_2();
        },
    },

    lvl3: {
        lv: 3,
        rows: 5,
        columns: 4,
        tile_size: 7,
        tiles: 6,  // 20
        iconSet: 'fas',
        counter: {
            time: null,
            turns: 17,
        },
        onStartFlag: function() {
            console.log('%c start function flag runs', 'background: #222; color: #bada55');
        },
        onFirstClickFlag: function() {
            console.log('%c first click', 'background: #721; color: #174bb9'); 
        },
        onSecondClickFlag: function() {
            console.log('%c second click', 'background: #ab3; color: #a4713e');
        },
    },
}


export default levels;