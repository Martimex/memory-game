
const levels = {

    // FALLBACK, SINCE FOR SOME REASON VERY FIRST RENDER DOESN'T APPEAR TO DISPLAY CARDS
    lvl0: {
        lv: 0,
        rows: 0,
        columns: 0,
        tiles: 0,
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
        tiles: 16,
        iconSet: 'fas',
        counter: {
            time: null,
            turns: 12,
        },

    },

    lvl2: {
        lv: 2,
        rows: 8,
        columns: 3,
        tiles: 24,
        iconSet: 'fas',
        counter: {
            time: null,
            turns: 17,
        },

    },

    lvl3: {
        lv: 3,
        rows: 5,
        columns: 4,
        tiles: 20,
        iconSet: 'fas',
        counter: {
            time: null,
            turns:13,
        },
    },
}


export default levels;