import * as Animation from "animejs";
const anime = Animation.default;

async function xclick(click_no, target, stageNo, levelObj) {

    function animateTarget() {
        anime({
            targets: target,
            duration: 5000,
            keyframes: [
                {backgroundImage: ['radial-gradient(hsl(29, 80%, 60%) 20%, hsl(52, 80%, 60%) 45%, hsl(282, 80%, 40%))', 'radial-gradient(hsl(29, 80%, 60%) 20%, hsl(52, 80%, 60%) 45%, hsl(282, 80%, 40%))']},
                {backgroundImage: 'radial-gradient(hsl(52, 80%, 60%) 20%, hsl(29, 80%, 60%) 45%, hsl(282, 80%, 40%))'},
                {backgroundImage: 'radial-gradient(hsl(29, 80%, 60%) 20%, hsl(52, 80%, 60%) 45%, hsl(282, 80%, 40%))'},
                {backgroundImage: 'radial-gradient(hsl(52, 80%, 60%) 20%, hsl(29, 80%, 60%) 45%, hsl(282, 80%, 40%))'},
            ],
            easing: 'linear',
        })
    }

    async function whiteBordersFade() {
        const targets = document.querySelectorAll('.target');
        
        const a2 = anime({
            targets: targets,
            duration: 1200,
            borderColor: 'hsl(4, 87%, 62%)',
            easing: 'easeOutExpo',
        }).finished;

        await Promise.all([a2]);
    }

    async function runXClick() {
        switch(click_no) {
            case 1: {
                animateTarget();
                break;
            }
    
            case 2: {
                animateTarget();
                /*async function chain() {
                    animateTarget();
                    await whiteBorders()
                    await whiteBordersFade();
                }
    
                chain(); */
                break;
            }
        }
    }

    await runXClick();

}

export {xclick}