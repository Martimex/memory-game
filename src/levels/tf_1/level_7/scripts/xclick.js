import bgStyles from '../styles/bg.module.css';
import mainStyles from '../styles/main.module.css';
import secondPlanStyles from '../styles/secondPlan.module.css';
import * as Animation from "animejs"
const anime = Animation.default;

async function xclick(click_no, target, stageNo, levelObject, levelVariables) {

/*     async function animateOnClick() {
        const a1 = anime({
            targets: target,
            duration: 400,
            easing: 'easeOutExpo',
        }).finished;

        await Promise.all([a1]);
    }

    async function animateOnHide() {
        const targets = document.querySelectorAll('.target');
        const a2 = anime({
            targets: targets,
            duration: 1200,
            easing: 'easeInExpo',
        }).finished;

        await Promise.all([a2]);
    } */

    async function changeAllIconsColors() {
        levelVariables.iconsColoring['usedTurnsCount'] += 1;
        if(levelVariables.iconsColoring['usedTurnsCount'] % levelVariables.iconsColoring['turnsForColorChange'] === 0) {
            
            const lv_background = document.querySelector(`.${bgStyles['background_custom']}`);
            levelVariables.iconsColoring['bgHueRotateDeg'] = levelVariables.iconsColoring['bgHueRotateDeg'] + (Math.floor(Math.random() * 40) + 40);
            
            /* if(levelVariables.iconsColoring['usedTurnsCount'] % levelVariables.iconsColoring['turnsForColorChange'] === 0
                && !((levelVariables.iconsColoring['usedTurnsCount'] / levelVariables.iconsColoring['turnsForColorChange']) % 2) 
            ) {
                levelVariables.iconsColoring['iconHueRotateDeg'] = levelVariables.iconsColoring['bgHueRotateDeg'];
                const allSvgIcons = document.querySelector(`svg.svg-inline--fa`);
                console.warn('allSvgIcons ', allSvgIcons);
                anime({
                    targets: allSvgIcons,
                    duration: 3500,
                    filter: `hue-rotate(${levelVariables.iconsColoring['iconHueRotateDeg']}deg)`,
                    easing: 'linear',
                })
            } */

            //console.log('HUE ROTATE IS: ', levelVariables.iconsColoring['bgHueRotateDeg'])
            await anime({
                targets: lv_background,
                duration: 350,
                filter: `hue-rotate(${levelVariables.iconsColoring['bgHueRotateDeg']}deg)`,
                easing: 'linear',
            }).finished;

            const allTilesBack = document.querySelectorAll(`.${mainStyles['tile-back_custom']}`);
            console.log('all tiles back icons: ', allTilesBack);
            //allTilesBack.forEach((tb) => tb.style.filter = `brightness(130%) saturate(120%) hue-rotate(-${levelVariables.iconsColoring['bgHueRotateDeg']}deg)`);
            await anime({
                targets: allTilesBack,
                duration: 350,
                filter: `brightness(130%) saturate(120%) hue-rotate(-${levelVariables.iconsColoring['bgHueRotateDeg']}deg)`,
                easing: 'linear',
            }).finished;
            
            /* OLD VERSION IS CURRENTLY COMMENTED OUT
            const board = document.querySelector(`.${bgStyles['board_custom']}`);
            const allBoardSvgs= board.querySelectorAll('svg');
            allBoardSvgs.forEach(svg => {
                let hue = Math.floor(Math.random() * 360)+1;
                let saturate  = Math.floor(Math.random() * 80)+11;
                let lightness = Math.floor(Math.random() * 80)+11;
                svg.style.color = `hsl(${hue}, ${saturate}%, ${lightness}%)`;
                let back = svg.parentNode;
                back.setAttribute('backgroundImage', `radial-gradient(hsl(52, 80%, 60%) 20%, hsl(29, 80%, 0%) 25%, hsl(${hue}, 50%, 50%))`); 
            }); */
        }
    }

    function colorAnimationBoxes(click_no) {
        let targetTile;
        let selector;
        if(click_no === 1) {  // Jeśli kolorujemy większe pudełko
            if(levelVariables.iconsColoring['usedTurnsCount'] % 2 > 0) {  // Jeśli to jest pierwsza, lub każda nieparzysta tura
                targetTile = document.querySelector('.target-1');
                selector = `.${secondPlanStyles['animationBox-1']}`;
            }
            else {
                targetTile = document.querySelector('.target-1');
                selector = `.${secondPlanStyles['animationBox-2']}`;
            }
        }

        else if(click_no === 2) {
            if(levelVariables.iconsColoring['usedTurnsCount'] % 2 > 0) {
                targetTile = document.querySelector('.target-2');
                selector = `.${secondPlanStyles['animationBoxInner-1']}`;
            }
            else {
                targetTile = document.querySelector('.target-2');
                selector = `.${secondPlanStyles['animationBoxInner-2']}`;
            }
        }

        let newColor = targetTile.querySelector(`.${mainStyles['tile-back_custom']}`);
        let color = newColor.style.color;
        console.log('NEW BG IMAGE: ', color, ' and newColor obj is: ', newColor.style);
        /* if(color) {
            color = color.replace('(hsl(52, 80%, 60%)', '(hsla(5, 0%, 0%, 70%)');
        } */

        anime({
            targets: selector,
            duration: 2000, // was 2000
            backgroundImage:  `radial-gradient( hsla(29, 80%, 0%, 0%) 35%,  ${color})`,
            filter: `hue-rotate(-${levelVariables.iconsColoring['bgHueRotateDeg']}deg)`,
            loop: false,
            easing: 'linear',
        })
    }

    async function runXClick() {
        switch(click_no) {
            case 1: {
                changeAllIconsColors();
                colorAnimationBoxes(click_no);
                //animateOnClick();
                break;
            }
    
            case 2: {
    
                async function chain() {
                    colorAnimationBoxes(click_no);
                    //await animateOnClick();
                    //await animateOnHide();
                }
    
                chain();
                break;
            }
        }
    }

    await runXClick();

}

export {xclick}