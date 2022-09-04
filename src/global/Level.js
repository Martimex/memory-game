class Level {
    constructor(number, difficulty, tiles, rows, columns, cords, tile_size, icon_set, limitations, starting_animation_time, compare_time, uncover, score, win) {
        this.number = number;
        this.difficulty = difficulty;
        this.tiles = tiles;
        this.rows = rows;
        this.columns = columns;
        this.cords = cords;
        this.tile_size = tile_size;
        this.icon_set = icon_set;
        this.limitations = limitations;
        this.starting_animation_time = starting_animation_time;
        this.compare_time = compare_time;
        this.uncover = uncover;
        this.score = score;
        this.win = win;
    }

    run() {
        console.log('Starting a new level !');
    }
}

export {Level}