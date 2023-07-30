import * as Animation from "animejs"
import mainStyles from '../styles/main.module.css';

const anime = Animation.default;

async function xclick(click_no, target, stageNo, levelObject, levelVariables) {

    async function scaleTile() {

        // First identify which tile is targeted by it's ref (gonna be useful inside scaleOut())
        levelVariables.targetedTilesByRef.push(+target.dataset['tileRef']);

        await anime({
            targets: target,
            duration: 1200,
            scale: 1.2,
            borderWidth: '.8rem',
            rotateY: ['180deg'],
            easing: 'easeOutCubic',
        }).finished;
    }

/*     async function scaleOut() {
        const [target_1, target_2] = [
            document.querySelector(`.${mainStyles[`tile_custom`]}[data-tile-ref="${+levelVariables.targetedTilesByRef[levelVariables.targetedTilesByRef.length - 2]}"]`),
            document.querySelector(`.${mainStyles[`tile_custom`]}[data-tile-ref="${+levelVariables.targetedTilesByRef[levelVariables.targetedTilesByRef.length - 1]}"]`)
        ];

        console.log('testing targets: ', target_1, target_2);

        await anime({
            targets: [target_1, target_2],
            duration: 600,
            scale: 1,
            easing: 'easeInExpo',
            rotateY: ['0deg'],
        }).finished;
    } */

    async function runXClick() {
        switch(click_no) {
            case 1: {
                scaleTile();
                break;
            }
    
            case 2: {
    
                async function chain() {
                    await scaleTile()
                }
    
                chain();
                break;
            }
        }
    }

    await runXClick();

}

export {xclick}