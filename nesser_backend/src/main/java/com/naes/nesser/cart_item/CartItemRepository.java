package com.naes.nesser.cart_item;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CartItemRepository {
    private final JdbcClient jdbcClient;

    public CartItemRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Product> findByUsername(String username){
        return jdbcClient.sql("SELECT " +
                        "cart_items.cart_item_id, " +
                        "products.name, " +
                        "products.image_url, " +
                        "products.price, " +
                        "cart_items.quantity " +
                        "FROM products " +
                        "INNER JOIN cart_items ON products.product_id = cart_items.product_id " +
                        "WHERE username = ?;")
                .param(username)
                .query(Product.class)
                .list();
    }

    public void updateItemQuantity(long itemId, int quantity){
        jdbcClient.sql("UPDATE cart_items SET quantity = ? WHERE cart_item_id = ?;")
                .params(List.of(quantity, itemId))
                .update();
    }

    public void save(CartItem cartItem){
        jdbcClient.sql("INSERT INTO cart_items (username, product_id, quantity) VALUES (?, ?, ?);")
                .params(List.of(cartItem.username(), cartItem.product_id(), cartItem.quantity()))
                .update();
    }

    public void removeItem(long cartItemId){
        jdbcClient.sql("DELETE FROM cart_items WHERE cart_item_id = ?;")
                .param(cartItemId)
                .update();
    }

    public void clearCart(String username){
        jdbcClient.sql("DELETE FROM cart_items WHERE username = ?;")
                .param(username)
                .update();
    }

    public double getTotalByUsername(String username){
        return jdbcClient.sql("SELECT COALESCE(SUM(ci.quantity * p.price), 0) " +
                "FROM cart_items ci " +
                "JOIN products p ON ci.product_id = p.product_id " +
                "WHERE username = ?;")
                .param(username)
                .query(Double.class)
                .single();
    }
}
