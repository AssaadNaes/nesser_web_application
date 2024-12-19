import api from "../axios-config.mjs";

export async function getItemsByUsername(username) {
    try {
        const response = await api.get(`http://localhost:8080/cart/${username}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to retrieve cart items from the server. Error: ${error}`);
        return [];
    }
}

export async function getTotalPriceByUsername(username) {
    try {
        const response = await api.get(`/cart/${username}/total`);
        return response.data;
    } catch (error) {
        console.error(`Failed to retrieve total of cart. Error: ${error}`)
        return 0;
    }
}

export async function updateQuantity(username, cartItemId, quantity) {
    try {
        const response = await api.put(`/cart/item/update/quantity`, {
            username: username,
            cart_item_id: cartItemId,
            quantity: quantity
        });

        return response.status;
    } catch (error) {
        return error.response.status;
    }
}

export async function removeItem(username, cartItemId) {
    try {
        await api.delete(`/cart/item/remove`, {
            data: {
                username: username,
                cart_item_id: cartItemId
            }
        });
    } catch (error) {
        throw error; 
    }
}

export async function clearCart(username) {
    try {
        await api.delete(`/cart/${username}`);
    } catch (error) {
        throw error;
    }
}