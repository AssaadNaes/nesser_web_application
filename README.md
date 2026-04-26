# Nesser Online Shop — School Project

## Project Overview
Nesser Online Shop is a modern e-commerce platform developed as a formal school project. The application features a robust and secure architecture, utilizing **Spring Boot** and **Spring Security** for the backend services. The frontend is built entirely with **pure JavaScript, HTML5, and CSS** without the use of external frameworks.

To ensure a seamless setup and evaluation experience, the entire application including the database is fully **dockerized**. This allows for consistent deployment and simplified local testing across any environment.

---

## 1. Prerequisites
Before setting up the project, please ensure the following tools are installed on your system:

* **Docker Desktop**: Required to run the containerized backend and database.  
    [Download Docker](https://www.docker.com/get-started/)
* **Node Package Manager (npm)**: Required to serve the frontend application.  
    [Download Node.js/npm](https://nodejs.org/en/download/prebuilt-installer)
* **Git**: Required to clone the repository.  
    [Download Git](https://git-scm.com/downloads)

---

## 2. Project Setup
1.  Open your terminal or command prompt (CMD).
2.  Navigate to your preferred directory.
3.  Clone the repository and switch to the cloned repo's directory:
    ```bash
    git clone <GitHub-Repository-Link>
    cd <Project-Folder-Name>
    ```

---

## 3. Launching the Backend & Database
The backend services are managed through Docker to ensure all dependencies are pre-configured.
*(Note: For this step you will need docker desktop running.)*

1.  Navigate to the backend directory:
    ```bash
    cd nesser_backend
    ```
2.  Start the services:
    ```bash
    docker compose up -d
    ```
    *(Note: The initial setup may take a few minutes while Docker pulls the necessary images.)*

---

## 4. Launching the Frontend
1.  Navigate to the frontend directory:
    ```bash
    cd ../nesser_frontend
    ```
2.  Install dependencies and start the server:
    ```bash
    npm install
    npm run start
    ```

---

## 5. Accessing the Application
Once the frontend server is running, a local URL (typically `http://localhost:3000`) will appear in your terminal. Click the link to open the shop in your browser.

> [!IMPORTANT]  
> **PayPal Integration**: Due to security policies, active PayPal API keys were not included in the public repository. As a result, the payment process will simulate a failure during checkout.

---

## 6. Shutting Down
### Frontend
* Press `q` or `Ctrl + C` in the terminal to stop the frontend process.

### Backend & Database
* Navigate to the `nesser_backend` folder and run:
    ```bash
    docker compose down
    ```
* Alternatively, you can stop the containers via the **Docker Desktop** interface.

---
*Developed as a technical school project.*
