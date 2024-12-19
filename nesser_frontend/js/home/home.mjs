import { isLoggedIn } from "../utils.mjs";

const LOGIN_PAGE = "../../pages/login.html";

if (!isLoggedIn()) {
    window.location.href = LOGIN_PAGE;
}