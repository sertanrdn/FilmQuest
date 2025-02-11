import { INDICATOR_CLASS } from "../constants.js";

export function loadIndicator() {
    const appDiv = document.getElementById('app');

    // Show a loading state while fetching data
    const indicator = document.createElement('div');
    indicator.classList.add(INDICATOR_CLASS);
    indicator.innerText = 'Loading...';
    appDiv.appendChild(indicator);
}

export function removeIndicator() {
    let indicator = document.querySelector(`.${INDICATOR_CLASS}`);
    // Remove the indicator once the data is loaded
    if (indicator) {
        indicator.remove();
    }
}