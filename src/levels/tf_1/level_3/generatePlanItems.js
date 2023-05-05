// params are classes that provide access to plans (where decoration object can be placed)
// recommended: divide into 2 functions: first plan and second plan, each responsible for its' own object plan.

function generateItems(fpClass, spClass) {
    generateFirstPlanItems(fpClass);
    generateSecondPlanItems(spClass);
}

function generateFirstPlanItems(fpClass) {
    const firstPlan = document.querySelector(`.${fpClass}`);

    for(let i=0; i<2; i++) {

        let lantern = document.createElement('div');
        lantern.classList.add(`lantern`, `lantern-${i + 1}`);
        firstPlan.appendChild(lantern);

        for(let j=0; j<3; j++) {
            let d = document.createElement('div');
            d.classList.add('powerball', `powerball-${(i * 3) + (j + 1)}`);
            firstPlan.appendChild(d);
        }
    }



}

function generateSecondPlanItems(spClass) {
    const secondPlan = document.querySelector(`.${spClass}`);
}

export {generateItems};