import { initHomePage } from "./pages/home.js";

async function loadApp() {
    await initHomePage();
}

window.addEventListener('load', loadApp);