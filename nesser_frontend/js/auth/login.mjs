import { login } from './user-service.mjs';
import { setLoadingState } from '../utils.mjs';

const HOME_PAGE = "../pages/home.html";

const loginButton = document.getElementById("login-button");
const spinner = document.getElementById("spinner");

const form = document.getElementById("login-form");
form?.addEventListener("submit", async function (event) {
    event.preventDefault();

    // getting username and password
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    setLoadingState(loginButton, spinner, true);
    
    const response = await login(username, password);
    try {
        if (response.status === 200) {
            localStorage.setItem('username', username);
            localStorage.setItem('token', response.data);
            window.location.href = HOME_PAGE;
        } else if (response.status === 400) {
            document.body.style.cursor = "default";
            document.getElementById("failure-msg").textContent = "wrong username or password!";
        } else {
            throw new Error("Unexpected status code");
        }
    } catch (error) {
        document.getElementById("failure-msg").textContent = "Something went wrong. Please try again.";
    } finally {
        setLoadingState(loginButton, spinner, false);
    }
});