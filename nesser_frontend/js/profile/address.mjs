import { getAddress, setAddress } from "./profile-service.mjs";

const username = localStorage.getItem("username");

async function fillInputs() {
    try {
        const data = await getAddress(username);
        
        document.getElementById("country-input").value = data.country || "";
        document.getElementById("city-input").value = data.city || "";
        document.getElementById("plz-input").value = data.plz !== 0 ? data.plz : "";
        document.getElementById("street-input").value = data.street || "";
        document.getElementById("phone-input").value = data.phone_number || "";
        
    } catch (error) {
        console.error("Error fetching address data:", error);
    }
}

function getInputValues() {
    return {
        country: document.getElementById("country-input").value,
        city: document.getElementById("city-input").value,
        plz: document.getElementById("plz-input").value,
        street: document.getElementById("street-input").value,
        phone: document.getElementById("phone-input").value,
    };
}

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const values = getInputValues();
    
    const savedChangesMsgContainer = document.getElementById("saving-msg-container");
    try {
        await setAddress(username, values.country, values.city, values.plz, values.street, values.phone);
        savedChangesMsgContainer.style.display = "flex";
        setTimeout(() => {
            savedChangesMsgContainer.style.display = "none";
        }, 1500);
    } catch (error) {
        console.error("Error updating address:", error);
    }
}

function initializeAddressForm() {
    const form = document.getElementById("address-form");
    
    form?.addEventListener("submit", handleFormSubmit);
    fillInputs();
}

document.addEventListener("DOMContentLoaded", initializeAddressForm);
