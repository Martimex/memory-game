import anime from 'animejs/lib/anime.es.js';

async function xclick(click_no, target, stageNo, levelObj) {

    function reduceOpacity() {
        const targets = document.querySelectorAll('.target');

        anime({
            targets: targets,
            delay: (levelObj[`compare_time`][stageNo]),
            duration: 1000,
            opacity: .4,
        })
    }

    async function runXClick() {
        switch(click_no) {
            case 1: {
                break;
            }
    
            case 2: {
                reduceOpacity();
                break;
            }
        }
    }

    await runXClick();

}

export {xclick}