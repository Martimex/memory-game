import anime from 'animejs/lib/anime.es.js';

const counterFontColors = [
    '#666',
    'hsl(55, 70%, 40%)',
    'hsl(35, 70%, 40%)',
    '#0000', // lastly we want to hide the number shwoing and then hide secret counter box
];

async function match(isMatch, cardsOpened_parentNodes, stageNo, levelObject) {
    // Fire some animations when we found / do not found a match
    const secret_container_q = document.querySelector('.secret-container');

    const targets = document.querySelectorAll('.target');
    let tb_arr = [];
    targets.forEach(target => {
        tb_arr.push(target.querySelector(`.tile-back`));
    })

    function modifySecretCounter(doesMatch) {
        if(levelObject.variables[`secret_solved`]) { return; }
        const secret_counter_q = document.querySelector('.secret-container__counter');
        levelObject.variables[`secret_streak`] = (doesMatch)? levelObject.variables[`secret_streak`] += 1 : 0;

        anime({
            targets: secret_counter_q,
            duration: 600,
            easing: 'linear',
            color: counterFontColors[parseInt(levelObject.variables[`secret_streak`])],
            round: 1,
            textContent: levelObject.variables[`secret_streak`],
        })

    }

    async function removeSecretCounter() {
        const b0 = anime({
            targets: secret_container_q,
            duration: 600,
            opacity: 0,
            easing: 'linear',
        }).finished;

        await Promise.all([b0]);
    }

    if(isMatch) {
        
        levelObject.variables[`matchCount`] += 1;
        modifySecretCounter(isMatch);


        async function match() {
            await animateMatch()
                .then(() => {
                    if(levelObject.variables[`matchCount`] >= levelObject.variables[`matchCountLimit`]) {
                        // You solved too much pairs without finding a secret. It is no longer possible to solve secret in this attempt.
                        removeSecretCounter(); // it can be used sync here !
                    }

                    else if((levelObject.variables[`secret_streak`] === levelObject.variables[`secret_streak_requirements`]) && (!levelObject.variables[`secret_solved`]) ) {
                        document.body.style.pointerEvents = 'none';
                        levelObject.variables[`secret_solved`] = true;
                        async function hellPrepare() {
                            await removeSecretCounter()
                            await createHell()
                                .then(() => {
                                    animateHell()
                                    document.body.style.pointerEvents = 'auto';
                                })
                        }
                        hellPrepare();
                    }
                })
        }

        function animateHell() {
            // this one should be sync
            anime({
                targets: '.background',
                duration: 2500,
                delay: 600,
                easing: 'linear',
                backgroundImage: ['repeating-linear-gradient(190deg, hsl(117, 0%, 0%), hsl(188, 0%, 0%) 8%, hsl(55, 40%, 30%) 18%)', 'repeating-linear-gradient(190deg, hsl(11, 0%, 0%), hsl(66, 0%, 0%) 8%, hsl(11, 40%, 30%) 18%)'],
                direction: 'alternate',
                loop: true,
            })
        }

        async function createHell() {
            const b1 = anime({
                targets:'.background',
                duration: 1500,
                easing: 'linear',
                backgroundImage: ['repeating-linear-gradient(190deg, hsl(22, 70%, 50%), hsl(35, 70%, 50%) 8%, hsl(0, 0%, 10%) 12%)', 'repeating-linear-gradient(190deg, hsl(117, 0%, 0%), hsl(188, 0%, 0%) 8%, hsl(55, 40%, 30%) 18%)'],
                // this transition would be a secret for the level - unleashing the secret = a free star
                //direction: 'alternate',
            }).finished;

            const b2 = anime({
                targets: '.board',
                duration: 1000,
                easing: 'linear',
                keyframes: [
                    {opacity: [1, 0], duration: 1000, easing: 'easeInSine'},
                    {backgroundImage: 'radial-gradient(hsl(2, 31%, 33%), #111)', filter:'sepia(30%)', duration: 500},
                    {opacity: 1, duration: 500, easing: 'easeOutSine'},
                ]
            }).finished;

            await Promise.all([b1, b2]);
        }

        async function animateMatch() {
            const a1 = anime({
                targets: targets,
                duration: 600,
                easing: 'easeInOutExpo',
                backgroundImage: 'radial-gradient( #3330, #3330)',
                rotate: 0,
            }).finished;
        
            await Promise.all([a1]);
        }
        
        match();

    }
    else {
        modifySecretCounter(isMatch);

        async function noMatch() {
            await animate();
        }

        async function animate() {
            const a1 = anime({
                targets:'.background',
                duration: 1200,
                easing: 'linear',
                //backgroundImage: /* 'repeating-linear-gradient(190deg, hsl(41, 70%, 50%), hsl(50, 70%, 50%) 8%, hsl(0, 0%, 10%) 12%)',  */'repeating-linear-gradient(190deg, hsl(41, 70%, 50%), hsl(15, 70%, 50%) 8%, hsl(0, 0%, 10%) 12%)',
                direction: 'alternate',
            }).finished;

            const a2 = anime({
                targets: targets,
                duration: 800,
                rotate: '+=40',
                easing: 'easeInOutSine',
            }).finished;

            await Promise.all([a1, a2]);
        }

        noMatch();
    }
}

export {match};