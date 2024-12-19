import { register } from "./user-service.mjs";
import { setLoadingState } from '../utils.mjs';

const ERROR_MESSAGES = {
    INVALID_USERNAME: "Username must be at least 4 characters long!",
    INVALID_PASSWORD: "Password not valid!" + 
    "<br>- At least 8 characters" + 
    "<br>- One uppercase letter" + 
    "<br>- One number" + 
    "<br>- One special character ($!&?=)",
    PASSWORD_MISMATCH: "Passwords do not match!",
    USER_EXISTS: "Username or email already exists!",
    GENERIC_ERROR: "Something went wrong. Please try again."
}

function isUsernameValid(username) {
    return username.length >= 4;
}

function isPasswordValid(password) {
    const minLength = 8;
    const numbers = /[0-9]/g;
    const upperCaseLetters = /[A-Z]/g;
    const specialCharacters = /[$!&?=]/;

    return numbers.test(password) &&
        upperCaseLetters.test(password) &&
        specialCharacters.test(password) &&
        password.length >= minLength;
}

function doPasswordsMatch(password, repeatedPassword) {
    return password === repeatedPassword;
}

const form = document.getElementById("register-form");
form?.addEventListener("submit", async event => {
    event.preventDefault();

    const LOGIN_PAGE = "../pages/login.html";

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repeatedPassword = document.getElementById("repeated-password").value;
    const registerButton = document.getElementById("register-button");
    const spinner = document.getElementById("spinner");
    const msgParagraph = document.getElementById("failure-msg");

    if (!isUsernameValid(username)) {
        msgParagraph.textContent = ERROR_MESSAGES.INVALID_USERNAME;
        return;
    }

    if (!isPasswordValid(password)) {
        msgParagraph.innerHTML = ERROR_MESSAGES.INVALID_PASSWORD;
        return;
    }

    if (!doPasswordsMatch(password, repeatedPassword)) {
        msgParagraph.textContent = ERROR_MESSAGES.PASSWORD_MISMATCH;
        return;
    }

    setLoadingState(registerButton, spinner, true);
    try {
        const response = await register(username, email, password);
        if (response.status === 201) {
            window.location.href = LOGIN_PAGE;
        } 
        else if (response.status === 409) {
            msgParagraph.textContent = ERROR_MESSAGES.USER_EXISTS;
        }
        else {
            msgParagraph.textContent = ERROR_MESSAGES.GENERIC_ERROR;
        }
    } catch (error) {
        msgParagraph.textContent = ERROR_MESSAGES.GENERIC_ERROR;
    } finally {
        setLoadingState(registerButton, spinner, false);
    }
});