import { getItemsByUsername, getTotalPriceByUsername, updateQuantity, removeItem } from "./cart-service.mjs";
import { isLoggedIn, attachEventAll } from "../utils.mjs";

const LOGIN_PAGE = "../../pages/login.html";
const username = localStorage.getItem("username");
const spinner = document.getElementById("spinner");

if (!isLoggedIn()) {
    window.location.href = LOGIN_PAGE;
}

export async function getTotal() {
    const total = await getTotalPriceByUsername(username);
    return total;
}

function validateInput(inputElement) {
    inputElement.value = inputElement.value.replace("-", "").slice(0, 2);
}

function quantityEventListeners() {
    const inputName = ".quantity-input";
    attachEventAll(inputName, "focus", event => {event.target.select()});
    attachEventAll(inputName, "input", event => validateInput(event.target));
    attachEventAll(inputName, "change", async event => {
        let inputElement = event.target;
        if (inputElement.value <= "0" || inputElement.value === "") {
            inputElement.value = "1";
        } 
            
        await updateQuantity(username, inputElement.id, inputElement.value);
        generateCheckout();
    });
}

function removeButtonEventListener() {
    attachEventAll(".remove-button", "click", async event => {
        const itemId = event.target.getAttribute("item-id");
        const listItem = document.getElementById(`li-${itemId}`)
        
        await removeItem(username, itemId);
        listItem.remove();
        generateCheckout();
    });
}

function getProductHtml({ cart_item_id, name, image_url, price, quantity }) {
    return `
    <li id="li-${cart_item_id}" class="product">
        <div>
            <div class="img-container">
                <img src="${image_url}" alt="${name}">
            </div>
            <div class="product-description">
                <h1>${name}</h1>
                <p class="price">${price}€</p>
            </div>
        </div>
        <div class="management-container">
            <input id="${cart_item_id}" class="quantity-input" type="number" value="${quantity}">
            <button class="default remove-button" item-id="${cart_item_id}"><i class="fa-solid fa-trash-can"></i> remove</button>
        </div>
    </li>`;
}

async function generateProducts() {
    const products = await getItemsByUsername(username);
    const productsList = document.getElementById("products-list");

    if (products.length > 0) {
        products.forEach(product => {
            const html = getProductHtml(product);
            productsList.insertAdjacentHTML("beforeend", html);
        });
    } else {
        const checkout = document.getElementById("checkout");
        checkout.style.height = "100vh";
        checkout.style.display = "flex";
        checkout.style.flexDirection = "column";
        checkout.style.justifyContent = "space-between";
    }

    quantityEventListeners();
    removeButtonEventListener();
}

async function generateCheckout() {
    const totalPrice = await getTotal(); 
    
    //<p class="note">Please note that this is a school project only, and you will not receive any shipments from us.</p>
    const html = `
        <div class="information">
        <h1 class="header">Order summary</h1>
        <h2>products</h2>
        <p class="products-price">${totalPrice}€</p>
        <h2>shipping costs</h2>
        <p class="shipping-price">0€</p>
        <h2>total price</h2>
        <p class="total-price">${totalPrice}€</p>
        </div>
    `

    const checkoutContainer = document.getElementById("cart-information");
    checkoutContainer.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
    generateProducts();
    generateCheckout();
    spinner.style.display = "none";
});
