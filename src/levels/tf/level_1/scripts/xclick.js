import anime from 'animejs/lib/anime.es.js';

function xclick(click_no, target) {
    console.warn(click_no, target);

    async function whiteBorders() {
        const a1 = anime({
            targets: target,
            duration: 400,
            borderColor: ['hsl(45, 50%, 80%)'],
        }).finished;

        await Promise.all([a1]);
    }

    switch(click_no) {
        case 1: {
            whiteBorders();
            break;
        }

        case 2: {

            async function chain() {
                await whiteBorders()
                await whiteBordersFade();
            }
            
            async function whiteBordersFade() {
                const targets = document.querySelectorAll('.target');
                console.log(targets);
                
                const a2 = anime({
                    targets: targets,
                    //delay: 400,
                    duration: 200,
                    borderColor: 'hsl(4, 87%, 62%)',
                }).finished;

                await Promise.all([a2]);
            }

            chain();
            break;
        }
    }

}

export {xclick}