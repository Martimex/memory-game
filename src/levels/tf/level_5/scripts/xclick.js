import anime from 'animejs/lib/anime.es.js';

async function xclick(click_no, target, stageNo, levelObj) {

    const secondType = document.querySelectorAll('.tileType2');
    const firstType = document.querySelectorAll('.tileType1');

    const halfToHide = (click_no%2)? firstType : secondType;
    const halfToShow = (click_no%2)? secondType : firstType;

    halfToHide.forEach(tile => tile.style.pointerEvents = 'none');

    await runXClick(stageNo, click_no, halfToHide, halfToShow, target, levelObj);

}

async function runXClick(stageNo, click_no, halfToHide, halfToShow, target, levelObj) {
    switch(stageNo) {
        case 0: {
            await runXClickOne(click_no, halfToHide, halfToShow, target, levelObj);
            break;
        }

        case 1: {
            await runXClickTwo(click_no, halfToHide, halfToShow, target, levelObj);
            break;
        }
    }
}

async function runXClickOne(click_no, halfToHide, halfToShow, target, levelObj) {

    const secondType = document.querySelectorAll('.tileType2');
    const firstType = document.querySelectorAll('.tileType1');

    switch(click_no) {
        case 1: {
            async function chain() {
                await wait(halfToHide, halfToShow)
                    .then(() => {
                        secondType.forEach(tile => {
                            tile.style.pointerEvents = 'auto';
                        })
                    });
            }

            chain();
            break;
        }

        case 2: {
            async function chain() {

                const tile_back = target.querySelector(`.tile-back`);
                const svg = tile_back.querySelector(`svg`);

                if(levelObj.variables[`wasMatch`]) { showTargetedTileIcon(svg, target); }
                await wait(halfToHide, halfToShow)
                    .then(() => {
                        firstType.forEach(tile => {
                            tile.style.pointerEvents = 'auto';
                        })
                    });
            }

            chain();
            break;
        }
    }
}

async function runXClickTwo(click_no, halfToHide, halfToShow, target, levelObj) {

    const secondType = document.querySelectorAll('.tileType2');
    const firstType = document.querySelectorAll('.tileType1');

    switch(click_no) {
        case 1: {
            async function chain() {
                await wait(halfToHide, halfToShow)
                    .then(() => {
                        secondType.forEach(tile => {
                            tile.style.pointerEvents = 'auto';
                        })
                    });
            }

            chain();
            break;
        }

        case 2: {
            async function chain() {

                const tile_back = target.querySelector(`.tile-back`);
                const svg = tile_back.querySelector(`svg`);

                if(levelObj.variables[`wasMatch`]) { showTargetedTileIcon(svg, target); }

                await wait(halfToHide, halfToShow)
                    .then(() => {
                        firstType.forEach(tile => {
                            tile.style.pointerEvents = 'auto';
                        })
                    });
            }

            chain();
            break;
        }

        case 3: {
            async function chain() {
                await wait(halfToHide, halfToShow)
                    .then(() => {
                        secondType.forEach(tile => {
                            tile.style.pointerEvents = 'auto';
                        })
                    });
            }

            chain();
            break;
        }

        case 4: {
            async function chain() {

                const tile_back = target.querySelector(`.tile-back`);
                const svg = tile_back.querySelector(`svg`);

                if(levelObj.variables[`wasMatch`]) { showTargetedTileIcon(svg, target); }
                await wait(halfToHide, halfToShow)
                    .then(() => {
                        firstType.forEach(tile => {
                            tile.style.pointerEvents = 'auto';
                        })
                    });
            }

            chain();
            break;
        }
    }
}

async function wait(halfToHide, halfToShow) {
    const a1 = anime({
        targets: [halfToHide],
        pointerEvents: ['none'],
        delay: 900,
        duration: 700,
        opacity: 0,
        easing: 'easeOutSine',
    }).finished;

    const a2 = anime({
        targets: [halfToShow],
        pointerEvents: ['auto'],
        delay: 900,
        duration: 800,
        opacity: 1,
        easing: 'easeInSine',
    }).finished;

    await Promise.all([a1, a2]);
}

function showTargetedTileIcon(svg, target) {
    svg.style.opacity = 1;

    anime({
        targets: target,
        duration: 600,
        easing: 'easeOutCubic',
        borderColor: ['#333', 'hsl(51, 44%, 33%)'],
        direction: 'alternate',
    })
}

export {xclick}