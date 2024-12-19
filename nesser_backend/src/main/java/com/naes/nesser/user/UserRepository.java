package com.naes.nesser.user;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserRepository {
    private final static Logger logger = LogManager.getLogger(UserRepository.class);
    private final JdbcClient jdbcClient;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public UserRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public User loadUserByUsername(String username) {
        Optional<User> user = jdbcClient.sql("SELECT * FROM users WHERE username = ?")
                .param(username)
                .query(User.class)
                .optional();

        return user.orElse(null);
    }

    public void register(User user) {
        user.setPassword(encoder.encode(user.getPassword()));

        jdbcClient.sql("INSERT INTO users (username, email, password) VALUES (?, ?, ?) RETURNING username")
            .params(user.getUsername(), user.getEmail(), user.getPassword())
            .query(String.class)
            .single();
    }

    public int delete(String username) {
        jdbcClient.sql("DELETE FROM cart_items WHERE username = ?;")
                .param(username)
                .update();

        jdbcClient.sql("DELETE FROM addresses WHERE username = ?;")
                .param(username)
                .update();

        return jdbcClient.sql("DELETE FROM users WHERE username = ?;")
                .param(username)
                .update();
    }

}
