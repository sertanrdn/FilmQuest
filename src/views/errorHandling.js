import { ERROR_CLASS } from "../constants.js";

export function showError(message) {
    const appDiv = document.getElementById('app');

    // Remove if there is an existing error 
    const existingError = document.querySelector(`.${ERROR_CLASS}`);
    if(existingError){
        existingError.remove();
    }
    
    // Otherwise displaying the error
    const errorMessage = document.createElement('div');
    errorMessage.classList.add(ERROR_CLASS);
    errorMessage.innerText = message;

    appDiv.appendChild(errorMessage);
}