package com.naes.nesser.cart_item;

public record Product(
        long cart_item_id,
        String name,
        String image_url,
        double price,
        int quantity
) {
}
