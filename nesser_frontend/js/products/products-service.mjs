import api from "../axios-config.mjs";

export async function getAll() {
    try {
        const response = await api.get(`/products`);
        return response.data;
    } catch (error) {
        console.error(`Failed to retrieve products from the server. Error: ${error}`);
        return [];
    }
}

export async function getByName(name) {
    try {
        const response = await api.get(`/products/${name}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to retrieve products from the server. Error: ${error}`);
        return [];
    }
}

export async function addItemToCart(username, productId, quantity) {
    try {
        const response = await api.post(`/cart/item/append`, {
            username: username,
            product_id: productId,
            quantity: quantity
        });

        return response.status;
    } catch (error) {
        return error.response.status;
    }
}