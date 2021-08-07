
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
            turns: 0,
        }
    },

    lvl1: {
        lv: 1,
        rows: 4,
        columns: 4,
        tile_size: 8,
        tiles: 4,
        iconSet: 'fas',
        counter: {
            time: null,
            turns: 3,
        },

    },

    lvl2: {
        lv: 2,
        rows: 3,
        columns: 8,
        tile_size: 6,
        tiles: 24,
        iconSet: 'fas',
        counter: {
            time: null,
            turns: 21,
        },

    },

    lvl3: {
        lv: 3,
        rows: 5,
        columns: 4,
        tile_size: 7,
        tiles: 20,
        iconSet: 'fas',
        counter: {
            time: null,
            turns: 17,
        },
    },
}


export default levels;