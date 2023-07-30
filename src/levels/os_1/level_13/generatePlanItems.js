import styles_firstPlan from './styles/firstPlan.module.css';
import styles_secondPlan from './styles/secondPlan.module.css';

function generateItems(fpClass, spClass) {
    generateFirstPlanItems(fpClass);
    generateSecondPlanItems(spClass);
}

function generateFirstPlanItems(fpClass) {
    const firstPlan = document.querySelector(`.${fpClass}`);

/*     const circle = document.createElement('div');
    circle.classList.add(styles_firstPlan['lightning']);
    firstPlan.appendChild(circle); */
}

function generateSecondPlanItems(spClass) {
    const secondPlan = document.querySelector(`.${spClass}`);
}

export {generateItems};