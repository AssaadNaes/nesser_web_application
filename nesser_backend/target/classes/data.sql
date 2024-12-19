DELETE FROM cart_items;
DELETE FROM products;

INSERT INTO products (name, image_url, description, price, stock_quantity)
VALUES ('NVIDIA GeForce RTX 4080 SUPER - 16GB',
        '../../images/products/gpu.jpeg',
        'For Bitcoin mining and gaming GPU from NVIDIA',
        1799,
        150),
        ('T1-T4 CPU',
        '../images/products/cpu2.jpg',
        'CHEAPEST AND STRONGEST CPU EVER. So you can test the PayPal payment :)',
        '0.01',
        '10'),
        ('Mouse + Keyboard + Mic + Headset',
        '../../images/products/mouse-keyboard-mic-headset.jpeg',
        'Complete gaming kit from the most famous and best brands in the world',
        1250,
        250),
        ('Core IX CPU',
        '../../images/products/cpu.jpg',
        '15 Core ULTRA speed processor for graphic designers',
        2000,
        10);
