import { Level } from './Level.js';

/* Each stage array has to have the same array length ! */

// original lvl 1 :
// 1: new Level(1, 1, 'easy', [16], [4], [4], [ [] ], [70], ['fas'], [ {turns: 13, time: 35} ], [850], [ {time: 400, easing: 'linear'} ], [800], [ {count: 2, pattern: 'pairs'} ], [ {count: 100, extras: ''} ], [ {value: 16, pointsPerMatch: 2, pattern: 'tilesFound'} ]),

const all_levels = {
    tf: {
        1: new Level(1, 2, 'easy', 
            [16, 4], 
            [4, 2], 
            [4, 2], 
            [ [], [] ], 
            [70, 60], 
            ['fas', 'far'], 
            [ {turns: 13,  time: 3}, {time: 5} ], 
            [ {time: 1400, tileShowTime: 900}, {time: 1400, tileShowTime: 600} ], 
            [ {time: 400, easing: 'linear'}, {time: 400, easing: 'linear'} ],
            [800, 800],
            [ {count: 2, pattern: 'pairs'}, {count: 2, pattern: 'pairs'} ],
            [ {count: 100, extras: 'spree'}, {count: 100 } ],
            [ {value: 16, pointsPerMatch: 2, pattern: 'tilesFound'}, {value: 4, pointsPerMatch: 2, pattern: 'tilesFound'}  ]),
            
        2: new Level(2, 1, 'medium', [24], [3], [8], [ [] ], [64], ['fas'], [ {time: 75, turns: 13} ], [650], [ {time: 600, easing: 'easeInExpo'} ], [500], [ {count: 2, pattern: 'pairs'} ], [ {count: 100, extras: ''} ], [ {value: 24, pattern: 'tilesFound'} ] ),
        3: new Level(3, 1, 'easy', 20, 4, 5, [], 66, 'fas', {time: 64}, ),
        4: new Level(4, 1, 'medium', 36, 6, 6, [], 42, 'fas', {turns: 45}, ),
        5: new Level(5, 1, 'hard', 30, 6, 5, [], 48, 'fas', {turns: 34}, ),
        6: new Level(6, 1, 'insane', 36, 6, 6, [], 50, 'fas', {turns: 52}, ),
        7: new Level(7, 1, 'insane', 40, 5, 8, [], 58, 'fas', {time: 156}, ),
        8: new Level(8, 1, 'extreme', 48, 6, 8, [], 46, 'fas', {time: 235}, ),
        9: new Level(9, 1, 'easy', 42, 6, 7, [], 50, 'fas', {time: 180}, ),
        10:new Level(10, 1, 'insane',  44, 4, 11, [], 58, 'fas', {turns: 50}, ),
    },

    os: {
        1: new Level(1, 1, 'medium', 44, 4, 11, [], 52, 'fas', {turns: 26}, ),
        2: new Level(2, 1, 'hard', 50, 5, 10, [], 46, 'fas', {time: 256}, ),
        3: new Level(3, 1, 'insane', 72, 6, 12, [], 40, 'fas', {turns: 132}, ),
        4: new Level(4, 1, 'easy', 48, 6, 8, [], 48, 'fas', {time: 260}, ),
        5: new Level(5, 1, 'hard', 40, 5, 10, [], 48, 'fas', {turns: 120}, ), /* bomb level, tiles: 40 rows: 5 cols: 10 */
        6: new Level(6, 1, 'extreme', 42, 6, 7, [], 48, 'fas', {time: 224}, ),
        7: new Level(7, 5, 'hard', 96, 6, 8, [], 50, 'fas', {turns: 104}, ),  /*  it's actually 48 + 24 + 12 + 8 + 4 = 96, but level is divided into phases (steps) + at the start 2 tiles are omitted */
        8: new Level(8, 1, 'insane', 36, 6, 6, [], 50, 'fas', {turns: 111}, ),
        9: new Level(9, 4, 'insane', 126, 6, 7, [], 46, 'fas', {turns: 112}, ), /* it's 42 + (2 * 42) = 126 */
        10: new Level(10, 1, 'medium', 64, 8, 8, [], 41, 'fas', {time: 290}, ), /* 32 sec extra bcs of starting animation */
    }

};


export { all_levels };

/*
        this.number = number;
        this.stages = stages;
        this.difficulty = difficulty;
        this.tiles = tiles;
        this.rows = rows;
        this.columns = columns;
        this.cords = cords;
        this.tile_size = tile_size;
        this.icon_set = icon_set;
        this.limitations = limitations;
        this.starting_animation = starting_animation;
        this.tile_animation = tile_animation;
        this.compare_time = compare_time;
        this.uncover = uncover;
        this.score = score;
        this.win = win;
*/