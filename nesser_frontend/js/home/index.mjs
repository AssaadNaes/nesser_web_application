import { isLoggedIn } from "../utils.mjs";

const HOME_PAGE = "../../pages/home.html";

if (isLoggedIn()) {
    window.location.href = HOME_PAGE;
}