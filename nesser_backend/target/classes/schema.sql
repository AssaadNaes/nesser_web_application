-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(25) NOT NULL UNIQUE,
    email VARCHAR(60) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Create the products table with image URL
CREATE TABLE IF NOT EXISTS products (
    product_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    image_url TEXT, -- URL to the image
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL
);

-- Create the cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
    cart_item_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(50) REFERENCES users(username),
    product_id INT REFERENCES products(product_id),
    quantity INT NOT NULL CHECK (quantity > 0),
    CONSTRAINT unique_user_product UNIQUE (username, product_id)
);

-- Create the user_info table
CREATE TABLE IF NOT EXISTS addresses (
    username VARCHAR(25) PRIMARY KEY REFERENCES users(username),
    country VARCHAR(30),
    city VARCHAR(30),
    plz numeric,
    street VARCHAR(50),
    phone_number VARCHAR(30)
);

-- Users Table Indexes
CREATE INDEX IF NOT EXISTS idx_users_username ON users (username);

-- Products Table Indexes
CREATE INDEX IF NOT EXISTS idx_products_name ON products (name);

-- Cart Items Table Indexes
CREATE INDEX IF NOT EXISTS idx_cart_items_username ON cart_items (username);
CREATE INDEX IF NOT EXISTS idx_cart_items_product_id ON cart_items (product_id);

-- Addresses Table Indexes
CREATE INDEX IF NOT EXISTS idx_addresses_username ON addresses (username);
