import api from "../axios-config.mjs";

export async function getAddress(username) {
    try {
        const respone = await api.get(`address/${username}`);
        return respone.data;
    } catch (error) {
        console.error(`Failed to retrieve address from the server. Error: ${error}`);
        return [];
    }
}

export async function setAddress(username, country, city, plz, street, phoneNumber) {
    try {
        await api.post(`/address/set`, {
            username: username,
            country: country,
            city: city,
            plz: plz,
            street: street,
            phone_number: phoneNumber
        });
        console.log("Address updated successfully!");
    } catch (error) {
        console.error(`Failed to set user address. Error: ${error}`);
    }   
}