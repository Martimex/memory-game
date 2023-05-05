// params are classes that provide access to plans (where decoration object can be placed)
// recommended: divide into 2 functions: first plan and second plan, each responsible for its' own object plan.

function generateItems(fpClass, spClass) {
    generateFirstPlanItems(fpClass);
    generateSecondPlanItems(spClass);
}

const glowingColors = [
    `green`, 
    `yellow`,
    `blue`,
    `violet`,
]

function generateFirstPlanItems(fpClass) {
    const firstPlan = document.querySelector(`.${fpClass}`);

    for(let i=0; i<80; i++) {
        let dot = document.createElement('div');
        let topv = Math.floor(Math.random()*90)+1;
        let leftv = Math.floor(Math.random()*90)+1;
        dot.classList.add('dot-g', `version--${glowingColors[i % glowingColors.length]}`);
        dot.setAttribute('style', `top:${topv}%;left:${leftv}%;`);
        firstPlan.appendChild(dot);
    }

}

function generateSecondPlanItems(spClass) {
    const secondPlan = document.querySelector(`.${spClass}`);
}

export {generateItems};