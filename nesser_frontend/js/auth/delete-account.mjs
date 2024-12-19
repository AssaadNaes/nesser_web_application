import { deleteAccount } from "./user-service.mjs";

const INDEX_PAGE = "../index.html";
const username = localStorage.getItem("username");
const modal = document.getElementById("submit-delete");

const deleteButton = document.getElementById("delete-button");
const cancleButton = document.getElementById("cancle-button");
const submitDeleteButton = document.getElementById("submit-button");

deleteButton?.addEventListener("click", () => {
    modal.showModal();
});

cancleButton?.addEventListener("click", () => {
    modal.close();
});

submitDeleteButton?.addEventListener("click", async () => {
    const response = await deleteAccount(username);
    
    if (response.status != 200) {
        document.getElementById("failure-msg").textContent = "Could not delete account!";
    } else {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.setItem("isLoggedIn", false);
        window.location.href = INDEX_PAGE;
    }
});