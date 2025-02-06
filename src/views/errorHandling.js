export function showError(message) {
    const appDiv = document.getElementById('app');

    // Remove if there is an existing error 
    const existingError = document.querySelector('.error-message');
    if(existingError){
        existingError.remove();
    }

    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.innerText = message;

    appDiv.appendChild(errorMessage);
}