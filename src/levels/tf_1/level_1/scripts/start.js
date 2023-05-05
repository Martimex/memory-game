import * as Animation from "animejs"
import styles_global from '../../../../global/global_styles.module.css';

const anime = Animation.default;

async function level_start(stageNo, time, tileShowTime) {

    async function startAnimation() {
        await showTiles()
        await hideTiles()
    }

    async function showTiles() {
        const a1 = anime({
            targets: `.${styles_global['tile']}`,
            duration: time,
            transitionProperty: 'all',
            rotateY: '180deg',
            borderColor: ['hsl(4, 87%, 62%)', 'hsl(45, 50%, 80%)'],
            easing: 'linear',
            loop: false,
        }).finished;

        await Promise.all([a1]);
    }

    async function hideTiles() {
        const a2 = anime({
            targets: `.${styles_global['tile']}`,
            duration: time,
            delay: tileShowTime,
            transitionProperty: 'all',
            rotateY: '0deg',
            borderColor: ['hsl(45, 50%, 80%)', 'hsl(4, 87%, 62%)'],
            easing: 'linear',
            loop: false,
        }).finished;

        await Promise.all([a2]);
    }

    // Init
    await startAnimation();
}


export {level_start};