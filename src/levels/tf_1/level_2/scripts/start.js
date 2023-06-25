import * as Animation from "animejs"
import firstPlanStyles from '../styles/firstPlan.module.css';
const anime = Animation.default;

let styles_global = '';

async function level_start(stageNo, time, tileShowTime) {

    async function startAnimation() {
        styles_global = await import('../../../../global/global_styles.module.css')
        await showTiles()
        await hideTiles()
    }

    async function showTiles() {
        const a1 = anime({
            targets: `.${styles_global['tile']}`,
            duration: time,
            transitionProperty: 'all',
            rotateY: '180deg',
            easing: 'easeInSine',
            loop: false,
        }).finished;

        await Promise.all([a1]);
    }

    async function hideTiles() {
        const a2 = anime({
            targets: `.${styles_global['tile']}`,
            delay: tileShowTime,
            duration: time,
            transitionProperty: 'all',
            rotateY: '0deg',
            easing: 'easeOutSine',
            loop: false,
        }).finished;

        await Promise.all([a2]);
    }

    async function createFlood() {
        const b1 = anime({
            targets: `.${firstPlanStyles['flood-elem']}`, //targets: '.flood-elem',
            duration: 400,
            delay: anime.stagger(1000, {from: 'last'}),
            opacity: [0, .4],
            easing: 'easeInSine',
        }).finished;

        await b1;
    }

    // Init
    await startAnimation()
    createFlood();
}

export {level_start};
