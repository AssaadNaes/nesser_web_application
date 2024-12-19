const logoutButton = document.getElementById("logout-button");

const INDEX_PAGE = "../../index.html";

logoutButton?.addEventListener('click', async (event) => {
    event.preventDefault();
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    window.location.href = INDEX_PAGE;
});