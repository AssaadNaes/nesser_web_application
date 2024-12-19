import api from "../axios-config.mjs";

export async function login(username, password) {
    try {
        const response = await api.post("/login", {
            username: username,
            password: password
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

export async function register(username, email, password) {
    try {
        const response = await api.post(`/register`, {
            username: username,
            email: email,
            password: password
        });
        return response;
    } catch (error) {
       return error.response;
    }
}

export async function deleteAccount(username) {
    try {
        const response = await api.delete(`/${username}/delete`);
        return response;
    } catch (error) {
        return error.response;
    }
}
