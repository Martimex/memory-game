// params are classes that provide access to plans (where decoration object can be placed)
// recommended: divide into 2 functions: first plan and second plan, each responsible for its' own object plan.

function generateItems(fpClass, spClass) {
    generateFirstPlanItems(fpClass);
    generateSecondPlanItems(spClass);
}

function generateFirstPlanItems(fpClass) {
    const firstPlan = document.querySelector(`.${fpClass}`);

    const secret_container = document.createElement('div');
    secret_container.classList.add('secret-container', 't-4');

    const secret_container_block = document.createElement('div');
    secret_container_block.classList.add('secret-container__block');

    const secret_counter = document.createElement('div');
    secret_counter.textContent = 0;

    secret_counter.classList.add('secret-container__counter');

    secret_container.appendChild(secret_container_block);
    secret_container_block.appendChild(secret_counter);

    firstPlan.appendChild(secret_container);
}

function generateSecondPlanItems(spClass) {
    const secondPlan = document.querySelector(`.${spClass}`);
}

export {generateItems};