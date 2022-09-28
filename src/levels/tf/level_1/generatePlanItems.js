// params are classes that provide access to plans (where decoration object can be placed)
// recommended: divide into 2 functions: first plan and second plan, each responsible for its' own object plan.

function generateItems(fpClass, spClass) {
    generateFirstPlanItems(fpClass);
    generateSecondPlanItems(spClass);
}

function generateFirstPlanItems(fpClass) {
    const firstPlan = document.querySelector(`.${fpClass}`);

    const circle = document.createElement('div');
    circle.classList.add('lightning');
    firstPlan.appendChild(circle);
}

function generateSecondPlanItems(spClass) {
    const secondPlan = document.querySelector(`.${spClass}`);
}

export {generateItems};