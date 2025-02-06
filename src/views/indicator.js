export function loadIndicator() {
    const appDiv = document.getElementById('app');

    // Show a loading state while fetching data
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    indicator.innerText = 'Loading...';
    appDiv.appendChild(indicator);
}

export function removeIndicator() {
    let indicator = document.querySelector('.indicator');
    // Remove the indicator once the data is loaded or an error occurs
    if (indicator) {
        indicator.remove();
    }
}