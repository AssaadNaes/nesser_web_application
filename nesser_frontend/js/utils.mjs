// displays the loading spinner
export function showLoading(spinner, isLoading) {
    spinner.style.display = isLoading ? "block" : "none";
}

// disables the clicked button + displays loading spinner
export function setLoadingState(button, spinner, isLoading) {
    button.disabled = isLoading;
    spinner.style.display = isLoading ? "block" : "none";
}

// disables all given buttons + displays loading spinner
export function setLoadingStateAll (buttons, spinner, isLoading) {
    buttons.forEach(button => button.disabled = isLoading);
    spinner.style.display = isLoading ? "block" : "none";
}

// checks if the user is logged in
export function isLoggedIn() {
    if (localStorage.getItem("token")) {
        return true;
    }
    return false;
}

// attaches eventhandling to only one elemt using its id
export function attachEvenet(id, eventType, handler) {
    const element = document.getElementById(id);
    element.addEventListener(eventType, handler);
}

// attaches eventhandling to all elements matching the selector
export function attachEventAll(selector, eventType, handler) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => el.addEventListener(eventType, handler));
}
