package com.naes.nesser.cart_item;

public record CartItem(
        long cart_item_id,
        String username,
        long product_id,
        int quantity
) {
}
