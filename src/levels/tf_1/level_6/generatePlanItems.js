// params are classes that provide access to plans (where decoration object can be placed)
// recommended: divide into 2 functions: first plan and second plan, each responsible for its' own object plan.

function generateItems(fpClass, spClass) {
    generateFirstPlanItems(fpClass);
    generateSecondPlanItems(spClass);
}

function generateFirstPlanItems(fpClass) {
    const firstPlan = document.querySelector(`.${fpClass}`);

    for(let i=0; i<4; i++) {
        let tornado = document.createElement('div');
        tornado.classList.add('tornado', `tornado-${i+1}`);
        firstPlan.appendChild(tornado);
        for(let x=0; x<9; x++) {
            let tornadoElem = document.createElement('div');
            tornadoElem.classList.add('tornado-elem');
            tornado.appendChild(tornadoElem);
        }
    }

    console.log('loaded generator');
}

function generateSecondPlanItems(spClass) {
    const secondPlan = document.querySelector(`.${spClass}`);
}

export {generateItems};