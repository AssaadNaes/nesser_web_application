import { getAll, getByName, addItemToCart } from "./products-service.mjs";
import { isLoggedIn, attachEvenet, attachEventAll } from "../utils.mjs";

const LOGIN_PAGE = "../../pages/login.html";
const username = localStorage.getItem("username");

async function getProducts() {
    let products = await getAll();
    return products;
}

function attachSearchHandler() {
    const search = async (element) => {
        if (element.value.trim() === ""){
            generateProducts();
        } else {
            const productsByName = await getByName(element.value);
            generateProducts(true, productsByName);
        }
    };

    attachEvenet("search-input", "keydown", async event => {
        const element = event.target;
        if (event.key === "Enter") {
            search(element);
        }
    });

    attachEvenet("search-button", "click", async () => {
        const element = document.getElementById("search-input");
        search(element);
    })
}

function attachButtonHandler() {
    const handler = async event => {
        if (!isLoggedIn()) window.location.href = LOGIN_PAGE;

        const id = event.target.getAttribute("product-id");
        const addMessage = document.getElementById("add-product-msg-container");
        const failedMessage = document.getElementById("add-failed-msg-container");
    
        const status = await addItemToCart(username, id, 1);
        if (status === 202) {
            addMessage.style.display = "flex";
            setTimeout(() => {
                addMessage.style.display = "none";
            }, 1500);
        }
        else if (status === 409) {
            failedMessage.style.display = "flex";
            setTimeout(() => {
                failedMessage.style.display = "none";
            }, 1500);
        }
    }

    attachEventAll(".add-to-cart-button", "click", handler);
}

function getProductHTML({ product_id, image_url, name, description, price }) {
    return `
        <article class="product">
            <div class="content">
                <img src="${image_url}" alt="${name}-image">
                <div class="product-description">
                    <h1>${name}</h1>
                    <p>${description}</p>
                    <p class="price">${price}€</p>
                </div>
            </div>
            <div class="button-container">
                <button product-id=${product_id} class="default add-to-cart-button">Add to cart</button>
            </div>
        </article>
    `;
}

async function generateProducts(search = false, products = []) {
    if (!search) {
        products = await getProducts()
    }
    const container = document.getElementById("products-container");
    container.innerHTML = "";
    
    products.forEach(product => {
        if (product.quantity !== 0) {
            const productHTML = getProductHTML(product);
            container.insertAdjacentHTML('beforeend', productHTML);
        }
    });

    attachButtonHandler();
}

attachSearchHandler();
generateProducts();