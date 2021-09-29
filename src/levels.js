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
            flags.removeBordersMark_1();
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
            time: 75,  // 75        // TIME LEVELS CAN CAUSE BUGS WHEN USER CLICKS SECOND TILE AT VERY LAST SECOND
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
            flags.removeColorBackground_2();
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
            time: 54, //  45, 50, 48, 54
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
            flags.removeTargetShadow_4();
            flags.changeRepeatedBg_4(cardsOpened, tiles, foundTiles);
        },
    },

    lvl5: {
        lv: 5,
        rows: 6,
        columns: 5,
        tile_size: 58,
        tiles: 30,  // 30
        iconSet: 'fas',
        counter: {
            time: null,
            turns: 34, // 31
        },
        onStartFlag: function(cardsOpened, tiles, foundTiles) {
            flags.skewTo0Deg_5(); // temporary function, remove it before deploying to production
            flags.addTilesIdentifer_5(cardsOpened, tiles, foundTiles);
            flags.resetIcons_5(cardsOpened, tiles, foundTiles); 
            flags.createAnimatedDots_5();
            //flags.animateLevelInfo_5();
            flags.hideSecondType_5();
        },
        onFirstClickFlag: function(cardsOpened, tiles, foundTiles) {
            flags.hideFirstType_5(cardsOpened, tiles, foundTiles);
            
        },
        onSecondClickFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.hideSecondType_5(cardsOpened, tiles, foundTiles);
            flags.generateNewDots_5(cardsOpened, tiles, foundTiles, iter);
        },
    },

    lvl6: {
        lv: 6,
        rows: 6,  // 6
        columns: 6,  // 6
        tile_size: 61,
        tiles: 36,  // 36
        iconSet: 'fas',
        counter: {
            time: null,
            turns: 40, // 31
        },
        onStartFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.resetBgImg_6(cardsOpened, tiles, foundTiles, iter);
            flags.rotateBoard_6(cardsOpened, tiles, foundTiles, iter);
            flags.createTornados_6();
            flags.rotateTornados_6();
        },
        onFirstClickFlag: function(cardsOpened, tiles, foundTiles) {
            flags.animateTarget_6();
        },
        onSecondClickFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.animateTarget_6();
            flags.animateMatch_6(cardsOpened, tiles, foundTiles, iter);
            flags.isGameFinished_6(cardsOpened, tiles, foundTiles, iter);
        },
    },

    lvl7: {
        lv: 7,
        rows: 5,
        columns: 8,
        tile_size: 65,
        tiles: 40,  // 40
        iconSet: 'fas',
        counter: {
            time: 150,  // 152, 150
            turns: null, // 31
        },
        onStartFlag: function(cardsOpened, tiles, foundTiles, iter) {
            //flags.resetRotatingBoard_7();  //PLEASE MOVE IT BACK TO THE GAME SOONER
            flags.addAnimationBoxes_7(cardsOpened, tiles, foundTiles, iter);
        },
        onFirstClickFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.changeAllIconColors_7(cardsOpened, tiles, foundTiles, iter);
            flags.colorAnimationBoxes_7(cardsOpened, tiles, foundTiles, iter);
        },
        onSecondClickFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.colorAnimationBoxes_7(cardsOpened, tiles, foundTiles, iter);
            flags.winAnimation_7(cardsOpened, tiles, foundTiles, iter);
        },
    },

    lvl8: {
        lv: 8,
        rows: 6,
        columns: 9,
        tile_size: 52,
        tiles: 54,  // 54
        iconSet: 'fas',
        counter: {
            time: 252,  // 
            turns: null, // 46
        },
        onStartFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.setColorfulBorders_8(cardsOpened, tiles, foundTiles, iter);
            flags.blockRedTilesClick_8(cardsOpened, tiles, foundTiles, iter);
        },
        onFirstClickFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.lastPairTurnGreen_8(cardsOpened, tiles, foundTiles, iter);
        },
        onSecondClickFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.setColorfulBorders_8(cardsOpened, tiles, foundTiles, iter);
            flags.blockRedTilesClick_8(cardsOpened, tiles, foundTiles, iter);
        },
    },

    lvl9: {
        lv: 9,
        rows: 6,
        columns: 7,
        tile_size: 60,
        tiles: 42,  // 42
        iconSet: 'fas',
        counter: {
            time: 165,  // 
            turns: null, // 22, 34, 40
        },
        onStartFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.createMutatingBox_9(cardsOpened, tiles, foundTiles, iter);
            flags.enlargeIcons_9(cardsOpened,tiles,foundTiles, iter);
        },
        onFirstClickFlag: function(cardsOpened, tiles, foundTiles, iter) {

        },
        onSecondClickFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.checkIconModify_9(cardsOpened, tiles, foundTiles, iter);
            flags.mutateBox_9(cardsOpened, tiles, foundTiles, iter);
            flags.winAnimation_9(cardsOpened, tiles, foundTiles, iter);
        },
    },

    lvl10: {
        lv: 10,
        rows: 4,
        columns: 11,
        tile_size: 66,
        tiles: 44,  // 42, 52, 44
        iconSet: 'fas',
        counter: {
            time: null,  // 
            turns: 44, // 22, 34, 40, 44
        },
        onStartFlag: function(cardsOpened, tiles, foundTiles, iter) {

        },
        onFirstClickFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.animateBorders_10(cardsOpened, tiles, foundTiles, iter);
        },
        onSecondClickFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.animateBorders_10(cardsOpened, tiles, foundTiles, iter);
            flags.randomizeIcons_10(cardsOpened, tiles, foundTiles, iter);
        },
    },

    lvl11: {
        lv: 11,
        rows: 4,
        columns: 11,
        tile_size: 66,
        tiles: 44,  // 42, 52, 44
        iconSet: 'fas',
        counter: {
            time: null,  // 
            turns: 44, // 22, 34, 40, 44
        },
        onStartFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.setBountyQuest_11(cardsOpened, tiles, foundTiles, iter);
        },
        onFirstClickFlag: function(cardsOpened, tiles, foundTiles, iter) {

        },
        onSecondClickFlag: function(cardsOpened, tiles, foundTiles, iter) {

        },
    },
}


export default levels;