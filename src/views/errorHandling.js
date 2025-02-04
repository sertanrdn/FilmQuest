export function showError(message) {
    const appDiv = document.getElementById('app');

    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.innerText = message;

    appDiv.appendChild(errorMessage);
}