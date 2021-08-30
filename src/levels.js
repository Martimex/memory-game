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
        tiles: 16,   // 16 , 6
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
        rows: 4,
        columns: 5,
        tile_size: 66,
        tiles: 20,  // 20
        iconSet: 'fas',
        counter: {
            time: 48, //  45, 50, 48
            turns: null, // 17
        },
        onStartFlag: function() {
            flags.animate_3();
        },
        onFirstClickFlag: function() {
            flags.fadeTile_3();
            
        },
        onSecondClickFlag: function() {
            flags.fadeTile_3();
        },
    },

    lvl4: {
        lv: 4,
        rows: 6,
        columns: 6,
        tile_size: 50,
        tiles: 36,  // 36
        iconSet: 'fas',
        counter: {
            time: null,
            turns: 42, // 42
        },
        onStartFlag: function() {
            flags.blockInverseAnimation_4();
        },
        onFirstClickFlag: function() {
            flags.colorFirstTargetShadow_4();
            
        },
        onSecondClickFlag: function(cardsOpened, tiles, foundTiles) {
            flags.colorSecondTargetShadow_4();
            flags.changeRepeatedBg_4(cardsOpened, tiles, foundTiles);
        },
    },
}


export default levels;