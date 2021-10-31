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
            //flags.animateLevelInfo_5(); // Nope, it causes some bugs
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
            flags.resetRotatingBoard_7();  //PLEASE MOVE IT BACK TO THE GAME SOONER
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
            turns: 26, // 20, 22, 23, 26, 27, 32, 34, 40, 44
        },
        onStartFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.createWantedQuestBoxes_11(cardsOpened, tiles, foundTiles, iter);
            flags.setBountyQuest_11(cardsOpened, tiles, foundTiles, iter);
            flags.markBountyQuestAnswer_11(cardsOpened, tiles, foundTiles, iter); //TEMPORARY REMOVE FOR LVL 12
        },
        onFirstClickFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.resetBountyReward_11(cardsOpened, tiles, foundTiles, iter);
            flags.rotateChosenTile_11(cardsOpened, tiles, foundTiles, iter);
        },
        onSecondClickFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.rotateChosenTile_11(cardsOpened, tiles, foundTiles, iter);
            flags.checkBountyQuestState_11(cardsOpened, tiles, foundTiles, iter);
        },
    },

    lvl12: {
        lv: 12,
        rows: 5,
        columns: 10,
        tile_size: 46,
        tiles: 50,  // 42, 52, 44
        iconSet: 'fas',
        counter: {
            time: 248,  // 264
            turns: null, 
        },
        onStartFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.prepareIterArray_12(cardsOpened, tiles, foundTiles, iter);
            flags.createGlowingDots_12(cardsOpened, tiles, foundTiles, iter);
        },
        onFirstClickFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.animateTileClick_12(cardsOpened, tiles, foundTiles, iter);
        },
        onSecondClickFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.animateTileClick_12(cardsOpened, tiles, foundTiles, iter);
            flags.moveDots_12(cardsOpened, tiles, foundTiles, iter);  // REMOVE ONLY FOR DEVELOPMENT PURPOSES
            flags.checkDotRemoval_12(cardsOpened, tiles, foundTiles, iter);
        },
    },

    lvl13: {
        lv: 13,
        rows: 6,
        columns: 12,
        tile_size: 46,
        tiles: 72, 
        iconSet: 'fas',
        counter: {
            time: null,  // 264
            turns: 132, // 123 
        },
        onStartFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.styleElements_13(cardsOpened, tiles, foundTiles, iter);
            flags.createSubstractionVisuals_13(cardsOpened, tiles, foundTiles, iter);
            flags.startAnimateTiles_13(cardsOpened, tiles, foundTiles, iter);
            flags.addInteractiveStrips_13(cardsOpened, tiles, foundTiles, iter);
        },
        onFirstClickFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.animateCardSide_13(cardsOpened, tiles, foundTiles, iter);
        },
        onSecondClickFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.visibleStrips_13(cardsOpened, tiles, foundTiles, iter);
            flags.animateCardSide_13(cardsOpened, tiles, foundTiles, iter);
            flags.cardsMatchCheckoutAndAnimation_13(cardsOpened, tiles, foundTiles, iter);
        },
    },

    lvl14: {
        lv: 14,
        rows: 6,
        columns: 8,
        tile_size: 55,
        tiles: 48, 
        iconSet: 'fas',
        counter: {
            time: null,
            turns: 50, // very fun level, not gonna lie :p 
        },
        onStartFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.temporaryRemovalFunction_14(cardsOpened, tiles, foundTiles, iter); /* TEMPORARY */
            flags.iconsAppear_14(cardsOpened, tiles, foundTiles, iter);
        },
        onFirstClickFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.tileBackgroundRetrieve_14(cardsOpened, tiles, foundTiles, iter);
        },
        onSecondClickFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.checkForPairCombo_14(cardsOpened, tiles, foundTiles, iter);
            flags.blockSecondTileReveal_14(cardsOpened, tiles, foundTiles, iter);
        },
    },

    lvl15: {
        lv: 15,
        rows: 5,
        columns: 10,
        tile_size: 48,
        tiles: 40, 
        iconSet: 'fas',
        counter: {
            time: null,
            turns: 120, // 33
        },
        onStartFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.darkenBeginningAnimation_15(cardsOpened, tiles, foundTiles, iter);
            flags.createSubstractionVisuals_15(cardsOpened, tiles, foundTiles, iter);
            flags.createAdditionalTiles_15(cardsOpened, tiles, foundTiles, iter);
            flags.redistributeIcons_15(cardsOpened,tiles,foundTiles, iter); // plus add some bomb icons
        },
        onFirstClickFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.animateChosenTile_15(cardsOpened, tiles, foundTiles, iter);
        },
        onSecondClickFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.animateChosenTile_15(cardsOpened, tiles, foundTiles, iter);
            flags.isBombRevealed_15(cardsOpened,tiles,foundTiles, iter);
            flags.ifWinRemoveFakeTiles_15(cardsOpened,tiles,foundTiles, iter);
        },
    },

    lvl16: {
        lv: 16,
        rows: 7,
        columns: 8,
        tile_size: 48,
        tiles: 56, 
        iconSet: 'fas',
        counter: {
            time: null,
            turns: 81, 
        },
        onStartFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.temporaryBombsRemoval_16(cardsOpened, tiles, foundTiles, iter); // Temporary function, for dev only
            //flags.startingAnimation_16(cardsOpened, tiles, foundTiles, iter); PLEASE JUST REMOVE DURING LV 17 DEV
        },
        onFirstClickFlag: function(cardsOpened, tiles, foundTiles, iter) {
        
        },
        onSecondClickFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.isUnfreezingTime_16(cardsOpened, tiles, foundTiles, iter);
            flags.testFreezingCondition_16(cardsOpened, tiles, foundTiles, iter);
        },  
    },

    lvl17: {
        lv: 17,
        rows: 8,
        columns: 6,
        tile_size: 48,
        tiles: 90, // it's actually 48 + 24 + 12 + 6 + 2 = 92, but level is divided into phases (steps) + at the start 2 tiles are omitted
        iconSet: 'fas',
        counter: {
            time: null,
            turns: 91, 
        },
        onStartFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.fadeInBoard_17(cardsOpened, tiles, foundTiles, iter);
            flags.divideIntoPhases_17(cardsOpened, tiles, foundTiles, iter);
        },
        onFirstClickFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.tileClickAnimation_17(cardsOpened, tiles, foundTiles, iter);
        },
        onSecondClickFlag: function(cardsOpened, tiles, foundTiles, iter) {
            flags.tileClickAnimation_17(cardsOpened, tiles, foundTiles, iter);
            flags.animatePairMatch_17(cardsOpened, tiles, foundTiles, iter);
            flags.lookForNextPhase_17(cardsOpened, tiles, foundTiles, iter);
        },  
    },
}


export default levels;