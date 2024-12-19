package com.naes.nesser.product;

public record Product(
        long product_id,
        String name,
        String image_url,
        String description,
        double price,
        int stock_quantity
) {
}
