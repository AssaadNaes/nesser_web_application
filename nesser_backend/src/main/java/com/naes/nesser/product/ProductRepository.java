package com.naes.nesser.product;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductRepository {
    JdbcClient jdbcClient;

    public ProductRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Product> getAll() {
        return jdbcClient.sql("SELECT product_id, name, image_url, description, price, stock_quantity FROM products;")
                .query(Product.class)
                .list();
    }

    public List<Product> findByName(String name) {
        return jdbcClient.sql("SELECT product_id, name, image_url, description, price, stock_quantity " +
                "FROM products " +
                "WHERE LOWER(name) like '%' || LOWER(?) ||'%';")
                .param(name)
                .query(Product.class)
                .list();
    }

    public void add(Product product) {
        jdbcClient.sql("INSERT INTO products (name, image_url, description, price, stock_quantity) " +
                "VALUES (?, ?, ?, ?, ?)")
                .params(List.of(
                        product.name(),
                        product.image_url(),
                        product.description(),
                        product.price(),
                        product.stock_quantity()))
                .update();
    }

    public void remove(long id) {
        jdbcClient.sql("DELETE FROM cart_items WHERE product_id = :id; " +
                        "DELETE FROM products WHERE product_id = :id")
                .param("id", id)
                .update();
    }
}
