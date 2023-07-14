import bgStyles from '../styles/bg.module.css';
import mainStyles from '../styles/main.module.css';
import firstPlanStyles from '../styles/secondPlan.module.css';
import * as Animation from "animejs"
const anime = Animation.default;

async function xclick(click_no, target, stageNo, levelObject, levelVariables) {


    async function runXClick() {
        switch(click_no) {
            case 1: {
                /* levelVariables.STATIC['EXTRATURNS_MODIFIER'] -= 1; */
                //console.warn('IS SECRET SOLVED: ', levelVariables.secret_solved);
                if(levelVariables.isFirstBountyPairTrigerred === false) { markBountyQuestAnswer();}
                resetBountyReward();
                rotateChosenTile();
                //colorAnimationBoxes(click_no);
                //animateOnClick();
                break;
            }
    
            case 2: {
                //colorAnimationBoxes(click_no);
                //checkBountyQuestState();
                rotateChosenTile();
                //await animateOnClick();
                //await animateOnHide();
                break;
            }
        }
    }

    function markBountyQuestAnswer() {
        // ALSO OUR FIRST TILE SHOULD CONTAIN CLASS OF 'bounty-q'
        if(!target.classList.contains(`${mainStyles['bounty-q']}`) || levelVariables.foundTiles > 0) { return; }
        
        // Change fBPTrigger to true, because this function should fire only once 
        levelVariables.isFirstBountyPairTrigerred = true;

        const bounty = document.querySelector(`.${mainStyles['bounty-q']}`);
        const bountyBack = bounty.querySelector(`.${mainStyles['tile-back_custom']}`);
        const allTiles = document.querySelectorAll(`.${mainStyles['tile_custom']}`);
        let bountyAnswer = [];

        allTiles.forEach(tile => {
            if((!(tile.classList.contains(`${mainStyles['bounty-q']}`))) && (bountyBack.childNodes[0].classList[1] === tile.querySelector(`.${mainStyles['tile-back_custom']}`).childNodes[0].classList[1])) {
                bountyAnswer.push(tile);
            }
        })

        console.log('bountyAnswer is: ', bountyAnswer);

        anime({
            targets: bountyAnswer[0],
            duration: 1200,
            borderColor: ['#a7c', 'hsl(122, 30%, 30%)'],
            borderWidth: '.35rem',
            easing: 'linear',
        })
    }

    function rotateChosenTile() {
        /* let currTarget;
        if(cardsOpened.length <= 1) {
            currTarget = document.querySelector('.target-1');
        } else {
            currTarget = document.querySelector('.target-2');
        } */

        const random = Math.floor(Math.random() * 2);
        //document.querySelector('.board').dataset.animation = 'on';
        //document.querySelector('.board').setAttribute('pointerEvents', 'none');
        if(random%2) { 
            /* const a1 =  */anime({
                targets: /* currTarget */target,
                duration: 300, /* For this to not interrupt main tileShow animation, this has to be set to something low, as 400 ms */
                rotate: `-90`,
                easing: 'easeOutSine',
            })//.finished;
            //await Promise.all([a1]);
        }

        else { 
            /* const a1 =  */anime({
                targets: /* currTarget */target,
                duration: 300, /* For this to not interrupt main tileShow animation, this has to be set to something low, as 400 ms */
                rotate: `90`,
                easing: 'easeOutSine',
            })//.finished;
            //await Promise.all([a1]);
        }

        /*  animate().then(() => {
            setTimeout(() => {
                document.querySelector('.board').dataset.animation = 'off';
                document.querySelector('.board').setAttribute('pointerEvents', 'auto');
            }, 1200)
        }) */
    }

    function resetBountyReward() {
        // We will be looking for some db alternative for managing extra turns as a reward
        levelVariables.STATIC['EXTRATURNS_MODIFIER'] = 1;
    }
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

    await runXClick();
}

export {xclick}